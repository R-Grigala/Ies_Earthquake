# გარემოს მოწყობა

## წინაპირობები

- Node.js LTS
- npm
- Expo Go (მობილურზე) ან Android Studio / Xcode ემულატორი

## ინსტალაცია

```bash
npm install
cp .env.example .env
```

## გარემოს ცვლადები (`.env`)

| ცვლადი | აღწერა |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | API-ის ბაზისური URL (production) |
| `EXPO_PUBLIC_API_TOKEN` | ტოკენი, თუ სერვერს სჭირდება |
| `EXPO_PUBLIC_DEV_API_BASE_URL` | (dev) ხელით proxy URL, თუ ავტო-აღმოჩენა ვერ მუშაობს |
| `EXPO_PUBLIC_API_PROXY_TARGET` | (dev) Metro proxy-ის სამიზნე სერვერი |

`.env`-ის შეცვლის შემდეგ dev server უნდა გადაიტვირთოს.

## გაშვება

```bash
npx expo start -c
```

`-c` cache-ის გასუფთავებაა — Metro proxy-ის ცვლილებების შემდეგ აუცილებელია.

### ფიზიკური მოწყობილობა

- ტელეფონი და კომპიუტერი **იგივე Wi‑Fi-ზე** უნდა იყოს
- development-ში API მოთხოვნები Metro proxy-ით გადის (`http://<ip>:8081/ies-api/...`)

### Proxy არ მუშაობს?

`.env`-ში ჩაწერე კომპიუტერის IP (`ipconfig`):

```
EXPO_PUBLIC_DEV_API_BASE_URL=http://192.168.1.XXX:8081/ies-api
```

## ხშირი პრობლემები

| სიმპტომი | გამოსავალი |
| --- | --- |
| „მონაცემების ჩატვირთვა ვერ მოხერხდა" | `npx expo start -c`, იგივე Wi‑Fi, შეამოწმე proxy URL კონსოლში `[API]` |
| `Network request failed` | IES სერვერს self-signed SSL აქვს — dev-ში proxy გამოიყენება |
| ცარიელი სია | API-მ ცარიელი მასივი დააბრუნა — შეამოწმე ქსელი/API |

## SSL შენიშვნა

`iesdata.iliauni.edu.ge:2026` self-signed სერტიფიკატს იყენებს. აპი პირდაპირ HTTPS-ზე მობილურზე production-ში ვერ მიუკავშირდება, სანამ სერვერზე ვალიდური SSL არ დგება. Development-ში `metro.config.js` proxy ამას ბypass-ს აკეთებს.
