const DEFAULT_API_BASE_URL = 'https://iesdata.iliauni.edu.ge:3030/api';

export const env = {
  apiBaseUrl: (process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, ''),
  apiToken: process.env.EXPO_PUBLIC_API_TOKEN ?? '',
};
