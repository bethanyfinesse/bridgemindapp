import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.welcomeSection}>
          <ThemedText type="title" style={styles.welcomeTitle} lightColor="#fff" darkColor="#fff">
            Welcome Back! 👋
          </ThemedText>
          <ThemedText style={styles.welcomeSubtitle} lightColor="rgba(255,255,255,0.9)" darkColor="rgba(255,255,255,0.9)">
            Your mental health companion
          </ThemedText>
        </LinearGradient>

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => router.push('/counselor')}
            activeOpacity={0.7}>
            <View style={styles.featureIcon}>
              <IconSymbol name="brain.head.profile" size={26} color="#fff" />
            </View>
            <View style={styles.featureInfo}>
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                Cultural Therapy Match
              </ThemedText>
              <ThemedText style={styles.featureDesc} lightColor="#666" darkColor="#aaa">
                Connect with counselors who understand your background
              </ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#667eea" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => router.push('/find-friends')}
            activeOpacity={0.7}>
            <View style={styles.featureIcon}>
              <IconSymbol name="person.2.fill" size={26} color="#fff" />
            </View>
            <View style={styles.featureInfo}>
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                Find Friends
              </ThemedText>
              <ThemedText style={styles.featureDesc} lightColor="#666" darkColor="#aaa">
                Meet peers with similar interests and experiences
              </ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#667eea" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureCard}
            onPress={() => router.push('/community')}
            activeOpacity={0.7}>
            <View style={styles.featureIcon}>
              <IconSymbol name="bubble.left.and.bubble.right.fill" size={26} color="#fff" />
            </View>
            <View style={styles.featureInfo}>
              <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                Community Board
              </ThemedText>
              <ThemedText style={styles.featureDesc} lightColor="#666" darkColor="#aaa">
                Share thoughts anonymously in a safe space
              </ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#667eea" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    margin: 20,
    marginTop: 60,
    padding: 30,
    borderRadius: 25,
  },
  welcomeTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
  },
  featuresContainer: {
    padding: 20,
    gap: 15,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  featureIcon: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureInfo: {
    flex: 1,
    gap: 5,
  },
  featureTitle: {
    fontSize: 18,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});