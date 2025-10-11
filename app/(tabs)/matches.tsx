import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

      // Generate 4–5 unique counselors that match exactly
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
          rating: Number((4.7 + Math.random() * 0.3).toFixed(2)), // 4.7–5.0
          sessions: Math.floor(200 + Math.random() * 400),       // 200–600
        };
      });

      setMatches(generated);
    };

    loadMatches();
  }, []);

  const renderCounselor = ({ item }: { item: Counselor }) => (
    <View style={styles.card}>
      <ThemedText style={styles.name}>{item.name}</ThemedText>
      <ThemedText style={styles.sub}>{item.country}</ThemedText>
      <ThemedText style={styles.rating}>⭐ {item.rating} · {item.sessions} sessions</ThemedText>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Languages</ThemedText>
        <View style={styles.tags}>
          {item.languages.map((lang) => (
            <View key={lang} style={styles.tag}>
              <ThemedText style={styles.tagText}>{lang}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Specialties</ThemedText>
        <View style={styles.tags}>
          {item.specialties.map((spec) => (
            <View key={spec} style={styles.tag}>
              <ThemedText style={styles.tagText}>{spec}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Approach</ThemedText>
        <ThemedText>{item.approach}</ThemedText>
      </View>

      <TouchableOpacity style={styles.button}>
        <ThemedText style={styles.buttonText}>Book Session →</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          renderItem={renderCounselor}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <ThemedText style={{ textAlign: 'center', marginTop: 40 }}>
          No matches yet — fill out your preferences first!
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  sub: { fontSize: 14, color: '#666', marginBottom: 4 },
  rating: { fontSize: 14, color: '#444', marginBottom: 8 },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: '#E6F0F2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: { fontSize: 13, color: '#2B6B7F' },
  button: {
    marginTop: 12,
    backgroundColor: '#2B6B7F',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 15, fontWeight: '600' },
});
