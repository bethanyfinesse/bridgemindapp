import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { avatarFor } from '@/src/data/avatars';
import { students } from '@/src/data/mockData';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FindFriends() {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#f093fb', '#f5576c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.screenTitle} lightColor="#fff" darkColor="#fff">
            Find Friends
          </ThemedText>
          <ThemedText style={styles.screenDesc} lightColor="rgba(255,255,255,0.9)" darkColor="rgba(255,255,255,0.9)">
            Connect with fellow international students
          </ThemedText>
        </View>
      </LinearGradient>

      <FlatList
        data={students}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} activeOpacity={0.9}>
            <View style={styles.studentCard}>
              <View style={styles.cardInner}>
                <View style={styles.studentHeader}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.photoContainer}>
                    <Image source={avatarFor(item.avatar)} style={styles.photo} />
                  </LinearGradient>
                  
                  <View style={styles.studentDetails}>
                    <ThemedText type="defaultSemiBold" style={styles.studentName}>
                      {item.name}
                    </ThemedText>
                    <View style={styles.countryRow}>
                      <ThemedText style={styles.countryEmoji}>🌍</ThemedText>
                      <ThemedText style={styles.studentCountry} lightColor="#666" darkColor="#aaa">
                        {item.country}
                      </ThemedText>
                    </View>
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.majorBadge}>
                      <ThemedText style={styles.majorText} lightColor="#fff" darkColor="#fff">
                        {item.major}
                      </ThemedText>
                    </LinearGradient>
                  </View>
                </View>
                
                <View style={styles.hobbiesSection}>
                  <ThemedText style={styles.hobbiesLabel} lightColor="#999" darkColor="#777">
                    INTERESTS
                  </ThemedText>
                  <View style={styles.hobbiesTags}>
                    {item.hobbies.slice(0, 3).map((hobby: string, idx: number) => (
                      <View key={idx} style={styles.hobbyTag}>
                        <ThemedText style={styles.hobbyText} lightColor="#666" darkColor="#aaa">
                          {hobby}
                        </ThemedText>
                      </View>
                    ))}
                    {item.hobbies.length > 3 && (
                      <View style={styles.hobbyTag}>
                        <ThemedText style={styles.hobbyText} lightColor="#666" darkColor="#aaa">
                          +{item.hobbies.length - 3} more
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>

                <TouchableOpacity 
                  onPress={() => Alert.alert('Connect', `Request sent to ${item.name}`)}
                  activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#f093fb', '#f5576c']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.connectButton}>
                    <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">
                      Connect 👋
                    </ThemedText>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)} transparent>
        <View style={styles.modalBackdrop}>
          <ThemedView style={styles.modalCard}>
            {selected && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>
                <View style={styles.modalHeader}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modalPhotoContainer}>
                    <Image source={avatarFor(selected.avatar)} style={styles.modalPhoto} />
                  </LinearGradient>
                  
                  <ThemedText type="subtitle" style={styles.modalName}>
                    {selected.name}
                  </ThemedText>
                  
                  <View style={styles.modalCountryRow}>
                    <ThemedText style={styles.countryEmoji}>🌍</ThemedText>
                    <ThemedText style={styles.modalCountry} lightColor="#666" darkColor="#aaa">
                      {selected.country}
                    </ThemedText>
                  </View>
                  
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalMajorBadge}>
                    <ThemedText style={styles.modalMajorText} lightColor="#fff" darkColor="#fff">
                      {selected.major}
                    </ThemedText>
                  </LinearGradient>
                </View>

                <View style={styles.modalHobbiesSection}>
                  <ThemedText style={styles.modalHobbiesLabel} lightColor="#999" darkColor="#777">
                    INTERESTS & HOBBIES
                  </ThemedText>
                  <View style={styles.modalHobbiesTags}>
                    {selected.hobbies.map((hobby: string, idx: number) => (
                      <View key={idx} style={styles.modalHobbyTag}>
                        <ThemedText style={styles.modalHobbyText} lightColor="#666" darkColor="#aaa">
                          {hobby}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('Connect', `Request sent to ${selected.name}`);
                      setSelected(null);
                    }}
                    activeOpacity={0.8}
                    style={styles.modalActionBtn}>
                    <LinearGradient
                      colors={['#f093fb', '#f5576c']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.connectModalButton}>
                      <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">
                        Connect 👋
                      </ThemedText>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => setSelected(null)} 
                    activeOpacity={0.8}
                    style={styles.modalActionBtn}>
                    <View style={styles.closeButton}>
                      <ThemedText type="defaultSemiBold" lightColor="#666" darkColor="#aaa">
                        Close
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </ThemedView>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    marginBottom: 6,
  },
  screenDesc: {
    fontSize: 14,
    textAlign: 'center',
  },
  listContent: {
    padding: 20,
    paddingTop: 20,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#f093fb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardInner: {
    padding: 20,
  },
  studentHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 80,
    height: 80,
  },
  studentDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 19,
    marginBottom: 6,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  countryEmoji: {
    fontSize: 14,
  },
  studentCountry: {
    fontSize: 14,
  },
  majorBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  majorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  hobbiesSection: {
    marginBottom: 16,
  },
  hobbiesLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  hobbiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyTag: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  hobbyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  connectButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    borderRadius: 28,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalScroll: {
    padding: 30,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalPhotoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalPhoto: {
    width: 120,
    height: 120,
  },
  modalName: {
    marginBottom: 8,
    textAlign: 'center',
  },
  modalCountryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  modalCountry: {
    fontSize: 15,
  },
  modalMajorBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  modalMajorText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalHobbiesSection: {
    marginBottom: 24,
  },
  modalHobbiesLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  modalHobbiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  modalHobbyTag: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  modalHobbyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalActions: {
    gap: 12,
  },
  modalActionBtn: {
    width: '100%',
  },
  connectModalButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});