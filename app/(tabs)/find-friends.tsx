import { ThemedText } from '@/components/themed-text';
import { students } from '@/src/data/mockData';
import { LinearGradient } from 'expo-linear-gradient';
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

export default function FindFriendsScreen() {
  const [connected, setConnected] = useState<string[]>([]);

  const colors = ['#404040', '#606060', '#808080', '#A0A0A0'];

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
            <View style={[styles.avatarCircle, { backgroundColor: item.color }]}>
              <ThemedText style={styles.avatarText}>
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
            Interests
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
            {isConnected ? '✓ Connected' : '+ Connect'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A1A', '#0A0A0A']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          Find Friends
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  studentCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  studentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 2,
    color: '#FFFFFF',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryText: {
    fontSize: 14,
    color: '#888',
  },
  majorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  majorText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#CCCCCC',
  },
  hobbiesSection: {
    marginBottom: 16,
  },
  hobbiesLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    color: '#888',
  },
  hobbiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  hobbyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#CCCCCC',
  },
  connectButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  connectButtonConnected: {
    backgroundColor: '#2A2A2A',
    borderColor: '#404040',
  },
  connectButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});