import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { avatarFor } from '@/src/data/avatars';
import { counselors } from '@/src/data/mockData';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const regions = ['All', 'Asia', 'Europe', 'Latin America', 'Africa'];

export default function CounselorScreen() {
  const [region, setRegion] = useState<string>('All');
  const [selected, setSelected] = useState<any | null>(null);
  

  const filtered = useMemo(() => {
    if (region === 'All') return counselors;
    return counselors.filter((c) => c.region === region);
  }, [region]);

  function matchMe() {
    if (!filtered.length) return Alert.alert('No matches', 'No counselors found for this region.');
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    Alert.alert('Matched!', `${pick.name} — ${pick.specialty}\n${pick.country}`);
  }

  

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.screenTitle}>
          Counselor Match
        </ThemedText>
        <ThemedText style={styles.screenDesc} lightColor="#666" darkColor="#aaa">
          Find culturally aware therapists
        </ThemedText>
      </View>

      {/* Filter Chips */}
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}>
        {regions.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.chip, region === r && styles.chipActive]}
            onPress={() => setRegion(r)}
            activeOpacity={0.7}>
            <ThemedText 
              type="defaultSemiBold" 
              style={[styles.chipText, region === r && styles.chipTextActive]}
              lightColor={region === r ? '#fff' : '#666'}
              darkColor={region === r ? '#fff' : '#aaa'}>
              {r}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Counselor List */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} activeOpacity={0.7}>
            <View style={styles.counselorCard}>
              <View style={styles.counselorHeader}>
                <View style={styles.avatarContainer}>
                  <Image source={avatarFor(item.avatar)} style={styles.avatar} />
                </View>
                <View style={styles.counselorInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.counselorName}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.counselorCountry} lightColor="#666" darkColor="#aaa">
                    {item.country}
                  </ThemedText>
                  <ThemedText style={styles.counselorSpecialty} lightColor="#667eea" darkColor="#8b9dff">
                    {item.specialty}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.counselorBio} lightColor="#666" darkColor="#aaa">
                {item.bio}
              </ThemedText>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bookButton}>
                <TouchableOpacity 
                  style={styles.bookButtonInner}
                  onPress={() => Alert.alert('Booking', `Request session with ${item.name}`)}>
                  <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">
                    Book Session
                  </ThemedText>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)} transparent>
        <View style={styles.modalBackdrop}>
          <ThemedView style={styles.modalCard}>
            {selected && (
              <>
                <Image source={avatarFor(selected.avatar)} style={styles.modalAvatar} />
                <ThemedText type="subtitle" style={styles.modalName}>
                  {selected.name}
                </ThemedText>
                <ThemedText style={styles.modalCountry} lightColor="#666" darkColor="#aaa">
                  {selected.country}
                </ThemedText>
                <ThemedText style={styles.modalSpecialty} lightColor="#667eea" darkColor="#8b9dff">
                  {selected.specialty}
                </ThemedText>
                <ThemedText style={styles.modalBio} lightColor="#666" darkColor="#aaa">
                  {selected.bio}
                </ThemedText>
                <TouchableOpacity onPress={() => setSelected(null)} activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.closeButton}>
                    <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">
                      Close
                    </ThemedText>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </ThemedView>
        </View>
      </Modal>

      
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
  },
  screenTitle: {
    fontSize: 32,
    marginBottom: 8,
  },
  screenDesc: {
    fontSize: 15,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    // center children vertically in the horizontal scroll view so chips don't stretch
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: 'transparent',
    // spacing between chips (replace unsupported `gap`)
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  chipText: {
    fontSize: 13,
  },
  chipTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  counselorCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
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
    marginBottom: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    // spacing to replace `gap` on web
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#667eea',
  },
  counselorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  counselorName: {
    fontSize: 18,
    marginBottom: 3,
  },
  counselorCountry: {
    fontSize: 14,
    marginBottom: 5,
  },
  counselorSpecialty: {
    fontSize: 13,
    fontWeight: '600',
  },
  counselorBio: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },
  bookButton: {
    borderRadius: 12,
  },
  bookButtonInner: {
    padding: 14,
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
  },
  modalAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    backgroundColor: '#667eea',
  },
  modalName: {
    marginBottom: 5,
  },
  modalCountry: {
    fontSize: 14,
    marginBottom: 8,
  },
  modalSpecialty: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
  },
  modalBio: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 14,
  },
  
});