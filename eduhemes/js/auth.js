/* ============================================
   EduHemis - Autentifikatsiya tizimi
   Kirish, ro'yxatdan o'tish, sessiya boshqaruvi
   ============================================ */

// ============================================
// 1. AUTH MODULI
// ============================================
const Auth = {
    // Joriy foydalanuvchi
    currentUser: null,
    
    // Sessiya vaqti (30 daqiqa)
    sessionTimeout: 30 * 60 * 1000,
    sessionTimer: null,
    
    // Login qilish
    login(username, password) {
        // Foydalanuvchini qidirish
        const user = DB.users.find(u => 
            u.username === username && 
            u.password === password
        );
        
        if (!user) {
            return {
                success: false,
                message: 'Login yoki parol noto\'g\'ri'
            };
        }
        
        // Sessiyani boshlash
        this.startSession(user);
        
        // Log yozish
        Logger.log('login', `User ${user.username} logged in`);
        
        return {
            success: true,
            user: user
        };
    },
    
    // Ro'yxatdan o'tish
    register(userData) {
        // Validatsiya
        const validation = this.validateRegistration(userData);
        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors
            };
        }
        
        // Login mavjudligini tekshirish
        if (DB.users.some(u => u.username === userData.username)) {
            return {
                success: false,
                errors: {
                    username: 'Bu login allaqachon mavjud'
                }
            };
        }
        
        // Email mavjudligini tekshirish
        if (DB.users.some(u => u.email === userData.email)) {
            return {
                success: false,
                errors: {
                    email: 'Bu email allaqachon mavjud'
                }
            };
        }
        
        // Yangi foydalanuvchi yaratish
        const newUser = {
            id: DB.newId('users'),
            username: userData.username,
            password: userData.password,
            role: userData.role,
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '',
            avatar: `https://ui-avatars.com/api/?name=${userData.name.split(' ').join('+')}&background=${this.getRoleColor(userData.role)}&color=fff`,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        };
        
        // Qo'shimcha ma'lumotlar
        if (userData.role === 'student') {
            newUser.group = userData.group;
            DB.students.push({
                id: newUser.id,
                name: newUser.name,
                group: userData.group,
                email: newUser.email,
                phone: newUser.phone
            });
        } else if (userData.role === 'teacher') {
            newUser.subject = userData.subject;
            newUser.department = userData.department || '';
            DB.teachers.push({
                id: newUser.id,
                name: newUser.name,
                subject: userData.subject,
                department: userData.department,
                email: newUser.email,
                phone: newUser.phone
            });
        }
        
        // Saqlash
        DB.users.push(newUser);
        DB.save();
        
        // Log yozish
        Logger.log('register', `New user registered: ${newUser.username}`);
        
        return {
            success: true,
            user: newUser
        };
    },
    
    // Ro'yxatdan o'tish validatsiyasi
    validateRegistration(data) {
        const errors = {};
        
        // Ism
        if (!data.name || data.name.trim() === '') {
            errors.name = 'Ism kiritilishi shart';
        } else if (data.name.length < 3) {
            errors.name = 'Ism kamida 3 ta belgi bo\'lishi kerak';
        }
        
        // Email
        if (!data.email) {
            errors.email = 'Email kiritilishi shart';
        } else if (!Utils.isValidEmail(data.email)) {
            errors.email = 'Email noto\'g\'ri formatda';
        }
        
        // Login
        if (!data.username) {
            errors.username = 'Login kiritilishi shart';
        } else if (data.username.length < 3) {
            errors.username = 'Login kamida 3 ta belgi bo\'lishi kerak';
        } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
            errors.username = 'Login faqat harflar, raqamlar va _ dan iborat bo\'lishi mumkin';
        }
        
        // Parol
        if (!data.password) {
            errors.password = 'Parol kiritilishi shart';
        } else if (data.password.length < 3) {
            errors.password = 'Parol kamida 3 ta belgi bo\'lishi kerak';
        }
        
        // Parolni tasdiqlash
        if (data.confirmPassword && data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Parollar mos kelmadi';
        }
        
        // Rol
        if (!data.role) {
            errors.role = 'Rol tanlanishi shart';
        } else if (!['student', 'teacher', 'admin'].includes(data.role)) {
            errors.role = 'Noto\'g\'ri rol';
        }
        
        // Talaba uchun guruh
        if (data.role === 'student' && !data.group) {
            errors.group = 'Guruh kiritilishi shart';
        }
        
        // O'qituvchi uchun fan
        if (data.role === 'teacher' && !data.subject) {
            errors.subject = 'Fan kiritilishi shart';
        }
        
        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    },
    
    // Sessiyani boshlash
    startSession(user) {
        this.currentUser = user;
        
        // Sessiya ma'lumotlarini saqlash
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('lastUser', JSON.stringify({
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role
        }));
        
        // Oxirgi kirish vaqtini yangilash
        user.lastLogin = new Date().toISOString();
        DB.save();
        
        // Sessiya timerini boshlash
        this.resetSessionTimer();
        
        // Event chiqarish
        Events.emit('auth:login', user);
    },
    
    // Sessiyani yangilash
    resetSessionTimer() {
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
        }
        
        this.sessionTimer = setTimeout(() => {
            this.logout(true);
        }, this.sessionTimeout);
    },
    
    // Avtomatik kirish (eslab qolish)
    autoLogin() {
        const savedUser = sessionStorage.getItem('currentUser');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                // Userni tekshirish (hali ham mavjudmi)
                const exists = DB.users.some(u => u.id === user.id);
                if (exists) {
                    this.currentUser = user;
                    this.resetSessionTimer();
                    Events.emit('auth:auto-login', user);
                    return true;
                }
            } catch (e) {
                console.error('Auto login error:', e);
            }
        }
        return false;
    },
    
    // Chiqish
    logout(timeout = false) {
        if (this.currentUser) {
            Logger.log('logout', `User ${this.currentUser.username} logged out${timeout ? ' (timeout)' : ''}`);
            
            Events.emit('auth:logout', {
                user: this.currentUser,
                timeout
            });
        }
        
        // Sessiyani tozalash
        this.currentUser = null;
        sessionStorage.removeItem('currentUser');
        
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
        }
        
        // Login sahifasiga o'tish
        window.location.href = 'index.html';
    },
    
    // Rol rangini olish
    getRoleColor(role) {
        const colors = {
            student: '0284c7',
            teacher: '4f46e5',
            admin: 'dc2626'
        };
        return colors[role] || '6b7280';
    },
    
    // Joriy foydalanuvchini olish
    getCurrentUser() {
        if (!this.currentUser) {
            this.autoLogin();
        }
        return this.currentUser;
    },
    
    // Rolni tekshirish
    hasRole(role) {
        return this.currentUser && this.currentUser.role === role;
    },
    
    // Adminlikni tekshirish
    isAdmin() {
        return this.hasRole('admin');
    },
    
    // O'qituvchilikni tekshirish
    isTeacher() {
        return this.hasRole('teacher');
    },
    
    // Talabalikni tekshirish
    isStudent() {
        return this.hasRole('student');
    },
    
    // Kirish huquqini tekshirish
    can(permission) {
        if (!this.currentUser) return false;
        
        const permissions = {
            admin: ['*'],
            teacher: ['view_own', 'edit_own', 'view_group', 'edit_group'],
            student: ['view_own']
        };
        
        const userPerms = permissions[this.currentUser.role] || [];
        return userPerms.includes('*') || userPerms.includes(permission);
    }
};

// ============================================
// 2. LOGGER TIZIMI
// ============================================
const Logger = {
    logs: [],
    
    log(action, details, userId = null) {
        const log = {
            id: Utils.randomId(),
            timestamp: new Date().toISOString(),
            userId: userId || (Auth.currentUser ? Auth.currentUser.id : null),
            username: Auth.currentUser ? Auth.currentUser.username : 'guest',
            action,
            details
        };
        
        this.logs.push(log);
        
        // Konsolga chiqarish
        console.log(`[${log.timestamp}] ${log.username}: ${action} - ${details}`);
        
        // LocalStorage ga saqlash (oxirgi 100 ta)
        const saved = JSON.parse(localStorage.getItem('logs') || '[]');
        saved.unshift(log);
        if (saved.length > 100) saved.pop();
        localStorage.setItem('logs', JSON.stringify(saved));
    },
    
    getLogs(limit = 100) {
        return this.logs.slice(0, limit);
    },
    
    clear() {
        this.logs = [];
        localStorage.removeItem('logs');
    }
};

// ============================================
// 3. PASSWORD MANAGER
// ============================================
const PasswordManager = {
    // Parolni hash qilish (oddiy versiya)
    hash(password) {
        // Haqiqiy proyektda bcrypt ishlatish kerak
        return btoa(password); // Base64 encoding (xavfsiz emas!)
    },
    
    // Parolni tekshirish
    verify(password, hash) {
        return this.hash(password) === hash;
    },
    
    // Kuchli parolni tekshirish
    isStrong(password) {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*]/.test(password)
        };
        
        return Object.values(checks).filter(Boolean).length >= 3;
    },
    
    // Parol kuchlilik darajasi
    strength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[!@#$%^&*]/.test(password)) score++;
        
        return Math.min(score, 5);
    },
    
    // Random parol yaratish
    generate(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return password;
    }
};

// ============================================
// 4. SESSION MANAGER
// ============================================
const Session = {
    // Sessiya ma'lumotlarini saqlash
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    
    // Sessiya ma'lumotlarini olish
    get(key, defaultValue = null) {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    },
    
    // Sessiya ma'lumotlarini o'chirish
    remove(key) {
        sessionStorage.removeItem(key);
    },
    
    // Sessiyani tozalash
    clear() {
        sessionStorage.clear();
    },
    
    // Sessiya mavjudligini tekshirish
    has(key) {
        return sessionStorage.getItem(key) !== null;
    }
};

// ============================================
// 5. LOGIN FUNKSIYALARI
// ============================================

// Login qilish
function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showError('Login va parolni kiriting');
        return;
    }
    
    const result = Auth.login(username, password);
    
    if (result.success) {
        // Muvaffaqiyatli login
        document.getElementById('loginError').style.display = 'none';
        
        // Animatsiya bilan o'tish
        document.getElementById('loginPage').style.opacity = '0';
        
        setTimeout(() => {
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('mainApp').classList.remove('hidden');
            
            // User ma'lumotlarini yangilash
            updateUserInfo(result.user);
            
            // Dashboardni ko'rsatish
            if (typeof showDashboard === 'function') {
                showDashboard();
            }
            
            showSuccess(`Xush kelibsiz, ${result.user.name}!`);
        }, 300);
    } else {
        // Xatolik
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').textContent = result.message;
    }
}

// Ro'yxatdan o'tish
function handleRegister() {
    // Ma'lumotlarni olish
    const userData = {
        name: document.getElementById('regFullName').value.trim(),
        email: document.getElementById('regEmail').value.trim(),
        role: document.getElementById('regRole').value,
        group: document.getElementById('regGroup').value.trim(),
        subject: document.getElementById('regSubject').value.trim(),
        username: document.getElementById('regUsername').value.trim(),
        password: document.getElementById('regPassword').value,
        confirmPassword: document.getElementById('regConfirmPassword')?.value
    };
    
    const result = Auth.register(userData);
    
    if (result.success) {
        // Muvaffaqiyatli ro'yxatdan o'tish
        showSuccess('Muvaffaqiyatli ro\'yxatdan o\'tdingiz! Endi kiring.');
        
        // Login tabiga o'tish
        if (typeof showLoginTab === 'function') {
            showLoginTab();
        }
        
        // Formani tozalash
        document.getElementById('regFullName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        if (document.getElementById('regConfirmPassword')) {
            document.getElementById('regConfirmPassword').value = '';
        }
        document.getElementById('regGroup').value = '';
        document.getElementById('regSubject').value = '';
    } else {
        // Xatoliklarni ko'rsatish
        let errorMessage = '';
        for (const [field, message] of Object.entries(result.errors)) {
            errorMessage += `${message}\n`;
        }
        
        const errorDiv = document.getElementById('registerError');
        if (errorDiv) {
            errorDiv.textContent = errorMessage;
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        } else {
            alert(errorMessage);
        }
    }
}

// Chiqish
function logout() {
    UI.confirm('Haqiqatan ham tizimdan chiqmoqchimisiz?', () => {
        Auth.logout();
    });
}

// User ma'lumotlarini yangilash
function updateUserInfo(user) {
    // Elementlarni topish
    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    const userAvatarEl = document.getElementById('userAvatar');
    const sidebarNameEl = document.getElementById('sidebarName');
    const sidebarRoleEl = document.getElementById('sidebarRole');
    const sidebarAvatarEl = document.getElementById('sidebarAvatar');
    
    // Rol matnini olish
    let roleText = '';
    if (user.role === 'student') roleText = 'Talaba';
    else if (user.role === 'teacher') roleText = "O'qituvchi";
    else roleText = 'Admin';
    
    // Ma'lumotlarni o'rnatish
    if (userNameEl) userNameEl.textContent = user.name;
    if (userRoleEl) userRoleEl.textContent = roleText;
    
    // Avatar yaratish
    const avatarUrl = `https://ui-avatars.com/api/?name=${user.name.split(' ').join('+')}&background=${Auth.getRoleColor(user.role)}&color=fff&size=128`;
    
    if (userAvatarEl) userAvatarEl.src = avatarUrl;
    if (sidebarNameEl) sidebarNameEl.textContent = user.name;
    if (sidebarRoleEl) sidebarRoleEl.textContent = roleText;
    if (sidebarAvatarEl) sidebarAvatarEl.src = avatarUrl;
    
    // Bildirishnoma belgisi (faqat o'qituvchi)
    const notificationBell = document.getElementById('notificationBell');
    if (notificationBell) {
        if (user.role === 'teacher') {
            notificationBell.classList.remove('hidden');
            if (typeof updateNotifications === 'function') {
                updateNotifications();
            }
        } else {
            notificationBell.classList.add('hidden');
        }
    }
    
    // Rolga qarab menyularni ko'rsatish
    const studentMenu = document.getElementById('studentMenu');
    const teacherMenu = document.getElementById('teacherMenu');
    const adminMenu = document.getElementById('adminMenu');
    
    if (studentMenu) studentMenu.classList.add('hidden');
    if (teacherMenu) teacherMenu.classList.add('hidden');
    if (adminMenu) adminMenu.classList.add('hidden');
    
    if (user.role === 'student' && studentMenu) {
        studentMenu.classList.remove('hidden');
    } else if (user.role === 'teacher' && teacherMenu) {
        teacherMenu.classList.remove('hidden');
    } else if (user.role === 'admin' && adminMenu) {
        adminMenu.classList.remove('hidden');
    }
}

// ============================================
// 6. TABLAR
// ============================================
function showLoginTab() {
    const loginTab = document.getElementById('loginTabBtn');
    const registerTab = document.getElementById('registerTabBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginTab) {
        loginTab.classList.add('tab-active', 'bg-blue-600', 'text-white');
        loginTab.classList.remove('bg-gray-200');
    }
    
    if (registerTab) {
        registerTab.classList.remove('tab-active', 'bg-blue-600', 'text-white');
        registerTab.classList.add('bg-gray-200');
    }
    
    if (loginForm) loginForm.classList.remove('hidden');
    if (registerForm) registerForm.classList.add('hidden');
}

function showRegisterTab() {
    const loginTab = document.getElementById('loginTabBtn');
    const registerTab = document.getElementById('registerTabBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (registerTab) {
        registerTab.classList.add('tab-active', 'bg-blue-600', 'text-white');
        registerTab.classList.remove('bg-gray-200');
    }
    
    if (loginTab) {
        loginTab.classList.remove('tab-active', 'bg-blue-600', 'text-white');
        loginTab.classList.add('bg-gray-200');
    }
    
    if (registerForm) registerForm.classList.remove('hidden');
    if (loginForm) loginForm.classList.add('hidden');
}

function toggleRoleFields() {
    const role = document.getElementById('regRole')?.value;
    const studentField = document.getElementById('studentField');
    const teacherField = document.getElementById('teacherField');
    
    if (role === 'student') {
        if (studentField) studentField.classList.remove('hidden');
        if (teacherField) teacherField.classList.add('hidden');
    } else {
        if (studentField) studentField.classList.add('hidden');
        if (teacherField) teacherField.classList.remove('hidden');
    }
}

// ============================================
// 7. PROFIL FUNKSIYALARI
// ============================================
function showMyProfile() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    let extraInfo = '';
    if (user.role === 'student') {
        extraInfo = `<p><strong>Guruh:</strong> ${user.group || '-'}</p>`;
    } else if (user.role === 'teacher') {
        extraInfo = `<p><strong>Fan:</strong> ${user.subject || '-'}</p>`;
    }
    
    showModal(`
        <div class="text-center">
            <img src="${user.avatar}" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100">
            <h3 class="text-2xl font-bold">${user.name}</h3>
            <p class="text-gray-500 mb-4">${user.role === 'admin' ? '👑 Admin' : user.role === 'teacher' ? '👨‍🏫 O\'qituvchi' : '👨‍🎓 Talaba'}</p>
            
            <div class="text-left space-y-2 border-t pt-4">
                <p><i class="fas fa-id-card w-6 text-gray-400"></i> <strong>ID:</strong> ${user.id}</p>
                <p><i class="fas fa-envelope w-6 text-gray-400"></i> <strong>Email:</strong> ${user.email}</p>
                <p><i class="fas fa-phone w-6 text-gray-400"></i> <strong>Telefon:</strong> ${user.phone || '-'}</p>
                <p><i class="fas fa-calendar w-6 text-gray-400"></i> <strong>Ro'yxatdan o'tgan:</strong> ${Utils.formatDateTime(user.createdAt)}</p>
                <p><i class="fas fa-clock w-6 text-gray-400"></i> <strong>Oxirgi kirish:</strong> ${user.lastLogin ? Utils.formatDateTime(user.lastLogin) : '-'}</p>
                ${extraInfo}
            </div>
        </div>
    `);
}

// ============================================
// 8. PAROLNI UNUTDIM
// ============================================
function showForgotPassword() {
    showModal(`
        <h3 class="text-xl font-bold mb-4">🔑 Parolni tiklash</h3>
        <p class="text-gray-600 mb-4">Email manzilingizni kiriting, biz sizga parolni tiklash uchun havola yuboramiz.</p>
        <div class="space-y-3">
            <input type="email" id="resetEmail" placeholder="Email" class="w-full p-3 border rounded-xl">
            <button onclick="sendResetLink()" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                Yuborish
            </button>
            <p class="text-sm text-gray-500 text-center">Demo versiyada parolni tiklash ishlamaydi. Admin bilan bog'lanishingiz mumkin.</p>
        </div>
    `, 'Parolni unutdingizmi?');
}

function sendResetLink() {
    const email = document.getElementById('resetEmail')?.value;
    
    if (!email) {
        showError('Email kiriting');
        return;
    }
    
    const user = DB.users.find(u => u.email === email);
    
    if (user) {
        // Demo versiyada faqat xabar chiqaramiz
        showSuccess(`Parolni tiklash havolasi ${email} ga yuborildi!`);
    } else {
        showError('Bu email bilan foydalanuvchi topilmadi');
    }
    
    setTimeout(closeModal, 2000);
}

// ============================================
// 9. PROFILNI TAHRIRLASH
// ============================================
function showEditProfile() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    showModal(`
        <h3 class="text-xl font-bold mb-4">✏️ Profilni tahrirlash</h3>
        <div class="space-y-3">
            <div>
                <label class="block text-sm font-medium mb-1">Ism</label>
                <input type="text" id="editName" value="${user.name}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="editEmail" value="${user.email}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Telefon</label>
                <input type="tel" id="editPhone" value="${user.phone || ''}" class="w-full p-3 border rounded-xl">
            </div>
            ${user.role === 'student' ? `
            <div>
                <label class="block text-sm font-medium mb-1">Guruh</label>
                <input type="text" id="editGroup" value="${user.group || ''}" class="w-full p-3 border rounded-xl">
            </div>
            ` : ''}
            ${user.role === 'teacher' ? `
            <div>
                <label class="block text-sm font-medium mb-1">Fan</label>
                <input type="text" id="editSubject" value="${user.subject || ''}" class="w-full p-3 border rounded-xl">
            </div>
            ` : ''}
            <button onclick="saveProfile()" class="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">
                Saqlash
            </button>
        </div>
    `, 'Profilni tahrirlash');
}

function saveProfile() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    // Ma'lumotlarni olish
    const newName = document.getElementById('editName')?.value;
    const newEmail = document.getElementById('editEmail')?.value;
    const newPhone = document.getElementById('editPhone')?.value;
    
    if (!newName || !newEmail) {
        showError('Ism va email kiritilishi shart');
        return;
    }
    
    // Email validatsiya
    if (!Utils.isValidEmail(newEmail)) {
        showError('Email noto\'g\'ri formatda');
        return;
    }
    
    // Email boshqa foydalanuvchida mavjudligini tekshirish
    const emailExists = DB.users.some(u => u.email === newEmail && u.id !== user.id);
    if (emailExists) {
        showError('Bu email allaqachon mavjud');
        return;
    }
    
    // Ma'lumotlarni yangilash
    user.name = newName;
    user.email = newEmail;
    user.phone = newPhone;
    
    if (user.role === 'student') {
        const newGroup = document.getElementById('editGroup')?.value;
        if (newGroup) user.group = newGroup;
    } else if (user.role === 'teacher') {
        const newSubject = document.getElementById('editSubject')?.value;
        if (newSubject) user.subject = newSubject;
    }
    
    // Avatarni yangilash
    user.avatar = `https://ui-avatars.com/api/?name=${user.name.split(' ').join('+')}&background=${Auth.getRoleColor(user.role)}&color=fff`;
    
    // Saqlash
    DB.save();
    
    // UI ni yangilash
    updateUserInfo(user);
    
    closeModal();
    showSuccess('Profil muvaffaqiyatli yangilandi');
}

// ============================================
// 10. SAHIFA YUKLANGANDA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Avtomatik kirish
    if (Auth.autoLogin()) {
        const user = Auth.getCurrentUser();
        if (user && document.getElementById('mainApp')) {
            document.getElementById('loginPage')?.classList.add('hidden');
            document.getElementById('mainApp')?.classList.remove('hidden');
            updateUserInfo(user);
        }
    }
    
    // Enter tugmasi
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const mainApp = document.getElementById('mainApp');
            const registerForm = document.getElementById('registerForm');
            
            if (mainApp?.classList.contains('hidden')) {
                if (registerForm && !registerForm.classList.contains('hidden')) {
                    handleRegister();
                } else {
                    handleLogin();
                }
            }
        }
    });
});

// ============================================
// 11. GLOBAL OBYEKTLAR
// ============================================
window.Auth = Auth;
window.Logger = Logger;
window.PasswordManager = PasswordManager;
window.Session = Session;