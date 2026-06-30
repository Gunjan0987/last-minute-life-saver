import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useUserStore } from '../store/useUserStore';
import { Colors } from '../constants/Theme';

export default function EntryPoint() {
  const { isOnboarded } = useUserStore();

  useEffect(() => {
    // Perform redirection on mount
    if (isOnboarded) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)/onboarding');
    }
  }, [isOnboarded]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.dark.background, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.dark.accent} />
    </View>
  );
}
