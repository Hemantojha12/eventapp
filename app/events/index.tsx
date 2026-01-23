import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import EventCard from '../../components/events/EventCard';
import CategoryFilter from '../../components/events/CategoryFilter';
import { eventService } from '../../services/events.service';
import { Event } from '../../types/event';

const CATEGORIES = [
  'All',
  'Music',
  'Sports',
  'Conference',
  'Workshop',
  'Festival',
  'Art',
  'Food',
];

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadEvents = async (pageNum = 1, category = selectedCategory) => {
    try {
      const filters: any = { page: pageNum, limit: 10 };
      if (category !== 'All') filters.category = category;
      
      const data = await eventService.getAllEvents(filters);
      
      if (pageNum === 1) {
        setEvents(data.events);
        setFilteredEvents(data.events);
      } else {
        setEvents(prev => [...prev, ...data.events]);
        setFilteredEvents(prev => [...prev, ...data.events]);
      }
      
      setHasMore(data.events.length === 10);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || 
                             event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, events]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    setPage(1);
    loadEvents(1, category);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadEvents();
      return;
    }
    
    try {
      const data = await eventService.searchEvents(searchQuery);
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadEvents(nextPage);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-gray-900">
          All Events
        </Text>
        <Text className="text-gray-600 mt-1">
          Find your next experience
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 pb-4">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <Search size={20} color="#9ca3af" />
          <TextInput
            placeholder="Search events, locations..."
            className="flex-1 ml-3 text-gray-900"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Filter size={20} color="#9ca3af" />
        </View>
      </View>

      {/* Categories */}
      <View className="pb-4">
        <CategoryFilter
          categories={CATEGORIES}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
        />
      </View>

      {/* Events List */}
      {loading && page === 1 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0ea5e9" />
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-6">
              <EventCard
                event={item}
                onPress={() => console.log('Navigate to event:', item.id)}
                onBookPress={() => console.log('Book event:', item.id)}
              />
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center justify-center py-10">
              <Text className="text-gray-500 text-lg">No events found</Text>
            </View>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            hasMore ? (
              <View className="py-4">
                <ActivityIndicator color="#0ea5e9" />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}