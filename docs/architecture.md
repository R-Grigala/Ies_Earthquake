# არქიტექტურა

## პრინციპი

მონაცემთა შრე სრულად გამოყოფილია UI-სგან. ეკრანები არ იძახებენ `fetch`-ს — მათ
მხოლოდ hooks-თან აქვთ შეხება, hooks კი `src/api`-ს ეყრდნობა. ეს GNSMC-სგან
მთავარი განსხვავებაა, სადაც fetch-ის ლოგიკა ეკრანების შიგნით იყო.

## დირექტორიები

```
app/                 expo-router — მარშრუტები და ეკრანები
  _layout.tsx        root: QueryClientProvider + ThemeProvider + i18n
  (tabs)/            ქვედა ტაბები
  event/[id].tsx     მოვლენის დეტალები
src/
  api/               client.ts (fetch გარსი), events.ts (ენდპოინტი + ნორმალიზება)
  config/env.ts      გარემოს ცვლადები
  hooks/             TanStack Query hooks
  i18n/              i18next + locales/{ka,en}.json
  theme/             ფერების პალიტრა და ThemeProvider
  types/             დომენის ტიპები
  utils/             ფორმატირება, მაგნიტუდის ფერები/ზომები
docs/                ეს დოკუმენტაცია
```

## მონაცემთა ნაკადი

```
IES API  →  apiGet()  →  fetchEarthquakes()  →  useEarthquakes()  →  ეკრანი
             timeout      ნორმალიზება +          cache + refetch      render
             + ჰედერი     ფილტრი + sort
```

1. `apiGet()` ამატებს `Authorization` ჰედერს, 15 წმ timeout-ს და შეცდომებს
   `ApiError`-ად ერთგვაროვნად აქცევს.
2. `fetchEarthquakes()` DTO-ს გარდაქმნის დომენის ობიექტად: string-ები რიცხვებად,
   `origin_time` → `Date`, არავალიდური ჩანაწერები ფილტრდება, სორტირება ახლიდან ძველისკენ.
3. `useEarthquakes()` პასუხს ქეშავს (`staleTime` 30 წმ) და წუთში ერთხელ ანახლებს.
4. ეკრანი იღებს `data`, `isLoading`, `isError`, `refetch`.

## ტიპები

`EarthquakeEventDto` — API-ს ნედლი ფორმა (დაშვებულია string რიცხვები და `null`-ები).
`EarthquakeEvent` — აპში გამოყენებული ფორმა: `id: string`, `originTime: Date`,
`magnitude`, `latitude`, `longitude`, `depth`, `region`.

გვერდები მხოლოდ `EarthquakeEvent`-ს იცნობენ; API-ს ფორმის ცვლილება მხოლოდ
`src/api/events.ts`-ს ეხება.

## გლობალური მდგომარეობა

| მდგომარეობა | სად ინახება |
| --- | --- |
| სერვერის მონაცემები | TanStack Query cache |
| თემა | `ThemeProvider` + AsyncStorage |
| ენა | i18next + AsyncStorage |
| ნავიგაცია | expo-router |

ცალკე state-მენეჯერი (Redux/Zustand) არ გამოიყენება — საჭიროება არ არის.
