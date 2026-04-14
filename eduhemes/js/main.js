/* ============================================
   EduHemis - Asosiy JavaScript fayli
   Barcha umumiy funksiyalar shu yerda
   ============================================ */

// ============================================
// 1. GLOBAL O'ZGARUVCHILAR
// ============================================
const APP = {
    name: 'EduHemis',
    version: '1.0.0',
    author: 'EduHemis Team',
    year: new Date().getFullYear()
};

let currentUser = null;
let currentLanguage = 'uz';

// ============================================
// 2. MA'LUMOTLAR BAZASI (LocalStorage)
// ============================================
const DB = {
    // Ma'lumotlar
    users: [],
    students: [],
    teachers: [],
    lessons: [],
    tasks: [],
    grades: [],
    
    // Yuklash
    load() {
        try {
            this.users = JSON.parse(localStorage.getItem('users')) || [];
            this.students = JSON.parse(localStorage.getItem('students')) || [];
            this.teachers = JSON.parse(localStorage.getItem('teachers')) || [];
            this.lessons = JSON.parse(localStorage.getItem('lessons')) || [];
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            this.grades = JSON.parse(localStorage.getItem('grades')) || [];
            
            console.log('✅ Ma\'lumotlar yuklandi');
        } catch (error) {
            console.error('❌ Ma\'lumotlarni yuklashda xatolik:', error);
            this.init();
        }
    },
    
    // Saqlash
    save() {
        try {
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.setItem('students', JSON.stringify(this.students));
            localStorage.setItem('teachers', JSON.stringify(this.teachers));
            localStorage.setItem('lessons', JSON.stringify(this.lessons));
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('grades', JSON.stringify(this.grades));
            
            console.log('✅ Ma\'lumotlar saqlandi');
            return true;
        } catch (error) {
            console.error('❌ Ma\'lumotlarni saqlashda xatolik:', error);
            return false;
        }
    },
    
    // Tozalash
    clear() {
        if (confirm('Haqiqatan ham barcha ma\'lumotlarni o\'chirmoqchimisiz?')) {
            localStorage.clear();
            this.init();
            showToast('Barcha ma\'lumotlar o\'chirildi', 'warning');
            return true;
        }
        return false;
    },
    
    // Boshlang'ich ma'lumotlar
    init() {
        this.users = [
            { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Admin User', email: 'admin@edu.uz', createdAt: new Date().toISOString() },
            { id: 2, username: 'teacher', password: '123', role: 'teacher', name: 'Said Alisherov', subject: 'Veb dasturlash', email: 's.alisherov@edu.uz', createdAt: new Date().toISOString() },
            { id: 3, username: 'student', password: '123', role: 'student', name: 'Azimjon Karimov', group: 'AT-101-20', email: 'a.karimov@student.uz', createdAt: new Date().toISOString() }
        ];
        
        this.students = [
            { id: 3, name: 'Azimjon Karimov', group: 'AT-101-20', email: 'a.karimov@student.uz' }
        ];
        
        this.teachers = [
            { id: 2, name: 'Said Alisherov', subject: 'Veb dasturlash', email: 's.alisherov@edu.uz' }
        ];
        
        this.lessons = [
            { id: 1, teacherId: 2, group: 'AT-101-20', subject: 'Veb dasturlash', topic: 'HTML asoslari', date: '2025-03-20', room: '402', time: '09:00-10:20' }
        ];
        
        this.tasks = [
            { id: 1, teacherId: 2, group: 'AT-101-20', title: 'HTML portfolio', description: 'Shaxsiy portfolio yaratish', deadline: '2025-03-25', students: [{ studentId: 3, status: 'pending' }] }
        ];
        
        this.grades = [
            { id: 1, studentId: 3, subject: 'Veb dasturlash', grade: 5, date: '2025-03-10' }
        ];
        
        this.save();
        console.log('✅ Boshlang\'ich ma\'lumotlar yaratildi');
    },
    
    // Yangi ID yaratish
    newId(collection) {
        if (!this[collection] || this[collection].length === 0) return 1;
        return Math.max(...this[collection].map(item => item.id)) + 1;
    }
};

// ============================================
// 3. UTILITY FUNKSIYALAR
// ============================================
const Utils = {
    // Sanani formatlash
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    },
    
    // Vaqtni formatlash
    formatTime(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleTimeString('uz-UZ', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // Sanani va vaqtni formatlash
    formatDateTime(date) {
        if (!date) return '';
        return `${this.formatDate(date)} ${this.formatTime(date)}`;
    },
    
    // Kunlar farqini hisoblash
    daysDiff(date1, date2 = new Date()) {
        const d1 = new Date(date1).setHours(0,0,0,0);
        const d2 = new Date(date2).setHours(0,0,0,0);
        return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
    },
    
    // Random rang
    randomColor() {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    // Random ID
    randomId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    },
    
    // Matnni kesish
    truncate(text, length = 50) {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    },
    
    // Email validatsiya
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Telefon validatsiya
    isValidPhone(phone) {
        const re = /^\+?[0-9]{9,15}$/;
        return re.test(phone.replace(/[^0-9+]/g, ''));
    },
    
    // Slug yaratish
    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    },
    
    // Capitalize
    capitalize(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    
    // Object ni klonlash
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // LocalStorage dan o'qish
    getStorage(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    
    // LocalStorage ga yozish
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    }
};

// ============================================
// 4. UI FUNKSIYALAR
// ============================================
const UI = {
    // Modal oyna
    modal: {
        show(content, title = '') {
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');
            
            if (title) {
                content = `<h3 class="text-xl font-bold mb-4">${title}</h3>${content}`;
            }
            
            modalContent.innerHTML = content;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        },
        
        hide() {
            document.getElementById('modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        },
        
        setContent(content) {
            document.getElementById('modalContent').innerHTML = content;
        }
    },
    
    // Toast xabarlar
    toast: {
        show(message, type = 'success', duration = 3000) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = 'toast';
            
            switch(type) {
                case 'success':
                    toast.classList.add('toast-success');
                    break;
                case 'error':
                    toast.classList.add('toast-error');
                    break;
                case 'warning':
                    toast.classList.add('toast-warning');
                    break;
                case 'info':
                    toast.classList.add('toast-info');
                    break;
            }
            
            toast.style.display = 'block';
            
            setTimeout(() => {
                toast.style.display = 'none';
            }, duration);
        },
        
        success(message, duration = 3000) {
            this.show(message, 'success', duration);
        },
        
        error(message, duration = 3000) {
            this.show(message, 'error', duration);
        },
        
        warning(message, duration = 3000) {
            this.show(message, 'warning', duration);
        },
        
        info(message, duration = 3000) {
            this.show(message, 'info', duration);
        }
    },
    
    // Loading spinner
    loading: {
        show(container) {
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.id = 'loading-spinner';
            
            if (container) {
                container.innerHTML = '';
                container.appendChild(spinner);
            } else {
                document.body.appendChild(spinner);
            }
        },
        
        hide(container) {
            const spinner = document.getElementById('loading-spinner');
            if (spinner) spinner.remove();
        }
    },
    
    // Confirm dialog
    confirm(message, callback) {
        if (confirm(message)) {
            callback();
        }
    },
    
    // Alert dialog
    alert(message) {
        alert(message);
    },
    
    // Prompt dialog
    prompt(message, defaultValue = '', callback) {
        const result = prompt(message, defaultValue);
        if (result !== null) {
            callback(result);
        }
    }
};

// ============================================
// 5. VALIDATSIYA FUNKSIYALARI
// ============================================
const Validator = {
    // Bo'sh emas
    required(value, fieldName = 'Bu maydon') {
        if (!value || value.trim() === '') {
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
    
    // Email
    email(value, fieldName = 'Email') {
        if (value && !Utils.isValidEmail(value)) {
            return `${fieldName} noto'g'ri formatda`;
        }
        return null;
    },
    
    // Telefon
    phone(value, fieldName = 'Telefon') {
        if (value && !Utils.isValidPhone(value)) {
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
    
    // Formani tekshirish
    validateForm(formData, rules) {
        const errors = {};
        
        for (const [field, fieldRules] of Object.entries(rules)) {
            const value = formData[field];
            
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
    }
};

// ============================================
// 6. EVENT HANDLERLAR
// ============================================
const Events = {
    // Event larni saqlash
    _events: {},
    
    // Event qo'shish
    on(event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    },
    
    // Event ni chaqirish
    emit(event, data) {
        if (this._events[event]) {
            this._events[event].forEach(callback => callback(data));
        }
    },
    
    // Event ni o'chirish
    off(event, callback) {
        if (this._events[event]) {
            this._events[event] = this._events[event].filter(cb => cb !== callback);
        }
    }
};

// ============================================
// 7. ROUTER (Sahifa navigatsiyasi)
// ============================================
const Router = {
    routes: {},
    
    add(path, callback) {
        this.routes[path] = callback;
    },
    
    navigate(path) {
        window.location.hash = path;
        if (this.routes[path]) {
            this.routes[path]();
        }
    },
    
    init() {
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.slice(1) || '/';
            if (this.routes[path]) {
                this.routes[path]();
            }
        });
        
        const path = window.location.hash.slice(1) || '/';
        if (this.routes[path]) {
            setTimeout(() => this.routes[path](), 100);
        }
    }
};

// ============================================
// 8. THEME (Mavzu)
// ============================================
const Theme = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.set(savedTheme);
    },
    
    set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        Events.emit('themeChange', theme);
    },
    
    toggle() {
        const current = localStorage.getItem('theme') || 'light';
        this.set(current === 'light' ? 'dark' : 'light');
    },
    
    get() {
        return localStorage.getItem('theme') || 'light';
    }
};

// ============================================
// 9. LANGUAGE (Til)
// ============================================
const Language = {
    translations: {
        uz: {
            welcome: 'Xush kelibsiz',
            login: 'Kirish',
            register: 'Ro\'yxatdan o\'tish',
            dashboard: 'Bosh sahifa',
            profile: 'Profil',
            teachers: 'O\'qituvchilar',
            students: 'Talabalar',
            lessons: 'Darslar',
            tasks: 'Vazifalar',
            grades: 'Baholar',
            settings: 'Sozlamalar',
            logout: 'Chiqish'
        },
        ru: {
            welcome: 'Добро пожаловать',
            login: 'Вход',
            register: 'Регистрация',
            dashboard: 'Главная',
            profile: 'Профиль',
            teachers: 'Учителя',
            students: 'Студенты',
            lessons: 'Уроки',
            tasks: 'Задания',
            grades: 'Оценки',
            settings: 'Настройки',
            logout: 'Выход'
        },
        en: {
            welcome: 'Welcome',
            login: 'Login',
            register: 'Register',
            dashboard: 'Dashboard',
            profile: 'Profile',
            teachers: 'Teachers',
            students: 'Students',
            lessons: 'Lessons',
            tasks: 'Tasks',
            grades: 'Grades',
            settings: 'Settings',
            logout: 'Logout'
        }
    },
    
    init() {
        const savedLang = localStorage.getItem('language') || 'uz';
        this.set(savedLang);
    },
    
    set(lang) {
        if (this.translations[lang]) {
            currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.updateUI();
            Events.emit('languageChange', lang);
        }
    },
    
    t(key) {
        return this.translations[currentLanguage]?.[key] || key;
    },
    
    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
    }
};

// ============================================
// 10. SEARCH (Qidiruv)
// ============================================
const Search = {
    // Qidiruv funksiyasi
    search(items, query, fields = ['name']) {
        if (!query) return items;
        
        query = query.toLowerCase();
        
        return items.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toString().toLowerCase().includes(query);
            });
        });
    },
    
    // Filter
    filter(items, filters) {
        return items.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                return item[key] === value;
            });
        });
    },
    
    // Sort
    sort(items, field, direction = 'asc') {
        return [...items].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            
            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    },
    
    // Paginate
    paginate(items, page = 1, perPage = 10) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        
        return {
            items: items.slice(start, end),
            total: items.length,
            page,
            perPage,
            totalPages: Math.ceil(items.length / perPage)
        };
    }
};

// ============================================
// 11. EXPORT (Ma'lumotlarni eksport qilish)
// ============================================
const Export = {
    // CSV formatida eksport
    toCSV(data, filename = 'export.csv') {
        if (!data || !data.length) return;
        
        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => headers.map(field => JSON.stringify(row[field] || '')).join(','))
        ].join('\n');
        
        this.download(csv, filename, 'text/csv');
    },
    
    // JSON formatida eksport
    toJSON(data, filename = 'export.json') {
        const json = JSON.stringify(data, null, 2);
        this.download(json, filename, 'application/json');
    },
    
    // Faylni yuklab olish
    download(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
};

// ============================================
// 12. KEYBOARD SHORTCUTS
// ============================================
const Keyboard = {
    shortcuts: {},
    
    add(shortcut, callback, description = '') {
        this.shortcuts[shortcut] = { callback, description };
    },
    
    init() {
        document.addEventListener('keydown', (e) => {
            const key = [];
            if (e.ctrlKey) key.push('Ctrl');
            if (e.altKey) key.push('Alt');
            if (e.shiftKey) key.push('Shift');
            key.push(e.key);
            
            const shortcut = key.join('+');
            
            if (this.shortcuts[shortcut]) {
                e.preventDefault();
                this.shortcuts[shortcut].callback();
            }
        });
    }
};

// ============================================
// 13. SAHIFA YUKLANGANDA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log(`✅ ${APP.name} v${APP.version} ishga tushdi`);
    
    // Ma'lumotlarni yuklash
    DB.load();
    
    // Theme ni yuklash
    Theme.init();
    
    // Language ni yuklash
    Language.init();
    
    // Keyboard shortcuts
    Keyboard.init();
    
    // Router ni ishga tushirish
    Router.init();
    
    // Modal yopish
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            UI.modal.hide();
        }
    };
    
    // Escape tugmasi
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            UI.modal.hide();
        }
    });
});

// ============================================
// 14. GLOBAL OBYEKTLAR
// ============================================
window.APP = APP;
window.DB = DB;
window.Utils = Utils;
window.UI = UI;
window.Validator = Validator;
window.Events = Events;
window.Router = Router;
window.Theme = Theme;
window.Language = Language;
window.Search = Search;
window.Export = Export;
window.Keyboard = Keyboard;

// ============================================
// 15. YORDAMCHI FUNKSIYALAR (Qisqa nomlar)
// ============================================
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const showModal = (content, title) => UI.modal.show(content, title);
const closeModal = () => UI.modal.hide();
const showToast = (msg, type) => UI.toast.show(msg, type);
const showSuccess = (msg) => UI.toast.success(msg);
const showError = (msg) => UI.toast.error(msg);
const showWarning = (msg) => UI.toast.warning(msg);
const showInfo = (msg) => UI.toast.info(msg);

// ============================================
// 16. DEBUG FUNKSIYALARI
// ============================================
const Debug = {
    log(...args) {
        if (APP.debug) console.log(...args);
    },
    
    info(...args) {
        if (APP.debug) console.info(...args);
    },
    
    warn(...args) {
        if (APP.debug) console.warn(...args);
    },
    
    error(...args) {
        if (APP.debug) console.error(...args);
    },
    
    table(data) {
        if (APP.debug) console.table(data);
    }
};

// ============================================
// 17. PERFORMANCE MONITORING
// ============================================
const Performance = {
    marks: {},
    
    start(name) {
        this.marks[name] = performance.now();
    },
    
    end(name) {
        const end = performance.now();
        const start = this.marks[name];
        if (start) {
            const duration = end - start;
            console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
            delete this.marks[name];
            return duration;
        }
        return null;
    }
};

// ============================================
// 18. OFFLINE DETECTOR
// ============================================
const OfflineDetector = {
    init() {
        window.addEventListener('online', () => {
            UI.toast.success('Internet aloqasi tiklandi');
        });
        
        window.addEventListener('offline', () => {
            UI.toast.warning('Internet aloqasi yo\'q', 'warning');
        });
    }
};

// ============================================
// 19. VERSION CHECK
// ============================================
const Version = {
    check() {
        const savedVersion = localStorage.getItem('app_version');
        if (savedVersion !== APP.version) {
            console.log(`🔄 Yangi versiya: ${APP.version}`);
            localStorage.setItem('app_version', APP.version);
            
            // Eski ma'lumotlarni yangilash
            this.migrate(savedVersion);
        }
    },
    
    migrate(oldVersion) {
        // Ma'lumotlar migratsiyasi
        console.log(`📦 Ma'lumotlar migratsiyasi: ${oldVersion} -> ${APP.version}`);
    }
};

// ============================================
// 20. INITIALIZATION
// ============================================
OfflineDetector.init();
Version.check();

console.log(`🚀 ${APP.name} v${APP.version} tayyor`);