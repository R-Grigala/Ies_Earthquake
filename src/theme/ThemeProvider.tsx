import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, type AppTheme } from './colors';

type ThemePreference = 'system' | 'light' | 'dark';

type ThemeContextValue = {
  theme: AppTheme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const STORAGE_KEY = 'ies.theme-preference';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('system');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setPreferenceState(stored);
      }
    });
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    void AsyncStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const resolved = preference === 'system' ? systemScheme ?? 'light' : preference;
    return {
      theme: resolved === 'dark' ? darkTheme : lightTheme,
      preference,
      setPreference,
    };
  }, [preference, setPreference, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
