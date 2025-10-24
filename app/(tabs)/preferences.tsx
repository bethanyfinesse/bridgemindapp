import { ThemedText } from '@/components/themed-text';
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
        <View style={styles.pickerModal}>
          <View style={styles.pickerHeader}>
            <ThemedText type="defaultSemiBold" style={styles.pickerTitle} lightColor="#1F2937" darkColor="#1F2937">
              {title}
            </ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={styles.pickerClose} lightColor="#8B7BA8" darkColor="#8B7BA8">Done</ThemedText>
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
                  lightColor={selected === item ? '#8B7BA8' : '#374151'}
                  darkColor={selected === item ? '#8B7BA8' : '#374151'}>
                  {item}
                </ThemedText>
                {selected === item && <ThemedText lightColor="#8B7BA8" darkColor="#8B7BA8">✓</ThemedText>}
              </TouchableOpacity>
            )}
          />
        </View>
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
    <LinearGradient
      colors={['#F8F4FF', '#FFF5F2', '#F0FAFF']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle} lightColor="#1F2937" darkColor="#1F2937">
            Find Your Counselor
          </ThemedText>
          <ThemedText style={styles.headerSubtitle} lightColor="#6B7280" darkColor="#6B7280">
            Let's find the perfect match for you
          </ThemedText>
        </View>

        {/* Language */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label} lightColor="#374151" darkColor="#374151">
            🌍 Preferred Language
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowLanguagePicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={styles.selectButtonText}
              lightColor={prefs.language ? '#1F2937' : '#9CA3AF'}
              darkColor={prefs.language ? '#1F2937' : '#9CA3AF'}>
              {prefs.language || 'Select a language'}
            </ThemedText>
            <ThemedText lightColor="#9CA3AF" darkColor="#9CA3AF">▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Country */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label} lightColor="#374151" darkColor="#374151">
            🏠 Your Country of Origin
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowCountryPicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={styles.selectButtonText}
              lightColor={prefs.country ? '#1F2937' : '#9CA3AF'}
              darkColor={prefs.country ? '#1F2937' : '#9CA3AF'}>
              {prefs.country || 'Select your country'}
            </ThemedText>
            <ThemedText lightColor="#9CA3AF" darkColor="#9CA3AF">▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Struggles */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label} lightColor="#374151" darkColor="#374151">
            💬 What are you struggling with?
          </ThemedText>
          <View style={styles.tagsContainer}>
            {struggles.map(struggle => (
              <TouchableOpacity
                key={struggle}
                onPress={() => toggleStruggle(struggle)}
                activeOpacity={0.7}
                style={[
                  styles.tag,
                  prefs.struggles.includes(struggle) && styles.tagActive
                ]}>
                <ThemedText 
                  style={styles.tagText}
                  lightColor={prefs.struggles.includes(struggle) ? '#D97941' : '#6B7280'}
                  darkColor={prefs.struggles.includes(struggle) ? '#D97941' : '#6B7280'}>
                  {struggle}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gender */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label} lightColor="#374151" darkColor="#374151">
            👤 Counselor Gender Preference
          </ThemedText>
          <View style={styles.buttonRow}>
            {['Male', 'Female', 'No Preference'].map(gender => (
              <TouchableOpacity
                key={gender}
                onPress={() => setPrefs({...prefs, gender})}
                activeOpacity={0.7}
                style={[
                  styles.button,
                  prefs.gender === gender && styles.buttonActive
                ]}>
                <ThemedText
                  style={styles.buttonText}
                  lightColor={prefs.gender === gender ? '#6BA587' : '#6B7280'}
                  darkColor={prefs.gender === gender ? '#6BA587' : '#6B7280'}>
                  {gender}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Session Type */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label} lightColor="#374151" darkColor="#374151">
            📹 Preferred Session Type
          </ThemedText>
          <View style={styles.buttonRow}>
            {['Video', 'Chat', 'In-Person'].map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => setPrefs({...prefs, sessionType: type})}
                activeOpacity={0.7}
                style={[
                  styles.button,
                  prefs.sessionType === type && styles.buttonActive
                ]}>
                <ThemedText
                  style={styles.buttonText}
                  lightColor={prefs.sessionType === type ? '#6BA587' : '#6B7280'}
                  darkColor={prefs.sessionType === type ? '#6BA587' : '#6B7280'}>
                  {type}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Therapy Approach */}
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.label} lightColor="#374151" darkColor="#374151">
            🧠 Therapy Approach (Optional)
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowApproachPicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={styles.selectButtonText}
              lightColor={prefs.approach ? '#1F2937' : '#9CA3AF'}
              darkColor={prefs.approach ? '#1F2937' : '#9CA3AF'}>
              {prefs.approach || 'Select an approach'}
            </ThemedText>
            <ThemedText lightColor="#9CA3AF" darkColor="#9CA3AF">▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValid}
          activeOpacity={0.8}
          style={[
            styles.submitButton,
            !isValid && styles.submitButtonDisabled
          ]}>
          <ThemedText 
            type="defaultSemiBold" 
            lightColor={isValid ? '#8B7BA8' : '#9CA3AF'} 
            darkColor={isValid ? '#8B7BA8' : '#9CA3AF'}
            style={styles.submitText}>
            Find My Counselors →
          </ThemedText>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
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
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    marginBottom: 12,
    fontWeight: '600',
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.3)',
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.2)',
    backgroundColor: 'rgba(107, 114, 128, 0.08)',
  },
  tagActive: {
    backgroundColor: 'rgba(217, 121, 65, 0.15)',
    borderColor: 'rgba(217, 121, 65, 0.3)',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(107, 165, 135, 0.2)',
    backgroundColor: 'rgba(107, 165, 135, 0.08)',
  },
  buttonActive: {
    backgroundColor: 'rgba(107, 165, 135, 0.15)',
    borderColor: 'rgba(107, 165, 135, 0.3)',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(139, 123, 168, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 123, 168, 0.2)',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(156, 163, 175, 0.2)',
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
    borderBottomColor: 'rgba(156, 163, 175, 0.1)',
  },
  pickerOptionText: {
    fontSize: 16,
  },
  pickerOptionSelected: {
    fontWeight: '600',
  },
});