// بوابة الهدى الرقمية - نظام إدارة البيانات

// Data Manager Class
class DataManager {
    constructor() {
        this.initializeData();
    }

    // Initialize default data if not exists
    initializeData() {
        if (!localStorage.getItem('residents')) {
            this.resetResidents();
        }
        if (!localStorage.getItem('units')) {
            this.resetUnits();
        }
        if (!localStorage.getItem('payments')) {
            this.resetPayments();
        }
        if (!localStorage.getItem('complaints')) {
            this.resetComplaints();
        }
        if (!localStorage.getItem('maintenance')) {
            this.resetMaintenance();
        }
    }

    // Reset to default data
    resetResidents() {
        const residents = [
            {
                id: 1,
                name: 'أحمد محمد علي',
                unit: '304',
                phone: '0123456789',
                email: 'ahmed@example.com',
                emergencyPhone: '0111111111',
                ownershipType: 'ملكية شخصية',
                registered: '2025-01-01',
                age: 35,
                familyMembers: 4
            },
            {
                id: 2,
                name: 'فاطمة السيد محمود',
                unit: '302',
                phone: '0987654321',
                email: 'fatima@example.com',
                emergencyPhone: '0222222222',
                ownershipType: 'مستأجرة',
                registered: '2025-02-15',
                age: 28,
                familyMembers: 2
            },
            {
                id: 3,
                name: 'محمود عبدالعزيز',
                unit: '401',
                phone: '0111111111',
                email: 'mahmoud@example.com',
                emergencyPhone: '0333333333',
                ownershipType: 'ملكية شخصية',
                registered: '2025-01-20',
                age: 42,
                familyMembers: 5
            },
            {
                id: 4,
                name: 'سارة محمد حسن',
                unit: '201',
                phone: '0555555555',
                email: 'sara@example.com',
                emergencyPhone: '0444444444',
                ownershipType: 'ملكية شخصية',
                registered: '2024-12-10',
                age: 31,
                familyMembers: 3
            },
            {
                id: 5,
                name: 'خالد إبراهيم',
                unit: '202',
                phone: '0666666666',
                email: 'khaled@example.com',
                emergencyPhone: '0777777777',
                ownershipType: 'مستأجرة',
                registered: '2025-03-01',
                age: 38,
                familyMembers: 4
            }
        ];
        localStorage.setItem('residents', JSON.stringify(residents));
    }

    resetUnits() {
        const units = [
            { id: '101', floor: 1, type: '2 غرفة', area: 85, status: 'occupied', owner: 'محمد حسن', rent: 0 },
            { id: '102', floor: 1, type: '3 غرف', area: 120, status: 'occupied', owner: 'علي أحمد', rent: 0 },
            { id: '103', floor: 1, type: '3 غرف', area: 120, status: 'vacant', owner: '--', rent: 0 },
            { id: '201', floor: 2, type: '2 غرفة', area: 85, status: 'occupied', owner: 'سارة محمد', rent: 0 },
            { id: '202', floor: 2, type: '3 غرف', area: 120, status: 'occupied', owner: 'خالد إبراهيم', rent: 2500 },
            { id: '203', floor: 2, type: '1 غرفة', area: 60, status: 'for-rent', owner: 'أمين الشيخ', rent: 1800 },
            { id: '301', floor: 3, type: '3 غرف', area: 120, status: 'occupied', owner: 'نور علي', rent: 0 },
            { id: '302', floor: 3, type: '2 غرفة', area: 85, status: 'occupied', owner: 'فاطمة السيد', rent: 2200 },
            { id: '303', floor: 3, type: '3 غرف', area: 120, status: 'occupied', owner: 'أحمد جمال', rent: 0 },
            { id: '304', floor: 3, type: '3 غرف', area: 120, status: 'occupied', owner: 'أحمد محمد', rent: 0 },
            { id: '401', floor: 4, type: '3 غرف', area: 120, status: 'occupied', owner: 'محمود عبدالعزيز', rent: 0 },
            { id: '402', floor: 4, type: '2 غرفة', area: 85, status: 'occupied', owner: 'ليلى محمود', rent: 0 },
            { id: '403', floor: 4, type: '3 غرف', area: 120, status: 'vacant', owner: '--', rent: 0 }
        ];
        localStorage.setItem('units', JSON.stringify(units));
    }

    resetPayments() {
        const payments = [
            {
                id: 1,
                unitNumber: '304',
                residentName: 'أحمد محمد علي',
                amount: 200,
                month: 'مايو 2026',
                date: '2026-05-01',
                method: 'InstaPay',
                status: 'مدفوع',
                receiptNumber: 'REC-2026-001'
            },
            {
                id: 2,
                unitNumber: '302',
                residentName: 'فاطمة السيد محمود',
                amount: 200,
                month: 'مايو 2026',
                date: '2026-05-03',
                method: 'فودافون كاش',
                status: 'مدفوع',
                receiptNumber: 'REC-2026-002'
            },
            {
                id: 3,
                unitNumber: '401',
                residentName: 'محمود عبدالعزيز',
                amount: 200,
                month: 'مايو 2026',
                date: null,
                method: null,
                status: 'معلق',
                receiptNumber: null
            }
        ];
        localStorage.setItem('payments', JSON.stringify(payments));
    }

    resetComplaints() {
        const complaints = [
            {
                id: 1,
                unitNumber: '304',
                residentName: 'أحمد محمد علي',
                type: 'صيانة',
                priority: 'عاجلة',
                title: 'تسريب مياه في الحمام',
                description: 'يوجد تسريب مياه في الحمام الرئيسي يحتاج إلى إصلاح عاجل',
                status: 'قيد المعالجة',
                date: '2026-05-07',
                assignedTo: 'فريق الصيانة',
                rating: null
            },
            {
                id: 2,
                unitNumber: '302',
                residentName: 'فاطمة السيد محمود',
                type: 'ضوضاء',
                priority: 'عادية',
                title: 'ضوضاء من الجيران',
                description: 'ضوضاء عالية من الوحدة المجاورة في أوقات متأخرة',
                status: 'محلولة',
                date: '2026-05-05',
                assignedTo: 'الإدارة',
                rating: 4
            },
            {
                id: 3,
                unitNumber: '201',
                residentName: 'سارة محمد حسن',
                type: 'مياه وكهرباء',
                priority: 'عاجلة',
                title: 'انقطاع الكهرباء المتكرر',
                description: 'انقطاع الكهرباء بشكل متكرر في الوحدة',
                status: 'جديدة',
                date: '2026-05-08',
                assignedTo: null,
                rating: null
            }
        ];
        localStorage.setItem('complaints', JSON.stringify(complaints));
    }

    resetMaintenance() {
        const maintenance = [
            {
                id: 1,
                unitNumber: '304',
                residentName: 'أحمد محمد علي',
                type: 'صيانة المياه',
                title: 'إصلاح تسريب المياه',
                description: 'تسريب في أنابيب المياه',
                priority: 'عاجلة',
                status: 'قيد التنفيذ',
                requestDate: '2026-05-07',
                scheduledDate: '2026-05-09',
                contractor: 'شركة السباكة المتقدمة',
                cost: 500,
                notes: 'يحتاج إلى قطع غيار'
            },
            {
                id: 2,
                unitNumber: '202',
                residentName: 'خالد إبراهيم',
                type: 'صيانة الكهرباء',
                title: 'تغيير مفتاح كهربائي',
                description: 'مفتاح الكهرباء في غرفة النوم لا يعمل',
                priority: 'عادية',
                status: 'مكتمل',
                requestDate: '2026-05-01',
                scheduledDate: '2026-05-03',
                contractor: 'كهربائي البرج',
                cost: 150,
                notes: 'تم الإصلاح بنجاح'
            },
            {
                id: 3,
                unitNumber: '401',
                residentName: 'محمود عبدالعزيز',
                type: 'تنظيف عام',
                title: 'تنظيف المكيفات',
                description: 'تنظيف وصيانة المكيفات',
                priority: 'منخفضة',
                status: 'مجدول',
                requestDate: '2026-05-06',
                scheduledDate: '2026-05-15',
                contractor: 'شركة التكييف',
                cost: 300,
                notes: 'موعد الصيانة الدورية'
            }
        ];
        localStorage.setItem('maintenance', JSON.stringify(maintenance));
    }

    // CRUD Operations for Residents
    getResidents() {
        return JSON.parse(localStorage.getItem('residents') || '[]');
    }

    getResident(id) {
        const residents = this.getResidents();
        return residents.find(r => r.id === parseInt(id));
    }

    addResident(resident) {
        const residents = this.getResidents();
        resident.id = residents.length > 0 ? Math.max(...residents.map(r => r.id)) + 1 : 1;
        resident.registered = new Date().toISOString().split('T')[0];
        residents.push(resident);
        localStorage.setItem('residents', JSON.stringify(residents));
        return resident;
    }

    updateResident(id, updates) {
        const residents = this.getResidents();
        const index = residents.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            residents[index] = { ...residents[index], ...updates };
            localStorage.setItem('residents', JSON.stringify(residents));
            return residents[index];
        }
        return null;
    }

    deleteResident(id) {
        let residents = this.getResidents();
        residents = residents.filter(r => r.id !== parseInt(id));
        localStorage.setItem('residents', JSON.stringify(residents));
        return true;
    }

    // CRUD Operations for Units
    getUnits() {
        return JSON.parse(localStorage.getItem('units') || '[]');
    }

    getUnit(id) {
        const units = this.getUnits();
        return units.find(u => u.id === id);
    }

    updateUnit(id, updates) {
        const units = this.getUnits();
        const index = units.findIndex(u => u.id === id);
        if (index !== -1) {
            units[index] = { ...units[index], ...updates };
            localStorage.setItem('units', JSON.stringify(units));
            return units[index];
        }
        return null;
    }

    // CRUD Operations for Payments
    getPayments() {
        return JSON.parse(localStorage.getItem('payments') || '[]');
    }

    addPayment(payment) {
        const payments = this.getPayments();
        payment.id = payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1;
        payment.date = new Date().toISOString().split('T')[0];
        payment.receiptNumber = `REC-${new Date().getFullYear()}-${String(payment.id).padStart(3, '0')}`;
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));
        return payment;
    }

    // CRUD Operations for Complaints
    getComplaints() {
        return JSON.parse(localStorage.getItem('complaints') || '[]');
    }

    addComplaint(complaint) {
        const complaints = this.getComplaints();
        complaint.id = complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1;
        complaint.date = new Date().toISOString().split('T')[0];
        complaint.status = 'جديدة';
        complaints.push(complaint);
        localStorage.setItem('complaints', JSON.stringify(complaints));
        return complaint;
    }

    updateComplaint(id, updates) {
        const complaints = this.getComplaints();
        const index = complaints.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            complaints[index] = { ...complaints[index], ...updates };
            localStorage.setItem('complaints', JSON.stringify(complaints));
            return complaints[index];
        }
        return null;
    }

    // CRUD Operations for Maintenance
    getMaintenance() {
        return JSON.parse(localStorage.getItem('maintenance') || '[]');
    }

    addMaintenance(maintenance) {
        const maintenanceList = this.getMaintenance();
        maintenance.id = maintenanceList.length > 0 ? Math.max(...maintenanceList.map(m => m.id)) + 1 : 1;
        maintenance.requestDate = new Date().toISOString().split('T')[0];
        maintenance.status = 'مجدول';
        maintenanceList.push(maintenance);
        localStorage.setItem('maintenance', JSON.stringify(maintenanceList));
        return maintenance;
    }

    updateMaintenance(id, updates) {
        const maintenanceList = this.getMaintenance();
        const index = maintenanceList.findIndex(m => m.id === parseInt(id));
        if (index !== -1) {
            maintenanceList[index] = { ...maintenanceList[index], ...updates };
            localStorage.setItem('maintenance', JSON.stringify(maintenanceList));
            return maintenanceList[index];
        }
        return null;
    }

    // Statistics
    getStatistics() {
        const residents = this.getResidents();
        const units = this.getUnits();
        const payments = this.getPayments();
        const complaints = this.getComplaints();
        const maintenance = this.getMaintenance();

        return {
            totalUnits: units.length,
            occupiedUnits: units.filter(u => u.status === 'occupied').length,
            vacantUnits: units.filter(u => u.status === 'vacant').length,
            forRentUnits: units.filter(u => u.status === 'for-rent').length,
            totalResidents: residents.length,
            totalFamilyMembers: residents.reduce((sum, r) => sum + (r.familyMembers || 0), 0),
            paidPayments: payments.filter(p => p.status === 'مدفوع').length,
            pendingPayments: payments.filter(p => p.status === 'معلق').length,
            activeComplaints: complaints.filter(c => c.status !== 'محلولة' && c.status !== 'مغلقة').length,
            resolvedComplaints: complaints.filter(c => c.status === 'محلولة').length,
            activeMaintenance: maintenance.filter(m => m.status === 'قيد التنفيذ').length,
            completedMaintenance: maintenance.filter(m => m.status === 'مكتمل').length
        };
    }
}

// Create global instance
const dataManager = new DataManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
