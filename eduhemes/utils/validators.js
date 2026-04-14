/* ============================================
   EduHemis - Validators (Validatsiya funksiyalari)
   Barcha validatsiya funksiyalari shu yerda
   ============================================ */

// ============================================
// 1. ASOSIY VALIDATORLAR
// ============================================

const Validators = {
    /**
     * Bo'sh emasligini tekshirish
     * @param {any} value - Qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    required(value, fieldName = 'Bu maydon') {
        if (value === undefined || value === null || value === '') {
            return `${fieldName} to'ldirilishi shart`;
        }
        if (typeof value === 'string' && value.trim() === '') {
            return `${fieldName} to'ldirilishi shart`;
        }
        return null;
    },

    /**
     * Minimal uzunlikni tekshirish
     * @param {string} value - Qiymat
     * @param {number} min - Minimal uzunlik
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    minLength(value, min, fieldName = 'Bu maydon') {
        if (value && value.length < min) {
            return `${fieldName} kamida ${min} ta belgi bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Maksimal uzunlikni tekshirish
     * @param {string} value - Qiymat
     * @param {number} max - Maksimal uzunlik
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    maxLength(value, max, fieldName = 'Bu maydon') {
        if (value && value.length > max) {
            return `${fieldName} ${max} ta belgidan oshmasligi kerak`;
        }
        return null;
    },

    /**
     * Aniq uzunlikni tekshirish
     * @param {string} value - Qiymat
     * @param {number} length - Uzunlik
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    exactLength(value, length, fieldName = 'Bu maydon') {
        if (value && value.length !== length) {
            return `${fieldName} ${length} ta belgidan iborat bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Minimal qiymatni tekshirish (sonlar uchun)
     * @param {number} value - Qiymat
     * @param {number} min - Minimal qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    min(value, min, fieldName = 'Bu maydon') {
        if (value !== undefined && value !== null && Number(value) < min) {
            return `${fieldName} ${min} dan katta yoki teng bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Maksimal qiymatni tekshirish (sonlar uchun)
     * @param {number} value - Qiymat
     * @param {number} max - Maksimal qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    max(value, max, fieldName = 'Bu maydon') {
        if (value !== undefined && value !== null && Number(value) > max) {
            return `${fieldName} ${max} dan kichik yoki teng bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Oraliqni tekshirish (sonlar uchun)
     * @param {number} value - Qiymat
     * @param {number} min - Minimal qiymat
     * @param {number} max - Maksimal qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    between(value, min, max, fieldName = 'Bu maydon') {
        if (value !== undefined && value !== null) {
            const num = Number(value);
            if (num < min || num > max) {
                return `${fieldName} ${min} va ${max} orasida bo'lishi kerak`;
            }
        }
        return null;
    },

    /**
     * Email validatsiyasi
     * @param {string} value - Email
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    email(value, fieldName = 'Email') {
        if (value && !this.isValidEmail(value)) {
            return `${fieldName} noto'g'ri formatda`;
        }
        return null;
    },

    /**
     * Telefon validatsiyasi (O'zbekiston)
     * @param {string} value - Telefon raqam
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    phoneUZ(value, fieldName = 'Telefon') {
        if (value && !this.isValidPhoneUZ(value)) {
            return `${fieldName} noto'g'ri formatda (Masalan: +998901234567)`;
        }
        return null;
    },

    /**
     * URL validatsiyasi
     * @param {string} value - URL
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    url(value, fieldName = 'URL') {
        if (value && !this.isValidUrl(value)) {
            return `${fieldName} noto'g'ri formatda`;
        }
        return null;
    },

    /**
     * Raqam validatsiyasi
     * @param {any} value - Qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    number(value, fieldName = 'Bu maydon') {
        if (value !== undefined && value !== null && value !== '') {
            if (isNaN(Number(value))) {
                return `${fieldName} raqam bo'lishi kerak`;
            }
        }
        return null;
    },

    /**
     * Butun son validatsiyasi
     * @param {any} value - Qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    integer(value, fieldName = 'Bu maydon') {
        if (value !== undefined && value !== null && value !== '') {
            if (!Number.isInteger(Number(value))) {
                return `${fieldName} butun son bo'lishi kerak`;
            }
        }
        return null;
    },

    /**
     * Musbat son validatsiyasi
     * @param {any} value - Qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    positive(value, fieldName = 'Bu maydon') {
        if (value !== undefined && value !== null && value !== '') {
            if (Number(value) <= 0) {
                return `${fieldName} musbat son bo'lishi kerak`;
            }
        }
        return null;
    },

    /**
     * Manfiy son validatsiyasi
     * @param {any} value - Qiymat
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    negative(value, fieldName = 'Bu maydon') {
        if (value !== undefined && value !== null && value !== '') {
            if (Number(value) >= 0) {
                return `${fieldName} manfiy son bo'lishi kerak`;
            }
        }
        return null;
    },

    /**
     * Sana validatsiyasi
     * @param {string} value - Sana
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    date(value, fieldName = 'Sana') {
        if (value && isNaN(new Date(value))) {
            return `${fieldName} noto'g'ri formatda`;
        }
        return null;
    },

    /**
     * Kelajakdagi sana validatsiyasi
     * @param {string} value - Sana
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    future(value, fieldName = 'Sana') {
        if (value && new Date(value) <= new Date()) {
            return `${fieldName} kelajakdagi sana bo'lishi kerak`;
        }
        return null;
    },

    /**
     * O'tmishdagi sana validatsiyasi
     * @param {string} value - Sana
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    past(value, fieldName = 'Sana') {
        if (value && new Date(value) >= new Date()) {
            return `${fieldName} o'tmishdagi sana bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Alfa-numerik validatsiyasi
     * @param {string} value - Matn
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    alphanumeric(value, fieldName = 'Bu maydon') {
        if (value && !/^[a-zA-Z0-9]+$/.test(value)) {
            return `${fieldName} faqat harf va raqamlardan iborat bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Harflar validatsiyasi
     * @param {string} value - Matn
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    alpha(value, fieldName = 'Bu maydon') {
        if (value && !/^[a-zA-Z]+$/.test(value)) {
            return `${fieldName} faqat harflardan iborat bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Raqamlar validatsiyasi
     * @param {string} value - Matn
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    numeric(value, fieldName = 'Bu maydon') {
        if (value && !/^[0-9]+$/.test(value)) {
            return `${fieldName} faqat raqamlardan iborat bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Parol validatsiyasi
     * @param {string} value - Parol
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    password(value, fieldName = 'Parol') {
        if (!value) return `${fieldName} kiritilishi shart`;
        if (value.length < 6) {
            return `${fieldName} kamida 6 belgidan iborat bo'lishi kerak`;
        }
        if (value.length > 50) {
            return `${fieldName} 50 belgidan oshmasligi kerak`;
        }
        return null;
    },

    /**
     * Parolni tasdiqlash
     * @param {string} password - Parol
     * @param {string} confirmPassword - Tasdiqlash paroli
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    confirmPassword(password, confirmPassword, fieldName = 'Parol') {
        if (password !== confirmPassword) {
            return `Parollar mos kelmadi`;
        }
        return null;
    },

    /**
     * JSHSHIR validatsiyasi (O'zbekiston)
     * @param {string} value - JSHSHIR
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    pinfl(value, fieldName = 'JSHSHIR') {
        if (!value) return null;
        
        const cleaned = value.replace(/\s/g, '');
        if (!/^[0-9]{14}$/.test(cleaned)) {
            return `${fieldName} 14 xonali raqam bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Passport validatsiyasi (O'zbekiston)
     * @param {string} value - Passport
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    passport(value, fieldName = 'Passport') {
        if (!value) return null;
        
        const cleaned = value.replace(/\s/g, '');
        if (!/^[A-Z]{2}[0-9]{7}$/.test(cleaned)) {
            return `${fieldName} noto'g'ri formatda (Masalan: AA1234567)`;
        }
        return null;
    },

    /**
     * INN validatsiyasi (O'zbekiston)
     * @param {string} value - INN
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    inn(value, fieldName = 'INN') {
        if (!value) return null;
        
        const cleaned = value.replace(/\s/g, '');
        if (!/^[0-9]{9}$/.test(cleaned)) {
            return `${fieldName} 9 xonali raqam bo'lishi kerak`;
        }
        return null;
    },

    /**
     * Parol kuchliligi validatsiyasi
     * @param {string} value - Parol
     * @param {string} fieldName - Maydon nomi
     * @returns {string|null}
     */
    passwordStrength(value, fieldName = 'Parol') {
        if (!value) return `${fieldName} kiritilishi shart`;
        
        let score = 0;
        if (value.length >= 8) score++;
        if (value.length >= 12) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;
        
        if (score < 3) {
            return `${fieldName} yetarlicha kuchli emas (katta harf, kichik harf, raqam, maxsus belgi ishlating)`;
        }
        return null;
    }
};

// ============================================
// 2. FORMA VALIDATSIYASI
// ============================================

const FormValidator = {
    /**
     * Formani validatsiya qilish
     * @param {Object} data - Forma ma'lumotlari
     * @param {Object} rules - Validatsiya qoidalari
     * @returns {Object}
     */
    validate(data, rules) {
        const errors = {};
        
        for (const [field, fieldRules] of Object.entries(rules)) {
            const value = data[field];
            
            for (const rule of fieldRules) {
                let error = null;
                
                if (typeof rule === 'function') {
                    error = rule(value);
                } else if (Array.isArray(rule)) {
                    const [validator, ...params] = rule;
                    error = validator(value, ...params);
                }
                
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

    /**
     * Forma maydonini validatsiya qilish
     * @param {any} value - Qiymat
     * @param {Array} rules - Validatsiya qoidalari
     * @returns {Object}
     */
    validateField(value, rules) {
        for (const rule of rules) {
            let error = null;
            
            if (typeof rule === 'function') {
                error = rule(value);
            } else if (Array.isArray(rule)) {
                const [validator, ...params] = rule;
                error = validator(value, ...params);
            }
            
            if (error) {
                return { isValid: false, error };
            }
        }
        
        return { isValid: true, error: null };
    },

    /**
     * Formani real-time validatsiya qilish
     * @param {HTMLFormElement} form - Forma elementi
     * @param {Object} rules - Validatsiya qoidalari
     */
    attachValidation(form, rules) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const name = input.name;
            if (rules[name]) {
                input.addEventListener('input', () => {
                    const result = this.validateField(input.value, rules[name]);
                    this.showFieldError(input, result.error);
                });
                
                input.addEventListener('blur', () => {
                    const result = this.validateField(input.value, rules[name]);
                    this.showFieldError(input, result.error);
                });
            }
        });
    },

    /**
     * Xatolikni ko'rsatish
     * @param {HTMLElement} input - Input elementi
     * @param {string} error - Xatolik matni
     */
    showFieldError(input, error) {
        const formGroup = input.closest('.form-group, .space-y-4 > div');
        if (!formGroup) return;
        
        let errorDiv = formGroup.querySelector('.error-message');
        
        if (error) {
            input.classList.add('border-red-500', 'bg-red-50');
            
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'error-message text-red-600 text-sm mt-1';
                formGroup.appendChild(errorDiv);
            }
            errorDiv.textContent = error;
        } else {
            input.classList.remove('border-red-500', 'bg-red-50');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
    },

    /**
     * Formani tozalash
     * @param {HTMLFormElement} form - Forma elementi
     */
    clearErrors(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('border-red-500', 'bg-red-50');
        });
        
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    },

    /**
     * Xatoliklarni ko'rsatish
     * @param {HTMLFormElement} form - Forma elementi
     * @param {Object} errors - Xatoliklar
     */
    showErrors(form, errors) {
        for (const [field, error] of Object.entries(errors)) {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                this.showFieldError(input, error);
            }
        }
    }
};

// ============================================
// 3. MAXSUS VALIDATORLAR
// ============================================

const CustomValidators = {
    /**
     * Login validatsiyasi
     * @param {string} value - Login
     * @returns {string|null}
     */
    login(value) {
        if (!value) return 'Login kiritilishi shart';
        if (value.length < 3) return 'Login kamida 3 belgidan iborat bo\'lishi kerak';
        if (value.length > 20) return 'Login 20 belgidan oshmasligi kerak';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return 'Login faqat harflar, raqamlar va _ dan iborat bo\'lishi mumkin';
        }
        return null;
    },

    /**
     * Ism validatsiyasi
     * @param {string} value - Ism
     * @returns {string|null}
     */
    name(value) {
        if (!value) return 'Ism kiritilishi shart';
        if (value.length < 2) return 'Ism kamida 2 belgidan iborat bo\'lishi kerak';
        if (value.length > 50) return 'Ism 50 belgidan oshmasligi kerak';
        if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
            return 'Ism faqat harflar, bo\'sh joy va - dan iborat bo\'lishi mumkin';
        }
        return null;
    },

    /**
     * Familya validatsiyasi
     * @param {string} value - Familya
     * @returns {string|null}
     */
    surname(value) {
        if (!value) return 'Familya kiritilishi shart';
        if (value.length < 2) return 'Familya kamida 2 belgidan iborat bo\'lishi kerak';
        if (value.length > 50) return 'Familya 50 belgidan oshmasligi kerak';
        if (!/^[a-zA-Zа-ЯА-ЯёЁ\s-]+$/.test(value)) {
            return 'Familya faqat harflar, bo\'sh joy va - dan iborat bo\'lishi mumkin';
        }
        return null;
    },

    /**
     * Guruh nomi validatsiyasi
     * @param {string} value - Guruh nomi
     * @returns {string|null}
     */
    groupName(value) {
        if (!value) return 'Guruh nomi kiritilishi shart';
        if (!/^[A-Z]{2}-\d{3}-\d{2}$/.test(value)) {
            return 'Guruh nomi noto\'g\'ri formatda (Masalan: AT-101-20)';
        }
        return null;
    },

    /**
     * Fan kodi validatsiyasi
     * @param {string} value - Fan kodi
     * @returns {string|null}
     */
    subjectCode(value) {
        if (!value) return 'Fan kodi kiritilishi shart';
        if (!/^[A-Z]{2}-\d{4}$/.test(value)) {
            return 'Fan kodi noto\'g\'ri formatda (Masalan: CS-2024)';
        }
        return null;
    },

    /**
     * Xona raqami validatsiyasi
     * @param {string} value - Xona raqami
     * @returns {string|null}
     */
    roomNumber(value) {
        if (!value) return 'Xona raqami kiritilishi shart';
        if (!/^\d{3}$/.test(value)) {
            return 'Xona raqami 3 xonali raqam bo\'lishi kerak';
        }
        return null;
    },

    /**
     * Vaqt formatini tekshirish (HH:MM-HH:MM)
     * @param {string} value - Vaqt
     * @returns {string|null}
     */
    timeRange(value) {
        if (!value) return 'Vaqt kiritilishi shart';
        if (!/^\d{2}:\d{2}-\d{2}:\d{2}$/.test(value)) {
            return 'Vaqt noto\'g\'ri formatda (Masalan: 09:00-10:20)';
        }
        
        const [start, end] = value.split('-');
        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);
        
        if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
            return 'Soat 0-23 oralig\'ida bo\'lishi kerak';
        }
        if (startMin < 0 || startMin > 59 || endMin < 0 || endMin > 59) {
            return 'Daqiqa 0-59 oralig\'ida bo\'lishi kerak';
        }
        if (startHour > endHour || (startHour === endHour && startMin >= endMin)) {
            return 'Boshlanish vaqti tugash vaqtidan oldin bo\'lishi kerak';
        }
        
        return null;
    },

    /**
     * Yosh validatsiyasi
     * @param {number} value - Yosh
     * @param {number} min - Minimal yosh
     * @param {number} max - Maksimal yosh
     * @returns {string|null}
     */
    age(value, min = 16, max = 100) {
        if (!value) return 'Yosh kiritilishi shart';
        const age = Number(value);
        if (age < min) return `Yosh ${min} dan katta bo\'lishi kerak`;
        if (age > max) return `Yosh ${max} dan kichik bo\'lishi kerak`;
        return null;
    },

    /**
     * Baho validatsiyasi
     * @param {number} value - Baho
     * @returns {string|null}
     */
    grade(value) {
        if (value === undefined || value === null) return 'Baho kiritilishi shart';
        const grade = Number(value);
        if (grade < 2 || grade > 5) return 'Baho 2-5 oralig\'ida bo\'lishi kerak';
        if (!Number.isInteger(grade)) return 'Baho butun son bo\'lishi kerak';
        return null;
    },

    /**
     * Kredit validatsiyasi
     * @param {number} value - Kredit
     * @returns {string|null}
     */
    credit(value) {
        if (!value) return 'Kredit kiritilishi shart';
        const credit = Number(value);
        if (credit < 1 || credit > 10) return 'Kredit 1-10 oralig\'ida bo\'lishi kerak';
        if (!Number.isInteger(credit)) return 'Kredit butun son bo\'lishi kerak';
        return null;
    },

    /**
     * Soat validatsiyasi
     * @param {number} value - Soat
     * @returns {string|null}
     */
    hours(value) {
        if (!value) return 'Soat kiritilishi shart';
        const hours = Number(value);
        if (hours < 1 || hours > 200) return 'Soat 1-200 oralig\'ida bo\'lishi kerak';
        if (!Number.isInteger(hours)) return 'Soat butun son bo\'lishi kerak';
        return null;
    }
};

// ============================================
// 4. YORDAMCHI VALIDATSIYA FUNKSIYALARI
// ============================================

const ValidationHelpers = {
    /**
     * Email validatsiyasi (regex)
     * @param {string} email - Email
     * @returns {boolean}
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Telefon validatsiyasi (O'zbekiston)
     * @param {string} phone - Telefon
     * @returns {boolean}
     */
    isValidPhoneUZ(phone) {
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        const re = /^(\+998|998)[0-9]{9}$/;
        return re.test(cleaned);
    },

    /**
     * URL validatsiyasi
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
     * JSHSHIR validatsiyasi
     * @param {string} pinfl - JSHSHIR
     * @returns {boolean}
     */
    isValidPinfl(pinfl) {
        const cleaned = pinfl.replace(/\s/g, '');
        return /^[0-9]{14}$/.test(cleaned);
    },

    /**
     * Passport validatsiyasi
     * @param {string} passport - Passport
     * @returns {boolean}
     */
    isValidPassport(passport) {
        const cleaned = passport.replace(/\s/g, '');
        return /^[A-Z]{2}[0-9]{7}$/.test(cleaned);
    },

    /**
     * INN validatsiyasi
     * @param {string} inn - INN
     * @returns {boolean}
     */
    isValidInn(inn) {
        const cleaned = inn.replace(/\s/g, '');
        return /^[0-9]{9}$/.test(cleaned);
    },

    /**
     * Guruh nomi validatsiyasi
     * @param {string} groupName - Guruh nomi
     * @returns {boolean}
     */
    isValidGroupName(groupName) {
        return /^[A-Z]{2}-\d{3}-\d{2}$/.test(groupName);
    },

    /**
     * Fan kodi validatsiyasi
     * @param {string} subjectCode - Fan kodi
     * @returns {boolean}
     */
    isValidSubjectCode(subjectCode) {
        return /^[A-Z]{2}-\d{4}$/.test(subjectCode);
    }
};

// ============================================
// 5. GLOBAL OBYEKTLAR
// ============================================

window.Validators = Validators;
window.FormValidator = FormValidator;
window.CustomValidators = CustomValidators;
window.ValidationHelpers = ValidationHelpers;

// Qisqa nomlar
window.$validate = Validators;
window.$formValidate = FormValidator;