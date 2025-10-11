import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { avatarFor } from '@/src/data/avatars';
import { students } from '@/src/data/mockData';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FindFriends() {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Find Friends</ThemedText>

      <FlatList
        data={students}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} activeOpacity={0.9}>
            <ThemedView style={StyleSheet.flatten([styles.card])}>
              <View style={StyleSheet.flatten([styles.row])}>
                <Image source={avatarFor(item.avatar)} style={styles.avatarImage} />
                <View style={styles.meta}>
                  <ThemedText type="subtitle">{item.name}</ThemedText>
                  <ThemedText>{item.country} • {item.major}</ThemedText>
                  <ThemedText>{item.hobbies.join(', ')}</ThemedText>
                </View>
              </View>
              <TouchableOpacity style={styles.connect} activeOpacity={0.8} onPress={() => alert('Connect sent (demo)')}>
                <ThemedText type="defaultSemiBold">Connect</ThemedText>
              </TouchableOpacity>
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
                <ThemedText>{selected.country} • {selected.major}</ThemedText>
                <ThemedText>{selected.hobbies.join(', ')}</ThemedText>
                <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeButton} activeOpacity={0.8}>
                  <ThemedText type="defaultSemiBold">Close</ThemedText>
                </TouchableOpacity>
              </>
            )}
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 12 },
  card: { padding: 12, borderRadius: 8, marginVertical: 6 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatarImage: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#264653' },
  meta: { flex: 1 },
  connect: { marginTop: 8, alignSelf: 'flex-start', backgroundColor: '#E9C46A', padding: 8, borderRadius: 8 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center' },
  modalAvatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 12 },
  closeButton: { marginTop: 12, backgroundColor: '#2A9D8F', padding: 10, borderRadius: 8 },
});
