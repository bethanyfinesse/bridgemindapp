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

      <View style={styles.ratingRow}>
        <ThemedText style={styles.rating}>
          ★ {item.rating}
        </ThemedText>
        <ThemedText style={styles.sessions}>
          {item.sessions} sessions
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Languages
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

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Specialties
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

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Approach
        </ThemedText>
        <ThemedText style={styles.approachText}>
          {item.approach}
        </ThemedText>
      </View>

      <TouchableOpacity style={styles.button}>
        <ThemedText style={styles.buttonText}>
          Book Session →
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A1A', '#0A0A0A']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          My Matches
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
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
    flex: 1 
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 4,
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  counselorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  counselorInfo: {
    flex: 1,
  },
  name: { 
    fontSize: 18, 
    fontWeight: '500', 
    marginBottom: 2,
    color: '#FFFFFF',
  },
  country: { 
    fontSize: 14,
    color: '#888',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  rating: { 
    fontSize: 14,
    fontWeight: '500',
    color: '#CCCCCC',
  },
  sessions: {
    fontSize: 14,
    color: '#888',
  },
  section: { 
    marginBottom: 16,
  },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    color: '#888',
  },
  approachText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#CCCCCC',
  },
  tags: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8,
  },
  tag: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  tagText: { 
    fontSize: 12, 
    fontWeight: '500',
    color: '#CCCCCC',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#333',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonText: { 
    fontSize: 15, 
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.5,
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
    color: '#888',
  },
});