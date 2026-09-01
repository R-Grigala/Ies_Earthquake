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
- ერთეულზე დაჭერა → `/event/{id}`

## ✅ ნაბიჯი 4 — API / SSL გადაწყვეტა

- IES სერვერს self-signed SSL აქვს
- `metro.config.js` — dev proxy (`/ies-api` → IES)
- `src/config/env.ts` — dev-ში ავტომატურად proxy URL
- `network_security_config.xml` — Android production build-ისთვის

## ✅ ნაბიჯი 5 — სეისმური რუკა

- `react-native-maps` — MapView, hybrid რუკა
- `app/(tabs)/map.tsx` — რუკის ეკრანი, loading/error/empty
- `EarthquakeMap` — GNSMC აიკონები, callout (დრო, მდებარეობა, მაგნიტუდა)
- `MapLegend` — ასაკის ლეგენდა იგივე აიკონებით (ზედა ოვერლეი)
- `app/(tabs)/_layout.tsx` — events + map ტაბები, `list-outline.png` / `earth-outline.png` აიკონები (`#7a0002` აქტიური ფერი)

## ✅ ნაბიჯი 6 — მიწისძვრის დეტალები

- `app/event/[id].tsx` — დეტალების ეკრანი (GNSMC სტილი: რუკა + ველები)
- `EventDetailMap` — hybrid მინი-რუკა, ყველა მარკერი; არჩეული ყოველთვის GIF
- `EventDetailContent` — დრო, მაგნიტუდა, სიღრმე, კოორდინატები, მდებარეობა
- `useEarthquake(id)` — cache-იდან ძებნა
- ნავიგაცია: სიიდან და რუკის callout-იდან
- ლეგენდა: **არჩეული** + **ბოლო 7 დღე** (detail variant)

## ✅ ნაბიჯი 7 — i18n და პარამეტრები

- `i18next` + `react-i18next` + `expo-localization` + `AsyncStorage`
- `src/i18n/locales/ka.json`, `en.json` — ყველა UI ტექსტი
- `useEventRegion()` — `location_ge` (ka) / `location_en` (en)
- `app/(tabs)/settings.tsx` — ენის არჩევა (GNSMC სტილი)
- `LanguagePickerModal` — bottom sheet ენის ბარათებით
- ლეიბლი **მდებარეობა** / **Location** (არა „რეგიონი")

## 🔜 შემდეგი ნაბიჯები

1. პარამეტრებში თემის არჩევა (dark/light)
2. Push ნოტიფიკაციები
3. Production SSL ან backend proxy ვალიდური სერტიფიკატით
