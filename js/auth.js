// بوابة الهدى الرقمية - نظام المصادقة والصلاحيات
// Al-Huda Gateway - Authentication & Authorization System

/**
 * نظام المصادقة والتحقق من الصلاحيات
 * يفصل بين المستخدم العادي والأدمن بشكل كامل
 */

// ====================================
// التحقق من تسجيل الدخول
// ====================================

function checkAuth() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const currentPage = window.location.pathname;
    
    // السماح بالصفحات العامة
    const publicPages = ['login.html', 'index.html', 'error.html'];
    const isPublicPage = publicPages.some(page => currentPage.includes(page));
    
    if (!loggedIn && !isPublicPage) {
        // إعادة توجيه لصفحة تسجيل الدخول
        window.location.href = getLoginUrl();
        return false;
    }
    
    return true;
}

// ====================================
// التحقق من صلاحيات الأدمن
// ====================================

function checkAdminAuth() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    
    if (!loggedIn) {
        window.location.href = getLoginUrl();
        return false;
    }

    if (!isAdmin) {
        alert('⛔ غير مصرح لك بالوصول إلى هذه الصفحة!\nهذه الصفحة مخصصة للإدارة فقط.');
        window.location.href = getUserDashboardUrl();
        return false;
    }
    
    return true;
}

// ====================================
// التحقق من صلاحيات المستخدم
// ====================================

function checkUserAuth() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    
    if (!loggedIn) {
        window.location.href = getLoginUrl();
        return false;
    }

    if (isAdmin) {
        // إذا كان أدمن يحاول دخول صفحة مستخدم، لا نمنعه ولكن يفضل توجيهه
        // window.location.href = getAdminDashboardUrl();
        // return false;
    }
    
    return true;
}

// ====================================
// الحصول على معلومات المستخدم
// ====================================

function getCurrentUser() {
    return {
        unitNumber: sessionStorage.getItem('unitNumber'),
        isAdmin: sessionStorage.getItem('isAdmin') === 'true',
        loggedIn: sessionStorage.getItem('loggedIn') === 'true'
    };
}

function isAdmin() {
    return sessionStorage.getItem('isAdmin') === 'true';
}

function isUser() {
    return sessionStorage.getItem('loggedIn') === 'true' && !isAdmin();
}

function getUnitNumber() {
    return sessionStorage.getItem('unitNumber') || '';
}

// ====================================
// تسجيل الخروج
// ====================================

function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        sessionStorage.clear();
        window.location.href = getLoginUrl();
    }
}

// ====================================
// روابط التنقل
// ====================================

function getLoginUrl() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return '../login.html';
    }
    return './login.html';
}

function getUserDashboardUrl() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return './user-dashboard.html';
    }
    return './pages/user-dashboard.html';
}

function getAdminDashboardUrl() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return './admin-dashboard.html';
    }
    return './pages/admin-dashboard.html';
}

function getBasePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return './';
    }
    return './pages/';
}

// ====================================
// حماية الصفحات
// ====================================

/**
 * حماية صفحات المستخدم - تمنع الأدمن من الوصول
 */
function protectUserPage() {
    if (!checkUserAuth()) return;
    
    const user = getCurrentUser();
    
    // إذا كان أدمن، وجهه لصفحة الأدمن
    if (user.isAdmin) {
        alert('⚠️ أنت مسجل كمدير!\nسيتم توجيهك إلى لوحة تحكم الإدارة.');
        window.location.href = getAdminDashboardUrl();
        return false;
    }
    
    return true;
}

/**
 * حماية صفحات الأدمن - تمنع المستخدم العادي من الوصول
 */
function protectAdminPage() {
    if (!checkAuth()) return;
    
    const user = getCurrentUser();
    
    // إذا لم يكن أدمن، وجهه لصفحة المستخدم
    if (!user.isAdmin) {
        alert('⛔ غير مصرح لك بالوصول إلى هذه الصفحة!\nهذه الصفحة مخصصة للإدارة فقط.');
        window.location.href = getUserDashboardUrl();
        return false;
    }
    
    return true;
}

/**
 * حماية الصفحات المشتركة - يمكن للجميع الوصول
 */
function protectSharedPage() {
    return checkAuth();
}

// ====================================
// تسجيل الدخول
// ====================================

function loginUser(unitNumber, password) {
    // التحقق من بيانات المستخدم
    if (unitNumber === '304' && password === '123456') {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('unitNumber', unitNumber);
        sessionStorage.setItem('isAdmin', 'false');
        return { success: true, isAdmin: false };
    }
    
    // التحقق من بيانات الأدمن
    if (unitNumber === 'admin' && password === 'admin123') {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('unitNumber', 'admin');
        sessionStorage.setItem('isAdmin', 'true');
        return { success: true, isAdmin: true };
    }
    
    return { success: false, message: 'بيانات الدخول غير صحيحة' };
}

// ====================================
// التهيئة التلقائية
// ====================================

// حذف التحقق التلقائي الضعيف والسماح للصفحات بحماية نفسها
// سيتم استدعاء protectAdminPage() أو protectUserPage() داخل كل صفحة

// ====================================
// تصدير الوظائف
// ====================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkAuth,
        checkAdminAuth,
        checkUserAuth,
        protectUserPage,
        protectAdminPage,
        protectSharedPage,
        getCurrentUser,
        isAdmin,
        isUser,
        logout,
        loginUser
    };
}
