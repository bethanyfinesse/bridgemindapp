import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.push('/(tabs)/preferences');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FFE8DF', '#F5E8FF', '#E0F2F7']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}>
        
        {/* Glass Logo Container */}
        <View style={styles.logoContainer}>
          <View style={styles.glassCard}>
            {/* Abstract Interwoven Circles */}
            <View style={styles.logoDesign}>
              <View style={[styles.circle, styles.circleTeal]} />
              <View style={[styles.circle, styles.circleOrange]} />
              <View style={[styles.circle, styles.circlePurple]} />
              <View style={[styles.circle, styles.circleGreen]} />
            </View>
          </View>
        </View>
        
        {/* Brand Name */}
        <View style={styles.brandContainer}>
          <ThemedText style={styles.brandText} lightColor="#2B6B7F" darkColor="#2B6B7F">
            BridgeMind
          </ThemedText>
        </View>
        
        {/* Tagline */}
        <ThemedText style={styles.tagline} lightColor="#6B7280" darkColor="#6B7280">
          Connecting cultures, healing hearts
        </ThemedText>

        {/* Loading Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </LinearGradient>
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
  glassCard: {
    width: 140,
    height: 140,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  logoDesign: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
  },
  circleTeal: {
    borderColor: '#2B6B7F',
    top: 0,
    left: 10,
  },
  circleOrange: {
    borderColor: '#D97941',
    top: 10,
    right: 0,
  },
  circlePurple: {
    borderColor: '#8B7BA8',
    bottom: 10,
    left: 0,
  },
  circleGreen: {
    borderColor: '#6BA587',
    bottom: 0,
    right: 10,
  },
  brandContainer: {
    marginBottom: 8,
  },
  brandText: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(107, 114, 128, 0.3)',
  },
  dotActive: {
    backgroundColor: '#2B6B7F',
  },
});