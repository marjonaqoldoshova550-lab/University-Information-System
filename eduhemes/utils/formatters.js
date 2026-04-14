/* ============================================
   EduHemis - Formatters (Formatlash funksiyalari)
   Barcha formatlash funksiyalari shu yerda
   ============================================ */

// ============================================
// 1. SANA VA VAQT FORMATLARI
// ============================================

const DateFormatters = {
    /**
     * Sanani formatlash (DD.MM.YYYY)
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    },

    /**
     * Sanani formatlash (YYYY-MM-DD)
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    formatDateISO(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * Vaqtni formatlash (HH:MM)
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    formatTime(date) {
        if (!date) return '';
        const d = new Date(date);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    /**
     * Vaqtni formatlash (HH:MM:SS)
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    formatTimeFull(date) {
        if (!date) return '';
        const d = new Date(date);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    },

    /**
     * Sana va vaqtni formatlash (DD.MM.YYYY HH:MM)
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    formatDateTime(date) {
        if (!date) return '';
        return `${this.formatDate(date)} ${this.formatTime(date)}`;
    },

    /**
     * Sana va vaqtni formatlash (DD.MM.YYYY HH:MM:SS)
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    formatDateTimeFull(date) {
        if (!date) return '';
        return `${this.formatDate(date)} ${this.formatTimeFull(date)}`;
    },

    /**
     * Nisbiy vaqt (hozir, 5 daqiqa oldin, 2 soat oldin...)
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    timeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);
        
        if (diffMins < 1) return 'Hozir';
        if (diffMins < 60) return `${diffMins} daqiqa oldin`;
        if (diffHours < 24) return `${diffHours} soat oldin`;
        if (diffDays < 30) return `${diffDays} kun oldin`;
        if (diffMonths < 12) return `${diffMonths} oy oldin`;
        return `${diffYears} yil oldin`;
    },

    /**
     * Qolgan vaqt
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    timeUntil(date) {
        const now = new Date();
        const future = new Date(date);
        const diffMs = future - now;
        
        if (diffMs < 0) return 'Vaqt o\'tgan';
        
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 60) return `${diffMins} daqiqa`;
        if (diffHours < 24) return `${diffHours} soat`;
        return `${diffDays} kun`;
    },

    /**
     * Hafta kuni nomi
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    getDayName(date) {
        const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
        const d = new Date(date);
        return days[d.getDay()];
    },

    /**
     * Qisqa hafta kuni nomi
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    getShortDayName(date) {
        const days = ['Yak', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sha'];
        const d = new Date(date);
        return days[d.getDay()];
    },

    /**
     * Oy nomi
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    getMonthName(date) {
        const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
        const d = new Date(date);
        return months[d.getMonth()];
    },

    /**
     * Qisqa oy nomi
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    getShortMonthName(date) {
        const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
        const d = new Date(date);
        return months[d.getMonth()];
    },

    /**
     * Hafta raqami
     * @param {Date|string} date - Sana
     * @returns {number}
     */
    getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    },

    /**
     * Yilning nechanchi kuni
     * @param {Date|string} date - Sana
     * @returns {number}
     */
    getDayOfYear(date) {
        const d = new Date(date);
        const start = new Date(d.getFullYear(), 0, 0);
        const diff = d - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },

    /**
     * Yoshni hisoblash
     * @param {Date|string} birthDate - Tug'ilgan sana
     * @returns {number}
     */
    getAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
};

// ============================================
// 2. RAQAM FORMATLARI
// ============================================

const NumberFormatters = {
    /**
     * Raqamni formatlash (minglik ajratgich bilan)
     * @param {number} num - Raqam
     * @param {number} decimals - O'nlik xonalar
     * @returns {string}
     */
    formatNumber(num, decimals = 0) {
        if (num === undefined || num === null) return '0';
        return new Intl.NumberFormat('uz-UZ', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    },

    /**
     * Pulni formatlash (so'm)
     * @param {number} amount - Summa
     * @param {string} currency - Valyuta
     * @returns {string}
     */
    formatMoney(amount, currency = 'UZS') {
        if (amount === undefined || amount === null) return '0';
        return new Intl.NumberFormat('uz-UZ', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    /**
     * Foizni formatlash
     * @param {number} num - Raqam
     * @param {number} decimals - O'nlik xonalar
     * @returns {string}
     */
    formatPercent(num, decimals = 1) {
        if (num === undefined || num === null) return '0%';
        return `${num.toFixed(decimals)}%`;
    },

    /**
     * Raqamni qisqartirish (1.5k, 2.3M)
     * @param {number} num - Raqam
     * @param {number} decimals - O'nlik xonalar
     * @returns {string}
     */
    abbreviateNumber(num, decimals = 1) {
        if (num === undefined || num === null) return '0';
        
        const absNum = Math.abs(num);
        const sign = num < 0 ? '-' : '';
        
        if (absNum >= 1e9) {
            return sign + (absNum / 1e9).toFixed(decimals) + ' млрд';
        }
        if (absNum >= 1e6) {
            return sign + (absNum / 1e6).toFixed(decimals) + ' млн';
        }
        if (absNum >= 1e3) {
            return sign + (absNum / 1e3).toFixed(decimals) + ' минг';
        }
        
        return num.toString();
    },

    /**
     * Raqamni so'z bilan yozish
     * @param {number} num - Raqam
     * @returns {string}
     */
    numberToWords(num) {
        const ones = ['', 'bir', 'ikki', 'uch', 'to\'rt', 'besh', 'olti', 'yetti', 'sakkiz', 'to\'qqiz'];
        const tens = ['', 'o\'n', 'yigirma', 'o\'ttiz', 'qirq', 'ellik', 'oltmish', 'yetmish', 'sakson', 'to\'qson'];
        
        if (num === 0) return 'nol';
        
        let words = [];
        let n = num;
        
        if (n >= 1000000) {
            const millions = Math.floor(n / 1000000);
            words.push(this.numberToWords(millions) + ' million');
            n %= 1000000;
        }
        
        if (n >= 1000) {
            const thousands = Math.floor(n / 1000);
            words.push(this.numberToWords(thousands) + ' ming');
            n %= 1000;
        }
        
        if (n >= 100) {
            const hundreds = Math.floor(n / 100);
            words.push(ones[hundreds] + ' yuz');
            n %= 100;
        }
        
        if (n >= 10) {
            const ten = Math.floor(n / 10);
            words.push(tens[ten]);
            n %= 10;
        }
        
        if (n > 0) {
            words.push(ones[n]);
        }
        
        return words.join(' ').trim();
    },

    /**
     * Raqamni tartib raqamga o'tkazish (1st, 2nd, 3rd)
     * @param {number} num - Raqam
     * @returns {string}
     */
    ordinalNumber(num) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    },

    /**
     * Raqamni Rim raqamiga o'tkazish
     * @param {number} num - Raqam (1-3999)
     * @returns {string}
     */
    toRoman(num) {
        if (num <= 0 || num > 3999) return '';
        
        const romanNumerals = [
            ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
            ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
            ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
        ];
        
        let result = '';
        let remaining = num;
        
        for (const [letter, value] of romanNumerals) {
            while (remaining >= value) {
                result += letter;
                remaining -= value;
            }
        }
        
        return result;
    },

    /**
     * Raqamni kasrga o'tkazish
     * @param {number} num - Raqam
     * @returns {string}
     */
    toFraction(num) {
        if (num === undefined || num === null) return '';
        
        const whole = Math.floor(num);
        const fractional = num - whole;
        
        if (fractional === 0) return whole.toString();
        
        const precision = 1e-10;
        let numerator = fractional;
        let denominator = 1;
        
        while (Math.abs(numerator - Math.round(numerator)) > precision) {
            numerator *= 10;
            denominator *= 10;
        }
        
        numerator = Math.round(numerator);
        
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const divisor = gcd(numerator, denominator);
        
        numerator /= divisor;
        denominator /= divisor;
        
        if (whole === 0) return `${numerator}/${denominator}`;
        return `${whole} ${numerator}/${denominator}`;
    },

    /**
     * Baytni formatlash
     * @param {number} bytes - Baytlar
     * @returns {string}
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// ============================================
// 3. MATN FORMATLARI
// ============================================

const StringFormatters = {
    /**
     * Matnni bosh harf bilan boshlash
     * @param {string} str - Matn
     * @returns {string}
     */
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    /**
     * Har bir so'zni bosh harf bilan boshlash
     * @param {string} str - Matn
     * @returns {string}
     */
    capitalizeWords(str) {
        if (!str) return '';
        return str.split(' ').map(word => this.capitalize(word)).join(' ');
    },

    /**
     * Matnni kichik harflarga o'tkazish
     * @param {string} str - Matn
     * @returns {string}
     */
    toLowerCase(str) {
        return str ? str.toLowerCase() : '';
    },

    /**
     * Matnni katta harflarga o'tkazish
     * @param {string} str - Matn
     * @returns {string}
     */
    toUpperCase(str) {
        return str ? str.toUpperCase() : '';
    },

    /**
     * Matnni kesish
     * @param {string} str - Matn
     * @param {number} length - Uzunlik
     * @param {string} suffix - Qo'shimcha
     * @returns {string}
     */
    truncate(str, length = 50, suffix = '...') {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.substring(0, length) + suffix;
    },

    /**
     * Matnni so'zlar bo'yicha kesish
     * @param {string} str - Matn
     * @param {number} words - So'zlar soni
     * @param {string} suffix - Qo'shimcha
     * @returns {string}
     */
    truncateWords(str, words = 20, suffix = '...') {
        if (!str) return '';
        const wordArray = str.split(' ');
        if (wordArray.length <= words) return str;
        return wordArray.slice(0, words).join(' ') + suffix;
    },

    /**
     * Slug yaratish (URL uchun)
     * @param {string} str - Matn
     * @returns {string}
     */
    slugify(str) {
        if (!str) return '';
        return str
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    },

    /**
     * Email ni yashirish
     * @param {string} email - Email manzil
     * @returns {string}
     */
    maskEmail(email) {
        if (!email) return '';
        const [name, domain] = email.split('@');
        if (!domain) return email;
        const maskedName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
        return `${maskedName}@${domain}`;
    },

    /**
     * Telefon raqamni yashirish
     * @param {string} phone - Telefon raqam
     * @returns {string}
     */
    maskPhone(phone) {
        if (!phone) return '';
        return phone.replace(/(\d{3})\d{4}(\d{2})/, '$1****$2');
    },

    /**
     * HTML dan tozalash
     * @param {string} html - HTML matn
     * @returns {string}
     */
    stripHtml(html) {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    },

    /**
     * HTML entitilarni dekod qilish
     * @param {string} str - Matn
     * @returns {string}
     */
    decodeHtml(str) {
        if (!str) return '';
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    },

    /**
     * HTML entitilarni kodlash
     * @param {string} str - Matn
     * @returns {string}
     */
    encodeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    },

    /**
     * JSON ni chiroyli formatda ko'rsatish
     * @param {Object} obj - Ob'ekt
     * @returns {string}
     */
    prettyJson(obj) {
        return JSON.stringify(obj, null, 2);
    },

    /**
     * Matnni teskari qilish
     * @param {string} str - Matn
     * @returns {string}
     */
    reverse(str) {
        return str ? str.split('').reverse().join('') : '';
    },

    /**
     * Matnni random qilish
     * @param {number} length - Uzunlik
     * @returns {string}
     */
    randomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    /**
     * GUID yaratish
     * @returns {string}
     */
    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

// ============================================
// 4. TELEFON VA MANZIL FORMATLARI
// ============================================

const AddressFormatters = {
    /**
     * Telefon raqamni formatlash (O'zbekiston)
     * @param {string} phone - Telefon raqam
     * @returns {string}
     */
    formatPhoneUZ(phone) {
        if (!phone) return '';
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        if (cleaned.length === 12) {
            return cleaned.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5');
        }
        if (cleaned.length === 9) {
            return cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2-$3-$4');
        }
        return phone;
    },

    /**
     * JSHSHIR formatlash
     * @param {string} pinfl - JSHSHIR
     * @returns {string}
     */
    formatPinfl(pinfl) {
        if (!pinfl) return '';
        return pinfl.replace(/(\d{3})(\d{4})(\d{4})(\d{3})/, '$1 $2 $3 $4');
    },

    /**
     * Passport formatlash
     * @param {string} passport - Passport
     * @returns {string}
     */
    formatPassport(passport) {
        if (!passport) return '';
        return passport.replace(/([A-Z]{2})(\d{7})/, '$1 $2');
    },

    /**
     * INN formatlash
     * @param {string} inn - INN
     * @returns {string}
     */
    formatInn(inn) {
        if (!inn) return '';
        return inn.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    },

    /**
     * Manzilni formatlash
     * @param {Object} address - Manzil obyekti
     * @returns {string}
     */
    formatAddress(address) {
        if (!address) return '';
        const parts = [];
        if (address.region) parts.push(address.region);
        if (address.city) parts.push(address.city);
        if (address.district) parts.push(address.district);
        if (address.street) parts.push(address.street);
        if (address.house) parts.push(address.house);
        if (address.apartment) parts.push(`${address.apartment}-xona`);
        return parts.join(', ');
    },

    /**
     * To'liq ismni formatlash
     * @param {Object} name - Ism obyekti
     * @returns {string}
     */
    formatFullName(name) {
        if (!name) return '';
        const parts = [];
        if (name.lastName) parts.push(name.lastName);
        if (name.firstName) parts.push(name.firstName);
        if (name.middleName) parts.push(name.middleName);
        return parts.join(' ');
    },

    /**
     * Ismning bosh harflarini olish
     * @param {string} fullName - To'liq ism
     * @returns {string}
     */
    getInitials(fullName) {
        if (!fullName) return '';
        return fullName
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase();
    }
};

// ============================================
// 5. MAXSUS FORMATLAR
// ============================================

const SpecialFormatters = {
    /**
     * Kredit kartani formatlash
     * @param {string} cardNumber - Karta raqami
     * @returns {string}
     */
    formatCreditCard(cardNumber) {
        if (!cardNumber) return '';
        const cleaned = cardNumber.replace(/\s/g, '');
        return cleaned.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    },

    /**
     * Kredit kartani yashirish
     * @param {string} cardNumber - Karta raqami
     * @returns {string}
     */
    maskCreditCard(cardNumber) {
        if (!cardNumber) return '';
        const cleaned = cardNumber.replace(/\s/g, '');
        return '**** **** **** ' + cleaned.slice(-4);
    },

    /**
     * Vaqt oralig'ini formatlash
     * @param {number} minutes - Daqiqalar
     * @returns {string}
     */
    formatDuration(minutes) {
        if (minutes === undefined || minutes === null) return '';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours === 0) return `${mins} daqiqa`;
        if (mins === 0) return `${hours} soat`;
        return `${hours} soat ${mins} daqiqa`;
    },

    /**
     * Vaqt oralig'ini formatlash (qisqa)
     * @param {number} minutes - Daqiqalar
     * @returns {string}
     */
    formatDurationShort(minutes) {
        if (minutes === undefined || minutes === null) return '';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours === 0) return `${mins} мин`;
        if (mins === 0) return `${hours} ч`;
        return `${hours} ч ${mins} мин`;
    },

    /**
     * Progressni formatlash
     * @param {number} current - Joriy qiymat
     * @param {number} total - Jami qiymat
     * @returns {string}
     */
    formatProgress(current, total) {
        if (total === 0) return '0%';
        const percent = (current / total) * 100;
        return `${percent.toFixed(1)}%`;
    },

    /**
     * Reytingni formatlash
     * @param {number} rating - Reyting (0-5)
     * @returns {string}
     */
    formatRating(rating) {
        if (rating === undefined || rating === null) return '0.0';
        return rating.toFixed(1);
    },

    /**
     * Reyting yulduzlarini formatlash
     * @param {number} rating - Reyting (0-5)
     * @returns {string}
     */
    formatRatingStars(rating) {
        if (rating === undefined || rating === null) return '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let stars = '';
        stars += '★'.repeat(fullStars);
        if (halfStar) stars += '½';
        stars += '☆'.repeat(emptyStars);
        
        return stars;
    },

    /**
     * Bahoni harfga o'tkazish
     * @param {number} grade - Baho (2-5)
     * @returns {string}
     */
    gradeToLetter(grade) {
        const grades = {
            5: 'A',
            4: 'B',
            3: 'C',
            2: 'F'
        };
        return grades[grade] || 'F';
    },

    /**
     * Bahoni tavsifga o'tkazish
     * @param {number} grade - Baho (2-5)
     * @returns {string}
     */
    gradeToDescription(grade) {
        const descriptions = {
            5: "A'lo",
            4: 'Yaxshi',
            3: 'Qoniqarli',
            2: 'Qoniqarsiz'
        };
        return descriptions[grade] || 'Noma\'lum';
    },

    /**
     * GPA ni formatlash
     * @param {number} gpa - GPA (0-5)
     * @returns {string}
     */
    formatGPA(gpa) {
        if (gpa === undefined || gpa === null) return '0.0';
        return gpa.toFixed(2);
    },

    /**
     * Davomat foizini formatlash
     * @param {number} percentage - Foiz
     * @returns {string}
     */
    formatAttendance(percentage) {
        if (percentage === undefined || percentage === null) return '0%';
        return `${percentage.toFixed(1)}%`;
    },

    /**
     * Davomat holatini formatlash
     * @param {number} percentage - Foiz
     * @returns {string}
     */
    formatAttendanceStatus(percentage) {
        if (percentage >= 90) return "A'lo";
        if (percentage >= 75) return 'Yaxshi';
        if (percentage >= 60) return 'Qoniqarli';
        return 'Qoniqarsiz';
    }
};

// ============================================
// 6. GLOBAL OBYEKTLAR
// ============================================

window.DateFormatters = DateFormatters;
window.NumberFormatters = NumberFormatters;
window.StringFormatters = StringFormatters;
window.AddressFormatters = AddressFormatters;
window.SpecialFormatters = SpecialFormatters;

// Qisqa nomlar
window.$dateFormat = DateFormatters;
window.$numFormat = NumberFormatters;
window.$strFormat = StringFormatters;
window.$addressFormat = AddressFormatters;
window.$specialFormat = SpecialFormatters;