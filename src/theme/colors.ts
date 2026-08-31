export type AppTheme = {
  mode: 'light' | 'dark';
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  headerBackground: string;
  headerText: string;
};

export const lightTheme: AppTheme = {
  mode: 'light',
  background: '#ffffff',
  surface: '#f6f6f8',
  border: '#e3e3e3',
  text: '#1c1c1e',
  textMuted: '#6e6e73',
  accent: '#c1121f',
  headerBackground: '#f2f2f4',
  headerText: '#7a0002',
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  background: '#121214',
  surface: '#1e1e22',
  border: '#2f2f35',
  text: '#f2f2f4',
  textMuted: '#9a9aa2',
  accent: '#ff453a',
  headerBackground: '#1e1e22',
  headerText: '#ff9f9a',
};
