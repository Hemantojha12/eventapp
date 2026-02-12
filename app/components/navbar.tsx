import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
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
    <View className="bg-white pt-[60px] pb-3 px-5 border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <View className="mb-3">
        <Image 
          source={require('../../assets/images/logo.png')} 
          className="w-[120px] h-10"
          resizeMode="contain"
        />
      </View>

      {/* Optional Title */}
      {title && !showSearch && (
        <Text className="text-xl font-semibold text-gray-800 mt-1">{title}</Text>
      )}

      {/* Search Bar (Optional) */}
      {showSearch && (
        <View className="flex-row items-center bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-200 gap-2.5">
          <Search size={18} color="#9ca3af" />
          <TextInput
            className="flex-1 text-[15px] text-gray-800"
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery && searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange?.('')}>
              <Text className="text-lg text-gray-400 px-1">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}