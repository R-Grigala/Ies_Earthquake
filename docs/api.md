# IES API

## ბაზისური მისამართი

```
https://iesdata.iliauni.edu.ge:3030/api
```

სერვერს ვალიდური SSL სერტიფიკატი აქვს (Let's Encrypt), ამიტომ აპი პირდაპირ უკავშირდება — dev-შიც და production-შიც, პროქსის გარეშე.

## ენდპოინტი

| მეთოდი | გზა | აღწერა |
| --- | --- | --- |
| GET | `/publish_events/` | გამოქვეყნებული სეისმური მოვლენები |

ტოკენი საჭირო არ არის. CORS: `Access-Control-Allow-Origin: *`.

## პასუხის ფორმა

```json
{
  "items": [
    {
      "id": 6,
      "event_id": 6,
      "published_at": "2026-10-23T11:12:55",
      "event": {
        "id": 6,
        "iesdata_id": 591034,
        "origin_time": "2026-10-17T16:43:32",
        "latitude": 42.0218,
        "longitude": 43.6916,
        "depth": 16.46,
        "location_ge": "ქალაქი ხაშური - აღმოსავლეთი - 5კმ. სოფელი აგარები.",
        "location_en": "City Khashuri - East - 5km. Village agarebi.",
        "area": null,
        "is_automatic": false,
        "magnitudes": [
          { "value": 3.28, "magnitude": { "code": "ML", "description": "Local Magnitude …" } }
        ],
        "beachball": null,
        "is_published": true
      }
    }
  ],
  "total": 10,
  "limit": 100
}
```

მოვლენას შეიძლება რამდენიმე მაგნიტუდა ჰქონდეს (`ML`, `MW`, `K`, `MPV`). `beachball` (თუ არის) შეიცავს `strike`, `dip`, `rake` და `beachball_path` სურათის გზას.

## ველების გარდაქმნა

| API ველი | აპში (`EarthquakeEvent`) |
| --- | --- |
| `event.id` | `id: string` |
| `event.origin_time` | `originTime: Date` (UTC, `Z` suffix ემატება თუ timezone არ არის) |
| `event.magnitudes` | `magnitude: number \| null` — `ML`, თუ არ არის — პირველი მნიშვნელობა |
| `event.latitude`, `event.longitude` | `number` |
| `event.depth` | `depth: number \| null` |
| `event.location_ge` | `regionGe: string` |
| `event.location_en` | `regionEn: string` |

UI-ზე მდებარეობის ტექსტი: `useEventRegion(event)` → `ka`: `regionGe`, `en`: `regionEn`.

არავალიდური ჩანაწერები (კოორდინატების ან დროის გარეშე) ფილტრდება.

## სორტირება

ახლიდან ძველისკენ (`originTime` კლებადობით).

## ლიმიტი

სერვერი აბრუნებს მაქსიმუმ `limit` (ამჟამად 100) ჩანაწერს. პაგინაცია ჯერ არ გამოიყენება.

## TanStack Query

| პარამეტრი | მნიშვნელობა |
| --- | --- |
| `staleTime` | `Infinity` — ავტომატური განახლება არ ხდება |
| `refetchOnMount/WindowFocus/Reconnect` | გამორთული |
| refetch | ტაბის focus-ზე ფონუში (`useTabEarthquakes`) ან ხელით (pull-to-refresh, retry) |
| `retry` | 2 |

## შეცდომები

`ApiError` — HTTP შეცდომა ან ქსელის შეცდომა. UI-ზე ჩანს დეტალური ტექსტი + „სცადეთ ხელახლა".
