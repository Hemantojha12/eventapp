import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Settings, LogOut, LogIn, Bell, HelpCircle, Shield, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
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

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('@auth_token');
            setIsAuthenticated(false);
            Alert.alert('Success', 'You have been logged out');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-white pt-15 pb-5 px-5 border-b border-gray-100">
          <Text className="text-3xl font-bold text-gray-800">Profile</Text>
        </View>
      </View>
    );
  }

  // Not authenticated - show login/signup options
  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-white pt-15 pb-5 px-5 border-b border-gray-100">
          <Text className="text-3xl font-bold text-gray-800">Profile</Text>
        </View>

        <View className="p-5 pb-10">
          <View className="items-center justify-center bg-white rounded-2xl p-8 mt-10 shadow-lg">
            <View className="w-25 h-25 rounded-full bg-gray-100 items-center justify-center mb-6">
              <User size={50} color="#9ca3af" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Welcome to Eventa</Text>
            <Text className="text-base text-gray-500 text-center mb-8">
              Sign in to book events and manage your tickets
            </Text>

            <View className="w-full gap-3">
              <TouchableOpacity
                className="flex-row bg-sky-500 p-4 rounded-xl items-center justify-center gap-2"
                onPress={() => router.push('/auth/login')}
              >
                <LogIn size={20} color="#ffffff" />
                <Text className="text-white text-base font-semibold">Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-gray-100 p-4 rounded-xl items-center"
                onPress={() => router.push('/auth/register')}
              >
                <Text className="text-gray-800 text-base font-semibold">Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Authenticated - show profile
  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white pt-15 pb-5 px-5 border-b border-gray-100">
        <Text className="text-3xl font-bold text-gray-800">Profile</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-5 pb-10">
          {/* Profile Header Card */}
          <View className="items-center bg-white rounded-2xl p-6 mb-5 shadow-lg">
            <View className="w-20 h-20 rounded-full bg-sky-100 items-center justify-center mb-4">
              <User size={40} color="#0ea5e9" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-1">John Doe</Text>
            <Text className="text-base text-gray-500 mb-4">john.doe@example.com</Text>
            <TouchableOpacity className="bg-gray-100 px-6 py-2.5 rounded-full">
              <Text className="text-sm font-semibold text-gray-800">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Sections */}
          <View className="gap-4">
            {/* Account Settings */}
            <View className="bg-white rounded-2xl p-1 shadow-md">
              <Text className="text-sm font-semibold text-gray-500 px-4 pt-3 pb-2 uppercase tracking-wide">
                Account
              </Text>
              
              <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-xl">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
                    <Settings size={20} color="#0ea5e9" />
                  </View>
                  <Text className="text-base text-gray-800 font-medium">Settings</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-xl">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-amber-50 items-center justify-center">
                    <Bell size={20} color="#f59e0b" />
                  </View>
                  <Text className="text-base text-gray-800 font-medium">Notifications</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-xl">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-purple-50 items-center justify-center">
                    <Shield size={20} color="#a855f7" />
                  </View>
                  <Text className="text-base text-gray-800 font-medium">Privacy & Security</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {/* Support Section */}
            <View className="bg-white rounded-2xl p-1 shadow-md">
              <Text className="text-sm font-semibold text-gray-500 px-4 pt-3 pb-2 uppercase tracking-wide">
                Support
              </Text>
              
              <TouchableOpacity className="flex-row items-center justify-between p-4 rounded-xl">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                    <HelpCircle size={20} color="#3b82f6" />
                  </View>
                  <Text className="text-base text-gray-800 font-medium">Help Center</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {/* Logout Section - More Prominent */}
            <View className="bg-white rounded-2xl p-2 shadow-md">
              <TouchableOpacity 
                className="flex-row items-center justify-center p-4 gap-3 rounded-xl bg-red-50"
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center">
                  <LogOut size={20} color="#ef4444" />
                </View>
                <Text className="text-base text-red-500 font-semibold">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* App Version */}
          <Text className="text-sm text-gray-400 text-center mt-6 mb-4">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}