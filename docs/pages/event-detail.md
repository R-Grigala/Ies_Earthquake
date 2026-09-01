# მიწისძვრის დეტალები

**მარშრუტი:** `app/event/[id].tsx`  
**სტატუსი:** ✅ მზადაა  
**კომპონენტები:** `EventDetailMap.tsx`, `EventDetailContent.tsx`

## დანიშნულება

ერთი სეისმური მოვლენის სრული ეკრანი — GNSMC-ის `EventDetailScreen` მსგავსად: **ზედა მინი-რუკა** + **ქვედა დეტალების ბლოკი**.

## ნავიგაცია

| წყარო | მოქმედება |
| --- | --- |
| სია (`EventListItem`) | ელემენტზე დაჭერა → `/event/{id}` |
| რუკა (`EarthquakeMap`) | callout-ზე დაჭერა → `/event/{id}` |
| უკან | `chevron-back-outline.png` → `router.back()` |

## მონაცემები

| წყარო | აღწერა |
| --- | --- |
| `useEarthquake(id)` | `useEarthquakes()` cache-იდან `id`-ით ძებნა |
| API | ცალკე endpoint არ სჭირდება |

## ლეიაუტი (GNSMC სტილი)

```
┌─────────────────────────────┐
│  ←  მიწისძვრა               │  header
├─────────────────────────────┤
│                             │
│      მინი-რუკა (flex: 3)    │  hybrid MapView, ერთი მარკერი
│                             │
├─────────────────────────────┤
│ დრო (UTC):    28-08-2026    │
│               05:45:32      │  დეტალები (flex: 2)
│ მაგნიტუდა:       5.3        │
│ სიღრმე (კმ):      12        │
│ გან. / გრძ.:  42.1 / 43.2  │
│ მდებარეობა:      ...           │
└─────────────────────────────┘
```

## მინი-რუკა (`EventDetailMap`)

| პარამეტრი | მნიშვნელობა |
| --- | --- |
| `mapType` | `hybrid` |
| ცენტრი | არჩეული მოვლენის კოორდინატები |
| zoom | `latitudeDelta` / `longitudeDelta` = 0.45 (ახლო ზუმი არჩეულ მოვლენაზე) |
| მარკერები | ყველა მოვლენა; არჩეული — ყოველთვის `Earthquake_gif.gif`, სხვები — ასაკის მიხედვით |
| ლეგენდა | `MapLegend variant="detail"` — gif: **არჩეული** + **ბოლო 7 დღე** |

## დეტალები (`EventDetailContent`)

| ველი | ფორმატი |
| --- | --- |
| დრო (UTC) | `formatUtcDate` + `formatUtcTime` |
| მაგნიტუდა | ფერადი (`magnitudeColor`) |
| სიღრმე (კმ) | `formatDepth` |
| გან. / გრძ. | `formatCoordinates` |
| მდებარეობა | `event.region` |

## მდგომარეობები

| მდგომარეობა | UI |
| --- | --- |
| loading | `ActivityIndicator` |
| error | შეტყობინება + retry |
| not found | „მოვლენა ვერ მოიძებნა" + უკან |

## ფაილები

| ფაილი | როლი |
| --- | --- |
| `app/event/[id].tsx` | ეკრანი, header, მდგომარეობები |
| `src/hooks/useEarthquake.ts` | cache-იდან ერთი მოვლენის ძებნა |
| `src/components/events/EventDetailMap.tsx` | მინი-რუკა |
| `src/components/events/EventDetailContent.tsx` | დეტალების ველები |
