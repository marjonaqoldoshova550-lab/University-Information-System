/* ============================================
   EduHemis - Storage (Saqlash funksiyalari)
   LocalStorage, SessionStorage boshqaruvi
   ============================================ */

// ============================================
// 1. LOCALSTORAGE MANAGER
// ============================================

const LocalStorageManager = {
    /**
     * Ma'lumotni saqlash
     * @param {string} key - Kalit
     * @param {any} value - Qiymat
     * @returns {boolean}
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('LocalStorage save error:', error);
            return false;
        }
    },

    /**
     * Ma'lumotni olish
     * @param {string} key - Kalit
     * @param {any} defaultValue - Standart qiymat
     * @returns {any}
     */
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('LocalStorage get error:', error);
            return defaultValue;
        }
    },

    /**
     * Ma'lumotni o'chirish
     * @param {string} key - Kalit
     * @returns {boolean}
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('LocalStorage remove error:', error);
            return false;
        }
    },

    /**
     * Barcha ma'lumotlarni o'chirish
     * @returns {boolean}
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('LocalStorage clear error:', error);
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
     * Saqlangan ma'lumotlar soni
     * @returns {number}
     */
    size() {
        return localStorage.length;
    },

    /**
     * Barcha ma'lumotlarni olish
     * @returns {Object}
     */
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

    /**
     * Ma'lumotlarni eksport qilish
     * @returns {string}
     */
    export() {
        return JSON.stringify(this.getAll(), null, 2);
    },

    /**
     * Ma'lumotlarni import qilish
     * @param {string} json - JSON string
     * @returns {boolean}
     */
    import(json) {
        try {
            const data = JSON.parse(json);
            this.clear();
            for (const [key, value] of Object.entries(data)) {
                this.set(key, value);
            }
            return true;
        } catch (error) {
            console.error('LocalStorage import error:', error);
            return false;
        }
    },

    /**
     * Ma'lumotlarni yangilash (agar mavjud bo'lsa)
     * @param {string} key - Kalit
     * @param {any} value - Qiymat
     * @returns {boolean}
     */
    update(key, value) {
        if (this.has(key)) {
            return this.set(key, value);
        }
        return false;
    },

    /**
     * Ma'lumotlarni qo'shish yoki yangilash
     * @param {string} key - Kalit
     * @param {any} value - Qiymat
     * @returns {boolean}
     */
    upsert(key, value) {
        return this.set(key, value);
    }
};

// ============================================
// 2. SESSIONSTORAGE MANAGER
// ============================================

const SessionStorageManager = {
    /**
     * Ma'lumotni saqlash
     * @param {string} key - Kalit
     * @param {any} value - Qiymat
     * @returns {boolean}
     */
    set(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('SessionStorage save error:', error);
            return false;
        }
    },

    /**
     * Ma'lumotni olish
     * @param {string} key - Kalit
     * @param {any} defaultValue - Standart qiymat
     * @returns {any}
     */
    get(key, defaultValue = null) {
        try {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('SessionStorage get error:', error);
            return defaultValue;
        }
    },

    /**
     * Ma'lumotni o'chirish
     * @param {string} key - Kalit
     * @returns {boolean}
     */
    remove(key) {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('SessionStorage remove error:', error);
            return false;
        }
    },

    /**
     * Barcha ma'lumotlarni o'chirish
     * @returns {boolean}
     */
    clear() {
        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('SessionStorage clear error:', error);
            return false;
        }
    },

    /**
     * Kalit mavjudligini tekshirish
     * @param {string} key - Kalit
     * @returns {boolean}
     */
    has(key) {
        return sessionStorage.getItem(key) !== null;
    },

    /**
     * Barcha kalitlarni olish
     * @returns {Array}
     */
    keys() {
        return Object.keys(sessionStorage);
    },

    /**
     * Saqlangan ma'lumotlar soni
     * @returns {number}
     */
    size() {
        return sessionStorage.length;
    },

    /**
     * Barcha ma'lumotlarni olish
     * @returns {Object}
     */
    getAll() {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            try {
                data[key] = JSON.parse(sessionStorage.getItem(key));
            } catch {
                data[key] = sessionStorage.getItem(key);
            }
        }
        return data;
    }
};

// ============================================
// 3. COOKIE MANAGER
// ============================================

const CookieManager = {
    /**
     * Cookie saqlash
     * @param {string} name - Cookie nomi
     * @param {string} value - Qiymat
     * @param {number} days - Kunlar (ixtiyoriy)
     * @param {string} path - Yo'l (ixtiyoriy)
     */
    set(name, value, days = null, path = '/') {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value}${expires}; path=${path}`;
    },

    /**
     * Cookie olish
     * @param {string} name - Cookie nomi
     * @returns {string|null}
     */
    get(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    /**
     * Cookie o'chirish
     * @param {string} name - Cookie nomi
     * @param {string} path - Yo'l (ixtiyoriy)
     */
    delete(name, path = '/') {
        this.set(name, '', -1, path);
    },

    /**
     * Barcha cookielarni olish
     * @returns {Object}
     */
    getAll() {
        const cookies = {};
        document.cookie.split(';').forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name && value) {
                cookies[name.trim()] = value;
            }
        });
        return cookies;
    },

    /**
     * Cookie mavjudligini tekshirish
     * @param {string} name - Cookie nomi
     * @returns {boolean}
     */
    has(name) {
        return this.get(name) !== null;
    },

    /**
     * Barcha cookielarni o'chirish
     */
    clear() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this.delete(name.trim());
        }
    }
};

// ============================================
// 4. INDEXEDDB MANAGER (Katta ma'lumotlar uchun)
// ============================================

class IndexedDBManager {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    /**
     * Ma'lumotlar bazasini ochish
     * @param {Array} stores - Storelar ro'yxati
     * @returns {Promise}
     */
    open(stores = []) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                stores.forEach(store => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        const objectStore = db.createObjectStore(store.name, { keyPath: store.keyPath || 'id' });
                        if (store.indexes) {
                            store.indexes.forEach(index => {
                                objectStore.createIndex(index.name, index.keyPath, { unique: index.unique || false });
                            });
                        }
                    }
                });
            };
        });
    }

    /**
     * Ma'lumot qo'shish
     * @param {string} storeName - Store nomi
     * @param {any} data - Ma'lumot
     * @returns {Promise}
     */
    add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Ma'lumot olish
     * @param {string} storeName - Store nomi
     * @param {any} id - ID
     * @returns {Promise}
     */
    get(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Barcha ma'lumotlarni olish
     * @param {string} storeName - Store nomi
     * @returns {Promise}
     */
    getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Ma'lumotni yangilash
     * @param {string} storeName - Store nomi
     * @param {any} data - Ma'lumot
     * @returns {Promise}
     */
    update(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Ma'lumotni o'chirish
     * @param {string} storeName - Store nomi
     * @param {any} id - ID
     * @returns {Promise}
     */
    delete(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Storeni tozalash
     * @param {string} storeName - Store nomi
     * @returns {Promise}
     */
    clear(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Ma'lumotlar bazasini yopish
     */
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}

// ============================================
// 5. EDUHEMIS MAXSUS STORAGE
// ============================================

const EduStorage = {
    // Foydalanuvchi ma'lumotlari
    saveUser(user) {
        return LocalStorageManager.set('currentUser', user);
    },

    getUser() {
        return LocalStorageManager.get('currentUser', null);
    },

    clearUser() {
        return LocalStorageManager.remove('currentUser');
    },

    // Sozlamalar
    saveSettings(settings) {
        return LocalStorageManager.set('settings', settings);
    },

    getSettings() {
        return LocalStorageManager.get('settings', {});
    },

    updateSettings(updates) {
        const settings = this.getSettings();
        const newSettings = { ...settings, ...updates };
        return this.saveSettings(newSettings);
    },

    // Mavzu
    saveTheme(theme) {
        return LocalStorageManager.set('theme', theme);
    },

    getTheme() {
        return LocalStorageManager.get('theme', 'light');
    },

    // Til
    saveLanguage(lang) {
        return LocalStorageManager.set('language', lang);
    },

    getLanguage() {
        return LocalStorageManager.get('language', 'uz');
    },

    // Sessiya
    saveSession(session) {
        return SessionStorageManager.set('session', session);
    },

    getSession() {
        return SessionStorageManager.get('session', null);
    },

    clearSession() {
        return SessionStorageManager.remove('session');
    },

    // Token
    saveToken(token) {
        return LocalStorageManager.set('auth_token', token);
    },

    getToken() {
        return LocalStorageManager.get('auth_token', null);
    },

    clearToken() {
        return LocalStorageManager.remove('auth_token');
    },

    // Bildirishnomalar
    saveNotifications(notifications) {
        return LocalStorageManager.set('notifications', notifications);
    },

    getNotifications() {
        return LocalStorageManager.get('notifications', []);
    },

    addNotification(notification) {
        const notifications = this.getNotifications();
        notifications.unshift({ ...notification, id: Date.now(), read: false, createdAt: new Date().toISOString() });
        if (notifications.length > 100) notifications.pop();
        return this.saveNotifications(notifications);
    },

    markNotificationAsRead(id) {
        const notifications = this.getNotifications();
        const index = notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            notifications[index].read = true;
            return this.saveNotifications(notifications);
        }
        return false;
    },

    markAllNotificationsAsRead() {
        const notifications = this.getNotifications();
        notifications.forEach(n => n.read = true);
        return this.saveNotifications(notifications);
    },

    getUnreadNotificationsCount() {
        const notifications = this.getNotifications();
        return notifications.filter(n => !n.read).length;
    },

    clearNotifications() {
        return LocalStorageManager.remove('notifications');
    },

    // Xabarlar
    saveMessages(messages) {
        return LocalStorageManager.set('messages', messages);
    },

    getMessages() {
        return LocalStorageManager.get('messages', []);
    },

    addMessage(message) {
        const messages = this.getMessages();
        messages.unshift({ ...message, id: Date.now(), read: false, createdAt: new Date().toISOString() });
        if (messages.length > 500) messages.pop();
        return this.saveMessages(messages);
    },

    markMessageAsRead(id) {
        const messages = this.getMessages();
        const index = messages.findIndex(m => m.id === id);
        if (index !== -1) {
            messages[index].read = true;
            return this.saveMessages(messages);
        }
        return false;
    },

    getUnreadMessagesCount() {
        const messages = this.getMessages();
        return messages.filter(m => !m.read).length;
    },

    // Vazifalar (talaba uchun)
    saveTasks(tasks) {
        return LocalStorageManager.set('tasks', tasks);
    },

    getTasks() {
        return LocalStorageManager.get('tasks', []);
    },

    updateTaskStatus(taskId, status) {
        const tasks = this.getTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
            if (status === 'submitted') {
                task.submittedAt = new Date().toISOString();
            }
            return this.saveTasks(tasks);
        }
        return false;
    },

    // Baholar
    saveGrades(grades) {
        return LocalStorageManager.set('grades', grades);
    },

    getGrades() {
        return LocalStorageManager.get('grades', []);
    },

    // Davomat
    saveAttendance(attendance) {
        return LocalStorageManager.set('attendance', attendance);
    },

    getAttendance() {
        return LocalStorageManager.get('attendance', []);
    },

    // Eslatmalar
    saveReminders(reminders) {
        return LocalStorageManager.set('reminders', reminders);
    },

    getReminders() {
        return LocalStorageManager.get('reminders', []);
    },

    addReminder(reminder) {
        const reminders = this.getReminders();
        reminders.push({ ...reminder, id: Date.now(), completed: false, createdAt: new Date().toISOString() });
        return this.saveReminders(reminders);
    },

    completeReminder(id) {
        const reminders = this.getReminders();
        const reminder = reminders.find(r => r.id === id);
        if (reminder) {
            reminder.completed = true;
            reminder.completedAt = new Date().toISOString();
            return this.saveReminders(reminders);
        }
        return false;
    },

    deleteReminder(id) {
        const reminders = this.getReminders();
        const filtered = reminders.filter(r => r.id !== id);
        return this.saveReminders(filtered);
    },

    // Qidiruv tarixi
    saveSearchHistory(query) {
        let history = LocalStorageManager.get('searchHistory', []);
        history.unshift({ query, timestamp: new Date().toISOString() });
        if (history.length > 20) history.pop();
        return LocalStorageManager.set('searchHistory', history);
    },

    getSearchHistory() {
        return LocalStorageManager.get('searchHistory', []);
    },

    clearSearchHistory() {
        return LocalStorageManager.remove('searchHistory');
    },

    // Zaxira
    backup() {
        const backup = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            data: {
                users: LocalStorageManager.get('users', []),
                students: LocalStorageManager.get('students', []),
                teachers: LocalStorageManager.get('teachers', []),
                groups: LocalStorageManager.get('groups', []),
                subjects: LocalStorageManager.get('subjects', []),
                lessons: LocalStorageManager.get('lessons', []),
                tasks: LocalStorageManager.get('tasks', []),
                grades: LocalStorageManager.get('grades', []),
                attendance: LocalStorageManager.get('attendance', []),
                settings: LocalStorageManager.get('settings', {})
            }
        };
        
        const json = JSON.stringify(backup, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eduhemis_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        return backup;
    },

    /**
     * Zaxira nusxani tiklash
     * @param {File} file - JSON fayl
     * @returns {Promise}
     */
    restore(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const backup = JSON.parse(e.target.result);
                    if (backup.version && backup.data) {
                        for (const [key, value] of Object.entries(backup.data)) {
                            LocalStorageManager.set(key, value);
                        }
                        resolve(true);
                    } else {
                        reject(new Error('Noto\'g\'ri backup fayli'));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Faylni o\'qishda xatolik'));
            reader.readAsText(file);
        });
    },

    // Barcha ma'lumotlarni tozalash
    clearAllData() {
        const keys = ['users', 'students', 'teachers', 'groups', 'subjects', 'lessons', 'tasks', 'grades', 'attendance', 'settings', 'notifications', 'messages', 'reminders', 'searchHistory'];
        keys.forEach(key => LocalStorageManager.remove(key));
        return true;
    },

    // Storage hajmini tekshirish
    getStorageSize() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            total += key.length + value.length;
        }
        return (total / 1024).toFixed(2) + ' KB';
    },

    // Storage mavjudligini tekshirish
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// ============================================
// 6. GLOBAL OBYEKTLAR
// ============================================

window.LocalStorageManager = LocalStorageManager;
window.SessionStorageManager = SessionStorageManager;
window.CookieManager = CookieManager;
window.IndexedDBManager = IndexedDBManager;
window.EduStorage = EduStorage;

// Qisqa nomlar
window.$storage = LocalStorageManager;
window.$session = SessionStorageManager;
window.$cookie = CookieManager;
window.$eduStorage = EduStorage;