/* ============================================
   EduHemis - O'qituvchi paneli
   Barcha o'qituvchi funksiyalari shu yerda
   ============================================ */

// ============================================
// 1. O'QITUVCHI DASHBOARD
// ============================================
function showTeacherDashboard() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const teacherGroups = TeacherManager.getTeacherGroups(user.id);
    const teacherLessons = TeacherManager.getTeacherLessons(user.id);
    const teacherTasks = TeacherManager.getTeacherTasks(user.id);
    const todayLessons = TeacherManager.getTodayLessons(user.id);
    
    // Statistika
    const totalStudents = teacherGroups.reduce((acc, g) => acc + g.students, 0);
    const totalLessons = teacherLessons.length;
    const totalTasks = teacherTasks.length;
    
    // Muddati o'tgan vazifalar
    const today = new Date().toISOString().split('T')[0];
    const overdueTasks = teacherTasks.filter(t => t.deadline < today);
    const nearDeadlineTasks = teacherTasks.filter(t => {
        const daysLeft = Utils.daysDiff(t.deadline);
        return daysLeft <= 3 && daysLeft >= 0;
    });
    
    // Bildirishnomalar sonini yangilash
    const notificationCount = overdueTasks.length + nearDeadlineTasks.length + todayLessons.length;
    updateTeacherNotifications(notificationCount);
    
    let html = `
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-[40px] p-8 text-white mb-6 animate-fadeIn">
            <div class="flex justify-between items-start">
                <div>
                    <span class="bg-white/20 px-4 py-1 rounded-full text-sm font-bold">O'QITUVCHI</span>
                    <h2 class="text-3xl font-bold mt-4">Salom, ${user.name}!</h2>
                    <p class="text-purple-100 mt-2">Fan: ${user.subject || 'Aniqlanmagan'}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-purple-100"><i class="far fa-calendar mr-1"></i> ${Utils.formatDate(new Date())}</p>
                    <p class="text-sm text-purple-100"><i class="far fa-clock mr-1"></i> ${Utils.formatTime(new Date())}</p>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div onclick="showMyGroups()" class="bg-white p-6 rounded-2xl shadow-sm card-hover animate-fadeIn" style="animation-delay: 0.1s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">Guruhlar</p>
                        <h3 class="text-2xl font-bold mt-1">${teacherGroups.length}</h3>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="mt-4 text-sm text-gray-500">
                    <i class="fas fa-user-graduate mr-1"></i> ${totalStudents} ta talaba
                </div>
            </div>

            <div onclick="showMyLessons()" class="bg-white p-6 rounded-2xl shadow-sm card-hover animate-fadeIn" style="animation-delay: 0.2s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">Darslar</p>
                        <h3 class="text-2xl font-bold mt-1">${totalLessons}</h3>
                    </div>
                    <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <div class="mt-4 text-sm">
                    ${todayLessons.length > 0 ? 
                        `<span class="text-green-500"><i class="fas fa-circle mr-1"></i> ${todayLessons.length} ta bugun</span>` : 
                        `<span class="text-gray-500"><i class="fas fa-circle mr-1"></i> Bugun dars yo'q</span>`
                    }
                </div>
            </div>

            <div onclick="showMyTasks()" class="bg-white p-6 rounded-2xl shadow-sm card-hover animate-fadeIn" style="animation-delay: 0.3s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">Vazifalar</p>
                        <h3 class="text-2xl font-bold mt-1">${totalTasks}</h3>
                    </div>
                    <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl">
                        <i class="fas fa-tasks"></i>
                    </div>
                </div>
                <div class="mt-4 text-sm">
                    ${overdueTasks.length > 0 ? 
                        `<span class="text-red-500"><i class="fas fa-exclamation-circle mr-1"></i> ${overdueTasks.length} ta muddati o'tgan</span>` : 
                        `<span class="text-green-500"><i class="fas fa-check-circle mr-1"></i> Barchasi vaqtida</span>`
                    }
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm animate-fadeIn" style="animation-delay: 0.4s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">Bugun</p>
                        <h3 class="text-2xl font-bold mt-1">${todayLessons.length}</h3>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl">
                        <i class="fas fa-clock"></i>
                    </div>
                </div>
                <div class="mt-4 text-sm text-gray-500">
                    <i class="fas fa-door-open mr-1"></i> ${todayLessons.map(l => l.room).join(', ') || '-'}
                </div>
            </div>
        </div>

        <!-- Alerts -->
        ${overdueTasks.length > 0 ? `
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-2xl mb-4 animate-slideIn">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700 font-medium">
                            ${overdueTasks.length} ta vazifaning muddati o'tgan!
                        </p>
                    </div>
                    <div class="ml-auto">
                        <button onclick="showMyTasks()" class="text-sm text-red-600 hover:text-red-800 font-medium">
                            Ko'rish →
                        </button>
                    </div>
                </div>
            </div>
        ` : ''}

        ${nearDeadlineTasks.length > 0 ? `
            <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-2xl mb-4 animate-slideIn">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-clock text-orange-500 text-xl"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-orange-700 font-medium">
                            ${nearDeadlineTasks.length} ta vazifaning muddati yaqin!
                        </p>
                    </div>
                    <div class="ml-auto">
                        <button onclick="showMyTasks()" class="text-sm text-orange-600 hover:text-orange-800 font-medium">
                            Ko'rish →
                        </button>
                    </div>
                </div>
            </div>
        ` : ''}
    `;

    // Today's Lessons
    if (todayLessons.length > 0) {
        html += `
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i class="fas fa-calendar-day text-blue-600"></i> Bugungi darslar
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        `;

        todayLessons.forEach(lesson => {
            const group = DataManager.findById('groups', lesson.groupId);
            const subject = DataManager.findById('subjects', lesson.subjectId);
            const students = group ? StudentManager.getGroupStudents(group.id) : [];
            
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm card-hover border-l-4 border-purple-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold text-lg">${group?.name || 'Guruh'}</h4>
                            <p class="text-sm text-gray-600 mt-1">${lesson.topic}</p>
                        </div>
                        <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold">${lesson.time}</span>
                    </div>
                    <div class="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span><i class="fas fa-users mr-1"></i> ${students.length} talaba</span>
                        <span><i class="fas fa-map-marker-alt mr-1"></i> ${lesson.room}-xona</span>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button onclick="showLessonAttendance(${lesson.id})" class="flex-1 py-2 bg-green-50 text-green-600 rounded-xl text-sm hover:bg-green-100">
                            <i class="fas fa-check-circle mr-1"></i> Davomat
                        </button>
                        <button onclick="showLessonDetail(${lesson.id})" class="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm hover:bg-blue-100">
                            <i class="fas fa-info-circle mr-1"></i> Ma'lumot
                        </button>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    }

    // Quick Actions
    html += `
        <h3 class="text-xl font-bold mb-4">⚡ Tezkor amallar</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button onclick="showAddLessonForm()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-plus-circle text-2xl text-green-600 mb-2"></i>
                <p class="font-bold text-sm">Dars qo'shish</p>
            </button>
            <button onclick="showAddTaskForm()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-tasks text-2xl text-orange-600 mb-2"></i>
                <p class="font-bold text-sm">Vazifa qo'shish</p>
            </button>
            <button onclick="showMyGroups()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-users text-2xl text-blue-600 mb-2"></i>
                <p class="font-bold text-sm">Guruhlarim</p>
            </button>
            <button onclick="showMySchedule()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-calendar-alt text-2xl text-purple-600 mb-2"></i>
                <p class="font-bold text-sm">Dars jadvali</p>
            </button>
        </div>
    `;

    // Recent Tasks
    if (teacherTasks.length > 0) {
        html += `
            <h3 class="text-xl font-bold mb-4">📋 Oxirgi vazifalar</h3>
            <div class="space-y-3">
        `;

        teacherTasks.slice(0, 3).forEach(task => {
            const group = DataManager.findById('groups', task.groupId);
            const submitted = task.students.filter(s => s.status === 'submitted').length;
            const total = task.students.length;
            const daysLeft = Utils.daysDiff(task.deadline);
            
            let statusClass = '';
            let statusText = '';
            
            if (daysLeft < 0) {
                statusClass = 'border-red-500 bg-red-50';
                statusText = 'Muddati o\'tgan';
            } else if (daysLeft <= 3) {
                statusClass = 'border-orange-500 bg-orange-50';
                statusText = `${daysLeft} kun qoldi`;
            } else {
                statusClass = 'border-green-500';
                statusText = `${daysLeft} kun qoldi`;
            }

            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm border-l-4 ${statusClass} card-hover" onclick="showTaskDetail(${task.id})">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold">${task.title}</h4>
                            <p class="text-sm text-gray-600">${group?.name || 'Guruh'} • ${task.description.substring(0, 50)}...</p>
                        </div>
                        <span class="text-xs font-bold px-2 py-1 rounded-full ${daysLeft < 0 ? 'bg-red-100 text-red-600' : daysLeft <= 3 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}">
                            ${statusText}
                        </span>
                    </div>
                    <div class="mt-3">
                        <div class="flex justify-between text-sm mb-1">
                            <span>Topshirganlar: ${submitted}/${total}</span>
                            <span>${total ? Math.round(submitted/total*100) : 0}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${total ? (submitted/total*100) : 0}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 2. BILDIRISHNOMALARNI YANGILASH
// ============================================
function updateTeacherNotifications(count) {
    const badge = document.getElementById('notificationCount');
    if (badge) {
        badge.textContent = count;
        if (count > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

// ============================================
// 3. MENING GURUHLARIM
// ============================================
function showMyGroups() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const groups = TeacherManager.getTeacherGroups(user.id);

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showTeacherDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">👥 Mening guruhlarim</h1>
        </div>
    `;

    if (groups.length > 0) {
        html += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;
        
        groups.forEach(group => {
            const students = StudentManager.getGroupStudents(group.id);
            const lessons = DataBase.lessons.filter(l => l.groupId === group.id);
            const groupStats = GroupManager.getGroupStatistics(group.id);
            
            html += `
                <div class="bg-white p-6 rounded-2xl shadow-sm card-hover">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
                            ${group.name.split('-')[0]}
                        </div>
                        <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">${group.course}-kurs</span>
                    </div>
                    <h3 class="font-bold text-xl">${group.name}</h3>
                    <p class="text-sm text-gray-500">${group.faculty || 'Fakultet'}</p>
                    
                    <div class="mt-4 space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Talabalar:</span>
                            <span class="font-medium">${students.length} ta</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Darslar:</span>
                            <span class="font-medium">${lessons.length} ta</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500">O'rtacha baho:</span>
                            <span class="font-bold text-lg ${groupStats?.averageGrade >= 4.5 ? 'text-green-600' : groupStats?.averageGrade >= 3.5 ? 'text-yellow-600' : 'text-red-600'}">${groupStats?.averageGrade || 0}</span>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <button onclick="showGroupStudents(${group.id})" class="py-2 bg-blue-50 text-blue-600 rounded-xl text-sm hover:bg-blue-100">
                            <i class="fas fa-users mr-1"></i> Talabalar
                        </button>
                        <button onclick="showGroupLessons(${group.id})" class="py-2 bg-green-50 text-green-600 rounded-xl text-sm hover:bg-green-100">
                            <i class="fas fa-calendar mr-1"></i> Darslar
                        </button>
                        <button onclick="showGroupJournal(${group.id})" class="py-2 bg-purple-50 text-purple-600 rounded-xl text-sm hover:bg-purple-100">
                            <i class="fas fa-book-open mr-1"></i> Jurnal
                        </button>
                        <button onclick="showGroupAttendance(${group.id})" class="py-2 bg-orange-50 text-orange-600 rounded-xl text-sm hover:bg-orange-100">
                            <i class="fas fa-check-circle mr-1"></i> Davomat
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-users text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Sizga biriktirilgan guruhlar yo'q</p>
                <button onclick="showAddGroupForm()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                    <i class="fas fa-plus mr-2"></i> Guruh qo'shish
                </button>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 4. GURUH TALABALARI
// ============================================
function showGroupStudents(groupId) {
    const group = DataManager.findById('groups', groupId);
    const students = StudentManager.getGroupStudents(groupId);

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showMyGroups()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">${group?.name} - Talabalar</h1>
        </div>
    `;

    if (students.length > 0) {
        html += `
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="p-4 text-left">#</th>
                            <th class="p-4 text-left">Talaba</th>
                            <th class="p-4 text-left">Login</th>
                            <th class="p-4 text-left">Email</th>
                            <th class="p-4 text-left">O'rtacha</th>
                            <th class="p-4 text-left">Davomat</th>
                            <th class="p-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        students.forEach((student, index) => {
            const avg = GradeManager.getStudentAverage(student.id);
            const attendance = AttendanceManager.getAttendancePercentage(student.id);
            
            html += `
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-4">${index + 1}</td>
                    <td class="p-4 font-medium">${student.name}</td>
                    <td class="p-4">${student.username}</td>
                    <td class="p-4">${student.email}</td>
                    <td class="p-4">
                        <span class="font-bold ${avg >= 4.5 ? 'text-green-600' : avg >= 3.5 ? 'text-yellow-600' : 'text-red-600'}">${avg}</span>
                    </td>
                    <td class="p-4">
                        <span class="font-bold ${attendance >= 90 ? 'text-green-600' : attendance >= 75 ? 'text-yellow-600' : 'text-red-600'}">${attendance}%</span>
                    </td>
                    <td class="p-4">
                        <button onclick="showStudentGrades(${student.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="Baholar">
                            <i class="fas fa-star"></i>
                        </button>
                        <button onclick="showStudentAttendance(${student.id})" class="text-green-600 hover:text-green-800" title="Davomat">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-user-graduate text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Bu guruhda talabalar yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 5. TALABA BAHOLARI
// ============================================
function showStudentGrades(studentId) {
    const student = DataManager.findById('students', studentId);
    const grades = GradeManager.getStudentGrades(studentId);
    const average = GradeManager.getStudentAverage(studentId);

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="history.back()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">${student?.name} - Baholari</h1>
        </div>
    `;

    if (grades.length > 0) {
        html += `
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white mb-6">
                <p class="text-sm opacity-90">O'rtacha baho</p>
                <p class="text-4xl font-bold mt-2">${average}</p>
                <p class="text-sm mt-2">Jami ${grades.length} ta baho</p>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="p-4 text-left">Sana</th>
                            <th class="p-4 text-left">Fan</th>
                            <th class="p-4 text-left">Baho</th>
                            <th class="p-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        grades.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(grade => {
            const subject = DataManager.findById('subjects', grade.subjectId);
            
            html += `
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-4">${grade.date}</td>
                    <td class="p-4">${subject?.name || '-'}</td>
                    <td class="p-4">
                        <span class="px-3 py-1 rounded-full text-sm font-bold ${grade.grade >= 4.5 ? 'bg-green-100 text-green-600' : grade.grade >= 3.5 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}">
                            ${grade.grade}
                        </span>
                    </td>
                    <td class="p-4">
                        <button onclick="editGrade(${grade.id})" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteGrade(${grade.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>

            <button onclick="showAddGradeForm(${studentId})" class="mt-6 w-full bg-green-600 text-white p-4 rounded-xl font-bold hover:bg-green-700">
                <i class="fas fa-plus mr-2"></i> Yangi baho qo'shish
            </button>
        `;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-star text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-4">Hozircha baholar yo'q</p>
                <button onclick="showAddGradeForm(${studentId})" class="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                    <i class="fas fa-plus mr-2"></i> Baho qo'shish
                </button>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 6. BAHO QO'SHISH
// ============================================
function showAddGradeForm(studentId) {
    const user = Auth.getCurrentUser();
    const subjects = DataBase.subjects.filter(s => s.teacherId === user.id);

    let subjectOptions = '<option value="">Fan tanlang</option>';
    subjects.forEach(s => {
        subjectOptions += `<option value="${s.id}">${s.name}</option>`;
    });

    showModal(`
        <h3 class="text-xl font-bold mb-4">➕ Yangi baho qo'shish</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Fan</label>
                <select id="gradeSubject" class="w-full p-3 border rounded-xl">
                    ${subjectOptions}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Baho</label>
                <select id="gradeValue" class="w-full p-3 border rounded-xl">
                    <option value="5">5 - A'lo</option>
                    <option value="4">4 - Yaxshi</option>
                    <option value="3">3 - Qoniqarli</option>
                    <option value="2">2 - Qoniqarsiz</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Sana</label>
                <input type="date" id="gradeDate" value="${new Date().toISOString().split('T')[0]}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Turi</label>
                <select id="gradeType" class="w-full p-3 border rounded-xl">
                    <option value="exam">Imtihon</option>
                    <option value="quiz">Test</option>
                    <option value="homework">Uy vazifasi</option>
                    <option value="activity">Faollik</option>
                </select>
            </div>
            <button onclick="addGrade(${studentId})" class="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">
                Saqlash
            </button>
        </div>
    `);
}

function addGrade(studentId) {
    const user = Auth.getCurrentUser();
    const subjectId = document.getElementById('gradeSubject')?.value;
    const grade = document.getElementById('gradeValue')?.value;
    const date = document.getElementById('gradeDate')?.value;
    const type = document.getElementById('gradeType')?.value;

    if (!subjectId || !grade || !date) {
        showError('Barcha maydonlarni to\'ldiring');
        return;
    }

    GradeManager.addGrade({
        studentId: studentId,
        subjectId: parseInt(subjectId),
        grade: parseInt(grade),
        date: date,
        type: type,
        teacherId: user.id
    });

    closeModal();
    showSuccess('Baho muvaffaqiyatli qo\'shildi');
    showStudentGrades(studentId);
}

// ============================================
// 7. BAHO TAHRIRLASH
// ============================================
function editGrade(gradeId) {
    const grade = DataManager.findById('grades', gradeId);
    if (!grade) return;

    showModal(`
        <h3 class="text-xl font-bold mb-4">✏️ Bahoni tahrirlash</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Baho</label>
                <select id="editGradeValue" class="w-full p-3 border rounded-xl">
                    <option value="5" ${grade.grade === 5 ? 'selected' : ''}>5 - A'lo</option>
                    <option value="4" ${grade.grade === 4 ? 'selected' : ''}>4 - Yaxshi</option>
                    <option value="3" ${grade.grade === 3 ? 'selected' : ''}>3 - Qoniqarli</option>
                    <option value="2" ${grade.grade === 2 ? 'selected' : ''}>2 - Qoniqarsiz</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Sana</label>
                <input type="date" id="editGradeDate" value="${grade.date}" class="w-full p-3 border rounded-xl">
            </div>
            <button onclick="updateGrade(${gradeId})" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                Yangilash
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300">
                Bekor qilish
            </button>
        </div>
    `);
}

function updateGrade(gradeId) {
    const grade = document.getElementById('editGradeValue')?.value;
    const date = document.getElementById('editGradeDate')?.value;

    if (!grade || !date) {
        showError('Barcha maydonlarni to\'ldiring');
        return;
    }

    GradeManager.updateGrade(gradeId, {
        grade: parseInt(grade),
        date: date
    });

    closeModal();
    showSuccess('Baho yangilandi');
    location.reload();
}

// ============================================
// 8. BAHO O'CHIRISH
// ============================================
function deleteGrade(gradeId) {
    UI.confirm('Haqiqatan ham bu bahoni o\'chirmoqchimisiz?', () => {
        GradeManager.deleteGrade(gradeId);
        showSuccess('Baho o\'chirildi');
        location.reload();
    });
}

// ============================================
// 9. GURUH DARSLARI
// ============================================
function showGroupLessons(groupId) {
    const group = DataManager.findById('groups', groupId);
    const lessons = DataBase.lessons.filter(l => l.groupId === groupId)
        .sort((a, b) => a.date.localeCompare(b.date));

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showMyGroups()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">${group?.name} - Darslar</h1>
        </div>
    `;

    if (lessons.length > 0) {
        html += `
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="p-4 text-left">Sana</th>
                            <th class="p-4 text-left">Vaqt</th>
                            <th class="p-4 text-left">Fan</th>
                            <th class="p-4 text-left">Mavzu</th>
                            <th class="p-4 text-left">Xona</th>
                            <th class="p-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        lessons.forEach(lesson => {
            const subject = DataManager.findById('subjects', lesson.subjectId);
            const today = new Date().toISOString().split('T')[0];
            const isToday = lesson.date === today;

            html += `
                <tr class="border-t hover:bg-gray-50 ${isToday ? 'bg-blue-50' : ''}">
                    <td class="p-4">${lesson.date} ${isToday ? '⭐' : ''}</td>
                    <td class="p-4">${lesson.time}</td>
                    <td class="p-4 font-medium">${subject?.name || '-'}</td>
                    <td class="p-4">${lesson.topic}</td>
                    <td class="p-4">${lesson.room}</td>
                    <td class="p-4">
                        <button onclick="editLesson(${lesson.id})" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteLesson(${lesson.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-calendar text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-4">Hozircha darslar yo'q</p>
                <button onclick="showAddLessonForm()" class="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                    <i class="fas fa-plus mr-2"></i> Dars qo'shish
                </button>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 10. DARS QO'SHISH
// ============================================
function showAddLessonForm() {
    const user = Auth.getCurrentUser();
    const groups = TeacherManager.getTeacherGroups(user.id);
    const subjects = DataBase.subjects.filter(s => s.teacherId === user.id);

    let groupOptions = '<option value="">Guruh tanlang</option>';
    groups.forEach(g => {
        groupOptions += `<option value="${g.id}">${g.name}</option>`;
    });

    let subjectOptions = '<option value="">Fan tanlang</option>';
    subjects.forEach(s => {
        subjectOptions += `<option value="${s.id}">${s.name}</option>`;
    });

    showModal(`
        <h3 class="text-xl font-bold mb-4">➕ Yangi dars qo'shish</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Guruh</label>
                <select id="lessonGroup" class="w-full p-3 border rounded-xl">
                    ${groupOptions}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Fan</label>
                <select id="lessonSubject" class="w-full p-3 border rounded-xl">
                    ${subjectOptions}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Mavzu</label>
                <input type="text" id="lessonTopic" placeholder="Dars mavzusi" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Sana</label>
                <input type="date" id="lessonDate" value="${new Date().toISOString().split('T')[0]}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Vaqt</label>
                <input type="text" id="lessonTime" placeholder="Masalan: 09:00-10:20" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Xona</label>
                <input type="text" id="lessonRoom" placeholder="Masalan: 402" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Dars turi</label>
                <select id="lessonType" class="w-full p-3 border rounded-xl">
                    <option value="lecture">Ma'ruza</option>
                    <option value="practice">Amaliy</option>
                    <option value="lab">Laboratoriya</option>
                </select>
            </div>
            <button onclick="addLesson()" class="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">
                Saqlash
            </button>
        </div>
    `);
}

function addLesson() {
    const user = Auth.getCurrentUser();
    const groupId = document.getElementById('lessonGroup')?.value;
    const subjectId = document.getElementById('lessonSubject')?.value;
    const topic = document.getElementById('lessonTopic')?.value;
    const date = document.getElementById('lessonDate')?.value;
    const time = document.getElementById('lessonTime')?.value;
    const room = document.getElementById('lessonRoom')?.value;
    const type = document.getElementById('lessonType')?.value;

    if (!groupId || !subjectId || !topic || !date || !time || !room) {
        showError('Barcha maydonlarni to\'ldiring');
        return;
    }

    DataManager.add('lessons', {
        teacherId: user.id,
        groupId: parseInt(groupId),
        subjectId: parseInt(subjectId),
        topic: topic,
        date: date,
        time: time,
        room: room,
        type: type
    });

    closeModal();
    showSuccess('Dars muvaffaqiyatli qo\'shildi');
    showTeacherDashboard();
}

// ============================================
// 11. DARS TAHRIRLASH
// ============================================
function editLesson(lessonId) {
    const lesson = DataManager.findById('lessons', lessonId);
    if (!lesson) return;

    showModal(`
        <h3 class="text-xl font-bold mb-4">✏️ Darsni tahrirlash</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Mavzu</label>
                <input type="text" id="editLessonTopic" value="${lesson.topic}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Sana</label>
                <input type="date" id="editLessonDate" value="${lesson.date}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Vaqt</label>
                <input type="text" id="editLessonTime" value="${lesson.time}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Xona</label>
                <input type="text" id="editLessonRoom" value="${lesson.room}" class="w-full p-3 border rounded-xl">
            </div>
            <button onclick="updateLesson(${lessonId})" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                Yangilash
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300">
                Bekor qilish
            </button>
        </div>
    `);
}

function updateLesson(lessonId) {
    const topic = document.getElementById('editLessonTopic')?.value;
    const date = document.getElementById('editLessonDate')?.value;
    const time = document.getElementById('editLessonTime')?.value;
    const room = document.getElementById('editLessonRoom')?.value;

    if (!topic || !date || !time || !room) {
        showError('Barcha maydonlarni to\'ldiring');
        return;
    }

    DataManager.update('lessons', lessonId, {
        topic: topic,
        date: date,
        time: time,
        room: room
    });

    closeModal();
    showSuccess('Dars yangilandi');
    location.reload();
}

// ============================================
// 12. DARS O'CHIRISH
// ============================================
function deleteLesson(lessonId) {
    UI.confirm('Haqiqatan ham bu darsni o\'chirmoqchimisiz?', () => {
        DataManager.delete('lessons', lessonId);
        showSuccess('Dars o\'chirildi');
        location.reload();
    });
}

// ============================================
// 13. DARS TAFSILOTLARI
// ============================================
function showLessonDetail(lessonId) {
    const lesson = DataManager.findById('lessons', lessonId);
    if (!lesson) return;

    const group = DataManager.findById('groups', lesson.groupId);
    const subject = DataManager.findById('subjects', lesson.subjectId);
    const students = group ? StudentManager.getGroupStudents(group.id) : [];

    showModal(`
        <h3 class="text-xl font-bold mb-2">${lesson.topic}</h3>
        <p class="text-gray-500 mb-4">${subject?.name} • ${group?.name}</p>
        
        <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="bg-blue-50 p-3 rounded-xl text-center">
                <p class="text-xs text-gray-500">Sana</p>
                <p class="font-bold">${lesson.date}</p>
            </div>
            <div class="bg-green-50 p-3 rounded-xl text-center">
                <p class="text-xs text-gray-500">Vaqt</p>
                <p class="font-bold">${lesson.time}</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-xl text-center">
                <p class="text-xs text-gray-500">Xona</p>
                <p class="font-bold">${lesson.room}</p>
            </div>
            <div class="bg-orange-50 p-3 rounded-xl text-center">
                <p class="text-xs text-gray-500">Talabalar</p>
                <p class="font-bold">${students.length}</p>
            </div>
        </div>

        <div class="flex gap-2">
            <button onclick="showLessonAttendance(${lessonId})" class="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700">
                <i class="fas fa-check-circle mr-2"></i> Davomat
            </button>
            <button onclick="editLesson(${lessonId})" class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                <i class="fas fa-edit mr-2"></i> Tahrirlash
            </button>
        </div>
    `);
}

// ============================================
// 14. DAVOMAT
// ============================================
function showLessonAttendance(lessonId) {
    const lesson = DataManager.findById('lessons', lessonId);
    if (!lesson) return;

    const group = DataManager.findById('groups', lesson.groupId);
    const students = group ? StudentManager.getGroupStudents(group.id) : [];
    
    // Bugungi davomat
    const todayAttendance = DataBase.attendance.filter(a => 
        a.lessonId === lessonId && a.date === lesson.date
    );

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showTeacherDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">${group?.name} - Davomat</h1>
        </div>

        <div class="bg-white p-4 rounded-2xl shadow-sm mb-4">
            <p class="font-bold">${lesson.topic}</p>
            <p class="text-sm text-gray-500">${lesson.date} • ${lesson.time} • ${lesson.room}-xona</p>
        </div>
    `;

    if (students.length > 0) {
        html += `
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="p-4 text-left">Talaba</th>
                            <th class="p-4 text-center">Holat</th>
                            <th class="p-4 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        students.forEach(student => {
            const attendance = todayAttendance.find(a => a.studentId === student.id);
            const status = attendance?.status || 'absent';

            html += `
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-4 font-medium">${student.name}</td>
                    <td class="p-4 text-center">
                        <select id="status-${student.id}" class="px-3 py-1 border rounded-lg text-sm">
                            <option value="present" ${status === 'present' ? 'selected' : ''}>✅ Keldi</option>
                            <option value="late" ${status === 'late' ? 'selected' : ''}>🟡 Kechikdi</option>
                            <option value="absent" ${status === 'absent' ? 'selected' : ''}>❌ Kelmadi</option>
                        </select>
                    </td>
                    <td class="p-4 text-center">
                        <button onclick="saveAttendance(${lessonId}, ${student.id}, 'status-${student.id}')" class="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                            Saqlash
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-users text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Bu guruhda talabalar yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 15. DAVOMATNI SAQLASH
// ============================================
function saveAttendance(lessonId, studentId, selectId) {
    const status = document.getElementById(selectId)?.value;
    const lesson = DataManager.findById('lessons', lessonId);
    
    if (!lesson || !status) return;

    // Eski davomatni o'chirish
    DataBase.attendance = DataBase.attendance.filter(a => 
        !(a.lessonId === lessonId && a.studentId === studentId)
    );

    // Yangi davomat qo'shish
    AttendanceManager.addAttendance({
        studentId: studentId,
        lessonId: lessonId,
        date: lesson.date,
        status: status
    });

    showSuccess('Davomat saqlandi');
}

// ============================================
// 16. GURUH DAVOMATI
// ============================================
function showGroupAttendance(groupId) {
    const group = DataManager.findById('groups', groupId);
    const students = StudentManager.getGroupStudents(groupId);
    const lessons = DataBase.lessons.filter(l => l.groupId === groupId)
        .sort((a, b) => b.date.localeCompare(a.date));

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showMyGroups()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">${group?.name} - Davomat</h1>
        </div>
    `;

    if (students.length > 0 && lessons.length > 0) {
        html += `
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                <table class="w-full min-w-[800px]">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="p-4 text-left sticky left-0 bg-gray-50">Talaba</th>
                            ${lessons.slice(0, 10).map(l => `
                                <th class="p-4 text-center w-20">
                                    <div class="text-xs">${l.date}</div>
                                    <div class="text-xs text-gray-500">${l.time}</div>
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;

        students.forEach(student => {
            html += `
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-4 font-medium sticky left-0 bg-white">${student.name}</td>
            `;

            lessons.slice(0, 10).forEach(lesson => {
                const attendance = DataBase.attendance.find(a => 
                    a.lessonId === lesson.id && a.studentId === student.id
                );
                
                let statusSymbol = '';
                if (attendance) {
                    if (attendance.status === 'present') statusSymbol = '✅';
                    else if (attendance.status === 'late') statusSymbol = '🟡';
                    else if (attendance.status === 'absent') statusSymbol = '❌';
                } else {
                    statusSymbol = '⚪';
                }

                html += `<td class="p-4 text-center text-xl">${statusSymbol}</td>`;
            });

            html += `</tr>`;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-calendar-check text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Davomat ma'lumotlari yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 17. GURUH JURNALI
// ============================================
function showGroupJournal(groupId) {
    const group = DataManager.findById('groups', groupId);
    const students = StudentManager.getGroupStudents(groupId);
    const subjects = DataBase.subjects.filter(s => 
        DataBase.lessons.some(l => l.groupId === groupId && l.subjectId === s.id)
    );

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showMyGroups()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">${group?.name} - Jurnal</h1>
        </div>
    `;

    if (students.length > 0 && subjects.length > 0) {
        html += `
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                <table class="w-full min-w-[600px]">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="p-4 text-left sticky left-0 bg-gray-50">Talaba</th>
                            ${subjects.map(s => `
                                <th class="p-4 text-center w-24">${s.name}</th>
                            `).join('')}
                            <th class="p-4 text-center w-24 bg-blue-50">O'rtacha</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        students.forEach(student => {
            let totalGrade = 0;
            let gradeCount = 0;

            html += `
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-4 font-medium sticky left-0 bg-white">${student.name}</td>
            `;

            subjects.forEach(subject => {
                const grades = DataBase.grades.filter(g => 
                    g.studentId === student.id && g.subjectId === subject.id
                );
                
                const avg = grades.length ? 
                    (grades.reduce((acc, g) => acc + g.grade, 0) / grades.length).toFixed(1) : 
                    '-';

                if (grades.length) {
                    totalGrade += parseFloat(avg);
                    gradeCount++;
                }

                html += `
                    <td class="p-4 text-center">
                        <span class="font-bold ${avg >= 4.5 ? 'text-green-600' : avg >= 3.5 ? 'text-yellow-600' : 'text-red-600'}">${avg}</span>
                    </td>
                `;
            });

            const totalAvg = gradeCount ? (totalGrade / gradeCount).toFixed(1) : '-';

            html += `
                    <td class="p-4 text-center bg-blue-50 font-bold">${totalAvg}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-book-open text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Jurnal ma'lumotlari yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 18. DARS JADVALI
// ============================================
function showMySchedule() {
    const user = Auth.getCurrentUser();
    const lessons = TeacherManager.getTeacherLessons(user.id)
        .sort((a, b) => a.date.localeCompare(b.date));

    const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1;

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showTeacherDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📅 Dars jadvali</h1>
        </div>

        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="p-4 text-left">Kun</th>
                        <th class="p-4 text-left">Sana</th>
                        <th class="p-4 text-left">Vaqt</th>
                        <th class="p-4 text-left">Guruh</th>
                        <th class="p-4 text-left">Fan</th>
                        <th class="p-4 text-left">Mavzu</th>
                        <th class="p-4 text-left">Xona</th>
                    </tr>
                </thead>
                <tbody>
    `;

    if (lessons.length > 0) {
        lessons.forEach(lesson => {
            const group = DataManager.findById('groups', lesson.groupId);
            const subject = DataManager.findById('subjects', lesson.subjectId);
            const date = new Date(lesson.date);
            const dayIndex = date.getDay();
            const dayName = dayIndex === 0 ? 'Yakshanba' : days[dayIndex - 1];
            const isToday = lesson.date === new Date().toISOString().split('T')[0];

            html += `
                <tr class="border-t hover:bg-gray-50 ${isToday ? 'bg-blue-50' : ''}">
                    <td class="p-4 font-medium">${dayName}</td>
                    <td class="p-4">${lesson.date}</td>
                    <td class="p-4">${lesson.time}</td>
                    <td class="p-4">${group?.name || '-'}</td>
                    <td class="p-4">${subject?.name || '-'}</td>
                    <td class="p-4">${lesson.topic}</td>
                    <td class="p-4">${lesson.room}</td>
                </tr>
            `;
        });
    } else {
        html += `
            <tr>
                <td colspan="7" class="p-8 text-center text-gray-500">
                    <i class="fas fa-calendar text-4xl text-gray-300 mb-2"></i>
                    <p>Darslar yo'q</p>
                </td>
            </tr>
        `;
    }

    html += `
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 19. MENING VAZIFALARIM
// ============================================
function showMyTasks() {
    const user = Auth.getCurrentUser();
    const tasks = TeacherManager.getTeacherTasks(user.id);
    const today = new Date().toISOString().split('T')[0];

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showTeacherDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📋 Vazifalar</h1>
            <button onclick="showAddTaskForm()" class="ml-auto px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                <i class="fas fa-plus mr-2"></i> Yangi
            </button>
        </div>
    `;

    if (tasks.length > 0) {
        // Muddati o'tganlar
        const overdueTasks = tasks.filter(t => t.deadline < today);
        if (overdueTasks.length > 0) {
            html += `
                <h3 class="font-bold text-lg mb-3 text-red-600">🔴 Muddati o'tgan (${overdueTasks.length})</h3>
                ${overdueTasks.map(t => createTeacherTaskCard(t)).join('')}
            `;
        }

        // Muddati yaqinlar (3 kun)
        const nearTasks = tasks.filter(t => {
            const daysLeft = Utils.daysDiff(t.deadline);
            return daysLeft <= 3 && daysLeft >= 0;
        });
        if (nearTasks.length > 0) {
            html += `
                <h3 class="font-bold text-lg mb-3 text-orange-600">🟡 Muddati yaqin (${nearTasks.length})</h3>
                ${nearTasks.map(t => createTeacherTaskCard(t)).join('')}
            `;
        }

        // Boshqa vazifalar
        const otherTasks = tasks.filter(t => {
            const daysLeft = Utils.daysDiff(t.deadline);
            return daysLeft > 3;
        });
        if (otherTasks.length > 0) {
            html += `
                <h3 class="font-bold text-lg mb-3 text-green-600">🟢 Faol vazifalar (${otherTasks.length})</h3>
                ${otherTasks.map(t => createTeacherTaskCard(t)).join('')}
            `;
        }
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-tasks text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Hozircha vazifalar yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// O'qituvchi vazifa kartasi
function createTeacherTaskCard(task) {
    const group = DataManager.findById('groups', task.groupId);
    const daysLeft = Utils.daysDiff(task.deadline);
    const submitted = task.students.filter(s => s.status === 'submitted').length;
    const total = task.students.length;
    
    let statusClass = '';
    let statusText = '';
    
    if (daysLeft < 0) {
        statusClass = 'border-red-500 bg-red-50';
        statusText = `Muddati o'tgan (${Math.abs(daysLeft)} kun)`;
    } else if (daysLeft <= 3) {
        statusClass = 'border-orange-500 bg-orange-50';
        statusText = `${daysLeft} kun qoldi`;
    } else {
        statusClass = 'border-green-500';
        statusText = `${daysLeft} kun qoldi`;
    }

    return `
        <div class="bg-white p-4 rounded-2xl shadow-sm border-l-4 ${statusClass} mb-3 card-hover" onclick="showTaskDetail(${task.id})">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-bold">${task.title}</h4>
                    <p class="text-sm text-gray-600">${group?.name || 'Guruh'} • ${task.description.substring(0, 50)}...</p>
                </div>
                <span class="text-xs font-bold px-2 py-1 rounded-full ${daysLeft < 0 ? 'bg-red-100 text-red-600' : daysLeft <= 3 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}">
                    ${statusText}
                </span>
            </div>
            <div class="mt-3">
                <div class="flex justify-between text-sm mb-1">
                    <span>Topshirganlar: ${submitted}/${total}</span>
                    <span>${total ? Math.round(submitted/total*100) : 0}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${total ? (submitted/total*100) : 0}%"></div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// 20. VAZIFA QO'SHISH
// ============================================
function showAddTaskForm() {
    const user = Auth.getCurrentUser();
    const groups = TeacherManager.getTeacherGroups(user.id);

    let groupOptions = '<option value="">Guruh tanlang</option>';
    groups.forEach(g => {
        groupOptions += `<option value="${g.id}">${g.name}</option>`;
    });

    showModal(`
        <h3 class="text-xl font-bold mb-4">➕ Yangi vazifa qo'shish</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Guruh</label>
                <select id="taskGroup" class="w-full p-3 border rounded-xl">
                    ${groupOptions}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Vazifa nomi</label>
                <input type="text" id="taskTitle" placeholder="Vazifa nomi" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Tavsif</label>
                <textarea id="taskDesc" rows="4" placeholder="Vazifa tavsifi" class="w-full p-3 border rounded-xl"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Muddat</label>
                <input type="date" id="taskDeadline" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Maksimal ball</label>
                <input type="number" id="taskMaxScore" value="100" class="w-full p-3 border rounded-xl">
            </div>
            <button onclick="addTask()" class="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">
                Saqlash
            </button>
        </div>
    `);
}

function addTask() {
    const user = Auth.getCurrentUser();
    const groupId = document.getElementById('taskGroup')?.value;
    const title = document.getElementById('taskTitle')?.value;
    const desc = document.getElementById('taskDesc')?.value;
    const deadline = document.getElementById('taskDeadline')?.value;
    const maxScore = document.getElementById('taskMaxScore')?.value;

    if (!groupId || !title || !desc || !deadline || !maxScore) {
        showError('Barcha maydonlarni to\'ldiring');
        return;
    }

    TaskManager.addTask({
        teacherId: user.id,
        groupId: parseInt(groupId),
        title: title,
        description: desc,
        deadline: deadline,
        maxScore: parseInt(maxScore),
        createdAt: new Date().toISOString()
    });

    closeModal();
    showSuccess('Vazifa muvaffaqiyatli qo\'shildi');
    showMyTasks();
}

// ============================================
// 21. VAZIFA TAFSILOTLARI
// ============================================
function showTaskDetail(taskId) {
    const task = DataManager.findById('tasks', taskId);
    if (!task) return;

    const group = DataManager.findById('groups', task.groupId);
    const daysLeft = Utils.daysDiff(task.deadline);
    
    const submitted = task.students.filter(s => s.status === 'submitted').length;
    const pending = task.students.filter(s => s.status === 'pending').length;
    const late = task.students.filter(s => s.status === 'late').length;

    let html = `
        <h3 class="text-xl font-bold mb-2">${task.title}</h3>
        <p class="text-gray-500 mb-4">${group?.name} • Maksimal ball: ${task.maxScore}</p>
        
        <div class="bg-gray-50 p-4 rounded-xl mb-4">
            <p class="text-sm">${task.description}</p>
        </div>

        <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="bg-green-100 p-3 rounded-xl text-center">
                <p class="text-2xl font-bold text-green-600">${submitted}</p>
                <p class="text-xs">Topshirgan</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-xl text-center">
                <p class="text-2xl font-bold text-yellow-600">${pending}</p>
                <p class="text-xs">Kutilmoqda</p>
            </div>
            <div class="bg-red-100 p-3 rounded-xl text-center">
                <p class="text-2xl font-bold text-red-600">${late}</p>
                <p class="text-xs">Kechikkan</p>
            </div>
        </div>

        <div class="mb-4 p-4 rounded-xl ${daysLeft < 0 ? 'bg-red-50' : daysLeft <= 3 ? 'bg-orange-50' : 'bg-green-50'}">
            <p class="font-medium">Muddat: ${task.deadline} (${daysLeft < 0 ? `${Math.abs(daysLeft)} kun o'tgan` : `${daysLeft} kun qoldi`})</p>
        </div>

        <h4 class="font-bold mb-2">Talabalar</h4>
        <div class="space-y-2 max-h-60 overflow-y-auto mb-4">
    `;

    task.students.forEach(s => {
        const student = DataManager.findById('students', s.studentId);
        const statusColor = s.status === 'submitted' ? 'text-green-600' : s.status === 'late' ? 'text-red-600' : 'text-yellow-600';
        const statusText = s.status === 'submitted' ? '✅' : s.status === 'late' ? '❌' : '⏳';

        html += `
            <div class="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
                <div>
                    <p class="font-medium">${student?.name || 'Noma\'lum'}</p>
                    ${s.score ? `<p class="text-sm">Baho: ${s.score}/${task.maxScore}</p>` : ''}
                </div>
                <span class="${statusColor} text-xl">${statusText}</span>
            </div>
        `;
    });

    html += `
        </div>

        <div class="flex gap-2">
            <button onclick="editTask(${taskId})" class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                <i class="fas fa-edit mr-2"></i> Tahrirlash
            </button>
            <button onclick="deleteTask(${taskId})" class="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700">
                <i class="fas fa-trash mr-2"></i> O'chirish
            </button>
        </div>
    `;

    showModal(html);
}

// ============================================
// 22. VAZIFANI TAHRIRLASH
// ============================================
function editTask(taskId) {
    const task = DataManager.findById('tasks', taskId);
    if (!task) return;

    showModal(`
        <h3 class="text-xl font-bold mb-4">✏️ Vazifani tahrirlash</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Vazifa nomi</label>
                <input type="text" id="editTaskTitle" value="${task.title}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Tavsif</label>
                <textarea id="editTaskDesc" rows="4" class="w-full p-3 border rounded-xl">${task.description}</textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Muddat</label>
                <input type="date" id="editTaskDeadline" value="${task.deadline}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Maksimal ball</label>
                <input type="number" id="editTaskMaxScore" value="${task.maxScore}" class="w-full p-3 border rounded-xl">
            </div>
            <button onclick="updateTask(${taskId})" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                Yangilash
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300">
                Bekor qilish
            </button>
        </div>
    `);
}

function updateTask(taskId) {
    const title = document.getElementById('editTaskTitle')?.value;
    const desc = document.getElementById('editTaskDesc')?.value;
    const deadline = document.getElementById('editTaskDeadline')?.value;
    const maxScore = document.getElementById('editTaskMaxScore')?.value;

    if (!title || !desc || !deadline || !maxScore) {
        showError('Barcha maydonlarni to\'ldiring');
        return;
    }

    TaskManager.updateTask(taskId, {
        title: title,
        description: desc,
        deadline: deadline,
        maxScore: parseInt(maxScore)
    });

    closeModal();
    showSuccess('Vazifa yangilandi');
    showMyTasks();
}

// ============================================
// 23. VAZIFANI O'CHIRISH
// ============================================
function deleteTask(taskId) {
    UI.confirm('Haqiqatan ham bu vazifani o\'chirmoqchimisiz?', () => {
        TaskManager.deleteTask(taskId);
        showSuccess('Vazifa o\'chirildi');
        showMyTasks();
    });
}

// ============================================
// 24. GURUH QO'SHISH
// ============================================
function showAddGroupForm() {
    showModal(`
        <h3 class="text-xl font-bold mb-4">➕ Yangi guruh qo'shish</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Guruh nomi</label>
                <input type="text" id="groupName" placeholder="Masalan: AT-101-20" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Fakultet</label>
                <input type="text" id="groupFaculty" placeholder="Fakultet nomi" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Kurs</label>
                <select id="groupCourse" class="w-full p-3 border rounded-xl">
                    <option value="1">1-kurs</option>
                    <option value="2">2-kurs</option>
                    <option value="3">3-kurs</option>
                    <option value="4">4-kurs</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Talabalar soni</label>
                <input type="number" id="groupStudents" value="0" class="w-full p-3 border rounded-xl">
            </div>
            <button onclick="addGroup()" class="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">
                Saqlash
            </button>
        </div>
    `);
}

function addGroup() {
    const user = Auth.getCurrentUser();
    const name = document.getElementById('groupName')?.value;
    const faculty = document.getElementById('groupFaculty')?.value;
    const course = document.getElementById('groupCourse')?.value;
    const students = document.getElementById('groupStudents')?.value;

    if (!name || !faculty || !course || !students) {
        showError('Barcha maydonlarni to\'ldiring');
        return;
    }

    GroupManager.addGroup({
        name: name,
        faculty: faculty,
        course: parseInt(course),
        students: parseInt(students),
        teacherId: user.id,
        year: new Date().getFullYear()
    });

    closeModal();
    showSuccess('Guruh muvaffaqiyatli qo\'shildi');
    showMyGroups();
}

// ============================================
// 25. GLOBAL OBYEKTLAR
// ============================================
window.showTeacherDashboard = showTeacherDashboard;
window.showMyGroups = showMyGroups;
window.showGroupStudents = showGroupStudents;
window.showStudentGrades = showStudentGrades;
window.showAddGradeForm = showAddGradeForm;
window.addGrade = addGrade;
window.editGrade = editGrade;
window.updateGrade = updateGrade;
window.deleteGrade = deleteGrade;
window.showGroupLessons = showGroupLessons;
window.showAddLessonForm = showAddLessonForm;
window.addLesson = addLesson;
window.editLesson = editLesson;
window.updateLesson = updateLesson;
window.deleteLesson = deleteLesson;
window.showLessonDetail = showLessonDetail;
window.showLessonAttendance = showLessonAttendance;
window.saveAttendance = saveAttendance;
window.showGroupAttendance = showGroupAttendance;
window.showGroupJournal = showGroupJournal;
window.showMySchedule = showMySchedule;
window.showMyTasks = showMyTasks;
window.showAddTaskForm = showAddTaskForm;
window.addTask = addTask;
window.showTaskDetail = showTaskDetail;
window.editTask = editTask;
window.updateTask = updateTask;
window.deleteTask = deleteTask;
window.showAddGroupForm = showAddGroupForm;
window.addGroup = addGroup;