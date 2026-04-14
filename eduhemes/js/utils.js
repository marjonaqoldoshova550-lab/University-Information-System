/* ============================================
   EduHemis - Utility funksiyalar
   Barcha yordamchi funksiyalar shu yerda
   ============================================ */

// ============================================
// 1. DATE UTILITIES (Sana bilan ishlash)
// ============================================
const DateUtils = {
    // Format: YYYY-MM-DD
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // Format: DD.MM.YYYY
    formatDateUZ(date) {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    },

    // Format: HH:MM
    formatTime(date) {
        if (!date) return '';
        const d = new Date(date);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    // Format: DD.MM.YYYY HH:MM
    formatDateTime(date) {
        if (!date) return '';
        return `${this.formatDateUZ(date)} ${this.formatTime(date)}`;
    },

    // Format: HH:MM (from time string)
    formatTimeString(timeStr) {
        if (!timeStr) return '';
        return timeStr.substring(0, 5);
    },

    // Kunlar farqi
    daysDiff(date1, date2 = new Date()) {
        const d1 = new Date(date1).setHours(0, 0, 0, 0);
        const d2 = new Date(date2).setHours(0, 0, 0, 0);
        return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
    },

    // Hafta kuni nomi
    getDayName(date) {
        const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
        const d = new Date(date);
        return days[d.getDay()];
    },

    // Oy nomi
    getMonthName(date) {
        const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
        const d = new Date(date);
        return months[d.getMonth()];
    },

    // Hafta raqami
    getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    },

    // Yil ichidagi kun
    getDayOfYear(date) {
        const d = new Date(date);
        const start = new Date(d.getFullYear(), 0, 0);
        const diff = d - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    },

    // Kun boshi
    startOfDay(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    },

    // Kun oxiri
    endOfDay(date) {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return d;
    },

    // Hafta boshi (dushanba)
    startOfWeek(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    },

    // Hafta oxiri (yakshanba)
    endOfWeek(date) {
        const d = this.startOfWeek(date);
        d.setDate(d.getDate() + 6);
        d.setHours(23, 59, 59, 999);
        return d;
    },

    // Oy boshi
    startOfMonth(date) {
        const d = new Date(date);
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
    },

    // Oy oxiri
    endOfMonth(date) {
        const d = new Date(date);
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);
        d.setHours(23, 59, 59, 999);
        return d;
    },

    // Yil boshi
    startOfYear(date) {
        const d = new Date(date);
        d.setMonth(0, 1);
        d.setHours(0, 0, 0, 0);
        return d;
    },

    // Yil oxiri
    endOfYear(date) {
        const d = new Date(date);
        d.setMonth(11, 31);
        d.setHours(23, 59, 59, 999);
        return d;
    },

    // Qo'shish
    addDays(date, days) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    },

    addMonths(date, months) {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d;
    },

    addYears(date, years) {
        const d = new Date(date);
        d.setFullYear(d.getFullYear() + years);
        return d;
    },

    // Farq
    diffInDays(date1, date2) {
        const diff = new Date(date2) - new Date(date1);
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    },

    diffInHours(date1, date2) {
        const diff = new Date(date2) - new Date(date1);
        return Math.floor(diff / (1000 * 60 * 60));
    },

    diffInMinutes(date1, date2) {
        const diff = new Date(date2) - new Date(date1);
        return Math.floor(diff / (1000 * 60));
    },

    // Tekshirish
    isToday(date) {
        const today = new Date();
        return this.formatDate(date) === this.formatDate(today);
    },

    isTomorrow(date) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.formatDate(date) === this.formatDate(tomorrow);
    },

    isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return this.formatDate(date) === this.formatDate(yesterday);
    },

    isWeekend(date) {
        const day = new Date(date).getDay();
        return day === 0 || day === 6;
    },

    isWeekday(date) {
        return !this.isWeekend(date);
    },

    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },

    // Nisbiy vaqt
    timeAgo(date) {
        const now = new Date();
        const diffMs = now - new Date(date);
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

    // Vaqt o'qilishi
    timeUntil(date) {
        const now = new Date();
        const diffMs = new Date(date) - now;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMs < 0) return 'Vaqt o\'tgan';
        if (diffMins < 60) return `${diffMins} daqiqa`;
        if (diffHours < 24) return `${diffHours} soat`;
        return `${diffDays} kun`;
    }
};

// ============================================
// 2. STRING UTILITIES (Matn bilan ishlash)
// ============================================
const StringUtils = {
    // Bo'sh joylarni tozalash
    trim(str) {
        return str ? str.trim() : '';
    },

    // Bosh harfni katta qilish
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // Har so'zni katta harf bilan boshlash
    capitalizeWords(str) {
        if (!str) return '';
        return str.split(' ').map(word => this.capitalize(word)).join(' ');
    },

    // Kichik harf
    toLowerCase(str) {
        return str ? str.toLowerCase() : '';
    },

    // Katta harf
    toUpperCase(str) {
        return str ? str.toUpperCase() : '';
    },

    // Slug yaratish (URL uchun)
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

    // Matnni kesish
    truncate(str, length = 50, suffix = '...') {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.substring(0, length) + suffix;
    },

    // Email ni yashirish
    maskEmail(email) {
        if (!email) return '';
        const [name, domain] = email.split('@');
        if (!domain) return email;
        const maskedName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
        return `${maskedName}@${domain}`;
    },

    // Telefon raqamni yashirish
    maskPhone(phone) {
        if (!phone) return '';
        return phone.replace(/(\d{3})\d{4}(\d{2})/, '$1****$2');
    },

    // HTML dan tozalash
    stripHtml(html) {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    },

    // Email validatsiya
    isValidEmail(email) {
        if (!email) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Telefon validatsiya (O'zbekiston)
    isValidPhoneUZ(phone) {
        if (!phone) return false;
        const re = /^(\+998|998)[0-9]{9}$/;
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        return re.test(cleaned);
    },

    // URL validatsiya
    isValidUrl(url) {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // Raqam validatsiya
    isNumeric(str) {
        if (!str) return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    },

    // Alfa-numerik
    isAlphanumeric(str) {
        if (!str) return false;
        return /^[a-zA-Z0-9]+$/.test(str);
    },

    // Bo'sh matn
    isEmpty(str) {
        return !str || str.trim().length === 0;
    },

    // Uzunlik
    length(str) {
        return str ? str.length : 0;
    },

    // Takrorlash
    repeat(str, count) {
        return str ? str.repeat(count) : '';
    },

    // Teskari
    reverse(str) {
        return str ? str.split('').reverse().join('') : '';
    },

    // Belgini o'chirish
    removeChar(str, char) {
        if (!str) return '';
        return str.replace(new RegExp(char, 'g'), '');
    },

    // Belgini almashtirish
    replaceChar(str, oldChar, newChar) {
        if (!str) return '';
        return str.replace(new RegExp(oldChar, 'g'), newChar);
    },

    // Random matn
    random(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // Random raqam
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Format telefon (O'zbekiston)
    formatPhoneUZ(phone) {
        if (!phone) return '';
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        if (cleaned.length === 12) {
            return cleaned.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5');
        }
        return phone;
    },

    // Format pul
    formatMoney(amount, currency = 'UZS') {
        if (amount === undefined || amount === null) return '';
        return new Intl.NumberFormat('uz-UZ', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format raqam
    formatNumber(number, decimals = 0) {
        if (number === undefined || number === null) return '';
        return new Intl.NumberFormat('uz-UZ', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    },

    // Format foiz
    formatPercent(number, decimals = 1) {
        if (number === undefined || number === null) return '';
        return new Intl.NumberFormat('uz-UZ', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number / 100);
    }
};

// ============================================
// 3. NUMBER UTILITIES (Raqamlar bilan ishlash)
// ============================================
const NumberUtils = {
    // Butun qism
    parseInt(value, defaultValue = 0) {
        const parsed = parseInt(value);
        return isNaN(parsed) ? defaultValue : parsed;
    },

    // O'nlik
    parseFloat(value, defaultValue = 0) {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? defaultValue : parsed;
    },

    // Yaxlitlash
    round(value, decimals = 0) {
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    // Pastga yaxlitlash
    floor(value, decimals = 0) {
        return Math.floor(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    // Yuqoriga yaxlitlash
    ceil(value, decimals = 0) {
        return Math.ceil(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    // Min
    min(...values) {
        return Math.min(...values.filter(v => !isNaN(v)));
    },

    // Max
    max(...values) {
        return Math.max(...values.filter(v => !isNaN(v)));
    },

    // Oraliqda
    inRange(value, min, max) {
        return value >= min && value <= max;
    },

    // Musbat
    isPositive(value) {
        return value > 0;
    },

    // Manfiy
    isNegative(value) {
        return value < 0;
    },

    // Juft
    isEven(value) {
        return value % 2 === 0;
    },

    // Toq
    isOdd(value) {
        return value % 2 !== 0;
    },

    // Tub son
    isPrime(value) {
        if (value <= 1) return false;
        if (value <= 3) return true;
        if (value % 2 === 0 || value % 3 === 0) return false;
        for (let i = 5; i * i <= value; i += 6) {
            if (value % i === 0 || value % (i + 2) === 0) return false;
        }
        return true;
    },

    // Faktorial
    factorial(value) {
        if (value < 0) return undefined;
        if (value === 0 || value === 1) return 1;
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        return result;
    },

    // Fibonachchi
    fibonacci(value) {
        if (value <= 0) return 0;
        if (value === 1) return 1;
        let a = 0, b = 1;
        for (let i = 2; i <= value; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    },

    // Raqamni so'z bilan
    numberToWords(value, lang = 'uz') {
        const ones = ['', 'bir', 'ikki', 'uch', 'to\'rt', 'besh', 'olti', 'yetti', 'sakkiz', 'to\'qqiz'];
        const tens = ['', 'o\'n', 'yigirma', 'o\'ttiz', 'qirq', 'ellik', 'oltmish', 'yetmish', 'sakson', 'to\'qson'];
        
        if (value === 0) return 'nol';
        
        let words = [];
        
        // Millionlar
        if (value >= 1000000) {
            const millions = Math.floor(value / 1000000);
            words.push(this.numberToWords(millions) + ' million');
            value %= 1000000;
        }
        
        // Minglar
        if (value >= 1000) {
            const thousands = Math.floor(value / 1000);
            words.push(this.numberToWords(thousands) + ' ming');
            value %= 1000;
        }
        
        // Yuzlar
        if (value >= 100) {
            const hundreds = Math.floor(value / 100);
            words.push(ones[hundreds] + ' yuz');
            value %= 100;
        }
        
        // O'nlar va birlar
        if (value >= 10) {
            const ten = Math.floor(value / 10);
            words.push(tens[ten]);
            value %= 10;
        }
        
        if (value > 0) {
            words.push(ones[value]);
        }
        
        return words.join(' ').trim();
    },

    // Rim raqamiga
    toRoman(value) {
        if (value <= 0 || value > 3999) return '';
        
        const romanNumerals = [
            ['M', 1000],
            ['CM', 900],
            ['D', 500],
            ['CD', 400],
            ['C', 100],
            ['XC', 90],
            ['L', 50],
            ['XL', 40],
            ['X', 10],
            ['IX', 9],
            ['V', 5],
            ['IV', 4],
            ['I', 1]
        ];
        
        let result = '';
        let remaining = value;
        
        for (const [letter, num] of romanNumerals) {
            while (remaining >= num) {
                result += letter;
                remaining -= num;
            }
        }
        
        return result;
    },

    // Raqamni qisqartirish (1.5k, 2.3M)
    abbreviate(value, decimals = 1) {
        const abbreviations = [
            { value: 1e9, symbol: 'B' },
            { value: 1e6, symbol: 'M' },
            { value: 1e3, symbol: 'k' }
        ];
        
        for (let i = 0; i < abbreviations.length; i++) {
            if (Math.abs(value) >= abbreviations[i].value) {
                return (value / abbreviations[i].value).toFixed(decimals) + abbreviations[i].symbol;
            }
        }
        
        return value.toString();
    },

    // O'rtacha
    average(...values) {
        const valid = values.filter(v => !isNaN(v));
        if (valid.length === 0) return 0;
        return valid.reduce((a, b) => a + b, 0) / valid.length;
    },

    // Yig'indi
    sum(...values) {
        return values.filter(v => !isNaN(v)).reduce((a, b) => a + b, 0);
    },

    // Median
    median(...values) {
        const sorted = values.filter(v => !isNaN(v)).sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    },

    // Moda
    mode(...values) {
        const freq = {};
        let maxFreq = 0;
        let modes = [];
        
        values.filter(v => !isNaN(v)).forEach(v => {
            freq[v] = (freq[v] || 0) + 1;
            if (freq[v] > maxFreq) {
                maxFreq = freq[v];
            }
        });
        
        for (const num in freq) {
            if (freq[num] === maxFreq) {
                modes.push(Number(num));
            }
        }
        
        return modes;
    },

    // Dispersiya
    variance(...values) {
        const valid = values.filter(v => !isNaN(v));
        if (valid.length === 0) return 0;
        const avg = this.average(...valid);
        const squaredDiffs = valid.map(v => Math.pow(v - avg, 2));
        return this.average(...squaredDiffs);
    },

    // Standart og'ish
    standardDeviation(...values) {
        return Math.sqrt(this.variance(...values));
    }
};

// ============================================
// 4. ARRAY UTILITIES (Massivlar bilan ishlash)
// ============================================
const ArrayUtils = {
    // Bo'sh
    isEmpty(arr) {
        return !arr || arr.length === 0;
    },

    // Birinchi element
    first(arr) {
        return arr && arr.length > 0 ? arr[0] : null;
    },

    // Oxirgi element
    last(arr) {
        return arr && arr.length > 0 ? arr[arr.length - 1] : null;
    },

    // Random element
    random(arr) {
        if (!arr || arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    },

    // Elementni olib tashlash
    remove(arr, element) {
        if (!arr) return arr;
        const index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },

    // Unikal
    unique(arr) {
        if (!arr) return [];
        return [...new Set(arr)];
    },

    // Kesishma
    intersection(arr1, arr2) {
        if (!arr1 || !arr2) return [];
        return arr1.filter(value => arr2.includes(value));
    },

    // Birlashma
    union(arr1, arr2) {
        if (!arr1) return arr2 || [];
        if (!arr2) return arr1 || [];
        return [...new Set([...arr1, ...arr2])];
    },

    // Farq
    difference(arr1, arr2) {
        if (!arr1) return [];
        if (!arr2) return arr1;
        return arr1.filter(value => !arr2.includes(value));
    },

    // Guruhlash
    groupBy(arr, key) {
        if (!arr) return {};
        return arr.reduce((group, item) => {
            const groupKey = item[key];
            group[groupKey] = group[groupKey] || [];
            group[groupKey].push(item);
            return group;
        }, {});
    },

    // Saralash
    sortBy(arr, key, direction = 'asc') {
        if (!arr) return [];
        return [...arr].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            
            if (aVal === bVal) return 0;
            
            if (direction === 'asc') {
                return aVal < bVal ? -1 : 1;
            } else {
                return aVal > bVal ? -1 : 1;
            }
        });
    },

    // Filter
    filterBy(arr, filters) {
        if (!arr) return [];
        return arr.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (value === undefined || value === null || value === '') return true;
                return item[key] === value;
            });
        });
    },

    // Qidirish
    search(arr, query, fields = []) {
        if (!arr || !query) return arr || [];
        query = query.toLowerCase();
        
        return arr.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toString().toLowerCase().includes(query);
            });
        });
    },

    // Sahifalash
    paginate(arr, page = 1, perPage = 10) {
        if (!arr) return { items: [], total: 0, page, perPage, totalPages: 0 };
        const start = (page - 1) * perPage;
        const end = start + perPage;
        
        return {
            items: arr.slice(start, end),
            total: arr.length,
            page,
            perPage,
            totalPages: Math.ceil(arr.length / perPage)
        };
    },

    // O'rtacha
    average(arr, key) {
        if (!arr || arr.length === 0) return 0;
        if (key) {
            const values = arr.map(item => item[key]).filter(v => !isNaN(v));
            return values.reduce((a, b) => a + b, 0) / values.length;
        }
        return arr.filter(v => !isNaN(v)).reduce((a, b) => a + b, 0) / arr.length;
    },

    // Yig'indi
    sum(arr, key) {
        if (!arr || arr.length === 0) return 0;
        if (key) {
            return arr.reduce((sum, item) => sum + (item[key] || 0), 0);
        }
        return arr.reduce((sum, v) => sum + (v || 0), 0);
    },

    // Min
    min(arr, key) {
        if (!arr || arr.length === 0) return null;
        if (key) {
            return Math.min(...arr.map(item => item[key]).filter(v => !isNaN(v)));
        }
        return Math.min(...arr.filter(v => !isNaN(v)));
    },

    // Max
    max(arr, key) {
        if (!arr || arr.length === 0) return null;
        if (key) {
            return Math.max(...arr.map(item => item[key]).filter(v => !isNaN(v)));
        }
        return Math.max(...arr.filter(v => !isNaN(v)));
    },

    // Bo'lish
    chunk(arr, size) {
        if (!arr) return [];
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    },

    // To'ldirish
    fill(length, value) {
        return Array(length).fill(value);
    },

    // O'zgartirish
    map(arr, fn) {
        return arr ? arr.map(fn) : [];
    },

    // Filter
    filter(arr, fn) {
        return arr ? arr.filter(fn) : [];
    },

    // Shu element bormi
    includes(arr, value) {
        return arr ? arr.includes(value) : false;
    },

    // Index
    indexOf(arr, value) {
        return arr ? arr.indexOf(value) : -1;
    },

    // Shuffle
    shuffle(arr) {
        if (!arr) return [];
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Take
    take(arr, n) {
        if (!arr) return [];
        return arr.slice(0, n);
    },

    // Take right
    takeRight(arr, n) {
        if (!arr) return [];
        return arr.slice(-n);
    },

    // Drop
    drop(arr, n) {
        if (!arr) return [];
        return arr.slice(n);
    },

    // Drop right
    dropRight(arr, n) {
        if (!arr) return [];
        return arr.slice(0, -n);
    },

    // Zip
    zip(...arrays) {
        const length = Math.min(...arrays.map(arr => arr.length));
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(arrays.map(arr => arr[i]));
        }
        return result;
    },

    // Unzip
    unzip(arr) {
        if (!arr || arr.length === 0) return [];
        const result = [];
        for (let i = 0; i < arr[0].length; i++) {
            result.push(arr.map(row => row[i]));
        }
        return result;
    }
};

// ============================================
// 5. OBJECT UTILITIES (Ob'ektlar bilan ishlash)
// ============================================
const ObjectUtils = {
    // Bo'sh
    isEmpty(obj) {
        return !obj || Object.keys(obj).length === 0;
    },

    // O'lcham
    size(obj) {
        return obj ? Object.keys(obj).length : 0;
    },

    // Klonlash
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Birlashtirish
    merge(target, ...sources) {
        return Object.assign({}, target, ...sources);
    },

    // Deep merge
    deepMerge(target, source) {
        const output = { ...target };
        
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        output[key] = source[key];
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    output[key] = source[key];
                }
            });
        }
        
        return output;
    },

    // Kalitlar
    keys(obj) {
        return obj ? Object.keys(obj) : [];
    },

    // Qiymatlar
    values(obj) {
        return obj ? Object.values(obj) : [];
    },

    // Entries
    entries(obj) {
        return obj ? Object.entries(obj) : [];
    },

    // Kalit borligi
    hasKey(obj, key) {
        return obj && obj.hasOwnProperty(key);
    },

    // Kalitni olib tashlash
    omit(obj, keys) {
        if (!obj) return {};
        const result = { ...obj };
        keys.forEach(key => delete result[key]);
        return result;
    },

    // Faqat shu kalitlar
    pick(obj, keys) {
        if (!obj) return {};
        return keys.reduce((result, key) => {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key];
            }
            return result;
        }, {});
    },

    // Kalitlarni o'zgartirish
    mapKeys(obj, fn) {
        if (!obj) return {};
        return Object.keys(obj).reduce((result, key) => {
            result[fn(key)] = obj[key];
            return result;
        }, {});
    },

    // Qiymatlarni o'zgartirish
    mapValues(obj, fn) {
        if (!obj) return {};
        return Object.keys(obj).reduce((result, key) => {
            result[key] = fn(obj[key], key);
            return result;
        }, {});
    },

    // Filter
    filter(obj, fn) {
        if (!obj) return {};
        return Object.keys(obj).reduce((result, key) => {
            if (fn(obj[key], key)) {
                result[key] = obj[key];
            }
            return result;
        }, {});
    },

    // Invert (kalit-qiymatni almashtirish)
    invert(obj) {
        if (!obj) return {};
        return Object.keys(obj).reduce((result, key) => {
            result[obj[key]] = key;
            return result;
        }, {});
    },

    // Ob'ektmi
    isObject(obj) {
        return obj && typeof obj === 'object' && !Array.isArray(obj);
    },

    // Tengmi
    isEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    // Default qiymatlar
    defaults(obj, defaultObj) {
        return { ...defaultObj, ...obj };
    },

    // Freeze
    freeze(obj) {
        return Object.freeze(obj);
    },

    // Seal
    seal(obj) {
        return Object.seal(obj);
    }
};

// ============================================
// 6. STORAGE UTILITIES (LocalStorage bilan ishlash)
// ============================================
const StorageUtils = {
    // Ma'lumotni saqlash
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    },

    // Ma'lumotni olish
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    },

    // Ma'lumotni o'chirish
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },

    // Barchasini o'chirish
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    },

    // Borligi
    has(key) {
        return localStorage.getItem(key) !== null;
    },

    // O'lcham
    size() {
        return localStorage.length;
    },

    // Barcha kalitlar
    keys() {
        return Object.keys(localStorage);
    },

    // Barcha qiymatlar
    values() {
        return Object.values(localStorage).map(value => {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        });
    },

    // Barcha ma'lumotlar
    getAll() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            try {
                data[key] = JSON.parse(localStorage.getItem(key));
            } catch {
                data[key] = localStorage.getItem(key);
            }
        }
        return data;
    },

    // Export
    export() {
        return JSON.stringify(this.getAll());
    },

    // Import
    import(json) {
        try {
            const data = JSON.parse(json);
            this.clear();
            Object.entries(data).forEach(([key, value]) => {
                this.set(key, value);
            });
            return true;
        } catch (error) {
            console.error('Storage import error:', error);
            return false;
        }
    }
};

// ============================================
// 7. COLOR UTILITIES (Ranglar bilan ishlash)
// ============================================
const ColorUtils = {
    // Random rang
    random() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    // HEX dan RGB ga
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    // RGB dan HEX ga
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },

    // HSL dan RGB ga
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    },

    // Yorqinlik
    brightness(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return 0;
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },

    // To'q rangmi
    isDark(hex) {
        return this.brightness(hex) < 128;
    },

    // Och rangmi
    isLight(hex) {
        return !this.isDark(hex);
    },

    // Kontrast rang (oq yoki qora)
    getContrastColor(hex) {
        return this.isDark(hex) ? '#ffffff' : '#000000';
    },

    // Rangni ochroq qilish
    lighten(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        
        const r = Math.min(255, rgb.r + (255 - rgb.r) * percent / 100);
        const g = Math.min(255, rgb.g + (255 - rgb.g) * percent / 100);
        const b = Math.min(255, rgb.b + (255 - rgb.b) * percent / 100);
        
        return this.rgbToHex(Math.round(r), Math.round(g), Math.round(b));
    },

    // Rangni to'qroq qilish
    darken(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        
        const r = Math.max(0, rgb.r * (100 - percent) / 100);
        const g = Math.max(0, rgb.g * (100 - percent) / 100);
        const b = Math.max(0, rgb.b * (100 - percent) / 100);
        
        return this.rgbToHex(Math.round(r), Math.round(g), Math.round(b));
    },

    // Gradient yaratish
    gradient(color1, color2, steps) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        
        if (!rgb1 || !rgb2) return [];
        
        const gradients = [];
        for (let i = 0; i <= steps; i++) {
            const ratio = i / steps;
            const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
            const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
            const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);
            gradients.push(this.rgbToHex(r, g, b));
        }
        
        return gradients;
    },

    // Rang nomi
    getName(hex) {
        const colors = {
            '#000000': 'Qora',
            '#ffffff': 'Oq',
            '#ff0000': 'Qizil',
            '#00ff00': 'Yashil',
            '#0000ff': 'Ko\'k',
            '#ffff00': 'Sariq',
            '#ff00ff': 'Pushti',
            '#00ffff': 'Moviy',
            '#c0c0c0': 'Kumush',
            '#808080': 'Kulrang',
            '#800000': 'To\'q qizil',
            '#808000': 'Zaytun',
            '#008000': 'To\'q yashil',
            '#800080': 'Binafsha',
            '#008080': 'Teal',
            '#000080': 'To\'q ko\'k',
            '#ffa500': 'Orange',
            '#ffc0cb': 'Pushti',
            '#ffd700': 'Oltin',
            '#4b0082': 'Indigo'
        };
        
        return colors[hex.toUpperCase()] || hex;
    },

    // CSS rang
    toCss(hex, opacity = 1) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    },

    // Random gradient
    randomGradient() {
        const color1 = this.random();
        const color2 = this.random();
        return `linear-gradient(135deg, ${color1}, ${color2})`;
    },

    // Rang palitrasi
    palette() {
        return [
            '#3b82f6', // ko'k
            '#10b981', // yashil
            '#f59e0b', // sariq
            '#ef4444', // qizil
            '#8b5cf6', // binafsha
            '#ec4899', // pushti
            '#06b6d4', // moviy
            '#14b8a6', // teal
            '#f97316', // to'q sariq
            '#6b7280'  // kulrang
        ];
    },

    // Rangni formatlash
    format(hex, format = 'hex') {
        if (format === 'rgb') {
            const rgb = this.hexToRgb(hex);
            return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : hex;
        }
        if (format === 'hsl') {
            // HSL ga o'tkazish
        }
        return hex;
    }
};

// ============================================
// 8. BROWSER UTILITIES (Brauzer bilan ishlash)
// ============================================
const BrowserUtils = {
    // Brauzer turi
    getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        if (ua.includes('MSIE') || ua.includes('Trident')) return 'IE';
        return 'Unknown';
    },

    // Operatsion tizim
    getOS() {
        const ua = navigator.userAgent;
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'MacOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    },

    // Mobilmi
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Planshetmi
    isTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    },

    // Desktopmi
    isDesktop() {
        return !this.isMobile() && !this.isTablet();
    },

    // Ekran eni
    screenWidth() {
        return window.innerWidth;
    },

    // Ekran bo'yi
    screenHeight() {
        return window.innerHeight;
    },

    // Yuqoriga siljish
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Elementga siljish
    scrollTo(element, offset = 0) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },

    // URL parametrlarini olish
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },

    // URL parametr qo'shish
    setUrlParam(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    },

    // Cookie olish
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },

    // Cookie saqlash
    setCookie(name, value, days = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    },

    // Cookie o'chirish
    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    },

    // LocalStorage mavjudmi
    isStorageAvailable() {
        try {
            const storage = window.localStorage;
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Internet bormi
    isOnline() {
        return navigator.onLine;
    },

    // Copy to clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    },

    // Download file
    downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    },

    // Print
    print() {
        window.print();
    },

    // Reload
    reload() {
        window.location.reload();
    },

    // Back
    back() {
        window.history.back();
    },

    // Forward
    forward() {
        window.history.forward();
    },

    // Go
    go(n) {
        window.history.go(n);
    },

    // Title
    setTitle(title) {
        document.title = title;
    },

    // Favicon
    setFavicon(url) {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    },

    // Meta tag
    setMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
        meta.content = content;
    },

    // Style qo'shish
    addStyle(css) {
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    },

    // Script qo'shish
    addScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    },

    // CSS class qo'shish
    addClass(element, className) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.classList.add(className);
        }
    },

    // CSS class o'chirish
    removeClass(element, className) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.classList.remove(className);
        }
    },

    // CSS class almashtirish
    toggleClass(element, className) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.classList.toggle(className);
        }
    }
};

// ============================================
// 9. VALIDATION UTILITIES (Tekshirish)
// ============================================
const ValidationUtils = {
    // Bo'sh emas
    required(value, fieldName = 'Bu maydon') {
        if (value === undefined || value === null || value === '') {
            return `${fieldName} to'ldirilishi shart`;
        }
        return null;
    },

    // Min uzunlik
    minLength(value, min, fieldName = 'Bu maydon') {
        if (value && value.length < min) {
            return `${fieldName} kamida ${min} ta belgi bo'lishi kerak`;
        }
        return null;
    },

    // Max uzunlik
    maxLength(value, max, fieldName = 'Bu maydon') {
        if (value && value.length > max) {
            return `${fieldName} ${max} ta belgidan oshmasligi kerak`;
        }
        return null;
    },

    // Min qiymat
    min(value, min, fieldName = 'Bu maydon') {
        if (value && Number(value) < min) {
            return `${fieldName} ${min} dan katta bo'lishi kerak`;
        }
        return null;
    },

    // Max qiymat
    max(value, max, fieldName = 'Bu maydon') {
        if (value && Number(value) > max) {
            return `${fieldName} ${max} dan kichik bo'lishi kerak`;
        }
        return null;
    },

    // Email
    email(value, fieldName = 'Email') {
        if (value && !StringUtils.isValidEmail(value)) {
            return `${fieldName} noto'g'ri formatda`;
        }
        return null;
    },

    // Telefon (O'zbekiston)
    phoneUZ(value, fieldName = 'Telefon') {
        if (value && !StringUtils.isValidPhoneUZ(value)) {
            return `${fieldName} noto'g'ri formatda (Masalan: +998901234567)`;
        }
        return null;
    },

    // URL
    url(value, fieldName = 'URL') {
        if (value && !StringUtils.isValidUrl(value)) {
            return `${fieldName} noto'g'ri formatda`;
        }
        return null;
    },

    // Raqam
    number(value, fieldName = 'Bu maydon') {
        if (value && isNaN(value)) {
            return `${fieldName} raqam bo'lishi kerak`;
        }
        return null;
    },

    // Butun son
    integer(value, fieldName = 'Bu maydon') {
        if (value && !Number.isInteger(Number(value))) {
            return `${fieldName} butun son bo'lishi kerak`;
        }
        return null;
    },

    // Musbat
    positive(value, fieldName = 'Bu maydon') {
        if (value && Number(value) <= 0) {
            return `${fieldName} musbat son bo'lishi kerak`;
        }
        return null;
    },

    // Manfiy
    negative(value, fieldName = 'Bu maydon') {
        if (value && Number(value) >= 0) {
            return `${fieldName} manfiy son bo'lishi kerak`;
        }
        return null;
    },

    // Sana
    date(value, fieldName = 'Sana') {
        if (value && isNaN(new Date(value))) {
            return `${fieldName} noto'g'ri formatda`;
        }
        return null;
    },

    // Kelajak sana
    future(value, fieldName = 'Sana') {
        if (value && new Date(value) <= new Date()) {
            return `${fieldName} kelajakdagi sana bo'lishi kerak`;
        }
        return null;
    },

    // O'tmish sana
    past(value, fieldName = 'Sana') {
        if (value && new Date(value) >= new Date()) {
            return `${fieldName} o'tmishdagi sana bo'lishi kerak`;
        }
        return null;
    },

    // Alfa-numerik
    alphanumeric(value, fieldName = 'Bu maydon') {
        if (value && !StringUtils.isAlphanumeric(value)) {
            return `${fieldName} faqat harf va raqamlardan iborat bo'lishi kerak`;
        }
        return null;
    },

    // Parol kuchi
    passwordStrength(password) {
        let score = 0;
        
        if (!password) return 0;
        
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        return score;
    },

    // Parol kuchi matni
    passwordStrengthText(password) {
        const score = this.passwordStrength(password);
        
        if (score <= 2) return 'Zaif';
        if (score <= 4) return 'O\'rtacha';
        if (score <= 5) return 'Yaxshi';
        return 'Kuchli';
    },

    // Formani tekshirish
    validateForm(data, rules) {
        const errors = {};
        
        for (const [field, fieldRules] of Object.entries(rules)) {
            const value = data[field];
            
            for (const rule of fieldRules) {
                const error = rule(value);
                if (error) {
                    errors[field] = error;
                    break;
                }
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    // Maydon to'ldirilganmi
    isFilled(obj) {
        return Object.values(obj).every(value => 
            value !== undefined && value !== null && value !== ''
        );
    },

    // Bir xilmi
    isEqual(value1, value2) {
        return value1 === value2;
    },

    // Massivda bormi
    inArray(value, array) {
        return array.includes(value);
    },

    // Oraliqda
    inRange(value, min, max) {
        return value >= min && value <= max;
    }
};

// ============================================
// 10. EXPORT
// ============================================
window.DateUtils = DateUtils;
window.StringUtils = StringUtils;
window.NumberUtils = NumberUtils;
window.ArrayUtils = ArrayUtils;
window.ObjectUtils = ObjectUtils;
window.StorageUtils = StorageUtils;
window.ColorUtils = ColorUtils;
window.BrowserUtils = BrowserUtils;
window.ValidationUtils = ValidationUtils;

// Qisqa nomlar
window.$date = DateUtils;
window.$str = StringUtils;
window.$num = NumberUtils;
window.$arr = ArrayUtils;
window.$obj = ObjectUtils;
window.$storage = StorageUtils;
window.$color = ColorUtils;
window.$browser = BrowserUtils;
window.$validate = ValidationUtils;