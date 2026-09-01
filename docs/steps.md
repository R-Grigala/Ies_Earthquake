# განვითარების ნაბიჯები

## ✅ ნაბიჯი 1 — პროექტის საფუძველი

- Expo SDK 54 + expo-router + TypeScript
- `app/` სტრუქტურა: `(tabs)/events.tsx`
- `app/index.tsx` → აპი პირდაპირ events სიაზე იხსნება

## ✅ ნაბიჯი 2 — მონაცემთა შრე

- `src/api/` — HTTP client + `/events`
- `src/hooks/useEarthquakes.ts` — TanStack Query
- `src/types/`, `src/utils/`, `src/config/env.ts`
- API ველები: `location_ge`, `location_en` (არა `description`)

## ✅ ნაბიჯი 3 — Earthquake Events ეკრანი

- `app/(tabs)/events.tsx` — სია, pull-to-refresh, loading/error/empty
- `EventListItem` — GNSMC-ის ცხრილის სტილი:
  - დრო (UTC) — ორ ხაზად (თარიღი + საათი)
  - მაგნიტუდა — მარჯვნივ, ფერად
  - რეგიონი — ქვედა რიგი
  - ლეიბლები მარცხნივ გასწორებული (76px სვეტი)

## ✅ ნაბიჯი 4 — API / SSL გადაწყვეტა

- IES სერვერს self-signed SSL აქვს
- `metro.config.js` — dev proxy (`/ies-api` → IES)
- `src/config/env.ts` — dev-ში ავტომატურად proxy URL
- `network_security_config.xml` — Android production build-ისთვის

## ✅ ნაბიჯი 5 — სეისმური რუკა

- `react-native-maps` — MapView, hybrid რუკა
- `app/(tabs)/map.tsx` — რუკის ეკრანი, loading/error/empty
- `EarthquakeMap` — GNSMC აიკონები (`Earthquake_gif.gif` / `Earthquake_red.png` / `Earthquake_yellow.png`), callout (დრო, კოორდინატები, მაგნიტუდა, სიღრმე, რეგიონი)
- `MapLegend` — ასაკის ლეგენდა იგივე აიკონებით (ქართული)
- `app/(tabs)/_layout.tsx` — events + map ტაბები, `list-outline.png` / `earth-outline.png` აიკონები (`#7a0002` აქტიური ფერი)

## 🔜 შემდეგი ნაბიჯები

1. `app/event/[id].tsx` — მოვლენის დეტალები
2. `app/(tabs)/settings.tsx` — ენა, თემა
3. Push ნოტიფიკაციები
4. Production SSL ან backend proxy ვალიდური სერტიფიკატით
