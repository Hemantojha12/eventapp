import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await AsyncStorage.setItem('@auth_token', 'demo_token_123');
      
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setSocialLoading('google');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await AsyncStorage.setItem('@auth_token', 'google_token_123');
      Alert.alert('Success', 'Signed up with Google!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Google sign-up failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleFacebookSignUp = async () => {
    setSocialLoading('facebook');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await AsyncStorage.setItem('@auth_token', 'facebook_token_123');
      Alert.alert('Success', 'Signed up with Facebook!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Facebook sign-up failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleAppleSignUp = async () => {
    setSocialLoading('apple');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await AsyncStorage.setItem('@auth_token', 'apple_token_123');
      Alert.alert('Success', 'Signed up with Apple!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Apple sign-up failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-6 justify-center">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-800 mb-2">Create Account</Text>
            <Text className="text-base text-gray-500">Join us to start booking amazing events</Text>
          </View>

          <View style={{ gap: 20 }}>
            {/* Name Input */}
            <View style={{ gap: 8 }}>
              <Text className="text-sm font-semibold text-gray-800">Full Name</Text>
              <TextInput
                className="bg-gray-50 p-4 rounded-xl text-base border border-gray-200 text-gray-800"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoComplete="name"
              />
            </View>

            {/* Email Input */}
            <View style={{ gap: 8 }}>
              <Text className="text-sm font-semibold text-gray-800">Email</Text>
              <TextInput
                className="bg-gray-50 p-4 rounded-xl text-base border border-gray-200 text-gray-800"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={{ gap: 8 }}>
              <Text className="text-sm font-semibold text-gray-800">Password</Text>
              <TextInput
                className="bg-gray-50 p-4 rounded-xl text-base border border-gray-200 text-gray-800"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password-new"
              />
            </View>

            {/* Confirm Password Input */}
            <View style={{ gap: 8 }}>
              <Text className="text-sm font-semibold text-gray-800">Confirm Password</Text>
              <TextInput
                className="bg-gray-50 p-4 rounded-xl text-base border border-gray-200 text-gray-800"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="password-new"
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className={`bg-sky-500 p-4 rounded-xl items-center mt-2 shadow-lg ${
                loading ? 'opacity-60' : ''
              }`}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white text-base font-semibold">Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-2">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-gray-500 text-sm">Or sign up with</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Sign-Up Buttons */}
            <View className="flex-row" style={{ gap: 12 }}>
              {/* Google */}
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center p-3.5 rounded-xl bg-gray-50 border border-gray-200"
                style={{ gap: 8 }}
                onPress={handleGoogleSignUp}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'google' ? (
                  <ActivityIndicator color="#1f2937" />
                ) : (
                  <>
                    <View className="w-6 h-6 rounded-xl bg-white items-center justify-center border border-gray-200">
                      <Text className="text-sm font-bold text-gray-800">G</Text>
                    </View>
                    <Text className="text-xs font-semibold text-gray-800">Google</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Facebook */}
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center p-3.5 rounded-xl bg-gray-50 border border-gray-200"
                style={{ gap: 8 }}
                onPress={handleFacebookSignUp}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'facebook' ? (
                  <ActivityIndicator color="#1f2937" />
                ) : (
                  <>
                    <View className="w-6 h-6 rounded-xl items-center justify-center" style={{ backgroundColor: '#1877F2' }}>
                      <Text className="text-base font-bold text-white">f</Text>
                    </View>
                    <Text className="text-xs font-semibold text-gray-800">Facebook</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Apple */}
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center p-3.5 rounded-xl bg-gray-50 border border-gray-200"
                style={{ gap: 8 }}
                onPress={handleAppleSignUp}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'apple' ? (
                  <ActivityIndicator color="#1f2937" />
                ) : (
                  <>
                    <View className="w-6 h-6 rounded-xl bg-black items-center justify-center">
                      <Text className="text-base font-bold text-white"></Text>
                    </View>
                    <Text className="text-xs font-semibold text-gray-800">Apple</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <Text className="text-xs text-gray-500 text-center leading-5">
              By signing up, you agree to our{' '}
              <Text className="text-sky-500 font-semibold">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-sky-500 font-semibold">Privacy Policy</Text>
            </Text>

            {/* Login Link */}
            <TouchableOpacity
              className="items-center mt-2"
              onPress={() => router.push('/auth/login')}
            >
              <Text className="text-gray-500 text-sm">
                Already have an account? <Text className="text-sky-500 font-semibold">Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}