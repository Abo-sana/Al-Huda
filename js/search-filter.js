// بوابة الهدى الرقمية - نظام البحث والفلترة
// Al-Huda Gateway - Search & Filter System

/**
 * نظام بحث وفلترة متقدم
 * يوفر بحث سريع وفلترة حسب معايير مختلفة
 */

// ====================================
// البحث في النصوص
// ====================================

/**
 * بحث في نص
 * @param {string} text - النص المراد البحث فيه
 * @param {string} query - كلمة البحث
 * @returns {boolean}
 */
function searchInText(text, query) {
    if (!query || !text) return true;
    return text.toLowerCase().includes(query.toLowerCase());
}

/**
 * بحث في عدة حقول
 * @param {object} item - العنصر المراد البحث فيه
 * @param {array} fields - الحقول المراد البحث فيها
 * @param {string} query - كلمة البحث
 * @returns {boolean}
 */
function searchInFields(item, fields, query) {
    if (!query) return true;
    
    return fields.some(field => {
        const value = item[field];
        if (!value) return false;
        return searchInText(String(value), query);
    });
}

// ====================================
// فلترة المدفوعات
// ====================================

/**
 * فلترة المدفوعات
 * @param {array} payments - قائمة المدفوعات
 * @param {object} filters - معايير الفلترة
 * @returns {array}
 */
function filterPayments(payments, filters = {}) {
    let filtered = [...payments];
    
    // البحث النصي
    if (filters.search) {
        filtered = filtered.filter(p => 
            searchInFields(p, ['month', 'unitNumber', 'residentName'], filters.search)
        );
    }
    
    // فلترة حسب الحالة
    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(p => p.status === filters.status);
    }
    
    // فلترة حسب الشهر
    if (filters.month) {
        filtered = filtered.filter(p => p.month === filters.month);
    }
    
    // فلترة حسب السنة
    if (filters.year) {
        filtered = filtered.filter(p => {
            const year = p.date ? p.date.split('/')[2] : '';
            return year === filters.year;
        });
    }
    
    // فلترة حسب المبلغ (من - إلى)
    if (filters.minAmount) {
        filtered = filtered.filter(p => p.amount >= filters.minAmount);
    }
    if (filters.maxAmount) {
        filtered = filtered.filter(p => p.amount <= filters.maxAmount);
    }
    
    // فلترة حسب الوحدة (للأدمن)
    if (filters.unitNumber) {
        filtered = filtered.filter(p => p.unitNumber === filters.unitNumber);
    }
    
    return filtered;
}

// ====================================
// فلترة الشكاوى
// ====================================

/**
 * فلترة الشكاوى
 * @param {array} complaints - قائمة الشكاوى
 * @param {object} filters - معايير الفلترة
 * @returns {array}
 */
function filterComplaints(complaints, filters = {}) {
    let filtered = [...complaints];
    
    // البحث النصي
    if (filters.search) {
        filtered = filtered.filter(c => 
            searchInFields(c, ['title', 'description', 'type', 'unitNumber', 'residentName'], filters.search)
        );
    }
    
    // فلترة حسب الحالة
    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(c => c.status === filters.status);
    }
    
    // فلترة حسب النوع
    if (filters.type && filters.type !== 'all') {
        filtered = filtered.filter(c => c.type === filters.type);
    }
    
    // فلترة حسب الأولوية
    if (filters.priority && filters.priority !== 'all') {
        filtered = filtered.filter(c => c.priority === filters.priority);
    }
    
    // فلترة حسب التاريخ (من - إلى)
    if (filters.dateFrom) {
        filtered = filtered.filter(c => {
            const cDate = new Date(c.date);
            const fromDate = new Date(filters.dateFrom);
            return cDate >= fromDate;
        });
    }
    if (filters.dateTo) {
        filtered = filtered.filter(c => {
            const cDate = new Date(c.date);
            const toDate = new Date(filters.dateTo);
            return cDate <= toDate;
        });
    }
    
    // فلترة حسب الوحدة (للأدمن)
    if (filters.unitNumber) {
        filtered = filtered.filter(c => c.unitNumber === filters.unitNumber);
    }
    
    return filtered;
}

// ====================================
// فلترة الصيانة
// ====================================

/**
 * فلترة الصيانة
 * @param {array} maintenance - قائمة الصيانة
 * @param {object} filters - معايير الفلترة
 * @returns {array}
 */
function filterMaintenance(maintenance, filters = {}) {
    let filtered = [...maintenance];
    
    // البحث النصي
    if (filters.search) {
        filtered = filtered.filter(m => 
            searchInFields(m, ['type', 'description', 'contractor', 'unitNumber', 'residentName'], filters.search)
        );
    }
    
    // فلترة حسب الحالة
    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(m => m.status === filters.status);
    }
    
    // فلترة حسب النوع
    if (filters.type && filters.type !== 'all') {
        filtered = filtered.filter(m => m.type === filters.type);
    }
    
    // فلترة حسب الأولوية
    if (filters.priority && filters.priority !== 'all') {
        filtered = filtered.filter(m => m.priority === filters.priority);
    }
    
    // فلترة حسب المقاول
    if (filters.contractor) {
        filtered = filtered.filter(m => 
            searchInText(m.contractor, filters.contractor)
        );
    }
    
    // فلترة حسب التكلفة (من - إلى)
    if (filters.minCost) {
        filtered = filtered.filter(m => m.cost >= filters.minCost);
    }
    if (filters.maxCost) {
        filtered = filtered.filter(m => m.cost <= filters.maxCost);
    }
    
    // فلترة حسب الوحدة (للأدمن)
    if (filters.unitNumber) {
        filtered = filtered.filter(m => m.unitNumber === filters.unitNumber);
    }
    
    return filtered;
}

// ====================================
// فلترة السكان
// ====================================

/**
 * فلترة السكان
 * @param {array} residents - قائمة السكان
 * @param {object} filters - معايير الفلترة
 * @returns {array}
 */
function filterResidents(residents, filters = {}) {
    let filtered = [...residents];
    
    // البحث النصي
    if (filters.search) {
        filtered = filtered.filter(r => 
            searchInFields(r, ['name', 'unit', 'phone', 'email'], filters.search)
        );
    }
    
    // فلترة حسب الوحدة
    if (filters.unit) {
        filtered = filtered.filter(r => r.unit === filters.unit);
    }
    
    // فلترة حسب الحالة
    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(r => r.status === filters.status);
    }
    
    return filtered;
}

// ====================================
// ترتيب النتائج
// ====================================

/**
 * ترتيب النتائج
 * @param {array} items - القائمة المراد ترتيبها
 * @param {string} field - الحقل المراد الترتيب حسبه
 * @param {string} order - اتجاه الترتيب (asc أو desc)
 * @returns {array}
 */
function sortItems(items, field, order = 'asc') {
    return [...items].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        // معالجة التواريخ
        if (field === 'date' || field.includes('Date')) {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }
        
        // معالجة الأرقام
        if (typeof aVal === 'string' && !isNaN(aVal)) {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }
        
        if (order === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
}

// ====================================
// إنشاء واجهة البحث
// ====================================

/**
 * إنشاء شريط بحث
 * @param {string} placeholder - النص التوضيحي
 * @param {function} onSearch - دالة تنفذ عند البحث
 * @returns {string} HTML
 */
function createSearchBar(placeholder = 'ابحث...', onSearch) {
    const searchId = 'search_' + Date.now();
    
    setTimeout(() => {
        const input = document.getElementById(searchId);
        if (input && onSearch) {
            input.addEventListener('input', (e) => onSearch(e.target.value));
        }
    }, 100);
    
    return `
        <div style="position: relative; margin-bottom: 20px;">
            <i class="fas fa-search" style="
                position: absolute;
                right: 16px;
                top: 50%;
                transform: translateY(-50%);
                color: #6366f1;
                font-size: 16px;
            "></i>
            <input 
                type="text" 
                id="${searchId}"
                placeholder="${placeholder}"
                style="
                    width: 100%;
                    padding: 12px 16px 12px 48px;
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 12px;
                    color: #f1f5f9;
                    font-family: 'Cairo', sans-serif;
                    transition: all 0.3s ease;
                "
                onfocus="this.style.borderColor='#6366f1'; this.style.background='rgba(30, 41, 59, 0.8)'"
                onblur="this.style.borderColor='rgba(99, 102, 241, 0.2)'; this.style.background='rgba(30, 41, 59, 0.5)'"
            >
        </div>
    `;
}

/**
 * إنشاء قائمة فلترة
 * @param {string} label - عنوان الفلتر
 * @param {array} options - الخيارات [{value, label}]
 * @param {function} onChange - دالة تنفذ عند التغيير
 * @returns {string} HTML
 */
function createFilterSelect(label, options, onChange) {
    const selectId = 'filter_' + Date.now();
    
    setTimeout(() => {
        const select = document.getElementById(selectId);
        if (select && onChange) {
            select.addEventListener('change', (e) => onChange(e.target.value));
        }
    }, 100);
    
    return `
        <div style="margin-bottom: 16px;">
            <label style="
                display: block;
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 8px;
                color: #f1f5f9;
            ">${label}</label>
            <select 
                id="${selectId}"
                style="
                    width: 100%;
                    padding: 10px 12px;
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 8px;
                    color: #f1f5f9;
                    font-family: 'Cairo', sans-serif;
                    cursor: pointer;
                "
            >
                ${options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
            </select>
        </div>
    `;
}

/**
 * إنشاء لوحة فلترة كاملة
 * @param {object} config - إعدادات الفلترة
 * @returns {string} HTML
 */
function createFilterPanel(config) {
    let html = `
        <div class="glass-card p-6 rounded-2xl mb-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold">
                    <i class="fas fa-filter ml-2"></i>
                    البحث والفلترة
                </h3>
                <button 
                    onclick="resetFilters()"
                    class="text-sm text-indigo-400 hover:text-indigo-300"
                >
                    <i class="fas fa-redo ml-1"></i>
                    إعادة تعيين
                </button>
            </div>
    `;
    
    // شريط البحث
    if (config.search) {
        html += createSearchBar(config.search.placeholder, config.search.onSearch);
    }
    
    // الفلاتر
    if (config.filters) {
        html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
        
        config.filters.forEach(filter => {
            html += createFilterSelect(filter.label, filter.options, filter.onChange);
        });
        
        html += '</div>';
    }
    
    html += '</div>';
    
    return html;
}

// ====================================
// إحصائيات البحث
// ====================================

/**
 * عرض نتائج البحث
 * @param {number} total - إجمالي العناصر
 * @param {number} filtered - العناصر بعد الفلترة
 * @returns {string} HTML
 */
function showSearchResults(total, filtered) {
    if (total === filtered) {
        return `
            <div class="text-sm text-slate-400 mb-4">
                <i class="fas fa-list ml-1"></i>
                عرض ${total} عنصر
            </div>
        `;
    } else {
        return `
            <div class="text-sm text-indigo-400 mb-4">
                <i class="fas fa-filter ml-1"></i>
                عرض ${filtered} من ${total} عنصر
            </div>
        `;
    }
}

// ====================================
// تصدير الوظائف
// ====================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        searchInText,
        searchInFields,
        filterPayments,
        filterComplaints,
        filterMaintenance,
        filterResidents,
        sortItems,
        createSearchBar,
        createFilterSelect,
        createFilterPanel,
        showSearchResults
    };
}
