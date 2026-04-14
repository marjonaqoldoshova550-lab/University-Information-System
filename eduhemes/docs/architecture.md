# 🏗️ EduHemis - Tizim Arxitekturasi

## 📋 Mundarija

- [Umumiy ko'rinish](#umumiy-korinish)
- [Texnologiyalar](#texnologiyalar)
- [Tizim arxitekturasi](#tizim-arxitekturasi)
- [Ma'lumotlar bazasi dizayni](#malumotlar-bazasi-dizayni)
- [API arxitekturasi](#api-arxitekturasi)
- [Frontend arxitekturasi](#frontend-arxitekturasi)
- [Xavfsizlik arxitekturasi](#xavfsizlik-arxitekturasi)
- [Deployment arxitekturasi](#deployment-arxitekturasi)
- [Monitoring va logging](#monitoring-va-logging)
- [Kelajak rejalari](#kelajak-rejalari)

---

## 🎯 Umumiy ko'rinish

EduHemis - bu universitetlar uchun mo'ljallangan **to'liq funksional** axborot tizimi. Tizim **3 ta asosiy rol** (Talaba, O'qituvchi, Admin) va **20+ modul** dan iborat.

### Asosiy maqsadlar

- 📚 Talabalar uchun o'qituvchilar va baholarni kuzatish
- 👨‍🏫 O'qituvchilar uchun dars rejalari va vazifalarni boshqarish
- 👑 Adminlar uchun foydalanuvchilarni boshqarish
- ⏰ Vazifalar muddatlarini eslatish (rangli indikatorlar)
- 📊 Ma'lumotlarni vizual ko'rinishda taqdim etish

### Tizim xususiyatlari

| Xususiyat | Tavsif |
|-----------|--------|
| **Rolli kirish** | 3 xil rol (admin, teacher, student) |
| **Real-time** | Bildirishnomalar va eslatmalar |
| **Offline support** | LocalStorage da ma'lumotlar saqlash |
| **Responsive** | Barcha qurilmalarda moslashuvchan |
| **Xavfsizlik** | Token asosida autentifikatsiya |

---

## 🛠️ Texnologiyalar

### Frontend

| Texnologiya | Versiya | Maqsad |
|-------------|---------|--------|
| HTML5 | - | Sahifa tuzilishi |
| CSS3 | - | Dizayn va stillar |
| Tailwind CSS | 3.x | Tezkor stillash |
| JavaScript | ES6+ | Interaktivlik |
| Font Awesome | 6.x | Ikonkalar |
| Chart.js | 4.x | Grafiklar |
| FullCalendar | 5.x | Kalendar |

### Backend (rejada)

| Texnologiya | Versiya | Maqsad |
|-------------|---------|--------|
| Node.js | 18.x | Server runtime |
| Express.js | 4.x | Web framework |
| PostgreSQL | 15.x | Ma'lumotlar bazasi |
| Redis | 7.x | Kesh va sessiya |
| JWT | 9.x | Autentifikatsiya |
| Socket.io | 4.x | Real-time |

### Ma'lumotlar saqlash

| Teknologiya | Maqsad |
|-------------|--------|
| **LocalStorage** | Brauzerda ma'lumotlar saqlash |
| **IndexedDB** | Katta ma'lumotlar (rejada) |
| **PostgreSQL** | Asosiy ma'lumotlar bazasi (rejada) |

---

## 🏛️ Tizim arxitekturasi

### Umumiy arxitektura diagrammasi
