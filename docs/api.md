# IES API

## ბაზისური მისამართი

```
https://iesdata.iliauni.edu.ge:2026/api
```

## ენდპოინტი

| მეთოდი | გზა | აღწერა |
| --- | --- | --- |
| GET | `/events` | სეისმური მოვლენების სია |

ტოკენი საჭირო არ არის (API ტესტზე ტოკენის გარეშე 200 აბრუნებს).

## პასუხის ფორმა

მასივი ობიექტებისა:

```json
{
  "id": 1,
  "event_id": 539870,
  "origin_time": "2024-06-03T22:03:40",
  "latitude": 42.5095,
  "longitude": 43.5328,
  "depth": 8.0,
  "location_ge": "ქალაქი ონი - ...",
  "location_en": "City Oni - ...",
  "ml": 5.33,
  "is_published": true
}
```

კოდი მხარს უჭერს ასევე DRF-ის `{ results: [...] }` ფორმატს.

## ველების გარდაქმნა

| API ველი | აპში (`EarthquakeEvent`) |
| --- | --- |
| `id` | `id: string` |
| `origin_time` | `originTime: Date` (UTC, `Z` suffix ემატება თუ timezone არ არის) |
| `ml` | `magnitude: number \| null` |
| `latitude`, `longitude` | `number` |
| `depth` | `depth: number \| null` |
| `location_ge` / `location_en` / `description` | `region: string` (პრიორიტეტი: `location_ge` → `location_en` → `description`) |

არავალიდური ჩანაწერები (კოორდინატების გარეშე) ფილტრდება.

## სორტირება

ახლიდან ძველისკენ (`originTime` კლებადობით).

## TanStack Query

| პარამეტრი | მნიშვნელობა |
| --- | --- |
| `staleTime` | 30 წამი |
| `refetchInterval` | 60 წამი |
| `retry` | 2 |

## შეცდომები

`ApiError` — HTTP შეცდომა, timeout (15 წმ), ან ქსელის შეცდომა. UI-ზე ჩანს დეტალური ტექსტი + „სცადეთ ხელახლა".
