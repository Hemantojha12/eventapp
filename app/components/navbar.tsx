import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Search } from 'lucide-react-native';

interface NavbarProps {
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  title?: string;
}

export default function Navbar({ 
  showSearch = false, 
  searchQuery = '', 
  onSearchChange,
  title 
}: NavbarProps) {
  return (
    <View style={styles.navbar}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Optional Title */}
      {title && !showSearch && (
        <Text style={styles.pageTitle}>{title}</Text>
      )}

      {/* Search Bar (Optional) */}
      {showSearch && (
        <View style={styles.navSearchContainer}>
          <Search size={18} color="#9ca3af" />
          <TextInput
            style={styles.navSearchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery && searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange?.('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  logoContainer: {
    marginBottom: 12,
  },
  logo: {
    width: 120,
    height: 40,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
  },
  navSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 10,
  },
  navSearchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1f2937',
  },
  clearButton: {
    fontSize: 18,
    color: '#9ca3af',
    paddingHorizontal: 4,
  },
});