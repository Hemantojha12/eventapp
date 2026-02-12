import "../global.css";
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/register" />
      <Stack.Screen 
        name="events/[id]" 
        options={{ 
          headerShown: true,
          title: 'Event Details',
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="booking/[id]" 
        options={{ 
          headerShown: true,
          title: 'Book Tickets',
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}