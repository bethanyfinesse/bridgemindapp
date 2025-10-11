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
              <ThemedText style={styles.pickerClose} lightColor="#2B6B7F" darkColor="#4A8A9E">Done</ThemedText>
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
                  lightColor={selected === item ? '#2B6B7F' : '#2A2D35'}
                  darkColor={selected === item ? '#4A8A9E' : '#F8F9FA'}>
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
    <ThemedView style={styles.container} lightColor="#F8F9FA" darkColor="#1A1D23">
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#2B6B7F', '#6BA587']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerIcon}>
            <ThemedText style={styles.headerIconText}>❤️</ThemedText>
          </LinearGradient>
          <ThemedText type="title" style={styles.title}>
            Welcome to BridgeMind
          </ThemedText>
          <ThemedText style={styles.subtitle} lightColor="#6B7280" darkColor="#A8B2C1">
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
              lightColor={prefs.language ? '#2A2D35' : '#A8B2C1'}
              darkColor={prefs.language ? '#F8F9FA' : '#6B7280'}>
              {prefs.language || 'Select a language'}
            </ThemedText>
            <ThemedText lightColor="#A8B2C1" darkColor="#6B7280">▼</ThemedText>
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
              lightColor={prefs.country ? '#2A2D35' : '#A8B2C1'}
              darkColor={prefs.country ? '#F8F9FA' : '#6B7280'}>
              {prefs.country || 'Select your country'}
            </ThemedText>
            <ThemedText lightColor="#A8B2C1" darkColor="#6B7280">▼</ThemedText>
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
                    ? ['#8B7BA8', '#A594BD'] 
                    : ['#F8F9FA', '#F8F9FA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tag}>
                  <ThemedText 
                    style={styles.tagText}
                    lightColor={prefs.struggles.includes(struggle) ? '#fff' : '#6B7280'}
                    darkColor={prefs.struggles.includes(struggle) ? '#fff' : '#A8B2C1'}>
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
                    ? ['#D97941', '#E89964'] 
                    : ['#F8F9FA', '#F8F9FA']}
                  style={styles.button}>
                  <ThemedText
                    style={styles.buttonText}
                    lightColor={prefs.gender === gender ? '#fff' : '#6B7280'}
                    darkColor={prefs.gender === gender ? '#fff' : '#A8B2C1'}>
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
                    ? ['#6BA587', '#85BFA1'] 
                    : ['#F8F9FA', '#F8F9FA']}
                  style={styles.button}>
                  <ThemedText
                    style={styles.buttonText}
                    lightColor={prefs.sessionType === type ? '#fff' : '#6B7280'}
                    darkColor={prefs.sessionType === type ? '#fff' : '#A8B2C1'}>
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
              lightColor={prefs.approach ? '#2A2D35' : '#A8B2C1'}
              darkColor={prefs.approach ? '#F8F9FA' : '#6B7280'}>
              {prefs.approach || 'Select an approach'}
            </ThemedText>
            <ThemedText lightColor="#A8B2C1" darkColor="#6B7280">▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValid}
          activeOpacity={0.8}
          style={styles.submitContainer}>
          <LinearGradient
            colors={isValid ? ['#2B6B7F', '#6BA587'] : ['#E8ECF1', '#E8ECF1']}
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
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#2B6B7F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  headerIconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
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
    borderWidth: 1,
    borderColor: '#E8ECF1',
    shadowColor: '#2B6B7F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8ECF1',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  selectButtonText: {
    fontSize: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonFlex: {
    flex: 1,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
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
    shadowColor: '#2B6B7F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
    borderBottomColor: '#E8ECF1',
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
    borderBottomColor: '#F8F9FA',
  },
  pickerOptionText: {
    fontSize: 16,
  },
  pickerOptionSelected: {
    fontWeight: '600',
  },
});