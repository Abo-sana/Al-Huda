// بوابة الهدى الرقمية - نظام التنقل للمستخدم
// Al-Huda Gateway - User Navigation System

/**
 * نظام التنقل الخاص بالمستخدم العادي فقط
 * لا يحتوي على صفحات الإدارة
 */

// ====================================
// قائمة التنقل للمستخدم
// ====================================

const userNavigationMenu = [
    {
        name: 'لوحة التحكم',
        icon: 'fa-tachometer-alt',
        page: 'user-dashboard.html',
        description: 'نظرة عامة على حسابك'
    },
    {
        name: 'المدفوعات',
        icon: 'fa-credit-card',
        page: 'payments.html',
        description: 'إدارة مدفوعاتك'
    },
    {
        name: 'الشكاوى',
        icon: 'fa-exclamation-circle',
        page: 'complaints.html',
        description: 'تقديم ومتابعة الشكاوى'
    },
    {
        name: 'الصيانة',
        icon: 'fa-wrench',
        page: 'maintenance.html',
        description: 'جدول الصيانة'
    },
    {
        name: 'الجمعية العمومية',
        icon: 'fa-vote-yea',
        page: 'voting.html',
        description: 'التصويت والاجتماعات',
        badge: 'جديد'
    }
];

// ====================================
// إنشاء القائمة الجانبية
// ====================================

function createUserSidebar() {
    // حذف القائمة القديمة إن وجدت
    const oldSidebar = document.getElementById('userNavigationSidebar');
    if (oldSidebar) oldSidebar.remove();
    
    const sidebar = document.createElement('div');
    sidebar.id = 'userNavigationSidebar';
    sidebar.className = 'fixed right-0 top-0 h-full w-72 bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-md border-l border-indigo-500/20 transform translate-x-full transition-transform duration-300 z-50 shadow-2xl';
    
    const basePath = getBasePath();
    const user = getCurrentUser();
    
    let menuHTML = `
        <div class="flex flex-col h-full">
            <!-- Header -->
            <div class="p-6 border-b border-indigo-500/20">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-lg font-bold text-white">مرحباً</h2>
                            <p class="text-xs text-indigo-300">الوحدة ${user.unitNumber}</p>
                        </div>
                    </div>
                    <button onclick="toggleUserSidebar()" class="text-2xl text-slate-400 hover:text-white transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <!-- Menu Items -->
            <div class="flex-1 overflow-y-auto p-4 space-y-2">
    `;
    
    userNavigationMenu.forEach(item => {
        const badgeHTML = item.badge ? 
            `<span class="text-xs px-2 py-1 bg-indigo-600 rounded-full">${item.badge}</span>` : '';
        const url = basePath + item.page;
        const isActive = window.location.pathname.includes(item.page);
        const activeClass = isActive ? 'bg-indigo-600/30 border-indigo-500' : 'hover:bg-indigo-600/10';
        
        menuHTML += `
            <a href="${url}" class="block p-4 rounded-xl ${activeClass} border border-transparent hover:border-indigo-500/30 transition-all group">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-600/40 transition-colors">
                        <i class="fas ${item.icon} text-indigo-400 text-lg"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-white">${item.name}</span>
                            ${badgeHTML}
                        </div>
                        <p class="text-xs text-slate-400 mt-1">${item.description}</p>
                    </div>
                    <i class="fas fa-chevron-left text-slate-600 group-hover:text-indigo-400 transition-colors"></i>
                </div>
            </a>
        `;
    });
    
    menuHTML += `
            </div>
            
            <!-- Footer -->
            <div class="p-4 border-t border-indigo-500/20 space-y-2">
                <div class="p-3 bg-indigo-600/10 rounded-lg border border-indigo-500/20">
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-info-circle text-indigo-400"></i>
                        <span class="text-slate-300">للمساعدة: 0123456789</span>
                    </div>
                </div>
                
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

function createUserMenuButton() {
    // حذف الزر القديم إن وجد
    const oldButton = document.getElementById('userMenuButton');
    if (oldButton) oldButton.remove();
    
    const menuButton = document.createElement('button');
    menuButton.id = 'userMenuButton';
    menuButton.className = 'fixed right-4 bottom-4 z-50 w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-indigo-500/50 transition-all hover:scale-110';
    menuButton.innerHTML = `
        <div class="text-center">
            <i class="fas fa-bars text-white text-2xl"></i>
        </div>
    `;
    menuButton.onclick = toggleUserSidebar;
    
    // إضافة تلميح
    menuButton.title = 'القائمة - اضغط للتنقل';
    
    document.body.appendChild(menuButton);
}

// ====================================
// التحكم في القائمة
// ====================================

function toggleUserSidebar() {
    const sidebar = document.getElementById('userNavigationSidebar');
    if (sidebar) {
        sidebar.classList.toggle('translate-x-full');
    }
}

function closeUserSidebar() {
    const sidebar = document.getElementById('userNavigationSidebar');
    if (sidebar && !sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.add('translate-x-full');
    }
}

// ====================================
// التهيئة
// ====================================

function initUserNavigation() {
    // التحقق من أن المستخدم ليس أدمن
    if (isAdmin()) {
        console.warn('User navigation loaded for admin user');
        return;
    }
    
    createUserSidebar();
    createUserMenuButton();
    createBackButton(); // إضافة زر الرجوع
}

// ====================================
// زر الرجوع
// ====================================

function createBackButton() {
    // حذف الزر القديم إن وجد
    const oldButton = document.getElementById('backButton');
    if (oldButton) oldButton.remove();
    
    const backButton = document.createElement('button');
    backButton.id = 'backButton';
    backButton.className = 'fixed left-4 bottom-4 z-50 w-14 h-14 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-slate-600';
    backButton.innerHTML = `
        <i class="fas fa-home text-white text-xl"></i>
    `;
    backButton.onclick = () => {
        window.location.href = './user-dashboard.html';
    };
    backButton.title = 'الرئيسية';
    
    // إخفاء الزر في لوحة التحكم
    if (window.location.pathname.includes('user-dashboard.html')) {
        backButton.style.display = 'none';
    }
    
    document.body.appendChild(backButton);
}

// ====================================
// إغلاق القائمة عند النقر خارجها
// ====================================

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('userNavigationSidebar');
    const menuButton = document.getElementById('userMenuButton');
    
    if (sidebar && menuButton) {
        const clickedInsideSidebar = sidebar.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);
        
        if (!clickedInsideSidebar && !clickedMenuButton) {
            closeUserSidebar();
        }
    }
});

// ====================================
// التشغيل التلقائي
// ====================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserNavigation);
} else {
    initUserNavigation();
}
