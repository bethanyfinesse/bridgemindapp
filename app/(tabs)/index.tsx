import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainerLarge}>
        <ThemedText type="title" style={styles.heroTitle}>Not Sure About Your Mood?</ThemedText>
        <View style={styles.heroRow}>
          <Image source={require('@/assets/images/icon.png')} style={styles.heroAvatar} />
          <ThemedText type="subtitle">Hello Alex! How are you feeling today?</ThemedText>
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
  <ThemedView style={styles.features}>
        <ThemedText type="subtitle">Explore BridgeMind</ThemedText>

        <Link href="/counselor">
          <Link.Trigger>
            <TouchableOpacity style={StyleSheet.flatten([styles.card, styles.cardPastelBlue])}>
              <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Counselor Match</ThemedText>
              <ThemedText>Find culturally-aware counselors.</ThemedText>
            </TouchableOpacity>
          </Link.Trigger>
        </Link>

        <Link href="/find-friends">
          <Link.Trigger>
            <TouchableOpacity style={StyleSheet.flatten([styles.card, styles.cardPastelPeach])}>
              <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Find Friends</ThemedText>
              <ThemedText>Connect with peers who share your background.</ThemedText>
            </TouchableOpacity>
          </Link.Trigger>
        </Link>

        <Link href="/community">
          <Link.Trigger>
            <TouchableOpacity style={StyleSheet.flatten([styles.card, styles.cardPastelGreen])}>
              <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Community Board</ThemedText>
              <ThemedText>Share anonymously with others.</ThemedText>
            </TouchableOpacity>
          </Link.Trigger>
        </Link>
      </ThemedView>

      <ThemedView style={styles.tilesRow}>
        <View style={StyleSheet.flatten([styles.tile, styles.tileOrange])}>
          <ThemedText type="subtitle">Sleep Duration</ThemedText>
          <ThemedText>7h 20min</ThemedText>
        </View>
        <View style={StyleSheet.flatten([styles.tile, styles.tilePurple])}>
          <ThemedText type="subtitle">Stress</ThemedText>
          <ThemedText>High</ThemedText>
        </View>
        <View style={StyleSheet.flatten([styles.tile, styles.tileGreen])}>
          <ThemedText type="subtitle">Mood</ThemedText>
          <ThemedText>Happy</ThemedText>
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  features: { gap: 12, marginTop: 16 },
  card: { padding: 16, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.04)', marginVertical: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 18, marginBottom: 6 },
  cardPastelBlue: { backgroundColor: '#DCEFF6' },
  cardPastelPeach: { backgroundColor: '#FDE7D6' },
  cardPastelGreen: { backgroundColor: '#DFF3EA' },
  titleContainerLarge: { gap: 12, marginBottom: 8 },
  heroTitle: { fontSize: 28, lineHeight: 34 },
  heroRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 8 },
  heroAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff' },
  tilesRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  tile: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  tileOrange: { backgroundColor: '#FFE6D1' },
  tilePurple: { backgroundColor: '#F3E8FF' },
  tileGreen: { backgroundColor: '#E7FAF0' },
});
