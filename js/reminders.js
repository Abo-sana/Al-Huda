// بوابة الهدى الرقمية - نظام التذكيرات
// Al-Huda Gateway - Reminders System

/**
 * نظام تذكيرات تلقائي ذكي
 * يرسل تذكيرات للمستخدم عن المواعيد المهمة
 */

// ====================================
// إعدادات التذكيرات
// ====================================

const reminderSettings = {
    payment: {
        enabled: true,
        daysBeforeDue: [7, 3, 1], // تذكير قبل 7، 3، 1 يوم
        checkInterval: 60 * 60 * 1000 // فحص كل ساعة
    },
    maintenance: {
        enabled: true,
        daysBeforeScheduled: [3, 1], // تذكير قبل 3، 1 يوم
        checkInterval: 60 * 60 * 1000 // فحص كل ساعة
    },
    voting: {
        enabled: true,
        hoursBeforeEnd: [24, 12, 3], // تذكير قبل 24، 12، 3 ساعة
        checkInterval: 30 * 60 * 1000 // فحص كل نصف ساعة
    },
    meeting: {
        enabled: true,
        daysBeforeMeeting: [7, 3, 1], // تذكير قبل 7، 3، 1 يوم
        checkInterval: 60 * 60 * 1000 // فحص كل ساعة
    }
};

// ====================================
// حساب الفرق بين تاريخين
// ====================================

/**
 * حساب الفرق بالأيام بين تاريخين
 */
function getDaysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffTime = date2 - date1;
    return Math.ceil(diffTime / oneDay);
}

/**
 * حساب الفرق بالساعات بين تاريخين
 */
function getHoursDifference(date1, date2) {
    const oneHour = 60 * 60 * 1000;
    const diffTime = date2 - date1;
    return Math.ceil(diffTime / oneHour);
}

/**
 * تحويل تاريخ نصي لكائن Date
 */
function parseDate(dateString) {
    // صيغة: "DD/MM/YYYY" أو "YYYY-MM-DD"
    if (!dateString) return null;
    
    if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    } else if (dateString.includes('-')) {
        return new Date(dateString);
    }
    
    return null;
}

// ====================================
// فحص تذكيرات المدفوعات
// ====================================

function checkPaymentReminders() {
    if (!reminderSettings.payment.enabled) return;
    
    const payments = dataManager.getPayments();
    const unitNumber = sessionStorage.getItem('unitNumber');
    const isAdminUser = isAdmin();
    
    // المستخدم العادي يرى مدفوعاته فقط
    const userPayments = isAdminUser 
        ? payments 
        : payments.filter(p => p.unitNumber === unitNumber);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    userPayments.forEach(payment => {
        // تجاهل المدفوعات المدفوعة
        if (payment.status === 'مدفوع') return;
        
        // الحصول على تاريخ الاستحقاق
        const dueDate = parseDate(payment.dueDate || payment.date);
        if (!dueDate) return;
        
        const daysUntilDue = getDaysDifference(today, dueDate);
        
        // التحقق من التذكيرات
        reminderSettings.payment.daysBeforeDue.forEach(days => {
            if (daysUntilDue === days) {
                const reminderKey = `payment_${payment.id}_${days}`;
                
                // التحقق من عدم إرسال التذكير مسبقاً
                if (!hasReminderBeenSent(reminderKey)) {
                    notifyPaymentDue(days, payment.amount);
                    markReminderAsSent(reminderKey);
                }
            }
        });
        
        // تذكير بالتأخير
        if (daysUntilDue < 0) {
            const daysOverdue = Math.abs(daysUntilDue);
            const reminderKey = `payment_overdue_${payment.id}_${daysOverdue}`;
            
            if (!hasReminderBeenSent(reminderKey)) {
                notifyPaymentOverdue(daysOverdue, payment.amount);
                markReminderAsSent(reminderKey);
            }
        }
    });
}

// ====================================
// فحص تذكيرات الصيانة
// ====================================

function checkMaintenanceReminders() {
    if (!reminderSettings.maintenance.enabled) return;
    
    const maintenance = dataManager.getMaintenance();
    const unitNumber = sessionStorage.getItem('unitNumber');
    const isAdminUser = isAdmin();
    
    // المستخدم العادي يرى صيانته فقط
    const userMaintenance = isAdminUser 
        ? maintenance 
        : maintenance.filter(m => m.unitNumber === unitNumber);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    userMaintenance.forEach(item => {
        // تجاهل الصيانة المكتملة
        if (item.status === 'مكتمل') return;
        
        // الحصول على تاريخ الجدولة
        const scheduledDate = parseDate(item.scheduledDate);
        if (!scheduledDate) return;
        
        const daysUntilScheduled = getDaysDifference(today, scheduledDate);
        
        // التحقق من التذكيرات
        reminderSettings.maintenance.daysBeforeScheduled.forEach(days => {
            if (daysUntilScheduled === days) {
                const reminderKey = `maintenance_${item.id}_${days}`;
                
                if (!hasReminderBeenSent(reminderKey)) {
                    notifyMaintenanceReminder(item.type, item.scheduledDate);
                    markReminderAsSent(reminderKey);
                }
            }
        });
    });
}

// ====================================
// فحص تذكيرات التصويت
// ====================================

function checkVotingReminders() {
    if (!reminderSettings.voting.enabled) return;
    
    // في التطبيق الحقيقي، يتم جلب التصويتات من قاعدة البيانات
    const activeVotes = [
        {
            id: 1,
            title: 'تجديد المصاعد',
            endDate: new Date(2026, 4, 8, 18, 0) // 8 مايو 2026، 6 مساءً
        }
    ];
    
    const now = new Date();
    
    activeVotes.forEach(vote => {
        const hoursUntilEnd = getHoursDifference(now, vote.endDate);
        
        // التحقق من التذكيرات
        reminderSettings.voting.hoursBeforeEnd.forEach(hours => {
            if (hoursUntilEnd <= hours && hoursUntilEnd > hours - 1) {
                const reminderKey = `vote_${vote.id}_${hours}`;
                
                if (!hasReminderBeenSent(reminderKey)) {
                    notifyVoteEnding(vote.title, hours);
                    markReminderAsSent(reminderKey);
                }
            }
        });
    });
}

// ====================================
// فحص تذكيرات الاجتماعات
// ====================================

function checkMeetingReminders() {
    if (!reminderSettings.meeting.enabled) return;
    
    // في التطبيق الحقيقي، يتم جلب الاجتماعات من قاعدة البيانات
    const upcomingMeetings = [
        {
            id: 1,
            title: 'الجمعية العمومية',
            date: '15/05/2026',
            time: '7:00 مساءً'
        }
    ];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    upcomingMeetings.forEach(meeting => {
        const meetingDate = parseDate(meeting.date);
        if (!meetingDate) return;
        
        const daysUntilMeeting = getDaysDifference(today, meetingDate);
        
        // التحقق من التذكيرات
        reminderSettings.meeting.daysBeforeMeeting.forEach(days => {
            if (daysUntilMeeting === days) {
                const reminderKey = `meeting_${meeting.id}_${days}`;
                
                if (!hasReminderBeenSent(reminderKey)) {
                    notifyUpcomingMeeting(meeting.date, meeting.time);
                    markReminderAsSent(reminderKey);
                }
            }
        });
    });
}

// ====================================
// إدارة التذكيرات المرسلة
// ====================================

/**
 * التحقق من إرسال التذكير مسبقاً
 */
function hasReminderBeenSent(reminderKey) {
    const sentReminders = JSON.parse(localStorage.getItem('sentReminders') || '{}');
    const today = new Date().toDateString();
    
    // التحقق من إرسال التذكير اليوم
    return sentReminders[reminderKey] === today;
}

/**
 * تسجيل التذكير كمرسل
 */
function markReminderAsSent(reminderKey) {
    const sentReminders = JSON.parse(localStorage.getItem('sentReminders') || '{}');
    const today = new Date().toDateString();
    
    sentReminders[reminderKey] = today;
    localStorage.setItem('sentReminders', JSON.stringify(sentReminders));
}

/**
 * مسح التذكيرات القديمة (أكثر من 30 يوم)
 */
function cleanOldReminders() {
    const sentReminders = JSON.parse(localStorage.getItem('sentReminders') || '{}');
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    Object.keys(sentReminders).forEach(key => {
        const reminderDate = new Date(sentReminders[key]);
        if (reminderDate < thirtyDaysAgo) {
            delete sentReminders[key];
        }
    });
    
    localStorage.setItem('sentReminders', JSON.stringify(sentReminders));
}

// ====================================
// فحص جميع التذكيرات
// ====================================

function checkAllReminders() {
    // التحقق من تسجيل الدخول
    if (sessionStorage.getItem('loggedIn') !== 'true') return;
    
    try {
        checkPaymentReminders();
        checkMaintenanceReminders();
        checkVotingReminders();
        checkMeetingReminders();
    } catch (error) {
        console.error('Error checking reminders:', error);
    }
}

// ====================================
// بدء نظام التذكيرات
// ====================================

let reminderIntervals = [];

function startReminderSystem() {
    // إيقاف أي فواصل زمنية سابقة
    stopReminderSystem();
    
    // فحص فوري عند البدء
    setTimeout(checkAllReminders, 2000); // بعد ثانيتين من تحميل الصفحة
    
    // جدولة الفحص الدوري
    const paymentInterval = setInterval(checkPaymentReminders, reminderSettings.payment.checkInterval);
    const maintenanceInterval = setInterval(checkMaintenanceReminders, reminderSettings.maintenance.checkInterval);
    const votingInterval = setInterval(checkVotingReminders, reminderSettings.voting.checkInterval);
    const meetingInterval = setInterval(checkMeetingReminders, reminderSettings.meeting.checkInterval);
    
    reminderIntervals.push(paymentInterval, maintenanceInterval, votingInterval, meetingInterval);
    
    // مسح التذكيرات القديمة يومياً
    const cleanupInterval = setInterval(cleanOldReminders, 24 * 60 * 60 * 1000);
    reminderIntervals.push(cleanupInterval);
    
    console.log('✅ نظام التذكيرات يعمل الآن');
}

function stopReminderSystem() {
    reminderIntervals.forEach(interval => clearInterval(interval));
    reminderIntervals = [];
}

// ====================================
// إعدادات المستخدم
// ====================================

/**
 * تفعيل/تعطيل نوع معين من التذكيرات
 */
function toggleReminderType(type, enabled) {
    if (reminderSettings[type]) {
        reminderSettings[type].enabled = enabled;
        localStorage.setItem('reminderSettings', JSON.stringify(reminderSettings));
        
        if (enabled) {
            notifySuccess(`تم تفعيل تذكيرات ${getReminderTypeName(type)}`);
        } else {
            notifyInfo(`تم تعطيل تذكيرات ${getReminderTypeName(type)}`);
        }
    }
}

function getReminderTypeName(type) {
    const names = {
        payment: 'المدفوعات',
        maintenance: 'الصيانة',
        voting: 'التصويت',
        meeting: 'الاجتماعات'
    };
    return names[type] || type;
}

/**
 * الحصول على إعدادات التذكيرات
 */
function getReminderSettings() {
    const saved = localStorage.getItem('reminderSettings');
    if (saved) {
        Object.assign(reminderSettings, JSON.parse(saved));
    }
    return reminderSettings;
}

// ====================================
// واجهة إعدادات التذكيرات
// ====================================

function createReminderSettingsPanel() {
    return `
        <div class="glass-card p-6 rounded-2xl">
            <h3 class="text-xl font-bold mb-4">
                <i class="fas fa-bell ml-2"></i>
                إعدادات التذكيرات
            </h3>
            
            <div class="space-y-4">
                <div class="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <div>
                        <p class="font-bold">تذكيرات المدفوعات</p>
                        <p class="text-xs text-slate-400">قبل 7، 3، 1 يوم من الاستحقاق</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" ${reminderSettings.payment.enabled ? 'checked' : ''} 
                               onchange="toggleReminderType('payment', this.checked)" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <div>
                        <p class="font-bold">تذكيرات الصيانة</p>
                        <p class="text-xs text-slate-400">قبل 3، 1 يوم من الموعد</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" ${reminderSettings.maintenance.enabled ? 'checked' : ''} 
                               onchange="toggleReminderType('maintenance', this.checked)" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <div>
                        <p class="font-bold">تذكيرات التصويت</p>
                        <p class="text-xs text-slate-400">قبل 24، 12، 3 ساعة من الانتهاء</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" ${reminderSettings.voting.enabled ? 'checked' : ''} 
                               onchange="toggleReminderType('voting', this.checked)" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <div>
                        <p class="font-bold">تذكيرات الاجتماعات</p>
                        <p class="text-xs text-slate-400">قبل 7، 3، 1 يوم من الموعد</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" ${reminderSettings.meeting.enabled ? 'checked' : ''} 
                               onchange="toggleReminderType('meeting', this.checked)" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
            </div>
            
            <div class="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <p class="text-sm text-indigo-400">
                    <i class="fas fa-info-circle ml-1"></i>
                    سيتم إرسال التذكيرات تلقائياً في الأوقات المحددة
                </p>
            </div>
        </div>
    `;
}

// ====================================
// التهيئة التلقائية
// ====================================

// تحميل الإعدادات المحفوظة
getReminderSettings();

// بدء النظام عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (sessionStorage.getItem('loggedIn') === 'true') {
            startReminderSystem();
        }
    });
} else {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        startReminderSystem();
    }
}

// إيقاف النظام عند تسجيل الخروج
window.addEventListener('beforeunload', stopReminderSystem);

// ====================================
// تصدير الوظائف
// ====================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startReminderSystem,
        stopReminderSystem,
        checkAllReminders,
        toggleReminderType,
        getReminderSettings,
        createReminderSettingsPanel
    };
}
