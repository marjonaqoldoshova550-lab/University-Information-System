# 📖 EduHemis - Foydalanuvchi qo'llanmasi

## 📋 Mundarija

- [Kirish](#kirish)
- [Tizimga kirish](#tizimga-kirish)
- [Ro'yxatdan o'tish](#royxatdan-otish)
- [Talaba paneli](#talaba-paneli)
- [O'qituvchi paneli](#oqituvchi-paneli)
- [Admin paneli](#admin-paneli)
- [Profilni boshqarish](#profilni-boshqarish)
- [Vazifalar bilan ishlash](#vazifalar-bilan-ishlash)
- [Baholarni ko'rish](#baholarni-korish)
- [Dars jadvali](#dars-jadvali)
- [Bildirishnomalar](#bildirishnomalar)
- [Tez-tez beriladigan savollar](#tez-tez-beriladigan-savollar)

---

## 🎯 Kirish

**EduHemis** - bu universitetlar uchun mo'ljallangan zamonaviy axborot tizimi. Tizim talabalar, o'qituvchilar va administratorlar uchun quyidagi imkoniyatlarni taqdim etadi:

- ✅ Fanlar va baholarni kuzatish
- ✅ Vazifalarni boshqarish va topshirish
- ✅ Dars jadvalini ko'rish
- ✅ O'qituvchilar bilan bog'lanish
- ✅ Davomatni kuzatish
- ✅ Statistika va hisobotlar

---

## 🔑 Tizimga kirish

### Kirish sahifasi

Tizimga kirish uchun quyidagi amallarni bajaring:

1. Brauzeringizda `http://localhost/eduhemis/` manzilini oching
2. Login va parolingizni kiriting
3. "Kirish" tugmasini bosing

![Kirish sahifasi](images/login.png)

### Test ma'lumotlari

| Rol | Login | Parol |
|-----|-------|-------|
| Talaba | `student` | `123` |
| O'qituvchi | `teacher` | `123` |
| Admin | `admin` | `123` |

> **Eslatma:** Haqiqiy tizimda o'z login va parolingiz bilan kirasiz.

---

## 📝 Ro'yxatdan o'tish

Agar hisobingiz bo'lmasa:

1. "Ro'yxatdan o'tish" tabiga o'ting
2. Quyidagi ma'lumotlarni kiriting:
   - To'liq ism
   - Email
   - Rol (Talaba yoki O'qituvchi)
   - Guruh (talabalar uchun) / Fan (o'qituvchilar uchun)
   - Login
   - Parol
3. "Ro'yxatdan o'tish" tugmasini bosing

![Ro'yxatdan o'tish](images/register.png)

---

## 👨‍🎓 Talaba paneli

### Bosh sahifa

Talaba paneliga kirganingizda quyidagi ma'lumotlarni ko'rasiz:

- 📊 **Statistika kartochkalari**
  - Joriy fanlar soni
  - Bajarilishi kerak bo'lgan vazifalar
  - O'rtacha ball
  - Davomat foizi

- 📅 **Bugungi darslar**
  - Dars vaqti
  - Fan nomi
  - O'qituvchi
  - Xona raqami

- 👨‍🏫 **Mening o'qituvchilarim**
  - O'qituvchi ismi
  - Fani
  - Aloqa ma'lumotlari

### Mening fanlarim

Fanlar sahifasida:
- Barcha joriy fanlar ro'yxati
- Har bir fan bo'yicha o'qituvchi ma'lumotlari
- Kreditlar va soatlar
- O'rtacha baho

### Mening vazifalarim

Vazifalar sahifasida:
- Vazifalar holati bo'yicha guruhlangan:
  - 🔴 Muddati o'tgan
  - 🟡 Muddati yaqin (3 kun)
  - 🟢 Faol vazifalar
  - ✅ Bajarilgan vazifalar
- Har bir vazifa uchun:
  - Sarlavha va tavsif
  - Muddat
  - Maksimal ball
  - Topshirish holati

### Vazifa topshirish

1. Vazifani bosing
2. "Topshirish" tugmasini bosing
3. Izoh yozing (ixtiyoriy)
4. Fayl biriktiring
5. "Yuborish" tugmasini bosing

![Vazifa topshirish](images/submit-task.png)

### Mening baholarim

Baholar sahifasida:
- Umumiy GPA
- Har bir fan bo'yicha baholar
- Baholar grafigi
- So'nggi baholar ro'yxati

### Dars jadvali

Dars jadvali sahifasida:
- Haftalik jadval (kun va vaqt bo'yicha)
- Har bir dars uchun:
  - Fan nomi
  - O'qituvchi
  - Xona
- Keyingi darslar ro'yxati

### O'qituvchilar

O'qituvchilar sahifasida:
- Barcha o'qituvchilar ro'yxati
- Qidiruv va filtrlash
- O'qituvchi ma'lumotlari:
  - Fan
  - Kafedra
  - Ilmiy daraja
  - Tajriba
  - Aloqa ma'lumotlari

---

## 👨‍🏫 O'qituvchi paneli

### Bosh sahifa

O'qituvchi panelida:

- 📊 **Statistika kartochkalari**
  - Guruhlar soni
  - Talabalar soni
  - Jami vazifalar
  - Muddati o'tgan vazifalar

- 📅 **Bugungi darslar**
  - Dars vaqti
  - Guruh
  - Mavzu
  - Xona
  - Talabalar soni

- 📋 **Vazifalar**
  - Faol vazifalar
  - Topshirish foizi
  - Muddat

### Guruhlar

Guruhlar sahifasida:
- Barcha guruhlar ro'yxati
- Har bir guruh uchun:
  - Talabalar soni
  - O'rtacha baho
  - Davomat foizi
- Guruh talabalari ro'yxati
- Guruh jurnali

### Darslar

Darslar sahifasida:
- Dars rejasini ko'rish
- Yangi dars qo'shish
- Darsni tahrirlash
- Davomat olish
- Materiallar biriktirish

### Vazifalar

Vazifalar sahifasida:
- Yangi vazifa yaratish
- Vazifani tahrirlash
- Talabalar topshirig'ini ko'rish
- Baholash
- Statistika

### Vazifa yaratish

1. "Yangi vazifa" tugmasini bosing
2. Vazifa ma'lumotlarini kiriting:
   - Guruh
   - Vazifa nomi
   - Tavsif
   - Muddat
   - Maksimal ball
   - Prioritет
3. Fayl biriktiring (agar kerak bo'lsa)
4. "Saqlash" tugmasini bosing

![Vazifa yaratish](images/create-task.png)

### Baholash

1. Vazifani bosing
2. "Talabalar" tugmasini bosing
3. Har bir talaba uchun:
   - Baho kiriting
   - Izoh yozing
4. "Saqlash" tugmasini bosing

### Davomat

Davomat sahifasida:
- Guruh tanlash
- Sana tanlash
- Talabalar ro'yxati
- Holat belgilash:
  - ✅ Keldi
  - 🟡 Kechikdi
  - ❌ Kelmadi
  - 📝 Uzrli
- Statistika va grafiklar

---

## 👑 Admin paneli

### Bosh sahifa

Admin panelida:

- 📊 **Statistika**
  - Jami foydalanuvchilar
  - Talabalar soni
  - O'qituvchilar soni
  - Guruhlar soni

- 📈 **Grafiklar**
  - Fakultetlar bo'yicha talabalar
  - Oylik faollik

- ⚡ **Tezkor amallar**
  - Yangi foydalanuvchi qo'shish
  - Yangi o'qituvchi qo'shish
  - Yangi talaba qo'shish
  - Yangi guruh yaratish

### Foydalanuvchilar

Foydalanuvchilar sahifasida:
- Barcha foydalanuvchilar ro'yxati
- Qidiruv va filtrlash
- Ommaviy amallar
- Foydalanuvchi qo'shish
- Foydalanuvchi tahrirlash
- Foydalanuvchi o'chirish

### Yangi foydalanuvchi qo'shish

1. "Yangi foydalanuvchi" tugmasini bosing
2. Ma'lumotlarni kiriting:
   - To'liq ism
   - Email
   - Rol (Talaba/O'qituvchi/Admin)
   - Guruh/Fan
   - Login
   - Parol
   - Telefon
3. "Saqlash" tugmasini bosing

### Guruhlar

Guruhlar sahifasida:
- Barcha guruhlar ro'yxati
- Yangi guruh yaratish
- Guruhni tahrirlash
- Guruhni o'chirish
- Guruh statistikasi

### Fanlar

Fanlar sahifasida:
- Barcha fanlar ro'yxati
- Yangi fan qo'shish
- Fanni tahrirlash
- Fanni o'chirish
- Fan statistikasi

### Statistika

Statistika sahifasida:
- Umumiy tizim statistikasi
- Fakultetlar bo'yicha tahlil
- Kurslar bo'yicha taqsimot
- Baholar taqsimoti
- Eksport qilish

### Sozlamalar

Sozlamalar sahifasida:
- Umumiy sozlamalar
- Xavfsizlik sozlamalari
- Ko'rinish sozlamalari
- Bildirishnoma sozlamalari
- Zaxiralash
- Qo'shimcha sozlamalar

---

## 👤 Profilni boshqarish

### Profilni ko'rish

1. Headerdagi avatar yoki ismni bosing
2. "Profil" ni tanlang

Profil sahifasida:
- Shaxsiy ma'lumotlar
- O'qish ma'lumotlari
- Yutuqlar
- Faoliyat
- Xavfsizlik

### Profilni tahrirlash

1. "Tahrirlash" tugmasini bosing
2. Ma'lumotlarni o'zgartiring
3. "Saqlash" tugmasini bosing

### Avatar o'zgartirish

1. Avatar ustiga kursorni olib boring
2. "Rasmni o'zgartirish" tugmasini bosing
3. Yangi rasm tanlang
4. "Saqlash" tugmasini bosing

### Parolni o'zgartirish

1. "Xavfsizlik" tabiga o'ting
2. Joriy parolni kiriting
3. Yangi parolni kiriting
4. Yangi parolni takrorlang
5. "Saqlash" tugmasini bosing

---

## 📋 Vazifalar bilan ishlash

### Vazifalarni ko'rish

- Talaba: "Mening vazifalarim" bo'limida
- O'qituvchi: "Vazifalar" bo'limida

### Vazifa topshirish (Talaba)

1. Vazifani bosing
2. "Topshirish" tugmasini bosing
3. Izoh yozing (ixtiyoriy)
4. Fayl biriktiring
5. "Yuborish" tugmasini bosing

### Vazifa yaratish (O'qituvchi)

1. "Yangi vazifa" tugmasini bosing
2. Ma'lumotlarni kiriting
3. "Saqlash" tugmasini bosing

### Vazifani baholash (O'qituvchi)

1. Vazifani bosing
2. "Talabalar" tugmasini bosing
3. Baho va izoh kiriting
4. "Saqlash" tugmasini bosing

---

## ⭐ Baholarni ko'rish

### Talaba uchun

1. "Baholar" menyusiga o'ting
2. Umumiy GPA va fanlar bo'yicha baholarni ko'ring
3. Baholar grafigini ko'ring

### O'qituvchi uchun

1. "Baholar" menyusiga o'ting
2. Guruh va fan tanlang
3. Talabalar baholarini kiriting/tahrirlang

### Admin uchun

1. "Statistika" menyusiga o'ting
2. Umumiy baholar statistikasini ko'ring
3. Hisobotlarni eksport qiling

---

## 📅 Dars jadvali

### Jadvalni ko'rish

1. "Dars jadvali" menyusiga o'ting
2. 3 xil ko'rinish:
   - **Ro'yxat** - Barcha darslar ro'yxati
   - **Kalendar** - Oylik kalendar ko'rinishi
   - **Haftalik** - Haftalik jadval

### Filtrlash

- Guruh bo'yicha
- Dars turi bo'yicha
- Sana oralig'i bo'yicha

---

## 🔔 Bildirishnomalar

### Bildirishnomalarni ko'rish

1. Headerdagi qo'ng'iroq iconasini bosing
2. Bildirishnomalar ro'yxati ochiladi

### Bildirishnoma turlari

- 🔴 **Muddati o'tgan** - Vazifa muddati o'tgan
- 🟡 **Muddati yaqin** - 3 kun qolgan
- 🔵 **Yangi vazifa** - Yangi vazifa qo'shilgan
- 🟢 **Baho qo'yildi** - Yangi baho qo'yilgan

### Hammasini o'qilgan deb belgilash

- "Hammasini o'qildi" tugmasini bosing

---

## ❓ Tez-tez beriladigan savollar

### 1. Tizimga kira olmayapman, nima qilishim kerak?

- Login va parolingizni tekshiring
- "Parolni unutdingizmi?" havolasidan foydalaning
- Administratorga murojaat qiling

### 2. Vazifa topshira olmayapman, nima qilishim kerak?

- Internet aloqangizni tekshiring
- Fayl hajmi cheklanganligini tekshiring (max 10MB)
- Vaqtida topshirishga harakat qiling

### 3. Baholarim ko'rinmayapti, nima qilishim kerak?

- O'qituvchingiz bilan bog'laning
- Bir necha kundan keyin qayta tekshiring

### 4. Profilimni qanday o'zgartirish mumkin?

- "Profil" sahifasiga o'ting
- "Tahrirlash" tugmasini bosing
- O'zgartirishlarni saqlang

### 5. Parolimni unutib qo'ydim, nima qilishim kerak?

- "Parolni unutdingizmi?" havolasini bosing
- Email manzilingizni kiriting
- Havolani tekshiring va yangi parol o'rnating

### 6. Qanday qilib o'qituvchi bilan bog'lanish mumkin?

- O'qituvchilar sahifasidan o'qituvchini toping
- "Xabar yozish" tugmasini bosing
- Xabaringizni yozing va yuboring

### 7. Dars jadvali qanday yangilanadi?

- Jadval avtomatik ravishda yangilanadi
- O'zgarishlar bo'lsa, o'qituvchingiz xabar beradi

### 8. Mobil telefonda ishlaydimi?

- Ha, tizim barcha qurilmalarda moslashuvchan
- Telefon, planshet va kompyuterda ishlaydi

### 9. Qanday qilib hisobotlarni eksport qilish mumkin?

- Statistika sahifasiga o'ting
- "Eksport" tugmasini bosing
- Formatni tanlang (CSV, Excel, PDF)

### 10. Ma'lumotlar xavfsizmi?

- Ha, barcha ma'lumotlar shifrlanadi
- Faqat siz va ruxsat berilgan shaxslar ko'ra oladi

---

## 📞 Qo'llab-quvvatlash

Agar yordam kerak bo'lsa:

- 📧 **Email:** support@eduhemis.uz
- 📱 **Telefon:** +998 71 200 10 01
- 💬 **Telegram:** @eduhemis_support
- 🌐 **Website:** https://eduhemis.uz

---

## 📝 Qo'shimcha ma'lumotlar

### Brauzer talablari

Tizim quyidagi brauzerlarda to'liq ishlaydi:

- Google Chrome (90+ versiya)
- Mozilla Firefox (88+ versiya)
- Safari (14+ versiya)
- Microsoft Edge (90+ versiya)

### Minimal talablar

- Internet tezligi: 1 Mbps
- Ekran o'lchami: 320px va undan katta
- JavaScript yoqilgan bo'lishi kerak

---

© 2025 EduHemis. Barcha huquqlar himoyalangan.

---

## 📱 Mobil ilova (tez orada)

EduHemis mobil ilovasi tez orada App Store va Google Play'da!

- ✅ Push-bildirishnomalar
- ✅ Offline rejim
- ✅ Face ID / Touch ID
- ✅ Tez kirish

---

**EduHemis bilan ta'limni yanada qulayroq qiling!** 🚀