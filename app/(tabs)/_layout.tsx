import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Enhanced brand colors for dark mode
  const brandColors = {
    teal: '#4A8A9E',
    tealLight: '#6BA8BC',
    orange: '#E89964',
    purple: '#A594BD',
    green: '#85BFA1',
    cream: '#D9CFB1',
    // Dark mode optimized backgrounds
    lightBg: '#F8F9FA',
    darkBg: '#0F1117',
    darkCard: '#1A1D25',
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brandColors.tealLight,
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#6B7280' : '#A8B2C1',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? 'rgba(26, 29, 37, 0.8)' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E8ECF1',
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.05,
          shadowRadius: 8,
          elevation: 8,
          backdropFilter: colorScheme === 'dark' ? 'blur(20px)' : 'none',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="preferences"
        options={{
          title: 'Find Counselor',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'My Matches',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.3.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="bubble.left.and.bubble.right.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="find-friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.2.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}