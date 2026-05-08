// بوابة الهدى الرقمية - نظام التنقل

// Check authentication
function checkAuth() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const currentPage = window.location.pathname;
    
    if (!loggedIn && !currentPage.includes('login.html') && !currentPage.includes('index.html')) {
        window.location.href = '../login.html';
    }
}

// Logout function
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        sessionStorage.clear();
        window.location.href = '../login.html';
    }
}

// Get unit number
function getUnitNumber() {
    return sessionStorage.getItem('unitNumber') || '304';
}

// Check if user is admin
function isAdmin() {
    return sessionStorage.getItem('isAdmin') === 'true';
}

// Get base path for navigation
function getBasePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return './';
    }
    return './pages/';
}

// Navigation menu data
const navigationMenu = [
    {
        name: 'الرئيسية',
        icon: 'fa-home',
        url: '../index.html',
        isExternal: true
    },
    {
        name: 'لوحة التحكم',
        icon: 'fa-tachometer-alt',
        page: 'dashboard.html'
    },
    {
        name: 'السكان',
        icon: 'fa-users',
        page: 'residents.html'
    },
    {
        name: 'المدفوعات',
        icon: 'fa-credit-card',
        page: 'payments.html'
    },
    {
        name: 'الشكاوى',
        icon: 'fa-exclamation-circle',
        page: 'complaints.html'
    },
    {
        name: 'الصيانة',
        icon: 'fa-wrench',
        page: 'maintenance.html'
    },
    {
        name: 'الجمعية العمومية',
        icon: 'fa-vote-yea',
        page: 'voting.html',
        badge: 'جديد'
    },
    {
        name: 'لوحة الإدارة',
        icon: 'fa-user-shield',
        page: 'admin-dashboard.html',
        badge: 'إدارة',
        adminOnly: true
    }
];

// Create navigation sidebar
function createNavigationSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'navigationSidebar';
    sidebar.className = 'fixed right-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-md border-l border-white/10 transform translate-x-full transition-transform duration-300 z-50';
    
    let menuHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-xl font-bold text-indigo-400">القائمة</h2>
                <button onclick="toggleSidebar()" class="text-2xl text-slate-400 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="space-y-2">
    `;
    
    const basePath = getBasePath();
    
    navigationMenu.forEach(item => {
        // Skip admin-only items for regular users
        if (item.adminOnly && !isAdmin()) {
            return;
        }
        
        const badgeHTML = item.badge ? `<span class="text-xs px-2 py-1 bg-indigo-600 rounded-full">${item.badge}</span>` : '';
        const url = item.isExternal ? item.url : basePath + item.page;
        
        menuHTML += `
            <a href="${url}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600/20 transition-all">
                <i class="fas ${item.icon} text-indigo-400"></i>
                <span class="font-bold flex-1">${item.name}</span>
                ${badgeHTML}
            </a>
        `;
    });
    
    menuHTML += `
            </div>
            
            <div class="mt-8 pt-8 border-t border-white/10">
                <button onclick="logout()" class="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600/20 hover:bg-red-600/40 transition-all text-red-400">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="font-bold">تسجيل الخروج</span>
                </button>
            </div>
        </div>
    `;
    
    sidebar.innerHTML = menuHTML;
    document.body.appendChild(sidebar);
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('navigationSidebar');
    if (sidebar) {
        sidebar.classList.toggle('translate-x-full');
    }
}

// Add menu button to navbar
function addMenuButton() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        const menuButton = document.createElement('button');
        menuButton.className = 'fixed left-4 top-4 z-40 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-lg transition-all';
        menuButton.innerHTML = '<i class="fas fa-bars text-white text-xl"></i>';
        menuButton.onclick = toggleSidebar;
        document.body.appendChild(menuButton);
    }
}

// Initialize navigation
function initNavigation() {
    checkAuth();
    createNavigationSidebar();
    addMenuButton();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('navigationSidebar');
    const menuButton = event.target.closest('button');
    
    if (sidebar && !sidebar.contains(event.target) && !menuButton) {
        if (!sidebar.classList.contains('translate-x-full')) {
            toggleSidebar();
        }
    }
});
