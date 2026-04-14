/* ============================================
   EduHemis - Utils Unit Testlari
   Yordamchi funksiyalarni test qilish
   ============================================ */

// Test muhiti sozlamalari
const testEnv = {
    // Test natijalari
    results: { passed: 0, failed: 0, total: 0 },
    logs: [],
    
    // Test boshlandi
    startTest() {
        this.results = { passed: 0, failed: 0, total: 0 };
        this.logs = [];
        console.log('🧪 Utils testlari boshlandi...\n');
    },
    
    // Test tugadi
    endTest() {
        console.log('\n📊 Test natijalari:');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📌 Jami: ${this.results.total}`);
        console.log(`📈 Muvaffaqiyat: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);
    },
    
    // Assertion
    assert(condition, message, testName) {
        this.results.total++;
        if (condition) {
            this.results.passed++;
            console.log(`✅ ${testName}: ${message}`);
            this.logs.push({ test: testName, status: 'passed', message });
        } else {
            this.results.failed++;
            console.error(`❌ ${testName}: ${message}`);
            this.logs.push({ test: testName, status: 'failed', message });
        }
    }
};

// ============================================
// 1. STRING UTILS TESTLARI
// ============================================

function testStringUtils() {
    testEnv.startTest();
    
    const StringUtils = {
        capitalize(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        
        capitalizeWords(str) {
            if (!str) return '';
            return str.split(' ').map(word => this.capitalize(word)).join(' ');
        },
        
        truncate(str, length = 50, suffix = '...') {
            if (!str) return '';
            if (str.length <= length) return str;
            return str.substring(0, length) + suffix;
        },
        
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
        
        maskEmail(email) {
            if (!email) return '';
            const [name, domain] = email.split('@');
            if (!domain) return email;
            const maskedName = name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
            return `${maskedName}@${domain}`;
        },
        
        maskPhone(phone) {
            if (!phone) return '';
            return phone.replace(/(\d{3})\d{4}(\d{2})/, '$1****$2');
        },
        
        stripHtml(html) {
            if (!html) return '';
            return html.replace(/<[^>]*>?/gm, '');
        },
        
        reverse(str) {
            return str ? str.split('').reverse().join('') : '';
        },
        
        randomString(length = 8) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },
        
        isEmpty(str) {
            return !str || str.trim().length === 0;
        }
    };
    
    // capitalize test
    testEnv.assert(
        StringUtils.capitalize('salom') === 'Salom',
        'capitalize() birinchi harfni katta qiladi',
        'capitalize test'
    );
    
    testEnv.assert(
        StringUtils.capitalize('SALOM') === 'Salom',
        'capitalize() barcha katta harflarni to\'g\'ri ishlaydi',
        'capitalize uppercase test'
    );
    
    testEnv.assert(
        StringUtils.capitalize('') === '',
        'capitalize() bo\'sh matnni to\'g\'ri qaytaradi',
        'capitalize empty test'
    );
    
    // capitalizeWords test
    testEnv.assert(
        StringUtils.capitalizeWords('salom dunyo') === 'Salom Dunyo',
        'capitalizeWords() har bir so\'zni katta harf bilan boshlaydi',
        'capitalizeWords test'
    );
    
    // truncate test
    testEnv.assert(
        StringUtils.truncate('Uzoq matn test qilish', 10) === 'Uzoq matn...',
        'truncate() matnni kesadi',
        'truncate test'
    );
    
    testEnv.assert(
        StringUtils.truncate('Qisqa', 10) === 'Qisqa',
        'truncate() qisqa matnni o\'zgartirmaydi',
        'truncate short test'
    );
    
    // slugify test
    testEnv.assert(
        StringUtils.slugify('Salom Dunyo') === 'salom-dunyo',
        'slugify() URL uchun slug yaratadi',
        'slugify test'
    );
    
    testEnv.assert(
        StringUtils.slugify('Veb Dasturlash Kursi 2024') === 'veb-dasturlash-kursi-2024',
        'slugify() maxsus belgilarni olib tashlaydi',
        'slugify special chars test'
    );
    
    // maskEmail test
    testEnv.assert(
        StringUtils.maskEmail('test@example.com') === 't**t@example.com',
        'maskEmail() email manzilni yashiradi',
        'maskEmail test'
    );
    
    // maskPhone test
    testEnv.assert(
        StringUtils.maskPhone('+998901234567') === '+99890****67',
        'maskPhone() telefon raqamni yashiradi',
        'maskPhone test'
    );
    
    // stripHtml test
    testEnv.assert(
        StringUtils.stripHtml('<p>Salom</p>') === 'Salom',
        'stripHtml() HTML teglarni olib tashlaydi',
        'stripHtml test'
    );
    
    // reverse test
    testEnv.assert(
        StringUtils.reverse('salom') === 'molas',
        'reverse() matnni teskari qiladi',
        'reverse test'
    );
    
    // randomString test
    const randomStr = StringUtils.randomString(10);
    testEnv.assert(
        randomStr.length === 10,
        'randomString() berilgan uzunlikda matn yaratadi',
        'randomString length test'
    );
    
    // isEmpty test
    testEnv.assert(
        StringUtils.isEmpty('') === true,
        'isEmpty() bo\'sh matn uchun true qaytaradi',
        'isEmpty empty test'
    );
    
    testEnv.assert(
        StringUtils.isEmpty('   ') === true,
        'isEmpty() faqat bo\'sh joylar uchun true qaytaradi',
        'isEmpty whitespace test'
    );
    
    testEnv.assert(
        StringUtils.isEmpty('salom') === false,
        'isEmpty() to\'ldirilgan matn uchun false qaytaradi',
        'isEmpty not empty test'
    );
    
    testEnv.endTest();
}

// ============================================
// 2. NUMBER UTILS TESTLARI
// ============================================

function testNumberUtils() {
    testEnv.startTest();
    
    const NumberUtils = {
        formatNumber(num, decimals = 0) {
            if (num === undefined || num === null) return '0';
            return new Intl.NumberFormat('uz-UZ', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }).format(num);
        },
        
        formatMoney(amount, currency = 'UZS') {
            if (amount === undefined || amount === null) return '0';
            return new Intl.NumberFormat('uz-UZ', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        },
        
        formatPercent(num, decimals = 1) {
            if (num === undefined || num === null) return '0%';
            return `${num.toFixed(decimals)}%`;
        },
        
        abbreviateNumber(num, decimals = 1) {
            if (num === undefined || num === null) return '0';
            const absNum = Math.abs(num);
            if (absNum >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
            if (absNum >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
            if (absNum >= 1e3) return (num / 1e3).toFixed(decimals) + 'k';
            return num.toString();
        },
        
        randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        
        round(num, decimals = 0) {
            return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        },
        
        isEven(num) {
            return num % 2 === 0;
        },
        
        isOdd(num) {
            return num % 2 !== 0;
        },
        
        clamp(num, min, max) {
            return Math.min(Math.max(num, min), max);
        }
    };
    
    // formatNumber test
    testEnv.assert(
        NumberUtils.formatNumber(1234567) === '1,234,567',
        'formatNumber() minglik ajratgich qo\'shadi',
        'formatNumber test'
    );
    
    // formatMoney test
    testEnv.assert(
        NumberUtils.formatMoney(100000) === '100,000 UZS',
        'formatMoney() pul formatida chiqaradi',
        'formatMoney test'
    );
    
    // formatPercent test
    testEnv.assert(
        NumberUtils.formatPercent(75.5) === '75.5%',
        'formatPercent() foiz formatida chiqaradi',
        'formatPercent test'
    );
    
    // abbreviateNumber test
    testEnv.assert(
        NumberUtils.abbreviateNumber(2500000) === '2.5M',
        'abbreviateNumber() katta raqamlarni qisqartiradi',
        'abbreviateNumber test'
    );
    
    testEnv.assert(
        NumberUtils.abbreviateNumber(1500) === '1.5k',
        'abbreviateNumber() mingliklarni qisqartiradi',
        'abbreviateNumber thousand test'
    );
    
    // randomNumber test
    const random = NumberUtils.randomNumber(1, 10);
    testEnv.assert(
        random >= 1 && random <= 10,
        'randomNumber() berilgan oraliqda raqam yaratadi',
        'randomNumber range test'
    );
    
    // round test
    testEnv.assert(
        NumberUtils.round(4.567, 2) === 4.57,
        'round() raqamni yaxlitlaydi',
        'round test'
    );
    
    // isEven test
    testEnv.assert(
        NumberUtils.isEven(4) === true,
        'isEven() juft sonni aniqlaydi',
        'isEven test'
    );
    
    testEnv.assert(
        NumberUtils.isEven(5) === false,
        'isEven() toq sonni aniqlaydi',
        'isEven odd test'
    );
    
    // isOdd test
    testEnv.assert(
        NumberUtils.isOdd(5) === true,
        'isOdd() toq sonni aniqlaydi',
        'isOdd test'
    );
    
    // clamp test
    testEnv.assert(
        NumberUtils.clamp(15, 0, 10) === 10,
        'clamp() raqamni belgilangan oraliqda ushlaydi',
        'clamp max test'
    );
    
    testEnv.assert(
        NumberUtils.clamp(-5, 0, 10) === 0,
        'clamp() raqamni belgilangan oraliqda ushlaydi',
        'clamp min test'
    );
    
    testEnv.endTest();
}

// ============================================
// 3. DATE UTILS TESTLARI
// ============================================

function testDateUtils() {
    testEnv.startTest();
    
    const DateUtils = {
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}.${month}.${year}`;
        },
        
        formatTime(date) {
            if (!date) return '';
            const d = new Date(date);
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        
        formatDateTime(date) {
            if (!date) return '';
            return `${this.formatDate(date)} ${this.formatTime(date)}`;
        },
        
        timeAgo(date) {
            const now = new Date();
            const past = new Date(date);
            const diffMs = now - past;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);
            
            if (diffMins < 1) return 'Hozir';
            if (diffMins < 60) return `${diffMins} daqiqa oldin`;
            if (diffHours < 24) return `${diffHours} soat oldin`;
            if (diffDays < 30) return `${diffDays} kun oldin`;
            return `${Math.floor(diffDays / 30)} oy oldin`;
        },
        
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
        
        daysDiff(date1, date2 = new Date()) {
            const d1 = new Date(date1).setHours(0, 0, 0, 0);
            const d2 = new Date(date2).setHours(0, 0, 0, 0);
            return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
        },
        
        isToday(date) {
            const today = new Date();
            return this.formatDate(date) === this.formatDate(today);
        },
        
        getDayName(date) {
            const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
            const d = new Date(date);
            return days[d.getDay()];
        },
        
        getMonthName(date) {
            const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
            const d = new Date(date);
            return months[d.getMonth()];
        }
    };
    
    const testDate = new Date(2025, 2, 15, 10, 30);
    
    // formatDate test
    testEnv.assert(
        DateUtils.formatDate(testDate) === '15.03.2025',
        'formatDate() sanani DD.MM.YYYY formatida chiqaradi',
        'formatDate test'
    );
    
    // formatTime test
    testEnv.assert(
        DateUtils.formatTime(testDate) === '10:30',
        'formatTime() vaqtni HH:MM formatida chiqaradi',
        'formatTime test'
    );
    
    // formatDateTime test
    testEnv.assert(
        DateUtils.formatDateTime(testDate) === '15.03.2025 10:30',
        'formatDateTime() sana va vaqtni birgalikda chiqaradi',
        'formatDateTime test'
    );
    
    // timeAgo test
    const now = new Date();
    const oneHourAgo = new Date(now - 3600000);
    testEnv.assert(
        DateUtils.timeAgo(oneHourAgo).includes('soat'),
        'timeAgo() nisbiy vaqtni chiqaradi',
        'timeAgo test'
    );
    
    // timeUntil test
    const oneHourLater = new Date(now + 3600000);
    testEnv.assert(
        DateUtils.timeUntil(oneHourLater).includes('soat'),
        'timeUntil() qolgan vaqtni chiqaradi',
        'timeUntil test'
    );
    
    // daysDiff test
    const date1 = new Date(2025, 2, 20);
    const date2 = new Date(2025, 2, 15);
    testEnv.assert(
        DateUtils.daysDiff(date1, date2) === 5,
        'daysDiff() kunlar farqini hisoblaydi',
        'daysDiff test'
    );
    
    // isToday test
    testEnv.assert(
        DateUtils.isToday(new Date()) === true,
        'isToday() bugungi sanani aniqlaydi',
        'isToday true test'
    );
    
    // getDayName test
    const monday = new Date(2025, 2, 17); // 17.03.2025 dushanba
    testEnv.assert(
        DateUtils.getDayName(monday) === 'Dushanba',
        'getDayName() hafta kunini nomini chiqaradi',
        'getDayName test'
    );
    
    // getMonthName test
    testEnv.assert(
        DateUtils.getMonthName(testDate) === 'Mart',
        'getMonthName() oy nomini chiqaradi',
        'getMonthName test'
    );
    
    testEnv.endTest();
}

// ============================================
// 4. ARRAY UTILS TESTLARI
// ============================================

function testArrayUtils() {
    testEnv.startTest();
    
    const ArrayUtils = {
        unique(arr) {
            return [...new Set(arr)];
        },
        
        chunk(arr, size) {
            const chunks = [];
            for (let i = 0; i < arr.length; i += size) {
                chunks.push(arr.slice(i, i + size));
            }
            return chunks;
        },
        
        shuffle(arr) {
            const shuffled = [...arr];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        },
        
        average(arr) {
            if (!arr.length) return 0;
            return arr.reduce((a, b) => a + b, 0) / arr.length;
        },
        
        sum(arr) {
            return arr.reduce((a, b) => a + b, 0);
        },
        
        min(arr) {
            if (!arr.length) return null;
            return Math.min(...arr);
        },
        
        max(arr) {
            if (!arr.length) return null;
            return Math.max(...arr);
        },
        
        groupBy(arr, key) {
            return arr.reduce((group, item) => {
                const groupKey = item[key];
                group[groupKey] = group[groupKey] || [];
                group[groupKey].push(item);
                return group;
            }, {});
        },
        
        first(arr) {
            return arr && arr.length > 0 ? arr[0] : null;
        },
        
        last(arr) {
            return arr && arr.length > 0 ? arr[arr.length - 1] : null;
        }
    };
    
    const testArray = [1, 2, 2, 3, 3, 3, 4];
    
    // unique test
    testEnv.assert(
        ArrayUtils.unique(testArray).length === 4,
        'unique() takroriy elementlarni olib tashlaydi',
        'unique test'
    );
    
    // chunk test
    const chunked = ArrayUtils.chunk([1, 2, 3, 4, 5], 2);
    testEnv.assert(
        chunked.length === 3 && chunked[0].length === 2,
        'chunk() massivni belgilangan o\'lchamda bo\'laklaydi',
        'chunk test'
    );
    
    // shuffle test
    const original = [1, 2, 3, 4, 5];
    const shuffled = ArrayUtils.shuffle(original);
    testEnv.assert(
        shuffled.length === original.length,
        'shuffle() massiv elementlarini aralashtiradi',
        'shuffle test'
    );
    
    // average test
    testEnv.assert(
        ArrayUtils.average([4, 5, 6]) === 5,
        'average() o\'rtacha qiymatni hisoblaydi',
        'average test'
    );
    
    // sum test
    testEnv.assert(
        ArrayUtils.sum([1, 2, 3, 4, 5]) === 15,
        'sum() elementlar yig\'indisini hisoblaydi',
        'sum test'
    );
    
    // min test
    testEnv.assert(
        ArrayUtils.min([5, 2, 8, 1, 9]) === 1,
        'min() eng kichik elementni topadi',
        'min test'
    );
    
    // max test
    testEnv.assert(
        ArrayUtils.max([5, 2, 8, 1, 9]) === 9,
        'max() eng katta elementni topadi',
        'max test'
    );
    
    // groupBy test
    const students = [
        { name: 'Ali', group: 'A' },
        { name: 'Vali', group: 'B' },
        { name: 'Hasan', group: 'A' }
    ];
    const grouped = ArrayUtils.groupBy(students, 'group');
    testEnv.assert(
        grouped['A'].length === 2,
        'groupBy() elementlarni guruhlaydi',
        'groupBy test'
    );
    
    // first test
    testEnv.assert(
        ArrayUtils.first([1, 2, 3]) === 1,
        'first() birinchi elementni qaytaradi',
        'first test'
    );
    
    // last test
    testEnv.assert(
        ArrayUtils.last([1, 2, 3]) === 3,
        'last() oxirgi elementni qaytaradi',
        'last test'
    );
    
    testEnv.endTest();
}

// ============================================
// 5. OBJECT UTILS TESTLARI
// ============================================

function testObjectUtils() {
    testEnv.startTest();
    
    const ObjectUtils = {
        clone(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        
        merge(target, source) {
            return { ...target, ...source };
        },
        
        isEmpty(obj) {
            return !obj || Object.keys(obj).length === 0;
        },
        
        size(obj) {
            return obj ? Object.keys(obj).length : 0;
        },
        
        keys(obj) {
            return Object.keys(obj);
        },
        
        values(obj) {
            return Object.values(obj);
        },
        
        entries(obj) {
            return Object.entries(obj);
        },
        
        pick(obj, keys) {
            return keys.reduce((result, key) => {
                if (obj.hasOwnProperty(key)) {
                    result[key] = obj[key];
                }
                return result;
            }, {});
        },
        
        omit(obj, keys) {
            const result = { ...obj };
            keys.forEach(key => delete result[key]);
            return result;
        }
    };
    
    const testObj = { name: 'Azimjon', age: 22, city: 'Toshkent' };
    
    // clone test
    const cloned = ObjectUtils.clone(testObj);
    testEnv.assert(
        cloned !== testObj && cloned.name === testObj.name,
        'clone() ob\'ektni chuqur nusxalaydi',
        'clone test'
    );
    
    // merge test
    const merged = ObjectUtils.merge({ a: 1 }, { b: 2 });
    testEnv.assert(
        merged.a === 1 && merged.b === 2,
        'merge() ob\'ektlarni birlashtiradi',
        'merge test'
    );
    
    // isEmpty test
    testEnv.assert(
        ObjectUtils.isEmpty({}) === true,
        'isEmpty() bo\'sh ob\'ekt uchun true qaytaradi',
        'isEmpty true test'
    );
    
    testEnv.assert(
        ObjectUtils.isEmpty(testObj) === false,
        'isEmpty() to\'ldirilgan ob\'ekt uchun false qaytaradi',
        'isEmpty false test'
    );
    
    // size test
    testEnv.assert(
        ObjectUtils.size(testObj) === 3,
        'size() ob\'ektning o\'lchamini qaytaradi',
        'size test'
    );
    
    // keys test
    testEnv.assert(
        ObjectUtils.keys(testObj).length === 3,
        'keys() ob\'ekt kalitlarini qaytaradi',
        'keys test'
    );
    
    // values test
    testEnv.assert(
        ObjectUtils.values(testObj).length === 3,
        'values() ob\'ekt qiymatlarini qaytaradi',
        'values test'
    );
    
    // entries test
    testEnv.assert(
        ObjectUtils.entries(testObj).length === 3,
        'entries() ob\'ekt juftliklarini qaytaradi',
        'entries test'
    );
    
    // pick test
    const picked = ObjectUtils.pick(testObj, ['name', 'age']);
    testEnv.assert(
        picked.name === 'Azimjon' && picked.age === 22 && !picked.city,
        'pick() belgilangan kalitlarni oladi',
        'pick test'
    );
    
    // omit test
    const omitted = ObjectUtils.omit(testObj, ['age']);
    testEnv.assert(
        omitted.name === 'Azimjon' && omitted.city === 'Toshkent' && !omitted.age,
        'omit() belgilangan kalitlarni olib tashlaydi',
        'omit test'
    );
    
    testEnv.endTest();
}

// ============================================
// 6. VALIDATION UTILS TESTLARI
// ============================================

function testValidationUtils() {
    testEnv.startTest();
    
    const ValidationUtils = {
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        isValidPhoneUZ(phone) {
            const cleaned = phone.replace(/[\s\-\(\)]/g, '');
            const re = /^(\+998|998)[0-9]{9}$/;
            return re.test(cleaned);
        },
        
        isValidUrl(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },
        
        isNumber(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },
        
        isAlpha(value) {
            return /^[a-zA-Z]+$/.test(value);
        },
        
        isAlphanumeric(value) {
            return /^[a-zA-Z0-9]+$/.test(value);
        },
        
        isStrongPassword(password) {
            return password.length >= 8 &&
                   /[A-Z]/.test(password) &&
                   /[a-z]/.test(password) &&
                   /[0-9]/.test(password) &&
                   /[^A-Za-z0-9]/.test(password);
        }
    };
    
    // isValidEmail test
    testEnv.assert(
        ValidationUtils.isValidEmail('test@example.com') === true,
        'isValidEmail() to\'g\'ri emailni qabul qiladi',
        'isValidEmail valid test'
    );
    
    testEnv.assert(
        ValidationUtils.isValidEmail('invalid-email') === false,
        'isValidEmail() noto\'g\'ri emailni rad etadi',
        'isValidEmail invalid test'
    );
    
    // isValidPhoneUZ test
    testEnv.assert(
        ValidationUtils.isValidPhoneUZ('+998901234567') === true,
        'isValidPhoneUZ() to\'g\'ri telefon raqamni qabul qiladi',
        'isValidPhoneUZ valid test'
    );
    
    testEnv.assert(
        ValidationUtils.isValidPhoneUZ('12345') === false,
        'isValidPhoneUZ() noto\'g\'ri telefon raqamni rad etadi',
        'isValidPhoneUZ invalid test'
    );
    
    // isValidUrl test
    testEnv.assert(
        ValidationUtils.isValidUrl('https://example.com') === true,
        'isValidUrl() to\'g\'ri URLni qabul qiladi',
        'isValidUrl valid test'
    );
    
    testEnv.assert(
        ValidationUtils.isValidUrl('not-a-url') === false,
        'isValidUrl() noto\'g\'ri URLni rad etadi',
        'isValidUrl invalid test'
    );
    
    // isNumber test
    testEnv.assert(
        ValidationUtils.isNumber(123) === true,
        'isNumber() raqamni aniqlaydi',
        'isNumber test'
    );
    
    testEnv.assert(
        ValidationUtils.isNumber('abc') === false,
        'isNumber() matnni raqam deb hisoblamaydi',
        'isNumber string test'
    );
    
    // isAlpha test
    testEnv.assert(
        ValidationUtils.isAlpha('abc') === true,
        'isAlpha() faqat harflarni qabul qiladi',
        'isAlpha valid test'
    );
    
    testEnv.assert(
        ValidationUtils.isAlpha('abc123') === false,
        'isAlpha() raqamlarni rad etadi',
        'isAlpha invalid test'
    );
    
    // isAlphanumeric test
    testEnv.assert(
        ValidationUtils.isAlphanumeric('abc123') === true,
        'isAlphanumeric() harf va raqamlarni qabul qiladi',
        'isAlphanumeric valid test'
    );
    
    testEnv.assert(
        ValidationUtils.isAlphanumeric('abc!@#') === false,
        'isAlphanumeric() maxsus belgilarni rad etadi',
        'isAlphanumeric invalid test'
    );
    
    // isStrongPassword test
    testEnv.assert(
        ValidationUtils.isStrongPassword('Password123!') === true,
        'isStrongPassword() kuchli parolni qabul qiladi',
        'isStrongPassword valid test'
    );
    
    testEnv.assert(
        ValidationUtils.isStrongPassword('weak') === false,
        'isStrongPassword() zaif parolni rad etadi',
        'isStrongPassword invalid test'
    );
    
    testEnv.endTest();
}

// ============================================
// 7. COLOR UTILS TESTLARI
// ============================================

function testColorUtils() {
    testEnv.startTest();
    
    const ColorUtils = {
        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },
        
        rgbToHex(r, g, b) {
            return '#' + [r, g, b].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');
        },
        
        isDark(hex) {
            const rgb = this.hexToRgb(hex);
            if (!rgb) return false;
            const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
            return brightness < 128;
        },
        
        isLight(hex) {
            return !this.isDark(hex);
        },
        
        randomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        
        lighten(hex, percent) {
            const rgb = this.hexToRgb(hex);
            if (!rgb) return hex;
            const r = Math.min(255, rgb.r + (255 - rgb.r) * percent / 100);
            const g = Math.min(255, rgb.g + (255 - rgb.g) * percent / 100);
            const b = Math.min(255, rgb.b + (255 - rgb.b) * percent / 100);
            return this.rgbToHex(Math.round(r), Math.round(g), Math.round(b));
        },
        
        darken(hex, percent) {
            const rgb = this.hexToRgb(hex);
            if (!rgb) return hex;
            const r = Math.max(0, rgb.r * (100 - percent) / 100);
            const g = Math.max(0, rgb.g * (100 - percent) / 100);
            const b = Math.max(0, rgb.b * (100 - percent) / 100);
            return this.rgbToHex(Math.round(r), Math.round(g), Math.round(b));
        }
    };
    
    // hexToRgb test
    const rgb = ColorUtils.hexToRgb('#3b82f6');
    testEnv.assert(
        rgb && rgb.r === 59 && rgb.g === 130 && rgb.b === 246,
        'hexToRgb() HEX rangni RGB ga o\'tkazadi',
        'hexToRgb test'
    );
    
    // rgbToHex test
    const hex = ColorUtils.rgbToHex(59, 130, 246);
    testEnv.assert(
        hex === '#3b82f6',
        'rgbToHex() RGB rangni HEX ga o\'tkazadi',
        'rgbToHex test'
    );
    
    // isDark test
    testEnv.assert(
        ColorUtils.isDark('#000000') === true,
        'isDark() qora rangni to\'q deb aniqlaydi',
        'isDark black test'
    );
    
    testEnv.assert(
        ColorUtils.isDark('#ffffff') === false,
        'isDark() oq rangni och deb aniqlaydi',
        'isDark white test'
    );
    
    // isLight test
    testEnv.assert(
        ColorUtils.isLight('#ffffff') === true,
        'isLight() oq rangni och deb aniqlaydi',
        'isLight white test'
    );
    
    // randomColor test
    const randomColor = ColorUtils.randomColor();
    testEnv.assert(
        /^#[0-9A-F]{6}$/i.test(randomColor),
        'randomColor() random rang yaratadi',
        'randomColor test'
    );
    
    // lighten test
    const lightened = ColorUtils.lighten('#000000', 50);
    testEnv.assert(
        lightened !== '#000000',
        'lighten() rangni ochroq qiladi',
        'lighten test'
    );
    
    // darken test
    const darkened = ColorUtils.darken('#ffffff', 50);
    testEnv.assert(
        darkened !== '#ffffff',
        'darken() rangni to\'qroq qiladi',
        'darken test'
    );
    
    testEnv.endTest();
}

// ============================================
// 8. BROWSER UTILS TESTLARI
// ============================================

function testBrowserUtils() {
    testEnv.startTest();
    
    const BrowserUtils = {
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        isDesktop() {
            return !this.isMobile();
        },
        
        getUrlParams() {
            const params = new URLSearchParams(window.location.search);
            const result = {};
            for (const [key, value] of params) {
                result[key] = value;
            }
            return result;
        },
        
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        
        copyToClipboard(text) {
            navigator.clipboard.writeText(text);
        },
        
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        },
        
        setCookie(name, value, days = 7) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
        },
        
        deleteCookie(name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    };
    
    // isMobile test (funksiya mavjudligi)
    testEnv.assert(
        typeof BrowserUtils.isMobile === 'function',
        'isMobile() funksiyasi mavjud',
        'isMobile exists test'
    );
    
    // isDesktop test
    testEnv.assert(
        typeof BrowserUtils.isDesktop === 'function',
        'isDesktop() funksiyasi mavjud',
        'isDesktop exists test'
    );
    
    // getUrlParams test
    testEnv.assert(
        typeof BrowserUtils.getUrlParams === 'function',
        'getUrlParams() funksiyasi mavjud',
        'getUrlParams exists test'
    );
    
    // scrollToTop test
    testEnv.assert(
        typeof BrowserUtils.scrollToTop === 'function',
        'scrollToTop() funksiyasi mavjud',
        'scrollToTop exists test'
    );
    
    // copyToClipboard test
    testEnv.assert(
        typeof BrowserUtils.copyToClipboard === 'function',
        'copyToClipboard() funksiyasi mavjud',
        'copyToClipboard exists test'
    );
    
    // cookie testlari
    testEnv.assert(
        typeof BrowserUtils.getCookie === 'function',
        'getCookie() funksiyasi mavjud',
        'getCookie exists test'
    );
    
    testEnv.assert(
        typeof BrowserUtils.setCookie === 'function',
        'setCookie() funksiyasi mavjud',
        'setCookie exists test'
    );
    
    testEnv.assert(
        typeof BrowserUtils.deleteCookie === 'function',
        'deleteCookie() funksiyasi mavjud',
        'deleteCookie exists test'
    );
    
    testEnv.endTest();
}

// ============================================
// 9. BARCHA TESTLARNI ISHGA TUSHIRISH
// ============================================

function runAllUtilsTests() {
    console.log('========================================');
    console.log('   EDUHEMIS - UTILS TESTLARI');
    console.log('========================================\n');
    
    testStringUtils();
    console.log('');
    testNumberUtils();
    console.log('');
    testDateUtils();
    console.log('');
    testArrayUtils();
    console.log('');
    testObjectUtils();
    console.log('');
    testValidationUtils();
    console.log('');
    testColorUtils();
    console.log('');
    testBrowserUtils();
    
    console.log('\n========================================');
    console.log('   TESTLAR TUGADI');
    console.log('========================================');
}

// Testlarni ishga tushirish
if (typeof window !== 'undefined') {
    window.runAllUtilsTests = runAllUtilsTests;
}

// Node.js muhiti uchun
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testStringUtils,
        testNumberUtils,
        testDateUtils,
        testArrayUtils,
        testObjectUtils,
        testValidationUtils,
        testColorUtils,
        testBrowserUtils,
        runAllUtilsTests
    };
}