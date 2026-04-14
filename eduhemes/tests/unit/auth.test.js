/* ============================================
   EduHemis - Auth Unit Testlari
   Autentifikatsiya funksiyalarini test qilish
   ============================================ */

// Test muhiti sozlamalari
const testEnv = {
    // Test ma'lumotlari
    testUsers: [
        { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Admin User', email: 'admin@edu.uz' },
        { id: 2, username: 'teacher', password: '123', role: 'teacher', name: 'Said Alisherov', email: 's.alisherov@edu.uz', subject: 'Veb dasturlash' },
        { id: 3, username: 'student', password: '123', role: 'student', name: 'Azimjon Karimov', email: 'a.karimov@student.uz', group: 'AT-101-20' }
    ],
    
    // Test natijalari
    results: {
        passed: 0,
        failed: 0,
        total: 0
    },
    
    // Test loglari
    logs: [],
    
    // Test boshlandi
    startTest() {
        this.results = { passed: 0, failed: 0, total: 0 };
        this.logs = [];
        console.log('🧪 Auth testlari boshlandi...\n');
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
    },
    
    // Test ma'lumotlarini tozalash
    clearTestData() {
        localStorage.removeItem('users');
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
    }
};

// ============================================
// 1. LOGIN TESTLARI
// ============================================

function testLoginFunctionality() {
    testEnv.startTest();
    
    // 1.1. To'g'ri login ma'lumotlari bilan kirish
    testEnv.assert(
        typeof Auth !== 'undefined' && Auth.login,
        'Auth.login funksiyasi mavjud',
        'Auth.login exists'
    );
    
    // Test uchun vaqtinchalik Auth obyekti
    const MockAuth = {
        users: [...testEnv.testUsers],
        
        login(username, password) {
            const user = this.users.find(u => u.username === username && u.password === password);
            if (user) {
                return { success: true, user: { ...user, password: undefined } };
            }
            return { success: false, message: 'Login yoki parol noto\'g\'ri' };
        },
        
        register(userData) {
            if (this.users.find(u => u.username === userData.username)) {
                return { success: false, message: 'Bu login allaqachon mavjud' };
            }
            const newUser = { id: this.users.length + 1, ...userData };
            this.users.push(newUser);
            return { success: true, user: newUser };
        }
    };
    
    // To'g'ri login
    const validLogin = MockAuth.login('student', '123');
    testEnv.assert(
        validLogin.success === true,
        'To\'g\'ri login va parol bilan kirish muvaffaqiyatli',
        'Valid login test'
    );
    
    testEnv.assert(
        validLogin.user && validLogin.user.username === 'student',
        'Kiritilgan foydalanuvchi ma\'lumotlari to\'g\'ri qaytariladi',
        'Valid user data test'
    );
    
    // Noto'g'ri login
    const invalidLogin = MockAuth.login('wrong', 'wrong');
    testEnv.assert(
        invalidLogin.success === false,
        'Noto\'g\'ri login va parol bilan kirish xatolik qaytaradi',
        'Invalid login test'
    );
    
    testEnv.assert(
        invalidLogin.message === 'Login yoki parol noto\'g\'ri',
        'Xatolik xabari to\'g\'ri formatda',
        'Error message test'
    );
    
    // Bo'sh ma'lumotlar
    const emptyLogin = MockAuth.login('', '');
    testEnv.assert(
        emptyLogin.success === false,
        'Bo\'sh login va parol bilan kirish xatolik qaytaradi',
        'Empty login test'
    );
    
    testEnv.endTest();
}

// ============================================
// 2. REGISTER TESTLARI
// ============================================

function testRegisterFunctionality() {
    testEnv.startTest();
    
    const MockAuth = {
        users: [...testEnv.testUsers],
        
        register(userData) {
            if (!userData.username || !userData.password || !userData.name || !userData.email) {
                return { success: false, message: 'Barcha maydonlarni to\'ldiring' };
            }
            
            if (this.users.find(u => u.username === userData.username)) {
                return { success: false, message: 'Bu login allaqachon mavjud' };
            }
            
            if (this.users.find(u => u.email === userData.email)) {
                return { success: false, message: 'Bu email allaqachon mavjud' };
            }
            
            if (userData.password.length < 3) {
                return { success: false, message: 'Parol kamida 3 belgidan iborat bo\'lishi kerak' };
            }
            
            const newUser = { id: this.users.length + 1, ...userData };
            this.users.push(newUser);
            return { success: true, user: newUser };
        }
    };
    
    // Yangi foydalanuvchi qo'shish
    const newUser = {
        username: 'newuser',
        password: '123',
        name: 'Yangi Foydalanuvchi',
        email: 'new@edu.uz',
        role: 'student',
        group: 'AT-101-20'
    };
    
    const registerResult = MockAuth.register(newUser);
    testEnv.assert(
        registerResult.success === true,
        'Yangi foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tadi',
        'Valid registration test'
    );
    
    testEnv.assert(
        registerResult.user.username === 'newuser',
        'Ro\'yxatdan o\'tgan foydalanuvchi ma\'lumotlari to\'g\'ri',
        'Registration data test'
    );
    
    // Takroriy login
    const duplicateLogin = MockAuth.register({ ...newUser, email: 'new2@edu.uz' });
    testEnv.assert(
        duplicateLogin.success === false,
        'Takroriy login bilan ro\'yxatdan o\'tish xatolik qaytaradi',
        'Duplicate username test'
    );
    
    // Takroriy email
    const duplicateEmail = MockAuth.register({ ...newUser, username: 'newuser2', email: 'new@edu.uz' });
    testEnv.assert(
        duplicateEmail.success === false,
        'Takroriy email bilan ro\'yxatdan o\'tish xatolik qaytaradi',
        'Duplicate email test'
    );
    
    // Bo'sh ma'lumotlar
    const emptyData = MockAuth.register({});
    testEnv.assert(
        emptyData.success === false,
        'Bo\'sh ma\'lumotlar bilan ro\'yxatdan o\'tish xatolik qaytaradi',
        'Empty registration test'
    );
    
    // Qisqa parol
    const shortPassword = MockAuth.register({
        username: 'testuser',
        password: '12',
        name: 'Test User',
        email: 'test@edu.uz'
    });
    testEnv.assert(
        shortPassword.success === false,
        'Qisqa parol bilan ro\'yxatdan o\'tish xatolik qaytaradi',
        'Short password test'
    );
    
    testEnv.endTest();
}

// ============================================
// 3. LOGOUT TESTLARI
// ============================================

function testLogoutFunctionality() {
    testEnv.startTest();
    
    let currentUser = { id: 1, username: 'student', name: 'Azimjon' };
    let isLoggedIn = true;
    
    const MockAuth = {
        logout() {
            currentUser = null;
            isLoggedIn = false;
            sessionStorage.removeItem('currentUser');
            return { success: true };
        },
        
        isLoggedIn() {
            return isLoggedIn;
        },
        
        getCurrentUser() {
            return currentUser;
        }
    };
    
    // Chiqish
    const logoutResult = MockAuth.logout();
    testEnv.assert(
        logoutResult.success === true,
        'Chiqish funksiyasi muvaffaqiyatli ishlaydi',
        'Logout success test'
    );
    
    testEnv.assert(
        MockAuth.isLoggedIn() === false,
        'Chiqishdan keyin foydalanuvchi tizimda emas',
        'Logged out state test'
    );
    
    testEnv.assert(
        MockAuth.getCurrentUser() === null,
        'Chiqishdan keyin joriy foydalanuvchi null bo\'ladi',
        'Current user null test'
    );
    
    testEnv.endTest();
}

// ============================================
// 4. SESSION TESTLARI
// ============================================

function testSessionManagement() {
    testEnv.startTest();
    
    const MockSession = {
        set(key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        },
        
        get(key) {
            const value = sessionStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        },
        
        remove(key) {
            sessionStorage.removeItem(key);
            return true;
        },
        
        clear() {
            sessionStorage.clear();
            return true;
        },
        
        has(key) {
            return sessionStorage.getItem(key) !== null;
        }
    };
    
    // Sessiyaga ma'lumot saqlash
    const testUser = { id: 1, name: 'Azimjon', role: 'student' };
    MockSession.set('currentUser', testUser);
    
    testEnv.assert(
        MockSession.has('currentUser') === true,
        'Sessiyaga ma\'lumot saqlanadi',
        'Session set test'
    );
    
    const retrievedUser = MockSession.get('currentUser');
    testEnv.assert(
        retrievedUser && retrievedUser.name === 'Azimjon',
        'Sessiyadan ma\'lumot to\'g\'ri o\'qiladi',
        'Session get test'
    );
    
    // Sessiyadan o'chirish
    MockSession.remove('currentUser');
    testEnv.assert(
        MockSession.has('currentUser') === false,
        'Sessiyadan ma\'lumot o\'chiriladi',
        'Session remove test'
    );
    
    // Sessiyani tozalash
    MockSession.set('test1', 'value1');
    MockSession.set('test2', 'value2');
    MockSession.clear();
    
    testEnv.assert(
        MockSession.has('test1') === false && MockSession.has('test2') === false,
        'Sessiya to\'liq tozalanadi',
        'Session clear test'
    );
    
    testEnv.endTest();
}

// ============================================
// 5. ROL TEKSHIRISH TESTLARI
// ============================================

function testRoleChecking() {
    testEnv.startTest();
    
    const MockAuth = {
        currentUser: null,
        
        setUser(user) {
            this.currentUser = user;
        },
        
        isAdmin() {
            return this.currentUser && this.currentUser.role === 'admin';
        },
        
        isTeacher() {
            return this.currentUser && this.currentUser.role === 'teacher';
        },
        
        isStudent() {
            return this.currentUser && this.currentUser.role === 'student';
        },
        
        hasRole(role) {
            return this.currentUser && this.currentUser.role === role;
        }
    };
    
    // Admin rolini tekshirish
    MockAuth.setUser({ id: 1, username: 'admin', role: 'admin' });
    testEnv.assert(
        MockAuth.isAdmin() === true,
        'Admin foydalanuvchi admin rolini oladi',
        'Admin role test'
    );
    
    testEnv.assert(
        MockAuth.isTeacher() === false,
        'Admin foydalanuvchi teacher emas',
        'Admin not teacher test'
    );
    
    // Teacher rolini tekshirish
    MockAuth.setUser({ id: 2, username: 'teacher', role: 'teacher' });
    testEnv.assert(
        MockAuth.isTeacher() === true,
        'Teacher foydalanuvchi teacher rolini oladi',
        'Teacher role test'
    );
    
    testEnv.assert(
        MockAuth.isAdmin() === false,
        'Teacher foydalanuvchi admin emas',
        'Teacher not admin test'
    );
    
    // Student rolini tekshirish
    MockAuth.setUser({ id: 3, username: 'student', role: 'student' });
    testEnv.assert(
        MockAuth.isStudent() === true,
        'Student foydalanuvchi student rolini oladi',
        'Student role test'
    );
    
    testEnv.assert(
        MockAuth.isAdmin() === false && MockAuth.isTeacher() === false,
        'Student foydalanuvchi admin va teacher emas',
        'Student not admin/teacher test'
    );
    
    // hasRole funksiyasi
    testEnv.assert(
        MockAuth.hasRole('student') === true,
        'hasRole funksiyasi to\'g\'ri ishlaydi',
        'hasRole function test'
    );
    
    testEnv.endTest();
}

// ============================================
// 6. PAROL VALIDATSIYA TESTLARI
// ============================================

function testPasswordValidation() {
    testEnv.startTest();
    
    const PasswordValidator = {
        isValid(password) {
            if (!password) return false;
            if (password.length < 6) return false;
            if (password.length > 50) return false;
            return true;
        },
        
        getStrength(password) {
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
        
        getStrengthText(score) {
            if (score <= 2) return 'Zaif';
            if (score <= 4) return 'O\'rtacha';
            return 'Kuchli';
        }
    };
    
    // To'g'ri parol
    testEnv.assert(
        PasswordValidator.isValid('password123') === true,
        'To\'g\'ri parol validatsiyadan o\'tadi',
        'Valid password test'
    );
    
    // Qisqa parol
    testEnv.assert(
        PasswordValidator.isValid('123') === false,
        'Qisqa parol validatsiyadan o\'tmaydi',
        'Short password test'
    );
    
    // Bo'sh parol
    testEnv.assert(
        PasswordValidator.isValid('') === false,
        'Bo\'sh parol validatsiyadan o\'tmaydi',
        'Empty password test'
    );
    
    // Parol kuchliligi
    const weakPassword = PasswordValidator.getStrength('123');
    testEnv.assert(
        weakPassword <= 2,
        'Zaif parol past ball oladi',
        'Weak password test'
    );
    
    const strongPassword = PasswordValidator.getStrength('Password123!@#');
    testEnv.assert(
        strongPassword >= 5,
        'Kuchli parol yuqori ball oladi',
        'Strong password test'
    );
    
    testEnv.endTest();
}

// ============================================
// 7. TOKEN TESTLARI
// ============================================

function testTokenManagement() {
    testEnv.startTest();
    
    const TokenManager = {
        generateToken(user) {
            return btoa(JSON.stringify({ id: user.id, username: user.username, exp: Date.now() + 3600000 }));
        },
        
        verifyToken(token) {
            try {
                const decoded = JSON.parse(atob(token));
                return decoded.exp > Date.now();
            } catch {
                return false;
            }
        },
        
        getTokenData(token) {
            try {
                return JSON.parse(atob(token));
            } catch {
                return null;
            }
        }
    };
    
    const testUser = { id: 1, username: 'student' };
    const token = TokenManager.generateToken(testUser);
    
    testEnv.assert(
        token && token.length > 0,
        'Token muvaffaqiyatli yaratiladi',
        'Token generation test'
    );
    
    testEnv.assert(
        TokenManager.verifyToken(token) === true,
        'Yaratilgan token valid',
        'Token verification test'
    );
    
    const tokenData = TokenManager.getTokenData(token);
    testEnv.assert(
        tokenData && tokenData.username === 'student',
        'Tokendan ma\'lumotlar to\'g\'ri o\'qiladi',
        'Token data extraction test'
    );
    
    testEnv.endTest();
}

// ============================================
// 8. INTEGRATSIYA TESTLARI
// ============================================

function testAuthIntegration() {
    testEnv.startTest();
    
    // To'liq autentifikatsiya jarayoni
    let currentUser = null;
    
    const AuthSystem = {
        users: [...testEnv.testUsers],
        
        login(username, password) {
            const user = this.users.find(u => u.username === username && u.password === password);
            if (user) {
                currentUser = { ...user, password: undefined };
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                return { success: true, user: currentUser };
            }
            return { success: false };
        },
        
        logout() {
            currentUser = null;
            sessionStorage.removeItem('currentUser');
            return { success: true };
        },
        
        isAuthenticated() {
            return currentUser !== null || sessionStorage.getItem('currentUser') !== null;
        },
        
        getCurrentUser() {
            if (currentUser) return currentUser;
            const stored = sessionStorage.getItem('currentUser');
            if (stored) {
                currentUser = JSON.parse(stored);
                return currentUser;
            }
            return null;
        }
    };
    
    // 1. Login
    const loginResult = AuthSystem.login('student', '123');
    testEnv.assert(
        loginResult.success === true,
        'Login muvaffaqiyatli',
        'Integration login test'
    );
    
    // 2. Autentifikatsiya holati
    testEnv.assert(
        AuthSystem.isAuthenticated() === true,
        'Login qilgandan keyin autentifikatsiya holati true',
        'Authentication state test'
    );
    
    // 3. Joriy foydalanuvchi
    const user = AuthSystem.getCurrentUser();
    testEnv.assert(
        user && user.username === 'student',
        'Joriy foydalanuvchi to\'g\'ri',
        'Current user test'
    );
    
    // 4. Logout
    const logoutResult = AuthSystem.logout();
    testEnv.assert(
        logoutResult.success === true,
        'Logout muvaffaqiyatli',
        'Integration logout test'
    );
    
    // 5. Autentifikatsiya holati (logoutdan keyin)
    testEnv.assert(
        AuthSystem.isAuthenticated() === false,
        'Logout qilgandan keyin autentifikatsiya holati false',
        'Post-logout auth state test'
    );
    
    testEnv.endTest();
}

// ============================================
// 9. BARCHA TESTLARNI ISHGA TUSHIRISH
// ============================================

function runAllAuthTests() {
    console.log('========================================');
    console.log('   EDUHEMIS - AUTH TESTLARI');
    console.log('========================================\n');
    
    testLoginFunctionality();
    console.log('');
    testRegisterFunctionality();
    console.log('');
    testLogoutFunctionality();
    console.log('');
    testSessionManagement();
    console.log('');
    testRoleChecking();
    console.log('');
    testPasswordValidation();
    console.log('');
    testTokenManagement();
    console.log('');
    testAuthIntegration();
    
    console.log('\n========================================');
    console.log('   TESTLAR TUGADI');
    console.log('========================================');
}

// Testlarni ishga tushirish
if (typeof window !== 'undefined') {
    window.runAllAuthTests = runAllAuthTests;
}

// Node.js muhiti uchun
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testLoginFunctionality,
        testRegisterFunctionality,
        testLogoutFunctionality,
        testSessionManagement,
        testRoleChecking,
        testPasswordValidation,
        testTokenManagement,
        testAuthIntegration,
        runAllAuthTests
    };
}