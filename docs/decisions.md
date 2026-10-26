# ტექნიკური გადაწყვეტილებები

## რატომ Expo + expo-router

- ფაილზე დაფუძნებული მარშრუტები, TypeScript, Expo SDK 58
- `event/[id]` deep link მარტივად

## რატომ TanStack Query

- ქეში და refetch ეკრანებში `useState`/`useEffect`-ის ნაცვლად
- GNSMC-ში fetch ეკრანში იყო — აქ გამოყოფილია `src/hooks/`-ში
- `staleTime: Infinity` — მონაცემები მხოლოდ ხელით ან ტაბის focus-ზე ფონურად განახლდება

## GNSMC-დან მიღებული

ორიენტირი: [R-Grigala/GNSMC](https://github.com/R-Grigala/GNSMC)

| შენარჩუნებული | შეცვლილი |
| --- | --- |
| ცხრილის სტილის სიის ერთეული | API URL `.env`-ში, არა ngrok კოდში |
| მაგნიტუდის ფერების სქემა | TanStack Query ქეში |
| სათაური „უახლესი მიწისძვრები" | `location_ge` / `location_en` ველები |
| GNSMC აიკონები (`assets/icons/`) | `/publish_events/` — მხოლოდ გამოქვეყნებული მოვლენები |
| Settings ეკრანის სტილი | i18next თარგმანები |
| | დრო ორ ხაზად (წაკითხვადობა) |
| | განედი/გრძედი ამოღებულია სიიდან |

## მონაცემთა წყარო და SSL

**ადრე:** `iesdata.iliauni.edu.ge:2026/api/events` — self-signed სერტიფიკატი, ამიტომ dev-ში Metro proxy გამოიყენებოდა, production კი არ მუშაობდა.

**ახლა:** `iesdata.iliauni.edu.ge:3030/api/publish_events/` — Let's Encrypt სერტიფიკატი. აპი პირდაპირ უკავშირდება, proxy წაშლილია.

**მაგნიტუდა:** მოვლენას შეიძლება რამდენიმე ჰქონდეს (`ML`, `MW`, `K`, `MPV`). აპი აჩვენებს `ML`-ს (როგორც ძველი API-ს `ml`), თუ არ არის — პირველს.

## i18n

**არჩევანი:** `i18next` + `react-i18next` (GNSMC-ში იგივე სტეკი).

| გადაწყვეტა | მიზეზი |
| --- | --- |
| UI ტექსტები JSON-ში (`ka.json`, `en.json`) | მარტივი რედაქტირება, განცალკევება კოდისგან |
| API მდებარეობა ცალკე (`regionGe` / `regionEn`) | IES API უკვე აბრუნებს ორ ენას |
| AsyncStorage | არჩეული ენის შენახვა აპის გადატვირთვის შემდეგ |
| default: `ka` | ქართული აუდიტორია |

## აპის სტრუქტურა

```
app/     → მხოლოდ ეკრანები
src/     → API, hooks, components, utils, i18n
```

ტაბები: `events.tsx` ✅, `map.tsx` ✅, `settings.tsx` ✅.
