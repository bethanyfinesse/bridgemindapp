import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { avatarFor } from '@/src/data/avatars';
import { counselors } from '@/src/data/mockData';
import { Image } from 'expo-image';
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

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
      <ThemedText type="title">Counselor Match</ThemedText>

      <View style={styles.filterRow}>
        {regions.map((r) => (
          <TouchableOpacity
            key={r}
            style={StyleSheet.flatten([styles.chip, region === r && styles.chipActive])}
            onPress={() => setRegion(r)}>
            <ThemedText type="defaultSemiBold">{r}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} activeOpacity={0.9}>
            <ThemedView style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                  <Image source={avatarFor(item.avatar)} style={styles.avatar} />
                  <ThemedText type="subtitle">{item.name}</ThemedText>
                </View>
                <IconSymbol name="heart" size={18} color="#E76F51" />
              </View>
              <ThemedText>{item.country} • {item.specialty}</ThemedText>
              <ThemedText>{item.bio}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)} transparent>
        <ThemedView style={styles.modalBackdrop}>
          <ThemedView style={styles.modalCard}>
            {selected && (
              <>
                <Image source={avatarFor(selected.avatar)} style={styles.modalAvatar} />
                <ThemedText type="subtitle">{selected.name}</ThemedText>
                <ThemedText>{selected.country} • {selected.specialty}</ThemedText>
                <ThemedText>{selected.bio}</ThemedText>
                <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeButton} activeOpacity={0.8}>
                  <ThemedText type="defaultSemiBold">Close</ThemedText>
                </TouchableOpacity>
              </>
            )}
          </ThemedView>
        </ThemedView>
      </Modal>

      <TouchableOpacity style={styles.matchButton} onPress={matchMe} activeOpacity={0.8}>
        <ThemedText type="defaultSemiBold">Match Me</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 12 },
  filterRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { padding: 8, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.04)' },
  chipActive: { backgroundColor: 'rgba(0,150,136,0.12)' },
  list: { flex: 1 },
  // ...existing card style replaced below
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#ddd' },
  matchButton: {
    backgroundColor: '#2A9D8F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  card: { padding: 16, borderRadius: 16, marginVertical: 8, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', padding: 20, borderRadius: 18, alignItems: 'center' },
  modalAvatar: { width: 110, height: 110, borderRadius: 55, marginBottom: 12 },
  closeButton: { marginTop: 14, backgroundColor: '#2A9D8F', padding: 12, borderRadius: 12 },
});
