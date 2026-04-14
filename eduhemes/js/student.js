/* ============================================
   EduHemis - Talaba paneli
   Barcha talaba funksiyalari shu yerda
   ============================================ */

// ============================================
// 1. TALABA DASHBOARD
// ============================================
function showStudentDashboard() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const teachers = DataBase.teachers;
    const studentTasks = TaskManager.getStudentTasks(user.id);
    const studentGrades = GradeManager.getStudentGrades(user.id);
    const studentAttendance = AttendanceManager.getStudentAttendance(user.id);
    const attendancePercentage = AttendanceManager.getAttendancePercentage(user.id);
    const averageGrade = GradeManager.getStudentAverage(user.id);
    
    // Muddati yaqin vazifalar
    const today = new Date().toISOString().split('T')[0];
    const nearDeadlineTasks = studentTasks.filter(t => 
        t.deadline >= today && 
        Utils.daysDiff(t.deadline) <= 3 &&
        t.status !== 'submitted'
    );
    
    // Muddati o'tgan vazifalar
    const overdueTasks = studentTasks.filter(t => 
        t.deadline < today && 
        t.status !== 'submitted'
    );
    
    let html = `
        <!-- Welcome Card -->
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[40px] p-8 text-white mb-6 animate-fadeIn">
            <div class="flex justify-between items-start">
                <div>
                    <span class="bg-white/20 px-4 py-1 rounded-full text-sm font-bold">TALABA</span>
                    <h2 class="text-3xl font-bold mt-4">Salom, ${user.name}!</h2>
                    <p class="text-blue-100 mt-2">Guruh: ${user.group || 'Aniqlanmagan'}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-blue-100"><i class="far fa-calendar mr-1"></i> ${Utils.formatDate(new Date())}</p>
                    <p class="text-sm text-blue-100"><i class="far fa-clock mr-1"></i> ${Utils.formatTime(new Date())}</p>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div onclick="showMySubjects()" class="bg-white p-6 rounded-2xl shadow-sm card-hover animate-fadeIn" style="animation-delay: 0.1s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">Fanlar</p>
                        <h3 class="text-2xl font-bold mt-1">${DataBase.subjects.length}</h3>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                        <i class="fas fa-book-open"></i>
                    </div>
                </div>
                <div class="mt-4 text-sm text-gray-500">
                    <i class="fas fa-arrow-up text-green-500 mr-1"></i> 5 ta faol fan
                </div>
            </div>

            <div onclick="showMyTasks()" class="bg-white p-6 rounded-2xl shadow-sm card-hover animate-fadeIn" style="animation-delay: 0.2s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">Vazifalar</p>
                        <h3 class="text-2xl font-bold mt-1">${studentTasks.length}</h3>
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

            <div onclick="showMyGrades()" class="bg-white p-6 rounded-2xl shadow-sm card-hover animate-fadeIn" style="animation-delay: 0.3s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">O'rtacha baho</p>
                        <h3 class="text-2xl font-bold mt-1">${averageGrade}</h3>
                    </div>
                    <div class="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center text-xl">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <div class="mt-4 text-sm text-gray-500">
                    <i class="fas fa-chart-line mr-1"></i> ${studentGrades.length} ta baho
                </div>
            </div>

            <div onclick="showMyAttendance()" class="bg-white p-6 rounded-2xl shadow-sm card-hover animate-fadeIn" style="animation-delay: 0.4s">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-gray-500 text-sm">Davomat</p>
                        <h3 class="text-2xl font-bold mt-1">${attendancePercentage}%</h3>
                    </div>
                    <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="mt-4 text-sm text-gray-500">
                    <i class="fas fa-calendar mr-1"></i> ${studentAttendance.length} ta dars
                </div>
            </div>
        </div>

        <!-- Near Deadline Tasks Alert -->
        ${nearDeadlineTasks.length > 0 ? `
            <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-2xl mb-6 animate-slideIn">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-orange-500 text-xl"></i>
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

        <!-- Overdue Tasks Alert -->
        ${overdueTasks.length > 0 ? `
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-2xl mb-6 animate-slideIn">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <i class="fas fa-times-circle text-red-500 text-xl"></i>
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
    `;

    // Today's Lessons
    html += `
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-calendar-day text-blue-600"></i> Bugungi darslar
        </h3>
    `;

    const todayLessons = DataBase.lessons.filter(l => 
        l.date === new Date().toISOString().split('T')[0] &&
        l.groupId === DataBase.groups.find(g => g.name === user.group)?.id
    );

    if (todayLessons.length > 0) {
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">`;
        todayLessons.forEach(lesson => {
            const teacher = DataManager.findById('teachers', lesson.teacherId);
            const subject = DataManager.findById('subjects', lesson.subjectId);
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm card-hover border-l-4 border-blue-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold text-lg">${subject?.name || 'Fan'}</h4>
                            <p class="text-sm text-gray-600 mt-1">${lesson.topic}</p>
                        </div>
                        <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">${lesson.time}</span>
                    </div>
                    <div class="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span><i class="fas fa-user mr-1"></i> ${teacher?.name || 'O\'qituvchi'}</span>
                        <span><i class="fas fa-map-marker-alt mr-1"></i> ${lesson.room}-xona</span>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += `
            <div class="bg-white p-8 rounded-2xl text-center text-gray-500 mb-6">
                <i class="fas fa-calendar-day text-4xl text-gray-300 mb-3"></i>
                <p>Bugun darslar yo'q</p>
            </div>
        `;
    }

    // My Teachers
    html += `
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-chalkboard-teacher text-purple-600"></i> Mening o'qituvchilarim
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    `;

    teachers.forEach(teacher => {
        html += `
            <div onclick="showTeacherInfo(${teacher.id})" class="bg-white p-4 rounded-2xl shadow-sm card-hover">
                <div class="flex items-center gap-3">
                    <img src="${teacher.avatar}" class="w-12 h-12 rounded-full">
                    <div>
                        <h4 class="font-bold">${teacher.name}</h4>
                        <p class="text-sm text-gray-500">${teacher.subject || 'Fan'}</p>
                        <p class="text-xs text-gray-400 mt-1"><i class="fas fa-envelope mr-1"></i> ${teacher.email}</p>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;

    // Quick Actions
    html += `
        <h3 class="text-xl font-bold mb-4">⚡ Tezkor amallar</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onclick="showMySchedule()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-calendar-alt text-2xl text-blue-600 mb-2"></i>
                <p class="font-bold text-sm">Dars jadvali</p>
            </button>
            <button onclick="showMyMaterials()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-folder-open text-2xl text-green-600 mb-2"></i>
                <p class="font-bold text-sm">Materiallar</p>
            </button>
            <button onclick="showMyMessages()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-envelope text-2xl text-purple-600 mb-2"></i>
                <p class="font-bold text-sm">Xabarlar</p>
            </button>
            <button onclick="showMyProfile()" class="bg-white p-4 rounded-2xl shadow-sm card-hover text-center">
                <i class="fas fa-user text-2xl text-orange-600 mb-2"></i>
                <p class="font-bold text-sm">Profil</p>
            </button>
        </div>
    `;

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 2. MENING FANLARIM
// ============================================
function showMySubjects() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const group = DataBase.groups.find(g => g.name === user.group);
    const subjects = DataBase.subjects.filter(s => 
        DataBase.lessons.some(l => l.groupId === group?.id && l.subjectId === s.id)
    );

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showStudentDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📚 Mening fanlarim</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    `;

    subjects.forEach(subject => {
        const teacher = DataManager.findById('teachers', subject.teacherId);
        const lessons = DataBase.lessons.filter(l => l.subjectId === subject.id);
        const grades = DataBase.grades.filter(g => g.subjectId === subject.id && g.studentId === user.id);
        const average = grades.length ? (grades.reduce((acc, g) => acc + g.grade, 0) / grades.length).toFixed(1) : '-';

        html += `
            <div class="bg-white p-6 rounded-2xl shadow-sm card-hover">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
                        <i class="fas fa-${subject.icon || 'book'}"></i>
                    </div>
                    <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">${subject.credits} kredit</span>
                </div>
                <h3 class="font-bold text-xl">${subject.name}</h3>
                <p class="text-sm text-gray-500">${subject.code}</p>
                <div class="mt-4 space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">O'qituvchi:</span>
                        <span class="font-medium">${teacher?.name || '-'}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Darslar:</span>
                        <span class="font-medium">${lessons.length} ta</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">O'rtacha baho:</span>
                        <span class="font-bold text-lg ${average >= 4.5 ? 'text-green-600' : average >= 3.5 ? 'text-yellow-600' : 'text-red-600'}">${average}</span>
                    </div>
                </div>
                <div class="flex gap-2 mt-4">
                    <button onclick="showSubjectDetail(${subject.id})" class="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm hover:bg-blue-100">
                        <i class="fas fa-info-circle mr-1"></i> Ma'lumot
                    </button>
                    <button onclick="showSubjectGrades(${subject.id})" class="flex-1 py-2 bg-green-50 text-green-600 rounded-xl text-sm hover:bg-green-100">
                        <i class="fas fa-star mr-1"></i> Baholar
                    </button>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    showModal(html);
}

// ============================================
// 3. FAN MA'LUMOTLARI
// ============================================
function showSubjectDetail(subjectId) {
    const subject = DataManager.findById('subjects', subjectId);
    if (!subject) return;

    const teacher = DataManager.findById('teachers', subject.teacherId);
    const lessons = DataBase.lessons.filter(l => l.subjectId === subjectId);
    const materials = DataBase.materials.filter(m => m.subjectId === subjectId);

    let html = `
        <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                <i class="fas fa-${subject.icon || 'book'}"></i>
            </div>
            <h3 class="text-2xl font-bold">${subject.name}</h3>
            <p class="text-gray-500">${subject.code}</p>
            
            <div class="text-left space-y-3 border-t pt-4 mt-4">
                <p><i class="fas fa-chalkboard-teacher w-6 text-gray-400"></i> <strong>O'qituvchi:</strong> ${teacher?.name || '-'}</p>
                <p><i class="fas fa-graduation-cap w-6 text-gray-400"></i> <strong>Kreditlar:</strong> ${subject.credits}</p>
                <p><i class="fas fa-clock w-6 text-gray-400"></i> <strong>Soatlar:</strong> ${subject.hours}</p>
                <p><i class="fas fa-calendar w-6 text-gray-400"></i> <strong>Semestr:</strong> ${subject.semester}</p>
                <p><i class="fas fa-book-open w-6 text-gray-400"></i> <strong>Darslar:</strong> ${lessons.length} ta</p>
                <p><i class="fas fa-folder-open w-6 text-gray-400"></i> <strong>Materiallar:</strong> ${materials.length} ta</p>
            </div>

            ${lessons.length > 0 ? `
                <h4 class="font-bold text-left mt-4 mb-2">Dars rejasi:</h4>
                <div class="space-y-2 max-h-60 overflow-y-auto">
                    ${lessons.map(l => `
                        <div class="bg-gray-50 p-3 rounded-xl text-left">
                            <p class="font-medium">${l.topic}</p>
                            <p class="text-xs text-gray-500">${l.date} • ${l.time} • ${l.room}-xona</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;

    showModal(html, subject.name);
}

// ============================================
// 4. FAN BAHOLARI
// ============================================
function showSubjectGrades(subjectId) {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const subject = DataManager.findById('subjects', subjectId);
    const grades = DataBase.grades.filter(g => 
        g.subjectId === subjectId && g.studentId === user.id
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    let html = `
        <h3 class="text-xl font-bold mb-4">📊 ${subject.name} fanidan baholar</h3>
    `;

    if (grades.length > 0) {
        html += `
            <div class="space-y-3">
                ${grades.map(g => `
                    <div class="bg-white border rounded-xl p-3 flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-500">${Utils.formatDate(g.date)}</p>
                            <p class="text-sm">${g.type === 'exam' ? 'Imtihon' : 'Joriy'}</p>
                        </div>
                        <span class="text-2xl font-bold ${g.grade >= 4.5 ? 'text-green-600' : g.grade >= 3.5 ? 'text-yellow-600' : 'text-red-600'}">${g.grade}</span>
                    </div>
                `).join('')}
            </div>
            <div class="mt-4 p-4 bg-blue-50 rounded-xl">
                <div class="flex justify-between items-center">
                    <span class="font-bold">O'rtacha baho:</span>
                    <span class="text-2xl font-bold text-blue-600">${GradeManager.getStudentAverage(user.id)}</span>
                </div>
            </div>
        `;
    } else {
        html += `<p class="text-center py-8 text-gray-500">Hozircha baholar mavjud emas</p>`;
    }

    showModal(html);
}

// ============================================
// 5. MENING VAZIFALARIM
// ============================================
function showMyTasks() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const tasks = TaskManager.getStudentTasks(user.id);
    const today = new Date().toISOString().split('T')[0];

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showStudentDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📋 Mening vazifalarim</h1>
        </div>
    `;

    if (tasks.length > 0) {
        // Muddati o'tganlar
        const overdueTasks = tasks.filter(t => t.deadline < today && t.status !== 'submitted');
        if (overdueTasks.length > 0) {
            html += `
                <h3 class="font-bold text-lg mb-3 text-red-600">🔴 Muddati o'tgan (${overdueTasks.length})</h3>
                ${overdueTasks.map(t => createTaskCard(t)).join('')}
            `;
        }

        // Muddati yaqinlar (3 kun)
        const nearTasks = tasks.filter(t => 
            t.deadline >= today && 
            Utils.daysDiff(t.deadline) <= 3 && 
            t.status !== 'submitted'
        );
        if (nearTasks.length > 0) {
            html += `
                <h3 class="font-bold text-lg mb-3 text-orange-600">🟡 Muddati yaqin (${nearTasks.length})</h3>
                ${nearTasks.map(t => createTaskCard(t)).join('')}
            `;
        }

        // Boshqa vazifalar
        const otherTasks = tasks.filter(t => 
            t.deadline >= today && 
            Utils.daysDiff(t.deadline) > 3 && 
            t.status !== 'submitted'
        );
        if (otherTasks.length > 0) {
            html += `
                <h3 class="font-bold text-lg mb-3 text-green-600">🟢 Faol vazifalar (${otherTasks.length})</h3>
                ${otherTasks.map(t => createTaskCard(t)).join('')}
            `;
        }

        // Bajarilgan vazifalar
        const completedTasks = tasks.filter(t => t.status === 'submitted');
        if (completedTasks.length > 0) {
            html += `
                <h3 class="font-bold text-lg mb-3 text-blue-600">✅ Bajarilgan (${completedTasks.length})</h3>
                ${completedTasks.map(t => createTaskCard(t, true)).join('')}
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

// Vazifa kartasi yaratish
function createTaskCard(task, completed = false) {
    const subject = DataManager.findById('subjects', task.subjectId);
    const daysLeft = Utils.daysDiff(task.deadline);
    
    let statusClass = '';
    let statusText = '';
    
    if (completed) {
        statusClass = 'border-green-500 bg-green-50';
        statusText = 'Bajarilgan';
    } else if (daysLeft < 0) {
        statusClass = 'border-red-500 bg-red-50';
        statusText = `${Math.abs(daysLeft)} kun kechikkan`;
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
                    <p class="text-sm text-gray-600">${subject?.name || 'Fan'} • ${task.description.substring(0, 50)}...</p>
                </div>
                <span class="text-xs font-bold px-2 py-1 rounded-full ${daysLeft < 0 ? 'bg-red-100 text-red-600' : daysLeft <= 3 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}">
                    ${statusText}
                </span>
            </div>
            <div class="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span><i class="far fa-calendar mr-1"></i> Muddat: ${task.deadline}</span>
                ${task.score ? `<span><i class="fas fa-star mr-1 text-yellow-500"></i> Baho: ${task.score}/${task.maxScore}</span>` : ''}
            </div>
        </div>
    `;
}

// ============================================
// 6. VAZIFA TAFSILOTLARI
// ============================================
function showTaskDetail(taskId) {
    const user = Auth.getCurrentUser();
    const task = DataManager.findById('tasks', taskId);
    if (!task) return;

    const subject = DataManager.findById('subjects', task.subjectId);
    const teacher = DataManager.findById('teachers', task.teacherId);
    const studentTask = task.students.find(s => s.studentId === user.id);

    const daysLeft = Utils.daysDiff(task.deadline);
    let statusClass = '';
    let statusText = '';

    if (studentTask?.status === 'submitted') {
        statusClass = 'text-green-600';
        statusText = '✅ Bajarilgan';
    } else if (daysLeft < 0) {
        statusClass = 'text-red-600';
        statusText = '❌ Muddati o\'tgan';
    } else {
        statusClass = 'text-orange-600';
        statusText = `⏳ ${daysLeft} kun qoldi`;
    }

    let html = `
        <h3 class="text-xl font-bold mb-2">${task.title}</h3>
        <p class="text-gray-500 mb-4">${subject?.name} • ${teacher?.name}</p>
        
        <div class="bg-gray-50 p-4 rounded-xl mb-4">
            <p class="text-sm">${task.description}</p>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="bg-blue-50 p-3 rounded-xl text-center">
                <p class="text-xs text-gray-500">Muddat</p>
                <p class="font-bold">${task.deadline}</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-xl text-center">
                <p class="text-xs text-gray-500">Maksimal ball</p>
                <p class="font-bold">${task.maxScore}</p>
            </div>
        </div>

        <div class="mb-4 p-4 rounded-xl ${studentTask?.status === 'submitted' ? 'bg-green-50' : daysLeft < 0 ? 'bg-red-50' : 'bg-orange-50'}">
            <p class="font-medium ${statusClass}">${statusText}</p>
            ${studentTask?.submittedAt ? `<p class="text-xs text-gray-500 mt-1">Topshirilgan: ${Utils.formatDateTime(studentTask.submittedAt)}</p>` : ''}
            ${studentTask?.score ? `<p class="text-sm mt-2"><strong>Baho:</strong> ${studentTask.score}/${task.maxScore}</p>` : ''}
            ${studentTask?.feedback ? `<p class="text-sm mt-2"><strong>Izoh:</strong> ${studentTask.feedback}</p>` : ''}
        </div>

        ${studentTask?.status !== 'submitted' ? `
            <div class="flex gap-2">
                <button onclick="submitTask(${task.id})" class="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700">
                    <i class="fas fa-upload mr-2"></i> Topshirish
                </button>
                <button onclick="closeModal()" class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300">
                    Yopish
                </button>
            </div>
        ` : `
            <button onclick="closeModal()" class="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300">
                Yopish
            </button>
        `}
    `;

    showModal(html);
}

// ============================================
// 7. VAZIFA TOPSHIRISH
// ============================================
function submitTask(taskId) {
    showModal(`
        <h3 class="text-xl font-bold mb-4">📤 Vazifa topshirish</h3>
        
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Izoh (ixtiyoriy)</label>
                <textarea id="taskNotes" rows="3" class="w-full p-3 border rounded-xl" placeholder="Vazifa haqida qisqacha izoh..."></textarea>
            </div>
            
            <div>
                <label class="block text-sm font-medium mb-2">Fayl yuklash</label>
                <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                    <p class="text-sm text-gray-500">Faylni tanlang yoki sudrab keltiring</p>
                    <input type="file" id="taskFile" class="hidden">
                    <button onclick="document.getElementById('taskFile').click()" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm">
                        Fayl tanlash
                    </button>
                </div>
            </div>
            
            <button onclick="confirmSubmit(${taskId})" class="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">
                <i class="fas fa-check mr-2"></i> Topshirish
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300">
                Bekor qilish
            </button>
        </div>
    `);
}

function confirmSubmit(taskId) {
    const user = Auth.getCurrentUser();
    const notes = document.getElementById('taskNotes')?.value;
    
    TaskManager.submitTask(taskId, user.id, { notes });
    
    closeModal();
    showSuccess('Vazifa muvaffaqiyatli topshirildi!');
    showMyTasks();
}

// ============================================
// 8. MENING BAHOLARIM
// ============================================
function showMyGrades() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const grades = GradeManager.getStudentGrades(user.id);
    const average = GradeManager.getStudentAverage(user.id);

    // Fanlar bo'yicha guruhlash
    const subjects = {};
    grades.forEach(grade => {
        if (!subjects[grade.subjectId]) {
            subjects[grade.subjectId] = {
                grades: [],
                subject: DataManager.findById('subjects', grade.subjectId)
            };
        }
        subjects[grade.subjectId].grades.push(grade);
    });

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showStudentDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📊 Mening baholarim</h1>
        </div>
    `;

    if (grades.length > 0) {
        // O'rtacha baho
        html += `
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white mb-6">
                <p class="text-sm opacity-90">O'rtacha baho</p>
                <p class="text-4xl font-bold mt-2">${average}</p>
                <p class="text-sm mt-2">Jami ${grades.length} ta baho</p>
            </div>
        `;

        // Fanlar bo'yicha
        Object.values(subjects).forEach(item => {
            const subjectGrades = item.grades;
            const subjectAverage = (subjectGrades.reduce((acc, g) => acc + g.grade, 0) / subjectGrades.length).toFixed(1);
            
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm mb-4">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="font-bold">${item.subject?.name || 'Fan'}</h3>
                        <span class="text-lg font-bold ${subjectAverage >= 4.5 ? 'text-green-600' : subjectAverage >= 3.5 ? 'text-yellow-600' : 'text-red-600'}">${subjectAverage}</span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ${subjectGrades.map(g => `
                            <div class="w-10 h-10 ${g.grade >= 4.5 ? 'bg-green-100 text-green-600' : g.grade >= 3.5 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'} rounded-xl flex items-center justify-center font-bold">
                                ${g.grade}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-star text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Hozircha baholar yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 9. MENING DARS JADVALIM
// ============================================
function showMySchedule() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const group = DataBase.groups.find(g => g.name === user.group);
    const lessons = DataBase.lessons.filter(l => l.groupId === group?.id)
        .sort((a, b) => a.date.localeCompare(b.date));

    const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1; // 0 - Yakshanba

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showStudentDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📅 Dars jadvali</h1>
        </div>

        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="p-4 text-left">Kun</th>
                        <th class="p-4 text-left">Vaqt</th>
                        <th class="p-4 text-left">Fan</th>
                        <th class="p-4 text-left">Mavzu</th>
                        <th class="p-4 text-left">O'qituvchi</th>
                        <th class="p-4 text-left">Xona</th>
                    </tr>
                </thead>
                <tbody>
    `;

    days.forEach((day, index) => {
        const dayLessons = lessons.filter(l => {
            const date = new Date(l.date);
            return date.getDay() === index + 1;
        });

        if (dayLessons.length > 0) {
            dayLessons.forEach((lesson, i) => {
                const teacher = DataManager.findById('teachers', lesson.teacherId);
                const subject = DataManager.findById('subjects', lesson.subjectId);
                const isToday = index === todayIndex;

                html += `
                    <tr class="border-t hover:bg-gray-50 ${isToday ? 'bg-blue-50' : ''}">
                        ${i === 0 ? `<td class="p-4 font-medium" rowspan="${dayLessons.length}">${day}</td>` : ''}
                        <td class="p-4">${lesson.time}</td>
                        <td class="p-4 font-medium">${subject?.name || '-'}</td>
                        <td class="p-4">${lesson.topic}</td>
                        <td class="p-4">${teacher?.name || '-'}</td>
                        <td class="p-4">${lesson.room}-xona</td>
                    </tr>
                `;
            });
        } else {
            html += `
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-4 font-medium">${day}</td>
                    <td colspan="5" class="p-4 text-gray-400 text-center">Darslar yo'q</td>
                </tr>
            `;
        }
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 10. MENING DAVOMATIM
// ============================================
function showMyAttendance() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const attendance = AttendanceManager.getStudentAttendance(user.id);
    const stats = AttendanceManager.getAttendancePercentage(user.id);

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showStudentDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📊 Mening davomatim</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm text-center">
                <p class="text-3xl font-bold text-blue-600">${stats || 0}%</p>
                <p class="text-sm text-gray-500 mt-1">Umumiy davomat</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm text-center">
                <p class="text-3xl font-bold text-green-600">${attendance.filter(a => a.status === 'present').length}</p>
                <p class="text-sm text-gray-500 mt-1">Keldi</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm text-center">
                <p class="text-3xl font-bold text-yellow-600">${attendance.filter(a => a.status === 'late').length}</p>
                <p class="text-sm text-gray-500 mt-1">Kechikdi</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm text-center">
                <p class="text-3xl font-bold text-red-600">${attendance.filter(a => a.status === 'absent').length}</p>
                <p class="text-sm text-gray-500 mt-1">Kelmadi</p>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="p-4 text-left">Sana</th>
                        <th class="p-4 text-left">Fan</th>
                        <th class="p-4 text-left">Dars</th>
                        <th class="p-4 text-left">Holat</th>
                    </tr>
                </thead>
                <tbody>
    `;

    if (attendance.length > 0) {
        attendance.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(a => {
            const lesson = DataManager.findById('lessons', a.lessonId);
            const subject = lesson ? DataManager.findById('subjects', lesson.subjectId) : null;
            
            let statusColor = '';
            let statusText = '';
            
            switch(a.status) {
                case 'present':
                    statusColor = 'text-green-600 bg-green-100';
                    statusText = 'Keldi';
                    break;
                case 'late':
                    statusColor = 'text-yellow-600 bg-yellow-100';
                    statusText = 'Kechikdi';
                    break;
                case 'absent':
                    statusColor = 'text-red-600 bg-red-100';
                    statusText = 'Kelmadi';
                    break;
            }

            html += `
                <tr class="border-t hover:bg-gray-50">
                    <td class="p-4">${a.date}</td>
                    <td class="p-4 font-medium">${subject?.name || '-'}</td>
                    <td class="p-4">${lesson?.topic || '-'}</td>
                    <td class="p-4"><span class="px-3 py-1 rounded-full text-xs font-bold ${statusColor}">${statusText}</span></td>
                </tr>
            `;
        });
    } else {
        html += `
            <tr>
                <td colspan="4" class="p-8 text-center text-gray-500">
                    <i class="fas fa-calendar-check text-4xl text-gray-300 mb-2"></i>
                    <p>Davomat ma'lumotlari yo'q</p>
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
// 11. O'QITUVCHI MA'LUMOTI
// ============================================
function showTeacherInfo(teacherId) {
    const teacher = DataManager.findById('teachers', teacherId);
    if (!teacher) return;

    const subjects = DataBase.subjects.filter(s => s.teacherId === teacherId);
    const lessons = DataBase.lessons.filter(l => l.teacherId === teacherId);

    showModal(`
        <div class="text-center">
            <img src="${teacher.avatar}" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100">
            <h3 class="text-2xl font-bold">${teacher.name}</h3>
            <p class="text-gray-500">${teacher.subject || 'Fan'}</p>
            
            <div class="text-left space-y-3 border-t pt-4 mt-4">
                <p><i class="fas fa-graduation-cap w-6 text-gray-400"></i> <strong>Ilmiy daraja:</strong> ${teacher.degree || '-'}</p>
                <p><i class="fas fa-briefcase w-6 text-gray-400"></i> <strong>Tajriba:</strong> ${teacher.experience || 0} yil</p>
                <p><i class="fas fa-door-open w-6 text-gray-400"></i> <strong>Xona:</strong> ${teacher.room || '-'}</p>
                <p><i class="fas fa-envelope w-6 text-gray-400"></i> <strong>Email:</strong> ${teacher.email}</p>
                <p><i class="fas fa-phone w-6 text-gray-400"></i> <strong>Telefon:</strong> ${teacher.phone || '-'}</p>
                <p><i class="fas fa-book-open w-6 text-gray-400"></i> <strong>Fanlar:</strong> ${subjects.length} ta</p>
                <p><i class="fas fa-calendar w-6 text-gray-400"></i> <strong>Darslar:</strong> ${lessons.length} ta</p>
            </div>

            <div class="flex gap-2 mt-6">
                <button onclick="sendMessageToTeacher(${teacher.id})" class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                    <i class="fab fa-telegram mr-2"></i> Xabar yozish
                </button>
                <button onclick="closeModal()" class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300">
                    Yopish
                </button>
            </div>
        </div>
    `);
}

// ============================================
// 12. XABAR YOZISH
// ============================================
function sendMessageToTeacher(teacherId) {
    const teacher = DataManager.findById('teachers', teacherId);
    
    showModal(`
        <h3 class="text-xl font-bold mb-4">✉️ Xabar yozish</h3>
        <p class="text-sm text-gray-500 mb-4">Qabul qiluvchi: ${teacher?.name}</p>
        
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Mavzu</label>
                <input type="text" id="messageSubject" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Xabar</label>
                <textarea id="messageContent" rows="5" class="w-full p-3 border rounded-xl"></textarea>
            </div>
            
            <button onclick="sendMessage(${teacherId})" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                <i class="fas fa-paper-plane mr-2"></i> Yuborish
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300">
                Bekor qilish
            </button>
        </div>
    `);
}

function sendMessage(teacherId) {
    const user = Auth.getCurrentUser();
    const subject = document.getElementById('messageSubject')?.value;
    const content = document.getElementById('messageContent')?.value;

    if (!subject || !content) {
        showError('Mavzu va xabarni kiriting');
        return;
    }

    MessageManager.sendMessage({
        fromId: user.id,
        toId: teacherId,
        subject: subject,
        content: content
    });

    closeModal();
    showSuccess('Xabar yuborildi!');
}

// ============================================
// 13. MENING XABARLARIM
// ============================================
function showMyMessages() {
    const user = Auth.getCurrentUser();
    const messages = MessageManager.getUserMessages(user.id);
    const unread = MessageManager.getUnreadMessages(user.id);

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showStudentDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">💬 Xabarlar</h1>
            ${unread.length > 0 ? `<span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm">${unread.length} ta yangi</span>` : ''}
        </div>
    `;

    if (messages.length > 0) {
        messages.forEach(msg => {
            const sender = msg.fromId === user.id ? 'Men' : DataManager.findById('teachers', msg.fromId)?.name || DataManager.findById('students', msg.fromId)?.name || 'Foydalanuvchi';
            const isUnread = !msg.read && msg.toId === user.id;

            html += `
                <div onclick="showMessageDetail(${msg.id})" class="bg-white p-4 rounded-2xl shadow-sm card-hover mb-3 ${isUnread ? 'border-l-4 border-blue-500' : ''}">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold">${sender} ${isUnread ? '•' : ''}</p>
                            <p class="text-sm font-medium">${msg.subject}</p>
                            <p class="text-xs text-gray-500 mt-1">${Utils.formatDateTime(msg.date)}</p>
                        </div>
                        ${isUnread ? '<span class="w-3 h-3 bg-blue-500 rounded-full"></span>' : ''}
                    </div>
                    <p class="text-sm text-gray-600 mt-2">${msg.content.substring(0, 100)}...</p>
                </div>
            `;
        });
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-envelope text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Xabarlar yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 14. XABAR TAFSILOTLARI
// ============================================
function showMessageDetail(messageId) {
    const user = Auth.getCurrentUser();
    const message = DataManager.findById('messages', messageId);
    if (!message) return;

    // O'qilgan deb belgilash
    if (message.toId === user.id && !message.read) {
        MessageManager.markAsRead(messageId);
    }

    const sender = message.fromId === user.id ? 'Men' : DataManager.findById('teachers', message.fromId)?.name || DataManager.findById('students', message.fromId)?.name || 'Foydalanuvchi';

    showModal(`
        <h3 class="text-xl font-bold mb-2">${message.subject}</h3>
        <p class="text-sm text-gray-500 mb-4">Kimdan: ${sender} • ${Utils.formatDateTime(message.date)}</p>
        
        <div class="bg-gray-50 p-4 rounded-xl mb-4">
            <p class="whitespace-pre-line">${message.content}</p>
        </div>

        ${message.fromId !== user.id ? `
            <button onclick="replyToMessage(${message.fromId}, '${message.subject}')" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                <i class="fas fa-reply mr-2"></i> Javob yozish
            </button>
        ` : ''}
        <button onclick="closeModal()" class="w-full mt-2 bg-gray-200 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-300">
            Yopish
        </button>
    `);
}

function replyToMessage(userId, subject) {
    closeModal();
    sendMessageToTeacher(userId);
    setTimeout(() => {
        document.getElementById('messageSubject').value = `Re: ${subject}`;
    }, 100);
}

// ============================================
// 15. MENING MATERIALLARIM
// ============================================
function showMyMaterials() {
    const user = Auth.getCurrentUser();
    const group = DataBase.groups.find(g => g.name === user.group);
    const lessons = DataBase.lessons.filter(l => l.groupId === group?.id);
    const subjectIds = [...new Set(lessons.map(l => l.subjectId))];
    
    const materials = DataBase.materials.filter(m => 
        subjectIds.includes(m.subjectId)
    );

    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="showStudentDashboard()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">📁 O'quv materiallari</h1>
        </div>
    `;

    if (materials.length > 0) {
        // Fanlar bo'yicha guruhlash
        const bySubject = {};
        materials.forEach(m => {
            if (!bySubject[m.subjectId]) {
                bySubject[m.subjectId] = {
                    subject: DataManager.findById('subjects', m.subjectId),
                    materials: []
                };
            }
            bySubject[m.subjectId].materials.push(m);
        });

        Object.values(bySubject).forEach(item => {
            html += `
                <h3 class="font-bold text-lg mb-3">${item.subject?.name || 'Fan'}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    ${item.materials.map(m => `
                        <div class="bg-white p-4 rounded-2xl shadow-sm card-hover">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-file-${m.type}"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-bold">${m.title}</h4>
                                    <p class="text-xs text-gray-500">${m.size} • ${m.date}</p>
                                </div>
                                <a href="${m.url}" class="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-200">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        });
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-folder-open text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Materiallar yo'q</p>
            </div>
        `;
    }

    document.getElementById('content').innerHTML = html;
}

// ============================================
// 16. GLOBAL OBYEKTLAR
// ============================================
window.showStudentDashboard = showStudentDashboard;
window.showMySubjects = showMySubjects;
window.showSubjectDetail = showSubjectDetail;
window.showSubjectGrades = showSubjectGrades;
window.showMyTasks = showMyTasks;
window.showTaskDetail = showTaskDetail;
window.submitTask = submitTask;
window.confirmSubmit = confirmSubmit;
window.showMyGrades = showMyGrades;
window.showMySchedule = showMySchedule;
window.showMyAttendance = showMyAttendance;
window.showTeacherInfo = showTeacherInfo;
window.sendMessageToTeacher = sendMessageToTeacher;
window.sendMessage = sendMessage;
window.showMyMessages = showMyMessages;
window.showMessageDetail = showMessageDetail;
window.replyToMessage = replyToMessage;
window.showMyMaterials = showMyMaterials;