import { useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { LanguagePickerModal } from '@/src/components/settings/LanguagePickerModal';
import type { AppLanguage } from '@/src/i18n';
import { setAppLanguage } from '@/src/i18n';
import languagesList from '@/src/i18n/languagesList.json';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const headerBackground = useThemeColor({ light: 'rgba(0,0,0,0.08)', dark: '#1e1e22' }, 'background');
  const headerText = useThemeColor({ light: '#7a0002', dark: '#ff9f9a' }, 'text');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({ light: '#a7a7a7', dark: '#8e8e93' }, 'icon');
  const rowBorderColor = useThemeColor({ light: '#e3e3e3', dark: '#3a3a3c' }, 'icon');
  const contentBorderColor = useThemeColor({ light: 'rgba(0,0,0,0.3)', dark: 'rgba(255,255,255,0.2)' }, 'icon');
  const currentLanguage: AppLanguage = i18n.language === 'en' ? 'en' : 'ka';

  const handleSelectLanguage = (language: AppLanguage) => {
    void setAppLanguage(language);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

        <View style={[styles.header, { backgroundColor: headerBackground }]}>
          <ThemedText style={[styles.headerTitle, { color: headerText }]}>
            {t('settings.title')}
          </ThemedText>
        </View>

        <View style={[styles.content, { borderColor: contentBorderColor }]}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={[styles.sectionHeaderText, { color: mutedColor }]}>
                {t('settings.preference')}
              </ThemedText>
            </View>

            <Pressable
              style={[styles.rowContainer, { borderColor: rowBorderColor }]}
              onPress={() => setModalVisible(true)}>
              <Image
                source={require('@/assets/icons/globe.png')}
                style={[styles.rowIcon, { tintColor: textColor }]}
              />
              <ThemedText style={[styles.rowLabel, { color: textColor }]}>
                {t('settings.language')}
              </ThemedText>
              <View style={styles.rowSpacer} />
              <ThemedText style={[styles.languageName, { color: textColor }]}>
                {languagesList[currentLanguage].nativeName}
              </ThemedText>
              <Image
                source={require('@/assets/icons/chevron-forward-outline.png')}
                style={[styles.chevronIcon, { tintColor: mutedColor }]}
              />
            </Pressable>
          </View>
        </View>

        <LanguagePickerModal
          visible={modalVisible}
          currentLanguage={currentLanguage}
          onClose={() => setModalVisible(false)}
          onSelect={handleSelectLanguage}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    borderWidth: 0.5,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  rowContainer: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '6%',
    paddingRight: '5%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  rowIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowSpacer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    marginRight: 8,
  },
  chevronIcon: {
    width: 18,
    height: 18,
  },
});
