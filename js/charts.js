// بوابة الهدى الرقمية - نظام الرسوم البيانية
// Al-Huda Gateway - Charts System

/**
 * نظام رسوم بيانية تفاعلية باستخدام Chart.js
 */

// ====================================
// الإعدادات العامة للرسوم البيانية
// ====================================

const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#f1f5f9',
                font: {
                    family: 'Cairo',
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            titleColor: '#f1f5f9',
            bodyColor: '#f1f5f9',
            borderColor: '#6366f1',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            titleFont: {
                family: 'Cairo',
                size: 14,
                weight: 'bold'
            },
            bodyFont: {
                family: 'Cairo',
                size: 13
            }
        }
    }
};

// ألوان متناسقة
const colors = {
    primary: '#6366f1',
    secondary: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#06b6d4',
    purple: '#8b5cf6',
    pink: '#ec4899',
    gradient: {
        primary: ['#6366f1', '#8b5cf6'],
        secondary: ['#10b981', '#06b6d4'],
        danger: ['#ef4444', '#f59e0b']
    }
};

// ====================================
// رسم بياني للمدفوعات (خطي)
// ====================================

function createPaymentsChart(canvasId, payments) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    // تجميع المدفوعات حسب الشهر
    const monthlyData = {};
    
    payments.forEach(payment => {
        const month = payment.month || 'غير محدد';
        if (!monthlyData[month]) {
            monthlyData[month] = { paid: 0, pending: 0 };
        }
        
        if (payment.status === 'مدفوع') {
            monthlyData[month].paid += payment.amount;
        } else {
            monthlyData[month].pending += payment.amount;
        }
    });
    
    const labels = Object.keys(monthlyData);
    const paidData = labels.map(month => monthlyData[month].paid);
    const pendingData = labels.map(month => monthlyData[month].pending);
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'مدفوع',
                    data: paidData,
                    borderColor: colors.secondary,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: colors.secondary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'قيد الانتظار',
                    data: pendingData,
                    borderColor: colors.warning,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: colors.warning,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            ...chartDefaults,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ====================================
// رسم بياني للاستهلاك (خطي)
// ====================================

function createConsumptionChart(canvasId, consumptionData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    // بيانات افتراضية إذا لم تتوفر
    const data = consumptionData || {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
        water: [12, 14, 11, 13, 15],
        electricity: [120, 135, 115, 140, 155]
    };
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'المياه (متر مكعب)',
                    data: data.water,
                    borderColor: colors.info,
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4
                },
                {
                    label: 'الكهرباء (كيلو واط)',
                    data: data.electricity,
                    borderColor: colors.warning,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4
                }
            ]
        },
        options: {
            ...chartDefaults,
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8', font: { family: 'Cairo' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Cairo' } }
                }
            }
        }
    });
}

// ====================================
// رسم بياني للصيانة (عمودي أفقي)
// ====================================

function createMaintenanceChart(canvasId, maintenance) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const statusData = {};
    maintenance.forEach(item => {
        const status = item.status || 'غير محدد';
        statusData[status] = (statusData[status] || 0) + 1;
    });
    
    const labels = Object.keys(statusData);
    const data = Object.values(statusData);
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'طلبات الصيانة',
                data: data,
                backgroundColor: colors.warning,
                borderRadius: 6
            }]
        },
        options: {
            ...chartDefaults,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { color: '#94a3b8', font: { family: 'Cairo' } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                y: {
                    ticks: { color: '#94a3b8', font: { family: 'Cairo' } },
                    grid: { display: false }
                }
            }
        }
    });
}

// ====================================
// رسم بياني لتوزيع الوحدات (دائري)
// ====================================

function createUnitsChart(canvasId, units) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const statusData = {
        'occupied': 0,
        'vacant': 0,
        'for-rent': 0
    };
    
    units.forEach(unit => {
        statusData[unit.status] = (statusData[unit.status] || 0) + 1;
    });
    
    const labels = ['مأهولة', 'شاغرة', 'للإيجار'];
    const data = [statusData['occupied'], statusData['vacant'], statusData['for-rent']];
    const backgroundColors = [colors.secondary, colors.danger, colors.info];
    
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: '#1e293b',
                borderWidth: 2
            }]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    position: 'right',
                    labels: {
                        color: '#f1f5f9',
                        font: { family: 'Cairo', size: 12 }
                    }
                }
            }
        }
    });
}

// ====================================
// رسم بياني للشكاوى (دائري)
// ====================================

function createComplaintsChart(canvasId, complaints) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const statusData = {};
    complaints.forEach(complaint => {
        const status = complaint.status || 'غير محدد';
        statusData[status] = (statusData[status] || 0) + 1;
    });
    
    const labels = Object.keys(statusData);
    const data = Object.values(statusData);
    const backgroundColors = [colors.primary, colors.warning, colors.secondary, colors.danger];
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: '#1e293b',
                borderWidth: 2
            }]
        },
        options: {
            ...chartDefaults,
            cutout: '70%',
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    position: 'bottom',
                    labels: { color: '#f1f5f9', font: { family: 'Cairo' } }
                }
            }
        }
    });
}
