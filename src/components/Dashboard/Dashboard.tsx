import React from "react";
import {
  Shield,
  AlertTriangle,
  Eye,
  TrendingUp,
  Activity,
  Users,
  Zap,
  Database,
} from "lucide-react";
import MetricCard from "./MetricCard";
import { DashboardMetrics } from "../../types";

const Dashboard: React.FC = () => {
  const metrics: DashboardMetrics = {
    totalPolicies: 24,
    activePolicies: 21,
    totalAlerts: 156,
    criticalAlerts: 8,
    blockedAttempts: 1247,
    dataScanned: "2.4 ترابایت",
    riskScore: 72,
  };

  const recentAlerts = [
    {
      id: "1",
      title: "انتقال مشکوک داده شناسایی شد",
      severity: "high",
      time: "2 دقیقه پیش",
    },
    {
      id: "2",
      title: "نقض سیاست: پیوست ایمیل",
      severity: "medium",
      time: "15 دقیقه پیش",
    },
    {
      id: "3",
      title: "تلاش دسترسی غیرمجاز",
      severity: "critical",
      time: "1 ساعت پیش",
    },
    {
      id: "4",
      title: "آپلود فایل حجیم شناسایی شد",
      severity: "low",
      time: "2 ساعت پیش",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-red-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-themed-primary text-title font-display mb-2">
            داشبورد
          </h2>
          <p className="text-lg sm:text-xl text-themed-secondary font-body">
            نمای کلی سیستم جلوگیری از نشت داده
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <MetricCard
          title="کل سیاست‌ها"
          value={metrics.totalPolicies}
          change="+2 این هفته"
          changeType="positive"
          icon={Shield}
          iconColor="bg-gradient-to-br from-blue-500 to-blue-700"
        />
        <MetricCard
          title="هشدارهای فعال"
          value={metrics.totalAlerts}
          change="+12% امروز"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="bg-gradient-to-br from-red-500 to-red-700"
        />
        <MetricCard
          title="تلاش‌های مسدود شده"
          value={metrics.blockedAttempts.toLocaleString("fa-IR")}
          change="+5% این هفته"
          changeType="positive"
          icon={Eye}
          iconColor="bg-gradient-to-br from-green-500 to-green-700"
        />
        <MetricCard
          title="داده اسکن شده"
          value={metrics.dataScanned}
          change="امروز"
          changeType="neutral"
          icon={Database}
          iconColor="bg-gradient-to-br from-purple-500 to-purple-700"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Risk Score */}
        <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-3xl animate-float"></div>
          </div>

          <h3 className="text-2xl text-themed-primary text-heading font-heading mb-6 relative z-10">
            امتیاز ریسک
          </h3>
          <div className="flex items-center justify-center relative z-10">
            <div className="relative w-40 h-40">
              <svg
                className="w-40 h-40 transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(metrics.riskScore / 100) * 314} 314`}
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white neon-text">
                  {metrics.riskScore}
                </span>
              </div>
            </div>
          </div>
          <p className="text-center text-lg text-themed-secondary font-body mt-4 relative z-10">
            {metrics.riskScore >= 80
              ? "ریسک بالا"
              : metrics.riskScore >= 60
                ? "ریسک متوسط"
                : "ریسک پایین"}
          </p>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-2 glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-2xl text-themed-primary text-heading font-heading">
              هشدارهای اخیر
            </h3>
            <button className="text-blue-300 hover:text-blue-200 text-lg btn-glow px-4 py-2 rounded-xl glass transition-all duration-300 font-body">
              مشاهده همه
            </button>
          </div>
          <div className="space-y-4 relative z-10">
            {recentAlerts.map((alert, index) => (
              <div
                key={alert.id}
                className="flex items-center space-x-4 space-x-reverse p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${getSeverityColor(alert.severity)} animate-pulse`}
                ></div>
                <div className="flex-1">
                  <p className="text-lg text-themed-primary font-heading">
                    {alert.title}
                  </p>
                  <p className="text-sm text-themed-muted font-caption">
                    {alert.time}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    alert.severity === "critical"
                      ? "bg-red-500/20 text-red-300"
                      : alert.severity === "high"
                        ? "bg-orange-500/20 text-orange-300"
                        : alert.severity === "medium"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  {alert.severity === "critical"
                    ? "بحرانی"
                    : alert.severity === "high"
                      ? "بالا"
                      : alert.severity === "medium"
                        ? "متوسط"
                        : "پایین"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-1/3 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-6 neon-text relative z-10">
          فعالیت سیستم
        </h3>
        <div className="space-y-6 relative z-10">
          <div className="flex items-center space-x-6 space-x-reverse animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center animate-pulse-glow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-white">
                سیاست جدید "اسکنر پیوست ایمیل" فعال شد
              </p>
              <p className="text-sm text-gray-300">5 دقیقه پیش</p>
            </div>
          </div>
          <div
            className="flex items-center space-x-6 space-x-reverse animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center animate-pulse-glow">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-white">
                هشدار بحرانی: نشت احتمالی داده شناسایی شد
              </p>
              <p className="text-sm text-gray-300">12 دقیقه پیش</p>
            </div>
          </div>
          <div
            className="flex items-center space-x-6 space-x-reverse animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center animate-pulse-glow">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-white">
                سطح دسترسی کاربر "john.doe@company.ir" به‌روزرسانی شد
              </p>
              <p className="text-sm text-gray-300">1 ساعت پیش</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
