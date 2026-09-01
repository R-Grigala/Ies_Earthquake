# არქიტექტურა

## პრინციპი

UI (`app/`) გამოყოფილია ლოგიკისგან (`src/`). ეკრანები არ იძახებენ `fetch`-ს პირდაპირ — მხოლოდ `useEarthquakes()` hook-ს.

## სტეკი

| ტექნოლოგია | ვერსია / დანიშნულება |
| --- | --- |
| Expo SDK | 54 |
| expo-router | ფაილზე დაფუძნებული მარშრუტები |
| TypeScript | ტიპიზაცია |
| TanStack Query | ქეში, refetch, loading/error |
| React Navigation | თემა (light/dark სისტემური) |

## დირექტორიები

```
app/
  _layout.tsx           QueryClientProvider + Stack
  index.tsx             Redirect → /(tabs)/events
  (tabs)/
    _layout.tsx         Tab bar (ამჟამად მხოლოდ events, დამალული)
    events.tsx          მიწისძვრების სია

src/
  api/
    client.ts           fetch გარსი, ApiError
    events.ts           /events ენდპოინტი, ნორმალიზება
  config/env.ts         API URL, dev proxy ლოგიკა
  hooks/useEarthquakes.ts
  components/events/EventListItem.tsx
  types/earthquake.ts
  utils/format.ts       UTC თარიღი/დრო
  utils/magnitude.ts    მაგნიტუდის ფერები

metro.config.js         dev proxy (/ies-api → IES API)
network_security_config.xml   Android SSL (production build)
```

## მონაცემთა ნაკადი

```
IES API
  ↓  (dev: Metro proxy, secure: false)
apiGet('/events')
  ↓
fetchEarthquakes()  →  EarthquakeEvent[]
  ↓
useTabEarthquakes() → cache + ფონური refetch ტაბის focus-ზე
useEarthquakes()     → cache (დეტალების ეკრანი)
refetch ხელით       → pull-to-refresh, retry
  ↓
events.tsx          →  FlatList + EventListItem
```

## Dev vs Production API URL

| გარემო | URL |
| --- | --- |
| `__DEV__` | `http://<hostUri>/ies-api` (Metro proxy) |
| production | `EXPO_PUBLIC_API_BASE_URL` |

ლოგიკა: `src/config/env.ts`

## მარშრუტიზაცია

```
აპის გახსნა → app/index.tsx → Redirect → /(tabs)/events
ტაბები: events.tsx ✅, map.tsx ✅
მარშრუტი: event/[id].tsx ✅
```

მომავალში დაემატება: `settings.tsx`.
