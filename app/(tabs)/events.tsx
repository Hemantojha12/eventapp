import { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Dimensions,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const ALL_EVENTS = [
  { 
    id: '1', 
    title: 'Music Festival 2025', 
    category: 'Music', 
    price: 50,
    date: 'Feb 15, 2025',
    location: 'Central Park',
    attendees: '2.5k',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
    trending: true
  },
  { 
    id: '2', 
    title: 'Tech Conference', 
    category: 'Technology', 
    price: 100,
    date: 'Feb 20, 2025',
    location: 'Convention Center',
    attendees: '1.2k',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    trending: false
  },
  { 
    id: '3', 
    title: 'Food & Wine Expo', 
    category: 'Food', 
    price: 30,
    date: 'Feb 25, 2025',
    location: 'Downtown Arena',
    attendees: '800',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    trending: true
  },
  { 
    id: '4', 
    title: 'Art Gallery Opening', 
    category: 'Art', 
    price: 0,
    date: 'Mar 1, 2025',
    location: 'Art District',
    attendees: '450',
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop',
    trending: false
  },
  { 
    id: '5', 
    title: 'Sports Tournament', 
    category: 'Sports', 
    price: 25,
    date: 'Mar 5, 2025',
    location: 'Sports Complex',
    attendees: '3.1k',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    trending: true
  },
];

const CATEGORIES = ['All', 'Music', 'Technology', 'Food', 'Art', 'Sports'];

export default function EventsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = ALL_EVENTS.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-15 px-5 pb-4 rounded-b-3xl shadow-md">
        <View className="flex-row justify-between items-start mb-5">
          <View>
            <Text className="text-base text-gray-500 mb-1">Discover</Text>
            <Text className="text-3xl font-bold text-gray-800">Amazing Events</Text>
          </View>
          <View className="bg-sky-100 px-3 py-1.5 rounded-full">
            <Text className="text-xs font-semibold text-sky-500">{ALL_EVENTS.length} Events</Text>
          </View>
        </View>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-2xl mb-4">
          <Text className="text-lg mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-base text-gray-800"
            placeholder="Search events..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="-mx-5 px-5"
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-5 py-2.5 rounded-full mr-2 ${
                selectedCategory === category ? 'bg-sky-500' : 'bg-gray-100'
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
      </View>

      {/* Events List */}
      <ScrollView 
        className="flex-1 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.length === 0 ? (
          <View className="items-center justify-center py-15 px-10">
            <Text className="text-xl font-bold text-gray-800 mb-2">No events found</Text>
            <Text className="text-base text-gray-500 text-center">Try adjusting your search or filters</Text>
          </View>
        ) : (
          filteredEvents.map((event, index) => (
            <TouchableOpacity
              key={event.id}
              className={`bg-white rounded-2xl mx-5 mb-4 p-4 flex-row shadow-md ${
                index === 0 ? 'mt-0' : ''
              }`}
              onPress={() => router.push(`/events/${event.id}`)}
              activeOpacity={0.7}
            >
              {/* Event Image */}
              <View className="w-25 h-25 rounded-2xl mr-4 relative overflow-hidden">
                <Image 
                  source={{ uri: event.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {event.trending && (
                  <View className="absolute top-1.5 right-1.5 bg-black/50 px-2 py-1 rounded-xl items-center justify-center">
                    <Text className="text-xs">🔥</Text>
                  </View>
                )}
              </View>

              {/* Event Details */}
              <View className="flex-1 justify-between">
                <View className="flex-row justify-between items-start mb-1.5">
                  <Text className="text-lg font-bold text-gray-800 flex-1 mr-2" numberOfLines={1}>
                    {event.title}
                  </Text>
                  <View className="bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <Text className="text-sm font-bold text-emerald-600">
                      {event.price === 0 ? 'Free' : `${event.price}`}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mb-2">
                  <Text className="text-sm text-sky-500 mr-1">•</Text>
                  <Text className="text-xs text-gray-500 font-medium">{event.category}</Text>
                </View>

                <View className="mb-2" style={{ gap: 6 }}>
                  <View className="flex-row items-center">
                    <Text className="text-sm mr-1.5">📅</Text>
                    <Text className="text-xs text-gray-500 flex-1">{event.date}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm mr-1.5">📍</Text>
                    <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>
                      {event.location}
                    </Text>
                  </View>
                </View>

                {/* Attendees */}
                <View className="flex-row items-center">
                  <View className="flex-row mr-2">
                    <View className="w-6 h-6 rounded-full border-2 border-white bg-amber-400" />
                    <View className="w-6 h-6 rounded-full border-2 border-white bg-blue-400 -ml-2" />
                    <View className="w-6 h-6 rounded-full border-2 border-white bg-emerald-400 -ml-2" />
                  </View>
                  <Text className="text-xs text-gray-500 font-medium">
                    {event.attendees} attending
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        
        {/* Bottom Padding */}
        <View className="h-5" />
      </ScrollView>
    </View>
  );
}