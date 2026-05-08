// بوابة الهدى الرقمية - نظام الثيمات
// Al-Huda Gateway - Theme System

/**
 * نظام تبديل بين الوضع الداكن والفاتح
 */

// ====================================
// الثيمات المتاحة
// ====================================

const themes = {
    dark: {
        name: 'dark',
        label: 'داكن',
        icon: 'fa-moon',
        colors: {
            primary: '#6366f1',
            secondary: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
            darkBg: '#0f172a',
            cardBg: 'rgba(30, 41, 59, 0.7)',
            textPrimary: '#f1f5f9',
            textSecondary: '#94a3b8',
            border: 'rgba(255, 255, 255, 0.1)'
        }
    },
    light: {
        name: 'light',
        label: 'فاتح',
        icon: 'fa-sun',
        colors: {
            primary: '#6366f1',
            secondary: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
            darkBg: '#f8fafc',
            cardBg: 'rgba(255, 255, 255, 0.9)',
            textPrimary: '#1e293b',
            textSecondary: '#64748b',
            border: 'rgba(0, 0, 0, 0.1)'
        }
    }
};

// ====================================
// الحصول على الثيم الحالي
// ====================================

function getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// ====================================
// تطبيق الثيم
// ====================================

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    
    // تطبيق الألوان
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
    
    // إضافة/إزالة كلاس
    if (themeName === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }
    
    // حفظ الاختيار
    localStorage.setItem('theme', themeName);
    
    // تحديث أيقونة الزر
    updateThemeButton(themeName);
}

// ====================================
// تبديل الثيم
// ====================================

function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    
    // إشعار
    const themeLabel = themes[newTheme].label;
    notifyInfo(`تم التبديل للوضع ${themeLabel}`);
}

// ====================================
// تحديث زر الثيم
// ====================================

function updateThemeButton(themeName) {
    const button = document.getElementById('themeToggle');
    if (!button) return;
    
    const theme = themes[themeName];
    const nextTheme = themeName === 'dark' ? themes.light : themes.dark;
    
    button.innerHTML = `<i class="fas ${nextTheme.icon}"></i>`;
    button.title = `التبديل للوضع ${nextTheme.label}`;
}

// ====================================
// إنشاء زر الثيم
// ====================================

function createThemeButton() {
    // التحقق من وجود الزر
    if (document.getElementById('themeToggle')) return;
    
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'dark' ? themes.light : themes.dark;
    
    const button = document.createElement('button');
    button.id = 'themeToggle';
    button.className = 'theme-toggle-btn';
    button.innerHTML = `<i class="fas ${nextTheme.icon}"></i>`;
    button.title = `التبديل للوضع ${nextTheme.label}`;
    button.onclick = toggleTheme;
    
    button.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // تأثيرات hover
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1) rotate(15deg)';
        button.style.boxShadow = '0 6px 30px rgba(99, 102, 241, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) rotate(0deg)';
        button.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
    });
    
    document.body.appendChild(button);
}

// ====================================
// أنماط الوضع الفاتح
// ====================================

function injectLightModeStyles() {
    if (document.getElementById('lightModeStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'lightModeStyles';
    style.textContent = `
        /* الوضع الفاتح */
        body.light-mode {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
            color: #1e293b !important;
        }
        
        body.light-mode .glass-card {
            background: rgba(255, 255, 255, 0.9) !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
        }
        
        body.light-mode .glass-card:hover {
            border-color: rgba(99, 102, 241, 0.3) !important;
        }
        
        body.light-mode .form-input {
            background: rgba(255, 255, 255, 0.8) !important;
            border: 1px solid rgba(99, 102, 241, 0.2) !important;
            color: #1e293b !important;
        }
        
        body.light-mode .form-input:focus {
            background: rgba(255, 255, 255, 1) !important;
        }
        
        body.light-mode .stat-box {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1)) !important;
            border: 1px solid rgba(99, 102, 241, 0.2) !important;
        }
        
        body.light-mode .invoice-card,
        body.light-mode .complaint-item,
        body.light-mode .maintenance-card {
            background: rgba(99, 102, 241, 0.05) !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
        }
        
        body.light-mode .invoice-card:hover,
        body.light-mode .complaint-item:hover,
        body.light-mode .maintenance-card:hover {
            background: rgba(99, 102, 241, 0.1) !important;
        }
        
        body.light-mode nav {
            background: rgba(255, 255, 255, 0.8) !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode .text-slate-400 {
            color: #64748b !important;
        }
        
        body.light-mode .text-slate-300 {
            color: #475569 !important;
        }
        
        body.light-mode .bg-slate-800 {
            background: rgba(226, 232, 240, 0.5) !important;
        }
        
        body.light-mode .bg-slate-900 {
            background: rgba(241, 245, 249, 0.8) !important;
        }
        
        body.light-mode .modal {
            background: rgba(0, 0, 0, 0.5) !important;
        }
        
        body.light-mode .modal-content {
            background: #ffffff !important;
            border: 1px solid rgba(99, 102, 241, 0.3) !important;
        }
        
        body.light-mode .vote-card {
            background: rgba(99, 102, 241, 0.05) !important;
            border: 2px solid rgba(99, 102, 241, 0.2) !important;
        }
        
        body.light-mode .vote-option {
            background: rgba(255, 255, 255, 0.8) !important;
            border: 2px solid rgba(99, 102, 241, 0.2) !important;
        }
        
        body.light-mode .document-item {
            background: rgba(226, 232, 240, 0.5) !important;
        }
        
        body.light-mode .meeting-card {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1)) !important;
            border: 1px solid rgba(99, 102, 241, 0.2) !important;
        }
        
        /* تحسين التباين في الوضع الفاتح */
        body.light-mode h1,
        body.light-mode h2,
        body.light-mode h3,
        body.light-mode h4,
        body.light-mode .font-bold {
            color: #1e293b !important;
        }
        
        body.light-mode p {
            color: #334155 !important;
        }
        
        /* أنيميشن التبديل */
        body {
            transition: background 0.3s ease, color 0.3s ease;
        }
        
        .glass-card,
        .form-input,
        .stat-box,
        .invoice-card,
        .complaint-item,
        .maintenance-card {
            transition: all 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
}

// ====================================
// التهيئة التلقائية
// ====================================

function initTheme() {
    // إضافة الأنماط
    injectLightModeStyles();
    
    // تطبيق الثيم المحفوظ
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
    
    // إنشاء زر التبديل
    createThemeButton();
}

// تشغيل التهيئة عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// ====================================
// تصدير الوظائف
// ====================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCurrentTheme,
        applyTheme,
        toggleTheme,
        initTheme
    };
}
