import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// Warm orange-yellow color palette using #F4AD53
const COLORS = {
  primary: '#F4AD53',
  primaryLight: '#F7C27D', // Lighter variant for cards
  primaryLighter: '#F4AD53', // Even lighter for subtle contrast
  primaryDark: '#f2a649ff',
  white: '#FFFFFF',
  pureWhite: '#FFFFFF',
  textOnYellow: '#FFFFFF', // White text for contrast on yellow backgrounds
};

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const stored = await AsyncStorage.getItem('communityPosts');
    if (!stored) {
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
    } else {
      const parsed = JSON.parse(stored);
      setPosts(parsed.map((p: any) => ({ ...p, timestamp: new Date(p.timestamp) })));
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
    <View style={styles.container}>
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
              placeholderTextColor={COLORS.textOnYellow + '99'}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary, // Main background
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 32,
    paddingBottom: 32,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
    color: COLORS.textOnYellow,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textOnYellow,
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  composerContainer: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryDark,
    backgroundColor: COLORS.primary,
  },
  composer: {
    backgroundColor: COLORS.primaryLighter, // Lighter than background
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  composerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  composerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primaryDark,
  },
  composerInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textOnYellow,
    minHeight: 60,
    textAlignVertical: 'top',
    fontWeight: '600',
  },
  postButton: {
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
  postButtonDisabled: {
    opacity: 0.4,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDark,
    letterSpacing: 0.5,
  },
  feedContent: {
    paddingHorizontal: 32,
    paddingBottom: 100,
    paddingTop: 16,
  },
  postCard: {
    backgroundColor: COLORS.primaryLighter, // Lighter than background
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
  postHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primaryDark,
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: COLORS.textOnYellow,
  },
  postTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textOnYellow,
    opacity: 0.9,
  },
  postContent: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 20,
    color: COLORS.textOnYellow,
    letterSpacing: 0.3,
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  likedIcon: {
    backgroundColor: COLORS.primaryDark,
  },
  actionIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textOnYellow,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textOnYellow,
    minWidth: 20,
    opacity: 0.9,
  },
  likedText: {
    color: COLORS.textOnYellow,
    opacity: 1,
  },
});