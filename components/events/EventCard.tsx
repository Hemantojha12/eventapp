import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { Event } from '../../types/event';
import Button from '../ui/Button';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onPress: () => void;
  onBookPress?: () => void;
  showBookButton?: boolean;
}

export default function EventCard({ 
  event, 
  onPress, 
  onBookPress,
  showBookButton = true 
}: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4 active:opacity-90"
    >
      {/* Event Image */}
      <View className="relative">
        <Image
          source={{ uri: event.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-3 left-3">
          <View className="bg-white/90 px-3 py-1 rounded-full">
            <Text className="text-gray-900 font-bold">${event.price}</Text>
          </View>
        </View>
        <View className="absolute top-3 right-3">
          <View className="bg-black/60 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">
              {event.category}
            </Text>
          </View>
        </View>
      </View>

      {/* Event Details */}
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-900 mb-2">
          {event.title}
        </Text>
        
        <View className="space-y-2 mb-4">
          <View className="flex-row items-center">
            <Calendar size={18} color="#6b7280" />
            <Text className="text-gray-600 ml-2">
              {formattedDate} • {event.time}
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <MapPin size={18} color="#6b7280" />
            <Text className="text-gray-600 ml-2" numberOfLines={1}>
              {event.venue}, {event.location}
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <Users size={18} color="#6b7280" />
            <Text className="text-gray-600 ml-2">
              {event.availableTickets} tickets left
            </Text>
          </View>
        </View>

        {showBookButton && onBookPress && (
          <Button
            title="Book Now"
            onPress={onBookPress}
            variant="primary"
            className="w-full"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}