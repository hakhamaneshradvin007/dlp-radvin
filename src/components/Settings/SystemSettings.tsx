import React, { useState } from "react";
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Bell,
  Database,
  Network,
  Sparkles,
} from "lucide-react";

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      alertThreshold: "medium",
    },
    security: {
      sessionTimeout: 30,
      passwordPolicy: "strong",
      twoFactorAuth: true,
      ipWhitelist: true,
    },
    monitoring: {
      realTimeScanning: true,
      logRetention: 90,
      scanFrequency: "hourly",
      autoQuarantine: true,
    },
    system: {
      language: "fa",
      timezone: "Asia/Tehran",
      theme: "dark",
      autoBackup: true,
    },
  });

  const handleSave = () => {
    // Simulate saving settings
    alert("تنظیمات با موفقیت ذخیره شد!");
  };

  const handleReset = () => {
    if (confirm("آیا از بازنشانی تنظیمات به حالت پیش‌فرض اطمینان دارید؟")) {
      // Reset to default settings
      alert("تنظیمات به حالت پیش‌فرض بازنشانی شد.");
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white  mb-2">تنظیمات سیستم</h2>
          <p className="text-xl text-gray-300">پیکربندی و تنظیمات پلتفرم DLP</p>
        </div>
        <div className="mt-6 sm:mt-0 flex items-center space-x-4 space-x-reverse">
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-gray-500/20 to-red-500/20 hover:from-gray-500/30 hover:to-red-500/30 text-gray-300 px-6 py-4 rounded-2xl flex items-center space-x-3 space-x-reverse transition-all duration-300 card-hover btn-glow"
          >
            <RefreshCw className="h-6 w-6" />
            <span className="text-lg font-semibold">بازنشانی</span>
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-4 rounded-2xl flex items-center space-x-3 space-x-reverse transition-all duration-300 card-hover btn-glow animate-pulse-glow"
          >
            <Save className="h-6 w-6" />
            <span className="text-lg font-semibold">ذخیره تغییرات</span>
            <Sparkles className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Notifications */}
        <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full blur-2xl animate-float"></div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse mb-6 relative z-10">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl animate-pulse-glow">
              <Bell className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white ">اعلان‌ها</h3>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-300">اعلان‌های ایمیل</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.emailAlerts}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        emailAlerts: e.target.checked,
                      },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-300">اعلان‌های پوش</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        pushNotifications: e.target.checked,
                      },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-lg text-gray-300 mb-2">
                آستانه هشدار
              </label>
              <select
                value={settings.notifications.alertThreshold}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      alertThreshold: e.target.value,
                    },
                  }))
                }
                className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="low">پایین</option>
                <option value="medium">متوسط</option>
                <option value="high">بالا</option>
                <option value="critical">بحرانی</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-2xl animate-float"></div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse mb-6 relative z-10">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl animate-pulse-glow">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white ">امنیت</h3>
          </div>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-lg text-gray-300 mb-2">
                مهلت نشست (دقیقه)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      sessionTimeout: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-300">
                احراز هویت دو مرحله‌ای
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        twoFactorAuth: e.target.checked,
                      },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-lg text-gray-300 mb-2">
                سیاست رمز عبور
              </label>
              <select
                value={settings.security.passwordPolicy}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      passwordPolicy: e.target.value,
                    },
                  }))
                }
                className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="weak">ضعیف</option>
                <option value="medium">متوسط</option>
                <option value="strong">قوی</option>
                <option value="very-strong">بسیار قوی</option>
              </select>
            </div>
          </div>
        </div>

        {/* Monitoring */}
        <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-2xl animate-float"></div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse mb-6 relative z-10">
            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl animate-pulse-glow">
              <Network className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white ">نظارت</h3>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-300">اسکن real-time</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.monitoring.realTimeScanning}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      monitoring: {
                        ...prev.monitoring,
                        realTimeScanning: e.target.checked,
                      },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-lg text-gray-300 mb-2">
                مدت نگهداری لاگ (روز)
              </label>
              <input
                type="number"
                value={settings.monitoring.logRetention}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    monitoring: {
                      ...prev.monitoring,
                      logRetention: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              />
            </div>

            <div>
              <label className="block text-lg text-gray-300 mb-2">
                فرکانس اسکن
              </label>
              <select
                value={settings.monitoring.scanFrequency}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    monitoring: {
                      ...prev.monitoring,
                      scanFrequency: e.target.value,
                    },
                  }))
                }
                className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="realtime">real-time</option>
                <option value="hourly">ساعتی</option>
                <option value="daily">روزانه</option>
                <option value="weekly">هفتگی</option>
              </select>
            </div>
          </div>
        </div>

        {/* System */}
        <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full blur-2xl animate-float"></div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse mb-6 relative z-10">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl animate-pulse-glow">
              <Database className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white ">سیستم</h3>
          </div>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-lg text-gray-300 mb-2">زبان</label>
              <select
                value={settings.system.language}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    system: { ...prev.system, language: e.target.value },
                  }))
                }
                className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="fa">فارسی</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            <div>
              <label className="block text-lg text-gray-300 mb-2">
                منطقه زمانی
              </label>
              <select
                value={settings.system.timezone}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    system: { ...prev.system, timezone: e.target.value },
                  }))
                }
                className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="Asia/Tehran">تهران</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">نیویورک</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-300">پشتیبان‌گیری خودکار</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.autoBackup}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      system: { ...prev.system, autoBackup: e.target.checked },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
