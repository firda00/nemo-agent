# Nemo Agent

Shaxsiy AI yordamchi: yangiliklar, moliya, vazifalar, uchrashuvlar, hisobotlar,
marketing analitikasi, buxgalteriya, yuridik yordam va sog‘liq — bitta tizimda.

**Bosqich 1 (hozir):** LLM ulanmagan. Hamma narsa deterministik qoidalar bilan ishlaydi —
tez, bepul, internetsiz ham. **Bosqich 2:** bitta sozlama bilan Claude ulanadi va
xulosa/maslahatlar sifati oshadi — modullar kodiga tegilmaydi.

## Nega bunday qurilgan

- **Nol bog‘liqlik.** Runtime uchun `npm install` shart emas: baza — Node ichidagi
  `node:sqlite`, TypeScript to‘g‘ridan-to‘g‘ri Node tomonidan yuritiladi.
- **Ma’lumot sizniki.** Hammasi lokal SQLite faylida (`data/nemo.db`). Bulut yo‘q.
- **LLM — almashtiriladigan qism.** Modullar `LlmProvider` interfeysi bilan gaplashadi;
  `rules` (bosqich 1) yoki `anthropic` (bosqich 2) — tanlov `.env` da.
- **Kalitsiz ishlaydi.** Valyuta kursi (CBU), ob-havo (Open-Meteo), yangiliklar (Google News RSS)
  — hech qanday API kalit talab qilmaydi.

## Tez boshlash

```bash
node --version    # v22.6+ kerak (v24 tavsiya)
```

```bash
git clone https://github.com/firda00/nemo-agent.git && cd nemo-agent
```

```bash
cp .env.example .env && npm run seed
```

```bash
npm run nemo -- tong
```

Natija:

```
☀️  XAYRLI TONG — 2026-09-08, seshanba
══════════════════════════════════════════

· KUN MA’LUMOTI
   USD 11 789,33 so‘m · EUR 13 702,74
   Tashkent: 21…35°C, ochiq
· YANGILIKLAR
   [iqtisodiyot] O‘zbekistonda islohotlar bo‘yicha yangi kelishuv…
   [jahon] IMF / 3Q World Economic Outlook…
❗ BUGUNGI VAZIFALAR (4)
   ⚠️  KECHIKKAN: #1 Bank hujjatlarini topshirish
   14:30  #2 Yangi kurs uchun kontent yozish
· BUGUNGI UCHRASHUVLAR (1)
   15:00 — Investor bilan uchrashuv · Ofis, 3-qavat
❗ YAQIN TO‘LOVLAR
   Ofis arendasi — 5 000 000 UZS — 3 kun kechikdi
```

Kun oxirida:

```bash
npm run nemo -- kun --html
```

## Kundalik buyruqlar

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo tong` | Ertalabki brifing: kurs, ob-havo, yangilik, vazifa, uchrashuv, to‘lov |
| `nemo kun [--html]` | Kun yakuni: hisobot, o‘sish darajasi, kamchiliklar |
| `nemo eslat` | Navbatdagi eslatmalarni yetkazish (konsol yoki Telegram) |
| `nemo doctor` | Tizim holati: baza, ulanishlar, yozuvlar soni |
| `nemo jobs` | Avtomatik vazifalar jadvali |
| `nemo help <modul>` | Modul buyruqlari |

`npm run nemo -- <buyruq>` ko‘rinishida yoki `node src/cli.ts <buyruq>` bilan chaqiriladi.

## Modullar

| Modul | Talab | Misol |
| --- | --- | --- |
| `bozor` | (2) Kurs va ob-havo | `nemo bozor kurs --history=7` |
| `yangilik` | (1) Yangiliklar | `nemo yangilik top --cat=jahon` |
| `vazifa` | (3) Vazifa va eslatma | `nemo vazifa add "Bankka borish" --due="ertaga 10:00"` |
| `kalendar` | (4) Uchrashuvlar | `nemo kalendar add "Investor" --at="ertaga 15:00"` |
| `hisobot` | (5) Kunlik hisobot | `nemo hisobot kun --html` |
| `moliya` | (5) Kirim-chiqim | `nemo moliya out 250k --cat=ovqat --need=kerakmas` |
| `buxgalter` | (6) Buxgalteriya | `nemo buxgalter list` |
| `yurist` | (7) Yuridik | `nemo yurist check` |
| `lid` | (8) Lidlar, Excel | `nemo lid export --today` |
| `hujjat` | (9) PDF/Word/taqdimot | `nemo hujjat word "Shartnoma" --from=matn.md` |
| `telegram` | (10) Telegram | `nemo telegram send "Salom"` |
| `aloqa` | (11) Qo‘ng‘iroq va SMS | `nemo aloqa calls --missed` |
| `oylik` | (12) Doimiy to‘lovlar | `nemo oylik check` |
| `marketing` | (13) Marketing analitikasi | `nemo marketing report --days=30 --html` |
| `mahsulot` | (14) Mahsulot va foyda | `nemo mahsulot top` |
| `soglik` | (15) Sog‘liq | `nemo soglik report --days=7` |
| `eslatma` | — | `nemo eslatma list` |

To‘liq ro‘yxat: [docs/MODULES.md](docs/MODULES.md).

## Avtomatik ishlash

```bash
npm run daemon
```

Har daqiqada cron jadvalini tekshiradi: ertalabki brifing (08:00), kun yakuni (20:00),
oylik to‘lov eslatmalari, buxgalteriya uchun har oyning 10-kuni, oy oxirida sotuv hisoboti,
lidlarning kunlik Excel eksporti va boshqalar. Ro‘yxat: `nemo jobs`.

Lokal HTTP API (kelajakdagi mobil/veb interfeys uchun):

```bash
npm run serve
```

## Bosqich 2 — LLM ulash

```bash
npm install @anthropic-ai/sdk
```

`.env` faylida:

```
NEMO_LLM=anthropic
ANTHROPIC_API_KEY=sk-ant-...
NEMO_LLM_MODEL=claude-opus-5
```

Shundan keyin `moliya advise`, `marketing advise`, `yangilik top`, `hujjat content`,
`yurist ask`, `nemo ask "..."` kabi buyruqlar to‘liq tahlil beradi. Kalit ishlamasa yoki
tarmoq uzilsa — tizim avtomatik qoidaviy rejimga qaytadi, brifing to‘xtamaydi.
Batafsil: [docs/LLM.md](docs/LLM.md).

## Sozlamalar

Hamma sozlama `.env` orqali (`.env.example` dan nusxa oling). Asosiylari:

| Kalit | Standart | Izoh |
| --- | --- | --- |
| `NEMO_TZ` | `Asia/Tashkent` | Vaqt zonasi |
| `NEMO_CITY` | `Tashkent` | Ob-havo shahri |
| `NEMO_CURRENCY` | `UZS` | Asosiy valyuta |
| `NEMO_OFFLINE` | `0` | `1` — tarmoqqa umuman chiqmaydi |
| `NEMO_DB` | `./data/nemo.db` | Baza fayli |
| `NEMO_LLM` | `rules` | `rules` yoki `anthropic` |

## Tekshirish

```bash
npm test && npm run typecheck
```

## Hujjatlar

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — tuzilma va qanday qilib yangi modul qo‘shiladi
- [docs/MODULES.md](docs/MODULES.md) — 15 ta talab → modul → buyruq → holat
- [docs/ROADMAP.md](docs/ROADMAP.md) — bosqichlar rejasi
- [docs/LLM.md](docs/LLM.md) — LLM ulash va provayder interfeysi

## Litsenziya

MIT — [LICENSE](LICENSE).
