# სეისმური რუკა

**მარშრუტი:** `app/(tabs)/map.tsx`  
**სტატუსი:** ✅ მზადაა  
**კომპონენტები:** `src/components/map/EarthquakeMap.tsx`, `MapLegend.tsx`

## დანიშნულება

ინტერაქციული რუკა სეისმური მოვლენების ვიზუალიზაციისთვის. GNSMC-ის `EqMap`-ის მსგავსად — hybrid რუკა, **ლოკალური აიკონები** `assets/icons/`-დან (GNSMC პროექტიდან გადმოტანილი), callout დეტალებით.

## მონაცემები

| წყარო | აღწერა |
| --- | --- |
| `useEarthquakes()` | იგივე TanStack Query cache, რაც events სიაში |

## რუკა (`EarthquakeMap`)

| პარამეტრი | მნიშვნელობა |
| --- | --- |
| ცენტრი | 42.0186, 43.9911 (საქართველო) |
| zoom | `latitudeDelta` / `longitudeDelta` = 10 |
| `mapType` | `hybrid` |

### მარკერები (GNSMC აიკონები)

მარკერის ფერი/სურათი დამოკიდებულია **მოვლენის ასაკზე**, არა მაგნიტუდაზე (`eventAge` → `markerIconSource`).

| ასაკი | პირობა | ფაილი (`assets/icons/`) |
| --- | --- | --- |
| ბოლო 7 დღე | `elapsed ≤ 7 დღე` | `Earthquake_gif.gif` |
| 7–91 დღე | `7 < elapsed ≤ 90 დღე` | `Earthquake_red.png` |
| 91+ დღე | `elapsed > 90 დღე` | `Earthquake_yellow.png` |

- **ზომა:** `markerIconSize()` — ეკრანის სიგანის 7% (GNSMC-ის `width * 0.07`)
- **არჩევა:** `src/utils/markerIcon.ts` — `markerIconSource(age)`, `MARKER_ICONS`
- **Android GIF:** `tracksViewChanges={true}` მხოლოდ ბოლო 7 დღის მოვლენებზე (ანიმაციისთვის)

```ts
// src/utils/markerIcon.ts
MARKER_ICONS.recent  → Earthquake_gif.gif
MARKER_ICONS.month   → Earthquake_red.png
MARKER_ICONS.older   → Earthquake_yellow.png
```

### Callout

მარკერზე დაჭერისას:

| ველი | ფორმატი |
| --- | --- |
| დრო (UTC) | `formatUtcDateTime` |
| გან. / გრძ. | `formatCoordinates` |
| მაგნიტუდა | `formatMagnitude` |
| სიღრმე (კმ) | `formatDepth` |
| რეგიონი | `event.region` (თუ არსებობს) |

## ლეგენდა (`MapLegend`)

ქვედა ოვერლეი — სამი ასაკის აიკონი იგივე `assets/icons/` ფაილებით:

| ლეიბლი | აიკონი |
| --- | --- |
| ბოლო 7 დღე | `Earthquake_gif.gif` |
| 7–91 დღე | `Earthquake_red.png` |
| 91+ დღე | `Earthquake_yellow.png` |

ფონი და ტექსტი თემის მიხედვით (light/dark).

## ეკრანის მდგომარეობები

| მდგომარეობა | UI |
| --- | --- |
| loading | `ActivityIndicator` |
| error | შეტყობინება + retry |
| empty | „მონაცემები არ მოიძებნა" + retry |

## ტაბ ბარი

`app/(tabs)/_layout.tsx` — events + map ტაბები, GNSMC PNG აიკონები:

| ტაბი | აიკონი (`assets/icons/`) |
| --- | --- |
| მიწისძვრები | `list-outline.png` |
| რუკა | `earth-outline.png` |

აქტიური ფერი: `#7a0002`.

## ასეტები (`assets/icons/`)

რუკისთვის გამოყენებული ფაილები (GNSMC-დან):

```
assets/icons/
  Earthquake_gif.gif      ← ბოლო 7 დღე (ანიმირებული)
  Earthquake_red.png      ← 7–91 დღე
  Earthquake_yellow.png   ← 91+ დღე
  list-outline.png        ← events ტაბი
  earth-outline.png       ← map ტაბი
```

## ფაილები

| ფაილი | როლი |
| --- | --- |
| `app/(tabs)/map.tsx` | ეკრანი, მდგომარეობები, ლეგენდის ოვერლეი |
| `src/components/map/EarthquakeMap.tsx` | MapView + Image მარკერები |
| `src/components/map/MapLegend.tsx` | ასაკის ლეგენდა |
| `src/utils/markerIcon.ts` | `markerIconSource`, `markerIconSize`, `MARKER_ICONS` |
| `src/utils/magnitude.ts` | `eventAge` |

## განახლების ისტორია

| თარიღი | ცვლილება |
| --- | --- |
| 2026-09 | რუკის ეკრანი, hybrid MapView, callout |
| 2026-09 | ფერადი წრიული მარკერები → GNSMC ლოკალური აიკონები (`assets/icons/`) |

## შენიშვნები

- **Expo Go:** რუკა ჩვეულებრივ მუშაობს.
- **Android production/dev build:** შეიძლება დაგჭირდეთ Google Maps API key `app.json`-ში (`android.config.googleMaps.apiKey`).
- Callout-ზე დაჭერა ჯერ დეტალების ეკრანზე არ გადადის.
- ახალი აიკონების ნახვისთვის: `npx expo start -c` (cache გასუფთავება).
