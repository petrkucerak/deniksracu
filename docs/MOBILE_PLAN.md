# Deník sráčů – přechod na mobilní aplikaci

Branch: `mobile-app` · Stav: Fáze 0 ✅ · Fáze 1 ✅ (čeká na ověření na telefonu)

## Rozhodnutí (CEO, 2. 10. 2026)

| Téma | Rozhodnutí |
| --- | --- |
| Platformy | Android + iOS (jeden kód) |
| Web deniksracu.cz | Nahradí ho webová verze aplikace (stejný kód) |
| Přihlášení | Google, Apple, e-mail s magic linkem |
| Moderace | Databáze + admin konzole, GitHub PR flow (Rulička bot) skončí |

## Architektura

```
apps/
  mobile/   Expo (React Native) + TypeScript + expo-router
            → Android, iOS a web (nahradí Next.js web)
            → admin konzole jako sekce dostupná jen pro roli admin
  api/      Cloudflare Worker (Hono) + D1 (SQL databáze) + R2 (fotky)
packages/
  shared/   typy, validace (zod), konstanty (typy toalet, ranky sráčů)
```

- **Mapa:** podklad z Mapy.cz (stávající klíč API). Na mobilu `react-native-maps` s dlaždicemi Mapy.cz, na webu Leaflet.
- **Data:** stávajících 649 trůnů z `_toilets/*.json` se jednorázově naimportuje do D1. Původní pole (`longtitude` s překlepem atd.) se při importu znormalizují.
- **Přihlášení:** aplikace získá token od Google nebo Apple, Worker ho ověří a vydá vlastní session. Magic link se posílá e-mailem přes Resend nebo Cloudflare Email.
- **Fotky:** nahrávání přes podepsané URL přímo do R2, před zveřejněním se zmenší a odstraní se EXIF (kvůli GPS a soukromí).
- **Buildy:** EAS Build v cloudu od Expo. Vývojový stroj je Raspberry Pi (aarch64), kde Android SDK ani Xcode nefungují.

## Fáze

Každá fáze končí ukázkou, kterou si CEO vyzkouší na telefonu.

### Fáze 0 – Základ ✅
- monorepo, Expo projekt, sdílené typy, lint a typecheck v CI
- převod stávajících dat do formátu pro aplikaci
- **Ukázka:** prázdná aplikace se spustí v Expo Go na telefonu

### Fáze 1 – Mapa (náhrada stávajícího webu, jen čtení) ✅
- mapa se všemi trůny, ikony podle typu, moje poloha
- detail trůnu jako spodní panel místo popupu: kategorie, popis cesty, komentář, autor
- „Nejbližší trůn“: seznam seřazený podle vzdálenosti a tlačítko Navigovat (otevře Mapy.cz, Google nebo Apple Maps)
- filtry (zdarma, čisto, zamykatelné, typ…) a vyhledávání podle názvu
- obrazovky O projektu (včetně audia), Desatero a Síň sráčů
- offline: data jsou součástí aplikace, takže seznam i detaily fungují bez signálu (mapový podklad ne)
- web: staticky vygenerovaná stránka pro každý trůn (`/toilet/<id>`), dobré pro vyhledávače
- **Ukázka:** aplikace, která umí všechno co dnešní web a k tomu víc

### Fáze 2 – Backend
- Cloudflare Worker + D1, import dat, veřejné API (`GET /toilets`, `/hall`…)
- aplikace čte data z API s offline fallbackem
- **Ukázka:** data se načítají z cloudu, změna v DB se projeví v aplikaci

### Fáze 3 – Přidávání trůnů a fotky
- formulář s výběrem místa na mapě nebo podle GPS
- nahrání až 3 fotek, uložení do R2
- vše jde do fronty ke schválení
- ochrana proti spamu (Cloudflare Turnstile, rate limit)
- **Ukázka:** přidám trůn z telefonu i s fotkou

### Fáze 4 – Uživatelské účty
- přihlášení přes Google, Apple a magic link
- profil: přezdívka, avatar, moje trůny, rank sráče
- napojení historických přezdívek: uživatel si může nárokovat starou přezdívku (potvrdí admin)
- smazání účtu z aplikace (povinné pro App Store i Google Play)
- **Ukázka:** přihlásím se a vidím svůj profil a rank

### Fáze 5 – Admin konzole
- fronta ke schválení: schválit, upravit, zamítnout
- úprava a mazání trůnů a fotek, správa uživatelů a rolí
- nahlášení problémů od uživatelů („záchod už neexistuje“)
- **Ukázka:** schválím trůn a hned se objeví na mapě

### Fáze 6 – Komunita (návrhy, o pořadí rozhodne CEO)
- hodnocení jednoho trůnu více lidmi, průměr kategorií v čase
- oblíbené trůny, historie „navštíveno“
- nahlášení nefunkčního trůnu nebo změny
- push notifikace („tvůj trůn byl schválen“)
- odznaky a achievementy k rankům v Síni sráčů

### Fáze 7 – Vydání
- web verze aplikace na deniksracu.cz (Cloudflare Pages), přesměrování starých URL
- zásady ochrany osobních údajů, GDPR, podmínky
- popisky do obchodů, screenshoty, ikony
- uzavřené testování: Google Play Internal testing a TestFlight, pak veřejné vydání
- vypnutí Rulička bota a Next.js webu

## Co bude potřeba od CEO (vyžádám si, až na to dojde)

| Fáze | Co |
| --- | --- |
| 0–1 | telefon s aplikací **Expo Go** (Android/iOS) |
| 1 | rozhodnout mapový podklad v aplikaci; pro Mapy.cz je potřeba nový klíč bez omezení na doménu (`EXPO_PUBLIC_MAPY_APP_KEY`), současný funguje jen na deniksracu.cz |
| 1–2 | účet **Expo** (zdarma) pro EAS buildy |
| 2 | účet **Cloudflare** s přístupem pro `wrangler` (D1, R2, Workers, Pages) |
| 4 | Google Cloud projekt (OAuth klienti), účet pro posílání e-mailů (Resend) |
| 4/7 | **Apple Developer** (99 USD/rok), **Google Play Console** (25 USD) |
| 7 | přístup k DNS deniksracu.cz |

## Technické poznámky

- Bez `EXPO_PUBLIC_MAPY_APP_KEY` používá aplikace podklad Apple Maps (iOS) nebo Google Maps (Android). Web na deniksracu.cz používá Mapy.cz a při lokálním vývoji OpenStreetMap.
- Android build mimo Expo Go potřebuje Google Maps API klíč (plugin `react-native-maps`). Zajistí se ve Fázi 2 spolu s EAS.
- Ikony a markery se generují skriptem `apps/mobile/scripts/generate-assets.py` z `public/asstes/logoSquare.png`.
- Na Raspberry Pi nejde zkompilovat Hermes bytecode (`hermesc` je jen pro x86). Pro lokální ověření bundlu se používá `npx expo export --no-bytecode`, ostré buildy běží na EAS.
