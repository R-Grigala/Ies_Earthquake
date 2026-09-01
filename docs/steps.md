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
  - მდებარეობა — ქვედა რიგი
  - ლეიბლები მარცხნივ გასწორებული (88px სვეტი)

## ✅ ნაბიჯი 4 — API / SSL გადაწყვეტა

- IES სერვერს self-signed SSL აქვს
- `metro.config.js` — dev proxy (`/ies-api` → IES)
- `src/config/env.ts` — dev-ში ავტომატურად proxy URL
- `network_security_config.xml` — Android production build-ისთვის

## ✅ ნაბიჯი 5 — სეისმური რუკა

- `react-native-maps` — MapView, hybrid რუკა
- `app/(tabs)/map.tsx` — რუკის ეკრანი, loading/error/empty
- `EarthquakeMap` — GNSMC აიკონები, callout (დრო, მდებარეობა, მაგნიტუდა)
- `MapLegend` — ასაკის ლეგენდა იგივე აიკონებით (ქართული)
- `app/(tabs)/_layout.tsx` — events + map ტაბები, `list-outline.png` / `earth-outline.png` აიკონები (`#7a0002` აქტიური ფერი)

## ✅ ნაბიჯი 6 — მიწისძვრის დეტალები

- `app/event/[id].tsx` — დეტალების ეკრანი (GNSMC სტილი: რუკა + ველები)
- `EventDetailMap` — hybrid მინი-რუკა, ერთი მარკერი
- `EventDetailContent` — დრო, მაგნიტუდა, სიღრმე, კოორდინატები, მდებარეობა
- `useEarthquake(id)` — cache-იდან ძებნა
- ნავიგაცია: სიიდან და რუკის callout-იდან

## 🔜 შემდეგი ნაბიჯები

1. `app/(tabs)/settings.tsx` — ენა, თემა
2. Push ნოტიფიკაციები
3. Production SSL ან backend proxy ვალიდური სერტიფიკატით
