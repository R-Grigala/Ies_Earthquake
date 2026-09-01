import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/src/i18n/locales/en.json';
import ka from '@/src/i18n/locales/ka.json';

export const LANGUAGE_KEY = 'app_language';
export type AppLanguage = 'ka' | 'en';

export const SUPPORTED_LANGUAGES: AppLanguage[] = ['ka', 'en'];

function resolveDeviceLanguage(): AppLanguage {
  const code = getLocales()[0]?.languageCode;
  return code === 'ka' ? 'ka' : 'en';
}

void i18n.use(initReactI18next).init({
  resources: {
    ka: { translation: ka },
    en: { translation: en },
  },
  lng: resolveDeviceLanguage(),
  fallbackLng: 'ka',
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export async function loadSavedLanguage(): Promise<void> {
  const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (saved === 'ka' || saved === 'en') {
    await i18n.changeLanguage(saved);
  }
}

export async function setAppLanguage(language: AppLanguage): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  await i18n.changeLanguage(language);
}

export function getAppLanguage(): AppLanguage {
  return i18n.language === 'en' ? 'en' : 'ka';
}

export default i18n;
