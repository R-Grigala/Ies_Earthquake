# Ies_Earthquake

მობილური აპლიკაცია სეისმური მოვლენების მონიტორინგისთვის — IES (ილიას სახელმწიფო უნივერსიტეტი).

## მიმდინარე ფუნქციონალი

- **მიწისძვრების სია** — IES API-დან, pull-to-refresh, GNSMC-ის სტილის UI
- **სეისმური რუკა** — hybrid რუკა, GNSMC აიკონები, callout, ლეგენდა
- **დეტალები** — მინი-რუკა + ველები (დრო, მაგნიტუდა, სიღრმე, კოორდინატები, მდებარეობა)
- **პარამეტრები** — ენის არჩევა (ქართული / English)
- **i18n** — UI და API მდებარეობა ორ ენაზე

მომავალში: თემის გადართვა, push ნოტიფიკაციები.

## დოკუმენტაცია

სრული დოკუმენტაცია: **[docs/README.md](./docs/README.md)**

| | |
| --- | --- |
| გაშვება | [docs/getting-started.md](./docs/getting-started.md) |
| არქიტექტურა | [docs/architecture.md](./docs/architecture.md) |
| API | [docs/api.md](./docs/api.md) |
| Events | [docs/pages/events.md](./docs/pages/events.md) |
| Map | [docs/pages/map.md](./docs/pages/map.md) |
| Detail | [docs/pages/event-detail.md](./docs/pages/event-detail.md) |
| Settings | [docs/pages/settings.md](./docs/pages/settings.md) |

## სწრაფი გაშვება

```bash
npm install
cp .env.example .env
npx expo start -c
```

ტელეფონი და კომპიუტერი იგივე Wi‑Fi-ზე უნდა იყოს (dev proxy).

## სტეკი

Expo 54 · expo-router · TypeScript · TanStack Query · react-native-maps · i18next

## სტრუქტურა

```
app/          ეკრანები (expo-router)
src/          API, hooks, components, utils, i18n
docs/         დოკუმენტაცია
```

## მონაცემთა წყარო

```
https://iesdata.iliauni.edu.ge:2026/api/events
```
