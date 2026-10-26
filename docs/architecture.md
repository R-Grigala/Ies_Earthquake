# არქიტექტურა

## პრინციპი

UI (`app/`) გამოყოფილია ლოგიკისგან (`src/`). ეკრანები არ იძახებენ `fetch`-ს პირდაპირ — მხოლოდ hooks-ს (`useTabEarthquakes`, `useEarthquake`).

## სტეკი

| ტექნოლოგია | ვერსია / დანიშნულება |
| --- | --- |
| Expo SDK | 58 (React Native 0.88) |
| expo-router | ფაილზე დაფუძნებული მარშრუტები (tabs + stack) |
| TypeScript | ტიპიზაცია |
| TanStack Query | ქეში, loading/error, ხელით/ფონური refetch |
| react-native-maps | hybrid რუკა |
| i18next + react-i18next | ქართული / ინგლისური |
| expo-localization | მოწყობილობის ენის აღმოჩენა |
| AsyncStorage | არჩეული ენის შენახვა |

## პროექტის სტრუქტურა

```
app/
  _layout.tsx              QueryClientProvider + Stack + i18n init
  index.tsx                Redirect → /(tabs)/events
  (tabs)/
    _layout.tsx            Tab bar: events, map, settings
    events.tsx             მიწისძვრების სია
    map.tsx                სეისმური რუკა
    settings.tsx           პარამეტრები (ენა)
  event/
    [id].tsx               მიწისძვრის დეტალები

src/
  api/
    client.ts              apiGet(), ApiError
    events.ts              fetchEarthquakes(), ნორმალიზება (/publish_events/)
  config/
    env.ts                 API URL
  hooks/
    useEarthquakes.ts      useEarthquakes(), useTabEarthquakes()
    useEarthquake.ts       ერთი მოვლენა cache-იდან
    useEventRegion.ts      ენის მიხედვით მდებარეობის ტექსტი
  i18n/
    index.ts               i18next init, setAppLanguage()
    locales/ka.json, en.json
    languagesList.json     nativeName ენებისთვის
  components/
    events/                EventListItem, EventDetailMap, EventDetailContent
    map/                   EarthquakeMap, MapLegend, EventMapCallout
    settings/              LanguagePickerModal
  types/earthquake.ts
  utils/
    format.ts              UTC თარიღი/დრო, კოორდინატები
    magnitude.ts           magnitudeColor, eventAge
    markerIcon.ts          GNSMC მარკერის აიკონები
    eventRegion.ts         regionGe / regionEn არჩევა
    getErrorMessage.ts     UI შეცდომის ტექსტი

assets/icons/              GNSMC აიკონები (მარკერები, ტაბები, settings)
```

## მარშრუტიზაცია

```
აპის გახსნა
  → app/index.tsx
  → Redirect: /(tabs)/events

ტაბები (Tab Navigator)
  ├── /(tabs)/events     მიწისძვრების სია
  ├── /(tabs)/map        სეისმური რუკა
  └── /(tabs)/settings   პარამეტრები

Stack (root)
  └── /event/[id]        დეტალები (სიიდან ან რუკიდან)
```

## მონაცემთა ნაკადი

```
IES API  (https://iesdata.iliauni.edu.ge:3030/api/publish_events/)
  ↓
apiGet('/publish_events/')   (პირდაპირ, ვალიდური SSL)
  ↓
fetchEarthquakes()  →  items[].event  →  EarthquakeEvent[]  (regionGe + regionEn, ML მაგნიტუდა)
  ↓
TanStack Query cache  (queryKey: ['earthquakes'])
  ↓
useTabEarthquakes()   →  ტაბებზე: პირველი ჩატვირთვა + ფონური refetch focus-ზე
useEarthquakes()      →  დეტალების ეკრანზე: მხოლოდ cache
  ↓
useEventRegion(event) →  ka: location_ge, en: location_en
  ↓
UI ეკრანები / კომპონენტები
```

## API URL

dev-ში და production-ში ერთი და იგივე: `EXPO_PUBLIC_API_BASE_URL`, default `https://iesdata.iliauni.edu.ge:3030/api` (`src/config/env.ts`).

## i18n

| კომპონენტი | როლი |
| --- | --- |
| `src/i18n/locales/ka.json` | ქართული UI ტექსტები |
| `src/i18n/locales/en.json` | ინგლისური UI ტექსტები |
| `setAppLanguage()` | ენის შეცვლა + AsyncStorage |
| `useEventRegion()` | API-ს `location_ge` / `location_en` ენის მიხედვით |

## კომპონენტების დამოკიდებულებები

```
events.tsx ──→ EventListItem ──→ useEventRegion
            └──→ useTabEarthquakes

map.tsx ──→ EarthquakeMap ──→ EventMapCallout ──→ useEventRegion
         └──→ MapLegend (variant: map)
         └──→ useTabEarthquakes

event/[id].tsx ──→ EventDetailMap ──→ markerIcon, eventAge
               └──→ EventDetailContent ──→ useEventRegion
               └──→ MapLegend (variant: detail)
               └──→ useEarthquake

settings.tsx ──→ LanguagePickerModal ──→ setAppLanguage
```

## მდგომარეობების პატერნი

ყველა მონაცემზე დამოკიდებული ეკრანზე:

| მდგომარეობა | პირობა | UI |
| --- | --- | --- |
| loading | `isLoading && !data` | `ActivityIndicator` |
| error | `isError` | შეტყობინება + retry |
| empty | `data.length === 0` | „მონაცემები არ მოიძებნა" |
| success | data არსებობს | მთავარი კონტენტი |

## მომავალი გაფართოება

- თემის არჩევა (dark/light) პარამეტრებში
- Push ნოტიფიკაციები
- ოფლაინ რეჟიმი (ქეშის შენახვა მოწყობილობაზე)
