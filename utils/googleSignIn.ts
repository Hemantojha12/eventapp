// utils/googleSignIn.ts
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

// Configuration for Google Sign-In
export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // Replace these with your actual Google OAuth credentials
    // Get them from: https://console.cloud.google.com/
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  return { request, response, promptAsync };
};

// Function to handle Google Sign-In response
export const handleGoogleSignInResponse = async (response: any) => {
  if (response?.type === 'success') {
    const { authentication } = response;
    
    // Get user info from Google
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      }
    );
    
    const userInfo = await userInfoResponse.json();
    
    return {
      success: true,
      user: userInfo,
      token: authentication.accessToken,
    };
  }
  
  return { success: false };
};