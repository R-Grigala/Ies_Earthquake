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

## 🔜 შემდეგი ნაბიჯები

1. `app/(tabs)/map.tsx` — ინტერაქციული რუკა
2. `app/event/[id].tsx` — მოვლენის დეტალები
3. `app/(tabs)/settings.tsx` — ენა, თემა
4. Push ნოტიფიკაციები
5. Production SSL ან backend proxy ვალიდური სერტიფიკატით
