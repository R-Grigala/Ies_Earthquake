# ფუნქციების სია

სრული ხედვა — რა არის გეგმაში და რა სტატუსშია.

| # | ფუნქცია | სტატუსი | დოკუმენტაცია |
| --- | --- | --- | --- |
| 1 | Earthquake Events (სია) | ✅ მზადაა | [pages/events.md](./pages/events.md) |
| 2 | Earthquake Details | ✅ მზადაა | [pages/event-detail.md](./pages/event-detail.md) |
| 3 | Earthquake Map | ✅ მზადაა | [pages/map.md](./pages/map.md) |
| 4 | Settings | 🔜 | — |
| 5 | Language (ka/en) | 🔜 | — |
| 6 | Dark / Light Theme | 🔜 | სისტემური თემა მუშაობს, პარამეტრი არა |
| 7 | Notifications | 🔜 | — |

## მიმდინარე ვერსიაში (v0.1)

**მიწისძვრების სია**, **სეისმური რუკა** და **დეტალების ეკრანი**ა იმპლემენტირებული:

- IES API `/events` (საერთო TanStack Query cache)
- Pull-to-refresh (სია)
- Loading / error / empty მდგომარეობები
- GNSMC-ის სტილის სიის ერთეული
- Hybrid რუკა, GNSMC აიკონები (`assets/icons/`), callout → დეტალები, ლეგენდა
- მოვლენის დეტალები — მინი-რუკა + ველები (GNSMC სტილი)
- Events + Map ტაბები
- Dev Metro proxy (SSL)
- Dark/Light mode (სისტემის მიხედვით)

## მომავალი ვერსიები

იხილეთ [steps.md](./steps.md) — შემდეგი ნაბიჯები.
