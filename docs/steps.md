# ნაბიჯების ჟურნალი

აღწერს პროექტის განვითარების თანმიმდევრობას. ყოველი ნაბიჯი შეიცავს მიზანს,
შესრულებულ სამუშაოს და შედეგის შემოწმების გზას.

## ნაბიჯი 1 — გადაწყვეტილებები და საწყისი კონფიგურაცია ✅

**მიზანი:** განისაზღვროს ტექნიკური სტეკი და მონაცემთა წყარო.

- სტეკი: Expo + expo-router + TypeScript + TanStack Query + react-native-maps.
- მონაცემთა წყარო: IES-ის API, `EXPO_PUBLIC_API_BASE_URL` = `https://iesdata.iliauni.edu.ge:2026/api`.
- საწყისი ფუნქციონალის მოცულობა: სია, რუკა, დეტალები, პარამეტრები.
- ორიენტირად გამოყენებულია წინა პროექტი [R-Grigala/GNSMC](https://github.com/R-Grigala/GNSMC);
  ანალიზი და გამოსწორებული ხარვეზები — [decisions.md](./decisions.md).

## ნაბიჯი 2 — მონაცემთა და დომენის შრე ✅

**მიზანი:** UI-სგან დამოუკიდებელი შრე, რომელიც API-სთან მუშაობს.

შექმნილი ფაილები:

- `src/config/env.ts` — გარემოს ცვლადების წაკითხვა და ვალიდაცია.
- `src/api/client.ts` — `fetch`-ის გარსი: timeout, `Authorization` ჰედერი, `ApiError`.
- `src/api/events.ts` — `/events`-ის გამოძახება და პასუხის ნორმალიზება.
- `src/hooks/useEarthquakes.ts` — TanStack Query hooks, წუთიანი auto-refetch.
- `src/utils/format.ts`, `src/utils/magnitude.ts` — ფორმატირება და ფერები.
- `src/theme/`, `src/i18n/` — თემა და ლოკალიზაცია.
- `.env.example` — გარემოს ცვლადების ნიმუში.

**შემოწმება:** `.env`-ის შევსების შემდეგ `useEarthquakes()` აბრუნებს დროით
დალაგებულ მასივს; ქსელის შეცდომა ხვდება `ApiError`-ში.

## ნაბიჯი 3 — Expo პროექტის scaffold ⏳

**მიზანი:** `package.json`, `app.json`, `tsconfig.json` და expo-router-ის ჩარჩო.

```bash
npx create-expo-app@latest . --template tabs --no-install
npx expo install @tanstack/react-query react-native-maps @react-native-async-storage/async-storage i18next react-i18next expo-localization
npm install
```

ვერსიები განზრახ არ არის ხელით ჩაწერილი — `expo install` ირჩევს მიმდინარე SDK-სთან
თავსებად ვერსიებს.

**შემოწმება:** `npx expo start` იხსნება შეცდომების გარეშე.

## ნაბიჯი 4 — გვერდები 🔜

- `app/_layout.tsx` — `QueryClientProvider`, `ThemeProvider`, i18n-ის ინიციალიზაცია.
- `app/(tabs)/index.tsx` — [სია](./pages/list.md).
- `app/(tabs)/map.tsx` — [რუკა](./pages/map.md).
- `app/(tabs)/settings.tsx` — [პარამეტრები](./pages/settings.md).
- `app/event/[id].tsx` — [დეტალები](./pages/event-detail.md).

## ნაბიჯი 5 — ნოტიფიკაციები 🔜

იხილეთ [notifications.md](./notifications.md).

## აღნიშვნები

- ✅ დასრულებული
- ⏳ მიმდინარე / ელოდება გაშვებას
- 🔜 დაგეგმილი
