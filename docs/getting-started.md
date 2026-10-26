# გარემოს მოწყობა

## წინაპირობები

- Node.js LTS
- npm
- Expo Go (მობილურზე) ან Android Studio / Xcode ემულატორი

## ძირითადი პაკეტები

| პაკეტი | დანიშნულება |
| --- | --- |
| `@tanstack/react-query` | მონაცემთა ქეში |
| `react-native-maps` | სეისმური რუკა |
| `i18next`, `react-i18next` | თარგმანები (ka/en) |
| `expo-localization` | მოწყობილობის ენა |
| `@react-native-async-storage/async-storage` | არჩეული ენის შენახვა |

## ინსტალაცია

```bash
npm install
cp .env.example .env
```

## გარემოს ცვლადები (`.env`)

| ცვლადი | აღწერა |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | API-ის ბაზისური URL (default: `https://iesdata.iliauni.edu.ge:3030/api`) |
| `EXPO_PUBLIC_API_TOKEN` | ტოკენი, თუ სერვერს სჭირდება |

`.env`-ის შეცვლის შემდეგ dev server უნდა გადაიტვირთოს (`npx expo start -c`).

## გაშვება

```bash
npx expo start -c
```

### ფიზიკური მოწყობილობა

- ტელეფონი და კომპიუტერი **იგივე Wi‑Fi-ზე** უნდა იყოს (Metro-სთან კავშირისთვის)
- API მოთხოვნები ტელეფონიდან პირდაპირ IES სერვერზე მიდის
- თუ კომპიუტერს რამდენიმე ქსელი აქვს, მიუთითე Wi‑Fi-ის IP:

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=<wifi-ip> npx expo start -c
```

## ხშირი პრობლემები

| სიმპტომი | გამოსავალი |
| --- | --- |
| Expo Go ვერ უკავშირდება | იგივე Wi‑Fi, `REACT_NATIVE_PACKAGER_HOSTNAME` |
| „მონაცემების ჩატვირთვა ვერ მოხერხდა" | ტელეფონზე ინტერნეტი; კონსოლში `[API]` URL; `curl https://iesdata.iliauni.edu.ge:3030/api/publish_events/` |
| ცარიელი სია | API-მ ცარიელი `items` დააბრუნა |
