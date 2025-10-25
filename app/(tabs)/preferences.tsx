import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// Yellow color palette using #ffe46eff
const COLORS = {
  primary: '#ffe46eff',
  primaryLight: '#f7e07bff',
  primaryLighter: '#ffe678ff',
  primaryDark: '#FCDC4D',
  white:  '#ffe46eff',
  pureWhite: '#916a6aff',
  textOnYellow: '#FFFFFF', // White text for contrast on yellow backgrounds
};

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
            <ThemedText style={styles.pickerTitle}>
              {title}
            </ThemedText>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={styles.pickerClose}>Done</ThemedText>
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
                  style={[styles.pickerOptionText, selected === item && styles.pickerOptionSelected]}>
                  {item}
                </ThemedText>
                {selected === item && <ThemedText style={styles.checkmark}>✓</ThemedText>}
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
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>
            FIND YOUR COUNSELOR
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Let's find the perfect match for you
          </ThemedText>
        </View>

        {/* Language */}
        <View style={styles.card}>
          <ThemedText style={styles.label}>
            Preferred Language
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowLanguagePicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={[styles.selectButtonText, !prefs.language && styles.placeholderText]}>
              {prefs.language || 'Select a language'}
            </ThemedText>
            <ThemedText style={styles.dropdownIcon}>▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Country */}
        <View style={styles.card}>
          <ThemedText style={styles.label}>
            Your Country of Origin
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowCountryPicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={[styles.selectButtonText, !prefs.country && styles.placeholderText]}>
              {prefs.country || 'Select your country'}
            </ThemedText>
            <ThemedText style={styles.dropdownIcon}>▼</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Struggles */}
        <View style={styles.card}>
          <ThemedText style={styles.label}>
            What are you struggling with?
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
                  style={[styles.tagText, prefs.struggles.includes(struggle) && styles.tagTextActive]}>
                  {struggle}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gender */}
        <View style={styles.card}>
          <ThemedText style={styles.label}>
            Counselor Gender Preference
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
                  style={[styles.buttonText, prefs.gender === gender && styles.buttonTextActive]}>
                  {gender}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Session Type */}
        <View style={styles.card}>
          <ThemedText style={styles.label}>
            Preferred Session Type
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
                  style={[styles.buttonText, prefs.sessionType === type && styles.buttonTextActive]}>
                  {type}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Therapy Approach */}
        <View style={styles.card}>
          <ThemedText style={styles.label}>
            Therapy Approach (Optional)
          </ThemedText>
          <TouchableOpacity 
            onPress={() => setShowApproachPicker(true)}
            style={styles.selectButton}>
            <ThemedText 
              style={[styles.selectButtonText, !prefs.approach && styles.placeholderText]}>
              {prefs.approach || 'Select an approach'}
            </ThemedText>
            <ThemedText style={styles.dropdownIcon}>▼</ThemedText>
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
          <ThemedText style={styles.submitText}>
            FIND MY COUNSELORS →
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    padding: 32,
    paddingTop: 80,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 32,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: 1.5,
    color: COLORS.textOnYellow,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textOnYellow,
    letterSpacing: 0.8,
    lineHeight: 22,
    opacity: 0.9,
  },
  card: {
    backgroundColor: COLORS.primaryLighter,
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
  label: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '700',
    color: COLORS.textOnYellow,
    letterSpacing: 0.3,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textOnYellow,
  },
  placeholderText: {
    color: COLORS.textOnYellow + '99',
  },
  dropdownIcon: {
    color: COLORS.textOnYellow,
    fontSize: 12,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.white,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tagActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: COLORS.white,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textOnYellow,
    letterSpacing: 0.3,
  },
  tagTextActive: {
    color: COLORS.textOnYellow,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.white,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: COLORS.white,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textOnYellow,
    letterSpacing: 0.3,
  },
  buttonTextActive: {
    color: COLORS.textOnYellow,
    fontWeight: '700',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primaryDark,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDark,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  pickerModal: {
    backgroundColor: COLORS.primaryLighter,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textOnYellow,
  },
  pickerClose: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textOnYellow,
  },
  pickerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  pickerOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textOnYellow,
  },
  pickerOptionSelected: {
    fontWeight: '700',
    color: COLORS.textOnYellow,
  },
  checkmark: {
    color: COLORS.textOnYellow,
    fontWeight: '700',
  },
});