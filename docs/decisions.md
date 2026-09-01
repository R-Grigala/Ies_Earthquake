# ტექნიკური გადაწყვეტილებები

## რატომ Expo + expo-router

- ფაილზე დაფუძნებული მარშრუტები, TypeScript, Expo SDK 54
- მომავალში `event/[id]` deep link მარტივად

## რატომ TanStack Query

- ქეში და auto-refetch ეკრანებში `useState`/`useEffect`-ის ნაცვლად
- GNSMC-ში fetch ეკრანში იყო — აქ გამოყოფილია `src/hooks/`-ში

## GNSMC-დან მიღებული

ორიენტირი: [R-Grigala/GNSMC](https://github.com/R-Grigala/GNSMC)

| შენარჩუნებული | შეცვლილი |
| --- | --- |
| ცხრილის სტილის სიის ერთეული | API URL `.env`-ში, არა ngrok კოდში |
| მაგნიტუდის ფერების სქემა | TanStack Query ქეში |
| სათაური „უახლესი მიწისძვრები" | `location_ge` ველი რეგიონისთვის |
| სრული სიგანის სია | Dev Metro proxy (SSL) |
| | დრო ორ ხაზად (წაკითხვადობა) |
| | განედი/გრძედი ამოღებულია სიიდან |

## SSL / Dev Proxy

**პრობლემა:** `iesdata.iliauni.edu.ge:2026` self-signed სერტიფიკატს იყენებს — React Native `fetch` ვერ უკავშირდება.

**გადაწყვეტა (dev):** Metro middleware პროქსირებს `http://<dev-host>/ies-api/*` → `https://iesdata.iliauni.edu.ge:2026/api/*` (`secure: false`).

**Production:** საჭიროა ვალიდური SSL სერვერზე ან შუამავალი API.

## აპის სტრუქტურა

```
app/     → მხოლოდ ეკრანები
src/     → API, hooks, components, utils
```

მომავალი ტაბები: `events.tsx` ✅, `map.tsx`, `settings.tsx`.
