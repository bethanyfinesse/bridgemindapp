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
    specialties: ["Depression", "Family Issues", "Identity Issues"],
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
  },
  {
    id: 4,
    name: "Dr. Ahmed Hassan",
    photo: "👨🏽‍⚕️",
    languages: ["Arabic", "English"],
    country: "Saudi Arabia",
    specialties: ["Cultural Adjustment", "Family Issues", "Depression"],
    approach: "CBT, Mindfulness-Based",
    rating: 4.7,
    sessions: 256
  },
  {
    id: 5,
    name: "Dr. Yuki Tanaka",
    photo: "👩🏻‍⚕️",
    languages: ["Japanese", "English"],
    country: "Japan",
    specialties: ["Anxiety", "Academic Stress", "Loneliness"],
    approach: "Mindfulness-Based, ACT",
    rating: 4.8,
    sessions: 318
  },
  {
    id: 6,
    name: "Dr. Sophie Dubois",
    photo: "👩🏼‍⚕️",
    languages: ["French", "English"],
    country: "Canada",
    specialties: ["Depression", "Identity Issues", "Homesickness"],
    approach: "Psychodynamic, Humanistic",
    rating: 4.9,
    sessions: 423
  },
  {
    id: 7,
    name: "Dr. Min-jun Park",
    photo: "👨🏻‍⚕️",
    languages: ["Korean", "English"],
    country: "South Korea",
    specialties: ["Academic Stress", "Anxiety", "Cultural Adjustment"],
    approach: "CBT, Solution-Focused",
    rating: 4.8,
    sessions: 367
  },
  {
    id: 8,
    name: "Dr. Thao Nguyen",
    photo: "👩🏻‍⚕️",
    languages: ["Vietnamese", "English"],
    country: "Vietnam",
    specialties: ["Homesickness", "Family Issues", "Loneliness"],
    approach: "Person-Centered, Humanistic",
    rating: 4.7,
    sessions: 278
  },
  {
    id: 9,
    name: "Dr. Carlos Silva",
    photo: "👨🏽‍⚕️",
    languages: ["Portuguese", "Spanish", "English"],
    country: "Brazil",
    specialties: ["Depression", "Anxiety", "Cultural Adjustment"],
    approach: "CBT, Mindfulness-Based",
    rating: 4.9,
    sessions: 445
  },
  {
    id: 10,
    name: "Dr. Fatima Khan",
    photo: "👩🏾‍⚕️",
    languages: ["Urdu", "Hindi", "English"],
    country: "Pakistan",
    specialties: ["Family Issues", "Identity Issues", "Academic Stress"],
    approach: "Solution-Focused, Person-Centered",
    rating: 4.8,
    sessions: 312
  },
  {
    id: 11,
    name: "Dr. Elena Volkov",
    photo: "👩🏼‍⚕️",
    languages: ["Russian", "English"],
    country: "Russia",
    specialties: ["Anxiety", "Loneliness", "Homesickness"],
    approach: "Psychodynamic, ACT",
    rating: 4.7,
    sessions: 289
  },
  {
    id: 12,
    name: "Dr. Raj Sharma",
    photo: "👨🏾‍⚕️",
    languages: ["Hindi", "English"],
    country: "India",
    specialties: ["Academic Stress", "Cultural Adjustment", "Depression"],
    approach: "CBT, Mindfulness-Based",
    rating: 4.9,
    sessions: 501
  },
  {
    id: 13,
    name: "Dr. Li Wei",
    photo: "👩🏻‍⚕️",
    languages: ["Mandarin", "English"],
    country: "Taiwan",
    specialties: ["Anxiety", "Family Issues", "Loneliness"],
    approach: "Person-Centered, Solution-Focused",
    rating: 4.8,
    sessions: 356
  },
  {
    id: 14,
    name: "Dr. Isabel Garcia",
    photo: "👩🏽‍⚕️",
    languages: ["Spanish", "English"],
    country: "Mexico",
    specialties: ["Homesickness", "Identity Issues", "Cultural Adjustment"],
    approach: "Humanistic, CBT",
    rating: 4.9,
    sessions: 389
  },
  {
    id: 15,
    name: "Dr. Kwame Osei",
    photo: "👨🏿‍⚕️",
    languages: ["English"],
    country: "Nigeria",
    specialties: ["Depression", "Academic Stress", "Family Issues"],
    approach: "CBT, Solution-Focused",
    rating: 4.7,
    sessions: 267
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

  // Generate perfect matches based on user's exact preferences
  const generatePerfectMatches = (): Counselor[] => {
    if (!prefs || !prefs.language || !prefs.country || !prefs.struggles.length) {
      return mockCounselors.slice(0, 3);
    }

    const perfectMatches: Counselor[] = [];
    const names = [
      { first: "Dr. Maria", last: "Santos", photo: "👩🏽‍⚕️" },
      { first: "Dr. Wei", last: "Chen", photo: "👨🏻‍⚕️" },
      { first: "Dr. Priya", last: "Patel", photo: "👩🏾‍⚕️" },
      { first: "Dr. Ahmed", last: "Hassan", photo: "👨🏽‍⚕️" },
      { first: "Dr. Yuki", last: "Tanaka", photo: "👩🏻‍⚕️" },
      { first: "Dr. Sophie", last: "Dubois", photo: "👩🏼‍⚕️" },
      { first: "Dr. Min-jun", last: "Park", photo: "👨🏻‍⚕️" },
      { first: "Dr. Elena", last: "Volkov", photo: "👩🏼‍⚕️" },
    ];

    const approaches = [
      "CBT, Mindfulness-Based",
      "Person-Centered, ACT",
      "Solution-Focused, CBT",
      "Humanistic, Mindfulness-Based",
      "Psychodynamic, Person-Centered",
      "ACT, Solution-Focused",
      "CBT, Humanistic"
    ];

    const additionalLanguages = [
      "English", "Spanish", "French", "Portuguese", "German", "Italian"
    ];

    // Generate 3-5 perfect matches with variety
    const numMatches = Math.min(5, Math.max(3, prefs.struggles.length + 1));
    
    for (let i = 0; i < numMatches; i++) {
      const name = names[i % names.length];
      const rating = (4.6 + Math.random() * 0.35).toFixed(1); // Range: 4.6-4.95
      const sessions = Math.floor(200 + Math.random() * 400); // Range: 200-600
      
      // Each counselor gets the user's struggles + 1-2 additional specialties
      const additionalSpecialties = [
        "Relationship Issues", "Career Guidance", "Grief", "Self-Esteem",
        "Stress Management", "Life Transitions", "Trauma", "Social Anxiety"
      ];
      
      const shuffledAdditional = additionalSpecialties
        .filter(s => !prefs.struggles.includes(s))
        .sort(() => Math.random() - 0.5);
      
      const extraSpecialties = shuffledAdditional.slice(0, Math.floor(Math.random() * 2) + 1);
      
      // Mix user's struggles with additional ones for variety
      const allSpecialties = [...prefs.struggles, ...extraSpecialties];
      
      // Some counselors speak additional languages
      const languages = [prefs.language];
      if (Math.random() > 0.5) {
        const extraLang = additionalLanguages[Math.floor(Math.random() * additionalLanguages.length)];
        if (extraLang !== prefs.language) {
          languages.push(extraLang);
        }
      }
      if (!languages.includes("English")) {
        languages.push("English");
      }
      
      // Use user's approach if specified, otherwise vary approaches
      let counselorApproach = approaches[i % approaches.length];
      if (prefs.approach) {
        // Make sure their selected approach is included
        if (Math.random() > 0.3) {
          counselorApproach = prefs.approach;
        } else {
          // Mix their approach with another
          const otherApproach = approaches[Math.floor(Math.random() * approaches.length)];
          counselorApproach = `${prefs.approach}, ${otherApproach.split(',')[1] || 'Person-Centered'}`;
        }
      }
      
      const counselor: Counselor = {
        id: i + 1,
        name: `${name.first} ${name.last}`,
        photo: name.photo,
        languages: languages,
        country: prefs.country, // EXACT country match
        specialties: allSpecialties, // User's struggles + extras
        approach: counselorApproach,
        rating: parseFloat(rating),
        sessions: sessions
      };

      perfectMatches.push(counselor);
    }

    return perfectMatches;
  };

  const matches = generatePerfectMatches();

  return (
    <ThemedView style={styles.container} lightColor="#F8F9FA" darkColor="#1A1D23">
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badgeContainer}>
          <LinearGradient
            colors={['#6BA587', '#85BFA1']}
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
          <ThemedText style={styles.subtitle} lightColor="#6B7280" darkColor="#A8B2C1">
            Based on: {prefs.language || '—'}, {prefs.country || '—'}
          </ThemedText>
        )}
      </View>

      {/* Counselors List */}
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.counselorCard}>
            <View style={styles.counselorHeader}>
              <LinearGradient
                colors={['#8B7BA8', '#A594BD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.photoContainer}>
                <ThemedText style={styles.photo}>{item.photo}</ThemedText>
              </LinearGradient>
              
              <View style={styles.counselorInfo}>
                <ThemedText type="defaultSemiBold" style={styles.counselorName}>
                  {item.name}
                </ThemedText>
                <ThemedText style={styles.counselorCountry} lightColor="#6B7280" darkColor="#A8B2C1">
                  {item.country}
                </ThemedText>
                <View style={styles.rating}>
                  <ThemedText style={styles.ratingText}>⭐ {item.rating}</ThemedText>
                  <ThemedText style={styles.sessions} lightColor="#A8B2C1" darkColor="#6B7280">
                    {item.sessions} sessions
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Languages */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel} lightColor="#A8B2C1" darkColor="#6B7280">
                LANGUAGES
              </ThemedText>
              <View style={styles.tagsRow}>
                {item.languages.map(lang => (
                  <View key={lang} style={styles.tagTeal}>
                    <ThemedText style={styles.tagText} lightColor="#2B6B7F" darkColor="#4A8A9E">
                      {lang}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Specialties */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel} lightColor="#A8B2C1" darkColor="#6B7280">
                SPECIALTIES
              </ThemedText>
              <View style={styles.tagsRow}>
                {item.specialties.map(spec => (
                  <View key={spec} style={styles.tagOrange}>
                    <ThemedText style={styles.tagText} lightColor="#D97941" darkColor="#E89964">
                      {spec}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </View>

            {/* Approach */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel} lightColor="#A8B2C1" darkColor="#6B7280">
                APPROACH
              </ThemedText>
              <ThemedText style={styles.approachText} lightColor="#2A2D35" darkColor="#F8F9FA">
                {item.approach}
              </ThemedText>
            </View>

            {/* Book Button */}
            <TouchableOpacity
              onPress={() => handleBookSession(item)}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#2B6B7F', '#6BA587']}
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
            <ThemedText style={styles.backButtonText} lightColor="#2B6B7F" darkColor="#4A8A9E">
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
    fontWeight: '700',
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
    borderWidth: 1,
    borderColor: '#E8ECF1',
    shadowColor: '#2B6B7F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  counselorHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
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
  tagTeal: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#EBF5F8',
  },
  tagOrange: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#FDF2ED',
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