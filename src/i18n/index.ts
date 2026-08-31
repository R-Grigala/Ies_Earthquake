import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './locales/en.json';
import ka from './locales/ka.json';

export const supportedLanguages = {
  ka: 'ქართული',
  en: 'English',
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

const STORAGE_KEY = 'ies.language';

const deviceLanguage = (): SupportedLanguage => {
  const code = getLocales()[0]?.languageCode;
  return code === 'ka' ? 'ka' : 'en';
};

void i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ka: { translation: ka },
  },
  lng: deviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
  if (stored && stored in supportedLanguages) {
    void i18next.changeLanguage(stored);
  }
});

export async function changeLanguage(language: SupportedLanguage) {
  await i18next.changeLanguage(language);
  await AsyncStorage.setItem(STORAGE_KEY, language);
}

export default i18next;
