import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue booking events</Text>
        </View>

        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            {/* Google */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
              disabled={socialLoading !== null}
            >
              {socialLoading === 'google' ? (
                <ActivityIndicator color="#1f2937" />
              ) : (
                <>
                  <View style={styles.googleIcon}>
                    <Text style={styles.iconText}>G</Text>
                  </View>
                  <Text style={styles.socialButtonText}>Google</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleFacebookSignIn}
              disabled={socialLoading !== null}
            >
              {socialLoading === 'facebook' ? (
                <ActivityIndicator color="#1f2937" />
              ) : (
                <>
                  <View style={[styles.socialIcon, { backgroundColor: '#1877F2' }]}>
                    <Text style={styles.socialIconText}>f</Text>
                  </View>
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleAppleSignIn}
              disabled={socialLoading !== null}
            >
              {socialLoading === 'apple' ? (
                <ActivityIndicator color="#1f2937" />
              ) : (
                <>
                  <View style={[styles.socialIcon, { backgroundColor: '#000000' }]}>
                    <Text style={styles.socialIconText}></Text>
                  </View>
                  <Text style={styles.socialButtonText}>Apple</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.linkText}>
              Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  input: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#1f2937',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    color: '#0ea5e9',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6b7280',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  socialButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#6b7280',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#0ea5e9',
    fontWeight: '600',
  },
});