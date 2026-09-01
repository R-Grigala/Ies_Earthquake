# პარამეტრები (Settings)

**მარშრუტი:** `app/(tabs)/settings.tsx`  
**სტატუსი:** ✅ მზადაა (ენა) · 🔜 თემა, ნოტიფიკაციები  
**კომპონენტები:** `LanguagePickerModal.tsx`

## დანიშნულება

აპის პარამეტრები — GNSMC-ის `SettingsScreen` / `Settings.js` სტილში.

## UI (GNSMC სტილი)

### Header

- ტექსტი: **„პარამეტრები"** / **„Settings"**
- იგივე სტილი, რაც სხვა ეკრანებზე (`#7a0002` წითელი ტექსტი)

### სექცია „მართვა" / „Preferences"

```
┌─────────────────────────────────────────┐
│ მართვა                                  │  ← uppercase, ნაცრისფერი
├─────────────────────────────────────────┤
│ 🌐  ენა          ქართული            ›  │  ← მწკრივი, საზღვრები
└─────────────────────────────────────────┘
```

| ელემენტი | აღწერა |
| --- | --- |
| `globe.png` | მარცხენა აიკონი |
| ლეიბლი | `settings.language` |
| მნიშვნელობა | `languagesList[lang].nativeName` |
| `chevron-forward-outline.png` | მარჯვნივ |

მწკრივზე დაჭერა → ენის არჩევის მოდალი.

## ენის არჩევა (`LanguagePickerModal`)

Bottom sheet მოდალი:

| ელემენტი | აღწერა |
| --- | --- |
| drag handle | ზედა ზოლის ინდიკატორი |
| სათაური | „ენის შეცვლა" / „Change language" |
| დახურვა | „დახურვა" / „Close" |
| ენის ბარათები | `ქართული` / `English` + subtitle (Georgian / English) |
| არჩეული | წითელი საზღვარი, radio-on აიკონი |

არჩევის შემდეგ: `setAppLanguage()` → AsyncStorage + `i18n.changeLanguage()`.

## მხარდაჭერილი ენები

| კოდი | nativeName | API მდებარეობა |
| --- | --- | --- |
| `ka` | ქართული | `location_ge` |
| `en` | English | `location_en` |

## ტაბ ბარი

| ტაბი | აიკონი |
| --- | --- |
| პარამეტრები | `settings-outline.png` |

## ფაილები

| ფაილი | როლი |
| --- | --- |
| `app/(tabs)/settings.tsx` | ეკრანი |
| `src/components/settings/LanguagePickerModal.tsx` | ენის bottom sheet |
| `src/i18n/index.ts` | `setAppLanguage`, `loadSavedLanguage` |
| `src/i18n/languagesList.json` | ენების სახელები |
| `src/i18n/locales/ka.json`, `en.json` | თარგმანები |

## მომავალი (🔜)

- მუქი დიზაინის გადართვა (GNSMC-ში `Switch` + `EventRegister`)
- შეტყობინებები
- „ჩვენს შესახებ" / „კონტაქტი" ბმულები
