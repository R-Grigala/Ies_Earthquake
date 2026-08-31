# თემა

## ფაილები

```
src/theme/colors.ts        AppTheme ტიპი, lightTheme, darkTheme
src/theme/ThemeProvider.tsx კონტექსტი, არჩევანის შენახვა, სისტემურ რეჟიმზე რეაქცია
```

## გამოყენება

```tsx
import { useTheme } from '../src/theme/ThemeProvider';

const { theme } = useTheme();
<View style={{ backgroundColor: theme.background }}>
  <Text style={{ color: theme.text }}>...</Text>
</View>
```

## პალიტრა

| ტოკენი | დანიშნულება |
| --- | --- |
| `background` | ეკრანის ფონი |
| `surface` | ბარათები, სიის ერთეულები |
| `border` | გამყოფი ხაზები |
| `text` | ძირითადი ტექსტი |
| `textMuted` | მეორეული ტექსტი |
| `accent` | აქტიური ელემენტები, ტაბის ფოკუსი |
| `headerBackground` / `headerText` | ეკრანის სათაური |

მაგნიტუდის ფერები **არ** არის თემის ნაწილი — ისინი მონაცემის სემანტიკაა და
`src/utils/magnitude.ts`-ში ცხოვრობს, ორივე რეჟიმში ერთნაირი.

## რეჟიმები

| არჩევანი | ქცევა |
| --- | --- |
| `system` | მისდევს `useColorScheme()`-ს (ნაგულისხმევი) |
| `light` | ყოველთვის ნათელი |
| `dark` | ყოველთვის მუქი |

არჩევანი ინახება AsyncStorage-ში გასაღებით `ies.theme-preference`.

## იმპლემენტაციის შენიშვნა

გლობალური გადართვა კონტექსტით ხდება. GNSMC-ში ამისთვის
`react-native-event-listeners`-ის event bus გამოიყენებოდა, რაც React-ის მოდელს
გვერდს უვლიდა და დამატებით დამოკიდებულებას მოითხოვდა.
