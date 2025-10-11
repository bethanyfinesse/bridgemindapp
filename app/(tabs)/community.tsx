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
        <View style={styles.avatarBadge}>
          <View style={styles.avatarCircle} />
        </View>
        <View style={styles.postInfo}>
          <ThemedText style={styles.postAuthor} lightColor="#374151" darkColor="#374151">
            Anonymous
          </ThemedText>
          <ThemedText style={styles.postTime} lightColor="#9CA3AF" darkColor="#9CA3AF">
            {getTimeAgo(item.timestamp)}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.postContent} lightColor="#1F2937" darkColor="#1F2937">
        {item.content}
      </ThemedText>

      <View style={styles.postActions}>
        <TouchableOpacity 
          onPress={() => handleLike(item.id)}
          style={styles.actionButton}>
          <ThemedText 
            style={[styles.actionIcon, item.liked && styles.actionIconLiked]}
            lightColor={item.liked ? '#D97941' : '#9CA3AF'}
            darkColor={item.liked ? '#D97941' : '#9CA3AF'}>
            ♡
          </ThemedText>
          <ThemedText style={styles.actionText} lightColor="#6B7280" darkColor="#6B7280">
            {item.likes}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <ThemedText style={styles.actionIcon} lightColor="#9CA3AF" darkColor="#9CA3AF">
            💬
          </ThemedText>
          <ThemedText style={styles.actionText} lightColor="#6B7280" darkColor="#6B7280">
            {item.comments}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#F8F4FF', '#FFF5F2', '#F0FAFF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle} lightColor="#1F2937" darkColor="#1F2937">
            Community
          </ThemedText>
          <ThemedText style={styles.headerSubtitle} lightColor="#6B7280" darkColor="#6B7280">
            Share anonymously, support each other
          </ThemedText>
        </View>

        {/* Composer */}
        <View style={styles.composerContainer}>
          <View style={styles.composer}>
            <View style={styles.composerIcon}>
              <View style={styles.composerCircle} />
            </View>
            <TextInput
              style={styles.composerInput}
              placeholder="What's on your mind?"
              placeholderTextColor="#9CA3AF"
              value={newPost}
              onChangeText={setNewPost}
              multiline
              maxLength={500}
            />
          </View>
          <TouchableOpacity onPress={handlePost} style={styles.postButton}>
            <View style={styles.postButtonInner}>
              <ThemedText style={styles.postButtonText} lightColor="#8B7BA8" darkColor="#8B7BA8">
                Post
              </ThemedText>
            </View>
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
    paddingBottom: 20,
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
  composerContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  composer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 12,
  },
  composerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 123, 168, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  composerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#8B7BA8',
  },
  composerInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  postButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  postButtonInner: {
    backgroundColor: 'rgba(139, 123, 168, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 123, 168, 0.2)',
  },
  postButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  feedContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  avatarBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 123, 168, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8B7BA8',
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 15,
    fontWeight: '600',
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
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    fontSize: 18,
  },
  actionIconLiked: {
    color: '#D97941',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});