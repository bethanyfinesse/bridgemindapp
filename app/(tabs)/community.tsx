import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = '@bridgemind_posts_v1';

interface Post {
  id: string;
  text: string;
  timestamp: number;
  likes: number;
  comments: number;
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
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
    const p: Post = { 
      id: Date.now().toString(), 
      text: text.trim(),
      timestamp: Date.now(),
      likes: 0,
      comments: 0
    };
    setPosts((s) => [p, ...s]);
    setText('');
  }

  function getTimeAgo(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.screenTitle}>
          Community Board
        </ThemedText>
        <ThemedText style={styles.screenDesc} lightColor="#666" darkColor="#aaa">
          Share anonymously, support each other
        </ThemedText>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.composerCard}>
            <TextInput
              placeholder="Share your thoughts anonymously..."
              placeholderTextColor="#999"
              value={text}
              onChangeText={setText}
              style={styles.input}
              multiline
            />
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.postButton}>
              <TouchableOpacity 
                style={styles.postButtonInner}
                onPress={submit}
                activeOpacity={0.8}>
                <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">
                  Post Anonymously
                </ThemedText>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <LinearGradient
                colors={['#a8edea', '#fed6e3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.anonymousBadge}>
                <ThemedText style={styles.badgeEmoji}>🎭</ThemedText>
              </LinearGradient>
              <View style={styles.postMeta}>
                <ThemedText type="defaultSemiBold" style={styles.postAuthor}>
                  Anonymous Student
                </ThemedText>
                <ThemedText style={styles.postTime} lightColor="#999" darkColor="#777">
                  {getTimeAgo(item.timestamp)}
                </ThemedText>
              </View>
            </View>
            
            <ThemedText style={styles.postContent} lightColor="#333" darkColor="#ccc">
              {item.text}
            </ThemedText>
            
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                <ThemedText style={styles.actionText} lightColor="#666" darkColor="#aaa">
                  ❤️ {item.likes} Support
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                <ThemedText style={styles.actionText} lightColor="#666" darkColor="#aaa">
                  💬 {item.comments} Comments
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  },
  screenTitle: {
    fontSize: 32,
    marginBottom: 8,
  },
  screenDesc: {
    fontSize: 15,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  composerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    minHeight: 100,
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    fontSize: 14,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  postButton: {
    borderRadius: 12,
  },
  postButtonInner: {
    padding: 14,
    alignItems: 'center',
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  anonymousBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: {
    fontSize: 18,
  },
  postMeta: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 14,
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
  },
});