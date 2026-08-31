const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;

if (!API_BASE_URL) {
  throw new Error(
    'EXPO_PUBLIC_API_BASE_URL is not set. Copy .env.example to .env and restart the dev server.'
  );
}

export const env = {
  apiBaseUrl: API_BASE_URL.replace(/\/+$/, ''),
  apiToken: API_TOKEN ?? '',
};
