import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Discover</Text>
            <Text style={styles.title}>Amazing Events</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{ALL_EVENTS.length} Events</Text>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
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
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
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
      </View>

      {/* Events List */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No events found</Text>
            <Text style={styles.emptyText}>Try adjusting your search or filters</Text>
          </View>
        ) : (
          filteredEvents.map((event, index) => (
            <TouchableOpacity
              key={event.id}
              style={[
                styles.eventCard,
                index === 0 && styles.eventCardFirst
              ]}
              onPress={() => router.push(`/events/${event.id}`)}
              activeOpacity={0.7}
            >
              {/* Event Image */}
              <View style={styles.eventImageContainer}>
                <Image 
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                {event.trending && (
                  <View style={styles.trendingBadge}>
                    <Text style={styles.trendingText}>🔥</Text>
                  </View>
                )}
              </View>

              {/* Event Details */}
              <View style={styles.eventContent}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {event.title}
                  </Text>
                  <View style={styles.priceTag}>
                    <Text style={styles.eventPrice}>
                      {event.price === 0 ? 'Free' : `${event.price}`}
                    </Text>
                  </View>
                </View>

                <View style={styles.categoryTag}>
                  <Text style={styles.categoryDot}>•</Text>
                  <Text style={styles.eventCategory}>{event.category}</Text>
                </View>

                <View style={styles.eventMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>📅</Text>
                    <Text style={styles.metaText}>{event.date}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>📍</Text>
                    <Text style={styles.metaText} numberOfLines={1}>
                      {event.location}
                    </Text>
                  </View>
                </View>

                {/* Attendees */}
                <View style={styles.attendeesContainer}>
                  <View style={styles.attendeesAvatars}>
                    <View style={[styles.avatar, { backgroundColor: '#fbbf24' }]} />
                    <View style={[styles.avatar, { backgroundColor: '#60a5fa', marginLeft: -8 }]} />
                    <View style={[styles.avatar, { backgroundColor: '#34d399', marginLeft: -8 }]} />
                  </View>
                  <Text style={styles.attendeesText}>
                    {event.attendees} attending
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        
        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
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
  badge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  categoriesContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#0ea5e9',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  eventCardFirst: {
    marginTop: 0,
  },
  eventImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  trendingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingText: {
    fontSize: 12,
  },
  eventContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  priceTag: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryDot: {
    fontSize: 14,
    color: '#0ea5e9',
    marginRight: 4,
  },
  eventCategory: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  eventMeta: {
    gap: 6,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#6b7280',
    flex: 1,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesAvatars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  attendeesText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
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
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});