import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface Post {
  id: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  liked?: boolean;
}

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const stored = await AsyncStorage.getItem('communityPosts');
    if (stored) {
      const parsed = JSON.parse(stored);
      setPosts(parsed.map((p: any) => ({ ...p, timestamp: new Date(p.timestamp) })));
    } else {
      const mockPosts: Post[] = [
        {
          id: '1',
          content: 'Starting therapy has been one of the best decisions I made. Remember, seeking help is a sign of strength.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          likes: 24,
          comments: 5,
        },
        {
          id: '2',
          content: 'Does anyone have tips for managing academic stress during finals week? Feeling overwhelmed.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          likes: 12,
          comments: 8,
        },
        {
          id: '3',
          content: 'Grateful for this supportive community. You all remind me I\'m not alone in this journey.',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          likes: 31,
          comments: 3,
        },
      ];
      setPosts(mockPosts);
      await AsyncStorage.setItem('communityPosts', JSON.stringify(mockPosts));
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) {
      Alert.alert('Please write something to share');
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
    };

    const updated = [post, ...posts];
    setPosts(updated);
    await AsyncStorage.setItem('communityPosts', JSON.stringify(updated));
    setNewPost('');
    Alert.alert('Posted!', 'Your anonymous post has been shared.');
  };

  const handleLike = async (postId: string) => {
    const updated = posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    );
    setPosts(updated);
    await AsyncStorage.setItem('communityPosts', JSON.stringify(updated));
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <View style={styles.postInfo}>
          <ThemedText style={styles.postAuthor}>Anonymous</ThemedText>
          <ThemedText style={styles.postTime}>
            {getTimeAgo(item.timestamp)}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.postContent}>
        {item.content}
      </ThemedText>

      <View style={styles.postActions}>
        <TouchableOpacity 
          onPress={() => handleLike(item.id)}
          style={styles.actionButton}>
          <View style={[styles.iconContainer, item.liked && styles.likedIcon]}>
            <ThemedText style={styles.actionIcon}>
              {item.liked ? '♥' : '♡'}
            </ThemedText>
          </View>
          <ThemedText style={[styles.actionText, item.liked && styles.likedText]}>
            {item.likes}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconContainer}>
            <ThemedText style={styles.actionIcon}>💬</ThemedText>
          </View>
          <ThemedText style={styles.actionText}>
            {item.comments}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A1A', '#0A0A0A']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>
            Community
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Share anonymously, support each other
          </ThemedText>
        </View>

        {/* Composer */}
        <View style={styles.composerContainer}>
          <View style={styles.composer}>
            <View style={styles.composerAvatar}>
              <View style={styles.composerCircle} />
            </View>
            <TextInput
              style={styles.composerInput}
              placeholder="What's on your mind?"
              placeholderTextColor="#666"
              value={newPost}
              onChangeText={setNewPost}
              multiline
              maxLength={500}
            />
          </View>
          <TouchableOpacity 
            onPress={handlePost} 
            style={[styles.postButton, !newPost.trim() && styles.postButtonDisabled]}>
            <ThemedText style={styles.postButtonText}>
              Post
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Posts Feed */}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
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
  composerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  composer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    marginBottom: 16,
  },
  composerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  composerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#666',
  },
  composerInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  postButtonDisabled: {
    opacity: 0.4,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  feedContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    paddingTop: 16,
  },
  postCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#666',
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
    color: '#FFFFFF',
  },
  postTime: {
    fontSize: 13,
    color: '#888',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#E0E0E0',
    letterSpacing: 0.3,
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedIcon: {
    backgroundColor: '#444',
  },
  actionIcon: {
    fontSize: 14,
    color: '#888',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    minWidth: 20,
  },
  likedText: {
    color: '#FFFFFF',
  },
});