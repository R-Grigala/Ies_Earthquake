# Ies_Earthquake

Ies_Earthquake is a mobile application for monitoring and visualizing seismic events, providing real-time earthquake data, interactive maps, event details, and notifications.

Detailed documentation lives in [docs/](./docs/README.md) — setup, architecture,
API reference, and a page-by-page description of every screen.

## Stack

- Expo + expo-router (TypeScript)
- TanStack Query for data fetching and caching
- react-native-maps for the interactive map
- i18next / react-i18next for Georgian and English localization

## Setup

```bash
npx create-expo-app@latest . --template tabs --no-install
npx expo install @tanstack/react-query react-native-maps @react-native-async-storage/async-storage i18next react-i18next expo-localization
npm install
cp .env.example .env
npx expo start
```

Fill `EXPO_PUBLIC_API_TOKEN` in `.env` before starting; the API requires a `Token` authorization header.

## Project structure

```
app/            expo-router screens (tabs: list, map, settings + event details)
docs/           project documentation (steps, architecture, pages)
src/api/        HTTP client and endpoint wrappers
src/hooks/      TanStack Query hooks
src/i18n/       i18next setup and ka/en translations
src/theme/      theme palette and provider
src/types/      shared domain types
src/utils/      date formatting and magnitude helpers
```

## Data source

Events come from the IES (Ilia State University seismic monitoring centre) API at
`EXPO_PUBLIC_API_BASE_URL`, endpoint `/events`. Each event carries `origin_time`,
`ml` (local magnitude), `latitude`, `longitude`, `depth` and `description`.
Times from the API are UTC and are displayed as such.
