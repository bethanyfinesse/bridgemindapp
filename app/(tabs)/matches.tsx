import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const PREFS_KEY = '@bridgemind_preferences';

interface Preferences {
  language: string;
  country: string;
  struggles: string[];
  approach?: string;
}

interface Counselor {
  id: number;
  name: string;
  languages: string[];
  country: string;
  specialties: string[];
  approach: string;
  rating: number;
  sessions: number;
}

const names = [
  'Dr. Priya Patel',
  'Dr. Wei Chen',
  'Dr. Maria Santos',
  'Dr. Ahmed Hassan',
  'Dr. Sophie Dubois',
  'Dr. Elena Volkov',
  'Dr. Min-jun Park',
  'Dr. Thao Nguyen',
  'Dr. Raj Sharma',
  'Dr. Fatima Khan'
];

const extraSpecialties = [
  'Relationship Issues',
  'Career Guidance',
  'Self-Esteem',
  'Stress Management',
  'Life Transitions',
  'Trauma',
  'Social Anxiety',
  'Grief'
];

// Monochrome color palette using #BAD7F2
const COLORS = {
  primary: '#BAD7F2',
  primaryLight: '#A8CDF0',
  primaryDark: '#8FBDE8',
  white: '#FFFFFF',
  pureWhite: '#FFFFFF',
  textOnBlue: '#FFFFFF', // White text for better contrast on blue backgrounds
};

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Counselor[]>([]);

  useEffect(() => {
    const loadMatches = async () => {
      const prefsStr = await AsyncStorage.getItem(PREFS_KEY);
      if (!prefsStr) return;

      const prefs: Preferences = JSON.parse(prefsStr);

      const generated: Counselor[] = Array.from({ length: 4 }, (_, i) => {
        const baseSpecialties = [...prefs.struggles];
        const extras = [...extraSpecialties].sort(() => 0.5 - Math.random()).slice(0, 2);

        return {
          id: i + 1,
          name: names[i % names.length],
          languages: [prefs.language, 'English'],
          country: prefs.country,
          specialties: [...baseSpecialties, ...extras],
          approach: prefs.approach ? `${prefs.approach}, Mindfulness` : 'CBT, Mindfulness',
          rating: Number((4.7 + Math.random() * 0.3).toFixed(2)),
          sessions: Math.floor(200 + Math.random() * 400),
        };
      });

      setMatches(generated);
    };

    loadMatches();
  }, []);

  const renderCounselor = ({ item }: { item: Counselor }) => (
    <View style={styles.card}>
      {/* Header with avatar and basic info */}
      <View style={styles.counselorHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <ThemedText style={styles.avatarText}>
              {item.name.split(' ').map(n => n[0]).join('')}
            </ThemedText>
          </View>
        </View>
        <View style={styles.counselorInfo}>
          <ThemedText style={styles.name}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.country}>
            {item.country}
          </ThemedText>
        </View>
      </View>

      {/* Rating and sessions */}
      <View style={styles.ratingRow}>
        <View style={styles.ratingContainer}>
          <ThemedText style={styles.rating}>
            ★ {item.rating}
          </ThemedText>
        </View>
        <ThemedText style={styles.sessions}>
          {item.sessions} sessions
        </ThemedText>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          LANGUAGES
        </ThemedText>
        <View style={styles.tags}>
          {item.languages.map((lang) => (
            <View key={lang} style={styles.tag}>
              <ThemedText style={styles.tagText}>
                {lang}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Specialties */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          SPECIALTIES
        </ThemedText>
        <View style={styles.tags}>
          {item.specialties.map((spec) => (
            <View key={spec} style={styles.tag}>
              <ThemedText style={styles.tagText}>
                {spec}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Approach */}
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          APPROACH
        </ThemedText>
        <ThemedText style={styles.approachText}>
          {item.approach}
        </ThemedText>
      </View>

      {/* Book Button - ONLY WHITE ELEMENT */}
      <TouchableOpacity style={styles.button}>
        <ThemedText style={styles.buttonText}>
          BOOK SESSION →
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryLight, COLORS.primary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          MY MATCHES
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Counselors matched to your preferences
        </ThemedText>
      </View>

      {/* Content */}
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          renderItem={renderCounselor}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyText}>
            No matches yet — fill out your preferences first!
          </ThemedText>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 1.5,
    color: COLORS.textOnBlue,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textOnBlue,
    letterSpacing: 0.8,
    lineHeight: 22,
    opacity: 0.9,
  },
  listContent: {
    paddingHorizontal: 32,
    paddingBottom: 100,
    paddingTop: 16,
  },
  card: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 28, // Increased to match the soft pill-like aesthetic (from 20)
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  counselorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white, // White background
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary, // Blue stroke
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary, // Blue text
    letterSpacing: 0.5,
  },
  counselorInfo: {
    flex: 1,
  },
  name: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 4,
    color: COLORS.textOnBlue,
    letterSpacing: 0.3,
  },
  country: { 
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textOnBlue,
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  ratingContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16, // Increased to match the soft theme (from 12)
  },
  rating: { 
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textOnBlue,
    letterSpacing: 0.5,
  },
  sessions: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textOnBlue,
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  section: { 
    marginBottom: 20,
  },
  sectionTitle: { 
    fontSize: 11, 
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    color: COLORS.textOnBlue,
    opacity: 0.8,
  },
  approachText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textOnBlue,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  tags: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16, // Increased to match the soft theme (from 12)
  },
  tagText: { 
    fontSize: 12, 
    fontWeight: '600',
    color: COLORS.textOnBlue,
    letterSpacing: 0.3,
  },
  button: {
    marginTop: 8,
    backgroundColor: COLORS.white, // ONLY WHITE BACKGROUND
    paddingVertical: 16,
    borderRadius: 30, // Maximum border radius - very rounded pill shape
    alignItems: 'center',
    shadowColor: COLORS.primaryDark, // Blue shadow color
    shadowOffset: {
      width: 0,
      height: 6, // Slightly larger shadow offset
    },
    shadowOpacity: 0.25, // Increased shadow opacity
    shadowRadius: 12, // Increased shadow blur
    elevation: 8, // Increased elevation for Android
  },
  buttonText: { 
    fontSize: 15, 
    fontWeight: '700',
    color: COLORS.primary, // Primary color text on white button
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textOnBlue,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});