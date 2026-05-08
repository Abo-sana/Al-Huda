// بوابة الهدى الرقمية - نظام التنقل للإدارة
// Al-Huda Gateway - Admin Navigation System

/**
 * نظام التنقل الخاص بالإدارة فقط
 * يحتوي على جميع صفحات الإدارة والمراقبة
 */

// ====================================
// قائمة التنقل للإدارة
// ====================================

const adminNavigationMenu = [
    {
        name: 'لوحة الإدارة',
        icon: 'fa-chart-line',
        page: 'admin-dashboard.html',
        description: 'نظرة شاملة على النظام',
        color: 'indigo'
    },
    {
        name: 'إدارة السكان',
        icon: 'fa-users',
        page: 'residents.html',
        description: 'إدارة السكان والوحدات',
        color: 'blue'
    },
    {
        name: 'إدارة المدفوعات',
        icon: 'fa-money-bill-wave',
        page: 'payments.html',
        description: 'متابعة المدفوعات والإيرادات',
        color: 'emerald'
    },
    {
        name: 'إدارة الشكاوى',
        icon: 'fa-exclamation-triangle',
        page: 'complaints.html',
        description: 'معالجة الشكاوى والطلبات',
        color: 'orange'
    },
    {
        name: 'إدارة الصيانة',
        icon: 'fa-tools',
        page: 'maintenance.html',
        description: 'جدولة ومتابعة الصيانة',
        color: 'purple'
    },
    {
        name: 'الجمعية العمومية',
        icon: 'fa-vote-yea',
        page: 'voting.html',
        description: 'إدارة التصويت والاجتماعات',
        color: 'pink',
        badge: 'جديد'
    },
    {
        name: 'مركز التقارير',
        icon: 'fa-file-invoice-dollar',
        page: 'reports.html',
        description: 'تقارير مالية وإحصائية كاملة',
        color: 'indigo',
        badge: 'ذكية'
    }
];

// ====================================
// إحصائيات سريعة للإدارة
// ====================================

function getAdminQuickStats() {
    if (typeof dataManager === 'undefined') {
        return null;
    }
    
    const stats = dataManager.getStatistics();
    return {
        totalResidents: stats.totalResidents || 0,
        activeComplaints: stats.activeComplaints || 0,
        pendingPayments: stats.pendingPayments || 0,
        activeMaintenance: stats.activeMaintenance || 0
    };
}

// ====================================
// إنشاء القائمة الجانبية
// ====================================

function createAdminSidebar() {
    // حذف القائمة القديمة إن وجدت
    const oldSidebar = document.getElementById('adminNavigationSidebar');
    if (oldSidebar) oldSidebar.remove();
    
    const sidebar = document.createElement('div');
    sidebar.id = 'adminNavigationSidebar';
    sidebar.className = 'fixed right-0 top-0 h-full w-80 bg-slate-900 border-l border-white/10 transform translate-x-full transition-transform duration-300 z-[100] shadow-2xl shadow-black/50';
    
    const basePath = getBasePath();
    const stats = getAdminQuickStats();
    
    let menuHTML = `
        <div class="flex flex-col h-full bg-[#0f172a]">
            <!-- Header -->
            <div class="p-6 border-b border-white/5 bg-slate-900/50">
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <i class="fas fa-user-shield text-white text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-black text-white leading-none">لوحة الإدارة</h2>
                            <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-2">Administrator</p>
                        </div>
                    </div>
                    <button onclick="toggleAdminSidebar()" class="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
                
                <!-- Quick Stats -->
                ${stats ? `
                <div class="grid grid-cols-2 gap-2 mt-4">
                    <div class="bg-slate-800/50 rounded-lg p-2 border border-indigo-500/20">
                        <div class="text-xs text-slate-400">السكان</div>
                        <div class="text-lg font-bold text-white">${stats.totalResidents}</div>
                    </div>
                    <div class="bg-slate-800/50 rounded-lg p-2 border border-orange-500/20">
                        <div class="text-xs text-slate-400">شكاوى نشطة</div>
                        <div class="text-lg font-bold text-orange-400">${stats.activeComplaints}</div>
                    </div>
                    <div class="bg-slate-800/50 rounded-lg p-2 border border-emerald-500/20">
                        <div class="text-xs text-slate-400">مدفوعات معلقة</div>
                        <div class="text-lg font-bold text-emerald-400">${stats.pendingPayments}</div>
                    </div>
                    <div class="bg-slate-800/50 rounded-lg p-2 border border-purple-500/20">
                        <div class="text-xs text-slate-400">صيانة نشطة</div>
                        <div class="text-lg font-bold text-purple-400">${stats.activeMaintenance}</div>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <!-- Menu Items -->
            <div class="flex-1 overflow-y-auto p-4 space-y-2">
    `;
    
    adminNavigationMenu.forEach(item => {
        const badgeHTML = item.badge ? 
            `<span class="text-[9px] px-2 py-0.5 bg-indigo-600 text-white rounded-full font-black uppercase ml-2">${item.badge}</span>` : '';
        const url = basePath + item.page;
        const isActive = window.location.pathname.includes(item.page);
        const activeClass = isActive ? 'bg-indigo-600/10 border-indigo-500/50' : 'border-transparent hover:bg-white/5';
        
        menuHTML += `
            <a href="${url}" class="block p-4 rounded-2xl ${activeClass} border transition-all group">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-all">
                        <i class="fas ${item.icon} text-slate-400 group-hover:text-indigo-400 text-lg transition-colors"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center">
                            <span class="font-bold text-slate-200 group-hover:text-white transition-colors">${item.name}</span>
                            ${badgeHTML}
                        </div>
                        <p class="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors mt-1">${item.description}</p>
                    </div>
                    <i class="fas fa-chevron-left text-slate-700 group-hover:text-indigo-500 text-xs transition-all transform group-hover:-translate-x-1"></i>
                </div>
            </a>
        `;
    });
    
    menuHTML += `
            </div>
            
            <!-- Footer -->
            <div class="p-4 border-t border-indigo-500/30 space-y-2 bg-slate-900/50">
                <!-- Quick Actions -->
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <button onclick="window.location.href='${basePath}residents.html'" class="p-2 bg-indigo-600/20 hover:bg-indigo-600/40 rounded-lg text-xs text-indigo-300 border border-indigo-500/20 transition-all">
                        <i class="fas fa-user-plus mr-1"></i> إضافة ساكن
                    </button>
                    <button onclick="window.location.href='${basePath}payments.html'" class="p-2 bg-emerald-600/20 hover:bg-emerald-600/40 rounded-lg text-xs text-emerald-300 border border-emerald-500/20 transition-all">
                        <i class="fas fa-file-invoice mr-1"></i> إصدار فاتورة
                    </button>
                </div>
                
                <!-- Contact Info -->
                <div class="p-3 bg-indigo-600/10 rounded-lg border border-indigo-500/20">
                    <div class="flex items-center gap-2 text-xs">
                        <i class="fas fa-headset text-indigo-400"></i>
                        <span class="text-slate-300">الدعم الفني: 0123456789</span>
                    </div>
                </div>
                
                <!-- Logout -->
                <button onclick="logout()" class="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-red-600/20 hover:bg-red-600/40 transition-all text-red-400 border border-red-500/20 hover:border-red-500/40">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="font-bold">تسجيل الخروج</span>
                </button>
            </div>
        </div>
    `;
    
    sidebar.innerHTML = menuHTML;
    document.body.appendChild(sidebar);
}

// ====================================
// زر القائمة
// ====================================

function createAdminMenuButton() {
    // حذف الزر القديم إن وجد
    const oldButton = document.getElementById('adminMenuButton');
    if (oldButton) oldButton.remove();
    
    const menuButton = document.createElement('button');
    menuButton.id = 'adminMenuButton';
    menuButton.className = 'fixed right-4 bottom-4 z-50 w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-110';
    menuButton.innerHTML = `
        <div class="text-center">
            <i class="fas fa-bars text-white text-2xl"></i>
        </div>
    `;
    menuButton.onclick = toggleAdminSidebar;
    
    // إضافة تلميح
    menuButton.title = 'القائمة - اضغط للتنقل';
    
    // إضافة badge للإشعارات
    const stats = getAdminQuickStats();
    if (stats && stats.activeComplaints > 0) {
        const badge = document.createElement('span');
        badge.className = 'absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-slate-900 animate-bounce';
        badge.textContent = stats.activeComplaints;
        menuButton.appendChild(badge);
    }
    
    document.body.appendChild(menuButton);
}

// ====================================
// التحكم في القائمة
// ====================================

function toggleAdminSidebar() {
    const sidebar = document.getElementById('adminNavigationSidebar');
    if (sidebar) {
        sidebar.classList.toggle('translate-x-full');
    }
}

function closeAdminSidebar() {
    const sidebar = document.getElementById('adminNavigationSidebar');
    if (sidebar && !sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('translate-x-full');
    }
}

// ====================================
// زر الرجوع
// ====================================

function createAdminBackButton() {
    // حذف الزر القديم إن وجد
    const oldButton = document.getElementById('adminBackButton');
    if (oldButton) oldButton.remove();
    
    const backButton = document.createElement('button');
    backButton.id = 'adminBackButton';
    backButton.className = 'fixed left-4 bottom-4 z-50 w-14 h-14 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-slate-600';
    backButton.innerHTML = `
        <i class="fas fa-home text-white text-xl"></i>
    `;
    backButton.onclick = () => {
        window.location.href = './admin-dashboard.html';
    };
    backButton.title = 'الرئيسية';
    
    // إخفاء الزر في لوحة التحكم
    if (window.location.pathname.includes('admin-dashboard.html')) {
        backButton.style.display = 'none';
    }
    
    document.body.appendChild(backButton);
}

// ====================================
// التهيئة
// ====================================

function initAdminNavigation() {
    // التحقق من أن المستخدم أدمن
    if (!isAdmin()) {
        console.warn('Admin navigation loaded for non-admin user');
        return;
    }
    
    createAdminSidebar();
    createAdminMenuButton();
    createAdminBackButton();
}

// ====================================
// إغلاق القائمة عند النقر خارجها
// ====================================

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('adminNavigationSidebar');
    const menuButton = document.getElementById('adminMenuButton');
    
    if (sidebar && menuButton) {
        const clickedInsideSidebar = sidebar.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);
        
        if (!clickedInsideSidebar && !clickedMenuButton) {
            closeAdminSidebar();
        }
    }
});

// ====================================
// التشغيل التلقائي
// ====================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminNavigation);
} else {
    initAdminNavigation();
}

// ====================================
// التهيئة
// ====================================

function initAdminNavigation() {
    // التحقق من أن المستخدم أدمن
    if (!isAdmin()) {
        console.warn('Admin navigation loaded for non-admin user');
        return;
    }
    
    createAdminSidebar();
    createAdminMenuButton();
    createAdminBackButton(); // إضافة زر الرجوع
}

// ====================================
// زر الرجوع للأدمن
// ====================================

function createAdminBackButton() {
    // حذف الزر القديم إن وجد
    const oldButton = document.getElementById('backButton');
    if (oldButton) oldButton.remove();
    
    const backButton = document.createElement('button');
    backButton.id = 'backButton';
    backButton.className = 'fixed right-4 top-4 z-50 px-4 py-2 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 backdrop-blur-md rounded-full flex items-center gap-2 shadow-lg transition-all hover:scale-105 border border-indigo-400/30';
    backButton.innerHTML = `
        <i class="fas fa-arrow-right text-white"></i>
        <span class="text-white text-sm font-bold">رجوع</span>
    `;
    backButton.onclick = () => {
        window.location.href = './admin-dashboard.html';
    };
    backButton.title = 'العودة للوحة الإدارة';
    
    // إخفاء الزر في لوحة الإدارة
    if (window.location.pathname.includes('admin-dashboard.html')) {
        backButton.style.display = 'none';
    }
    
    document.body.appendChild(backButton);
}

// ====================================
// إغلاق القائمة عند النقر خارجها
// ====================================

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('adminNavigationSidebar');
    const menuButton = document.getElementById('adminMenuButton');
    
    if (sidebar && menuButton) {
        const clickedInsideSidebar = sidebar.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);
        
        if (!clickedInsideSidebar && !clickedMenuButton) {
            closeAdminSidebar();
        }
    }
});

// ====================================
// التشغيل التلقائي
// ====================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminNavigation);
} else {
    initAdminNavigation();
}
