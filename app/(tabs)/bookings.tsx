import { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Calendar, MapPin, Ticket as TicketIcon, Navigation, Users, Clock, Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/navbar';

const MY_BOOKINGS = [
  {
    id: '1',
    event: 'Summer Music Festival 2025',
    date: 'Feb 15, 2025',
    time: '6:00 PM - 11:00 PM',
    location: 'Central Park',
    address: 'Central Park, New York, NY 10022',
    latitude: 40.7829,
    longitude: -73.9654,
    tickets: 2,
    price: '$150',
    totalPaid: '$150',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    organizer: 'Live Nation',
    bookingDate: 'Jan 10, 2025',
    status: 'Confirmed',
    rating: 4.8
  },
  {
    id: '2',
    event: 'Tech Innovation Conference',
    date: 'Feb 20, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Convention Center',
    address: '655 West 34th Street, New York, NY 10001',
    latitude: 40.7557,
    longitude: -73.9973,
    tickets: 1,
    price: '$299',
    totalPaid: '$299',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    organizer: 'TechCorp Events',
    bookingDate: 'Jan 12, 2025',
    status: 'Confirmed',
    rating: 4.9
  },
  {
    id: '3',
    event: 'Food & Wine Festival',
    date: 'Mar 5, 2025',
    time: '12:00 PM - 8:00 PM',
    location: 'Brooklyn Waterfront',
    address: 'Brooklyn Bridge Park, Brooklyn, NY 11201',
    latitude: 40.7024,
    longitude: -73.9875,
    tickets: 3,
    price: '$255',
    totalPaid: '$255',
    category: 'Food & Drink',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    organizer: 'NYC Food Events',
    bookingDate: 'Jan 15, 2025',
    status: 'Confirmed',
    rating: 4.7
  },
];

export default function BookingsScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      setIsAuthenticated(!!token);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAuth();
    }, [])
  );

  const openInMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50">
        <Navbar title="My Bookings" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-gray-50">
        <Navbar title="My Bookings" />

        <View className="flex-1 p-4">
          <View className="flex-1 items-center justify-center bg-white rounded-2xl p-10 mt-10 shadow-lg">
            <TicketIcon size={60} color="#9ca3af" />
            <Text className="text-2xl font-bold text-gray-800 mt-5 mb-2">Sign in Required</Text>
            <Text className="text-base text-gray-500 text-center mb-6">
              Please sign in to view your bookings
            </Text>
            <TouchableOpacity
              className="bg-sky-500 px-8 py-3.5 rounded-xl"
              onPress={() => router.push('/auth/login')}
            >
              <Text className="text-white text-base font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Navbar title="My Bookings" />

      {/* Bookings Count */}
      <View className="bg-white px-5 py-3 border-b border-gray-200">
        <Text className="text-sm text-gray-500 font-medium">
          {MY_BOOKINGS.length} upcoming events
        </Text>
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {MY_BOOKINGS.length === 0 ? (
          <View className="items-center justify-center py-20 bg-white rounded-2xl mt-10 px-8">
            <TicketIcon size={60} color="#d1d5db" />
            <Text className="text-2xl font-bold text-gray-800 mt-5 mb-2">No Bookings Yet</Text>
            <Text className="text-base text-gray-500 text-center mb-6">
              Your booked events will appear here
            </Text>
            <TouchableOpacity
              className="bg-sky-500 px-8 py-3.5 rounded-xl"
              onPress={() => router.push('/(tabs)')}
            >
              <Text className="text-white text-base font-semibold">Browse Events</Text>
            </TouchableOpacity>
          </View>
        ) : (
          MY_BOOKINGS.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              className="bg-white rounded-2xl mb-5 overflow-hidden shadow-lg"
              onPress={() => router.push(`/event/${booking.id}`)}
              activeOpacity={0.9}
            >
              {/* Event Image */}
              <Image
                source={{ uri: booking.image }}
                className="w-full h-52 bg-gray-200"
                resizeMode="cover"
              />
              
              {/* Status Badge */}
              <View className="absolute top-4 right-4 flex-row items-center bg-emerald-500/95 px-3 py-1.5 rounded-full" style={{ gap: 6 }}>
                <View className="w-1.5 h-1.5 rounded-full bg-white" />
                <Text className="text-white text-xs font-semibold">{booking.status}</Text>
              </View>

              {/* Event Details */}
              <View className="p-4">
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="flex-1 text-xl font-bold text-gray-800 mr-2" numberOfLines={2}>
                    {booking.event}
                  </Text>
                  <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-xl" style={{ gap: 4 }}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text className="text-xs font-semibold text-amber-900">{booking.rating}</Text>
                  </View>
                </View>
                
                <Text className="text-sm text-gray-500 mb-4">by {booking.organizer}</Text>

                {/* Date & Time */}
                <View className="flex-row items-start mb-3" style={{ gap: 12 }}>
                  <Calendar size={18} color="#0ea5e9" />
                  <View className="flex-1">
                    <Text className="text-base text-gray-800 font-semibold mb-0.5">{booking.date}</Text>
                    <Text className="text-xs text-gray-500">{booking.time}</Text>
                  </View>
                </View>

                {/* Location */}
                <View className="flex-row items-start mb-3" style={{ gap: 12 }}>
                  <MapPin size={18} color="#10b981" />
                  <View className="flex-1">
                    <Text className="text-base text-gray-800 font-semibold mb-0.5">{booking.location}</Text>
                    <Text className="text-xs text-gray-500">{booking.address}</Text>
                  </View>
                </View>

                {/* Ticket & Price Info */}
                <View className="bg-gray-50 rounded-xl p-4 mt-1 mb-4">
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center" style={{ gap: 8 }}>
                      <TicketIcon size={16} color="#6b7280" />
                      <Text className="text-base text-gray-800 font-medium">
                        {booking.tickets} {booking.tickets === 1 ? 'Ticket' : 'Tickets'}
                      </Text>
                    </View>
                    <Text className="text-xl font-bold text-gray-800">{booking.totalPaid}</Text>
                  </View>
                  <Text className="text-xs text-gray-500">Booked on {booking.bookingDate}</Text>
                </View>

                {/* Action Buttons */}
                <View className="flex-row" style={{ gap: 12 }}>
                  <TouchableOpacity 
                    className="flex-1 flex-row bg-sky-500 py-3.5 rounded-xl items-center justify-center"
                    style={{ gap: 8 }}
                    onPress={() => {/* View tickets logic */}}
                  >
                    <TicketIcon size={18} color="#ffffff" />
                    <Text className="text-white text-base font-semibold">View Tickets</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className="w-12 h-12 bg-blue-50 rounded-xl items-center justify-center border border-blue-200"
                    onPress={() => openInMaps(booking.latitude, booking.longitude)}
                  >
                    <Navigation size={18} color="#0ea5e9" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}