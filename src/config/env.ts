import Constants from 'expo-constants';

const DEFAULT_API_BASE_URL = 'https://iesdata.iliauni.edu.ge:2026/api';

const productionApiBaseUrl = (
  process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/+$/, '');

function getDevApiBaseUrl(): string | null {
  if (!__DEV__) {
    return null;
  }

  const explicitDevUrl = process.env.EXPO_PUBLIC_DEV_API_BASE_URL;
  if (explicitDevUrl) {
    return explicitDevUrl.replace(/\/+$/, '');
  }

  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) {
    return null;
  }

  return `http://${hostUri}/ies-api`;
}

const devApiBaseUrl = getDevApiBaseUrl();

export const env = {
  apiBaseUrl: devApiBaseUrl ?? productionApiBaseUrl,
  apiToken: process.env.EXPO_PUBLIC_API_TOKEN ?? '',
  usesDevProxy: devApiBaseUrl !== null,
};
