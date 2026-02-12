import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Star, Navigation, Share2, Heart, Ticket } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/navbar';

const EVENT_DETAILS = {
  '1': {
    id: '1',
    title: 'Summer Music Festival 2025',
    date: 'Feb 15, 2025',
    time: '6:00 PM - 11:00 PM',
    location: 'Central Park',
    fullAddress: 'Central Park, New York, NY 10022',
    latitude: 40.7829,
    longitude: -73.9654,
    price: 75,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    category: 'Music',
    rating: 4.8,
    reviews: 342,
    attendees: 5000,
    organizer: 'Live Nation',
    description: 'Join us for the biggest music festival of the summer! Experience amazing performances from top artists across multiple stages. Enjoy food trucks, art installations, and an unforgettable atmosphere under the stars.',
    highlights: [
      'Multiple stages with live performances',
      'Food & beverage vendors',
      'Art installations',
      'VIP lounge access available',
      'Free parking'
    ],
    artists: ['The Weekend', 'Dua Lipa', 'Bruno Mars', 'Taylor Swift']
  },
  '2': {
    id: '2',
    title: 'Tech Innovation Conference',
    date: 'Feb 20, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Convention Center',
    fullAddress: '655 West 34th Street, New York, NY 10001',
    latitude: 40.7557,
    longitude: -73.9973,
    price: 299,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Technology',
    rating: 4.9,
    reviews: 156,
    attendees: 1500,
    organizer: 'TechCorp Events',
    description: 'Discover the latest innovations in technology! Network with industry leaders, attend keynote sessions, and explore cutting-edge demos from leading tech companies.',
    highlights: [
      'Keynote sessions from tech leaders',
      'Networking opportunities',
      'Tech demos and exhibitions',
      'Lunch and refreshments included',
      'Career fair'
    ],
    artists: []
  },
  '3': {
    id: '3',
    title: 'Food & Wine Festival',
    date: 'Mar 5, 2025',
    time: '12:00 PM - 8:00 PM',
    location: 'Brooklyn Waterfront',
    fullAddress: 'Brooklyn Bridge Park, Brooklyn, NY 11201',
    latitude: 40.7024,
    longitude: -73.9875,
    price: 85,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    category: 'Food & Drink',
    rating: 4.7,
    reviews: 289,
    attendees: 3000,
    organizer: 'NYC Food Events',
    description: 'A culinary journey featuring the finest local and international cuisine. Sample dishes from award-winning chefs, enjoy wine tastings, and participate in cooking demonstrations.',
    highlights: [
      'Tastings from 50+ vendors',
      'Wine and cocktail sampling',
      'Live cooking demonstrations',
      'Chef meet & greets',
      'Waterfront views'
    ],
    artists: []
  },
};

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventId = params.id as string;
  const event = EVENT_DETAILS[eventId as keyof typeof EVENT_DETAILS];
  const [isFavorite, setIsFavorite] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  if (!event) {
    return (
      <View className="flex-1 bg-white">
        <Text>Event not found</Text>
      </View>
    );
  }

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`;
    Linking.openURL(url);
  };

  const handleShare = () => {
    Alert.alert('Share Event', 'Sharing functionality would be implemented here');
  };

  const handleBookNow = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (!token) {
        Alert.alert(
          'Sign In Required',
          'Please sign in to book tickets',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign In', onPress: () => router.push('/auth/login') }
          ]
        );
        return;
      }

      Alert.alert(
        'Booking Confirmed!',
        `You have booked ${ticketCount} ticket(s) for ${event.title}`,
        [{ text: 'OK', onPress: () => router.push('/(tabs)/bookings') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to book tickets');
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Navbar with Back Button */}
      <View className="relative">
        <TouchableOpacity 
          className="absolute left-5 top-[70px] z-10 w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        
        <Navbar />
        
        <View className="absolute right-5 top-[70px] z-10 flex-row gap-2">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
            onPress={handleShare}
          >
            <Share2 size={20} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              size={20} 
              color={isFavorite ? "#ef4444" : "#1f2937"}
              fill={isFavorite ? "#ef4444" : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="h-[300px] relative">
          <Image source={{ uri: event.image }} className="w-full h-full" />
          
          {/* Category Badge */}
          <View className="absolute bottom-5 left-5 bg-sky-500/95 px-4 py-2 rounded-3xl">
            <Text className="text-white text-sm font-semibold">{event.category}</Text>
          </View>
        </View>

        <View className="p-5">
          {/* Title & Rating */}
          <View className="mb-3">
            <Text className="text-[28px] font-bold text-gray-800 mb-3">{event.title}</Text>
            <View className="flex-row items-center gap-1.5">
              <Star size={20} color="#fbbf24" fill="#fbbf24" />
              <Text className="text-base font-semibold text-gray-800">{event.rating}</Text>
              <Text className="text-sm text-gray-500">({event.reviews} reviews)</Text>
            </View>
          </View>

          {/* Organizer */}
          <View className="mb-6">
            <Text className="text-sm text-gray-500 mb-1">Organized by</Text>
            <Text className="text-base font-semibold text-gray-800">{event.organizer}</Text>
          </View>

          {/* Info Cards */}
          <View className="flex-row gap-3 mb-8">
            <View className="flex-1 bg-gray-50 p-4 rounded-xl items-center">
              <Calendar size={24} color="#0ea5e9" />
              <Text className="text-xs text-gray-500 mt-2 mb-1">Date</Text>
              <Text className="text-sm font-semibold text-gray-800 text-center">{event.date}</Text>
            </View>
            <View className="flex-1 bg-gray-50 p-4 rounded-xl items-center">
              <Clock size={24} color="#10b981" />
              <Text className="text-xs text-gray-500 mt-2 mb-1">Time</Text>
              <Text className="text-sm font-semibold text-gray-800 text-center">{event.time.split(' - ')[0]}</Text>
            </View>
            <View className="flex-1 bg-gray-50 p-4 rounded-xl items-center">
              <Users size={24} color="#8b5cf6" />
              <Text className="text-xs text-gray-500 mt-2 mb-1">Attendees</Text>
              <Text className="text-sm font-semibold text-gray-800 text-center">{event.attendees}+</Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">About Event</Text>
            <Text className="text-base leading-6 text-gray-600">{event.description}</Text>
          </View>

          {/* Highlights */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">Event Highlights</Text>
            {event.highlights.map((highlight, index) => (
              <View key={index} className="flex-row items-start mb-3">
                <View className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 mr-3" />
                <Text className="flex-1 text-[15px] text-gray-600 leading-[22px]">{highlight}</Text>
              </View>
            ))}
          </View>

          {/* Artists/Speakers (if available) */}
          {event.artists.length > 0 && (
            <View className="mb-8">
              <Text className="text-xl font-bold text-gray-800 mb-4">Featured Artists</Text>
              <View className="flex-row flex-wrap gap-2">
                {event.artists.map((artist, index) => (
                  <View key={index} className="bg-blue-50 px-4 py-2.5 rounded-3xl border border-blue-200">
                    <Text className="text-sm font-semibold text-blue-800">{artist}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Location */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">Location</Text>
            <View className="flex-row items-start bg-gray-50 p-4 rounded-xl mb-4 gap-3">
              <MapPin size={20} color="#0ea5e9" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800 mb-1">{event.location}</Text>
                <Text className="text-sm text-gray-500 leading-5">{event.fullAddress}</Text>
              </View>
            </View>

            {/* Map */}
            <TouchableOpacity
              className="h-[200px] rounded-xl overflow-hidden relative"
              onPress={openInMaps}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/staticmap?center=${event.latitude},${event.longitude}&zoom=15&size=600x250&markers=color:red%7C${event.latitude},${event.longitude}&key=YOUR_API_KEY`
                }}
                className="w-full h-full bg-gray-200"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black/75 flex-row items-center justify-center p-4 gap-2">
                <Navigation size={20} color="#ffffff" />
                <Text className="text-white text-base font-semibold">Open in Maps</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View className="flex-row items-center p-4 pb-8 bg-white border-t border-gray-200 gap-3 shadow-lg">
        <View className="flex-1">
          <Text className="text-xs text-gray-500 mb-0.5">Price per ticket</Text>
          <Text className="text-2xl font-bold text-gray-800">${event.price}</Text>
        </View>
        
        <View className="flex-row items-center bg-gray-100 rounded-xl p-1">
          <TouchableOpacity 
            className="w-9 h-9 items-center justify-center bg-white rounded-lg"
            onPress={() => setTicketCount(Math.max(1, ticketCount - 1))}
          >
            <Text className="text-xl font-bold text-gray-800">-</Text>
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800 px-4">{ticketCount}</Text>
          <TouchableOpacity 
            className="w-9 h-9 items-center justify-center bg-white rounded-lg"
            onPress={() => setTicketCount(Math.min(10, ticketCount + 1))}
          >
            <Text className="text-xl font-bold text-gray-800">+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="flex-row bg-sky-500 px-6 py-3.5 rounded-xl items-center gap-2"
          onPress={handleBookNow}
        >
          <Ticket size={20} color="#ffffff" />
          <Text className="text-white text-base font-semibold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}