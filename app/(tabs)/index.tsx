import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Calendar, MapPin, Users, Star, TrendingUp } from 'lucide-react-native';

const EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival 2025',
    date: 'Feb 15, 2025',
    time: '6:00 PM',
    location: 'Central Park, NYC',
    shortLocation: 'Central Park',
    price: 75,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    category: 'Music',
    rating: 4.8,
    attendees: 5000,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Tech Innovation Conference',
    date: 'Feb 20, 2025',
    time: '9:00 AM',
    location: 'Convention Center, NYC',
    shortLocation: 'Convention Center',
    price: 299,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Technology',
    rating: 4.9,
    attendees: 1500,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Food & Wine Festival',
    date: 'Mar 5, 2025',
    time: '12:00 PM',
    location: 'Brooklyn Waterfront, NYC',
    shortLocation: 'Brooklyn',
    price: 85,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    category: 'Food & Drink',
    rating: 4.7,
    attendees: 3000,
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Art Gallery Exhibition',
    date: 'Feb 28, 2025',
    time: '10:00 AM',
    location: 'Metropolitan Museum, NYC',
    shortLocation: 'MET Museum',
    price: 45,
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
    category: 'Art & Culture',
    rating: 4.6,
    attendees: 800,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Marathon Run 2025',
    date: 'Mar 10, 2025',
    time: '7:00 AM',
    location: 'Brooklyn Bridge, NYC',
    shortLocation: 'Brooklyn Bridge',
    price: 50,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80',
    category: 'Sports',
    rating: 4.5,
    attendees: 10000,
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Comedy Night Special',
    date: 'Feb 25, 2025',
    time: '8:00 PM',
    location: 'Comedy Club, Manhattan',
    shortLocation: 'Manhattan',
    price: 35,
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80',
    category: 'Entertainment',
    rating: 4.9,
    attendees: 500,
    isFeatured: false,
  },
];

const CATEGORIES = ['All', 'Music', 'Technology', 'Food & Drink', 'Art & Culture', 'Sports', 'Entertainment'];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();

  const filteredEvents = EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredEvents = EVENTS.filter(e => e.isFeatured);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Search */}
      <View className="bg-white pt-15 px-5 pb-4 rounded-b-2xl shadow-md">
        <View className="mb-4">
          <Text className="text-base text-gray-500 mb-1">Hello! 👋</Text>
          <Text className="text-3xl font-bold text-gray-800">Discover Events</Text>
        </View>
        
        <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-2xl">
          <Search size={20} color="#6b7280" />
          <TextInput
            className="flex-1 text-base text-gray-800 ml-2"
            placeholder="Search events..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Featured Events */}
        {searchQuery === '' && selectedCategory === 'All' && (
          <View className="mt-5 px-5">
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center" style={{ gap: 8 }}>
                <TrendingUp size={20} color="#0ea5e9" />
                <Text className="text-xl font-bold text-gray-800">Featured Events</Text>
              </View>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              className="-ml-5 mt-3"
            >
              {featuredEvents.map(event => (
                <TouchableOpacity
                  key={event.id}
                  className="ml-5 rounded-2xl overflow-hidden bg-white shadow-lg"
                  style={{ width: 320, height: 240 }}
                  onPress={() => router.push(`/events/${event.id}`)}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: event.image }} className="w-full h-full" />
                  <View className="absolute bottom-0 left-0 right-0 top-0 bg-black/40 justify-between p-4">
                    <View className="flex-row items-center self-start bg-amber-400/90 px-2.5 py-1.5 rounded-full" style={{ gap: 4 }}>
                      <Star size={12} color="#fbbf24" fill="#fbbf24" />
                      <Text className="text-white text-xs font-semibold">Featured</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                      <Text className="text-xl font-bold text-white" numberOfLines={2}>
                        {event.title}
                      </Text>
                      <View className="flex-row" style={{ gap: 16 }}>
                        <View className="flex-row items-center" style={{ gap: 6 }}>
                          <Calendar size={14} color="#ffffff" />
                          <Text className="text-white text-xs">{event.date}</Text>
                        </View>
                        <View className="flex-row items-center" style={{ gap: 6 }}>
                          <MapPin size={14} color="#ffffff" />
                          <Text className="text-white text-xs">{event.shortLocation}</Text>
                        </View>
                      </View>
                      <Text className="text-2xl font-bold text-white">${event.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mt-5 px-5 mb-2"
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              className={`px-5 py-2.5 rounded-3xl mr-2 border ${
                selectedCategory === category 
                  ? 'bg-sky-500 border-sky-500' 
                  : 'bg-white border-gray-200'
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text className={`text-sm font-semibold ${
                selectedCategory === category ? 'text-white' : 'text-gray-500'
              }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* All Events */}
        <View className="mt-5 px-5">
          <Text className="text-xl font-bold text-gray-800">
            {selectedCategory === 'All' ? 'All Events' : selectedCategory}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            {filteredEvents.length} events available
          </Text>
        </View>

        <View className="px-5 pt-2 pb-5">
          {filteredEvents.map(event => (
            <TouchableOpacity
              key={event.id}
              className="bg-white rounded-2xl mb-4 overflow-hidden shadow-md"
              onPress={() => router.push(`/events/${event.id}`)}
              activeOpacity={0.9}
            >
              <Image 
                source={{ uri: event.image }} 
                className="w-full h-48 bg-gray-200" 
              />
              
              {/* Category Badge */}
              <View className="absolute top-3 left-3 bg-sky-500/90 px-3 py-1.5 rounded-full">
                <Text className="text-white text-xs font-semibold">{event.category}</Text>
              </View>

              {/* Rating */}
              <View className="absolute top-3 right-3 flex-row items-center bg-white/95 px-2.5 py-1.5 rounded-full" style={{ gap: 4 }}>
                <Star size={12} color="#fbbf24" fill="#fbbf24" />
                <Text className="text-xs font-semibold text-gray-800">{event.rating}</Text>
              </View>

              <View className="p-4">
                <Text className="text-lg font-bold text-gray-800 mb-3" numberOfLines={2}>
                  {event.title}
                </Text>
                
                <View className="flex-row items-center mb-2" style={{ gap: 8 }}>
                  <Calendar size={14} color="#6b7280" />
                  <Text className="text-sm text-gray-500 flex-1">
                    {event.date} • {event.time}
                  </Text>
                </View>

                <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
                  <MapPin size={14} color="#6b7280" />
                  <Text className="text-sm text-gray-500 flex-1" numberOfLines={1}>
                    {event.location}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <View className="flex-row items-center" style={{ gap: 6 }}>
                    <Users size={14} color="#6b7280" />
                    <Text className="text-xs text-gray-500">{event.attendees}+</Text>
                  </View>
                  <Text className="text-xl font-bold text-sky-500">${event.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredEvents.length === 0 && (
          <View className="items-center justify-center py-15 px-10">
            <Search size={60} color="#d1d5db" />
            <Text className="text-xl font-bold text-gray-800 mt-4 mb-2">No events found</Text>
            <Text className="text-base text-gray-500 text-center">
              Try adjusting your search or filters
            </Text>
          </View>
        )}
        
        <View className="h-5" />
      </ScrollView>
    </View>
  );
}