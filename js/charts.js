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
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
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
                borderRadius: 6,
                indexAxis: 'y' // تجعله أفقي
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
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' },
                        callback: function(value) {
                            return value + ' ج.م';
                        }
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
                        color: 'rgba(255, 255, 255, 0.05)'
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
    
    // تجميع الشكاوى حسب الحالة
    const statusData = {};
    complaints.forEach(complaint => {
        const status = complaint.status || 'غير محدد';
        statusData[status] = (statusData[status] || 0) + 1;
    });
    
    const labels = Object.keys(statusData);
    const data = Object.values(statusData);
    const backgroundColors = [
        colors.primary,
        colors.warning,
        colors.secondary,
        colors.danger,
        colors.info
    ];
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors.slice(0, labels.length),
                borderColor: '#1e293b',
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            ...chartDefaults,
            cutout: '60%',
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f1f5f9',
                        font: {
                            family: 'Cairo',
                            size: 13
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

// ====================================
// رسم بياني لأنواع الشكاوى (عمودي)
// ====================================

function createComplaintTypesChart(canvasId, complaints) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    // تجميع الشكاوى حسب النوع
    const typeData = {};
    complaints.forEach(complaint => {
        const type = complaint.type || 'غير محدد';
        typeData[type] = (typeData[type] || 0) + 1;
    });
    
    const labels = Object.keys(typeData);
    const data = Object.values(typeData);
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'عدد الشكاوى',
                data: data,
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: colors.purple
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' },
                        stepSize: 1
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
// رسم بياني للصيانة (عمودي مجمع)
// ====================================

function createMaintenanceChart(canvasId, maintenance) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    // تجميع الصيانة حسب النوع والحالة
    const typeData = {};
    maintenance.forEach(item => {
        const type = item.type || 'غير محدد';
        if (!typeData[type]) {
            typeData[type] = { completed: 0, scheduled: 0, pending: 0 };
        }
        
        if (item.status === 'مكتمل') {
            typeData[type].completed++;
        } else if (item.status === 'مجدول') {
            typeData[type].scheduled++;
        } else {
            typeData[type].pending++;
        }
    });
    
    const labels = Object.keys(typeData);
    const completedData = labels.map(type => typeData[type].completed);
    const scheduledData = labels.map(type => typeData[type].scheduled);
    const pendingData = labels.map(type => typeData[type].pending);
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'مكتملة',
                    data: completedData,
                    backgroundColor: colors.secondary,
                    borderRadius: 6
                },
                {
                    label: 'مجدولة',
                    data: scheduledData,
                    backgroundColor: colors.primary,
                    borderRadius: 6
                },
                {
                    label: 'في الانتظار',
                    data: pendingData,
                    backgroundColor: colors.warning,
                    borderRadius: 6
                }
            ]
        },
        options: {
            ...chartDefaults,
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: false,
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' },
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    stacked: false,
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
// رسم بياني للتكاليف (خطي متدرج)
// ====================================

function createCostChart(canvasId, maintenance) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    // تجميع التكاليف حسب الشهر
    const monthlyData = {};
    maintenance.forEach(item => {
        if (!item.scheduledDate) return;
        
        const date = new Date(item.scheduledDate);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = 0;
        }
        monthlyData[monthYear] += item.cost || 0;
    });
    
    const labels = Object.keys(monthlyData).sort();
    const data = labels.map(month => monthlyData[month]);
    
    // إنشاء تدرج لوني
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'التكلفة الشهرية',
                data: data,
                borderColor: colors.primary,
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: colors.primary,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' },
                        callback: function(value) {
                            return value + ' ج.م';
                        }
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
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                }
            }
        }
    });
}

// ====================================
// رسم بياني للتصويت (أفقي)
// ====================================

function createVotingChart(canvasId, votingData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: votingData.labels,
            datasets: [{
                label: 'عدد الأصوات',
                data: votingData.data,
                backgroundColor: [colors.secondary, colors.danger],
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            ...chartDefaults,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo', size: 14 }
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
// رسم بياني للإحصائيات العامة (رادار)
// ====================================

function createOverviewRadarChart(canvasId, stats) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['المدفوعات', 'الشكاوى', 'الصيانة', 'التصويت', 'الرضا'],
            datasets: [{
                label: 'الأداء',
                data: [
                    stats.paymentsScore || 0,
                    stats.complaintsScore || 0,
                    stats.maintenanceScore || 0,
                    stats.votingScore || 0,
                    stats.satisfactionScore || 0
                ],
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: colors.primary,
                borderWidth: 2,
                pointBackgroundColor: colors.primary,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors.primary,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Cairo' },
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#f1f5f9',
                        font: {
                            family: 'Cairo',
                            size: 13
                        }
                    }
                }
            }
        }
    });
}

// ====================================
// إنشاء لوحة إحصائيات كاملة
// ====================================

function createDashboardCharts() {
    const payments = dataManager.getPayments();
    const complaints = dataManager.getComplaints();
    const maintenance = dataManager.getMaintenance();
    
    // فلترة البيانات حسب المستخدم
    const unitNumber = sessionStorage.getItem('unitNumber');
    const isAdminUser = isAdmin();
    
    const userPayments = isAdminUser ? payments : payments.filter(p => p.unitNumber === unitNumber);
    const userComplaints = isAdminUser ? complaints : complaints.filter(c => c.unitNumber === unitNumber);
    const userMaintenance = isAdminUser ? maintenance : maintenance.filter(m => m.unitNumber === unitNumber);
    
    // إنشاء الرسوم البيانية
    const charts = {};
    
    if (document.getElementById('paymentsChart')) {
        charts.payments = createPaymentsChart('paymentsChart', userPayments);
    }
    
    if (document.getElementById('complaintsChart')) {
        charts.complaints = createComplaintsChart('complaintsChart', userComplaints);
    }
    
    if (document.getElementById('complaintTypesChart')) {
        charts.complaintTypes = createComplaintTypesChart('complaintTypesChart', userComplaints);
    }
    
    if (document.getElementById('maintenanceChart')) {
        charts.maintenance = createMaintenanceChart('maintenanceChart', userMaintenance);
    }
    
    if (document.getElementById('costChart')) {
        charts.cost = createCostChart('costChart', userMaintenance);
    }
    
    return charts;
}

// ====================================
// تحديث الرسوم البيانية
// ====================================

function updateChart(chart, newData) {
    if (!chart) return;
    
    chart.data = newData;
    chart.update('active');
}

function destroyChart(chart) {
    if (chart) {
        chart.destroy();
    }
}

// ====================================
// تصدير الوظائف
// ====================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createPaymentsChart,
        createComplaintsChart,
        createComplaintTypesChart,
        createMaintenanceChart,
        createCostChart,
        createVotingChart,
        createOverviewRadarChart,
        createDashboardCharts,
        updateChart,
        destroyChart
    };
}
