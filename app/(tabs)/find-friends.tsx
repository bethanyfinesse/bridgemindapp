import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { avatarFor } from '@/src/data/avatars';
import { students } from '@/src/data/mockData';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function FindFriends() {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.screenTitle}>
          Find Friends
        </ThemedText>
        <ThemedText style={styles.screenDesc} lightColor="#666" darkColor="#aaa">
          Connect with fellow students
        </ThemedText>
      </View>

      <FlatList
        data={students}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} activeOpacity={0.7}>
            <View style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.photoContainer}>
                  <Image source={avatarFor(item.avatar)} style={styles.photo} />
                </LinearGradient>
                <View style={styles.studentDetails}>
                  <ThemedText type="defaultSemiBold" style={styles.studentName}>{item.name}</ThemedText>
                  <ThemedText style={styles.studentCountry} lightColor="#666" darkColor="#aaa">{item.country}</ThemedText>
                  <ThemedText style={styles.studentMajor} lightColor="#667eea" darkColor="#8b9dff">{item.major}</ThemedText>
                </View>
              </View>
              
              <View style={styles.hobbiesSection}>
                <ThemedText style={styles.hobbiesLabel} lightColor="#999" darkColor="#777">INTERESTS</ThemedText>
                <View style={styles.hobbiesTags}>
                  {item.hobbies.map((hobby: string, idx: number) => (
                    <View key={idx} style={styles.hobbyTag}>
                      <ThemedText style={styles.hobbyText} lightColor="#666" darkColor="#aaa">{hobby}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>

              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.connectButton}>
                <TouchableOpacity 
                  style={styles.connectButtonInner}
                  onPress={() => Alert.alert('Connect', `Request sent to ${item.name}`)}>
                  <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">Connect</ThemedText>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)} transparent>
        <View style={styles.modalBackdrop}>
          <ThemedView style={styles.modalCard}>
            {selected && (
              <>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modalPhotoContainer}>
                  <Image source={avatarFor(selected.avatar)} style={styles.modalPhoto} />
                </LinearGradient>
                <ThemedText type="subtitle" style={styles.modalName}>{selected.name}</ThemedText>
                <ThemedText style={styles.modalCountry} lightColor="#666" darkColor="#aaa">{selected.country}</ThemedText>
                <ThemedText style={styles.modalMajor} lightColor="#667eea" darkColor="#8b9dff">{selected.major}</ThemedText>
                <View style={styles.modalHobbiesSection}>
                  <ThemedText style={styles.modalHobbiesLabel} lightColor="#999" darkColor="#777">INTERESTS</ThemedText>
                  <View style={styles.modalHobbiesTags}>
                    {selected.hobbies.map((hobby: string, idx: number) => (
                      <View key={idx} style={styles.modalHobbyTag}>
                        <ThemedText style={styles.modalHobbyText} lightColor="#666" darkColor="#aaa">{hobby}</ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelected(null)} activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.closeButton}>
                    <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#fff">Close</ThemedText>
                  </LinearGradient>
                </TouchableOpacity>
              </>
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
  studentCard: {
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
  studentHeader: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  photoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 70,
    height: 70,
  },
  studentDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  studentName: {
    fontSize: 18,
    marginBottom: 3,
  },
  studentCountry: {
    fontSize: 14,
    marginBottom: 3,
  },
  studentMajor: {
    fontSize: 13,
    fontWeight: '600',
  },
  hobbiesSection: {
    marginBottom: 15,
  },
  hobbiesLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  hobbiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hobbyTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  hobbyText: {
    fontSize: 12,
  },
  connectButton: {
    borderRadius: 12,
  },
  connectButtonInner: {
    padding: 14,
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
  },
  modalPhotoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  modalPhoto: {
    width: 110,
    height: 110,
  },
  modalName: {
    marginBottom: 5,
  },
  modalCountry: {
    fontSize: 14,
    marginBottom: 3,
  },
  modalMajor: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
  },
  modalHobbiesSection: {
    width: '100%',
    marginBottom: 20,
  },
  modalHobbiesLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  modalHobbiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  modalHobbyTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  modalHobbyText: {
    fontSize: 12,
  },
  closeButton: {
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 14,
  },
});