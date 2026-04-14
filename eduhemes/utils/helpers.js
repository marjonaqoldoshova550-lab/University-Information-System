/* ============================================
   EduHemis - Helpers (Yordamchi funksiyalar)
   Barcha umumiy yordamchi funksiyalar shu yerda
   ============================================ */

// ============================================
// 1. STRING FUNKSIYALARI
// ============================================

const StringHelpers = {
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
     * Random matn yaratish
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
     * Matnni teskari qilish
     * @param {string} str - Matn
     * @returns {string}
     */
    reverse(str) {
        return str ? str.split('').reverse().join('') : '';
    },

    /**
     * Matn ichidagi belgini almashtirish
     * @param {string} str - Matn
     * @param {string} search - Qidiriladigan belgi
     * @param {string} replace - Yangi belgi
     * @returns {string}
     */
    replaceAll(str, search, replace) {
        if (!str) return '';
        return str.replace(new RegExp(search, 'g'), replace);
    }
};

// ============================================
// 2. NUMBER FUNKSIYALARI
// ============================================

const NumberHelpers = {
    /**
     * Raqamni formatlash
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
     * Pulni formatlash
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
        
        const abbreviations = [
            { value: 1e9, symbol: 'B' },
            { value: 1e6, symbol: 'M' },
            { value: 1e3, symbol: 'k' }
        ];
        
        for (let i = 0; i < abbreviations.length; i++) {
            if (Math.abs(num) >= abbreviations[i].value) {
                return (num / abbreviations[i].value).toFixed(decimals) + abbreviations[i].symbol;
            }
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
        
        if (num >= 1000000) {
            const millions = Math.floor(num / 1000000);
            words.push(this.numberToWords(millions) + ' million');
            num %= 1000000;
        }
        
        if (num >= 1000) {
            const thousands = Math.floor(num / 1000);
            words.push(this.numberToWords(thousands) + ' ming');
            num %= 1000;
        }
        
        if (num >= 100) {
            const hundreds = Math.floor(num / 100);
            words.push(ones[hundreds] + ' yuz');
            num %= 100;
        }
        
        if (num >= 10) {
            const ten = Math.floor(num / 10);
            words.push(tens[ten]);
            num %= 10;
        }
        
        if (num > 0) {
            words.push(ones[num]);
        }
        
        return words.join(' ').trim();
    },

    /**
     * Random raqam yaratish
     * @param {number} min - Minimal
     * @param {number} max - Maksimal
     * @returns {number}
     */
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Raqamni yaxlitlash
     * @param {number} num - Raqam
     * @param {number} decimals - O'nlik xonalar
     * @returns {number}
     */
    round(num, decimals = 0) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    /**
     * Pastga yaxlitlash
     * @param {number} num - Raqam
     * @param {number} decimals - O'nlik xonalar
     * @returns {number}
     */
    floor(num, decimals = 0) {
        return Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    /**
     * Yuqoriga yaxlitlash
     * @param {number} num - Raqam
     * @param {number} decimals - O'nlik xonalar
     * @returns {number}
     */
    ceil(num, decimals = 0) {
        return Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
};

// ============================================
// 3. DATE FUNKSIYALARI
// ============================================

const DateHelpers = {
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
     * Sana va vaqtni formatlash
     * @param {Date|string} date - Sana
     * @returns {string}
     */
    formatDateTime(date) {
        if (!date) return '';
        return `${this.formatDate(date)} ${this.formatTime(date)}`;
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
     * Kunlar farqi
     * @param {Date|string} date1 - 1-sana
     * @param {Date|string} date2 - 2-sana
     * @returns {number}
     */
    daysDiff(date1, date2 = new Date()) {
        const d1 = new Date(date1).setHours(0, 0, 0, 0);
        const d2 = new Date(date2).setHours(0, 0, 0, 0);
        return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
    },

    /**
     * Bugunmi?
     * @param {Date|string} date - Sana
     * @returns {boolean}
     */
    isToday(date) {
        const today = new Date();
        return this.formatDate(date) === this.formatDate(today);
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
     * Sanaga kun qo'shish
     * @param {Date|string} date - Sana
     * @param {number} days - Kunlar
     * @returns {Date}
     */
    addDays(date, days) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }
};

// ============================================
// 4. VALIDATSIYA FUNKSIYALARI
// ============================================

const ValidationHelpers = {
    /**
     * Email validatsiya
     * @param {string} email - Email
     * @returns {boolean}
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Telefon validatsiya (O'zbekiston)
     * @param {string} phone - Telefon
     * @returns {boolean}
     */
    isValidPhoneUZ(phone) {
        const re = /^(\+998|998)[0-9]{9}$/;
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        return re.test(cleaned);
    },

    /**
     * URL validatsiya
     * @param {string} url - URL
     * @returns {boolean}
     */
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Raqam validatsiya
     * @param {any} value - Qiymat
     * @returns {boolean}
     */
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    /**
     * Bo'sh emasligini tekshirish
     * @param {any} value - Qiymat
     * @returns {boolean}
     */
    isNotEmpty(value) {
        return value !== undefined && value !== null && value !== '';
    },

    /**
     * Alfa-numerik tekshirish
     * @param {string} str - Matn
     * @returns {boolean}
     */
    isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    },

    /**
     * Parol kuchliligi
     * @param {string} password - Parol
     * @returns {number} 0-5
     */
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

    /**
     * Parol kuchliligi matni
     * @param {string} password - Parol
     * @returns {string}
     */
    passwordStrengthText(password) {
        const score = this.passwordStrength(password);
        
        if (score <= 2) return 'Zaif';
        if (score <= 4) return 'O\'rtacha';
        if (score <= 5) return 'Yaxshi';
        return 'Kuchli';
    },

    /**
     * Parol kuchliligi rangi
     * @param {string} password - Parol
     * @returns {string}
     */
    passwordStrengthColor(password) {
        const score = this.passwordStrength(password);
        
        if (score <= 2) return 'red';
        if (score <= 4) return 'orange';
        return 'green';
    }
};

// ============================================
// 5. ARRAY FUNKSIYALARI
// ============================================

const ArrayHelpers = {
    /**
     * Massivni guruhlash
     * @param {Array} arr - Massiv
     * @param {string} key - Kalit
     * @returns {Object}
     */
    groupBy(arr, key) {
        return arr.reduce((group, item) => {
            const groupKey = item[key];
            group[groupKey] = group[groupKey] || [];
            group[groupKey].push(item);
            return group;
        }, {});
    },

    /**
     * Unikal qiymatlar
     * @param {Array} arr - Massiv
     * @returns {Array}
     */
    unique(arr) {
        return [...new Set(arr)];
    },

    /**
     * Massivni saralash
     * @param {Array} arr - Massiv
     * @param {string} key - Kalit
     * @param {string} direction - Yo'nalish (asc/desc)
     * @returns {Array}
     */
    sortBy(arr, key, direction = 'asc') {
        return [...arr].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            
            if (direction === 'asc') {
                return aVal < bVal ? -1 : 1;
            } else {
                return aVal > bVal ? -1 : 1;
            }
        });
    },

    /**
     * Massivni filtrlash
     * @param {Array} arr - Massiv
     * @param {Object} filters - Filtrlar
     * @returns {Array}
     */
    filterBy(arr, filters) {
        return arr.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (value === undefined || value === null || value === '') return true;
                return item[key] === value;
            });
        });
    },

    /**
     * Massivda qidirish
     * @param {Array} arr - Massiv
     * @param {string} query - Qidiruv so'zi
     * @param {Array} fields - Qidiriladigan maydonlar
     * @returns {Array}
     */
    search(arr, query, fields = []) {
        if (!query) return arr;
        
        query = query.toLowerCase();
        return arr.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toString().toLowerCase().includes(query);
            });
        });
    },

    /**
     * Sahifalash
     * @param {Array} arr - Massiv
     * @param {number} page - Sahifa
     * @param {number} perPage - Har bir sahifadagi elementlar
     * @returns {Object}
     */
    paginate(arr, page = 1, perPage = 10) {
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

    /**
     * Massivni bo'lish
     * @param {Array} arr - Massiv
     * @param {number} size - Bo'lak hajmi
     * @returns {Array}
     */
    chunk(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    },

    /**
     * Massivni aralashtirish
     * @param {Array} arr - Massiv
     * @returns {Array}
     */
    shuffle(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * O'rtacha qiymat
     * @param {Array} arr - Massiv
     * @param {string} key - Kalit (ixtiyoriy)
     * @returns {number}
     */
    average(arr, key = null) {
        if (!arr.length) return 0;
        
        if (key) {
            const values = arr.map(item => item[key]).filter(v => !isNaN(v));
            return values.reduce((a, b) => a + b, 0) / values.length;
        }
        
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    },

    /**
     * Yig'indi
     * @param {Array} arr - Massiv
     * @param {string} key - Kalit (ixtiyoriy)
     * @returns {number}
     */
    sum(arr, key = null) {
        if (!arr.length) return 0;
        
        if (key) {
            return arr.reduce((sum, item) => sum + (item[key] || 0), 0);
        }
        
        return arr.reduce((sum, v) => sum + (v || 0), 0);
    },

    /**
     * Minimal qiymat
     * @param {Array} arr - Massiv
     * @param {string} key - Kalit (ixtiyoriy)
     * @returns {number|null}
     */
    min(arr, key = null) {
        if (!arr.length) return null;
        
        if (key) {
            return Math.min(...arr.map(item => item[key]).filter(v => !isNaN(v)));
        }
        
        return Math.min(...arr.filter(v => !isNaN(v)));
    },

    /**
     * Maksimal qiymat
     * @param {Array} arr - Massiv
     * @param {string} key - Kalit (ixtiyoriy)
     * @returns {number|null}
     */
    max(arr, key = null) {
        if (!arr.length) return null;
        
        if (key) {
            return Math.max(...arr.map(item => item[key]).filter(v => !isNaN(v)));
        }
        
        return Math.max(...arr.filter(v => !isNaN(v)));
    }
};

// ============================================
// 6. OBJECT FUNKSIYALARI
// ============================================

const ObjectHelpers = {
    /**
     * Ob'ektni klonlash
     * @param {Object} obj - Ob'ekt
     * @returns {Object}
     */
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Ob'ektlarni birlashtirish
     * @param {Object} target - Asosiy ob'ekt
     * @param {...Object} sources - Qo'shimcha ob'ektlar
     * @returns {Object}
     */
    merge(target, ...sources) {
        return Object.assign({}, target, ...sources);
    },

    /**
     * Kalitlarni olish
     * @param {Object} obj - Ob'ekt
     * @returns {Array}
     */
    keys(obj) {
        return Object.keys(obj);
    },

    /**
     * Qiymatlarni olish
     * @param {Object} obj - Ob'ekt
     * @returns {Array}
     */
    values(obj) {
        return Object.values(obj);
    },

    /**
     * Kalit-qiymat juftliklarini olish
     * @param {Object} obj - Ob'ekt
     * @returns {Array}
     */
    entries(obj) {
        return Object.entries(obj);
    },

    /**
     * Kalitni olib tashlash
     * @param {Object} obj - Ob'ekt
     * @param {Array} keys - O'chiriladigan kalitlar
     * @returns {Object}
     */
    omit(obj, keys) {
        const result = { ...obj };
        keys.forEach(key => delete result[key]);
        return result;
    },

    /**
     * Faqat belgilangan kalitlarni olish
     * @param {Object} obj - Ob'ekt
     * @param {Array} keys - Qoldiriladigan kalitlar
     * @returns {Object}
     */
    pick(obj, keys) {
        return keys.reduce((result, key) => {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key];
            }
            return result;
        }, {});
    },

    /**
     * Kalitlarni o'zgartirish
     * @param {Object} obj - Ob'ekt
     * @param {Function} fn - O'zgartirish funksiyasi
     * @returns {Object}
     */
    mapKeys(obj, fn) {
        return Object.keys(obj).reduce((result, key) => {
            result[fn(key)] = obj[key];
            return result;
        }, {});
    },

    /**
     * Qiymatlarni o'zgartirish
     * @param {Object} obj - Ob'ekt
     * @param {Function} fn - O'zgartirish funksiyasi
     * @returns {Object}
     */
    mapValues(obj, fn) {
        return Object.keys(obj).reduce((result, key) => {
            result[key] = fn(obj[key], key);
            return result;
        }, {});
    },

    /**
     * Ob'ektni filtrlash
     * @param {Object} obj - Ob'ekt
     * @param {Function} fn - Filtrlash funksiyasi
     * @returns {Object}
     */
    filter(obj, fn) {
        return Object.keys(obj).reduce((result, key) => {
            if (fn(obj[key], key)) {
                result[key] = obj[key];
            }
            return result;
        }, {});
    },

    /**
     * Ob'ektning bo'shligini tekshirish
     * @param {Object} obj - Ob'ekt
     * @returns {boolean}
     */
    isEmpty(obj) {
        return !obj || Object.keys(obj).length === 0;
    },

    /**
     * Ob'ektning o'lchami
     * @param {Object} obj - Ob'ekt
     * @returns {number}
     */
    size(obj) {
        return obj ? Object.keys(obj).length : 0;
    }
};

// ============================================
// 7. STORAGE FUNKSIYALARI
// ============================================

const StorageHelpers = {
    /**
     * LocalStorage ga saqlash
     * @param {string} key - Kalit
     * @param {any} value - Qiymat
     * @returns {boolean}
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    },

    /**
     * LocalStorage dan olish
     * @param {string} key - Kalit
     * @param {any} defaultValue - Standart qiymat
     * @returns {any}
     */
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    },

    /**
     * LocalStorage dan o'chirish
     * @param {string} key - Kalit
     * @returns {boolean}
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },

    /**
     * LocalStorage ni tozalash
     * @returns {boolean}
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    },

    /**
     * Kalit mavjudligini tekshirish
     * @param {string} key - Kalit
     * @returns {boolean}
     */
    has(key) {
        return localStorage.getItem(key) !== null;
    },

    /**
     * Barcha kalitlarni olish
     * @returns {Array}
     */
    keys() {
        return Object.keys(localStorage);
    },

    /**
     * Saqlangan ma'lumotlar hajmi
     * @returns {number}
     */
    size() {
        return localStorage.length;
    }
};

// ============================================
// 8. BROWSER FUNKSIYALARI
// ============================================

const BrowserHelpers = {
    /**
     * Brauzer turini aniqlash
     * @returns {string}
     */
    getBrowser() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        if (ua.includes('MSIE') || ua.includes('Trident')) return 'IE';
        return 'Unknown';
    },

    /**
     * Operatsion tizimni aniqlash
     * @returns {string}
     */
    getOS() {
        const ua = navigator.userAgent;
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac')) return 'MacOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    },

    /**
     * Mobil qurilma ekanligini tekshirish
     * @returns {boolean}
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Planshet ekanligini tekshirish
     * @returns {boolean}
     */
    isTablet() {
        return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    },

    /**
     * Desktop ekanligini tekshirish
     * @returns {boolean}
     */
    isDesktop() {
        return !this.isMobile() && !this.isTablet();
    },

    /**
     * Internet aloqasi borligini tekshirish
     * @returns {boolean}
     */
    isOnline() {
        return navigator.onLine;
    },

    /**
     * URL parametrlarini olish
     * @returns {Object}
     */
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },

    /**
     * URL parametr qo'shish
     * @param {string} key - Kalit
     * @param {string} value - Qiymat
     */
    setUrlParam(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    },

    /**
     * Clipboard ga nusxalash
     * @param {string} text - Matn
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    },

    /**
     * Faylni yuklab olish
     * @param {string} content - Kontent
     * @param {string} filename - Fayl nomi
     * @param {string} type - Fayl turi
     */
    downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * Sahifaning yuqorisiga siljish
     * @param {string} behavior - Harakat turi (smooth/auto)
     */
    scrollToTop(behavior = 'smooth') {
        window.scrollTo({ top: 0, behavior });
    },

    /**
     * Elementga siljish
     * @param {string|HTMLElement} element - Element
     * @param {number} offset - Qo'shimcha masofa
     */
    scrollTo(element, offset = 0) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    },

    /**
     * Sahifani qayta yuklash
     */
    reload() {
        window.location.reload();
    },

    /**
     * Orqaga qaytish
     */
    back() {
        window.history.back();
    },

    /**
     * Oldinga o'tish
     */
    forward() {
        window.history.forward();
    }
};

// ============================================
// 9. COLOR FUNKSIYALARI
// ============================================

const ColorHelpers = {
    /**
     * Random rang yaratish
     * @returns {string}
     */
    randomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    /**
     * HEX ni RGB ga o'tkazish
     * @param {string} hex - HEX rang
     * @returns {Object}
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    /**
     * RGB ni HEX ga o'tkazish
     * @param {number} r - Qizil
     * @param {number} g - Yashil
     * @param {number} b - Ko'k
     * @returns {string}
     */
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },

    /**
     * Rangning yorqinligi
     * @param {string} hex - HEX rang
     * @returns {number}
     */
    brightness(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return 0;
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },

    /**
     * To'q rang ekanligini tekshirish
     * @param {string} hex - HEX rang
     * @returns {boolean}
     */
    isDark(hex) {
        return this.brightness(hex) < 128;
    },

    /**
     * Och rang ekanligini tekshirish
     * @param {string} hex - HEX rang
     * @returns {boolean}
     */
    isLight(hex) {
        return !this.isDark(hex);
    },

    /**
     * Kontrast rang (oq yoki qora)
     * @param {string} hex - HEX rang
     * @returns {string}
     */
    getContrastColor(hex) {
        return this.isDark(hex) ? '#ffffff' : '#000000';
    },

    /**
     * Rangni ochroq qilish
     * @param {string} hex - HEX rang
     * @param {number} percent - Foiz
     * @returns {string}
     */
    lighten(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        
        const r = Math.min(255, rgb.r + (255 - rgb.r) * percent / 100);
        const g = Math.min(255, rgb.g + (255 - rgb.g) * percent / 100);
        const b = Math.min(255, rgb.b + (255 - rgb.b) * percent / 100);
        
        return this.rgbToHex(Math.round(r), Math.round(g), Math.round(b));
    },

    /**
     * Rangni to'qroq qilish
     * @param {string} hex - HEX rang
     * @param {number} percent - Foiz
     * @returns {string}
     */
    darken(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        
        const r = Math.max(0, rgb.r * (100 - percent) / 100);
        const g = Math.max(0, rgb.g * (100 - percent) / 100);
        const b = Math.max(0, rgb.b * (100 - percent) / 100);
        
        return this.rgbToHex(Math.round(r), Math.round(g), Math.round(b));
    },

    /**
     * Rang palitrasi
     * @returns {Array}
     */
    palette() {
        return [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
            '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6',
            '#f97316', '#6b7280', '#1f2937', '#ffffff'
        ];
    }
};

// ============================================
// 10. FORMAT FUNKSIYALARI
// ============================================

const FormatHelpers = {
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
     * JSON ni chiroyli formatda ko'rsatish
     * @param {Object} obj - Ob'ekt
     * @returns {string}
     */
    prettyJson(obj) {
        return JSON.stringify(obj, null, 2);
    },

    /**
     * Baytni formatlash
     * @param {number} bytes - Baytlar
     * @returns {string}
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// ============================================
// 11. GLOBAL OBYEKTLAR
// ============================================

window.StringHelpers = StringHelpers;
window.NumberHelpers = NumberHelpers;
window.DateHelpers = DateHelpers;
window.ValidationHelpers = ValidationHelpers;
window.ArrayHelpers = ArrayHelpers;
window.ObjectHelpers = ObjectHelpers;
window.StorageHelpers = StorageHelpers;
window.BrowserHelpers = BrowserHelpers;
window.ColorHelpers = ColorHelpers;
window.FormatHelpers = FormatHelpers;

// Qisqa nomlar
window.$str = StringHelpers;
window.$num = NumberHelpers;
window.$date = DateHelpers;
window.$validate = ValidationHelpers;
window.$arr = ArrayHelpers;
window.$obj = ObjectHelpers;
window.$storage = StorageHelpers;
window.$browser = BrowserHelpers;
window.$color = ColorHelpers;
window.$format = FormatHelpers;