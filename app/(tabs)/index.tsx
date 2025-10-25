import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.push('/(tabs)/preferences');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const letters = [
    { char: 'B', color: '#F7C27D' }, // Orange
    { char: 'R', color: '#C1F27B' }, // Green
    { char: 'I', color: '#BAD7F2' }, // Blue
    { char: 'D', color: '#ffe46eff' }, // Yellow
    { char: 'G', color: '#F7C27D' }, // Orange
    { char: 'E', color: '#C1F27B' }, // Green
    { char: 'M', color: '#BAD7F2' }, // Blue
    { char: 'I', color: '#ffe46eff' }, // Yellow
    { char: 'N', color: '#F7C27D' }, // Orange
    { char: 'D', color: '#C1F27B' }, // Green
  ];

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}>
        
        {/* Colored Letters */}
        <View style={styles.lettersContainer}>
          {letters.map((letter, index) => (
            <ThemedText 
              key={index}
              style={[
                styles.letter,
                { color: letter.color }
              ]}
            >
              {letter.char}
            </ThemedText>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lettersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letter: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});