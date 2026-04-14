/* ============================================
   EduHemis - Integratsiya Testlari
   Ilovaning barcha qismlari birgalikda ishlashini test qilish
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
            { id: 4, name: 'Ali Valiyev', group: 'AT-101-20', course: 2, email: 'a.valiyev@student.uz', phone: '+998901234502' }
        ],
        teachers: [
            { id: 2, name: 'Said Alisherov', subject: 'Veb dasturlash', department: 'Dasturlash', degree: 'PhD', experience: 12, room: '402' }
        ],
        groups: [
            { id: 1, name: 'AT-101-20', faculty: 'Axborot texnologiyalari', course: 2, students: 24, teacherId: 2, year: 2020 }
        ],
        subjects: [
            { id: 1, name: 'Veb dasturlash', code: 'CS-2024', credits: 5, hours: 120, teacherId: 2, semester: 4 }
        ],
        lessons: [
            { id: 1, teacherId: 2, groupId: 1, subjectId: 1, topic: 'HTML asoslari', date: '2025-03-20', time: '09:00-10:20', room: '402' }
        ],
        tasks: [
            { id: 1, teacherId: 2, groupId: 1, subjectId: 1, title: 'HTML portfolio', description: 'Shaxsiy portfolio sayt', deadline: '2025-03-25', maxScore: 100 }
        ],
        grades: [
            { id: 1, studentId: 3, subjectId: 1, grade: 5, date: '2025-03-10', type: 'exam' }
        ],
        attendance: [
            { id: 1, studentId: 3, lessonId: 1, date: '2025-03-20', status: 'present' }
        ]
    },
    
    // Test natijalari
    results: { passed: 0, failed: 0, total: 0 },
    logs: [],
    
    // Test boshlandi
    startTest() {
        this.results = { passed: 0, failed: 0, total: 0 };
        this.logs = [];
        console.log('🧪 Integratsiya testlari boshlandi...\n');
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
        localStorage.clear();
        sessionStorage.clear();
    }
};

// ============================================
// 1. LOGIN INTEGRATSIYA TESTI
// ============================================

function testLoginIntegration() {
    testEnv.startTest();
    
    // Mock Auth tizimi
    const AuthSystem = {
        users: [...testEnv.testData.users],
        currentUser: null,
        
        login(username, password) {
            const user = this.users.find(u => u.username === username && u.password === password);
            if (user) {
                this.currentUser = { ...user, password: undefined };
                sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                return { success: true, user: this.currentUser };
            }
            return { success: false, message: 'Login yoki parol noto\'g\'ri' };
        },
        
        logout() {
            this.currentUser = null;
            sessionStorage.removeItem('currentUser');
            return { success: true };
        },
        
        isAuthenticated() {
            return this.currentUser !== null || sessionStorage.getItem('currentUser') !== null;
        },
        
        getCurrentUser() {
            if (this.currentUser) return this.currentUser;
            const stored = sessionStorage.getItem('currentUser');
            if (stored) {
                this.currentUser = JSON.parse(stored);
                return this.currentUser;
            }
            return null;
        },
        
        hasRole(role) {
            const user = this.getCurrentUser();
            return user && user.role === role;
        }
    };
    
    // Dashboard komponenti
    const Dashboard = {
        currentView: null,
        
        loadDashboard(user) {
            if (user.role === 'student') {
                this.currentView = 'student';
                return { view: 'student', data: { name: user.name, group: user.group } };
            } else if (user.role === 'teacher') {
                this.currentView = 'teacher';
                return { view: 'teacher', data: { name: user.name, subject: user.subject } };
            } else {
                this.currentView = 'admin';
                return { view: 'admin', data: { name: user.name } };
            }
        }
    };
    
    // 1. Login qilish
    const loginResult = AuthSystem.login('student', '123');
    testEnv.assert(
        loginResult.success === true,
        'Login muvaffaqiyatli',
        'Login success test'
    );
    
    testEnv.assert(
        AuthSystem.isAuthenticated() === true,
        'Login qilgandan keyin autentifikatsiya holati true',
        'Authentication state test'
    );
    
    const currentUser = AuthSystem.getCurrentUser();
    testEnv.assert(
        currentUser && currentUser.username === 'student',
        'Joriy foydalanuvchi to\'g\'ri',
        'Current user test'
    );
    
    // 2. Rol bo'yicha dashboard yuklash
    const dashboard = Dashboard.loadDashboard(currentUser);
    testEnv.assert(
        dashboard.view === 'student',
        'Talaba uchun student dashboard yuklanadi',
        'Student dashboard test'
    );
    
    testEnv.assert(
        dashboard.data.name === 'Azimjon Karimov',
        'Dashboardda foydalanuvchi nomi ko\'rinadi',
        'Dashboard user name test'
    );
    
    // 3. Logout qilish
    const logoutResult = AuthSystem.logout();
    testEnv.assert(
        logoutResult.success === true,
        'Logout muvaffaqiyatli',
        'Logout success test'
    );
    
    testEnv.assert(
        AuthSystem.isAuthenticated() === false,
        'Logout qilgandan keyin autentifikatsiya holati false',
        'Post-logout auth test'
    );
    
    testEnv.endTest();
}

// ============================================
// 2. TALABA PANELI INTEGRATSIYA TESTI
// ============================================

function testStudentPanelIntegration() {
    testEnv.startTest();
    
    // Mock ma'lumotlar
    const DataBase = {
        students: [...testEnv.testData.students],
        teachers: [...testEnv.testData.teachers],
        subjects: [...testEnv.testData.subjects],
        tasks: [...testEnv.testData.tasks],
        grades: [...testEnv.testData.grades],
        attendance: [...testEnv.testData.attendance],
        
        getStudentById(id) {
            return this.students.find(s => s.id === id);
        },
        
        getStudentGrades(studentId) {
            return this.grades.filter(g => g.studentId === studentId);
        },
        
        getStudentAttendance(studentId) {
            return this.attendance.filter(a => a.studentId === studentId);
        },
        
        getStudentTasks(studentId) {
            return this.tasks.filter(t => t.groupId === 1);
        },
        
        getAllTeachers() {
            return [...this.teachers];
        }
    };
    
    // Talaba paneli
    const StudentPanel = {
        currentStudent: null,
        
        init(studentId) {
            this.currentStudent = DataBase.getStudentById(studentId);
            return this.currentStudent !== null;
        },
        
        getDashboardData() {
            if (!this.currentStudent) return null;
            
            return {
                student: this.currentStudent,
                grades: DataBase.getStudentGrades(this.currentStudent.id),
                attendance: DataBase.getStudentAttendance(this.currentStudent.id),
                tasks: DataBase.getStudentTasks(this.currentStudent.id),
                teachers: DataBase.getAllTeachers()
            };
        },
        
        getAverageGrade() {
            const grades = DataBase.getStudentGrades(this.currentStudent.id);
            if (grades.length === 0) return 0;
            const sum = grades.reduce((acc, g) => acc + g.grade, 0);
            return sum / grades.length;
        },
        
        getAttendancePercentage() {
            const attendance = DataBase.getStudentAttendance(this.currentStudent.id);
            if (attendance.length === 0) return 0;
            const present = attendance.filter(a => a.status === 'present').length;
            return (present / attendance.length) * 100;
        }
    };
    
    // Talaba panelini ishga tushirish
    const initResult = StudentPanel.init(3);
    testEnv.assert(
        initResult === true,
        'Talaba paneli muvaffaqiyatli ishga tushadi',
        'Student panel init test'
    );
    
    // Dashboard ma'lumotlarini olish
    const dashboardData = StudentPanel.getDashboardData();
    testEnv.assert(
        dashboardData !== null,
        'Dashboard ma\'lumotlari mavjud',
        'Dashboard data test'
    );
    
    testEnv.assert(
        dashboardData.student.name === 'Azimjon Karimov',
        'Talaba ma\'lumotlari to\'g\'ri',
        'Student data test'
    );
    
    testEnv.assert(
        dashboardData.grades.length === 1,
        'Baholar ma\'lumotlari to\'g\'ri',
        'Grades data test'
    );
    
    testEnv.assert(
        dashboardData.attendance.length === 1,
        'Davomat ma\'lumotlari to\'g\'ri',
        'Attendance data test'
    );
    
    testEnv.assert(
        dashboardData.teachers.length === 1,
        'O\'qituvchilar ma\'lumotlari to\'g\'ri',
        'Teachers data test'
    );
    
    // O'rtacha baho
    const avgGrade = StudentPanel.getAverageGrade();
    testEnv.assert(
        avgGrade === 5,
        'O\'rtacha baho to\'g\'ri hisoblanadi',
        'Average grade test'
    );
    
    // Davomat foizi
    const attendancePercent = StudentPanel.getAttendancePercentage();
    testEnv.assert(
        attendancePercent === 100,
        'Davomat foizi to\'g\'ri hisoblanadi',
        'Attendance percentage test'
    );
    
    testEnv.endTest();
}

// ============================================
// 3. O'QITUVCHI PANELI INTEGRATSIYA TESTI
// ============================================

function testTeacherPanelIntegration() {
    testEnv.startTest();
    
    // Mock ma'lumotlar
    const DataBase = {
        teachers: [...testEnv.testData.teachers],
        groups: [...testEnv.testData.groups],
        students: [...testEnv.testData.students],
        lessons: [...testEnv.testData.lessons],
        tasks: [...testEnv.testData.tasks],
        
        getTeacherById(id) {
            return this.teachers.find(t => t.id === id);
        },
        
        getTeacherGroups(teacherId) {
            return this.groups.filter(g => g.teacherId === teacherId);
        },
        
        getGroupStudents(groupId) {
            const group = this.groups.find(g => g.id === groupId);
            if (!group) return [];
            return this.students.filter(s => s.group === group.name);
        },
        
        getTeacherLessons(teacherId) {
            return this.lessons.filter(l => l.teacherId === teacherId);
        },
        
        getTeacherTasks(teacherId) {
            return this.tasks.filter(t => t.teacherId === teacherId);
        },
        
        addTask(task) {
            const newTask = { id: this.tasks.length + 1, ...task };
            this.tasks.push(newTask);
            return newTask;
        }
    };
    
    // O'qituvchi paneli
    const TeacherPanel = {
        currentTeacher: null,
        
        init(teacherId) {
            this.currentTeacher = DataBase.getTeacherById(teacherId);
            return this.currentTeacher !== null;
        },
        
        getDashboardData() {
            if (!this.currentTeacher) return null;
            
            return {
                teacher: this.currentTeacher,
                groups: DataBase.getTeacherGroups(this.currentTeacher.id),
                lessons: DataBase.getTeacherLessons(this.currentTeacher.id),
                tasks: DataBase.getTeacherTasks(this.currentTeacher.id)
            };
        },
        
        getGroupStudents(groupId) {
            return DataBase.getGroupStudents(groupId);
        },
        
        createTask(taskData) {
            return DataBase.addTask({
                teacherId: this.currentTeacher.id,
                ...taskData,
                createdAt: new Date().toISOString()
            });
        },
        
        getTodayLessons() {
            const today = new Date().toISOString().split('T')[0];
            return DataBase.getTeacherLessons(this.currentTeacher.id).filter(l => l.date === today);
        }
    };
    
    // O'qituvchi panelini ishga tushirish
    const initResult = TeacherPanel.init(2);
    testEnv.assert(
        initResult === true,
        'O\'qituvchi paneli muvaffaqiyatli ishga tushadi',
        'Teacher panel init test'
    );
    
    // Dashboard ma'lumotlarini olish
    const dashboardData = TeacherPanel.getDashboardData();
    testEnv.assert(
        dashboardData !== null,
        'Dashboard ma\'lumotlari mavjud',
        'Dashboard data test'
    );
    
    testEnv.assert(
        dashboardData.teacher.name === 'Said Alisherov',
        'O\'qituvchi ma\'lumotlari to\'g\'ri',
        'Teacher data test'
    );
    
    testEnv.assert(
        dashboardData.groups.length === 1,
        'Guruhlar ma\'lumotlari to\'g\'ri',
        'Groups data test'
    );
    
    testEnv.assert(
        dashboardData.lessons.length === 1,
        'Darslar ma\'lumotlari to\'g\'ri',
        'Lessons data test'
    );
    
    // Guruh talabalarini olish
    const groupStudents = TeacherPanel.getGroupStudents(1);
    testEnv.assert(
        groupStudents.length === 2,
        'Guruhdagi talabalar ro\'yxati to\'g\'ri',
        'Group students test'
    );
    
    // Yangi vazifa yaratish
    const newTask = TeacherPanel.createTask({
        title: 'Yangi vazifa',
        description: 'Test vazifasi',
        deadline: '2025-04-15',
        groupId: 1,
        subjectId: 1,
        maxScore: 100
    });
    
    testEnv.assert(
        newTask.id === 2,
        'Yangi vazifa muvaffaqiyatli yaratiladi',
        'Create task test'
    );
    
    // Bugungi darslar
    const todayLessons = TeacherPanel.getTodayLessons();
    testEnv.assert(
        todayLessons.length === 1,
        'Bugungi darslar ro\'yxati to\'g\'ri',
        'Today lessons test'
    );
    
    testEnv.endTest();
}

// ============================================
// 4. ADMIN PANELI INTEGRATSIYA TESTI
// ============================================

function testAdminPanelIntegration() {
    testEnv.startTest();
    
    // Mock ma'lumotlar
    const DataBase = {
        users: [...testEnv.testData.users],
        students: [...testEnv.testData.students],
        teachers: [...testEnv.testData.teachers],
        groups: [...testEnv.testData.groups],
        subjects: [...testEnv.testData.subjects],
        
        getAllUsers() {
            return [...this.users];
        },
        
        getAllStudents() {
            return [...this.students];
        },
        
        getAllTeachers() {
            return [...this.teachers];
        },
        
        getAllGroups() {
            return [...this.groups];
        },
        
        getAllSubjects() {
            return [...this.subjects];
        },
        
        addUser(user) {
            const newUser = { id: this.users.length + 1, ...user, createdAt: new Date().toISOString() };
            this.users.push(newUser);
            return newUser;
        },
        
        deleteUser(id) {
            this.users = this.users.filter(u => u.id !== id);
            return true;
        },
        
        updateUser(id, updates) {
            const index = this.users.findIndex(u => u.id === id);
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...updates };
                return this.users[index];
            }
            return null;
        }
    };
    
    // Admin paneli
    const AdminPanel = {
        getStatistics() {
            return {
                totalUsers: DataBase.getAllUsers().length,
                totalStudents: DataBase.getAllStudents().length,
                totalTeachers: DataBase.getAllTeachers().length,
                totalGroups: DataBase.getAllGroups().length,
                totalSubjects: DataBase.getAllSubjects().length
            };
        },
        
        createUser(userData) {
            return DataBase.addUser(userData);
        },
        
        updateUser(userId, updates) {
            return DataBase.updateUser(userId, updates);
        },
        
        deleteUser(userId) {
            return DataBase.deleteUser(userId);
        },
        
        getAllUsers() {
            return DataBase.getAllUsers();
        },
        
        searchUsers(query) {
            const users = DataBase.getAllUsers();
            if (!query) return users;
            const lowerQuery = query.toLowerCase();
            return users.filter(u => 
                u.name.toLowerCase().includes(lowerQuery) ||
                u.email.toLowerCase().includes(lowerQuery) ||
                u.username.toLowerCase().includes(lowerQuery)
            );
        }
    };
    
    // Statistika olish
    const stats = AdminPanel.getStatistics();
    testEnv.assert(
        stats.totalUsers === 3,
        'Jami foydalanuvchilar soni to\'g\'ri',
        'Total users statistic test'
    );
    
    testEnv.assert(
        stats.totalStudents === 2,
        'Jami talabalar soni to\'g\'ri',
        'Total students statistic test'
    );
    
    testEnv.assert(
        stats.totalTeachers === 1,
        'Jami o\'qituvchilar soni to\'g\'ri',
        'Total teachers statistic test'
    );
    
    // Yangi foydalanuvchi qo'shish
    const newUser = AdminPanel.createUser({
        username: 'newuser',
        password: '123',
        role: 'student',
        name: 'Yangi Talaba',
        email: 'new@student.uz',
        group: 'AT-101-20'
    });
    
    testEnv.assert(
        newUser.id === 4,
        'Yangi foydalanuvchi qo\'shiladi',
        'Create user test'
    );
    
    // Foydalanuvchini tahrirlash
    const updatedUser = AdminPanel.updateUser(4, { name: 'Tahrirlangan Talaba' });
    testEnv.assert(
        updatedUser && updatedUser.name === 'Tahrirlangan Talaba',
        'Foydalanuvchi ma\'lumotlari tahrirlanadi',
        'Update user test'
    );
    
    // Foydalanuvchilarni qidirish
    const searchResults = AdminPanel.searchUsers('Azimjon');
    testEnv.assert(
        searchResults.length === 1,
        'Foydalanuvchilarni qidirish ishlaydi',
        'Search users test'
    );
    
    // Foydalanuvchini o'chirish
    const deleted = AdminPanel.deleteUser(4);
    testEnv.assert(
        deleted === true,
        'Foydalanuvchi o\'chiriladi',
        'Delete user test'
    );
    
    testEnv.endTest();
}

// ============================================
// 5. MA'LUMOTLAR OQIMI INTEGRATSIYA TESTI
// ============================================

function testDataFlowIntegration() {
    testEnv.startTest();
    
    // To'liq ma'lumotlar oqimi
    const AppSystem = {
        data: {
            users: [...testEnv.testData.users],
            students: [...testEnv.testData.students],
            teachers: [...testEnv.testData.teachers],
            groups: [...testEnv.testData.groups],
            subjects: [...testEnv.testData.subjects],
            lessons: [...testEnv.testData.lessons],
            tasks: [...testEnv.testData.tasks],
            grades: [...testEnv.testData.grades],
            attendance: [...testEnv.testData.attendance]
        },
        
        // CRUD operatsiyalari
        add(collection, item) {
            const newItem = { id: this.data[collection].length + 1, ...item };
            this.data[collection].push(newItem);
            return newItem;
        },
        
        get(collection, id) {
            return this.data[collection].find(item => item.id === id);
        },
        
        update(collection, id, updates) {
            const index = this.data[collection].findIndex(item => item.id === id);
            if (index !== -1) {
                this.data[collection][index] = { ...this.data[collection][index], ...updates };
                return this.data[collection][index];
            }
            return null;
        },
        
        delete(collection, id) {
            this.data[collection] = this.data[collection].filter(item => item.id !== id);
            return true;
        },
        
        // Bog'liq ma'lumotlarni olish
        getGroupStudents(groupId) {
            const group = this.get('groups', groupId);
            if (!group) return [];
            return this.data.students.filter(s => s.group === group.name);
        },
        
        getTeacherGroups(teacherId) {
            return this.data.groups.filter(g => g.teacherId === teacherId);
        },
        
        getSubjectTeacher(subjectId) {
            const subject = this.get('subjects', subjectId);
            if (!subject) return null;
            return this.get('teachers', subject.teacherId);
        },
        
        getStudentGrades(studentId) {
            return this.data.grades.filter(g => g.studentId === studentId);
        },
        
        getLessonAttendance(lessonId) {
            return this.data.attendance.filter(a => a.lessonId === lessonId);
        }
    };
    
    // 1. Yangi talaba qo'shish
    const newStudent = AppSystem.add('students', {
        name: 'Yangi Talaba',
        group: 'AT-101-20',
        course: 2,
        email: 'yangi@student.uz',
        phone: '+998901234567'
    });
    
    testEnv.assert(
        newStudent.id === 3,
        'Yangi talaba qo\'shiladi',
        'Add student test'
    );
    
    // 2. Yangi baho qo'shish
    const newGrade = AppSystem.add('grades', {
        studentId: newStudent.id,
        subjectId: 1,
        grade: 5,
        date: new Date().toISOString(),
        type: 'exam'
    });
    
    testEnv.assert(
        newGrade.id === 2,
        'Yangi baho qo\'shiladi',
        'Add grade test'
    );
    
    // 3. Talaba baholarini olish
    const studentGrades = AppSystem.getStudentGrades(newStudent.id);
    testEnv.assert(
        studentGrades.length === 1,
        'Talaba baholari to\'g\'ri olinadi',
        'Get student grades test'
    );
    
    // 4. Guruh talabalarini olish
    const groupStudents = AppSystem.getGroupStudents(1);
    testEnv.assert(
        groupStudents.length === 3,
        'Guruh talabalari to\'g\'ri olinadi',
        'Get group students test'
    );
    
    // 5. O'qituvchi guruhlarini olish
    const teacherGroups = AppSystem.getTeacherGroups(2);
    testEnv.assert(
        teacherGroups.length === 1,
        'O\'qituvchi guruhlari to\'g\'ri olinadi',
        'Get teacher groups test'
    );
    
    // 6. Fan o'qituvchisini olish
    const subjectTeacher = AppSystem.getSubjectTeacher(1);
    testEnv.assert(
        subjectTeacher && subjectTeacher.name === 'Said Alisherov',
        'Fan o\'qituvchisi to\'g\'ri olinadi',
        'Get subject teacher test'
    );
    
    // 7. Ma'lumotlarni yangilash
    const updatedStudent = AppSystem.update('students', newStudent.id, { name: 'Tahrirlangan Talaba' });
    testEnv.assert(
        updatedStudent.name === 'Tahrirlangan Talaba',
        'Talaba ma\'lumotlari tahrirlanadi',
        'Update student test'
    );
    
    // 8. Ma'lumotlarni o'chirish
    const deleted = AppSystem.delete('students', newStudent.id);
    testEnv.assert(
        deleted === true,
        'Talaba o\'chiriladi',
        'Delete student test'
    );
    
    testEnv.endTest();
}

// ============================================
// 6. UI INTEGRATSIYA TESTI
// ============================================

function testUIIntegration() {
    testEnv.startTest();
    
    // UI komponentlari
    const UIComponents = {
        modals: [],
        toasts: [],
        
        showModal(title, content, onConfirm = null) {
            const modal = { id: Date.now(), title, content, onConfirm, shown: true };
            this.modals.push(modal);
            return modal;
        },
        
        closeModal(modalId) {
            const index = this.modals.findIndex(m => m.id === modalId);
            if (index !== -1) {
                this.modals[index].shown = false;
                return true;
            }
            return false;
        },
        
        showToast(message, type = 'success') {
            const toast = { id: Date.now(), message, type, shown: true };
            this.toasts.push(toast);
            setTimeout(() => {
                toast.shown = false;
            }, 3000);
            return toast;
        },
        
        getActiveModals() {
            return this.modals.filter(m => m.shown);
        },
        
        getActiveToasts() {
            return this.toasts.filter(t => t.shown);
        }
    };
    
    // Modal ko'rsatish
    const modal = UIComponents.showModal('Tasdiqlash', 'Haqiqatan ham o\'chirmoqchimisiz?', () => {});
    testEnv.assert(
        modal.shown === true,
        'Modal oyna ko\'rsatiladi',
        'Show modal test'
    );
    
    testEnv.assert(
        UIComponents.getActiveModals().length === 1,
        'Faol modal oynalar soni to\'g\'ri',
        'Active modals count test'
    );
    
    // Modal yopish
    const closed = UIComponents.closeModal(modal.id);
    testEnv.assert(
        closed === true,
        'Modal oyna yopiladi',
        'Close modal test'
    );
    
    // Toast ko'rsatish
    const toast = UIComponents.showToast('Muvaffaqiyatli saqlandi!', 'success');
    testEnv.assert(
        toast.shown === true,
        'Toast xabar ko\'rsatiladi',
        'Show toast test'
    );
    
    testEnv.assert(
        toast.type === 'success',
        'Toast turi to\'g\'ri',
        'Toast type test'
    );
    
    testEnv.endTest();
}

// ============================================
// 7. VALIDATSIYA INTEGRATSIYA TESTI
// ============================================

function testValidationIntegration() {
    testEnv.startTest();
    
    // Validatsiya tizimi
    const ValidationSystem = {
        rules: {
            username: [
                { validate: (v) => v && v.length >= 3, message: 'Login kamida 3 belgi' },
                { validate: (v) => /^[a-zA-Z0-9_]+$/.test(v), message: 'Login faqat harf, raqam va _ dan iborat' }
            ],
            password: [
                { validate: (v) => v && v.length >= 6, message: 'Parol kamida 6 belgi' }
            ],
            email: [
                { validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Email noto\'g\'ri format' }
            ],
            phone: [
                { validate: (v) => /^\+998[0-9]{9}$/.test(v), message: 'Telefon noto\'g\'ri format' }
            ]
        },
        
        validateField(field, value) {
            const fieldRules = this.rules[field];
            if (!fieldRules) return { valid: true };
            
            for (const rule of fieldRules) {
                if (!rule.validate(value)) {
                    return { valid: false, message: rule.message };
                }
            }
            return { valid: true };
        },
        
        validateForm(data) {
            const errors = {};
            for (const [field, value] of Object.entries(data)) {
                const result = this.validateField(field, value);
                if (!result.valid) {
                    errors[field] = result.message;
                }
            }
            return { valid: Object.keys(errors).length === 0, errors };
        }
    };
    
    // To'g'ri ma'lumotlar
    const validData = {
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
        phone: '+998901234567'
    };
    
    const validResult = ValidationSystem.validateForm(validData);
    testEnv.assert(
        validResult.valid === true,
        'To\'g\'ri ma\'lumotlar validatsiyadan o\'tadi',
        'Valid data test'
    );
    
    // Noto'g'ri ma'lumotlar
    const invalidData = {
        username: 'ab',
        password: '123',
        email: 'invalid',
        phone: '12345'
    };
    
    const invalidResult = ValidationSystem.validateForm(invalidData);
    testEnv.assert(
        invalidResult.valid === false,
        'Noto\'g\'ri ma\'lumotlar validatsiyadan o\'tmaydi',
        'Invalid data test'
    );
    
    testEnv.assert(
        invalidResult.errors.username !== undefined,
        'Login xatoligi aniqlanadi',
        'Username error test'
    );
    
    testEnv.assert(
        invalidResult.errors.password !== undefined,
        'Parol xatoligi aniqlanadi',
        'Password error test'
    );
    
    testEnv.assert(
        invalidResult.errors.email !== undefined,
        'Email xatoligi aniqlanadi',
        'Email error test'
    );
    
    testEnv.assert(
        invalidResult.errors.phone !== undefined,
        'Telefon xatoligi aniqlanadi',
        'Phone error test'
    );
    
    testEnv.endTest();
}

// ============================================
// 8. API INTEGRATSIYA TESTI
// ============================================

function testAPIIntegration() {
    testEnv.startTest();
    
    // API tizimi
    const API = {
        baseUrl: '/api/v1',
        
        async request(endpoint, options = {}) {
            // Mock API so'rovlari
            const mockResponses = {
                'GET:/users': { users: testEnv.testData.users, total: 3 },
                'GET:/users/1': { user: testEnv.testData.users[0] },
                'POST:/users': { success: true, user: { id: 4, ...options.body } },
                'PUT:/users/1': { success: true, user: { ...testEnv.testData.users[0], ...options.body } },
                'DELETE:/users/1': { success: true }
            };
            
            const key = `${options.method || 'GET'}:${endpoint}`;
            const response = mockResponses[key];
            
            if (response) {
                return { ok: true, status: 200, json: async () => response };
            }
            
            return { ok: false, status: 404, json: async () => ({ error: 'Not found' }) };
        },
        
        async getUsers() {
            const response = await this.request('/users');
            if (response.ok) {
                const data = await response.json();
                return data.users;
            }
            return [];
        },
        
        async getUser(id) {
            const response = await this.request(`/users/${id}`);
            if (response.ok) {
                const data = await response.json();
                return data.user;
            }
            return null;
        },
        
        async createUser(userData) {
            const response = await this.request('/users', { method: 'POST', body: userData });
            if (response.ok) {
                const data = await response.json();
                return data.user;
            }
            return null;
        },
        
        async updateUser(id, updates) {
            const response = await this.request(`/users/${id}`, { method: 'PUT', body: updates });
            if (response.ok) {
                const data = await response.json();
                return data.user;
            }
            return null;
        },
        
        async deleteUser(id) {
            const response = await this.request(`/users/${id}`, { method: 'DELETE' });
            return response.ok;
        }
    };
    
    // API testlari (async)
    (async () => {
        // GET /users
        const users = await API.getUsers();
        testEnv.assert(
            users.length === 3,
            'GET /users barcha foydalanuvchilarni qaytaradi',
            'GET users test'
        );
        
        // GET /users/:id
        const user = await API.getUser(1);
        testEnv.assert(
            user && user.username === 'admin',
            'GET /users/:id foydalanuvchini qaytaradi',
            'GET user by id test'
        );
        
        // POST /users
        const newUser = await API.createUser({ username: 'newuser', name: 'Yangi', email: 'new@edu.uz' });
        testEnv.assert(
            newUser && newUser.id === 4,
            'POST /users yangi foydalanuvchi yaratadi',
            'POST user test'
        );
        
        // PUT /users/:id
        const updatedUser = await API.updateUser(1, { name: 'Yangilangan' });
        testEnv.assert(
            updatedUser && updatedUser.name === 'Yangilangan',
            'PUT /users/:id foydalanuvchini yangilaydi',
            'PUT user test'
        );
        
        // DELETE /users/:id
        const deleted = await API.deleteUser(1);
        testEnv.assert(
            deleted === true,
            'DELETE /users/:id foydalanuvchini o\'chiradi',
            'DELETE user test'
        );
        
        testEnv.endTest();
    })();
}

// ============================================
// 9. BARCHA TESTLARNI ISHGA TUSHIRISH
// ============================================

async function runAllIntegrationTests() {
    console.log('========================================');
    console.log('   EDUHEMIS - INTEGRATSIYA TESTLARI');
    console.log('========================================\n');
    
    testLoginIntegration();
    console.log('');
    testStudentPanelIntegration();
    console.log('');
    testTeacherPanelIntegration();
    console.log('');
    testAdminPanelIntegration();
    console.log('');
    testDataFlowIntegration();
    console.log('');
    testUIIntegration();
    console.log('');
    testValidationIntegration();
    console.log('');
    await testAPIIntegration();
    
    console.log('\n========================================');
    console.log('   TESTLAR TUGADI');
    console.log('========================================');
}

// Testlarni ishga tushirish
if (typeof window !== 'undefined') {
    window.runAllIntegrationTests = runAllIntegrationTests;
}

// Node.js muhiti uchun
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testLoginIntegration,
        testStudentPanelIntegration,
        testTeacherPanelIntegration,
        testAdminPanelIntegration,
        testDataFlowIntegration,
        testUIIntegration,
        testValidationIntegration,
        testAPIIntegration,
        runAllIntegrationTests
    };
}