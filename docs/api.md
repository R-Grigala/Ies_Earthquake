# IES API

## ბაზისური მისამართი

```
https://iesdata.iliauni.edu.ge:2026/api
```

მისამართი კოდში არ არის ჩაწერილი — იკითხება `EXPO_PUBLIC_API_BASE_URL`-იდან
(`src/config/env.ts`).

## ავთენტიფიკაცია

Django REST Framework-ის ტოკენი ჰედერში:

```
Authorization: Token <EXPO_PUBLIC_API_TOKEN>
```

თუ ტოკენი ცარიელია, ჰედერი არ იგზავნება — ასე შეიძლება შემოწმდეს, საჭიროებს თუ
არა ენდპოინტი ავთენტიფიკაციას.

## ენდპოინტები

| მეთოდი | გზა | აღწერა |
| --- | --- | --- |
| GET | `/events` | სეისმური მოვლენების სია |

## პასუხის დამუშავება

კოდი ორივე ფორმას იღებს — სუფთა მასივსაც და DRF-ის გვერდებად დაყოფილ პასუხსაც:

```json
[ { "id": 1, "origin_time": "2026-08-31T09:14:22Z", "ml": 3.4,
    "latitude": 42.31, "longitude": 43.77, "depth": 12.5,
    "description": "Oni district" } ]
```

```json
{ "count": 120, "next": "...", "results": [ { "...": "..." } ] }
```

## ველები

| ველი | ტიპი API-ში | გარდაქმნა |
| --- | --- | --- |
| `id` | number \| string | `String(id)` |
| `origin_time` | ISO string, UTC | `Date` |
| `ml` | number \| string \| null | `number \| null` (ლოკალური მაგნიტუდა) |
| `latitude` | number \| string | `number` (სავალდებულო) |
| `longitude` | number \| string | `number` (სავალდებულო) |
| `depth` | number \| string \| null | `number \| null`, კილომეტრები |
| `description` | string \| null | `region: string` |

ჩანაწერი, რომელსაც კოორდინატები აკლია ან `origin_time` არავალიდურია, ფილტრდება
და UI-მდე არ ადის.

## დრო

`origin_time` UTC-შია. `formatUtcDateTime()` სწორედ UTC-ს აჩვენებს, ხოლო
`formatLocalDateTime()` — მოწყობილობის დროს. GNSMC-ში წარწერა „UTC" ეწერა, ხოლო
რეალურად ლოკალური დრო ჩანდა; აქ ეს გამოსწორებულია.

## შეცდომები

`apiGet()` ყველა შეცდომას `ApiError`-ად აქცევს:

| შემთხვევა | `status` | `message` |
| --- | --- | --- |
| HTTP 4xx/5xx | HTTP კოდი | `Request to /events failed` |
| 15 წმ timeout | `undefined` | `Request to /events timed out` |
| ქსელის შეცდომა | `undefined` | პლატფორმის ტექსტი |

## განახლების პოლიტიკა

| პარამეტრი | მნიშვნელობა |
| --- | --- |
| `staleTime` | 30 წმ |
| `refetchInterval` | 60 წმ |
| pull-to-refresh | `refetch()` სიის ეკრანზე |
