import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showLanding, setShowLanding] = useState(true);

  // Color schemes matching each page - using the exact colors from your pages
  const pageColors = {
    home: {
      primary: '#0A0A0A',
      bg: '#FFFFFF', // White background for home
      text: '#0A0A0A', // Black text for home
    },
    preferences: {
      primary: '#ffe46e',
      bg: '#ffe46e', // Yellow background
      text: '#FFFFFF', // White text
    },
    matches: {
      primary: '#BAD7F2',
      bg: '#BAD7F2', // Blue background
      text: '#FFFFFF', // White text
    },
    community: {
      primary: '#F4AD53',
      bg: '#F4AD53', // Orange background
      text: '#FFFFFF', // White text
    },
    'find-friends': {
      primary: '#C1F27B',
      bg: '#C1F27B', // Green background
      text: '#FFFFFF', // White text
    },
  };

  // Hide landing page after 2 seconds and navigate to preferences
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render tabs while showing landing page
  if (showLanding) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: pageColors.home.bg, // Default to home background
          borderTopWidth: 0, // Remove border for seamless look
          height: 85,
          paddingBottom: 15,
          paddingTop: 10,
          // Remove shadow since background will match page
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '800',
          marginTop: 4,
          letterSpacing: 0.3,
          color: '#FFFFFF', // White text for all labels
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarActiveTintColor: '#FFFFFF', // White active text
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white inactive text
      }}>
      
      {/* Home Tab - White Background with Black Text */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarActiveTintColor: pageColors.home.text, // Black text for home
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 1)', // Semi-transparent black for home
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol 
              size={28} 
              name="house.fill" 
              color={focused ? pageColors.home.text : color} // Black icon for home
            />
          ),
          tabBarStyle: {
            backgroundColor: pageColors.home.bg, // White background
            borderTopWidth: 0,
            height: 85,
            paddingBottom: 15,
            paddingTop: 10,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
        }}
      />

      {/* Preferences Tab - Yellow Background */}
      <Tabs.Screen
        name="preferences"
        options={{
          title: 'Find Counselor',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol 
              size={28} 
              name="heart.fill" 
              color={focused ? '#FFFFFF' : color} // White icon when active
            />
          ),
          tabBarStyle: {
            backgroundColor: pageColors.preferences.bg, // Yellow background
            borderTopWidth: 0,
            height: 85,
            paddingBottom: 15,
            paddingTop: 10,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
        }}
      />

      {/* Matches Tab - Blue Background */}
      <Tabs.Screen
        name="matches"
        options={{
          title: 'My Matches',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol 
              size={28} 
              name="person.3.fill" 
              color={focused ? '#FFFFFF' : color} // White icon when active
            />
          ),
          tabBarStyle: {
            backgroundColor: pageColors.matches.bg, // Blue background
            borderTopWidth: 0,
            height: 85,
            paddingBottom: 15,
            paddingTop: 10,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
        }}
      />

      {/* Community Tab - Orange Background */}
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol 
              size={28} 
              name="bubble.left.and.bubble.right.fill" 
              color={focused ? '#FFFFFF' : color} // White icon when active
            />
          ),
          tabBarStyle: {
            backgroundColor: pageColors.community.bg, // Orange background
            borderTopWidth: 0,
            height: 85,
            paddingBottom: 15,
            paddingTop: 10,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
        }}
      />

      {/* Find Friends Tab - Green Background */}
      <Tabs.Screen
        name="find-friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ focused, color }) => (
            <IconSymbol 
              size={28} 
              name="person.2.fill" 
              color={focused ? '#FFFFFF' : color} // White icon when active
            />
          ),
          tabBarStyle: {
            backgroundColor: pageColors['find-friends'].bg, // Green background
            borderTopWidth: 0,
            height: 85,
            paddingBottom: 15,
            paddingTop: 10,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
        }}
      />
    </Tabs>
  );
}