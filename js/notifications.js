// بوابة الهدى الرقمية - نظام الإشعارات
// Al-Huda Gateway - Notifications System

/**
 * نظام إشعارات فوري وجميل
 * يعرض إشعارات منبثقة في أعلى الشاشة
 */

// ====================================
// إنشاء حاوية الإشعارات
// ====================================

function createNotificationContainer() {
    if (document.getElementById('notificationContainer')) {
        return; // الحاوية موجودة بالفعل
    }

    const container = document.createElement('div');
    container.id = 'notificationContainer';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
        pointer-events: none;
    `;
    document.body.appendChild(container);
}

// ====================================
// عرض إشعار
// ====================================

/**
 * عرض إشعار للمستخدم
 * @param {string} message - نص الإشعار
 * @param {string} type - نوع الإشعار (success, error, warning, info)
 * @param {number} duration - مدة العرض بالميلي ثانية (افتراضي: 4000)
 */
function showNotification(message, type = 'info', duration = 4000) {
    createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // الأيقونات حسب النوع
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    // الألوان حسب النوع
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    
    const icon = icons[type] || icons.info;
    const color = colors[type] || colors.info;
    
    notification.innerHTML = `
        <div style="
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(10px);
            border: 2px solid ${color};
            border-radius: 16px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            pointer-events: auto;
            animation: slideIn 0.3s ease-out;
            font-family: 'Cairo', sans-serif;
            min-width: 300px;
        ">
            <i class="fas ${icon}" style="
                font-size: 24px;
                color: ${color};
                flex-shrink: 0;
            "></i>
            <p style="
                color: #f1f5f9;
                margin: 0;
                font-size: 14px;
                flex: 1;
            ">${message}</p>
            <button onclick="this.closest('.notification').remove()" style="
                background: transparent;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                font-size: 18px;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.2s;
            " onmouseover="this.style.color='#f1f5f9'" onmouseout="this.style.color='#94a3b8'">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // إضافة الأنيميشن
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.getElementById('notificationStyles')) {
        style.id = 'notificationStyles';
        document.head.appendChild(style);
    }
    
    // إضافة الإشعار للحاوية
    const container = document.getElementById('notificationContainer');
    container.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد المدة المحددة
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// ====================================
// إشعارات مخصصة
// ====================================

/**
 * إشعار نجاح
 */
function notifySuccess(message, duration = 4000) {
    showNotification(message, 'success', duration);
}

/**
 * إشعار خطأ
 */
function notifyError(message, duration = 5000) {
    showNotification(message, 'error', duration);
}

/**
 * إشعار تحذير
 */
function notifyWarning(message, duration = 4500) {
    showNotification(message, 'warning', duration);
}

/**
 * إشعار معلومات
 */
function notifyInfo(message, duration = 4000) {
    showNotification(message, 'info', duration);
}

// ====================================
// إشعارات خاصة بالنظام
// ====================================

/**
 * إشعار دفعة جديدة
 */
function notifyNewPayment(amount, month) {
    notifyInfo(`💰 فاتورة جديدة: ${amount} ج.م لشهر ${month}`);
}

/**
 * إشعار دفعة ناجحة
 */
function notifyPaymentSuccess(amount) {
    notifySuccess(`✅ تم الدفع بنجاح! المبلغ: ${amount} ج.م`);
}

/**
 * إشعار شكوى جديدة
 */
function notifyNewComplaint(complaintNumber) {
    notifySuccess(`📝 تم استقبال شكواك برقم: ${complaintNumber}`);
}

/**
 * إشعار رد على شكوى
 */
function notifyComplaintReply(complaintNumber) {
    notifyInfo(`💬 رد جديد على شكواك رقم: ${complaintNumber}`);
}

/**
 * إشعار تحديث حالة شكوى
 */
function notifyComplaintStatusUpdate(complaintNumber, status) {
    const statusText = {
        'قيد المعالجة': 'قيد المعالجة',
        'محلولة': 'تم الحل',
        'مغلقة': 'مغلقة'
    };
    notifyInfo(`🔄 شكواك رقم ${complaintNumber} الآن: ${statusText[status] || status}`);
}

/**
 * إشعار صيانة جديدة
 */
function notifyNewMaintenance(type, date) {
    notifyInfo(`🔧 صيانة جديدة: ${type} في ${date}`);
}

/**
 * إشعار تذكير بموعد صيانة
 */
function notifyMaintenanceReminder(type, date) {
    notifyWarning(`⏰ تذكير: صيانة ${type} غداً في ${date}`);
}

// ====================================
// نظام قائمة الإشعارات (Dropdown)
// ====================================

function toggleNotificationsDropdown(event) {
    if (event) event.stopPropagation();
    
    let dropdown = document.getElementById('notificationsDropdown');
    
    if (dropdown) {
        dropdown.classList.toggle('active');
        return;
    }
    
    // إنشاء القائمة إذا لم تكن موجودة
    dropdown = document.createElement('div');
    dropdown.id = 'notificationsDropdown';
    dropdown.className = 'notifications-dropdown';
    
    // إضافة الستايل للقائمة
    if (!document.getElementById('dropdownStyles')) {
        const style = document.createElement('style');
        style.id = 'dropdownStyles';
        style.textContent = `
            .notifications-dropdown {
                position: absolute;
                top: 60px;
                left: 20px;
                width: 320px;
                background: #1e293b;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: none;
                flex-direction: column;
                overflow: hidden;
                font-family: 'Cairo', sans-serif;
            }
            .notifications-dropdown.active {
                display: flex;
            }
            .dropdown-header {
                padding: 16px;
                background: rgba(255, 255, 255, 0.03);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .dropdown-body {
                max-height: 400px;
                overflow-y: auto;
            }
            .notification-item {
                padding: 12px 16px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                display: flex;
                gap: 12px;
                transition: background 0.2s;
                cursor: pointer;
            }
            .notification-item:hover {
                background: rgba(99, 102, 241, 0.05);
            }
            .notification-item i {
                margin-top: 4px;
            }
            .notification-content p {
                margin: 0;
                font-size: 13px;
                color: #f1f5f9;
            }
            .notification-content span {
                font-size: 10px;
                color: #94a3b8;
            }
            .dropdown-footer {
                padding: 12px;
                text-align: center;
                background: rgba(255, 255, 255, 0.03);
                border-top: 1px solid rgba(255, 255, 255, 0.05);
            }
            .dropdown-footer a {
                font-size: 12px;
                color: #6366f1;
                font-weight: bold;
                text-decoration: none;
            }
        `;
        document.head.appendChild(style);
    }
    
    // جلب الإشعارات (بيانات تجريبية حالياً)
    const notifications = [
        { icon: 'fa-money-bill', color: '#10b981', title: 'دفعة جديدة من وحدة 304', time: 'منذ 5 دقائق' },
        { icon: 'fa-exclamation-circle', color: '#f59e0b', title: 'شكوى جديدة من وحدة 205', time: 'منذ 15 دقيقة' },
        { icon: 'fa-wrench', color: '#6366f1', title: 'صيانة مكتملة للمصعد رقم 1', time: 'منذ ساعة' },
        { icon: 'fa-user-plus', color: '#8b5cf6', title: 'ساكن جديد في وحدة 102', time: 'منذ 3 ساعات' }
    ];
    
    dropdown.innerHTML = `
        <div class="dropdown-header">
            <h4 class="font-bold text-sm">الإشعارات</h4>
            <span class="text-[10px] bg-red-500 px-2 py-0.5 rounded-full font-bold">${notifications.length} جديد</span>
        </div>
        <div class="dropdown-body">
            ${notifications.map(n => `
                <div class="notification-item">
                    <i class="fas ${n.icon}" style="color: ${n.color}"></i>
                    <div class="notification-content">
                        <p>${n.title}</p>
                        <span>${n.time}</span>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="dropdown-footer">
            <a href="#">مشاهدة الكل</a>
        </div>
    `;
    
    // إضافة القائمة لزر الجرس
    const bellBtn = event.currentTarget;
    bellBtn.style.position = 'relative';
    bellBtn.appendChild(dropdown);
    
    // تفعيل القائمة
    setTimeout(() => dropdown.classList.add('active'), 0);
    
    // إغلاق عند النقر في أي مكان آخر
    document.addEventListener('click', function closeDropdown(e) {
        if (!dropdown.contains(e.target) && e.target !== bellBtn) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}
function notifyNewVote(title) {
    notifyInfo(`🗳️ تصويت جديد: ${title}`);
}

/**
 * إشعار انتهاء موعد تصويت
 */
function notifyVoteEnding(title, hours) {
    notifyWarning(`⏳ التصويت "${title}" ينتهي خلال ${hours} ساعة`);
}

/**
 * إشعار موعد دفع قريب
 */
function notifyPaymentDue(days, amount) {
    notifyWarning(`⚠️ موعد الدفع بعد ${days} أيام - المبلغ: ${amount} ج.م`);
}

/**
 * إشعار موعد دفع متأخر
 */
function notifyPaymentOverdue(days, amount) {
    notifyError(`🚨 الدفع متأخر ${days} يوم - المبلغ: ${amount} ج.م`);
}

/**
 * إشعار اجتماع قادم
 */
function notifyUpcomingMeeting(date, time) {
    notifyInfo(`📅 اجتماع الجمعية العمومية: ${date} الساعة ${time}`);
}

/**
 * إشعار مستخدم جديد (للأدمن)
 */
function notifyNewResident(name, unit) {
    notifySuccess(`👤 مستخدم جديد: ${name} - الوحدة ${unit}`);
}

/**
 * إشعار تسجيل دخول ناجح
 */
function notifyLoginSuccess(userName) {
    notifySuccess(`👋 مرحباً ${userName}! تم تسجيل الدخول بنجاح`);
}

/**
 * إشعار تسجيل خروج
 */
function notifyLogout() {
    notifyInfo(`👋 تم تسجيل الخروج بنجاح`);
}

// ====================================
// إشعارات متعددة
// ====================================

/**
 * عرض عدة إشعارات بالتتابع
 */
function showMultipleNotifications(notifications, delay = 500) {
    notifications.forEach((notif, index) => {
        setTimeout(() => {
            showNotification(notif.message, notif.type, notif.duration);
        }, index * delay);
    });
}

// ====================================
// تهيئة تلقائية
// ====================================

// إنشاء الحاوية عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNotificationContainer);
} else {
    createNotificationContainer();
}

// ====================================
// تصدير الوظائف
// ====================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        notifySuccess,
        notifyError,
        notifyWarning,
        notifyInfo,
        notifyNewPayment,
        notifyPaymentSuccess,
        notifyNewComplaint,
        notifyComplaintReply,
        notifyComplaintStatusUpdate,
        notifyNewMaintenance,
        notifyMaintenanceReminder,
        notifyNewVote,
        notifyVoteEnding,
        notifyPaymentDue,
        notifyPaymentOverdue,
        notifyUpcomingMeeting,
        notifyNewResident,
        notifyLoginSuccess,
        notifyLogout,
        showMultipleNotifications
    };
}
