import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
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
      <View style={styles.container}>
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
    <View style={styles.container}>
      {/* Navbar with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Navbar />
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton} onPress={handleShare}>
            <Share2 size={20} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerActionButton} 
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
        <View style={styles.heroContainer}>
          <Image source={{ uri: event.image }} style={styles.heroImage} />
          
          {/* Category Badge */}
          <View style={styles.heroCategoryBadge}>
            <Text style={styles.heroCategoryText}>{event.category}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Title & Rating */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.ratingContainer}>
              <Star size={20} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.rating}>{event.rating}</Text>
              <Text style={styles.reviews}>({event.reviews} reviews)</Text>
            </View>
          </View>

          {/* Organizer */}
          <View style={styles.organizerSection}>
            <Text style={styles.organizerLabel}>Organized by</Text>
            <Text style={styles.organizerName}>{event.organizer}</Text>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Calendar size={24} color="#0ea5e9" />
              <Text style={styles.infoCardLabel}>Date</Text>
              <Text style={styles.infoCardValue}>{event.date}</Text>
            </View>
            <View style={styles.infoCard}>
              <Clock size={24} color="#10b981" />
              <Text style={styles.infoCardLabel}>Time</Text>
              <Text style={styles.infoCardValue}>{event.time.split(' - ')[0]}</Text>
            </View>
            <View style={styles.infoCard}>
              <Users size={24} color="#8b5cf6" />
              <Text style={styles.infoCardLabel}>Attendees</Text>
              <Text style={styles.infoCardValue}>{event.attendees}+</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Highlights</Text>
            {event.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <View style={styles.highlightDot} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>

          {/* Artists/Speakers (if available) */}
          {event.artists.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Artists</Text>
              <View style={styles.artistsContainer}>
                {event.artists.map((artist, index) => (
                  <View key={index} style={styles.artistChip}>
                    <Text style={styles.artistText}>{artist}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationCard}>
              <MapPin size={20} color="#0ea5e9" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{event.location}</Text>
                <Text style={styles.locationAddress}>{event.fullAddress}</Text>
              </View>
            </View>

            {/* Map */}
            <TouchableOpacity
              style={styles.mapContainer}
              onPress={openInMaps}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/staticmap?center=${event.latitude},${event.longitude}&zoom=15&size=600x250&markers=color:red%7C${event.latitude},${event.longitude}&key=YOUR_API_KEY`
                }}
                style={styles.mapImage}
              />
              <View style={styles.mapOverlay}>
                <Navigation size={20} color="#ffffff" />
                <Text style={styles.mapOverlayText}>Open in Maps</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View style={styles.bookingBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price per ticket</Text>
          <Text style={styles.price}>${event.price}</Text>
        </View>
        
        <View style={styles.ticketSelector}>
          <TouchableOpacity 
            style={styles.ticketButton}
            onPress={() => setTicketCount(Math.max(1, ticketCount - 1))}
          >
            <Text style={styles.ticketButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.ticketCount}>{ticketCount}</Text>
          <TouchableOpacity 
            style={styles.ticketButton}
            onPress={() => setTicketCount(Math.min(10, ticketCount + 1))}
          >
            <Text style={styles.ticketButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Ticket size={20} color="#ffffff" />
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 70,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerActions: {
    position: 'absolute',
    right: 20,
    top: 70,
    zIndex: 10,
    flexDirection: 'row',
    gap: 8,
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroCategoryBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(14, 165, 233, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  heroCategoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  reviews: {
    fontSize: 14,
    color: '#6b7280',
  },
  organizerSection: {
    marginBottom: 24,
  },
  organizerLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  infoCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoCardLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0ea5e9',
    marginTop: 8,
    marginRight: 12,
  },
  highlightText: {
    flex: 1,
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
  artistsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  artistChip: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  artistText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  mapOverlayText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  ticketSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
  },
  ticketButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  ticketButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  ticketCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 16,
  },
  bookButton: {
    flexDirection: 'row',
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});