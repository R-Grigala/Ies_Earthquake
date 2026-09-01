# Ies_Earthquake

მობილური აპლიკაცია სეისმური მოვლენების მონიტორინგისთვის — IES (ილიას სახელმწიფო უნივერსიტეტი).

## მიმდინარე ფუნქციონალი

- **მიწისძვრების სია** — IES API-დან, pull-to-refresh, GNSMC-ის სტილის UI

მომავალში: რუკა, დეტალები, პარამეტრები, ნოტიფიკაციები.

## დოკუმენტაცია

სრული დოკუმენტაცია: **[docs/README.md](./docs/README.md)**

| | |
| --- | --- |
| გაშვება | [docs/getting-started.md](./docs/getting-started.md) |
| არქიტექტურა | [docs/architecture.md](./docs/architecture.md) |
| API | [docs/api.md](./docs/api.md) |
| Events ეკრანი | [docs/pages/events.md](./docs/pages/events.md) |

## სწრაფი გაშვება

```bash
npm install
cp .env.example .env
npx expo start -c
```

ტელეფონი და კომპიუტერი იგივე Wi‑Fi-ზე უნდა იყოს (dev proxy).

## სტეკი

Expo 54 · expo-router · TypeScript · TanStack Query

## სტრუქტურა

```
app/          ეკრანები (expo-router)
src/          API, hooks, components, utils
docs/         დოკუმენტაცია
```

## მონაცემთა წყარო

```
https://iesdata.iliauni.edu.ge:2026/api/events
```
