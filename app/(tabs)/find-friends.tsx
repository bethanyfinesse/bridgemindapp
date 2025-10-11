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

  const colors = ['#2B6B7F', '#D97941', '#8B7BA8', '#6BA587'];

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
        {/* Avatar */}
        <View style={[styles.avatarContainer, { backgroundColor: `${item.color}20` }]}>
          <View style={[styles.avatarCircle, { backgroundColor: item.color }]}>
            <ThemedText style={styles.avatarText}>
              {item.name.split(' ').map(n => n[0]).join('')}
            </ThemedText>
          </View>
        </View>

        {/* Info */}
        <View style={styles.studentInfo}>
          <ThemedText style={styles.studentName} lightColor="#1F2937" darkColor="#1F2937">
            {item.name}
          </ThemedText>
          
          <View style={styles.countryRow}>
            <ThemedText style={styles.countryFlag}>{item.country === 'China' ? '🇨🇳' : item.country === 'India' ? '🇮🇳' : item.country === 'Mexico' ? '🇲🇽' : '🌍'}</ThemedText>
            <ThemedText style={styles.countryText} lightColor="#6B7280" darkColor="#6B7280">
              {item.country}
            </ThemedText>
          </View>

          <View style={styles.majorBadge}>
            <ThemedText style={styles.majorText} lightColor="#2B6B7F" darkColor="#2B6B7F">
              {item.major}
            </ThemedText>
          </View>
        </View>

        {/* Hobbies */}
        <View style={styles.hobbiesSection}>
          <ThemedText style={styles.hobbiesLabel} lightColor="#6B7280" darkColor="#6B7280">
            Interests
          </ThemedText>
          <View style={styles.hobbiesGrid}>
            {item.hobbies.map((hobby, idx) => (
              <View key={idx} style={styles.hobbyTag}>
                <ThemedText style={styles.hobbyText} lightColor="#374151" darkColor="#374151">
                  {hobby}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Connect Button */}
        <TouchableOpacity 
          onPress={() => handleConnect(item.id, item.name)}
          style={styles.connectButton}
          disabled={isConnected}>
          <View style={[
            styles.connectButtonInner,
            isConnected && styles.connectButtonConnected
          ]}>
            <ThemedText 
              style={styles.connectButtonText}
              lightColor={isConnected ? '#6BA587' : '#D97941'}
              darkColor={isConnected ? '#6BA587' : '#D97941'}>
              {isConnected ? '✓ Connected' : 'Connect'}
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FFF5F2', '#F0FAFF', '#F8F4FF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle} lightColor="#1F2937" darkColor="#1F2937">
          Find Friends
        </ThemedText>
        <ThemedText style={styles.headerSubtitle} lightColor="#6B7280" darkColor="#6B7280">
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
  studentCard: {
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
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  studentInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  countryText: {
    fontSize: 14,
  },
  majorBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(43, 107, 127, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(43, 107, 127, 0.2)',
  },
  majorText: {
    fontSize: 13,
    fontWeight: '600',
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
  },
  hobbiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(107, 114, 128, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.15)',
  },
  hobbyText: {
    fontSize: 13,
    fontWeight: '500',
  },
  connectButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  connectButtonInner: {
    backgroundColor: 'rgba(217, 121, 65, 0.15)',
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(217, 121, 65, 0.2)',
  },
  connectButtonConnected: {
    backgroundColor: 'rgba(107, 165, 135, 0.15)',
    borderColor: 'rgba(107, 165, 135, 0.2)',
  },
  connectButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});