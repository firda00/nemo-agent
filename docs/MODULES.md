# Talablar → modullar

Belgilar: **✅ ishlaydi** · **◐ qisman** (asosiy qismi bor, qolgani tashqi kalit/xizmat talab qiladi) · **○ keyingi bosqich**

---

## 1. Yangiliklar (Google, Chrome, Twitter/X) — ✅ / ◐

**Modul:** `yangilik`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo yangilik fetch` | Manbalardan yangi xabarlarni yig‘adi |
| `nemo yangilik list --cat=iqtisodiyot` | Toifa bo‘yicha ko‘rish |
| `nemo yangilik top --limit=8` | Qisqacha mazmun |
| `nemo yangilik sources` | Ulangan manbalar |

Manbalar Google News RSS orqali (kalit kerak emas): mahalliy, O‘zbekiston iqtisodiyoti,
jahon biznesi, jahon iqtisodiyoti.

**◐ Twitter/X:** rasmiy API pullik. Yechim — `.env` da `NEMO_NEWS_FEEDS` ga RSS ko‘prigi
havolasini qo‘shish; u avtomatik qo‘shimcha manba sifatida o‘qiladi.

---

## 2. Kun ma’lumoti: kurs, ob-havo, jahon iqtisodiyoti — ✅

**Modul:** `bozor`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo bozor kurs --history=7` | USD/EUR/RUB va kechagiga nisbatan o‘zgarish |
| `nemo bozor obhavo` | Bugungi harorat, holat, shamol |

Manbalar: **cbu.uz** (Markaziy bank) va **Open-Meteo** — ikkalasi ham kalitsiz.
Har kuni 08:05 da avtomatik saqlanadi, shuning uchun o‘zgarishni kunma-kun ko‘rish mumkin.
Jahon iqtisodiyoti yangiliklari `yangilik` modulidan ertalabki brifingga qo‘shiladi.

---

## 3. Kunlik vazifalar va eslatmalar — ✅

**Modul:** `vazifa`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo vazifa add "Bankka borish" --due="ertaga 10:00" --priority=1` | Vazifa qo‘shish |
| `nemo vazifa plan` | Bugungi ishlar ketma-ketlikda, vaqti bilan |
| `nemo vazifa list --today` | Ro‘yxat |
| `nemo vazifa done 3` | Bajarildi |

Vaqtni odam tilida yozish mumkin: `bugun 15:00`, `ertaga 10:30`, `indinga`, `payshanba 09:00`,
`+2h`, `2026-09-12 14:00`. Har 15 daqiqada muddati yaqinlashgan ishlar uchun eslatma qo‘yiladi.
Kechikkan ishlar brifingda alohida ogohlantirish bilan chiqadi.

---

## 4. Uchrashuvlar va kalendar — ✅ / ◐

**Modul:** `kalendar`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo kalendar add "Investor" --at="ertaga 15:00" --dur=60 --where=ofis` | Uchrashuv belgilash |
| `nemo kalendar list --week` | Jadval |
| `nemo kalendar free --day=ertaga` | Bo‘sh oynalarni topish |
| `nemo kalendar ics <url>` | Google Calendar / Outlook dan import |

**◐** Hozir import bir tomonlama (ICS → Nemo). Google Calendar’ga **yozish** OAuth talab qiladi — bosqich 3.

---

## 5. Ishdagi kunlik hisobot va o‘sish darajasi — ✅

**Modul:** `hisobot`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo kun --html` | Kun yakuni: brifing + o‘sish darajasi + kamchiliklar |
| `nemo hisobot hafta` | 7 kunlik jadval |
| `nemo hisobot oy` | Oylik yig‘ma |

O‘sish darajasi kecha bilan taqqoslanadi: kirim, chiqim, sof natija, sotuv foydasi,
lidlar, sotuvlar, bajarilgan vazifalar. Kamchiliklar ro‘yxati raqamlardan chiqariladi
(zarar, lid yo‘qligi, muddati o‘tgan vazifa, javobsiz qo‘ng‘iroq).

---

## 5b. Shaxsiy moliya: kirim-chiqim, tejash — ✅

**Modul:** `moliya`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo moliya in 4mln --cat=savdo` | Kirim |
| `nemo moliya out 250k --cat=ovqat --need=kerakmas` | Chiqim (keraksizini belgilash bilan) |
| `nemo moliya today` / `month` | Kunlik / oylik hisobot |
| `nemo moliya budget ovqat 2mln` | Toifaga oylik limit |
| `nemo moliya advise` | Tejash maslahatlari |
| `nemo moliya import ./koshirma.csv` | Bank ko‘chirmasini yuklash |

`--need=kerakmas` bilan belgilangan xarajatlar alohida yig‘iladi — "kerak emas harajatlar"
aynan shu yerda ko‘rinadi va tejash maslahatining birinchi manbasi bo‘ladi.

---

## 6. Shaxsiy buxgalter — ✅

**Modul:** `buxgalter`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo buxgalter add soliq --period=2026-08 --due="2026-09-10"` | Hisobot rejaga qo‘yiladi |
| `nemo buxgalter received 2 --file=./hisobot.xlsx` | Kelgan hisobotni qayd qilish |
| `nemo buxgalter list` | Holat |
| `nemo buxgalter analyze --period=2026-08` | Davr tahlili |

**Har oyning 10-kunida** avtomatik eslatma yuboriladi (cron: `0 10 10 * *`) va o‘sha kuni
ertalabki brifingda alohida qator chiqadi.

---

## 7. Yuridik yordamchi — ✅ (chegarasi bilan)

**Modul:** `yurist`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo yurist add "Ijara shartnomasi" "Muddat 1 yil, 30 kun oldin ogohlantirish"` | Bilimlar bazasiga yozuv |
| `nemo yurist search ijara` | Qidirish |
| `nemo yurist check` | Tizimdagi ma’lumot asosida risklarni topish |
| `nemo yurist ask "..."` | Bazadagi yozuvlar asosida javob |

**Muhim:** modul qonun moddalarini o‘zi to‘qimaydi. Bilimlar bazasi — siz yoki yuristingiz
kiritgan yozuvlar. `check` esa faqat haqiqiy ma’lumotga tayanadi: muddati o‘tgan hisobot,
to‘lanmagan majburiyat, davr uchun hisobot yo‘qligi. Doimiy intizom ro‘yxati ham beriladi
(shartnoma, xodim, litsenziya, kassa, shaxsiy ma’lumot, reklama da’volari).

---

## 8. Excel / WPS — kunlik lidlar — ✅

**Modul:** `lid`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo lid add "Aziz aka" --phone=+998... --source=instagram` | Yangi lid |
| `nemo lid status 4 sotildi --amount=4.5mln` | Holatni o‘zgartirish (kirimga ham yoziladi) |
| `nemo lid export --today` | `.xlsx` + `.csv` fayl |
| `nemo lid funnel --days=30` | Manba bo‘yicha konversiya |
| `nemo lid import ./lidlar.csv` | CSV dan yuklash |

Har kuni **19:00 da** bugungi lidlar avtomatik Excel qilib `out/` papkasiga chiqariladi
va eslatma yuboriladi. Fayl haqiqiy `.xlsx` (OOXML) — Excel va WPS Office ochadi.

---

## 9. PDF, Word, taqdimot, kontent — ✅ / ◐

**Modul:** `hujjat`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo hujjat word "Shartnoma" --from=matn.md` | `.docx` (Word / WPS Writer) |
| `nemo hujjat excel "Jadval" --from=data.csv` | `.xlsx` |
| `nemo hujjat pdf "Hisobot" --from=matn.md` | Chop etishga tayyor HTML |
| `nemo hujjat slides "2026 strategiya"` | HTML taqdimot (slaydlar) |
| `nemo hujjat content "kurslar" --count=7` | Kontent reja |

**◐ PDF:** hozir HTML yaratiladi, brauzerda `Ctrl+P → Save as PDF`. To‘g‘ridan-to‘g‘ri PDF
uchun headless brauzer kerak — bosqich 3. Kontent rejasi LLM'siz skelet beradi,
LLM ulangach to‘liq ssenariy yoziladi.

---

## 10. Telegram — ✅ / ◐

**Modul:** `telegram`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo telegram status` | Ulanishni tekshirish |
| `nemo telegram send "Salom"` | Xabar yuborish |
| `nemo telegram file ./hisobot.xlsx` | Fayl (PDF, Excel, rasm) jo‘natish |
| `nemo telegram poll` | Kelgan xabarlarni o‘qish va bazaga yozish |
| `nemo telegram reply 12 "Javob"` | Javob berish |

`.env` da `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` kerak (@BotFather beradi).
Token qo‘yilsa, barcha eslatmalar avtomatik Telegramga boradi.

**◐ Audio/video:** kelgan ovozli xabar `[audio]` deb qayd qilinadi; **matnga o‘girish**
transkripsiya xizmatini talab qiladi — bosqich 3.

---

## 11. Qo‘ng‘iroqlar va SMS — ✅ / ◐

**Modul:** `aloqa`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo aloqa call +998... --dir=missed --name="Aziz aka"` | Qo‘ng‘iroqni qayd qilish |
| `nemo aloqa calls --missed` | Qayta qo‘ng‘iroq kerak bo‘lganlar |
| `nemo aloqa import ./calls.csv` | Telefon tarixini yuklash |
| `nemo aloqa sms +998... "Matn"` | SMS ni navbatga qo‘yish |
| `nemo aloqa inbox` | Kelgan xabarlar |

Kuniga ikki marta (12:00, 18:00) javobsiz qo‘ng‘iroqlar bo‘yicha eslatma keladi.

**◐ SMS yuborish:** SMS shlyuzi (Eskiz, Playmobile va h.k.) shartnomasini talab qiladi —
bosqich 3. Hozir SMS navbatga yoziladi va ko‘rinadi.

---

## 12. Har oylik doimiy to‘lovlar — ✅

**Modul:** `oylik`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo oylik add "Ofis arendasi" 5mln --day=5` | Doimiy to‘lov |
| `nemo oylik list` | Ro‘yxat va holat |
| `nemo oylik check` | To‘lanmaganlar + eslatma |
| `nemo oylik paid 1 --ledger` | To‘landi (chiqimga ham yoziladi) |

Har oyning **1-kunida** butun oylik to‘lov rejasi yuboriladi; to‘lov kunidan **3 kun oldin**
alohida ogohlantirish keladi; kechikkanlari brifingda qizil qator bo‘lib turadi.

---

## 13. Marketing analitikasi — ✅ / ◐

**Modul:** `marketing` (Instagram, Google Ads, 2GIS, Google Business Profile, YouTube)

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo marketing set instagram reach 15400` | Ko‘rsatkich kiritish |
| `nemo marketing import ./instagram.csv` | CSV eksportini yuklash |
| `nemo marketing report --days=30 --html` | Tahlil + diagrammali HTML hisobot |
| `nemo marketing advise` | O‘sish uchun tavsiyalar |

Hisobotda: platformalar kesimi (auditoriya, bosish, lid, qo‘ng‘iroq, xarajat), metrikalar
o‘zgarishi, CPL, CTR, konversiya, lidlar va xarajat dinamikasi (chiziqli diagramma).
HTML fayl chop etishga tayyor — `Ctrl+P` bilan PDF bo‘ladi.

**◐ Avtomatik yig‘ish:** har bir platformaning API si alohida OAuth/kalit talab qiladi
(Instagram Graph, Google Ads API, YouTube Data API). Bosqich 3 da ulanadi; interfeys
tayyor — ma’lumot bir xil jadvalga tushadi.

---

## 14. Mahsulot tahlili va oy oxiridagi fayl — ✅

**Modul:** `mahsulot`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo mahsulot add "Pro kurs" --cost=1.5mln --price=6mln` | Mahsulot |
| `nemo mahsulot sell 2 --qty=1` | Sotuv (kirimga ham yoziladi) |
| `nemo mahsulot top` | Eng ko‘p sotilgan va eng foydali |
| `nemo mahsulot export --period=2026-09` | Excel hisobot |

Har oyning **30-kunida** (yoki qisqa oyda oxirgi kuni) sotuv hisoboti avtomatik
`.xlsx` qilib chiqariladi: mahsulot, soni, tushum, tannarx, foyda, marja va jami qator.

---

## 15. Sog‘liq — ✅ / ◐

**Modul:** `soglik`

| Buyruq | Nima qiladi |
| --- | --- |
| `nemo soglik log steps 9200` | Ko‘rsatkich yozish |
| `nemo soglik import ./watch.csv` | Soat/telefon eksportini yuklash |
| `nemo soglik report --days=7` | Haftalik tahlil, maqsadga nisbatan |
| `nemo soglik advise` | Tavsiyalar |

Kuzatiladi: qadam, uyqu, puls, vazn, suv. Kechqurun 21:00 da qadam maqsadi bajarilmagan
bo‘lsa eslatma keladi.

**◐ Soatga to‘g‘ridan-to‘g‘ri ulanish:** Google Fit / Apple Health / Mi Fit API si
alohida ruxsat talab qiladi — bosqich 3. Hozir ularning CSV eksporti yuklanadi.

---

## Qo‘shimcha: eslatmalar

**Modul:** `eslatma` — barcha modullardan kelgan ogohlantirishlar bitta navbatda.
`nemo eslat` bilan yetkaziladi (Telegram tokeni bo‘lsa — Telegramga, bo‘lmasa konsolga).
`dedupe_key` tufayli bitta eslatma ikki marta bormaydi.
