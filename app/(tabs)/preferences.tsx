import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const PREFS_KEY = '@bridgemind_preferences';

const struggles = [
  "Academic Stress", "Anxiety", "Depression", "Homesickness",
  "Cultural Adjustment", "Identity Issues", "Family Issues", "Loneliness"
];

const languages = [
  "English", "Spanish", "Mandarin", "Hindi", "Arabic", "French",
  "Portuguese", "Korean", "Japanese", "German", "Russian", "Vietnamese"
];

const countries = [
  "China", "India", "South Korea", "Saudi Arabia", "Canada", "Vietnam",
  "Taiwan", "Japan", "Mexico", "Brazil", "Nigeria", "Turkey", "Iran",
  "Nepal", "Thailand", "Pakistan", "Indonesia", "Colombia", "Bangladesh"
];

const approaches = [
  "CBT (Cognitive Behavioral)", "Psychodynamic", "Humanistic",
  "Mindfulness-Based", "Solution-Focused", "ACT", "Person-Centered"
];

interface PickerModalProps {
  visible: boolean;
  onClose: () => void;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  title: string;
}

function PickerModal({ visible, onClose, options, selected, onSelect, title }: PickerModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <ThemedView style={styles.pickerModal}>
          <View style={styles.pickerHeader}>
            <ThemedText type="defaultSemiBold" style={styles.pickerTitle}>{title}</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={styles.pickerClose} lightColor="#667eea" darkColor="#8b9dff">Done</ThemedText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={styles.pickerOption}>
                <ThemedText 
                  style={[styles.pickerOptionText, selected === item && styles.pickerOptionSelected]}
                  lightColor={selected === item ? '#667eea' : '#333'}
                  darkColor={selected === item ? '#8b9dff' : '#ccc'}>
                  {item}
                </ThemedText>
                {selected === item && <ThemedText>✓</ThemedText>}
              </TouchableOpacity>
            )}
          />
        </ThemedView>
      </View>
    </Modal>
  );
}

export default function PreferencesScreen() {
  const router = useRouter();
  const [prefs, setPrefs] = useState({
    language: '',
    country: '',
    struggles: [] as string[],
    gender: '',
    sessionType: '',
    approach: ''
  });
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showApproachPicker, setShowApproachPicker] = useState(false);

  const toggleStruggle = (struggle: string) => {
    setPrefs(prev => ({
      ...prev,
      struggles: prev.struggles.includes(struggle)
        ? prev.struggles.filter(s => s !== struggle)
        : [...prev.struggles, struggle]
    }));
  };

  const handleSubmit = async () => {
    if (prefs.language && prefs.country && prefs.struggles.length > 0) {
      try {
        await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
        router.push('/(tabs)/matches');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const isValid = prefs.language && prefs.country && prefs.struggles.length > 0;

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerIcon}>
            <ThemedText style={styles.headerIconText}>❤️</ThemedText>
          </LinearGradient>
          <ThemedText type="title" style={styles.title}>
            Welcome to BridgeMind
          </ThemedText>
          <ThemedText style={styles.subtitle} lightColor="#666" darkColor="#aaa">
            Let's find the perfect counselor for you
          </ThemedText>
        </View>

        {/* Language */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            🌍 Preferred Language
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowLanguagePicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={styles.selectButtonText}
              lightColor={prefs.language ? '#333' : '#999'}
              darkColor={prefs.language ? '#ccc' : '#777'}>
              {prefs.language || 'Select a language'}
            </ThemedText>
            <ThemedText lightColor="#999" darkColor="#777">▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Country */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            🏠 Your Country of Origin
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowCountryPicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={styles.selectButtonText}
              lightColor={prefs.country ? '#333' : '#999'}
              darkColor={prefs.country ? '#ccc' : '#777'}>
              {prefs.country || 'Select your country'}
            </ThemedText>
            <ThemedText lightColor="#999" darkColor="#777">▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Struggles */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            💬 What are you struggling with?
          </ThemedText>
          <View style={styles.tagsContainer}>
            {struggles.map(struggle => (
              <TouchableOpacity
                key={struggle}
                onPress={() => toggleStruggle(struggle)}
                activeOpacity={0.7}>
                <LinearGradient
                  colors={prefs.struggles.includes(struggle) 
                    ? ['#667eea', '#764ba2'] 
                    : ['#f5f5f5', '#f5f5f5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tag}>
                  <ThemedText 
                    style={styles.tagText}
                    lightColor={prefs.struggles.includes(struggle) ? '#fff' : '#666'}
                    darkColor={prefs.struggles.includes(struggle) ? '#fff' : '#aaa'}>
                    {struggle}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gender */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            👤 Counselor Gender Preference
          </ThemedText>
          <View style={styles.buttonRow}>
            {['Male', 'Female', 'No Preference'].map(gender => (
              <TouchableOpacity
                key={gender}
                onPress={() => setPrefs({...prefs, gender})}
                activeOpacity={0.7}
                style={styles.buttonFlex}>
                <LinearGradient
                  colors={prefs.gender === gender 
                    ? ['#667eea', '#764ba2'] 
                    : ['#f5f5f5', '#f5f5f5']}
                  style={styles.button}>
                  <ThemedText
                    style={styles.buttonText}
                    lightColor={prefs.gender === gender ? '#fff' : '#666'}
                    darkColor={prefs.gender === gender ? '#fff' : '#aaa'}>
                    {gender}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Session Type */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            📹 Preferred Session Type
          </ThemedText>
          <View style={styles.buttonRow}>
            {['Video', 'Chat', 'In-Person'].map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => setPrefs({...prefs, sessionType: type})}
                activeOpacity={0.7}
                style={styles.buttonFlex}>
                <LinearGradient
                  colors={prefs.sessionType === type 
                    ? ['#667eea', '#764ba2'] 
                    : ['#f5f5f5', '#f5f5f5']}
                  style={styles.button}>
                  <ThemedText
                    style={styles.buttonText}
                    lightColor={prefs.sessionType === type ? '#fff' : '#666'}
                    darkColor={prefs.sessionType === type ? '#fff' : '#aaa'}>
                    {type}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Therapy Approach */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            🧠 Therapy Approach (Optional)
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowApproachPicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={styles.selectButtonText}
              lightColor={prefs.approach ? '#333' : '#999'}
              darkColor={prefs.approach ? '#ccc' : '#777'}>
              {prefs.approach || 'Select an approach'}
            </ThemedText>
            <ThemedText lightColor="#999" darkColor="#777">▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValid}
          activeOpacity={0.8}
          style={styles.submitContainer}>
          <LinearGradient
            colors={isValid ? ['#667eea', '#764ba2'] : ['#ccc', '#ccc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}>
            <ThemedText 
              type="defaultSemiBold" 
              lightColor="#fff" 
              darkColor="#fff"
              style={styles.submitText}>
              Find My Counselors →
            </ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Pickers */}
      <PickerModal
        visible={showLanguagePicker}
        onClose={() => setShowLanguagePicker(false)}
        options={languages}
        selected={prefs.language}
        onSelect={(val) => setPrefs({...prefs, language: val})}
        title="Select Language"
      />
      <PickerModal
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        options={countries}
        selected={prefs.country}
        onSelect={(val) => setPrefs({...prefs, country: val})}
        title="Select Country"
      />
      <PickerModal
        visible={showApproachPicker}
        onClose={() => setShowApproachPicker(false)}
        options={approaches}
        selected={prefs.approach}
        onSelect={(val) => setPrefs({...prefs, approach: val})}
        title="Select Therapy Approach"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerIconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  selectButtonText: {
    fontSize: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonFlex: {
    flex: 1,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  submitContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  submitButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerModal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerTitle: {
    fontSize: 18,
  },
  pickerClose: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  pickerOptionText: {
    fontSize: 16,
  },
  pickerOptionSelected: {
    fontWeight: '600',
  },
});