# Ies_Earthquake — დოკუმენტაცია

მობილური აპლიკაცია სეისმური მოვლენების მონიტორინგისთვის (IES / ილიას სახელმწიფო უნივერსიტეტი).

ეს დოკუმენტაცია ასახავს **ამჟამინდელ, განხორციელებულ** ფუნქციონალს (v0.2).

## სტატუსი

| ფუნქცია | სტატუსი |
| --- | --- |
| მიწისძვრების სია | ✅ მზადაა |
| მიწისძვრის დეტალები | ✅ მზადაა |
| სეისმური რუკა | ✅ მზადაა |
| პარამეტრები — ენა (ka/en) | ✅ მზადაა |
| პარამეტრები — თემა | 🔜 დაგეგმილი |
| ნოტიფიკაციები | 🔜 დაგეგმილი |

## ნავიგაცია

### არქიტექტურა და განვითარება

| ფაილი | შინაარსი |
| --- | --- |
| [getting-started.md](./getting-started.md) | ინსტალაცია, გაშვება, გარემოს ცვლადები |
| [architecture.md](./architecture.md) | სრული არქიტექტურა, სტრუქტურა, მონაცემთა ნაკადი |
| [api.md](./api.md) | IES API, ენდპოინტები, ველები, Query |
| [steps.md](./steps.md) | განვითარების ნაბიჯები (რა გაკეთდა) |
| [decisions.md](./decisions.md) | ტექნიკური გადაწყვეტილებები |
| [01-features.md](./01-features.md) | სრული ფუნქციების სია |

### გვერდები (Pages)

| გვერდი | დოკუმენტაცია |
| --- | --- |
| მიწისძვრების სია | [pages/events.md](./pages/events.md) |
| სეისმური რუკა | [pages/map.md](./pages/map.md) |
| მიწისძვრის დეტალები | [pages/event-detail.md](./pages/event-detail.md) |
| პარამეტრები | [pages/settings.md](./pages/settings.md) |

## სწრაფი გაშვება

```bash
npm install
cp .env.example .env
npx expo start -c
```

დეტალები: [getting-started.md](./getting-started.md)

## მონაცემთა წყარო

```
https://iesdata.iliauni.edu.ge:2026/api/events
```

Dev-ში: `http://<ip>:8081/ies-api/events` → Metro proxy → იგივე IES API.
