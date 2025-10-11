import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = '@bridgemind_posts_v1';

export default function Community() {
  const [posts, setPosts] = useState<{ id: string; text: string }[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setPosts(JSON.parse(raw));
      } catch {
        // ignore for demo
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      } catch {
        // ignore for demo
      }
    })();
  }, [posts]);

  function submit() {
    if (!text.trim()) return;
    const p = { id: Date.now().toString(), text: text.trim() };
    setPosts((s) => [p, ...s]);
    setText('');
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Community Board</ThemedText>

      <View style={styles.composer}>
        <TextInput
          placeholder="Share anonymously..."
          value={text}
          onChangeText={setText}
          style={styles.input}
          multiline
        />
        <TouchableOpacity style={styles.postButton} onPress={submit} activeOpacity={0.8}>
          <ThemedText type="defaultSemiBold">Post</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ThemedView style={styles.postCard}>
            <ThemedText>{item.text}</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 12 },
  composer: { gap: 8 },
  input: { minHeight: 56, padding: 8, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.04)' },
  postButton: { alignSelf: 'flex-end', marginTop: 4, backgroundColor: '#2A9D8F', padding: 8, borderRadius: 8 },
  postCard: { padding: 12, borderRadius: 8, marginVertical: 6 },
});
