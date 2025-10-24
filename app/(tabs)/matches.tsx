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
      <View style={styles.counselorHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <ThemedText style={styles.avatarText} lightColor="#fff" darkColor="#fff">
              {item.name.split(' ').map(n => n[0]).join('')}
            </ThemedText>
          </View>
        </View>
        <View style={styles.counselorInfo}>
          <ThemedText style={styles.name} lightColor="#1F2937" darkColor="#1F2937">
            {item.name}
          </ThemedText>
          <ThemedText style={styles.country} lightColor="#6B7280" darkColor="#6B7280">
            {item.country}
          </ThemedText>
        </View>
      </View>

      <View style={styles.ratingRow}>
        <ThemedText style={styles.rating} lightColor="#374151" darkColor="#374151">
          ⭐ {item.rating}
        </ThemedText>
        <ThemedText style={styles.sessions} lightColor="#6B7280" darkColor="#6B7280">
          {item.sessions} sessions
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle} lightColor="#6B7280" darkColor="#6B7280">
          Languages
        </ThemedText>
        <View style={styles.tags}>
          {item.languages.map((lang) => (
            <View key={lang} style={styles.tag}>
              <ThemedText style={styles.tagText} lightColor="#2B6B7F" darkColor="#2B6B7F">
                {lang}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle} lightColor="#6B7280" darkColor="#6B7280">
          Specialties
        </ThemedText>
        <View style={styles.tags}>
          {item.specialties.map((spec) => (
            <View key={spec} style={styles.tag}>
              <ThemedText style={styles.tagText} lightColor="#2B6B7F" darkColor="#2B6B7F">
                {spec}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle} lightColor="#6B7280" darkColor="#6B7280">
          Approach
        </ThemedText>
        <ThemedText style={styles.approachText} lightColor="#374151" darkColor="#374151">
          {item.approach}
        </ThemedText>
      </View>

      <TouchableOpacity style={styles.button}>
        <ThemedText style={styles.buttonText} lightColor="#D97941" darkColor="#D97941">
          Book Session →
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#F8F4FF', '#FFF5F2', '#F0FAFF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle} lightColor="#1F2937" darkColor="#1F2937">
          My Matches
        </ThemedText>
        <ThemedText style={styles.headerSubtitle} lightColor="#6B7280" darkColor="#6B7280">
          Counselors matched to your preferences
        </ThemedText>
      </View>

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
          <ThemedText style={styles.emptyText} lightColor="#6B7280" darkColor="#6B7280">
            No matches yet — fill out your preferences first!
          </ThemedText>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  counselorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(43, 107, 127, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2B6B7F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
  },
  counselorInfo: {
    flex: 1,
  },
  name: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 2,
  },
  country: { 
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  rating: { 
    fontSize: 14,
    fontWeight: '500',
  },
  sessions: {
    fontSize: 14,
  },
  section: { 
    marginBottom: 12,
  },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  approachText: {
    fontSize: 14,
    lineHeight: 20,
  },
  tags: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(43, 107, 127, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(43, 107, 127, 0.2)',
  },
  tagText: { 
    fontSize: 13, 
    fontWeight: '500',
  },
  button: {
    marginTop: 12,
    backgroundColor: 'rgba(217, 121, 65, 0.15)',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(217, 121, 65, 0.2)',
  },
  buttonText: { 
    fontSize: 15, 
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});