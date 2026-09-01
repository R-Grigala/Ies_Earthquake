# სეისმური რუკა

**მარშრუტი:** `app/(tabs)/map.tsx`  
**სტატუსი:** ✅ მზადაა  
**კომპონენტები:** `src/components/map/EarthquakeMap.tsx`, `MapLegend.tsx`, `EventMapCallout.tsx`

## დანიშნულება

ინტერაქციული რუკა სეისმური მოვლენების ვიზუალიზაციისთვის. GNSMC-ის `EqMap`-ის მსგავსად — hybrid რუკა, **ლოკალური აიკონები** `assets/icons/`-დან, callout დეტალებით.

## მონაცემები

| წყარო | აღწერა |
| --- | --- |
| `useTabEarthquakes()` | იგივე TanStack Query cache + ფონური refetch ტაბის focus-ზე |

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

### Callout (`EventMapCallout`)

| ელემენტი | აღწერა |
| --- | --- |
| მაგნიტუდა | დიდი, ფერადი (`magnitudeColor`) |
| დრო (UTC) | თარიღი + საათი ცალკე ხაზებზე |
| მდებარეობა | `useEventRegion()` — სრული ტექსტი, ცენტრში |
| „დეტალურად" | წითელი ღილაკი → `/event/{id}` |

Callout-ზე დაჭერა (`onCalloutPress`) გადადის დეტალების ეკრანზე. ორმაგი ნავიგაციის თავიდან ასაცილებლად `Callout onPress` არ გამოიყენება.

## ლეგენდა (`MapLegend`)

ზედა ოვერლეი — სამი ასაკის აიკონი იგივე `assets/icons/` ფაილებით:

| ლეიბლი (ka) | ლეიბლი (en) | აიკონი |
| --- | --- | --- |
| ბოლო 7 დღე | Last 7 days | `Earthquake_gif.gif` |
| 7–91 დღე | 7–91 days | `Earthquake_red.png` |
| 91+ დღე | 91+ days | `Earthquake_yellow.png` |

ფონი და ტექსტი თემის მიხედვით (light/dark).

## ეკრანის მდგომარეობები

| მდგომარეობა | UI |
| --- | --- |
| loading | `ActivityIndicator` |
| error | შეტყობინება + retry |
| empty | „მონაცემები არ მოიძებნა" + retry |

## ტაბ ბარი

`app/(tabs)/_layout.tsx` — events + map + settings ტაბები, GNSMC PNG აიკონები:

| ტაბი | აიკონი (`assets/icons/`) |
| --- | --- |
| მიწისძვრები | `list-outline.png` |
| რუკა | `earth-outline.png` |
| პარამეტრები | `settings-outline.png` |

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
  settings-outline.png    ← settings ტაბი
```

## ფაილები

| ფაილი | როლი |
| --- | --- |
| `app/(tabs)/map.tsx` | ეკრანი, მდგომარეობები, ლეგენდის ოვერლეი |
| `src/components/map/EarthquakeMap.tsx` | MapView + Image მარკერები |
| `src/components/map/MapLegend.tsx` | ასაკის ლეგენდა |
| `src/components/map/EventMapCallout.tsx` | callout UI |
| `src/utils/markerIcon.ts` | `markerIconSource`, `markerIconSize`, `MARKER_ICONS` |
| `src/utils/magnitude.ts` | `eventAge` |

## შენიშვნები

- **Expo Go:** რუკა ჩვეულებრივ მუშაობს.
- **Android production/dev build:** შეიძლება დაგჭირდეთ Google Maps API key `app.json`-ში (`android.config.googleMaps.apiKey`).
- ახალი აიკონების ნახვისთვის: `npx expo start -c` (cache გასუფთავება).
