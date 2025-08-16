import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { usePermissions } from "../../hooks/usePermissions";

interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
  level: "info" | "warning" | "error" | "success";
  ip: string;
}

const UserLogs: React.FC = () => {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterDate, setFilterDate] = useState("today");

  // Mock data - در پروژه واقعی از API دریافت می‌شود
  const mockLogs: LogEntry[] = [
    {
      id: "1",
      timestamp: new Date().toISOString(),
      user: "علی احمدی",
      userId: "1",
      action: "ورود به سیستم",
      resource: "داشبورد",
      details: "ورود موفق از IP: 192.168.1.100",
      level: "success",
      ip: "192.168.1.100",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      user: "علی احمدی",
      userId: "1",
      action: "مشاهده گزارش",
      resource: "گزارش‌ها",
      details: "مشاهده گزارش امنیتی ماهانه",
      level: "info",
      ip: "192.168.1.100",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      user: "فاطمه رضایی",
      userId: "2",
      action: "ایجاد سیاست",
      resource: "سیاست‌ها",
      details: "سیاست جدید 'اسکنر ایمیل' ایجاد شد",
      level: "success",
      ip: "192.168.1.101",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      user: "محمد کریمی",
      userId: "3",
      action: "تلاش ورود ناموفق",
      resource: "احراز هویت",
      details: "رمز عبور اشتباه وارد شد",
      level: "warning",
      ip: "192.168.1.102",
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      user: "علی احمدی",
      userId: "1",
      action: "تغییر تنظیمات",
      resource: "تنظیمات سیستم",
      details: "تنظیمات اعلان‌ها به‌روزرسانی شد",
      level: "info",
      ip: "192.168.1.100",
    },
  ];

  useEffect(() => {
    // فیلتر کردن لاگ‌ها بر اساس سطح دسترسی
    const canViewAllLogs = hasPermission("logs.view.all");
    const filteredLogs = canViewAllLogs
      ? mockLogs
      : mockLogs.filter((log) => log.userId === user?.id);

    setLogs(filteredLogs);
  }, [user, hasPermission]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = filterLevel === "all" || log.level === filterLevel;

    const matchesDate = (() => {
      const logDate = new Date(log.timestamp);
      const now = new Date();

      switch (filterDate) {
        case "today":
          return logDate.toDateString() === now.toDateString();
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return logDate >= weekAgo;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return logDate >= monthAgo;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesLevel && matchesDate;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "success":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "error":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "success":
        return "موفق";
      case "warning":
        return "هشدار";
      case "error":
        return "خطا";
      default:
        return "اطلاعات";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("fa-IR");
  };

  const canViewAllLogs = hasPermission("logs.view.all");

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
          <h2 className="text-4xl font-bold text-white drop-shadow-[0_0_1px_#000] mb-2">
            {canViewAllLogs ? "لاگ‌های سیستم" : "لاگ‌های شخصی"}
          </h2>
          <p className="text-xl text-gray-300">
            {canViewAllLogs
              ? "مشاهده تمام فعالیت‌های سیستم"
              : "مشاهده فعالیت‌های شخصی شما"}
          </p>
        </div>
        <div className="mt-6 sm:mt-0 flex items-center space-x-4 space-x-reverse">
          <div className="glass rounded-xl px-4 py-2 flex items-center space-x-2 space-x-reverse">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-lg font-semibold text-white">
              {filteredLogs.length} رکورد
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-6 lg:space-x-reverse relative z-10">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-300" />
            <input
              type="text"
              placeholder="جستجو در لاگ‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-14 pl-6 py-4 glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 text-lg transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Filter className="h-6 w-6 text-gray-300" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="all">همه سطوح</option>
              <option value="success">موفق</option>
              <option value="info">اطلاعات</option>
              <option value="warning">هشدار</option>
              <option value="error">خطا</option>
            </select>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="today">امروز</option>
              <option value="week">این هفته</option>
              <option value="month">این ماه</option>
              <option value="all">همه</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4 relative z-10">
        {filteredLogs.map((log, index) => (
          <div
            key={log.id}
            className="glass rounded-2xl p-6 card-hover relative overflow-hidden group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-2xl animate-float"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-start space-x-4 space-x-reverse flex-1">
                <div className="p-3 glass rounded-xl">
                  {getLevelIcon(log.level)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 space-x-reverse mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {log.action}
                    </h3>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-semibold border ${getLevelColor(log.level)}`}
                    >
                      {getLevelLabel(log.level)}
                    </span>
                  </div>
                  <p className="text-lg text-gray-300 mb-3">{log.details}</p>
                  <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-400">
                    {canViewAllLogs && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <User className="h-4 w-4" />
                        <span>{log.user}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <FileText className="h-4 w-4" />
                      <span>{log.resource}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(log.timestamp)}</span>
                    </div>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              هیچ لاگی یافت نشد
            </h3>
            <p className="text-lg text-gray-300">
              با فیلترهای مختلف جستجو کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogs;
