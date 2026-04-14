/* ============================================
   EduHemis - Ma'lumotlar bazasi
   Barcha ma'lumotlar va ular bilan ishlash funksiyalari
   ============================================ */

// ============================================
// 1. MA'LUMOTLAR BAZASI (LocalStorage)
// ============================================
const DataBase = {
    // ----------------------
    // 1.1. Ma'lumotlar
    // ----------------------
    users: [],
    students: [],
    teachers: [],
    admins: [],
    groups: [],
    subjects: [],
    lessons: [],
    tasks: [],
    grades: [],
    attendance: [],
    materials: [],
    announcements: [],
    messages: [],
    notifications: [],
    logs: [],
    
    // Statistika
    statistics: {
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalAdmins: 0,
        totalGroups: 0,
        totalSubjects: 0,
        totalLessons: 0,
        totalTasks: 0,
        totalGrades: 0
    },
    
    // ----------------------
    // 1.2. Yuklash
    // ----------------------
    load() {
        try {
            this.users = JSON.parse(localStorage.getItem('users')) || [];
            this.students = JSON.parse(localStorage.getItem('students')) || [];
            this.teachers = JSON.parse(localStorage.getItem('teachers')) || [];
            this.admins = JSON.parse(localStorage.getItem('admins')) || [];
            this.groups = JSON.parse(localStorage.getItem('groups')) || [];
            this.subjects = JSON.parse(localStorage.getItem('subjects')) || [];
            this.lessons = JSON.parse(localStorage.getItem('lessons')) || [];
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            this.grades = JSON.parse(localStorage.getItem('grades')) || [];
            this.attendance = JSON.parse(localStorage.getItem('attendance')) || [];
            this.materials = JSON.parse(localStorage.getItem('materials')) || [];
            this.announcements = JSON.parse(localStorage.getItem('announcements')) || [];
            this.messages = JSON.parse(localStorage.getItem('messages')) || [];
            this.notifications = JSON.parse(localStorage.getItem('notifications')) || [];
            this.logs = JSON.parse(localStorage.getItem('logs')) || [];
            
            this.updateStatistics();
            console.log('✅ Ma\'lumotlar yuklandi');
            return true;
        } catch (error) {
            console.error('❌ Ma\'lumotlarni yuklashda xatolik:', error);
            this.init();
            return false;
        }
    },
    
    // ----------------------
    // 1.3. Saqlash
    // ----------------------
    save() {
        try {
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.setItem('students', JSON.stringify(this.students));
            localStorage.setItem('teachers', JSON.stringify(this.teachers));
            localStorage.setItem('admins', JSON.stringify(this.admins));
            localStorage.setItem('groups', JSON.stringify(this.groups));
            localStorage.setItem('subjects', JSON.stringify(this.subjects));
            localStorage.setItem('lessons', JSON.stringify(this.lessons));
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('grades', JSON.stringify(this.grades));
            localStorage.setItem('attendance', JSON.stringify(this.attendance));
            localStorage.setItem('materials', JSON.stringify(this.materials));
            localStorage.setItem('announcements', JSON.stringify(this.announcements));
            localStorage.setItem('messages', JSON.stringify(this.messages));
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
            localStorage.setItem('logs', JSON.stringify(this.logs));
            
            console.log('✅ Ma\'lumotlar saqlandi');
            return true;
        } catch (error) {
            console.error('❌ Ma\'lumotlarni saqlashda xatolik:', error);
            return false;
        }
    },
    
    // ----------------------
    // 1.4. Tozalash
    // ----------------------
    clear() {
        if (confirm('Haqiqatan ham barcha ma\'lumotlarni o\'chirmoqchimisiz?')) {
            localStorage.clear();
            this.init();
            showToast('Barcha ma\'lumotlar o\'chirildi', 'warning');
            return true;
        }
        return false;
    },
    
    // ----------------------
    // 1.5. Boshlang'ich ma'lumotlar
    // ----------------------
    init() {
        // Adminlar
        this.admins = [
            { 
                id: 1, 
                name: 'Admin User', 
                username: 'admin', 
                password: '123', 
                email: 'admin@edu.uz',
                phone: '+998901234567',
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=dc2626&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            }
        ];
        
        // O'qituvchilar
        this.teachers = [
            { 
                id: 2, 
                name: 'Said Alisherov', 
                username: 'teacher', 
                password: '123', 
                email: 's.alisherov@edu.uz',
                phone: '+998901234567',
                subject: 'Veb dasturlash',
                department: 'Dasturlash',
                degree: 'PhD',
                experience: 12,
                room: '402',
                avatar: 'https://ui-avatars.com/api/?name=Said+Alisherov&background=4f46e5&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 3, 
                name: 'Nodira Karimova', 
                username: 'nodira', 
                password: '123', 
                email: 'n.karimova@edu.uz',
                phone: '+998909876543',
                subject: 'Ma\'lumotlar bazasi',
                department: 'Dasturlash',
                degree: 'PhD',
                experience: 10,
                room: '312',
                avatar: 'https://ui-avatars.com/api/?name=Nodira+Karimova&background=4f46e5&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 4, 
                name: 'Jasur Usmonov', 
                username: 'jasur', 
                password: '123', 
                email: 'j.usmonov@edu.uz',
                phone: '+998934560011',
                subject: 'Kiberxavfsizlik',
                department: 'Dasturlash',
                degree: 'Professor',
                experience: 15,
                room: '210',
                avatar: 'https://ui-avatars.com/api/?name=Jasur+Usmonov&background=4f46e5&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 5, 
                name: 'Dildora Ahmetova', 
                username: 'dildora', 
                password: '123', 
                email: 'd.ahmetova@edu.uz',
                phone: '+998991112233',
                subject: 'Sun\'iy intellekt',
                department: 'Dasturlash',
                degree: 'DSc',
                experience: 20,
                room: '105',
                avatar: 'https://ui-avatars.com/api/?name=Dildora+Ahmetova&background=4f46e5&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 6, 
                name: 'Aziz Qosimov', 
                username: 'aziz', 
                password: '123', 
                email: 'a.qosimov@edu.uz',
                phone: '+998977778899',
                subject: 'Tizimli boshqaruv',
                department: 'Dasturlash',
                degree: 'PhD',
                experience: 8,
                room: '308',
                avatar: 'https://ui-avatars.com/api/?name=Aziz+Qosimov&background=4f46e5&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            }
        ];
        
        // Talabalar
        this.students = [
            { 
                id: 7, 
                name: 'Azimjon Karimov', 
                username: 'student', 
                password: '123', 
                email: 'a.karimov@student.uz',
                phone: '+998901234501',
                group: 'AT-101-20',
                course: 2,
                avatar: 'https://ui-avatars.com/api/?name=Azimjon+Karimov&background=0284c7&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 8, 
                name: 'Ali Valiyev', 
                username: 'ali', 
                password: '123', 
                email: 'a.valiyev@student.uz',
                phone: '+998901234502',
                group: 'AT-101-20',
                course: 2,
                avatar: 'https://ui-avatars.com/api/?name=Ali+Valiyev&background=0284c7&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 9, 
                name: 'Dilya Akramova', 
                username: 'dilya', 
                password: '123', 
                email: 'd.akramova@student.uz',
                phone: '+998901234503',
                group: 'AT-101-20',
                course: 2,
                avatar: 'https://ui-avatars.com/api/?name=Dilya+Akramova&background=0284c7&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 10, 
                name: 'Jasur Karimov', 
                username: 'jasur_student', 
                password: '123', 
                email: 'j.karimov@student.uz',
                phone: '+998901234504',
                group: 'AT-102-20',
                course: 2,
                avatar: 'https://ui-avatars.com/api/?name=Jasur+Karimov&background=0284c7&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 11, 
                name: 'Malika Ismoilova', 
                username: 'malika', 
                password: '123', 
                email: 'm.ismoilova@student.uz',
                phone: '+998901234505',
                group: 'KI-201-21',
                course: 3,
                avatar: 'https://ui-avatars.com/api/?name=Malika+Ismoilova&background=0284c7&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 12, 
                name: 'Sardor Abdurahmonov', 
                username: 'sardor', 
                password: '123', 
                email: 's.abdurahmonov@student.uz',
                phone: '+998901234506',
                group: 'KI-201-21',
                course: 3,
                avatar: 'https://ui-avatars.com/api/?name=Sardor+Abdurahmonov&background=0284c7&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            },
            { 
                id: 13, 
                name: 'Zarina Azizova', 
                username: 'zarina', 
                password: '123', 
                email: 'z.azizova@student.uz',
                phone: '+998901234507',
                group: 'DI-301-22',
                course: 2,
                avatar: 'https://ui-avatars.com/api/?name=Zarina+Azizova&background=0284c7&color=fff',
                createdAt: new Date().toISOString(),
                lastLogin: null
            }
        ];
        
        // Guruhlar
        this.groups = [
            { id: 1, name: 'AT-101-20', faculty: 'Axborot texnologiyalari', course: 2, students: 24, teacherId: 2, year: 2020 },
            { id: 2, name: 'AT-102-20', faculty: 'Axborot texnologiyalari', course: 2, students: 26, teacherId: 3, year: 2020 },
            { id: 3, name: 'KI-201-21', faculty: 'Kompyuter injiniringi', course: 3, students: 22, teacherId: 4, year: 2021 },
            { id: 4, name: 'DI-301-22', faculty: 'Dasturlash injiniringi', course: 2, students: 28, teacherId: 5, year: 2022 }
        ];
        
        // Fanlar
        this.subjects = [
            { id: 1, name: 'Veb dasturlash', code: 'CS-2024', credits: 5, hours: 120, teacherId: 2, semester: 4 },
            { id: 2, name: 'Ma\'lumotlar bazasi', code: 'DB-4001', credits: 4, hours: 96, teacherId: 3, semester: 3 },
            { id: 3, name: 'Kiberxavfsizlik', code: 'SEC-102', credits: 4, hours: 96, teacherId: 4, semester: 5 },
            { id: 4, name: 'Sun\'iy intellekt', code: 'AI-500', credits: 5, hours: 120, teacherId: 5, semester: 6 },
            { id: 5, name: 'Tizimli boshqaruv', code: 'SYS-301', credits: 3, hours: 72, teacherId: 6, semester: 4 }
        ];
        
        // Dars rejalari
        this.lessons = [
            { id: 1, teacherId: 2, groupId: 1, subjectId: 1, topic: 'HTML asoslari', date: '2025-03-20', room: '402', time: '09:00-10:20', type: 'lecture' },
            { id: 2, teacherId: 2, groupId: 1, subjectId: 1, topic: 'CSS stillar', date: '2025-03-22', room: '402', time: '09:00-10:20', type: 'lecture' },
            { id: 3, teacherId: 2, groupId: 1, subjectId: 1, topic: 'JavaScript asoslari', date: '2025-03-24', room: '402', time: '09:00-10:20', type: 'lecture' },
            { id: 4, teacherId: 3, groupId: 2, subjectId: 2, topic: 'SQL asoslari', date: '2025-03-21', room: '312', time: '11:00-12:30', type: 'lecture' },
            { id: 5, teacherId: 4, groupId: 3, subjectId: 3, topic: 'Xavfsizlik asoslari', date: '2025-03-23', room: '210', time: '14:00-15:30', type: 'lecture' }
        ];
        
        // Vazifalar
        this.tasks = [
            { 
                id: 1, 
                teacherId: 2, 
                groupId: 1, 
                subjectId: 1, 
                title: 'HTML portfolio', 
                description: 'Shaxsiy portfolio sayt yaratish. HTML va CSS dan foydalaning. Saytda siz haqingizda ma\'lumot, qobiliyatlar va aloqa bo\'limi bo\'lishi kerak.',
                deadline: '2025-03-25',
                maxScore: 100,
                createdAt: '2025-03-10',
                students: [
                    { studentId: 7, status: 'pending' },
                    { studentId: 8, status: 'pending' },
                    { studentId: 9, status: 'pending' }
                ]
            },
            { 
                id: 2, 
                teacherId: 2, 
                groupId: 1, 
                subjectId: 1, 
                title: 'CSS animatsiyalar', 
                description: '3 xil CSS animatsiya yaratish. Animatsiyalar: yuklash spinneri, kartochka hover effekti va menyu animatsiyasi.',
                deadline: '2025-03-15',
                maxScore: 50,
                createdAt: '2025-03-05',
                students: [
                    { studentId: 7, status: 'submitted', score: 45, submittedAt: '2025-03-14' },
                    { studentId: 8, status: 'pending' },
                    { studentId: 9, status: 'late' }
                ]
            },
            { 
                id: 3, 
                teacherId: 3, 
                groupId: 2, 
                subjectId: 2, 
                title: 'ER diagramma', 
                description: 'Universitet ma\'lumotlar bazasi uchun ER diagramma chizish. Kamida 5 ta jadval bo\'lsin.',
                deadline: '2025-03-28',
                maxScore: 80,
                createdAt: '2025-03-12',
                students: [
                    { studentId: 10, status: 'pending' }
                ]
            }
        ];
        
        // Baholar
        this.grades = [
            { id: 1, studentId: 7, subjectId: 1, grade: 5, date: '2025-03-10', type: 'exam', teacherId: 2 },
            { id: 2, studentId: 7, subjectId: 1, grade: 4, date: '2025-03-17', type: 'exam', teacherId: 2 },
            { id: 3, studentId: 8, subjectId: 1, grade: 5, date: '2025-03-10', type: 'exam', teacherId: 2 },
            { id: 4, studentId: 8, subjectId: 1, grade: 5, date: '2025-03-17', type: 'exam', teacherId: 2 },
            { id: 5, studentId: 9, subjectId: 1, grade: 4, date: '2025-03-10', type: 'exam', teacherId: 2 },
            { id: 6, studentId: 9, subjectId: 1, grade: 5, date: '2025-03-17', type: 'exam', teacherId: 2 }
        ];
        
        // Davomat
        this.attendance = [
            { id: 1, studentId: 7, lessonId: 1, date: '2025-03-20', status: 'present' },
            { id: 2, studentId: 8, lessonId: 1, date: '2025-03-20', status: 'present' },
            { id: 3, studentId: 9, lessonId: 1, date: '2025-03-20', status: 'absent' },
            { id: 4, studentId: 7, lessonId: 2, date: '2025-03-22', status: 'present' },
            { id: 5, studentId: 8, lessonId: 2, date: '2025-03-22', status: 'present' },
            { id: 6, studentId: 9, lessonId: 2, date: '2025-03-22', status: 'late' }
        ];
        
        // O'quv materiallari
        this.materials = [
            { id: 1, teacherId: 2, subjectId: 1, title: 'HTML darslik', type: 'pdf', size: '2.4 MB', url: '#', date: '2025-03-01' },
            { id: 2, teacherId: 2, subjectId: 1, title: 'CSS prezentatsiya', type: 'ppt', size: '5.1 MB', url: '#', date: '2025-03-05' },
            { id: 3, teacherId: 3, subjectId: 2, title: 'SQL amaliy mashg\'ulot', type: 'doc', size: '1.8 MB', url: '#', date: '2025-03-08' }
        ];
        
        // E'lonlar
        this.announcements = [
            { id: 1, title: 'Semestr boshlanishi', content: 'Yangi semestr 1-sentabrdan boshlanadi', date: '2025-02-25', authorId: 1 },
            { id: 2, title: 'Imtihon jadvali', content: 'Imtihon jadvali e\'lon qilindi', date: '2025-03-01', authorId: 1 }
        ];
        
        // Xabarlar
        this.messages = [
            { id: 1, fromId: 2, toId: 7, subject: 'Dars haqida', content: 'Ertaga dars 402-xonada bo\'ladi', date: '2025-03-18', read: false },
            { id: 2, fromId: 3, toId: 7, subject: 'Laboratoriya ishi', content: 'Laboratoriya ishi topshiriladi', date: '2025-03-17', read: true }
        ];
        
        // Bildirishnomalar
        this.notifications = [
            { id: 1, userId: 7, title: 'Yangi vazifa', content: 'HTML portfolio vazifasi qo\'shildi', date: '2025-03-10', read: false },
            { id: 2, userId: 7, title: 'Baho qo\'yildi', content: 'Veb dasturlash fanidan baho qo\'yildi', date: '2025-03-17', read: true }
        ];
        
        // Foydalanuvchilar (barchasi)
        this.users = [
            ...this.admins,
            ...this.teachers,
            ...this.students
        ];
        
        this.updateStatistics();
        this.save();
        
        console.log('✅ Boshlang\'ich ma\'lumotlar yaratildi');
    },
    
    // ----------------------
    // 1.6. Statistika yangilash
    // ----------------------
    updateStatistics() {
        this.statistics = {
            totalUsers: this.users.length,
            totalStudents: this.students.length,
            totalTeachers: this.teachers.length,
            totalAdmins: this.admins.length,
            totalGroups: this.groups.length,
            totalSubjects: this.subjects.length,
            totalLessons: this.lessons.length,
            totalTasks: this.tasks.length,
            totalGrades: this.grades.length,
            totalAttendance: this.attendance.length,
            totalMaterials: this.materials.length,
            totalAnnouncements: this.announcements.length,
            totalMessages: this.messages.length,
            totalNotifications: this.notifications.length
        };
    }
};

// ============================================
// 2. DATA MANAGER
// ============================================
const DataManager = {
    // ----------------------
    // 2.1. Yangi ID yaratish
    // ----------------------
    newId(collection) {
        if (!DataBase[collection] || DataBase[collection].length === 0) return 1;
        return Math.max(...DataBase[collection].map(item => item.id)) + 1;
    },
    
    // ----------------------
    // 2.2. Qidirish
    // ----------------------
    findById(collection, id) {
        return DataBase[collection]?.find(item => item.id === id);
    },
    
    findAll(collection, query = {}) {
        let results = [...(DataBase[collection] || [])];
        
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                results = results.filter(item => item[key] === value);
            }
        });
        
        return results;
    },
    
    // ----------------------
    // 2.3. Qo'shish
    // ----------------------
    add(collection, data) {
        const newItem = {
            id: this.newId(collection),
            ...data,
            createdAt: new Date().toISOString()
        };
        
        DataBase[collection].push(newItem);
        DataBase.save();
        
        return newItem;
    },
    
    // ----------------------
    // 2.4. Yangilash
    // ----------------------
    update(collection, id, updates) {
        const index = DataBase[collection].findIndex(item => item.id === id);
        if (index === -1) return null;
        
        DataBase[collection][index] = {
            ...DataBase[collection][index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        DataBase.save();
        return DataBase[collection][index];
    },
    
    // ----------------------
    // 2.5. O'chirish
    // ----------------------
    delete(collection, id) {
        const index = DataBase[collection].findIndex(item => item.id === id);
        if (index === -1) return false;
        
        DataBase[collection].splice(index, 1);
        DataBase.save();
        
        return true;
    },
    
    // ----------------------
    // 2.6. Ommaviy o'chirish
    // ----------------------
    deleteMany(collection, ids) {
        DataBase[collection] = DataBase[collection].filter(item => !ids.includes(item.id));
        DataBase.save();
    }
};

// ============================================
// 3. STUDENT MANAGER
// ============================================
const StudentManager = {
    // ----------------------
    // 3.1. Talaba qo'shish
    // ----------------------
    addStudent(data) {
        const newStudent = DataManager.add('students', data);
        
        // Users ga ham qo'shish
        DataBase.users.push({
            id: newStudent.id,
            username: data.username,
            password: data.password,
            role: 'student',
            name: data.name,
            email: data.email,
            phone: data.phone,
            group: data.group,
            avatar: `https://ui-avatars.com/api/?name=${data.name.split(' ').join('+')}&background=0284c7&color=fff`,
            createdAt: new Date().toISOString()
        });
        
        DataBase.save();
        return newStudent;
    },
    
    // ----------------------
    // 3.2. Talaba yangilash
    // ----------------------
    updateStudent(id, updates) {
        const student = DataManager.update('students', id, updates);
        
        // Users ni ham yangilash
        const userIndex = DataBase.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            DataBase.users[userIndex] = {
                ...DataBase.users[userIndex],
                name: updates.name || DataBase.users[userIndex].name,
                email: updates.email || DataBase.users[userIndex].email,
                phone: updates.phone || DataBase.users[userIndex].phone,
                group: updates.group || DataBase.users[userIndex].group
            };
        }
        
        DataBase.save();
        return student;
    },
    
    // ----------------------
    // 3.3. Talaba o'chirish
    // ----------------------
    deleteStudent(id) {
        // O'chirish
        DataManager.delete('students', id);
        DataBase.users = DataBase.users.filter(u => u.id !== id);
        
        // Bog'liq ma'lumotlarni o'chirish
        DataBase.grades = DataBase.grades.filter(g => g.studentId !== id);
        DataBase.attendance = DataBase.attendance.filter(a => a.studentId !== id);
        
        // Vazifalardan o'chirish
        DataBase.tasks.forEach(task => {
            task.students = task.students.filter(s => s.studentId !== id);
        });
        
        DataBase.save();
        return true;
    },
    
    // ----------------------
    // 3.4. Talaba baholari
    // ----------------------
    getStudentGrades(studentId) {
        return DataBase.grades.filter(g => g.studentId === studentId);
    },
    
    // ----------------------
    // 3.5. Talaba davomati
    // ----------------------
    getStudentAttendance(studentId) {
        const attendance = DataBase.attendance.filter(a => a.studentId === studentId);
        const total = attendance.length;
        const present = attendance.filter(a => a.status === 'present').length;
        const absent = attendance.filter(a => a.status === 'absent').length;
        const late = attendance.filter(a => a.status === 'late').length;
        
        return {
            total,
            present,
            absent,
            late,
            percentage: total ? (present / total * 100).toFixed(1) : 0
        };
    },
    
    // ----------------------
    // 3.6. Talaba vazifalari
    // ----------------------
    getStudentTasks(studentId) {
        return DataBase.tasks.filter(task => 
            task.students.some(s => s.studentId === studentId)
        ).map(task => {
            const studentTask = task.students.find(s => s.studentId === studentId);
            return {
                ...task,
                status: studentTask.status,
                score: studentTask.score,
                submittedAt: studentTask.submittedAt
            };
        });
    },
    
    // ----------------------
    // 3.7. Talaba o'rtacha bahosi
    // ----------------------
    getStudentAverage(studentId) {
        const grades = this.getStudentGrades(studentId);
        if (grades.length === 0) return 0;
        
        const sum = grades.reduce((acc, g) => acc + g.grade, 0);
        return (sum / grades.length).toFixed(1);
    },
    
    // ----------------------
    // 3.8. Guruhdagi talabalar
    // ----------------------
    getGroupStudents(groupId) {
        const group = DataManager.findById('groups', groupId);
        if (!group) return [];
        
        return DataBase.students.filter(s => s.group === group.name);
    }
};

// ============================================
// 4. TEACHER MANAGER
// ============================================
const TeacherManager = {
    // ----------------------
    // 4.1. O'qituvchi qo'shish
    // ----------------------
    addTeacher(data) {
        const newTeacher = DataManager.add('teachers', data);
        
        // Users ga ham qo'shish
        DataBase.users.push({
            id: newTeacher.id,
            username: data.username,
            password: data.password,
            role: 'teacher',
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            department: data.department,
            avatar: `https://ui-avatars.com/api/?name=${data.name.split(' ').join('+')}&background=4f46e5&color=fff`,
            createdAt: new Date().toISOString()
        });
        
        DataBase.save();
        return newTeacher;
    },
    
    // ----------------------
    // 4.2. O'qituvchi yangilash
    // ----------------------
    updateTeacher(id, updates) {
        const teacher = DataManager.update('teachers', id, updates);
        
        // Users ni ham yangilash
        const userIndex = DataBase.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            DataBase.users[userIndex] = {
                ...DataBase.users[userIndex],
                name: updates.name || DataBase.users[userIndex].name,
                email: updates.email || DataBase.users[userIndex].email,
                phone: updates.phone || DataBase.users[userIndex].phone,
                subject: updates.subject || DataBase.users[userIndex].subject,
                department: updates.department || DataBase.users[userIndex].department
            };
        }
        
        DataBase.save();
        return teacher;
    },
    
    // ----------------------
    // 4.3. O'qituvchi o'chirish
    // ----------------------
    deleteTeacher(id) {
        DataManager.delete('teachers', id);
        DataBase.users = DataBase.users.filter(u => u.id !== id);
        DataBase.save();
        return true;
    },
    
    // ----------------------
    // 4.4. O'qituvchi guruhlari
    // ----------------------
    getTeacherGroups(teacherId) {
        return DataBase.groups.filter(g => g.teacherId === teacherId);
    },
    
    // ----------------------
    // 4.5. O'qituvchi darslari
    // ----------------------
    getTeacherLessons(teacherId) {
        return DataBase.lessons.filter(l => l.teacherId === teacherId);
    },
    
    // ----------------------
    // 4.6. O'qituvchi vazifalari
    // ----------------------
    getTeacherTasks(teacherId) {
        return DataBase.tasks.filter(t => t.teacherId === teacherId);
    },
    
    // ----------------------
    // 4.7. Bugungi darslar
    // ----------------------
    getTodayLessons(teacherId) {
        const today = new Date().toISOString().split('T')[0];
        return DataBase.lessons.filter(l => l.teacherId === teacherId && l.date === today);
    }
};

// ============================================
// 5. GROUP MANAGER
// ============================================
const GroupManager = {
    // ----------------------
    // 5.1. Guruh qo'shish
    // ----------------------
    addGroup(data) {
        return DataManager.add('groups', data);
    },
    
    // ----------------------
    // 5.2. Guruh yangilash
    // ----------------------
    updateGroup(id, updates) {
        return DataManager.update('groups', id, updates);
    },
    
    // ----------------------
    // 5.3. Guruh o'chirish
    // ----------------------
    deleteGroup(id) {
        return DataManager.delete('groups', id);
    },
    
    // ----------------------
    // 5.4. Guruh talabalari
    // ----------------------
    getGroupStudents(groupId) {
        const group = DataManager.findById('groups', groupId);
        if (!group) return [];
        
        return DataBase.students.filter(s => s.group === group.name);
    },
    
    // ----------------------
    // 5.5. Guruh darslari
    // ----------------------
    getGroupLessons(groupId) {
        return DataBase.lessons.filter(l => l.groupId === groupId);
    },
    
    // ----------------------
    // 5.6. Guruh statistikasi
    // ----------------------
    getGroupStatistics(groupId) {
        const group = DataManager.findById('groups', groupId);
        if (!group) return null;
        
        const students = this.getGroupStudents(groupId);
        const lessons = this.getGroupLessons(groupId);
        
        // O'rtacha baho
        let totalGrade = 0;
        let gradeCount = 0;
        
        students.forEach(student => {
            const grades = DataBase.grades.filter(g => g.studentId === student.id);
            grades.forEach(g => {
                totalGrade += g.grade;
                gradeCount++;
            });
        });
        
        const averageGrade = gradeCount ? (totalGrade / gradeCount).toFixed(1) : 0;
        
        return {
            group,
            studentCount: students.length,
            lessonCount: lessons.length,
            averageGrade
        };
    }
};

// ============================================
// 6. SUBJECT MANAGER
// ============================================
const SubjectManager = {
    // ----------------------
    // 6.1. Fan qo'shish
    // ----------------------
    addSubject(data) {
        return DataManager.add('subjects', data);
    },
    
    // ----------------------
    // 6.2. Fan yangilash
    // ----------------------
    updateSubject(id, updates) {
        return DataManager.update('subjects', id, updates);
    },
    
    // ----------------------
    // 6.3. Fan o'chirish
    // ----------------------
    deleteSubject(id) {
        return DataManager.delete('subjects', id);
    },
    
    // ----------------------
    // 6.4. Fan o'qituvchisi
    // ----------------------
    getSubjectTeacher(subjectId) {
        const subject = DataManager.findById('subjects', subjectId);
        if (!subject) return null;
        
        return DataManager.findById('teachers', subject.teacherId);
    },
    
    // ----------------------
    // 6.5. Fan darslari
    // ----------------------
    getSubjectLessons(subjectId) {
        return DataBase.lessons.filter(l => l.subjectId === subjectId);
    }
};

// ============================================
// 7. TASK MANAGER
// ============================================
const TaskManager = {
    // ----------------------
    // 7.1. Vazifa qo'shish
    // ----------------------
    addTask(data) {
        // Guruhdagi talabalar
        const group = DataManager.findById('groups', data.groupId);
        if (group) {
            const students = StudentManager.getGroupStudents(group.id);
            data.students = students.map(s => ({
                studentId: s.id,
                status: 'pending'
            }));
        }
        
        return DataManager.add('tasks', data);
    },
    
    // ----------------------
    // 7.2. Vazifa yangilash
    // ----------------------
    updateTask(id, updates) {
        return DataManager.update('tasks', id, updates);
    },
    
    // ----------------------
    // 7.3. Vazifa o'chirish
    // ----------------------
    deleteTask(id) {
        return DataManager.delete('tasks', id);
    },
    
    // ----------------------
    // 7.4. Vazifa topshirish
    // ----------------------
    submitTask(taskId, studentId, data = {}) {
        const task = DataManager.findById('tasks', taskId);
        if (!task) return false;
        
        const studentTask = task.students.find(s => s.studentId === studentId);
        if (studentTask) {
            studentTask.status = 'submitted';
            studentTask.submittedAt = new Date().toISOString();
            studentTask.notes = data.notes || '';
            studentTask.file = data.file || null;
            
            DataBase.save();
            return true;
        }
        
        return false;
    },
    
    // ----------------------
    // 7.5. Vazifaga baho qo'yish
    // ----------------------
    gradeTask(taskId, studentId, score, feedback = '') {
        const task = DataManager.findById('tasks', taskId);
        if (!task) return false;
        
        const studentTask = task.students.find(s => s.studentId === studentId);
        if (studentTask) {
            studentTask.score = score;
            studentTask.feedback = feedback;
            studentTask.gradedAt = new Date().toISOString();
            
            DataBase.save();
            return true;
        }
        
        return false;
    },
    
    // ----------------------
    // 7.6. Muddati o'tgan vazifalar
    // ----------------------
    getOverdueTasks() {
        const today = new Date().toISOString().split('T')[0];
        return DataBase.tasks.filter(t => t.deadline < today);
    },
    
    // ----------------------
    // 7.7. Muddati yaqin vazifalar (3 kun)
    // ----------------------
    getNearDeadlineTasks() {
        const today = new Date();
        const threeDaysLater = new Date();
        threeDaysLater.setDate(today.getDate() + 3);
        
        const todayStr = today.toISOString().split('T')[0];
        const threeDaysStr = threeDaysLater.toISOString().split('T')[0];
        
        return DataBase.tasks.filter(t => 
            t.deadline >= todayStr && t.deadline <= threeDaysStr
        );
    }
};

// ============================================
// 8. GRADE MANAGER
// ============================================
const GradeManager = {
    // ----------------------
    // 8.1. Baho qo'shish
    // ----------------------
    addGrade(data) {
        return DataManager.add('grades', data);
    },
    
    // ----------------------
    // 8.2. Baho yangilash
    // ----------------------
    updateGrade(id, updates) {
        return DataManager.update('grades', id, updates);
    },
    
    // ----------------------
    // 8.3. Baho o'chirish
    // ----------------------
    deleteGrade(id) {
        return DataManager.delete('grades', id);
    },
    
    // ----------------------
    // 8.4. Talaba baholari
    // ----------------------
    getStudentGrades(studentId) {
        return DataBase.grades.filter(g => g.studentId === studentId);
    },
    
    // ----------------------
    // 8.5. Talaba o'rtacha bahosi
    // ----------------------
    getStudentAverage(studentId) {
        const grades = this.getStudentGrades(studentId);
        if (grades.length === 0) return 0;
        
        const sum = grades.reduce((acc, g) => acc + g.grade, 0);
        return (sum / grades.length).toFixed(1);
    },
    
    // ----------------------
    // 8.6. Guruh o'rtacha bahosi
    // ----------------------
    getGroupAverage(groupId) {
        const group = DataManager.findById('groups', groupId);
        if (!group) return 0;
        
        const students = StudentManager.getGroupStudents(groupId);
        let total = 0;
        let count = 0;
        
        students.forEach(student => {
            const avg = this.getStudentAverage(student.id);
            if (avg > 0) {
                total += parseFloat(avg);
                count++;
            }
        });
        
        return count ? (total / count).toFixed(1) : 0;
    }
};

// ============================================
// 9. ATTENDANCE MANAGER
// ============================================
const AttendanceManager = {
    // ----------------------
    // 9.1. Davomat qo'shish
    // ----------------------
    addAttendance(data) {
        return DataManager.add('attendance', data);
    },
    
    // ----------------------
    // 9.2. Davomat yangilash
    // ----------------------
    updateAttendance(id, updates) {
        return DataManager.update('attendance', id, updates);
    },
    
    // ----------------------
    // 9.3. Davomat o'chirish
    // ----------------------
    deleteAttendance(id) {
        return DataManager.delete('attendance', id);
    },
    
    // ----------------------
    // 9.4. Talaba davomati
    // ----------------------
    getStudentAttendance(studentId) {
        return DataBase.attendance.filter(a => a.studentId === studentId);
    },
    
    // ----------------------
    // 9.5. Dars davomati
    // ----------------------
    getLessonAttendance(lessonId) {
        return DataBase.attendance.filter(a => a.lessonId === lessonId);
    },
    
    // ----------------------
    // 9.6. Guruh davomati
    // ----------------------
    getGroupAttendance(groupId, date) {
        const group = DataManager.findById('groups', groupId);
        if (!group) return [];
        
        const students = StudentManager.getGroupStudents(groupId);
        const studentIds = students.map(s => s.id);
        
        let attendance = DataBase.attendance.filter(a => 
            studentIds.includes(a.studentId) && a.date === date
        );
        
        return attendance;
    },
    
    // ----------------------
    // 9.7. Davomat foizi
    // ----------------------
    getAttendancePercentage(studentId) {
        const attendance = this.getStudentAttendance(studentId);
        if (attendance.length === 0) return 0;
        
        const present = attendance.filter(a => a.status === 'present').length;
        return (present / attendance.length * 100).toFixed(1);
    }
};

// ============================================
// 10. MESSAGE MANAGER
// ============================================
const MessageManager = {
    // ----------------------
    // 10.1. Xabar yuborish
    // ----------------------
    sendMessage(data) {
        return DataManager.add('messages', {
            ...data,
            read: false,
            date: new Date().toISOString()
        });
    },
    
    // ----------------------
    // 10.2. Xabarlarni olish
    // ----------------------
    getUserMessages(userId) {
        return DataBase.messages.filter(m => 
            m.toId === userId || m.fromId === userId
        ).sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    
    // ----------------------
    // 10.3. O'qilmagan xabarlar
    // ----------------------
    getUnreadMessages(userId) {
        return DataBase.messages.filter(m => m.toId === userId && !m.read);
    },
    
    // ----------------------
    // 10.4. Xabarni o'qilgan deb belgilash
    // ----------------------
    markAsRead(messageId) {
        return DataManager.update('messages', messageId, { read: true });
    },
    
    // ----------------------
    // 10.5. Suhbat tarixi
    // ----------------------
    getConversation(userId1, userId2) {
        return DataBase.messages.filter(m => 
            (m.fromId === userId1 && m.toId === userId2) ||
            (m.fromId === userId2 && m.toId === userId1)
        ).sort((a, b) => new Date(a.date) - new Date(b.date));
    }
};

// ============================================
// 11. NOTIFICATION MANAGER
// ============================================
const NotificationManager = {
    // ----------------------
    // 11.1. Bildirishnoma yaratish
    // ----------------------
    createNotification(data) {
        return DataManager.add('notifications', {
            ...data,
            read: false,
            date: new Date().toISOString()
        });
    },
    
    // ----------------------
    // 11.2. Foydalanuvchi bildirishnomalari
    // ----------------------
    getUserNotifications(userId) {
        return DataBase.notifications.filter(n => n.userId === userId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    
    // ----------------------
    // 11.3. O'qilmagan bildirishnomalar
    // ----------------------
    getUnreadNotifications(userId) {
        return DataBase.notifications.filter(n => n.userId === userId && !n.read);
    },
    
    // ----------------------
    // 11.4. Bildirishnomani o'qilgan deb belgilash
    // ----------------------
    markAsRead(notificationId) {
        return DataManager.update('notifications', notificationId, { read: true });
    },
    
    // ----------------------
    // 11.5. Barchasini o'qilgan deb belgilash
    // ----------------------
    markAllAsRead(userId) {
        DataBase.notifications.forEach(n => {
            if (n.userId === userId) {
                n.read = true;
            }
        });
        DataBase.save();
    }
};

// ============================================
// 12. SEARCH FUNCTIONS
// ============================================
const SearchFunctions = {
    // ----------------------
    // 12.1. Foydalanuvchilarni qidirish
    // ----------------------
    searchUsers(query) {
        if (!query) return [];
        
        query = query.toLowerCase();
        return DataBase.users.filter(u => 
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query) ||
            u.username.toLowerCase().includes(query)
        );
    },
    
    // ----------------------
    // 12.2. Talabalarni qidirish
    // ----------------------
    searchStudents(query) {
        if (!query) return [];
        
        query = query.toLowerCase();
        return DataBase.students.filter(s => 
            s.name.toLowerCase().includes(query) ||
            s.email.toLowerCase().includes(query) ||
            (s.group && s.group.toLowerCase().includes(query))
        );
    },
    
    // ----------------------
    // 12.3. O'qituvchilarni qidirish
    // ----------------------
    searchTeachers(query) {
        if (!query) return [];
        
        query = query.toLowerCase();
        return DataBase.teachers.filter(t => 
            t.name.toLowerCase().includes(query) ||
            t.email.toLowerCase().includes(query) ||
            (t.subject && t.subject.toLowerCase().includes(query)) ||
            (t.department && t.department.toLowerCase().includes(query))
        );
    },
    
    // ----------------------
    // 12.4. Guruhlarni qidirish
    // ----------------------
    searchGroups(query) {
        if (!query) return [];
        
        query = query.toLowerCase();
        return DataBase.groups.filter(g => 
            g.name.toLowerCase().includes(query) ||
            (g.faculty && g.faculty.toLowerCase().includes(query))
        );
    }
};

// ============================================
// 13. STATISTICS FUNCTIONS
// ============================================
const StatisticsFunctions = {
    // ----------------------
    // 13.1. Umumiy statistika
    // ----------------------
    getGeneralStats() {
        return DataBase.statistics;
    },
    
    // ----------------------
    // 13.2. Fakultet statistikasi
    // ----------------------
    getFacultyStats() {
        const faculties = {};
        
        DataBase.groups.forEach(group => {
            if (!faculties[group.faculty]) {
                faculties[group.faculty] = {
                    name: group.faculty,
                    groups: 0,
                    students: 0,
                    teachers: new Set()
                };
            }
            
            faculties[group.faculty].groups++;
            faculties[group.faculty].students += group.students;
            
            if (group.teacherId) {
                faculties[group.faculty].teachers.add(group.teacherId);
            }
        });
        
        return Object.values(faculties).map(f => ({
            ...f,
            teachers: f.teachers.size
        }));
    },
    
    // ----------------------
    // 13.3. Kurslar statistikasi
    // ----------------------
    getCourseStats() {
        const courses = {};
        
        DataBase.students.forEach(student => {
            const course = student.course || 1;
            if (!courses[course]) {
                courses[course] = {
                    course,
                    students: 0,
                    groups: new Set()
                };
            }
            
            courses[course].students++;
            if (student.group) {
                courses[course].groups.add(student.group);
            }
        });
        
        return Object.values(courses).map(c => ({
            ...c,
            groups: c.groups.size
        }));
    },
    
    // ----------------------
    // 13.4. Vazifalar statistikasi
    // ----------------------
    getTaskStats() {
        const total = DataBase.tasks.length;
        const active = DataBase.tasks.filter(t => t.deadline >= new Date().toISOString().split('T')[0]).length;
        const overdue = DataBase.tasks.filter(t => t.deadline < new Date().toISOString().split('T')[0]).length;
        
        return { total, active, overdue };
    }
};

// ============================================
// 14. EXPORT FUNCTIONS
// ============================================
const ExportFunctions = {
    // ----------------------
    // 14.1. CSV formatida eksport
    // ----------------------
    toCSV(data, filename = 'export.csv') {
        if (!data || !data.length) return;
        
        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => headers.map(field => JSON.stringify(row[field] || '')).join(','))
        ].join('\n');
        
        this.download(csv, filename, 'text/csv');
    },
    
    // ----------------------
    // 14.2. JSON formatida eksport
    // ----------------------
    toJSON(data, filename = 'export.json') {
        const json = JSON.stringify(data, null, 2);
        this.download(json, filename, 'application/json');
    },
    
    // ----------------------
    // 14.3. Excel formatida eksport
    // ----------------------
    toExcel(data, filename = 'export.xls') {
        if (!data || !data.length) return;
        
        const headers = Object.keys(data[0]);
        const html = [
            '<table>',
            '<tr><th>' + headers.join('</th><th>') + '</th></tr>',
            ...data.map(row => '<tr><td>' + headers.map(field => row[field] || '').join('</td><td>') + '</td></tr>'),
            '</table>'
        ].join('');
        
        this.download(html, filename, 'application/vnd.ms-excel');
    },
    
    // ----------------------
    // 14.4. Faylni yuklab olish
    // ----------------------
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
// 15. BACKUP FUNCTIONS
// ============================================
const BackupFunctions = {
    // ----------------------
    // 15.1. Backup yaratish
    // ----------------------
    createBackup() {
        const backup = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            data: {
                users: DataBase.users,
                students: DataBase.students,
                teachers: DataBase.teachers,
                groups: DataBase.groups,
                subjects: DataBase.subjects,
                lessons: DataBase.lessons,
                tasks: DataBase.tasks,
                grades: DataBase.grades,
                attendance: DataBase.attendance,
                materials: DataBase.materials,
                announcements: DataBase.announcements,
                messages: DataBase.messages,
                notifications: DataBase.notifications
            }
        };
        
        const json = JSON.stringify(backup, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `eduhemis-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        return backup;
    },
    
    // ----------------------
    // 15.2. Backup ni tiklash
    // ----------------------
    restoreBackup(file, callback) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const backup = JSON.parse(e.target.result);
                
                if (backup.version && backup.data) {
                    DataBase.users = backup.data.users || [];
                    DataBase.students = backup.data.students || [];
                    DataBase.teachers = backup.data.teachers || [];
                    DataBase.groups = backup.data.groups || [];
                    DataBase.subjects = backup.data.subjects || [];
                    DataBase.lessons = backup.data.lessons || [];
                    DataBase.tasks = backup.data.tasks || [];
                    DataBase.grades = backup.data.grades || [];
                    DataBase.attendance = backup.data.attendance || [];
                    DataBase.materials = backup.data.materials || [];
                    DataBase.announcements = backup.data.announcements || [];
                    DataBase.messages = backup.data.messages || [];
                    DataBase.notifications = backup.data.notifications || [];
                    
                    DataBase.save();
                    DataBase.updateStatistics();
                    
                    if (callback) callback(true, 'Backup muvaffaqiyatli tiklandi');
                } else {
                    if (callback) callback(false, 'Noto\'g\'ri backup fayli');
                }
            } catch (error) {
                if (callback) callback(false, 'Xatolik yuz berdi: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    }
};

// ============================================
// 16. GLOBAL OBYEKTLAR
// ============================================
window.DataBase = DataBase;
window.DataManager = DataManager;
window.StudentManager = StudentManager;
window.TeacherManager = TeacherManager;
window.GroupManager = GroupManager;
window.SubjectManager = SubjectManager;
window.TaskManager = TaskManager;
window.GradeManager = GradeManager;
window.AttendanceManager = AttendanceManager;
window.MessageManager = MessageManager;
window.NotificationManager = NotificationManager;
window.SearchFunctions = SearchFunctions;
window.StatisticsFunctions = StatisticsFunctions;
window.ExportFunctions = ExportFunctions;
window.BackupFunctions = BackupFunctions;

// ============================================
// 17. SAHIFA YUKLANGANDA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Ma'lumotlarni yuklash
    DataBase.load();
});