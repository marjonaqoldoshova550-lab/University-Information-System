/* ============================================
   EduHemis - Data Unit Testlari
   Ma'lumotlar bazasi funksiyalarini test qilish
   ============================================ */

// Test muhiti sozlamalari
const testEnv = {
    // Test ma'lumotlari
    testData: {
        users: [
            { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Admin User', email: 'admin@edu.uz' },
            { id: 2, username: 'teacher', password: '123', role: 'teacher', name: 'Said Alisherov', email: 's.alisherov@edu.uz', subject: 'Veb dasturlash' },
            { id: 3, username: 'student', password: '123', role: 'student', name: 'Azimjon Karimov', email: 'a.karimov@student.uz', group: 'AT-101-20' }
        ],
        students: [
            { id: 3, name: 'Azimjon Karimov', group: 'AT-101-20', course: 2, email: 'a.karimov@student.uz', phone: '+998901234501' },
            { id: 4, name: 'Ali Valiyev', group: 'AT-101-20', course: 2, email: 'a.valiyev@student.uz', phone: '+998901234502' },
            { id: 5, name: 'Dilya Akramova', group: 'AT-101-20', course: 2, email: 'd.akramova@student.uz', phone: '+998901234503' }
        ],
        teachers: [
            { id: 2, name: 'Said Alisherov', subject: 'Veb dasturlash', department: 'Dasturlash', degree: 'PhD', experience: 12, room: '402' },
            { id: 6, name: 'Nodira Karimova', subject: "Ma'lumotlar bazasi", department: 'Dasturlash', degree: 'PhD', experience: 10, room: '312' }
        ],
        groups: [
            { id: 1, name: 'AT-101-20', faculty: 'Axborot texnologiyalari', course: 2, students: 24, teacherId: 2, year: 2020 },
            { id: 2, name: 'AT-102-20', faculty: 'Axborot texnologiyalari', course: 2, students: 26, teacherId: 6, year: 2020 },
            { id: 3, name: 'KI-201-21', faculty: 'Kompyuter injiniringi', course: 3, students: 22, teacherId: 2, year: 2021 }
        ],
        subjects: [
            { id: 1, name: 'Veb dasturlash', code: 'CS-2024', credits: 5, hours: 120, teacherId: 2, semester: 4 },
            { id: 2, name: "Ma'lumotlar bazasi", code: 'DB-4001', credits: 4, hours: 96, teacherId: 6, semester: 3 },
            { id: 3, name: 'Kiberxavfsizlik', code: 'SEC-102', credits: 4, hours: 96, teacherId: 2, semester: 5 }
        ],
        lessons: [
            { id: 1, teacherId: 2, groupId: 1, subjectId: 1, topic: 'HTML asoslari', date: '2025-03-20', time: '09:00-10:20', room: '402' },
            { id: 2, teacherId: 2, groupId: 1, subjectId: 1, topic: 'CSS stillar', date: '2025-03-22', time: '09:00-10:20', room: '402' }
        ],
        tasks: [
            { id: 1, teacherId: 2, groupId: 1, subjectId: 1, title: 'HTML portfolio', description: 'Shaxsiy portfolio sayt', deadline: '2025-03-25', maxScore: 100, students: [{ studentId: 3, status: 'pending' }] }
        ],
        grades: [
            { id: 1, studentId: 3, subjectId: 1, grade: 5, date: '2025-03-10', type: 'exam' },
            { id: 2, studentId: 3, subjectId: 1, grade: 4, date: '2025-03-17', type: 'exam' }
        ],
        attendance: [
            { id: 1, studentId: 3, lessonId: 1, date: '2025-03-20', status: 'present' },
            { id: 2, studentId: 4, lessonId: 1, date: '2025-03-20', status: 'present' }
        ]
    },
    
    // Test natijalari
    results: { passed: 0, failed: 0, total: 0 },
    logs: [],
    
    // Test boshlandi
    startTest() {
        this.results = { passed: 0, failed: 0, total: 0 };
        this.logs = [];
        console.log('🧪 Data testlari boshlandi...\n');
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
        localStorage.removeItem('students');
        localStorage.removeItem('teachers');
        localStorage.removeItem('groups');
        localStorage.removeItem('subjects');
        localStorage.removeItem('lessons');
        localStorage.removeItem('tasks');
        localStorage.removeItem('grades');
        localStorage.removeItem('attendance');
    }
};

// ============================================
// 1. MA'LUMOTLAR BAZASI INIT TESTLARI
// ============================================

function testDataBaseInitialization() {
    testEnv.startTest();
    
    const MockDataBase = {
        users: [],
        students: [],
        teachers: [],
        groups: [],
        subjects: [],
        lessons: [],
        tasks: [],
        grades: [],
        attendance: [],
        
        init() {
            this.users = [...testEnv.testData.users];
            this.students = [...testEnv.testData.students];
            this.teachers = [...testEnv.testData.teachers];
            this.groups = [...testEnv.testData.groups];
            this.subjects = [...testEnv.testData.subjects];
            this.lessons = [...testEnv.testData.lessons];
            this.tasks = [...testEnv.testData.tasks];
            this.grades = [...testEnv.testData.grades];
            this.attendance = [...testEnv.testData.attendance];
        },
        
        clear() {
            this.users = [];
            this.students = [];
            this.teachers = [];
            this.groups = [];
            this.subjects = [];
            this.lessons = [];
            this.tasks = [];
            this.grades = [];
            this.attendance = [];
        }
    };
    
    // Ma'lumotlar bazasini ishga tushirish
    MockDataBase.init();
    
    testEnv.assert(
        MockDataBase.users.length === 3,
        'Foydalanuvchilar ro\'yxati to\'g\'ri yuklanadi',
        'Users initialization test'
    );
    
    testEnv.assert(
        MockDataBase.students.length === 3,
        'Talabalar ro\'yxati to\'g\'ri yuklanadi',
        'Students initialization test'
    );
    
    testEnv.assert(
        MockDataBase.teachers.length === 2,
        'O\'qituvchilar ro\'yxati to\'g\'ri yuklanadi',
        'Teachers initialization test'
    );
    
    testEnv.assert(
        MockDataBase.groups.length === 3,
        'Guruhlar ro\'yxati to\'g\'ri yuklanadi',
        'Groups initialization test'
    );
    
    testEnv.assert(
        MockDataBase.subjects.length === 3,
        'Fanlar ro\'yxati to\'g\'ri yuklanadi',
        'Subjects initialization test'
    );
    
    testEnv.assert(
        MockDataBase.lessons.length === 2,
        'Darslar ro\'yxati to\'g\'ri yuklanadi',
        'Lessons initialization test'
    );
    
    testEnv.endTest();
}

// ============================================
// 2. CRUD OPERATSIYALARI TESTLARI
// ============================================

function testCRUDOperations() {
    testEnv.startTest();
    
    const MockDataBase = {
        users: [...testEnv.testData.users],
        
        // CREATE
        addUser(user) {
            const newUser = { id: this.users.length + 1, ...user, createdAt: new Date().toISOString() };
            this.users.push(newUser);
            return newUser;
        },
        
        // READ
        getUser(id) {
            return this.users.find(u => u.id === id);
        },
        
        getAllUsers() {
            return [...this.users];
        },
        
        // UPDATE
        updateUser(id, updates) {
            const index = this.users.findIndex(u => u.id === id);
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...updates, updatedAt: new Date().toISOString() };
                return this.users[index];
            }
            return null;
        },
        
        // DELETE
        deleteUser(id) {
            const index = this.users.findIndex(u => u.id === id);
            if (index !== -1) {
                this.users.splice(index, 1);
                return true;
            }
            return false;
        }
    };
    
    // CREATE test
    const newUser = { username: 'newuser', password: '123', role: 'student', name: 'Yangi Talaba', email: 'new@student.uz' };
    const createdUser = MockDataBase.addUser(newUser);
    
    testEnv.assert(
        createdUser.id === 4,
        'Yangi foydalanuvchi qo\'shilganda ID avtomatik beriladi',
        'Create operation test'
    );
    
    testEnv.assert(
        createdUser.username === 'newuser',
        'Yangi foydalanuvchi ma\'lumotlari to\'g\'ri saqlanadi',
        'Create data test'
    );
    
    // READ test
    const retrievedUser = MockDataBase.getUser(1);
    testEnv.assert(
        retrievedUser && retrievedUser.username === 'admin',
        'Foydalanuvchi ID bo\'yicha to\'g\'ri topiladi',
        'Read operation test'
    );
    
    const allUsers = MockDataBase.getAllUsers();
    testEnv.assert(
        allUsers.length === 4,
        'Barcha foydalanuvchilar ro\'yxati to\'g\'ri qaytariladi',
        'Get all operation test'
    );
    
    // UPDATE test
    const updatedUser = MockDataBase.updateUser(1, { name: 'Yangilangan Admin' });
    testEnv.assert(
        updatedUser && updatedUser.name === 'Yangilangan Admin',
        'Foydalanuvchi ma\'lumotlari yangilanadi',
        'Update operation test'
    );
    
    // DELETE test
    const deleted = MockDataBase.deleteUser(4);
    testEnv.assert(
        deleted === true,
        'Foydalanuvchi o\'chiriladi',
        'Delete operation test'
    );
    
    testEnv.assert(
        MockDataBase.getUser(4) === undefined,
        'O\'chirilgan foydalanuvchi topilmaydi',
        'Delete verification test'
    );
    
    testEnv.endTest();
}

// ============================================
// 3. QIDIRUV VA FILTRLASH TESTLARI
// ============================================

function testSearchAndFilter() {
    testEnv.startTest();
    
    const DataManager = {
        students: [...testEnv.testData.students],
        
        searchStudents(query) {
            if (!query) return this.students;
            const lowerQuery = query.toLowerCase();
            return this.students.filter(s => 
                s.name.toLowerCase().includes(lowerQuery) ||
                s.group.toLowerCase().includes(lowerQuery) ||
                s.email.toLowerCase().includes(lowerQuery)
            );
        },
        
        filterByGroup(group) {
            if (!group) return this.students;
            return this.students.filter(s => s.group === group);
        },
        
        filterByCourse(course) {
            if (!course) return this.students;
            return this.students.filter(s => s.course === course);
        },
        
        filterByAttendance(minAttendance) {
            // Simulyatsiya
            return this.students;
        },
        
        sortBy(field, order = 'asc') {
            const sorted = [...this.students];
            sorted.sort((a, b) => {
                if (order === 'asc') {
                    return a[field] > b[field] ? 1 : -1;
                } else {
                    return a[field] < b[field] ? 1 : -1;
                }
            });
            return sorted;
        }
    };
    
    // Qidiruv testi
    const searchResults = DataManager.searchStudents('Azimjon');
    testEnv.assert(
        searchResults.length === 1 && searchResults[0].name === 'Azimjon Karimov',
        'Ism bo\'yicha qidirish ishlaydi',
        'Search by name test'
    );
    
    const groupSearch = DataManager.searchStudents('AT-101-20');
    testEnv.assert(
        groupSearch.length === 3,
        'Guruh bo\'yicha qidirish ishlaydi',
        'Search by group test'
    );
    
    // Filtrlash testi
    const groupFilter = DataManager.filterByGroup('AT-101-20');
    testEnv.assert(
        groupFilter.length === 3,
        'Guruh bo\'yicha filtrlash ishlaydi',
        'Filter by group test'
    );
    
    const courseFilter = DataManager.filterByCourse(2);
    testEnv.assert(
        courseFilter.length === 3,
        'Kurs bo\'yicha filtrlash ishlaydi',
        'Filter by course test'
    );
    
    // Saralash testi
    const sortedByName = DataManager.sortBy('name', 'asc');
    testEnv.assert(
        sortedByName[0].name === 'Ali Valiyev',
        'Ism bo\'yicha o\'sish tartibida saralash ishlaydi',
        'Sort by name asc test'
    );
    
    const sortedByNameDesc = DataManager.sortBy('name', 'desc');
    testEnv.assert(
        sortedByNameDesc[0].name === 'Dilya Akramova',
        'Ism bo\'yicha kamayish tartibida saralash ishlaydi',
        'Sort by name desc test'
    );
    
    testEnv.endTest();
}

// ============================================
// 4. BOG'LIQ MA'LUMOTLAR TESTLARI
// ============================================

function testRelatedData() {
    testEnv.startTest();
    
    const RelatedDataManager = {
        groups: [...testEnv.testData.groups],
        students: [...testEnv.testData.students],
        teachers: [...testEnv.testData.teachers],
        subjects: [...testEnv.testData.subjects],
        
        getGroupStudents(groupId) {
            const group = this.groups.find(g => g.id === groupId);
            if (!group) return [];
            return this.students.filter(s => s.group === group.name);
        },
        
        getTeacherGroups(teacherId) {
            return this.groups.filter(g => g.teacherId === teacherId);
        },
        
        getSubjectTeacher(subjectId) {
            const subject = this.subjects.find(s => s.id === subjectId);
            if (!subject) return null;
            return this.teachers.find(t => t.id === subject.teacherId);
        },
        
        getGroupAverageGrade(groupId) {
            // Simulyatsiya
            return 4.5;
        },
        
        getTeacherStudents(teacherId) {
            const groups = this.getTeacherGroups(teacherId);
            const groupNames = groups.map(g => g.name);
            return this.students.filter(s => groupNames.includes(s.group));
        }
    };
    
    // Guruh talabalarini olish
    const groupStudents = RelatedDataManager.getGroupStudents(1);
    testEnv.assert(
        groupStudents.length === 3,
        'Guruhdagi talabalar ro\'yxati to\'g\'ri olinadi',
        'Get group students test'
    );
    
    // O'qituvchi guruhlarini olish
    const teacherGroups = RelatedDataManager.getTeacherGroups(2);
    testEnv.assert(
        teacherGroups.length === 2,
        'O\'qituvchining guruhlari to\'g\'ri olinadi',
        'Get teacher groups test'
    );
    
    // Fan o'qituvchisini olish
    const subjectTeacher = RelatedDataManager.getSubjectTeacher(1);
    testEnv.assert(
        subjectTeacher && subjectTeacher.name === 'Said Alisherov',
        'Fan o\'qituvchisi to\'g\'ri olinadi',
        'Get subject teacher test'
    );
    
    // O'qituvchi talabalarini olish
    const teacherStudents = RelatedDataManager.getTeacherStudents(2);
    testEnv.assert(
        teacherStudents.length === 3,
        'O\'qituvchining talabalari to\'g\'ri olinadi',
        'Get teacher students test'
    );
    
    testEnv.endTest();
}

// ============================================
// 5. VALIDATSIYA TESTLARI
// ============================================

function testDataValidation() {
    testEnv.startTest();
    
    const DataValidator = {
        validateUser(user) {
            if (!user.username) return { valid: false, error: 'Login kiritilishi shart' };
            if (!user.password) return { valid: false, error: 'Parol kiritilishi shart' };
            if (!user.name) return { valid: false, error: 'Ism kiritilishi shart' };
            if (!user.email) return { valid: false, error: 'Email kiritilishi shart' };
            if (user.password.length < 3) return { valid: false, error: 'Parol kamida 3 belgi' };
            return { valid: true };
        },
        
        validateStudent(student) {
            if (!student.name) return { valid: false, error: 'Ism kiritilishi shart' };
            if (!student.group) return { valid: false, error: 'Guruh kiritilishi shart' };
            if (!student.course) return { valid: false, error: 'Kurs kiritilishi shart' };
            if (student.course < 1 || student.course > 4) return { valid: false, error: 'Kurs 1-4 oralig\'ida' };
            return { valid: true };
        },
        
        validateTeacher(teacher) {
            if (!teacher.name) return { valid: false, error: 'Ism kiritilishi shart' };
            if (!teacher.subject) return { valid: false, error: 'Fan kiritilishi shart' };
            if (!teacher.department) return { valid: false, error: 'Kafedra kiritilishi shart' };
            return { valid: true };
        },
        
        validateGrade(grade) {
            if (grade === undefined || grade === null) return { valid: false, error: 'Baho kiritilishi shart' };
            if (grade < 2 || grade > 5) return { valid: false, error: 'Baho 2-5 oralig\'ida bo\'lishi kerak' };
            return { valid: true };
        }
    };
    
    // To'g'ri foydalanuvchi validatsiyasi
    const validUser = { username: 'test', password: '123', name: 'Test', email: 'test@edu.uz' };
    const validUserResult = DataValidator.validateUser(validUser);
    testEnv.assert(
        validUserResult.valid === true,
        'To\'g\'ri foydalanuvchi validatsiyadan o\'tadi',
        'Valid user validation test'
    );
    
    // Noto'g'ri foydalanuvchi
    const invalidUser = { username: '', password: '12', name: '', email: '' };
    const invalidUserResult = DataValidator.validateUser(invalidUser);
    testEnv.assert(
        invalidUserResult.valid === false,
        'Noto\'g\'ri foydalanuvchi validatsiyadan o\'tmaydi',
        'Invalid user validation test'
    );
    
    // To'g'ri talaba validatsiyasi
    const validStudent = { name: 'Test', group: 'AT-101-20', course: 2 };
    const validStudentResult = DataValidator.validateStudent(validStudent);
    testEnv.assert(
        validStudentResult.valid === true,
        'To\'g\'ri talaba validatsiyadan o\'tadi',
        'Valid student validation test'
    );
    
    // Noto'g'ri talaba (kurs)
    const invalidStudent = { name: 'Test', group: 'AT-101-20', course: 5 };
    const invalidStudentResult = DataValidator.validateStudent(invalidStudent);
    testEnv.assert(
        invalidStudentResult.valid === false,
        'Noto\'g\'ri kurs bilan talaba validatsiyadan o\'tmaydi',
        'Invalid course validation test'
    );
    
    // Baho validatsiyasi
    const validGrade = DataValidator.validateGrade(5);
    testEnv.assert(
        validGrade.valid === true,
        'To\'g\'ri baho validatsiyadan o\'tadi',
        'Valid grade validation test'
    );
    
    const invalidGrade = DataValidator.validateGrade(6);
    testEnv.assert(
        invalidGrade.valid === false,
        'Noto\'g\'ri baho validatsiyadan o\'tmaydi',
        'Invalid grade validation test'
    );
    
    testEnv.endTest();
}

// ============================================
// 6. STATISTIKA HISOBLARI TESTLARI
// ============================================

function testDataStatistics() {
    testEnv.startTest();
    
    const StatisticsCalculator = {
        students: [...testEnv.testData.students],
        grades: [...testEnv.testData.grades],
        
        getTotalStudents() {
            return this.students.length;
        },
        
        getStudentsByGroup() {
            const groups = {};
            this.students.forEach(s => {
                groups[s.group] = (groups[s.group] || 0) + 1;
            });
            return groups;
        },
        
        getStudentsByCourse() {
            const courses = { 1: 0, 2: 0, 3: 0, 4: 0 };
            this.students.forEach(s => {
                courses[s.course] = (courses[s.course] || 0) + 1;
            });
            return courses;
        },
        
        getAverageGrade(studentId) {
            const studentGrades = this.grades.filter(g => g.studentId === studentId);
            if (studentGrades.length === 0) return 0;
            const sum = studentGrades.reduce((acc, g) => acc + g.grade, 0);
            return sum / studentGrades.length;
        },
        
        getGradeDistribution() {
            const distribution = { 5: 0, 4: 0, 3: 0, 2: 0 };
            this.grades.forEach(g => {
                distribution[g.grade] = (distribution[g.grade] || 0) + 1;
            });
            return distribution;
        }
    };
    
    // Jami talabalar soni
    testEnv.assert(
        StatisticsCalculator.getTotalStudents() === 3,
        'Jami talabalar soni to\'g\'ri hisoblanadi',
        'Total students test'
    );
    
    // Guruhlar bo'yicha talabalar
    const groups = StatisticsCalculator.getStudentsByGroup();
    testEnv.assert(
        groups['AT-101-20'] === 3,
        'Guruhlar bo\'yicha talabalar soni to\'g\'ri hisoblanadi',
        'Students by group test'
    );
    
    // Kurslar bo'yicha talabalar
    const courses = StatisticsCalculator.getStudentsByCourse();
    testEnv.assert(
        courses[2] === 3,
        'Kurslar bo\'yicha talabalar soni to\'g\'ri hisoblanadi',
        'Students by course test'
    );
    
    // O'rtacha baho
    const avgGrade = StatisticsCalculator.getAverageGrade(3);
    testEnv.assert(
        avgGrade === 4.5,
        'Talabaning o\'rtacha bahosi to\'g\'ri hisoblanadi',
        'Average grade test'
    );
    
    // Baholar taqsimoti
    const distribution = StatisticsCalculator.getGradeDistribution();
    testEnv.assert(
        distribution[5] === 1 && distribution[4] === 1,
        'Baholar taqsimoti to\'g\'ri hisoblanadi',
        'Grade distribution test'
    );
    
    testEnv.endTest();
}

// ============================================
// 7. LOCALSTORAGE INTEGRATSIYA TESTLARI
// ============================================

function testLocalStorageIntegration() {
    testEnv.startTest();
    
    const StorageManager = {
        saveData(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch {
                return false;
            }
        },
        
        loadData(key) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch {
                return null;
            }
        },
        
        removeData(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch {
                return false;
            }
        },
        
        clearAll() {
            try {
                localStorage.clear();
                return true;
            } catch {
                return false;
            }
        }
    };
    
    // Ma'lumot saqlash
    const testUsers = [...testEnv.testData.users];
    const saved = StorageManager.saveData('test_users', testUsers);
    testEnv.assert(
        saved === true,
        'Ma\'lumotlar LocalStorage ga saqlanadi',
        'Save to localStorage test'
    );
    
    // Ma'lumot o'qish
    const loadedUsers = StorageManager.loadData('test_users');
    testEnv.assert(
        loadedUsers && loadedUsers.length === 3,
        'Ma\'lumotlar LocalStorage dan o\'qiladi',
        'Load from localStorage test'
    );
    
    // Ma'lumot o'chirish
    const removed = StorageManager.removeData('test_users');
    testEnv.assert(
        removed === true,
        'Ma\'lumotlar LocalStorage dan o\'chiriladi',
        'Remove from localStorage test'
    );
    
    const deletedData = StorageManager.loadData('test_users');
    testEnv.assert(
        deletedData === null,
        'O\'chirilgan ma\'lumotlar mavjud emas',
        'Verify removal test'
    );
    
    testEnv.endTest();
}

// ============================================
// 8. EKSPORT/IMPORT TESTLARI
// ============================================

function testExportImport() {
    testEnv.startTest();
    
    const ExportImportManager = {
        data: {
            users: [...testEnv.testData.users],
            students: [...testEnv.testData.students],
            teachers: [...testEnv.testData.teachers]
        },
        
        exportData() {
            return JSON.stringify(this.data, null, 2);
        },
        
        importData(jsonData) {
            try {
                const imported = JSON.parse(jsonData);
                this.data = imported;
                return true;
            } catch {
                return false;
            }
        },
        
        exportToCSV(type) {
            let data = [];
            if (type === 'students') data = this.data.students;
            else if (type === 'teachers') data = this.data.teachers;
            else if (type === 'users') data = this.data.users;
            
            if (data.length === 0) return '';
            
            const headers = Object.keys(data[0]);
            const rows = data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','));
            return [headers.join(','), ...rows].join('\n');
        }
    };
    
    // JSON eksport
    const jsonExport = ExportImportManager.exportData();
    testEnv.assert(
        jsonExport && jsonExport.includes('users'),
        'Ma\'lumotlar JSON formatida eksport qilinadi',
        'JSON export test'
    );
    
    // JSON import
    const testData = { users: [], students: [], teachers: [] };
    const importResult = ExportImportManager.importData(JSON.stringify(testData));
    testEnv.assert(
        importResult === true,
        'Ma\'lumotlar JSON formatida import qilinadi',
        'JSON import test'
    );
    
    // CSV eksport (talabalar)
    const csvExport = ExportImportManager.exportToCSV('students');
    testEnv.assert(
        csvExport.includes('Azimjon Karimov'),
        'Talabalar ma\'lumotlari CSV formatida eksport qilinadi',
        'CSV export test'
    );
    
    testEnv.endTest();
}

// ============================================
// 9. BARCHA TESTLARNI ISHGA TUSHIRISH
// ============================================

function runAllDataTests() {
    console.log('========================================');
    console.log('   EDUHEMIS - DATA TESTLARI');
    console.log('========================================\n');
    
    testDataBaseInitialization();
    console.log('');
    testCRUDOperations();
    console.log('');
    testSearchAndFilter();
    console.log('');
    testRelatedData();
    console.log('');
    testDataValidation();
    console.log('');
    testDataStatistics();
    console.log('');
    testLocalStorageIntegration();
    console.log('');
    testExportImport();
    
    console.log('\n========================================');
    console.log('   TESTLAR TUGADI');
    console.log('========================================');
}

// Testlarni ishga tushirish
if (typeof window !== 'undefined') {
    window.runAllDataTests = runAllDataTests;
}

// Node.js muhiti uchun
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testDataBaseInitialization,
        testCRUDOperations,
        testSearchAndFilter,
        testRelatedData,
        testDataValidation,
        testDataStatistics,
        testLocalStorageIntegration,
        testExportImport,
        runAllDataTests
    };
}