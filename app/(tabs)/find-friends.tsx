import { ThemedText } from '@/components/themed-text';
import { students } from '@/src/data/mockData';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Student {
  id: string;
  name: string;
  major: string;
  country: string;
  hobbies: string[];
  avatar?: string;
  color: string;
}

// Fresh green color palette using #C1F27B
const COLORS = {
  primary: '#C1F27B',
  primaryLight: '#C1F27B',
  primaryLighter: '#C1F27B',
  primaryDark: '#C1F27B',
  white: '#f0ffdbff',
  pureWhite: '#7a3434ff',
  textOnGreen: '#ffffffff', // Dark green text for contrast on light green backgrounds
};

export default function FindFriendsScreen() {
  const [connected, setConnected] = useState<string[]>([]);

  const colors = ['#93C248', '#A0D45A', '#B4E06C', '#C8F27B'];

  const mockStudents: Student[] = students.map((student, index) => ({
    ...student,
    color: colors[index % colors.length],
  }));

  const handleConnect = (studentId: string, studentName: string) => {
    if (connected.includes(studentId)) {
      Alert.alert('Already Connected', `You're already connected with ${studentName}!`);
    } else {
      setConnected([...connected, studentId]);
      Alert.alert('Connection Sent!', `Friend request sent to ${studentName}`);
    }
  };

  const renderStudent = ({ item }: { item: Student }) => {
    const isConnected = connected.includes(item.id);

    return (
      <View style={styles.studentCard}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <ThemedText style={[styles.avatarText, { color: item.color }]}>
                {item.name.split(' ').map(n => n[0]).join('')}
              </ThemedText>
            </View>
          </View>

          {/* Info */}
          <View style={styles.studentInfo}>
            <ThemedText style={styles.studentName}>
              {item.name}
            </ThemedText>
            
            <View style={styles.detailsRow}>
              <ThemedText style={styles.countryText}>
                {item.country}
              </ThemedText>

              <View style={styles.majorBadge}>
                <ThemedText style={styles.majorText}>
                  {item.major}
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Hobbies */}
        <View style={styles.hobbiesSection}>
          <ThemedText style={styles.hobbiesLabel}>
            INTERESTS
          </ThemedText>
          <View style={styles.hobbiesGrid}>
            {item.hobbies.map((hobby, idx) => (
              <View key={idx} style={styles.hobbyTag}>
                <ThemedText style={styles.hobbyText}>
                  {hobby}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Connect Button */}
        <TouchableOpacity 
          onPress={() => handleConnect(item.id, item.name)}
          style={[styles.connectButton, isConnected && styles.connectButtonConnected]}
          disabled={isConnected}>
          <ThemedText style={styles.connectButtonText}>
            {isConnected ? '✓ CONNECTED' : '+ CONNECT'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          FIND FRIENDS
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Connect with students like you
        </ThemedText>
      </View>

      {/* Students List */}
      <FlatList
        data={mockStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 1.5,
    color: COLORS.textOnGreen,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textOnGreen,
    letterSpacing: 0.8,
    lineHeight: 22,
    opacity: 0.9,
  },
  listContent: {
    paddingHorizontal: 32,
    paddingBottom: 100,
    paddingTop: 16,
  },
  studentCard: {
    backgroundColor: COLORS.primaryLighter,
    borderRadius: 28,
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
  headerRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
    // Color is set dynamically to match the student's color
  },
  studentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: COLORS.textOnGreen,
    letterSpacing: 0.3,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textOnGreen,
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  majorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#d0f1a3ff', // Opaque white
    borderWidth: 1.5,
    borderColor: '#d0f1a3ff', 
  },
  majorText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textOnGreen, // Dark green text
    letterSpacing: 0.3,
  },
  hobbiesSection: {
    marginBottom: 20,
  },
  hobbiesLabel: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 12,
    color: COLORS.textOnGreen,
    opacity: 0.8,
  },
  hobbiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  hobbyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#d0f1a3ff',  // Opaque white
    borderWidth: 1.5,
    borderColor: '#d0f1a3ff', 
  },
  hobbyText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textOnGreen, // Dark green text
    letterSpacing: 0.3,
  },
  connectButton: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.primaryDark,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  connectButtonConnected: {
    backgroundColor: COLORS.primaryLight,
  },
  connectButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primaryDark,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});