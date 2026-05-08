// بوابة الهدى الرقمية - نظام التصدير
// Al-Huda Gateway - Export System

/**
 * نظام تصدير البيانات لملفات Excel و CSV و PDF
 */

// ====================================
// تصدير لـ CSV
// ====================================

/**
 * تحويل البيانات لـ CSV
 * @param {array} data - البيانات المراد تصديرها
 * @param {array} columns - الأعمدة المراد تصديرها
 * @returns {string} CSV content
 */
function convertToCSV(data, columns) {
    if (!data || data.length === 0) {
        return '';
    }
    
    // إنشاء الرأس
    const headers = columns.map(col => col.label).join(',');
    
    // إنشاء الصفوف
    const rows = data.map(item => {
        return columns.map(col => {
            let value = item[col.field] || '';
            // معالجة القيم التي تحتوي على فواصل أو علامات اقتباس
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',');
    }).join('\n');
    
    return headers + '\n' + rows;
}

/**
 * تنزيل ملف CSV
 * @param {string} content - محتوى الملف
 * @param {string} filename - اسم الملف
 */
function downloadCSV(content, filename) {
    // إضافة BOM للدعم العربي
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ====================================
// تصدير لـ Excel (HTML Table)
// ====================================

/**
 * تحويل البيانات لجدول HTML (يفتح في Excel)
 * @param {array} data - البيانات المراد تصديرها
 * @param {array} columns - الأعمدة المراد تصديرها
 * @param {string} title - عنوان الجدول
 * @returns {string} HTML content
 */
function convertToExcelHTML(data, columns, title = 'تقرير') {
    let html = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
            <meta charset="utf-8">
            <style>
                table { border-collapse: collapse; width: 100%; direction: rtl; }
                th { background-color: #6366f1; color: white; padding: 12px; text-align: right; font-weight: bold; border: 1px solid #ddd; }
                td { padding: 10px; text-align: right; border: 1px solid #ddd; }
                tr:nth-child(even) { background-color: #f2f2f2; }
                h2 { text-align: center; color: #6366f1; font-family: Arial; }
            </style>
        </head>
        <body>
            <h2>${title}</h2>
            <table>
                <thead>
                    <tr>
                        ${columns.map(col => `<th>${col.label}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
    `;
    
    data.forEach(item => {
        html += '<tr>';
        columns.forEach(col => {
            const value = item[col.field] || '';
            html += `<td>${value}</td>`;
        });
        html += '</tr>';
    });
    
    html += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    return html;
}

/**
 * تنزيل ملف Excel
 * @param {string} content - محتوى HTML
 * @param {string} filename - اسم الملف
 */
function downloadExcel(content, filename) {
    const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ====================================
// تصدير المدفوعات
// ====================================

/**
 * تصدير المدفوعات لـ Excel
 * @param {array} payments - قائمة المدفوعات
 * @param {string} format - صيغة التصدير (excel أو csv)
 */
function exportPayments(payments, format = 'excel') {
    if (!payments || payments.length === 0) {
        notifyWarning('لا توجد بيانات للتصدير');
        return;
    }
    
    const columns = [
        { field: 'id', label: 'رقم الفاتورة' },
        { field: 'unitNumber', label: 'رقم الوحدة' },
        { field: 'residentName', label: 'اسم المالك' },
        { field: 'month', label: 'الشهر' },
        { field: 'amount', label: 'المبلغ (ج.م)' },
        { field: 'status', label: 'الحالة' },
        { field: 'date', label: 'التاريخ' },
        { field: 'paymentMethod', label: 'طريقة الدفع' }
    ];
    
    const filename = `المدفوعات_${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}`;
    
    if (format === 'excel') {
        const content = convertToExcelHTML(payments, columns, 'تقرير المدفوعات - بوابة الهدى');
        downloadExcel(content, filename + '.xls');
        notifySuccess(`تم تصدير ${payments.length} فاتورة بنجاح`);
    } else if (format === 'csv') {
        const content = convertToCSV(payments, columns);
        downloadCSV(content, filename + '.csv');
        notifySuccess(`تم تصدير ${payments.length} فاتورة بنجاح`);
    }
}

// ====================================
// تصدير الشكاوى
// ====================================

/**
 * تصدير الشكاوى لـ Excel
 * @param {array} complaints - قائمة الشكاوى
 * @param {string} format - صيغة التصدير (excel أو csv)
 */
function exportComplaints(complaints, format = 'excel') {
    if (!complaints || complaints.length === 0) {
        notifyWarning('لا توجد بيانات للتصدير');
        return;
    }
    
    const columns = [
        { field: 'id', label: 'رقم الشكوى' },
        { field: 'unitNumber', label: 'رقم الوحدة' },
        { field: 'residentName', label: 'اسم المالك' },
        { field: 'type', label: 'النوع' },
        { field: 'title', label: 'الموضوع' },
        { field: 'description', label: 'الوصف' },
        { field: 'priority', label: 'الأولوية' },
        { field: 'status', label: 'الحالة' },
        { field: 'date', label: 'التاريخ' },
        { field: 'assignedTo', label: 'مسند إلى' }
    ];
    
    const filename = `الشكاوى_${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}`;
    
    if (format === 'excel') {
        const content = convertToExcelHTML(complaints, columns, 'تقرير الشكاوى - بوابة الهدى');
        downloadExcel(content, filename + '.xls');
        notifySuccess(`تم تصدير ${complaints.length} شكوى بنجاح`);
    } else if (format === 'csv') {
        const content = convertToCSV(complaints, columns);
        downloadCSV(content, filename + '.csv');
        notifySuccess(`تم تصدير ${complaints.length} شكوى بنجاح`);
    }
}

// ====================================
// تصدير الصيانة
// ====================================

/**
 * تصدير الصيانة لـ Excel
 * @param {array} maintenance - قائمة الصيانة
 * @param {string} format - صيغة التصدير (excel أو csv)
 */
function exportMaintenance(maintenance, format = 'excel') {
    if (!maintenance || maintenance.length === 0) {
        notifyWarning('لا توجد بيانات للتصدير');
        return;
    }
    
    const columns = [
        { field: 'id', label: 'رقم الصيانة' },
        { field: 'unitNumber', label: 'رقم الوحدة' },
        { field: 'residentName', label: 'اسم المالك' },
        { field: 'type', label: 'النوع' },
        { field: 'description', label: 'الوصف' },
        { field: 'priority', label: 'الأولوية' },
        { field: 'status', label: 'الحالة' },
        { field: 'contractor', label: 'المقاول' },
        { field: 'cost', label: 'التكلفة (ج.م)' },
        { field: 'scheduledDate', label: 'تاريخ الجدولة' },
        { field: 'completedDate', label: 'تاريخ الإنجاز' }
    ];
    
    const filename = `الصيانة_${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}`;
    
    if (format === 'excel') {
        const content = convertToExcelHTML(maintenance, columns, 'تقرير الصيانة - بوابة الهدى');
        downloadExcel(content, filename + '.xls');
        notifySuccess(`تم تصدير ${maintenance.length} صيانة بنجاح`);
    } else if (format === 'csv') {
        const content = convertToCSV(maintenance, columns);
        downloadCSV(content, filename + '.csv');
        notifySuccess(`تم تصدير ${maintenance.length} صيانة بنجاح`);
    }
}

// ====================================
// تصدير السكان
// ====================================

/**
 * تصدير السكان لـ Excel
 * @param {array} residents - قائمة السكان
 * @param {string} format - صيغة التصدير (excel أو csv)
 */
function exportResidents(residents, format = 'excel') {
    if (!residents || residents.length === 0) {
        notifyWarning('لا توجد بيانات للتصدير');
        return;
    }
    
    const columns = [
        { field: 'id', label: 'الرقم' },
        { field: 'unit', label: 'رقم الوحدة' },
        { field: 'name', label: 'الاسم' },
        { field: 'phone', label: 'الهاتف' },
        { field: 'email', label: 'البريد الإلكتروني' },
        { field: 'status', label: 'الحالة' },
        { field: 'joinDate', label: 'تاريخ الانضمام' }
    ];
    
    const filename = `السكان_${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}`;
    
    if (format === 'excel') {
        const content = convertToExcelHTML(residents, columns, 'تقرير السكان - بوابة الهدى');
        downloadExcel(content, filename + '.xls');
        notifySuccess(`تم تصدير ${residents.length} ساكن بنجاح`);
    } else if (format === 'csv') {
        const content = convertToCSV(residents, columns);
        downloadCSV(content, filename + '.csv');
        notifySuccess(`تم تصدير ${residents.length} ساكن بنجاح`);
    }
}

// ====================================
// تصدير تقرير شامل
// ====================================

/**
 * تصدير تقرير شامل لكل البيانات
 */
function exportFullReport() {
    const payments = dataManager.getPayments();
    const complaints = dataManager.getComplaints();
    const maintenance = dataManager.getMaintenance();
    const residents = dataManager.getResidents();
    
    let html = `
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial; direction: rtl; padding: 20px; }
                h1 { text-align: center; color: #6366f1; }
                h2 { color: #6366f1; margin-top: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
                table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
                th { background-color: #6366f1; color: white; padding: 12px; text-align: right; font-weight: bold; border: 1px solid #ddd; }
                td { padding: 10px; text-align: right; border: 1px solid #ddd; }
                tr:nth-child(even) { background-color: #f2f2f2; }
                .summary { background-color: #e0e7ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                .summary-item { display: inline-block; margin: 10px 20px; }
            </style>
        </head>
        <body>
            <h1>🏢 تقرير شامل - بوابة الهدى الرقمية</h1>
            <p style="text-align: center; color: #666;">تاريخ التقرير: ${new Date().toLocaleDateString('ar-EG')}</p>
            
            <div class="summary">
                <h3>📊 ملخص الإحصائيات</h3>
                <div class="summary-item"><strong>إجمالي السكان:</strong> ${residents.length}</div>
                <div class="summary-item"><strong>إجمالي المدفوعات:</strong> ${payments.length}</div>
                <div class="summary-item"><strong>إجمالي الشكاوى:</strong> ${complaints.length}</div>
                <div class="summary-item"><strong>إجمالي الصيانة:</strong> ${maintenance.length}</div>
            </div>
    `;
    
    // إضافة جداول البيانات
    if (payments.length > 0) {
        html += '<h2>💰 المدفوعات</h2>';
        html += convertToExcelHTML(payments, [
            { field: 'unitNumber', label: 'الوحدة' },
            { field: 'month', label: 'الشهر' },
            { field: 'amount', label: 'المبلغ' },
            { field: 'status', label: 'الحالة' }
        ], '').replace(/<html.*?<body>/s, '').replace(/<\/body>.*?<\/html>/s, '');
    }
    
    if (complaints.length > 0) {
        html += '<h2>📝 الشكاوى</h2>';
        html += convertToExcelHTML(complaints, [
            { field: 'unitNumber', label: 'الوحدة' },
            { field: 'type', label: 'النوع' },
            { field: 'title', label: 'الموضوع' },
            { field: 'status', label: 'الحالة' }
        ], '').replace(/<html.*?<body>/s, '').replace(/<\/body>.*?<\/html>/s, '');
    }
    
    if (maintenance.length > 0) {
        html += '<h2>🔧 الصيانة</h2>';
        html += convertToExcelHTML(maintenance, [
            { field: 'unitNumber', label: 'الوحدة' },
            { field: 'type', label: 'النوع' },
            { field: 'status', label: 'الحالة' },
            { field: 'cost', label: 'التكلفة' }
        ], '').replace(/<html.*?<body>/s, '').replace(/<\/body>.*?<\/html>/s, '');
    }
    
    html += '</body></html>';
    
    const filename = `تقرير_شامل_${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}.xls`;
    downloadExcel(html, filename);
    notifySuccess('تم تصدير التقرير الشامل بنجاح');
}

// ====================================
// إنشاء أزرار التصدير
// ====================================

/**
 * إنشاء أزرار تصدير
 * @param {string} type - نوع البيانات (payments, complaints, maintenance, residents)
 * @returns {string} HTML
 */
function createExportButtons(type) {
    return `
        <div class="flex gap-2">
            <button 
                onclick="export${type.charAt(0).toUpperCase() + type.slice(1)}(filtered${type.charAt(0).toUpperCase() + type.slice(1)}, 'excel')"
                class="btn-secondary text-sm"
                style="padding: 8px 16px; font-size: 13px;"
            >
                <i class="fas fa-file-excel ml-1"></i>
                Excel
            </button>
            <button 
                onclick="export${type.charAt(0).toUpperCase() + type.slice(1)}(filtered${type.charAt(0).toUpperCase() + type.slice(1)}, 'csv')"
                class="btn-secondary text-sm"
                style="padding: 8px 16px; font-size: 13px;"
            >
                <i class="fas fa-file-csv ml-1"></i>
                CSV
            </button>
        </div>
    `;
}

// ====================================
// تصدير الوظائف
// ====================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        exportPayments,
        exportComplaints,
        exportMaintenance,
        exportResidents,
        exportFullReport,
        createExportButtons
    };
}
