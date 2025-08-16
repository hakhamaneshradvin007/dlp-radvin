import { Policy, Alert, User, ActivityLog, DashboardMetrics } from "../types";

export const mockPolicies: Policy[] = [
  {
    id: "1",
    name: "اسکنر پیوست ایمیل",
    description:
      "اسکن خودکار پیوست‌های ایمیل برای شناسایی اطلاعات حساس مانند شماره کارت اعتباری و کد ملی",
    type: "email_security",
    status: "active",
    severity: "high",
    rules: [
      {
        id: "1",
        condition: "شماره کارت اعتباری",
        action: "block",
        enabled: true,
      },
      { id: "2", condition: "کد ملی", action: "alert", enabled: true },
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    name: "نظارت دستگاه USB",
    description:
      "کنترل و نظارت بر اتصالات دستگاه‌های USB و جلوگیری از انتقال غیرمجاز داده",
    type: "endpoint_protection",
    status: "active",
    severity: "critical",
    rules: [
      {
        id: "3",
        condition: "اتصال USB ناشناخته",
        action: "block",
        enabled: true,
      },
      {
        id: "4",
        condition: "انتقال فایل بزرگ",
        action: "quarantine",
        enabled: true,
      },
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    name: "تحلیلگر ترافیک شبکه",
    description:
      "تحلیل ترافیک شبکه برای شناسایی تلاش‌های نشت داده و فعالیت‌های مشکوک",
    type: "network_monitoring",
    status: "inactive",
    severity: "medium",
    rules: [
      {
        id: "5",
        condition: "ترافیک خروجی غیرعادی",
        action: "alert",
        enabled: false,
      },
    ],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
  {
    id: "4",
    name: "طبقه‌بندی اسناد مالی",
    description:
      "شناسایی و طبقه‌بندی خودکار اسناد مالی و اعمال سیاست‌های امنیتی مناسب",
    type: "data_classification",
    status: "active",
    severity: "high",
    rules: [
      {
        id: "6",
        condition: "شماره حساب بانکی",
        action: "block",
        enabled: true,
      },
      { id: "7", condition: "اطلاعات مالی", action: "log", enabled: true },
    ],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-22",
  },
  {
    id: "5",
    name: "محافظ اطلاعات شخصی",
    description:
      "حفاظت از اطلاعات شخصی کاربران شامل شماره تلفن، آدرس و اطلاعات هویتی",
    type: "data_classification",
    status: "pending",
    severity: "medium",
    rules: [
      { id: "8", condition: "شماره تلفن", action: "alert", enabled: true },
      { id: "9", condition: "آدرس منزل", action: "log", enabled: true },
    ],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-23",
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "نشت احتمالی داده مالی شناسایی شد",
    description:
      "کاربر john.doe@company.ir تلاش کرده فایل حاوی شماره‌های حساب بانکی را از طریق ایمیل ارسال کند",
    severity: "critical",
    status: "open",
    timestamp: new Date().toISOString(),
    source: "اسکنر ایمیل",
    policyId: "1",
  },
  {
    id: "2",
    title: "اتصال دستگاه USB غیرمجاز",
    description:
      "دستگاه USB ناشناخته به ایستگاه کاری WS-15 متصل شد و تلاش انتقال داده انجام داد",
    severity: "high",
    status: "investigating",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    source: "عامل نقطه پایانی",
    policyId: "2",
  },
  {
    id: "3",
    title: "ترافیک خروجی غیرعادی",
    description: "حجم بالای انتقال داده به IP خارجی 185.143.223.45 شناسایی شد",
    severity: "medium",
    status: "resolved",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    source: "مانیتور شبکه",
  },
  {
    id: "4",
    title: "تلاش دسترسی غیرمجاز به پایگاه داده",
    description:
      "کاربر guest تلاش کرده به جداول حساس پایگاه داده دسترسی پیدا کند",
    severity: "high",
    status: "open",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    source: "مانیتور پایگاه داده",
  },
  {
    id: "5",
    title: "آپلود فایل مشکوک",
    description:
      "فایل با پسوند .exe در سرور فایل آپلود شد که ممکن است حاوی بدافزار باشد",
    severity: "medium",
    status: "investigating",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    source: "اسکنر فایل",
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "علی احمدی",
    email: "ali.ahmadi@company.ir",
    role: "admin",
    department: "IT",
    lastActive: new Date(Date.now() - 300000).toISOString(),
    status: "active",
  },
  {
    id: "2",
    name: "فاطمه رضایی",
    email: "fateme.rezaei@company.ir",
    role: "analyst",
    department: "امنیت",
    lastActive: new Date(Date.now() - 600000).toISOString(),
    status: "active",
  },
  {
    id: "3",
    name: "محمد کریمی",
    email: "mohammad.karimi@company.ir",
    role: "viewer",
    department: "کاربر عادی",
    lastActive: new Date(Date.now() - 86400000).toISOString(),
    status: "active",
  },
  {
    id: "4",
    name: "زهرا محمدی",
    email: "zahra.mohammadi@company.ir",
    role: "analyst",
    department: "منابع انسانی",
    lastActive: new Date(Date.now() - 1800000).toISOString(),
    status: "active",
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    user: "علی احمدی",
    action: "ایجاد سیاست جدید",
    resource: "اسکنر پیوست ایمیل",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    details: "سیاست جدید برای اسکن پیوست‌های ایمیل ایجاد شد",
  },
  {
    id: "2",
    user: "فاطمه رضایی",
    action: "بررسی هشدار",
    resource: "هشدار #1247",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    details: "هشدار نشت داده بررسی و حل شد",
  },
  {
    id: "3",
    user: "محمد کریمی",
    action: "مشاهده گزارش",
    resource: "گزارش ماهانه",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    details: "گزارش امنیتی ماه جاری مشاهده شد",
  },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalPolicies: 24,
  activePolicies: 21,
  totalAlerts: 156,
  criticalAlerts: 8,
  blockedAttempts: 1247,
  dataScanned: "2.4 ترابایت",
  riskScore: 72,
};
