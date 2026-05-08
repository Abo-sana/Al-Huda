// بوابة الهدى الرقمية - نظام التنقل للمستخدم
// Al-Huda Gateway - User Navigation System

/**
 * نظام التنقل الخاص بالمستخدم العادي فقط
 */

// ====================================
// المساعدات
// ====================================

function getUserBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
        return './';
    }
    return 'pages/';
}

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

function createUserSidebar() {
    const oldSidebar = document.getElementById('userNavigationSidebar');
    if (oldSidebar) oldSidebar.remove();
    
    const sidebar = document.createElement('div');
    sidebar.id = 'userNavigationSidebar';
    sidebar.className = 'fixed right-0 top-0 h-full w-80 bg-slate-900 border-l border-white/10 transform translate-x-full transition-transform duration-300 z-[100] shadow-2xl shadow-black/50';
    
    const basePath = getUserBasePath();
    const unitNumber = sessionStorage.getItem('unitNumber') || '---';
    
    let menuHTML = `
        <div class="flex flex-col h-full bg-[#0f172a]">
            <div class="p-6 border-b border-white/5 bg-slate-900/50">
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <i class="fas fa-user text-white text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-black text-white leading-none">مرحباً</h2>
                            <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-2">الوحدة ${unitNumber}</p>
                        </div>
                    </div>
                    <button onclick="toggleUserSidebar()" class="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-2">
    `;
    
    userNavigationMenu.forEach(item => {
        const badgeHTML = item.badge ? `<span class="text-[9px] px-2 py-0.5 bg-indigo-600 text-white rounded-full font-black ml-2">${item.badge}</span>` : '';
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
                            <span class="font-bold text-slate-200 group-hover:text-white transition-colors text-sm">${item.name}</span>
                            ${badgeHTML}
                        </div>
                        <p class="text-[10px] text-slate-500 group-hover:text-slate-400 mt-1">${item.description}</p>
                    </div>
                    <i class="fas fa-chevron-left text-slate-700 group-hover:text-indigo-500 text-xs transition-all transform group-hover:-translate-x-1"></i>
                </div>
            </a>
        `;
    });
    
    menuHTML += `
            </div>
            <div class="p-4 border-t border-white/5 bg-slate-900/50 space-y-2">
                <button onclick="logout()" class="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-red-600/10 hover:bg-red-600/20 transition-all text-red-400 border border-red-500/20">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="font-bold text-sm">تسجيل الخروج</span>
                </button>
            </div>
        </div>
    `;
    
    sidebar.innerHTML = menuHTML;
    document.body.appendChild(sidebar);
}

function createUserMenuButton() {
    const oldButton = document.getElementById('userMenuButton');
    if (oldButton) oldButton.remove();
    
    const menuButton = document.createElement('button');
    menuButton.id = 'userMenuButton';
    menuButton.className = 'fixed right-4 bottom-4 z-50 w-16 h-16 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110';
    menuButton.innerHTML = `<i class="fas fa-bars text-white text-2xl"></i>`;
    menuButton.onclick = toggleUserSidebar;
    document.body.appendChild(menuButton);
}

function createUserBackButton() {
    const oldButton = document.getElementById('userBackButton');
    if (oldButton) oldButton.remove();
    
    const backButton = document.createElement('button');
    backButton.id = 'userBackButton';
    backButton.className = 'fixed left-4 bottom-4 z-50 w-14 h-14 bg-slate-800/90 hover:bg-slate-700 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/10';
    backButton.innerHTML = `<i class="fas fa-home text-white text-xl"></i>`;
    backButton.onclick = () => window.location.href = getUserBasePath() + 'user-dashboard.html';
    
    if (window.location.pathname.includes('user-dashboard.html')) backButton.style.display = 'none';
    document.body.appendChild(backButton);
}

function toggleUserSidebar() {
    const sidebar = document.getElementById('userNavigationSidebar');
    if (sidebar) sidebar.classList.toggle('translate-x-full');
}

function initUserNavigation() {
    if (isAdmin()) return;
    createUserSidebar();
    createUserMenuButton();
    createUserBackButton();
}

document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('userNavigationSidebar');
    const btn = document.getElementById('userMenuButton');
    if (sidebar && btn && !sidebar.contains(e.target) && !btn.contains(e.target)) {
        sidebar.classList.add('translate-x-full');
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserNavigation);
} else {
    initUserNavigation();
}
