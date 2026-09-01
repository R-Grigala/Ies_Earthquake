# ფუნქციების სია

სრული ხედვა — რა არის გეგმაში და რა სტატუსშია.

| # | ფუნქცია | სტატუსი | დოკუმენტაცია |
| --- | --- | --- | --- |
| 1 | Earthquake Events (სია) | ✅ მზადაა | [pages/events.md](./pages/events.md) |
| 2 | Earthquake Details | ✅ მზადაა | [pages/event-detail.md](./pages/event-detail.md) |
| 3 | Earthquake Map | ✅ მზადაა | [pages/map.md](./pages/map.md) |
| 4 | Settings | ✅ მზადაა (ენა) | [pages/settings.md](./pages/settings.md) |
| 5 | Language (ka/en) | ✅ მზადაა | [pages/settings.md](./pages/settings.md) |
| 6 | Dark / Light Theme | 🔜 | სისტემური თემა მუშაობს, პარამეტრი არა |
| 7 | Notifications | 🔜 | — |

## მიმდინარე ვერსიაში (v0.2)

**მიწისძვრების სია**, **სეისმური რუკა**, **დეტალების ეკრანი** და **პარამეტრები (ენა)** იმპლემენტირებულია:

- IES API `/events` (საერთო TanStack Query cache)
- Pull-to-refresh (სია) + ფონური refetch ტაბის focus-ზე
- Loading / error / empty მდგომარეობები
- GNSMC-ის სტილის სიის ერთეული
- Hybrid რუკა, GNSMC აიკონები (`assets/icons/`), callout → დეტალები, ლეგენდა
- მოვლენის დეტალები — მინი-რუკა (ყველა მარკერი) + ველები (GNSMC სტილი)
- Events + Map + Settings ტაბები
- i18n — ქართული / ინგლისური (UI + API მდებარეობა)
- Dev Metro proxy (SSL)
- Dark/Light mode (სისტემის მიხედვით)

## მომავალი ვერსიები

იხილეთ [steps.md](./steps.md) — შემდეგი ნაბიჯები.
