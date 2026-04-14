/* ============================================
   EduHemis - Calculators (Hisoblash funksiyalari)
   Barcha hisoblash funksiyalari shu yerda
   ============================================ */

// ============================================
// 1. GPA VA BAHOLAR HISOBLARI
// ============================================

const GradeCalculators = {
    /**
     * GPA ni hisoblash (Grade Point Average)
     * @param {Array} grades - Baholar massivi [{grade, credits}]
     * @returns {number}
     */
    calculateGPA(grades) {
        if (!grades || grades.length === 0) return 0;
        
        let totalPoints = 0;
        let totalCredits = 0;
        
        grades.forEach(item => {
            const grade = typeof item === 'number' ? item : item.grade;
            const credits = item.credits || 1;
            
            totalPoints += grade * credits;
            totalCredits += credits;
        });
        
        return totalCredits === 0 ? 0 : totalPoints / totalCredits;
    },

    /**
     * O'rtacha bahoni hisoblash
     * @param {Array} grades - Baholar massivi
     * @returns {number}
     */
    calculateAverage(grades) {
        if (!grades || grades.length === 0) return 0;
        
        const sum = grades.reduce((acc, grade) => acc + grade, 0);
        return sum / grades.length;
    },

    /**
     * Vaznli o'rtacha bahoni hisoblash
     * @param {Array} items - Massiv [{grade, weight}]
     * @returns {number}
     */
    calculateWeightedAverage(items) {
        if (!items || items.length === 0) return 0;
        
        let totalWeight = 0;
        let totalScore = 0;
        
        items.forEach(item => {
            totalScore += item.grade * item.weight;
            totalWeight += item.weight;
        });
        
        return totalWeight === 0 ? 0 : totalScore / totalWeight;
    },

    /**
     * Baho taqsimotini hisoblash
     * @param {Array} grades - Baholar massivi
     * @returns {Object}
     */
    calculateGradeDistribution(grades) {
        if (!grades || grades.length === 0) {
            return { excellent: 0, good: 0, satisfactory: 0, poor: 0 };
        }
        
        let excellent = 0; // 5
        let good = 0;       // 4
        let satisfactory = 0; // 3
        let poor = 0;       // 2
        
        grades.forEach(grade => {
            if (grade >= 4.5) excellent++;
            else if (grade >= 3.5) good++;
            else if (grade >= 2.5) satisfactory++;
            else poor++;
        });
        
        return { excellent, good, satisfactory, poor };
    },

    /**
     * Baho foizini hisoblash
     * @param {number} score - Olingan ball
     * @param {number} maxScore - Maksimal ball
     * @returns {number}
     */
    calculatePercentage(score, maxScore) {
        if (maxScore === 0) return 0;
        return (score / maxScore) * 100;
    },

    /**
     * Bahoni 5 ballik tizimga o'tkazish
     * @param {number} percentage - Foiz (0-100)
     * @returns {number}
     */
    percentageToGrade(percentage) {
        if (percentage >= 86) return 5;
        if (percentage >= 71) return 4;
        if (percentage >= 56) return 3;
        return 2;
    },

    /**
     * Bahoni harfga o'tkazish
     * @param {number} grade - Baho (2-5)
     * @returns {string}
     */
    gradeToLetter(grade) {
        const mapping = {
            5: 'A',
            4: 'B',
            3: 'C',
            2: 'F'
        };
        return mapping[Math.round(grade)] || 'F';
    },

    /**
     * Harfni bahoga o'tkazish
     * @param {string} letter - Harf (A, B, C, F)
     * @returns {number}
     */
    letterToGrade(letter) {
        const mapping = {
            'A': 5,
            'B': 4,
            'C': 3,
            'F': 2
        };
        return mapping[letter.toUpperCase()] || 2;
    },

    /**
     * Talabaning reytingini hisoblash
     * @param {Array} students - Talabalar massivi [{id, name, gpa}]
     * @returns {Array}
     */
    calculateRanking(students) {
        if (!students || students.length === 0) return [];
        
        const sorted = [...students].sort((a, b) => b.gpa - a.gpa);
        
        let rank = 1;
        for (let i = 0; i < sorted.length; i++) {
            if (i > 0 && sorted[i].gpa < sorted[i - 1].gpa) {
                rank = i + 1;
            }
            sorted[i].rank = rank;
        }
        
        return sorted;
    },

    /**
     * Guruh o'rtacha bahosini hisoblash
     * @param {Array} students - Talabalar massivi [{gpa}]
     * @returns {number}
     */
    calculateGroupAverage(students) {
        if (!students || students.length === 0) return 0;
        
        const sum = students.reduce((acc, s) => acc + (s.gpa || 0), 0);
        return sum / students.length;
    }
};

// ============================================
// 2. DAVOMAT HISOBLARI
// ============================================

const AttendanceCalculators = {
    /**
     * Davomat foizini hisoblash
     * @param {number} present - Keldi
     * @param {number} total - Jami darslar
     * @returns {number}
     */
    calculateAttendancePercentage(present, total) {
        if (total === 0) return 0;
        return (present / total) * 100;
    },

    /**
     * Talaba davomatini hisoblash
     * @param {Array} records - Davomat yozuvlari [{status}]
     * @returns {Object}
     */
    calculateStudentAttendance(records) {
        if (!records || records.length === 0) {
            return { present: 0, late: 0, absent: 0, excused: 0, total: 0, percentage: 0 };
        }
        
        let present = 0;
        let late = 0;
        let absent = 0;
        let excused = 0;
        
        records.forEach(record => {
            switch (record.status) {
                case 'present': present++; break;
                case 'late': late++; break;
                case 'absent': absent++; break;
                case 'excused': excused++; break;
            }
        });
        
        const total = records.length;
        const percentage = total === 0 ? 0 : ((present + late + excused) / total) * 100;
        
        return { present, late, absent, excused, total, percentage };
    },

    /**
     * Guruh davomatini hisoblash
     * @param {Array} students - Talabalar massivi [{attendance}]
     * @returns {Object}
     */
    calculateGroupAttendance(students) {
        if (!students || students.length === 0) {
            return { average: 0, total: 0, present: 0, late: 0, absent: 0 };
        }
        
        let totalPercentage = 0;
        let totalPresent = 0;
        let totalLate = 0;
        let totalAbsent = 0;
        
        students.forEach(student => {
            totalPercentage += student.attendance?.percentage || 0;
            totalPresent += student.attendance?.present || 0;
            totalLate += student.attendance?.late || 0;
            totalAbsent += student.attendance?.absent || 0;
        });
        
        return {
            average: totalPercentage / students.length,
            totalPresent,
            totalLate,
            totalAbsent
        };
    },

    /**
     * Haftalik davomatni hisoblash
     * @param {Array} weeklyRecords - Haftalik davomat yozuvlari
     * @returns {Object}
     */
    calculateWeeklyAttendance(weeklyRecords) {
        if (!weeklyRecords || weeklyRecords.length === 0) {
            return { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0 };
        }
        
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const result = {};
        
        days.forEach(day => {
            const dayRecords = weeklyRecords.filter(r => r.day === day);
            const present = dayRecords.filter(r => r.status === 'present').length;
            const total = dayRecords.length;
            result[day] = total === 0 ? 0 : (present / total) * 100;
        });
        
        return result;
    }
};

// ============================================
// 3. VAZIFA HISOBLARI
// ============================================

const TaskCalculators = {
    /**
     * Vazifa bajarilish foizini hisoblash
     * @param {number} submitted - Topshirganlar soni
     * @param {number} total - Jami talabalar
     * @returns {number}
     */
    calculateSubmissionRate(submitted, total) {
        if (total === 0) return 0;
        return (submitted / total) * 100;
    },

    /**
     * Vazifa statistikasini hisoblash
     * @param {Array} tasks - Vazifalar massivi
     * @returns {Object}
     */
    calculateTaskStatistics(tasks) {
        if (!tasks || tasks.length === 0) {
            return { total: 0, active: 0, overdue: 0, completed: 0, averageSubmission: 0 };
        }
        
        let active = 0;
        let overdue = 0;
        let completed = 0;
        let totalSubmission = 0;
        
        tasks.forEach(task => {
            if (task.status === 'active') active++;
            else if (task.status === 'overdue') overdue++;
            else if (task.status === 'completed') completed++;
            
            totalSubmission += (task.submitted / task.total) * 100;
        });
        
        return {
            total: tasks.length,
            active,
            overdue,
            completed,
            averageSubmission: tasks.length === 0 ? 0 : totalSubmission / tasks.length
        };
    },

    /**
     * Vazifa muddatini hisoblash
     * @param {string} deadline - Muddat sanasi
     * @returns {Object}
     */
    calculateDeadline(deadline) {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let status = '';
        if (diffDays < 0) status = 'overdue';
        else if (diffDays <= 3) status = 'warning';
        else status = 'upcoming';
        
        return {
            daysLeft: diffDays,
            status: status,
            isOverdue: diffDays < 0,
            isNear: diffDays <= 3 && diffDays >= 0,
            isUpcoming: diffDays > 3
        };
    },

    /**
     * Talaba vazifa statistikasini hisoblash
     * @param {Array} tasks - Talabaning vazifalari
     * @returns {Object}
     */
    calculateStudentTaskStats(tasks) {
        if (!tasks || tasks.length === 0) {
            return { total: 0, submitted: 0, pending: 0, late: 0, averageScore: 0 };
        }
        
        let submitted = 0;
        let pending = 0;
        let late = 0;
        let totalScore = 0;
        let gradedCount = 0;
        
        tasks.forEach(task => {
            if (task.status === 'submitted') {
                submitted++;
                if (task.score) {
                    totalScore += task.score;
                    gradedCount++;
                }
            }
            else if (task.status === 'pending') pending++;
            else if (task.status === 'late') late++;
        });
        
        return {
            total: tasks.length,
            submitted,
            pending,
            late,
            averageScore: gradedCount === 0 ? 0 : totalScore / gradedCount
        };
    }
};

// ============================================
// 4. STATISTIK HISOBLAR
// ============================================

const StatisticsCalculators = {
    /**
     * O'rtacha qiymat
     * @param {Array} numbers - Raqamlar massivi
     * @returns {number}
     */
    mean(numbers) {
        if (!numbers || numbers.length === 0) return 0;
        const sum = numbers.reduce((a, b) => a + b, 0);
        return sum / numbers.length;
    },

    /**
     * Mediana
     * @param {Array} numbers - Raqamlar massivi
     * @returns {number}
     */
    median(numbers) {
        if (!numbers || numbers.length === 0) return 0;
        
        const sorted = [...numbers].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    },

    /**
     * Moda (eng ko'p uchraydigan qiymat)
     * @param {Array} numbers - Raqamlar massivi
     * @returns {Array}
     */
    mode(numbers) {
        if (!numbers || numbers.length === 0) return [];
        
        const frequency = {};
        let maxFreq = 0;
        
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            if (frequency[num] > maxFreq) maxFreq = frequency[num];
        });
        
        const modes = [];
        for (const num in frequency) {
            if (frequency[num] === maxFreq) {
                modes.push(Number(num));
            }
        }
        
        return modes;
    },

    /**
     * Dispersiya
     * @param {Array} numbers - Raqamlar massivi
     * @returns {number}
     */
    variance(numbers) {
        if (!numbers || numbers.length === 0) return 0;
        
        const mean = this.mean(numbers);
        const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
        return this.mean(squaredDiffs);
    },

    /**
     * Standart og'ish
     * @param {Array} numbers - Raqamlar massivi
     * @returns {number}
     */
    standardDeviation(numbers) {
        return Math.sqrt(this.variance(numbers));
    },

    /**
     * Korrelyatsiya koeffitsienti
     * @param {Array} x - X qiymatlari
     * @param {Array} y - Y qiymatlari
     * @returns {number}
     */
    correlation(x, y) {
        if (!x || !y || x.length !== y.length || x.length === 0) return 0;
        
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
        const sumX2 = x.reduce((acc, val) => acc + val * val, 0);
        const sumY2 = y.reduce((acc, val) => acc + val * val, 0);
        
        const numerator = n * sumXY - sumX * sumY;
        const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
        
        return denominator === 0 ? 0 : numerator / denominator;
    },

    /**
     * Percentil
     * @param {Array} numbers - Raqamlar massivi
     * @param {number} percentile - Percentil (0-100)
     * @returns {number}
     */
    percentile(numbers, percentile) {
        if (!numbers || numbers.length === 0) return 0;
        
        const sorted = [...numbers].sort((a, b) => a - b);
        const index = (percentile / 100) * (sorted.length - 1);
        
        if (Math.floor(index) === index) {
            return sorted[index];
        }
        
        const lower = sorted[Math.floor(index)];
        const upper = sorted[Math.ceil(index)];
        return lower + (upper - lower) * (index - Math.floor(index));
    },

    /**
     * Kvartillar
     * @param {Array} numbers - Raqamlar massivi
     * @returns {Object}
     */
    quartiles(numbers) {
        if (!numbers || numbers.length === 0) {
            return { q1: 0, q2: 0, q3: 0, iqr: 0 };
        }
        
        const q1 = this.percentile(numbers, 25);
        const q2 = this.percentile(numbers, 50);
        const q3 = this.percentile(numbers, 75);
        const iqr = q3 - q1;
        
        return { q1, q2, q3, iqr };
    },

    /**
     * Normalizatsiya (0-1 oralig'iga keltirish)
     * @param {Array} numbers - Raqamlar massivi
     * @returns {Array}
     */
    normalize(numbers) {
        if (!numbers || numbers.length === 0) return [];
        
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        
        if (min === max) return numbers.map(() => 0.5);
        
        return numbers.map(num => (num - min) / (max - min));
    },

    /**
     * Standartlashtirish (Z-score)
     * @param {Array} numbers - Raqamlar massivi
     * @returns {Array}
     */
    standardize(numbers) {
        if (!numbers || numbers.length === 0) return [];
        
        const mean = this.mean(numbers);
        const std = this.standardDeviation(numbers);
        
        if (std === 0) return numbers.map(() => 0);
        
        return numbers.map(num => (num - mean) / std);
    }
};

// ============================================
// 5. VAKT HISOBLARI
// ============================================

const TimeCalculators = {
    /**
     * Ikki sana orasidagi kunlar farqi
     * @param {Date|string} date1 - 1-sana
     * @param {Date|string} date2 - 2-sana
     * @returns {number}
     */
    daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    /**
     * Ikki sana orasidagi ish kunlari (dushanba-juma)
     * @param {Date|string} start - Boshlanish sanasi
     * @param {Date|string} end - Tugash sanasi
     * @returns {number}
     */
    businessDaysBetween(start, end) {
        let count = 0;
        const current = new Date(start);
        const endDate = new Date(end);
        
        while (current <= endDate) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        
        return count;
    },

    /**
     * Hafta raqamini hisoblash
     * @param {Date|string} date - Sana
     * @returns {number}
     */
    getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    },

    /**
     * Qolgan vaqtni formatlash
     * @param {Date|string} deadline - Muddat
     * @returns {string}
     */
    timeRemaining(deadline) {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end - now;
        
        if (diff <= 0) return 'Vaqt o\'tgan';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) return `${days} kun ${hours} soat`;
        if (hours > 0) return `${hours} soat ${minutes} daqiqa`;
        return `${minutes} daqiqa`;
    },

    /**
     * Yoshni hisoblash
     * @param {Date|string} birthDate - Tug'ilgan sana
     * @returns {number}
     */
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    },

    /**
     * Semestr raqamini hisoblash
     * @param {Date|string} startDate - Boshlanish sanasi
     * @returns {number}
     */
    calculateSemester(startDate) {
        const start = new Date(startDate);
        const now = new Date();
        const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
        return Math.floor(months / 6) + 1;
    }
};

// ============================================
// 6. GLOBAL OBYEKTLAR
// ============================================

window.GradeCalculators = GradeCalculators;
window.AttendanceCalculators = AttendanceCalculators;
window.TaskCalculators = TaskCalculators;
window.StatisticsCalculators = StatisticsCalculators;
window.TimeCalculators = TimeCalculators;

// Qisqa nomlar
window.$gradeCalc = GradeCalculators;
window.$attendanceCalc = AttendanceCalculators;
window.$taskCalc = TaskCalculators;
window.$statsCalc = StatisticsCalculators;
window.$timeCalc = TimeCalculators;