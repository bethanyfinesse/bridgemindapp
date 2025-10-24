import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Soft, cohesive color palette matching community page
  const brandColors = {
    primary: '#8B7BA8',        // Soft purple
    primaryDark: '#6B5B88',
    bg: '#FFFFFF',
    card: 'rgba(255, 255, 255, 0.95)',
    text: '#1F2937',
    textMuted: '#9CA3AF',
    border: 'rgba(255, 255, 255, 0.5)',
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brandColors.primary,
        tabBarInactiveTintColor: brandColors.textMuted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: brandColors.card,
          borderTopWidth: 1,
          borderTopColor: brandColors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
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