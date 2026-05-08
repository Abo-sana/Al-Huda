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
    sidebar.className = 'fixed right-0 top-0 h-full w-80 bg-slate-900 border-l border-white/10 transform translate-x-full transition-transform duration-300 z-[100] shadow-2xl shadow-black/50';
    
    const basePath = getBasePath();
    const user = getCurrentUser();
    
    let menuHTML = `
        <div class="flex flex-col h-full bg-[#0f172a]">
            <!-- Header -->
            <div class="p-6 border-b border-white/5 bg-slate-900/50">
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <i class="fas fa-user text-white text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-black text-white leading-none">مرحباً</h2>
                            <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-2">الوحدة ${user.unitNumber}</p>
                        </div>
                    </div>
                    <button onclick="toggleUserSidebar()" class="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            </div>
            
            <!-- Menu Items -->
            <div class="flex-1 overflow-y-auto p-4 space-y-2">
    `;
    
    userNavigationMenu.forEach(item => {
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
