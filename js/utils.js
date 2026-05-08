// بوابة الهدى الرقمية - دوال مساعدة

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 2
    }).format(amount);
}

// Format date
function formatDate(date, options = {}) {
    const defaultOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    return new Date(date).toLocaleDateString('ar-EG', { ...defaultOptions, ...options });
}

// Format time
function formatTime(date) {
    return new Date(date).toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300`;
    
    const colors = {
        success: 'bg-emerald-600',
        error: 'bg-red-600',
        warning: 'bg-orange-600',
        info: 'bg-indigo-600'
    };
    
    notification.classList.add(colors[type] || colors.info);
    notification.innerHTML = `
        <div class="flex items-center gap-3 text-white">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span class="font-bold">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Generate unique ID
function generateId(prefix = 'ID') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function validatePhone(phone) {
    const re = /^01[0-2,5]{1}[0-9]{8}$/;
    return re.test(phone);
}

// Local storage helpers
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('تم النسخ بنجاح', 'success');
        return true;
    } catch (err) {
        showNotification('فشل النسخ', 'error');
        return false;
    }
}

// Download as file
function downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// Print element
function printElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>طباعة</title>');
    printWindow.document.write('<style>body{font-family:Cairo,sans-serif;direction:rtl;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(element.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Calculate percentage
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Get time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' سنة';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' شهر';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' يوم';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' ساعة';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' دقيقة';
    
    return Math.floor(seconds) + ' ثانية';
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        formatDate,
        formatTime,
        showNotification,
        generateId,
        validateEmail,
        validatePhone,
        storage,
        debounce,
        copyToClipboard,
        downloadFile,
        printElement,
        calculatePercentage,
        formatFileSize,
        getTimeAgo
    };
}
