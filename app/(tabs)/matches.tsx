import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const PREFS_KEY = '@bridgemind_preferences';

interface Counselor {
  id: number;
  name: string;
  photo: string;
  languages: string[];
  country: string;
  specialties: string[];
  approach: string;
  rating: number;
  sessions: number;
}

const mockCounselors: Counselor[] = [
  {
    id: 1,
    name: "Dr. Maria Santos",
    photo: "👩🏽‍⚕️",
    languages: ["Spanish", "English"],
    country: "Philippines",
    specialties: ["Academic Stress", "Cultural Adjustment", "Anxiety"],
    approach: "CBT, Mindfulness",
    rating: 4.9,
    sessions: 342
  },
  {
    id: 2,
    name: "Dr. Wei Chen",
    photo: "👨🏻‍⚕️",
    languages: ["Mandarin", "English"],
    country: "China",
    specialties: ["Depression", "Family Issues", "Identity"],
    approach: "Person-Centered, ACT",
    rating: 4.8,
    sessions: 289
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    photo: "👩🏾‍⚕️",
    languages: ["Hindi", "English"],
    country: "India",
    specialties: ["Academic Stress", "Homesickness", "Anxiety"],
    approach: "CBT, Solution-Focused",
    rating: 4.9,
    sessions: 401
  }
];

export default function MatchesScreen() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(PREFS_KEY);
        if (stored) setPrefs(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleBookSession = (counselor: Counselor) => {
    Alert.alert(
      'Book Session',
      `Would you like to book a session with ${counselor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => Alert.alert('Success', 'Session booked!') }
      ]
    );
  };

  // compute matches based on prefs
  const computeMatches = () => {
    if (!prefs) return [] as Counselor[];
    const scoreFor = (c: Counselor) => {
      let score = 0;
      if (prefs.language && c.languages.includes(prefs.language)) score += 30;
      if (prefs.country && c.country && c.country.toLowerCase().includes((prefs.country || '').toLowerCase())) score += 25;
      if (prefs.struggles && prefs.struggles.length) {
        const overlap = c.specialties.filter(s => prefs.struggles.includes(s)).length;
        score += overlap * 15;
      }
      if (prefs.approach && c.approach && c.approach.toLowerCase().includes((prefs.approach || '').toLowerCase())) score += 10;
      return score;
    };

    const scored = mockCounselors.map(c => ({ c, score: scoreFor(c) }));
    scored.sort((a, b) => b.score - a.score || b.c.rating - a.c.rating);
    return scored.filter(s => s.score > 0).map(s => s.c);
  };

  const matches = computeMatches();

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badgeContainer}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.badge}>
            <View style={styles.badgeDot} />
            <ThemedText style={styles.badgeText} lightColor="#fff" darkColor="#fff">
              Matches Found!
            </ThemedText>
          </LinearGradient>
        </View>
        
        <ThemedText type="title" style={styles.title}>
          {matches.length ? `We Found ${matches.length} Matches` : 'No Matches Found'}
        </ThemedText>

        {prefs && (
          <ThemedText style={styles.subtitle} lightColor="#666" darkColor="#aaa">
            Based on: {prefs.language || '—'}, {prefs.country || '—'}
          </ThemedText>
        )}
      </View>

      {/* Counselors List */}
      <FlatList
        data={matches.length ? matches : mockCounselors}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.counselorCard}>
            <View style={styles.counselorHeader}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.photoContainer}>
                <ThemedText style={styles.photo}>{item.photo}</ThemedText>
              </LinearGradient>
              
              <View style={styles.counselorInfo}>
                <ThemedText type="defaultSemiBold" style={styles.counselorName}>
                  {item.name}
                </ThemedText>
                <ThemedText style={styles.counselorCountry} lightColor="#666" darkColor="#aaa">
                  {item.country}
                </ThemedText>
                <View style={styles.rating}>
                  <ThemedText style={styles.ratingText}>⭐ {item.rating}</ThemedText>
                  <ThemedText style={styles.sessions} lightColor="#999" darkColor="#777">
                    {item.sessions} sessions
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Languages */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel} lightColor="#999" darkColor="#777">
                LANGUAGES
              </ThemedText>
              <View style={styles.tagsRow}>
                {item.languages.map(lang => (
                  <View key={lang} style={[styles.tag, styles.tagPurple]}>
                    <ThemedText style={styles.tagText} lightColor="#667eea" darkColor="#8b9dff">
                      {lang}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Specialties */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel} lightColor="#999" darkColor="#777">
                SPECIALTIES
              </ThemedText>
              <View style={styles.tagsRow}>
                {item.specialties.map(spec => (
                  <View key={spec} style={[styles.tag, styles.tagPink]}>
                    <ThemedText style={styles.tagText} lightColor="#f5576c" darkColor="#ff6b7f">
                      {spec}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Approach */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel} lightColor="#999" darkColor="#777">
                APPROACH
              </ThemedText>
              <ThemedText style={styles.approachText} lightColor="#333" darkColor="#ccc">
                {item.approach}
              </ThemedText>
            </View>

            {/* Book Button */}
            <TouchableOpacity
              onPress={() => handleBookSession(item)}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bookButton}>
                <ThemedText 
                  type="defaultSemiBold" 
                  lightColor="#fff" 
                  darkColor="#fff"
                  style={styles.bookButtonText}>
                  Book Session →
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}>
            <ThemedText style={styles.backButtonText} lightColor="#667eea" darkColor="#8b9dff">
              ← Change Preferences
            </ThemedText>
          </TouchableOpacity>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  badgeContainer: {
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  counselorCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  counselorHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    fontSize: 40,
  },
  counselorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  counselorName: {
    fontSize: 18,
    marginBottom: 4,
  },
  counselorCountry: {
    fontSize: 13,
    marginBottom: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sessions: {
    fontSize: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagPurple: {
    backgroundColor: '#f0f4ff',
  },
  tagPink: {
    backgroundColor: '#fff0f3',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  approachText: {
    fontSize: 13,
  },
  bookButton: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 15,
  },
  backButton: {
    marginTop: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});