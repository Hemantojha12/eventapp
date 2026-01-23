import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
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
      <View style={styles.container}>
        <Navbar title="My Bookings" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Navbar title="My Bookings" />

        <View style={styles.content}>
          <View style={styles.loginPrompt}>
            <TicketIcon size={60} color="#9ca3af" />
            <Text style={styles.promptTitle}>Sign in Required</Text>
            <Text style={styles.promptText}>
              Please sign in to view your bookings
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar title="My Bookings" />

      {/* Bookings Count */}
      <View style={styles.headerInfo}>
        <Text style={styles.subtitle}>{MY_BOOKINGS.length} upcoming events</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {MY_BOOKINGS.length === 0 ? (
          <View style={styles.emptyState}>
            <TicketIcon size={60} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptyText}>
              Your booked events will appear here
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.browseButtonText}>Browse Events</Text>
            </TouchableOpacity>
          </View>
        ) : (
          MY_BOOKINGS.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.bookingCard}
              onPress={() => router.push(`/event/${booking.id}`)}
              activeOpacity={0.9}
            >
              {/* Event Image */}
              <Image
                source={{ uri: booking.image }}
                style={styles.eventImage}
                resizeMode="cover"
              />
              
              {/* Status Badge */}
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{booking.status}</Text>
              </View>

              {/* Event Details */}
              <View style={styles.eventDetails}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {booking.event}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{booking.rating}</Text>
                  </View>
                </View>
                
                <Text style={styles.organizerText}>by {booking.organizer}</Text>

                {/* Date & Time */}
                <View style={styles.infoRow}>
                  <Calendar size={18} color="#0ea5e9" />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoValue}>{booking.date}</Text>
                    <Text style={styles.infoSubValue}>{booking.time}</Text>
                  </View>
                </View>

                {/* Location */}
                <View style={styles.infoRow}>
                  <MapPin size={18} color="#10b981" />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoValue}>{booking.location}</Text>
                    <Text style={styles.infoSubValue}>{booking.address}</Text>
                  </View>
                </View>

                {/* Ticket & Price Info */}
                <View style={styles.ticketInfoContainer}>
                  <View style={styles.ticketInfoRow}>
                    <View style={styles.ticketDetail}>
                      <TicketIcon size={16} color="#6b7280" />
                      <Text style={styles.ticketLabel}>
                        {booking.tickets} {booking.tickets === 1 ? 'Ticket' : 'Tickets'}
                      </Text>
                    </View>
                    <Text style={styles.priceValue}>{booking.totalPaid}</Text>
                  </View>
                  <Text style={styles.bookingDateText}>Booked on {booking.bookingDate}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.viewTicketsButton}
                    onPress={() => {/* View tickets logic */}}
                  >
                    <TicketIcon size={18} color="#ffffff" />
                    <Text style={styles.viewTicketsText}>View Tickets</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.directionsButton}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerInfo: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loginPrompt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 8,
  },
  promptText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginTop: 40,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  browseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  eventDetails: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  eventTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fffbeb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400e',
  },
  organizerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoValue: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '600',
    marginBottom: 2,
  },
  infoSubValue: {
    fontSize: 13,
    color: '#6b7280',
  },
  ticketInfoContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  ticketInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketLabel: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  bookingDateText: {
    fontSize: 13,
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewTicketsButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  viewTicketsText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  directionsButton: {
    width: 50,
    height: 50,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
});