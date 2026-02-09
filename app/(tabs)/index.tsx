import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
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
    <View style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.title}>Discover Events</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Events */}
        {searchQuery === '' && selectedCategory === 'All' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <TrendingUp size={20} color="#0ea5e9" />
                <Text style={styles.sectionTitle}>Featured Events</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
              {featuredEvents.map(event => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.featuredCard}
                  onPress={() => router.push(`/events/${event.id}`)}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: event.image }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay}>
                    <View style={styles.featuredBadge}>
                      <Star size={12} color="#fbbf24" fill="#fbbf24" />
                      <Text style={styles.featuredBadgeText}>Featured</Text>
                    </View>
                    <View style={styles.featuredInfo}>
                      <Text style={styles.featuredTitle} numberOfLines={2}>{event.title}</Text>
                      <View style={styles.featuredDetails}>
                        <View style={styles.featuredDetail}>
                          <Calendar size={14} color="#ffffff" />
                          <Text style={styles.featuredDetailText}>{event.date}</Text>
                        </View>
                        <View style={styles.featuredDetail}>
                          <MapPin size={14} color="#ffffff" />
                          <Text style={styles.featuredDetailText}>{event.shortLocation}</Text>
                        </View>
                      </View>
                      <Text style={styles.featuredPrice}>${event.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* All Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Events' : selectedCategory}
          </Text>
          <Text style={styles.sectionSubtitle}>{filteredEvents.length} events available</Text>
        </View>

        <View style={styles.eventsGrid}>
          {filteredEvents.map(event => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => router.push(`/events/${event.id}`)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              
              {/* Category Badge */}
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{event.category}</Text>
              </View>

              {/* Rating */}
              <View style={styles.ratingBadge}>
                <Star size={12} color="#fbbf24" fill="#fbbf24" />
                <Text style={styles.ratingText}>{event.rating}</Text>
              </View>

              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
                
                <View style={styles.eventDetail}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.eventDetailText}>{event.date} • {event.time}</Text>
                </View>

                <View style={styles.eventDetail}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.eventDetailText} numberOfLines={1}>{event.location}</Text>
                </View>

                <View style={styles.eventFooter}>
                  <View style={styles.attendeesContainer}>
                    <Users size={14} color="#6b7280" />
                    <Text style={styles.attendeesText}>{event.attendees}+</Text>
                  </View>
                  <Text style={styles.eventPrice}>${event.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Search size={60} color="#d1d5db" />
            <Text style={styles.emptyTitle}>No events found</Text>
            <Text style={styles.emptyText}>Try adjusting your search or filters</Text>
          </View>
        )}
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  greetingSection: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  featuredScroll: {
    marginTop: 12,
    marginLeft: -20,
  },
  featuredCard: {
    width: 320,
    height: 240,
    marginLeft: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    padding: 16,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251, 191, 36, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  featuredBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredInfo: {
    gap: 8,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  featuredDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  featuredDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredDetailText: {
    color: '#ffffff',
    fontSize: 13,
  },
  featuredPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipActive: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  eventsGrid: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e5e7eb',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(14, 165, 233, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  attendeesText: {
    fontSize: 13,
    color: '#6b7280',
  },
  eventPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});