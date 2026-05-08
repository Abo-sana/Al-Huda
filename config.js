// بوابة الهدى الرقمية - ملف الإعدادات

const CONFIG = {
    // معلومات البرج
    building: {
        name: 'برج الهدى',
        nameEn: 'Al-Huda Tower',
        address: 'القاهرة، مصر',
        phone: '0123456789',
        email: 'info@alhuda-tower.com',
        totalUnits: 45,
        floors: 10
    },

    // إعدادات النظام
    system: {
        version: '1.0.2',
        releaseDate: '2026-05-08',
        currency: 'EGP',
        currencySymbol: 'ج.م',
        language: 'ar',
        timezone: 'Africa/Cairo'
    },

    // إعدادات المدفوعات
    payments: {
        monthlyFee: 200,
        lateFeePercentage: 5,
        paymentMethods: [
            { id: 'instapay', name: 'InstaPay', enabled: true },
            { id: 'vodafone', name: 'فودافون كاش', enabled: true },
            { id: 'orange', name: 'أورنج موني', enabled: true },
            { id: 'bank', name: 'تحويل بنكي', enabled: true },
            { id: 'card', name: 'بطاقة ائتمان', enabled: true },
            { id: 'cash', name: 'دفع كاش', enabled: true }
        ],
        bankDetails: {
            bankName: 'البنك الأهلي المصري',
            accountNumber: '1234567890',
            iban: 'EG76 0019 0005 1234 5678 9012 3456 789'
        }
    },

    // إعدادات الصيانة
    maintenance: {
        responseTime: {
            high: '2-4 ساعات',
            medium: '12-24 ساعة',
            low: '3-5 أيام'
        },
        categories: [
            { id: 'elevator', name: 'صيانة المصعد', icon: 'fa-elevator' },
            { id: 'electrical', name: 'صيانة الكهرباء', icon: 'fa-bolt' },
            { id: 'plumbing', name: 'صيانة المياه', icon: 'fa-faucet' },
            { id: 'cleaning', name: 'تنظيف عام', icon: 'fa-broom' },
            { id: 'security', name: 'الأمن والسلامة', icon: 'fa-shield-alt' },
            { id: 'other', name: 'أخرى', icon: 'fa-tools' }
        ]
    },

    // إعدادات الشكاوى
    complaints: {
        types: [
            { id: 'maintenance', name: 'صيانة', icon: 'fa-tools', color: 'indigo' },
            { id: 'water', name: 'مياه وكهرباء', icon: 'fa-faucet', color: 'blue' },
            { id: 'security', name: 'أمان', icon: 'fa-shield-alt', color: 'yellow' },
            { id: 'noise', name: 'ضوضاء', icon: 'fa-volume-up', color: 'orange' },
            { id: 'financial', name: 'مالية', icon: 'fa-money-bill-wave', color: 'green' },
            { id: 'other', name: 'أخرى', icon: 'fa-ellipsis-h', color: 'purple' }
        ],
        priorities: [
            { id: 'high', name: 'عاجلة', color: 'red' },
            { id: 'medium', name: 'عادية', color: 'yellow' },
            { id: 'low', name: 'منخفضة', color: 'green' }
        ],
        statuses: [
            { id: 'new', name: 'جديدة', color: 'blue' },
            { id: 'processing', name: 'قيد المعالجة', color: 'yellow' },
            { id: 'resolved', name: 'محلولة', color: 'green' },
            { id: 'closed', name: 'مغلقة', color: 'gray' }
        ]
    },

    // إعدادات الإشعارات
    notifications: {
        enabled: true,
        sound: true,
        types: [
            { id: 'payment', name: 'إشعارات الدفع', enabled: true },
            { id: 'maintenance', name: 'إشعارات الصيانة', enabled: true },
            { id: 'complaint', name: 'إشعارات الشكاوى', enabled: true },
            { id: 'announcement', name: 'الإعلانات', enabled: true }
        ]
    },

    // روابط التواصل الاجتماعي
    social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        whatsapp: '+201234567890'
    },

    // إعدادات الأمان
    security: {
        sessionTimeout: 30, // minutes
        maxLoginAttempts: 3,
        passwordMinLength: 6,
        requireStrongPassword: false
    },

    // إعدادات واجهة المستخدم
    ui: {
        theme: 'dark',
        primaryColor: '#6366f1',
        secondaryColor: '#10b981',
        animationsEnabled: true,
        compactMode: false
    },

    // API endpoints (للاستخدام المستقبلي)
    api: {
        baseUrl: 'https://api.alhuda-tower.com',
        version: 'v1',
        timeout: 30000
    }
};

// تجميد الكائن لمنع التعديل
Object.freeze(CONFIG);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
