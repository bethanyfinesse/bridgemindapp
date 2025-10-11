import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const STORAGE_KEY = '@bridgemind_posts_v1';

interface Post {
  id: string;
  text: string;
  timestamp: number;
  likes: number;
  comments: number;
  liked: boolean;
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
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      } catch {
        // ignore
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
      comments: 0,
      liked: false
    };
    setPosts((s) => [p, ...s]);
    setText('');
  }

  function toggleLike(postId: string) {
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  }

  function getTimeAgo(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  }

  return (
    <ThemedView style={styles.container} lightColor="#fafafa" darkColor="#000">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={100}>
        
        <View style={styles.header}>
          <ThemedText type="title" style={styles.screenTitle}>
            Community
          </ThemedText>
          <ThemedText style={styles.screenDesc} lightColor="#666" darkColor="#999">
            Share anonymously
          </ThemedText>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.composerCard}>
              <View style={styles.composerHeader}>
                <View style={styles.composerAvatar}>
                  <ThemedText style={styles.composerEmoji}>🎭</ThemedText>
                </View>
                <ThemedText type="defaultSemiBold" style={styles.composerLabel}>
                  What's on your mind?
                </ThemedText>
              </View>
              
              <TextInput
                placeholder="Share your thoughts..."
                placeholderTextColor="#999"
                value={text}
                onChangeText={setText}
                style={styles.input}
                multiline
              />
              
              <TouchableOpacity 
                onPress={submit}
                activeOpacity={0.8}
                disabled={!text.trim()}>
                <View style={[styles.postButton, !text.trim() && styles.postButtonDisabled]}>
                  <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">
                    Post
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.anonymousBadge}>
                  <ThemedText style={styles.badgeEmoji}>🎭</ThemedText>
                </View>
                <View style={styles.postMeta}>
                  <ThemedText type="defaultSemiBold" style={styles.postAuthor}>
                    Anonymous
                  </ThemedText>
                  <ThemedText style={styles.postTime} lightColor="#999" darkColor="#666">
                    {getTimeAgo(item.timestamp)}
                  </ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.postContent} lightColor="#1a1a1a" darkColor="#ccc">
                {item.text}
              </ThemedText>
              
              <View style={styles.postActions}>
                <TouchableOpacity 
                  style={styles.actionBtn} 
                  activeOpacity={0.7}
                  onPress={() => toggleLike(item.id)}>
                  <View style={[styles.actionButton, item.liked && styles.actionButtonLiked]}>
                    <ThemedText 
                      style={styles.actionText} 
                      lightColor={item.liked ? '#fff' : '#666'} 
                      darkColor={item.liked ? '#fff' : '#999'}>
                      {item.liked ? '❤️' : '🤍'} {item.likes}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                  <View style={styles.actionButton}>
                    <ThemedText style={styles.actionText} lightColor="#666" darkColor="#999">
                      💬 {item.comments}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  screenTitle: {
    fontSize: 28,
    marginBottom: 4,
    fontWeight: '700',
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  composerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  composerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  composerEmoji: {
    fontSize: 20,
  },
  composerLabel: {
    fontSize: 15,
  },
  input: {
    minHeight: 80,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    fontSize: 15,
    marginBottom: 12,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
  },
  postButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  postButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: {
    fontSize: 20,
  },
  postMeta: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 15,
    marginBottom: 2,
  },
  postTime: {
    fontSize: 13,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  actionBtn: {
    flex: 1,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  actionButtonLiked: {
    backgroundColor: '#1a1a1a',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
});