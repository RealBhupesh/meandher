/**
 * Gayu & B - Couples Companion App
 * Where Love Meets Productivity
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { NotificationService } from './src/services/notificationService';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize notifications
    const initializeApp = async () => {
      await NotificationService.requestPermissions();

      // Setup notification listeners
      NotificationService.setupListeners(
        (notification) => {
          console.log('Notification received:', notification);
        },
        (response) => {
          console.log('Notification response:', response);
        }
      );
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return <SplashScreen onFinish={() => setIsReady(true)} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
