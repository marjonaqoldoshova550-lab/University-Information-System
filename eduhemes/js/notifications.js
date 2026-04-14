/* ============================================
   EduHemis - Bildirishnomalar tizimi
   Barcha notification va eslatma funksiyalari
   ============================================ */

// ============================================
// 1. NOTIFICATION MANAGER
// ============================================
const NotificationManager = {
    // Bildirishnomalar
    notifications: [],
    
    // Interval ID
    checkInterval: null,
    
    // Qo'ng'iroq tovushi
    soundEnabled: true,
    
    // ----------------------
    // 1.1. Bildirishnoma yaratish
    // ----------------------
    create(data) {
        const notification = {
            id: Utils.randomId(),
            userId: data.userId,
            type: data.type || 'info',
            title: data.title,
            message: data.message,
            link: data.link || null,
            icon: data.icon || this.getIconByType(data.type),
            color: this.getColorByType(data.type),
            read: false,
            createdAt: new Date().toISOString(),
            expiresAt: data.expiresAt || null,
            action: data.action || null,
            priority: data.priority || 'normal' // high, normal, low
        };
        
        this.notifications.push(notification);
        this.save();
        
        // Yangi bildirishnoma kelganda
        this.onNewNotification(notification);
        
        // Qo'ng'iroq
        if (this.soundEnabled) {
            this.playSound();
        }
        
        return notification;
    },
    
    // ----------------------
    // 1.2. Bildirishnoma olish
    // ----------------------
    getUserNotifications(userId, limit = 50) {
        return this.notifications
            .filter(n => n.userId === userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    },
    
    // ----------------------
    // 1.3. O'qilmagan bildirishnomalar
    // ----------------------
    getUnreadNotifications(userId) {
        return this.notifications.filter(n => n.userId === userId && !n.read);
    },
    
    // ----------------------
    // 1.4. O'qilmaganlar soni
    // ----------------------
    getUnreadCount(userId) {
        return this.notifications.filter(n => n.userId === userId && !n.read).length;
    },
    
    // ----------------------
    // 1.5. Bildirishnomani o'qilgan deb belgilash
    // ----------------------
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.save();
            return true;
        }
        return false;
    },
    
    // ----------------------
    // 1.6. Barchasini o'qilgan deb belgilash
    // ----------------------
    markAllAsRead(userId) {
        this.notifications.forEach(n => {
            if (n.userId === userId) {
                n.read = true;
            }
        });
        this.save();
    },
    
    // ----------------------
    // 1.7. Bildirishnomani o'chirish
    // ----------------------
    delete(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.save();
    },
    
    // ----------------------
    // 1.8. Barchasini o'chirish
    // ----------------------
    deleteAll(userId) {
        this.notifications = this.notifications.filter(n => n.userId !== userId);
        this.save();
    },
    
    // ----------------------
    // 1.9. Eski bildirishnomalarni tozalash
    // ----------------------
    cleanOld(days = 30) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        
        this.notifications = this.notifications.filter(n => 
            new Date(n.createdAt) > cutoff
        );
        this.save();
    },
    
    // ----------------------
    // 1.10. Saqlash
    // ----------------------
    save() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    },
    
    // ----------------------
    // 1.11. Yuklash
    // ----------------------
    load() {
        const saved = localStorage.getItem('notifications');
        if (saved) {
            this.notifications = JSON.parse(saved);
        }
    },
    
    // ----------------------
    // 1.12. Yangi bildirishnoma hodisasi
    // ----------------------
    onNewNotification(notification) {
        // Event chiqarish
        Events.emit('notification:new', notification);
        
        // UI ni yangilash
        this.updateNotificationBadge(notification.userId);
        
        // Toast ko'rsatish
        if (notification.priority === 'high') {
            UI.toast.show(notification.message, notification.type, 5000);
        }
    },
    
    // ----------------------
    // 1.13. Badge ni yangilash
    // ----------------------
    updateNotificationBadge(userId) {
        const count = this.getUnreadCount(userId);
        const badge = document.getElementById('notificationCount');
        
        if (badge) {
            if (count > 0) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    },
    
    // ----------------------
    // 1.14. Ikonka olish
    // ----------------------
    getIconByType(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle',
            'task': 'fa-tasks',
            'grade': 'fa-star',
            'message': 'fa-envelope',
            'lesson': 'fa-calendar-alt',
            'attendance': 'fa-check-circle',
            'deadline': 'fa-clock',
            'system': 'fa-cog'
        };
        return icons[type] || 'fa-bell';
    },
    
    // ----------------------
    // 1.15. Rang olish
    // ----------------------
    getColorByType(type) {
        const colors = {
            'success': 'green',
            'error': 'red',
            'warning': 'orange',
            'info': 'blue',
            'task': 'purple',
            'grade': 'yellow',
            'message': 'indigo',
            'lesson': 'cyan',
            'attendance': 'teal',
            'deadline': 'pink',
            'system': 'gray'
        };
        return colors[type] || 'blue';
    },
    
    // ----------------------
    // 1.16. Tovush
    // ----------------------
    playSound() {
        if (!this.soundEnabled) return;
        
        // Audio obyekt yaratish
        const audio = new Audio();
        audio.src = 'data:audio/wav;base64,UklGRlwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVAAAAA8 /////////////////////////////////////////////////////////////////////////////////////8='; // Qisqa "ding" tovushi
        audio.volume = 0.5;
        audio.play().catch(() => {});
    },
    
    // ----------------------
    // 1.17. Tovushni yoqish/o'chirish
    // ----------------------
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('notificationSound', this.soundEnabled);
        return this.soundEnabled;
    }
};

// ============================================
// 2. REMINDER MANAGER (Eslatmalar)
// ============================================
const ReminderManager = {
    // Eslatmalar
    reminders: [],
    
    // ----------------------
    // 2.1. Eslatma yaratish
    // ----------------------
    create(data) {
        const reminder = {
            id: Utils.randomId(),
            userId: data.userId,
            title: data.title,
            description: data.description,
            datetime: data.datetime,
            type: data.type || 'custom', // task, lesson, deadline, custom
            priority: data.priority || 'normal',
            repeat: data.repeat || 'none', // none, daily, weekly, monthly
            remindBefore: data.remindBefore || 30, // daqiqa
            notified: false,
            createdAt: new Date().toISOString(),
            completed: false,
            link: data.link || null,
            color: data.color || 'blue'
        };
        
        this.reminders.push(reminder);
        this.save();
        
        return reminder;
    },
    
    // ----------------------
    // 2.2. Eslatmalarni olish
    // ----------------------
    getUserReminders(userId) {
        return this.reminders
            .filter(r => r.userId === userId && !r.completed)
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    },
    
    // ----------------------
    // 2.3. Bugungi eslatmalar
    // ----------------------
    getTodayReminders(userId) {
        const today = new Date().toISOString().split('T')[0];
        
        return this.reminders.filter(r => 
            r.userId === userId && 
            !r.completed &&
            r.datetime.startsWith(today)
        ).sort((a, b) => a.datetime.localeCompare(b.datetime));
    },
    
    // ----------------------
    // 2.4. Kelgusi eslatmalar
    // ----------------------
    getUpcomingReminders(userId, days = 7) {
        const now = new Date();
        const future = new Date();
        future.setDate(future.getDate() + days);
        
        return this.reminders.filter(r => 
            r.userId === userId && 
            !r.completed &&
            new Date(r.datetime) > now &&
            new Date(r.datetime) < future
        ).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    },
    
    // ----------------------
    // 2.5. Eslatmani bajarilgan deb belgilash
    // ----------------------
    markAsCompleted(reminderId) {
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (reminder) {
            reminder.completed = true;
            this.save();
            return true;
        }
        return false;
    },
    
    // ----------------------
    // 2.6. Eslatmani o'chirish
    // ----------------------
    delete(reminderId) {
        this.reminders = this.reminders.filter(r => r.id !== reminderId);
        this.save();
    },
    
    // ----------------------
    // 2.7. Eslatmani tahrirlash
    // ----------------------
    update(reminderId, updates) {
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (reminder) {
            Object.assign(reminder, updates);
            this.save();
            return reminder;
        }
        return null;
    },
    
    // ----------------------
    // 2.8. Saqlash
    // ----------------------
    save() {
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
    },
    
    // ----------------------
    // 2.9. Yuklash
    // ----------------------
    load() {
        const saved = localStorage.getItem('reminders');
        if (saved) {
            this.reminders = JSON.parse(saved);
        }
    }
};

// ============================================
// 3. DEADLINE TRACKER (Muddat kuzatuvchisi)
// ============================================
const DeadlineTracker = {
    // ----------------------
    // 3.1. Vazifa muddatlarini tekshirish
    // ----------------------
    checkTaskDeadlines() {
        const today = new Date().toISOString().split('T')[0];
        const tasks = DataBase.tasks;
        
        tasks.forEach(task => {
            const daysLeft = Utils.daysDiff(task.deadline);
            
            // Muddati o'tgan vazifalar
            if (daysLeft < 0) {
                task.students.forEach(s => {
                    if (s.status !== 'submitted') {
                        NotificationManager.create({
                            userId: s.studentId,
                            type: 'deadline',
                            title: 'Vazifa muddati o\'tdi',
                            message: `"${task.title}" vazifasining muddati ${Math.abs(daysLeft)} kun oldin o'tgan`,
                            priority: 'high',
                            link: `#task-${task.id}`
                        });
                    }
                });
                
                // O'qituvchiga bildirish
                NotificationManager.create({
                    userId: task.teacherId,
                    type: 'deadline',
                    title: 'Vazifa muddati o\'tdi',
                    message: `"${task.title}" vazifasining muddati o'tgan`,
                    priority: 'high',
                    link: `#task-${task.id}`
                });
            }
            
            // Muddati yaqin vazifalar (3 kun)
            else if (daysLeft <= 3) {
                task.students.forEach(s => {
                    if (s.status !== 'submitted') {
                        NotificationManager.create({
                            userId: s.studentId,
                            type: 'warning',
                            title: 'Vazifa muddati yaqin',
                            message: `"${task.title}" vazifasiga ${daysLeft} kun qoldi`,
                            priority: 'normal',
                            link: `#task-${task.id}`
                        });
                    }
                });
            }
        });
    },
    
    // ----------------------
    // 3.2. Dars vaqtlarini tekshirish
    // ----------------------
    checkLessonTimes() {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        const lessons = DataBase.lessons.filter(l => l.date === today);
        
        lessons.forEach(lesson => {
            const [start] = lesson.time.split('-');
            const [hour, minute] = start.split(':').map(Number);
            
            // Darsga 30 daqiqa qolganda
            const timeDiff = (hour * 60 + minute) - (currentHour * 60 + currentMinute);
            
            if (timeDiff === 30) {
                // Talabalarga bildirish
                const group = DataManager.findById('groups', lesson.groupId);
                if (group) {
                    const students = StudentManager.getGroupStudents(group.id);
                    students.forEach(student => {
                        NotificationManager.create({
                            userId: student.id,
                            type: 'lesson',
                            title: 'Dars boshlanishiga 30 daqiqa',
                            message: `${lesson.topic} darsi ${lesson.time} da ${lesson.room}-xonada boshlanadi`,
                            priority: 'normal',
                            link: `#lesson-${lesson.id}`
                        });
                    });
                }
                
                // O'qituvchiga bildirish
                NotificationManager.create({
                    userId: lesson.teacherId,
                    type: 'lesson',
                    title: 'Dars boshlanishiga 30 daqiqa',
                    message: `${lesson.topic} darsi ${lesson.time} da ${lesson.room}-xonada boshlanadi`,
                    priority: 'normal',
                    link: `#lesson-${lesson.id}`
                });
            }
        });
    },
    
    // ----------------------
    // 3.3. Eslatmalarni tekshirish
    // ----------------------
    checkReminders() {
        const now = new Date();
        
        ReminderManager.reminders.forEach(reminder => {
            if (reminder.completed || reminder.notified) return;
            
            const reminderTime = new Date(reminder.datetime);
            const remindBeforeMs = reminder.remindBefore * 60 * 1000;
            const timeDiff = reminderTime - now;
            
            // Eslatma vaqti keldi
            if (timeDiff <= remindBeforeMs && timeDiff > 0) {
                NotificationManager.create({
                    userId: reminder.userId,
                    type: reminder.type,
                    title: reminder.title,
                    message: reminder.description,
                    priority: reminder.priority === 'high' ? 'high' : 'normal',
                    link: reminder.link
                });
                
                reminder.notified = true;
                ReminderManager.save();
            }
            
            // Eslatma vaqti o'tib ketgan
            if (timeDiff < 0 && !reminder.completed) {
                if (reminder.repeat !== 'none') {
                    // Takrorlanadigan eslatma
                    const newDate = new Date(reminder.datetime);
                    
                    if (reminder.repeat === 'daily') {
                        newDate.setDate(newDate.getDate() + 1);
                    } else if (reminder.repeat === 'weekly') {
                        newDate.setDate(newDate.getDate() + 7);
                    } else if (reminder.repeat === 'monthly') {
                        newDate.setMonth(newDate.getMonth() + 1);
                    }
                    
                    reminder.datetime = newDate.toISOString();
                    reminder.notified = false;
                } else {
                    reminder.completed = true;
                }
                
                ReminderManager.save();
            }
        });
    }
};

// ============================================
// 4. NOTIFICATION UI FUNKSIYALARI
// ============================================

// Bildirishnomalar panelini ko'rsatish
function showNotifications() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const notifications = NotificationManager.getUserNotifications(user.id, 20);
    const unreadCount = NotificationManager.getUnreadCount(user.id);
    
    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="closeModal()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">🔔 Bildirishnomalar</h1>
            ${unreadCount > 0 ? `
                <button onclick="markAllNotificationsAsRead()" class="ml-auto px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700">
                    <i class="fas fa-check-double mr-2"></i> Hammasini o'qildi
                </button>
            ` : ''}
        </div>
    `;
    
    if (notifications.length > 0) {
        html += `<div class="space-y-3">`;
        
        notifications.forEach(n => {
            const isUnread = !n.read;
            const date = new Date(n.createdAt);
            const timeAgo = getTimeAgo(date);
            
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm card-hover ${isUnread ? 'border-l-4 border-blue-500' : ''}" 
                     onclick="${n.link ? `window.location.href='${n.link}'` : ''}">
                    <div class="flex items-start gap-3">
                        <div class="w-10 h-10 bg-${n.color}-100 text-${n.color}-600 rounded-xl flex items-center justify-center text-lg">
                            <i class="fas ${n.icon}"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold">${n.title}</h3>
                                ${isUnread ? '<span class="w-2 h-2 bg-blue-500 rounded-full"></span>' : ''}
                            </div>
                            <p class="text-sm text-gray-600 mt-1">${n.message}</p>
                            <p class="text-xs text-gray-400 mt-2">${timeAgo}</p>
                        </div>
                        <button onclick="event.stopPropagation(); deleteNotification(${n.id})" class="text-gray-400 hover:text-red-600">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    } else {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-bell-slash text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Bildirishnomalar yo'q</p>
            </div>
        `;
    }
    
    showModal(html);
}

// Vaqt farqini hisoblash
function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Hozir';
    if (diffMins < 60) return `${diffMins} daqiqa oldin`;
    if (diffHours < 24) return `${diffHours} soat oldin`;
    if (diffDays < 30) return `${diffDays} kun oldin`;
    
    return date.toLocaleDateString('uz-UZ');
}

// Hammasini o'qilgan deb belgilash
function markAllNotificationsAsRead() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    NotificationManager.markAllAsRead(user.id);
    showNotifications();
    updateNotificationBadge();
    showToast('Barcha bildirishnomalar o\'qildi', 'success');
}

// Bildirishnomani o'chirish
function deleteNotification(notificationId) {
    NotificationManager.delete(notificationId);
    showNotifications();
    updateNotificationBadge();
    showToast('Bildirishnoma o\'chirildi', 'success');
}

// Bildirishnoma belgisini yangilash
function updateNotificationBadge() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const count = NotificationManager.getUnreadCount(user.id);
    const badge = document.getElementById('notificationCount');
    
    if (badge) {
        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

// ============================================
// 5. ESLATMA FUNKSIYALARI
// ============================================

// Eslatmalarni ko'rsatish
function showReminders() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const todayReminders = ReminderManager.getTodayReminders(user.id);
    const upcomingReminders = ReminderManager.getUpcomingReminders(user.id, 7);
    
    let html = `
        <div class="flex items-center gap-4 mb-6">
            <button onclick="closeModal()" class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-gray-50">
                <i class="fas fa-arrow-left text-gray-600"></i>
            </button>
            <h1 class="text-2xl font-bold">⏰ Eslatmalar</h1>
            <button onclick="showAddReminderForm()" class="ml-auto px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                <i class="fas fa-plus mr-2"></i> Yangi eslatma
            </button>
        </div>
    `;
    
    // Bugungi eslatmalar
    if (todayReminders.length > 0) {
        html += `
            <h3 class="font-bold text-lg mb-3">📅 Bugun</h3>
            <div class="space-y-3 mb-6">
        `;
        
        todayReminders.forEach(r => {
            const time = new Date(r.datetime).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
            
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm card-hover border-l-4 border-${r.color}-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold">${r.title}</h4>
                            <p class="text-sm text-gray-600 mt-1">${r.description}</p>
                            <div class="flex items-center gap-3 mt-2">
                                <span class="text-xs text-gray-500"><i class="far fa-clock mr-1"></i> ${time}</span>
                                <span class="text-xs px-2 py-1 bg-${r.color}-100 text-${r.color}-600 rounded-full">
                                    ${r.priority === 'high' ? 'Muhim' : 'Oddiy'}
                                </span>
                            </div>
                        </div>
                        <button onclick="completeReminder(${r.id})" class="text-green-600 hover:text-green-800">
                            <i class="fas fa-check-circle text-xl"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    // Kelgusi eslatmalar
    if (upcomingReminders.length > 0) {
        html += `
            <h3 class="font-bold text-lg mb-3">📆 Kelgusi 7 kun</h3>
            <div class="space-y-3">
        `;
        
        upcomingReminders.forEach(r => {
            const date = new Date(r.datetime).toLocaleDateString('uz-UZ', { 
                day: '2-digit', 
                month: '2-digit',
                weekday: 'short'
            });
            const time = new Date(r.datetime).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
            
            html += `
                <div class="bg-white p-4 rounded-2xl shadow-sm">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold">${r.title}</h4>
                            <p class="text-sm text-gray-600">${r.description}</p>
                            <div class="flex items-center gap-3 mt-2">
                                <span class="text-xs text-gray-500"><i class="far fa-calendar mr-1"></i> ${date}</span>
                                <span class="text-xs text-gray-500"><i class="far fa-clock mr-1"></i> ${time}</span>
                            </div>
                        </div>
                        <button onclick="editReminder(${r.id})" class="text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    if (todayReminders.length === 0 && upcomingReminders.length === 0) {
        html += `
            <div class="bg-white p-12 rounded-2xl text-center">
                <i class="fas fa-clock text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Eslatmalar yo'q</p>
            </div>
        `;
    }
    
    showModal(html);
}

// Yangi eslatma qo'shish formasi
function showAddReminderForm() {
    showModal(`
        <h3 class="text-xl font-bold mb-4">➕ Yangi eslatma</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Sarlavha</label>
                <input type="text" id="reminderTitle" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Tavsif</label>
                <textarea id="reminderDesc" rows="3" class="w-full p-3 border rounded-xl"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Sana va vaqt</label>
                <input type="datetime-local" id="reminderDatetime" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Muhimlik</label>
                <select id="reminderPriority" class="w-full p-3 border rounded-xl">
                    <option value="normal">Oddiy</option>
                    <option value="high">Muhim</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Takrorlash</label>
                <select id="reminderRepeat" class="w-full p-3 border rounded-xl">
                    <option value="none">Takrorlanmaydi</option>
                    <option value="daily">Har kuni</option>
                    <option value="weekly">Har hafta</option>
                    <option value="monthly">Har oy</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Eslatma vaqti</label>
                <select id="remindBefore" class="w-full p-3 border rounded-xl">
                    <option value="5">5 daqiqa oldin</option>
                    <option value="15">15 daqiqa oldin</option>
                    <option value="30" selected>30 daqiqa oldin</option>
                    <option value="60">1 soat oldin</option>
                    <option value="120">2 soat oldin</option>
                    <option value="1440">1 kun oldin</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Rang</label>
                <select id="reminderColor" class="w-full p-3 border rounded-xl">
                    <option value="blue">Ko'k</option>
                    <option value="green">Yashil</option>
                    <option value="orange">To'q sariq</option>
                    <option value="red">Qizil</option>
                    <option value="purple">Binafsha</option>
                    <option value="pink">Pushti</option>
                </select>
            </div>
            <button onclick="addReminder()" class="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700">
                Saqlash
            </button>
        </div>
    `);
}

// Eslatma qo'shish
function addReminder() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    const title = document.getElementById('reminderTitle')?.value;
    const desc = document.getElementById('reminderDesc')?.value;
    const datetime = document.getElementById('reminderDatetime')?.value;
    const priority = document.getElementById('reminderPriority')?.value;
    const repeat = document.getElementById('reminderRepeat')?.value;
    const remindBefore = document.getElementById('remindBefore')?.value;
    const color = document.getElementById('reminderColor')?.value;
    
    if (!title || !datetime) {
        showError('Sarlavha va vaqt majburiy');
        return;
    }
    
    ReminderManager.create({
        userId: user.id,
        title: title,
        description: desc || '',
        datetime: datetime,
        priority: priority,
        repeat: repeat,
        remindBefore: parseInt(remindBefore),
        color: color,
        type: 'custom'
    });
    
    closeModal();
    showSuccess('Eslatma qo\'shildi');
    showReminders();
}

// Eslatmani bajarilgan deb belgilash
function completeReminder(reminderId) {
    ReminderManager.markAsCompleted(reminderId);
    showReminders();
    showToast('Eslatma bajarildi', 'success');
}

// Eslatmani tahrirlash
function editReminder(reminderId) {
    const reminder = ReminderManager.reminders.find(r => r.id === reminderId);
    if (!reminder) return;
    
    showModal(`
        <h3 class="text-xl font-bold mb-4">✏️ Eslatmani tahrirlash</h3>
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Sarlavha</label>
                <input type="text" id="editReminderTitle" value="${reminder.title}" class="w-full p-3 border rounded-xl">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Tavsif</label>
                <textarea id="editReminderDesc" rows="3" class="w-full p-3 border rounded-xl">${reminder.description}</textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Sana va vaqt</label>
                <input type="datetime-local" id="editReminderDatetime" value="${reminder.datetime.substring(0,16)}" class="w-full p-3 border rounded-xl">
            </div>
            <button onclick="updateReminder(${reminderId})" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                Yangilash
            </button>
            <button onclick="deleteReminder(${reminderId})" class="w-full bg-red-600 text-white p-3 rounded-xl font-bold hover:bg-red-700">
                O'chirish
            </button>
        </div>
    `);
}

function updateReminder(reminderId) {
    const title = document.getElementById('editReminderTitle')?.value;
    const desc = document.getElementById('editReminderDesc')?.value;
    const datetime = document.getElementById('editReminderDatetime')?.value;
    
    if (!title || !datetime) {
        showError('Sarlavha va vaqt majburiy');
        return;
    }
    
    ReminderManager.update(reminderId, {
        title: title,
        description: desc,
        datetime: datetime
    });
    
    closeModal();
    showSuccess('Eslatma yangilandi');
    showReminders();
}

function deleteReminder(reminderId) {
    UI.confirm('Haqiqatan ham bu eslatmani o\'chirmoqchimisiz?', () => {
        ReminderManager.delete(reminderId);
        showSuccess('Eslatma o\'chirildi');
        showReminders();
    });
}

// ============================================
// 6. BACKGROUND CHECKER
// ============================================

// Bildirishnomalarni tekshirish (har daqiqada)
function startNotificationChecker() {
    // Har daqiqada tekshirish
    setInterval(() => {
        const user = Auth.getCurrentUser();
        if (!user) return;
        
        // Vazifa muddatlarini tekshirish
        DeadlineTracker.checkTaskDeadlines();
        
        // Dars vaqtlarini tekshirish
        DeadlineTracker.checkLessonTimes();
        
        // Eslatmalarni tekshirish
        DeadlineTracker.checkReminders();
        
        // Bildirishnomalar belgisini yangilash
        updateNotificationBadge();
        
    }, 60000); // 1 daqiqa
    
    console.log('✅ Bildirishnoma tekshiruvchisi ishga tushdi');
}

// ============================================
// 7. NOTIFICATION SETTINGS
// ============================================

// Bildirishnoma sozlamalarini ko'rsatish
function showNotificationSettings() {
    showModal(`
        <h3 class="text-xl font-bold mb-4">⚙️ Bildirishnoma sozlamalari</h3>
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <span>Tovush</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="soundEnabled" ${NotificationManager.soundEnabled ? 'checked' : ''} onchange="toggleNotificationSound()" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            
            <div class="flex justify-between items-center">
                <span>Vazifa muddatlari</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            
            <div class="flex justify-between items-center">
                <span>Dars vaqtlari</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            
            <div class="flex justify-between items-center">
                <span>Eslatmalar</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            
            <div class="pt-4 border-t">
                <button onclick="clearAllNotifications()" class="w-full py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200">
                    <i class="fas fa-trash mr-2"></i> Barcha bildirishnomalarni tozalash
                </button>
            </div>
        </div>
    `);
}

// Tovushni yoqish/o'chirish
function toggleNotificationSound() {
    const enabled = document.getElementById('soundEnabled')?.checked;
    NotificationManager.soundEnabled = enabled;
    localStorage.setItem('notificationSound', enabled);
    showToast(enabled ? 'Tovush yoqildi' : 'Tovush o\'chirildi', 'success');
}

// Barcha bildirishnomalarni tozalash
function clearAllNotifications() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    
    UI.confirm('Haqiqatan ham barcha bildirishnomalarni o\'chirmoqchimisiz?', () => {
        NotificationManager.deleteAll(user.id);
        updateNotificationBadge();
        showSuccess('Barcha bildirishnomalar o\'chirildi');
        closeModal();
    });
}

// ============================================
// 8. SAHIFA YUKLANGANDA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Bildirishnomalarni yuklash
    NotificationManager.load();
    
    // Eslatmalarni yuklash
    ReminderManager.load();
    
    // Tovush sozlamasini yuklash
    const savedSound = localStorage.getItem('notificationSound');
    if (savedSound !== null) {
        NotificationManager.soundEnabled = savedSound === 'true';
    }
    
    // Bildirishnoma tekshiruvchisini ishga tushirish
    startNotificationChecker();
    
    // Foydalanuvchi kirganda bildirishnomalarni tekshirish
    Events.on('auth:login', (user) => {
        updateNotificationBadge();
    });
});

// ============================================
// 9. GLOBAL OBYEKTLAR
// ============================================
window.NotificationManager = NotificationManager;
window.ReminderManager = ReminderManager;
window.DeadlineTracker = DeadlineTracker;
window.showNotifications = showNotifications;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.deleteNotification = deleteNotification;
window.updateNotificationBadge = updateNotificationBadge;
window.showReminders = showReminders;
window.showAddReminderForm = showAddReminderForm;
window.addReminder = addReminder;
window.completeReminder = completeReminder;
window.editReminder = editReminder;
window.updateReminder = updateReminder;
window.deleteReminder = deleteReminder;
window.showNotificationSettings = showNotificationSettings;
window.toggleNotificationSound = toggleNotificationSound;
window.clearAllNotifications = clearAllNotifications;