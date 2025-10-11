import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.push('/(tabs)/preferences');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container} lightColor="#fff" darkColor="#1a1a1a">
      <Animated.View 
        style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <ThemedText style={styles.logoIcon}>❤️</ThemedText>
          </View>
        </View>
        
        <ThemedText style={styles.title} lightColor="#1a1a1a" darkColor="#fff">
          BridgeMind
        </ThemedText>
        
        <ThemedText style={styles.subtitle} lightColor="#666" darkColor="#999">
          Connecting cultures, healing hearts
        </ThemedText>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
});