import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Minus, Plus } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [ticketCount, setTicketCount] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      setIsAuthenticated(!!token);
      
      // If not authenticated, show alert and go back
      if (!token) {
        Alert.alert(
          'Login Required',
          'Please sign in to book tickets',
          [
            { text: 'Cancel', onPress: () => router.back() },
            { 
              text: 'Sign In', 
              onPress: () => {
                router.back();
                setTimeout(() => router.push('/auth/login'), 100);
              }
            }
          ]
        );
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const TICKET_PRICE = 50;
  const MAX_TICKETS = 10;

  const increaseTickets = () => {
    if (ticketCount < MAX_TICKETS) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decreaseTickets = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleBooking = () => {
    Alert.alert(
      'Booking Confirmed',
      `You have successfully booked ${ticketCount} ticket(s) for $${totalPrice}`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const totalPrice = ticketCount * TICKET_PRICE;

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="flex-1">
          <Text className="text-base text-gray-500 text-center mt-10">Loading...</Text>
        </View>
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-white p-5 mb-3">
          <Text className="text-base font-semibold text-gray-500 mb-3">Event</Text>
          <Text className="text-xl font-bold text-gray-800 mb-1">Music Festival 2025</Text>
          <Text className="text-sm text-gray-500">February 15, 2025 • Central Park</Text>
        </View>

        <View className="bg-white p-5 mb-3">
          <Text className="text-base font-semibold text-gray-500 mb-3">Number of Tickets</Text>
          <View className="flex-row items-center justify-center gap-8">
            <TouchableOpacity
              className={`w-12 h-12 rounded-full items-center justify-center ${
                ticketCount === 1 ? 'bg-gray-100' : 'bg-sky-100'
              }`}
              onPress={decreaseTickets}
              disabled={ticketCount === 1}
            >
              <Minus size={24} color={ticketCount === 1 ? '#9ca3af' : '#0ea5e9'} />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-gray-800 min-w-[60px] text-center">
              {ticketCount}
            </Text>

            <TouchableOpacity
              className={`w-12 h-12 rounded-full items-center justify-center ${
                ticketCount === MAX_TICKETS ? 'bg-gray-100' : 'bg-sky-100'
              }`}
              onPress={increaseTickets}
              disabled={ticketCount === MAX_TICKETS}
            >
              <Plus size={24} color={ticketCount === MAX_TICKETS ? '#9ca3af' : '#0ea5e9'} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white p-5 mb-3">
          <Text className="text-base font-semibold text-gray-500 mb-3">Price Summary</Text>
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base text-gray-500">
              Ticket Price × {ticketCount}
            </Text>
            <Text className="text-base text-gray-800 font-medium">${TICKET_PRICE * ticketCount}</Text>
          </View>
          <View className="h-[1px] bg-gray-200 my-3" />
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">Total</Text>
            <Text className="text-2xl font-bold text-sky-500">${totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      <View className="p-5 bg-white border-t border-gray-200">
        <TouchableOpacity 
          className="bg-sky-500 p-4 rounded-xl items-center"
          onPress={handleBooking}
        >
          <Text className="text-white text-base font-semibold">Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}