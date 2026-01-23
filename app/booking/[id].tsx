import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event</Text>
          <Text style={styles.eventName}>Music Festival 2025</Text>
          <Text style={styles.eventDetails}>February 15, 2025 • Central Park</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Tickets</Text>
          <View style={styles.ticketSelector}>
            <TouchableOpacity
              style={[styles.ticketButton, ticketCount === 1 && styles.ticketButtonDisabled]}
              onPress={decreaseTickets}
              disabled={ticketCount === 1}
            >
              <Minus size={24} color={ticketCount === 1 ? '#9ca3af' : '#0ea5e9'} />
            </TouchableOpacity>

            <Text style={styles.ticketCount}>{ticketCount}</Text>

            <TouchableOpacity
              style={[styles.ticketButton, ticketCount === MAX_TICKETS && styles.ticketButtonDisabled]}
              onPress={increaseTickets}
              disabled={ticketCount === MAX_TICKETS}
            >
              <Plus size={24} color={ticketCount === MAX_TICKETS ? '#9ca3af' : '#0ea5e9'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Ticket Price × {ticketCount}
            </Text>
            <Text style={styles.priceValue}>${TICKET_PRICE * ticketCount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  ticketSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  ticketButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketButtonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  ticketCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    minWidth: 60,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  bookButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 40,
  },
});