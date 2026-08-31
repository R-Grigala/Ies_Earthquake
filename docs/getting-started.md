# გარემოს მოწყობა

## წინაპირობები

- Node.js LTS და npm
- Expo Go მობილურზე, ან Android Studio / Xcode ემულატორისთვის
- რუკისთვის Android-ზე Google Maps API key (იხ. ქვემოთ)

## ინსტალაცია

```bash
npx create-expo-app@latest . --template tabs --no-install
npx expo install @tanstack/react-query react-native-maps @react-native-async-storage/async-storage i18next react-i18next expo-localization
npm install
```

## გარემოს ცვლადები

```bash
cp .env.example .env
```

| ცვლადი | აღწერა |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | IES API-ის ბაზისური მისამართი, ბოლო `/`-ის გარეშე |
| `EXPO_PUBLIC_API_TOKEN` | `Authorization: Token <...>` ჰედერისთვის |

`EXPO_PUBLIC_` პრეფიქსის ცვლადები ჩაიშენება bundle-ში, ამიტომ ისინი **არ არის
საიდუმლო**. თუ ტოკენს დაცვა სჭირდება, საჭიროა შუამავალი proxy — იხ.
[decisions.md](./decisions.md).

`.env`-ის შეცვლის შემდეგ dev server უნდა გადაიტვირთოს.

## გაშვება

```bash
npx expo start        # QR კოდი Expo Go-სთვის
npx expo start --android
npx expo start --ios
```

## რუკის კონფიგურაცია

`react-native-maps` Android-ზე Google Maps-ს იყენებს და API key სჭირდება.
გასაღები `app.json`-ში იწერება:

```json
{
  "expo": {
    "android": {
      "config": { "googleMaps": { "apiKey": "..." } }
    }
  }
}
```

iOS-ზე Apple Maps გამოიყენება და დამატებითი გასაღები არ სჭირდება.
Expo Go-ში რუკა მუშაობს; production build-ისთვის საჭიროა `eas build`.

## ხშირი პრობლემები

| სიმპტომი | მიზეზი |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL is not set` | `.env` არ არსებობს ან dev server არ გადაიტვირთა |
| სია ცარიელია, შეცდომის გარეშე | API-მ ცარიელი მასივი დააბრუნა — შეამოწმეთ ტოკენი |
| `Request ... timed out` | API მიუწვდომელია ან პორტი 2026 დაბლოკილია ქსელში |
| რუკა თეთრია Android-ზე | Google Maps API key არ არის მითითებული |
