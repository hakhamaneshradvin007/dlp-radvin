import React, { useState } from "react";
import {
  FileSearch,
  Download,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const ReportsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedType, setSelectedType] = useState("all");

  const reportData = {
    totalIncidents: 156,
    blockedAttempts: 1247,
    dataScanned: "2.4 ترابایت",
    policiesTriggered: 89,
    topThreats: [
      { name: "نشت اطلاعات مالی", count: 45, percentage: 28.8 },
      { name: "انتقال غیرمجاز فایل", count: 38, percentage: 24.4 },
      { name: "دسترسی غیرمجاز", count: 32, percentage: 20.5 },
      { name: "نقض سیاست ایمیل", count: 25, percentage: 16.0 },
      { name: "فعالیت مشکوک USB", count: 16, percentage: 10.3 },
    ],
    weeklyTrend: [
      { day: "شنبه", incidents: 12, blocked: 45 },
      { day: "یکشنبه", incidents: 18, blocked: 67 },
      { day: "دوشنبه", incidents: 25, blocked: 89 },
      { day: "سه‌شنبه", incidents: 22, blocked: 78 },
      { day: "چهارشنبه", incidents: 30, blocked: 112 },
      { day: "پنج‌شنبه", incidents: 28, blocked: 98 },
      { day: "جمعه", incidents: 21, blocked: 76 },
    ],
  };

  const generateReport = () => {
    // Simulate report generation
    alert("گزارش در حال تولید است...");
  };

  return (
    <div className="space-y-8 relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white  mb-2">
            گزارش‌ها و تحلیل‌ها
          </h2>
          <p className="text-xl text-gray-300">
            تحلیل جامع عملکرد سیستم امنیتی
          </p>
        </div>
        <button
          onClick={generateReport}
          className="mt-6 sm:mt-0 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-4 rounded-2xl flex items-center space-x-3 space-x-reverse transition-all duration-300 card-hover btn-glow animate-pulse-glow"
        >
          <Download className="h-6 w-6" />
          <span className="text-lg font-semibold">دانلود گزارش</span>
          <Sparkles className="h-5 w-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-6 sm:space-x-reverse relative z-10">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Calendar className="h-6 w-6 text-gray-300" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="day">امروز</option>
              <option value="week">این هفته</option>
              <option value="month">این ماه</option>
              <option value="quarter">این فصل</option>
              <option value="year">امسال</option>
            </select>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Filter className="h-6 w-6 text-gray-300" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="all">همه گزارش‌ها</option>
              <option value="security">امنیتی</option>
              <option value="compliance">انطباق</option>
              <option value="performance">عملکرد</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">کل حوادث</p>
              <p className="text-3xl font-bold text-white ">
                {reportData.totalIncidents}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl animate-pulse-glow">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">مسدود شده</p>
              <p className="text-3xl font-bold text-white ">
                {reportData.blockedAttempts.toLocaleString("fa-IR")}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl animate-pulse-glow">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">داده اسکن شده</p>
              <p className="text-3xl font-bold text-white ">
                {reportData.dataScanned}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl animate-pulse-glow">
              <PieChart className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">سیاست‌های فعال</p>
              <p className="text-3xl font-bold text-white ">
                {reportData.policiesTriggered}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl animate-pulse-glow">
              <FileSearch className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Top Threats */}
        <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-400 to-pink-600 rounded-full blur-3xl animate-float"></div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6  relative z-10">
            بالاترین تهدیدات
          </h3>
          <div className="space-y-4 relative z-10">
            {reportData.topThreats.map((threat, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-white">
                    {threat.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-lg text-gray-300">{threat.count}</span>
                  <span className="text-sm text-gray-400">
                    ({threat.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6  relative z-10">
            روند هفتگی
          </h3>
          <div className="space-y-4 relative z-10">
            {reportData.weeklyTrend.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-lg font-semibold text-white w-20">
                  {day.day}
                </span>
                <div className="flex items-center space-x-6 space-x-reverse flex-1">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-lg text-gray-300">
                      {day.incidents} حادثه
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-lg text-gray-300">
                      {day.blocked} مسدود
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
