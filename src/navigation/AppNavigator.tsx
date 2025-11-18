/**
 * App Navigator
 * Main navigation structure for Gayu & B
 */

import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useStore } from '../store/useStore';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import GoalsScreen from '../screens/GoalsScreen';
import LoveScreen from '../screens/LoveScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WatchListScreen from '../screens/WatchListScreen';
import MemoriesScreen from '../screens/MemoriesScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'flower' : 'flower-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'Goals') {
            iconName = focused ? 'flag' : 'flag-outline';
          } else if (route.name === 'Love') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary.sharedPurple,
        tabBarInactiveTintColor: colors.text.light.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background.cardLight,
          borderTopColor: colors.text.light.disabled,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: colors.background.light,
        },
        headerTintColor: colors.text.light.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{ title: 'To-Do List' }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{ title: 'Bucket List' }}
      />
      <Tab.Screen
        name="Love"
        component={LoveScreen}
        options={{ title: 'Love Center' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated } = useStore();

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="WatchList"
              component={WatchListScreen}
              options={{
                headerShown: true,
                title: 'Watch List',
                headerStyle: { backgroundColor: colors.background.light },
                headerTintColor: colors.text.light.primary,
              }}
            />
            <Stack.Screen
              name="Memories"
              component={MemoriesScreen}
              options={{
                headerShown: true,
                title: 'Memories',
                headerStyle: { backgroundColor: colors.background.light },
                headerTintColor: colors.text.light.primary,
              }}
            />
            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{
                headerShown: true,
                title: 'Calendar',
                headerStyle: { backgroundColor: colors.background.light },
                headerTintColor: colors.text.light.primary,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
