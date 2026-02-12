import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with your actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store token
      await AsyncStorage.setItem('@auth_token', 'demo_token_123');
      
      // Navigate back to profile
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading('google');
    try {
      // TODO: Implement Google Sign-In
      // For now, simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store token
      await AsyncStorage.setItem('@auth_token', 'google_token_123');
      
      Alert.alert('Success', 'Signed in with Google!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Google sign-in failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleFacebookSignIn = async () => {
    setSocialLoading('facebook');
    try {
      // TODO: Implement Facebook Sign-In
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await AsyncStorage.setItem('@auth_token', 'facebook_token_123');
      
      Alert.alert('Success', 'Signed in with Facebook!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Facebook sign-in failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleAppleSignIn = async () => {
    setSocialLoading('apple');
    try {
      // TODO: Implement Apple Sign-In
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await AsyncStorage.setItem('@auth_token', 'apple_token_123');
      
      Alert.alert('Success', 'Signed in with Apple!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Apple sign-in failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 p-6 justify-center">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</Text>
          <Text className="text-base text-gray-500">Sign in to continue booking events</Text>
        </View>

        <View style={{ gap: 20 }}>
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
              autoComplete="password"
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end -mt-2">
            <Text className="text-sky-500 text-sm font-semibold">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className={`bg-sky-500 p-4 rounded-xl items-center mt-2 shadow-lg ${
              loading ? 'opacity-60' : ''
            }`}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-base font-semibold">Login</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-2">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-500 text-sm">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row" style={{ gap: 12 }}>
            {/* Google */}
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center p-3.5 rounded-xl bg-gray-50 border border-gray-200"
              style={{ gap: 8 }}
              onPress={handleGoogleSignIn}
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
              onPress={handleFacebookSignIn}
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
              onPress={handleAppleSignIn}
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

          {/* Sign Up Link */}
          <TouchableOpacity
            className="items-center mt-2"
            onPress={() => router.push('/auth/register')}
          >
            <Text className="text-gray-500 text-sm">
              Don't have an account? <Text className="text-sky-500 font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}