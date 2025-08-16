import React, { useState } from "react";
import {
  AlertTriangle,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  X,
  Sparkles,
} from "lucide-react";
import { Alert } from "../../types";
import { mockAlerts } from "../../data/mockData";

const AlertList: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus =
      filterStatus === "all" || alert.status === filterStatus;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "low":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "investigating":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "resolved":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical":
        return "بحرانی";
      case "high":
        return "بالا";
      case "medium":
        return "متوسط";
      case "low":
        return "پایین";
      default:
        return severity;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "باز";
      case "investigating":
        return "در حال بررسی";
      case "resolved":
        return "حل شده";
      default:
        return status;
    }
  };

  const handleStatusChange = (alertId: string, newStatus: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: newStatus as any } : alert
      )
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "همین الان";
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} ساعت پیش`;
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <div className="space-y-8 relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-orange-400/20 to-yellow-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white drop-shadow-[0_0_1px_#000] mb-2">
            مدیریت هشدارها
          </h2>
          <p className="text-xl text-gray-300">
            نظارت و مدیریت هشدارهای امنیتی سیستم
          </p>
        </div>
        <div className="mt-6 sm:mt-0 flex items-center space-x-4 space-x-reverse">
          <div className="glass rounded-xl px-4 py-2 flex items-center space-x-2 space-x-reverse">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-lg font-semibold text-white">
              {filteredAlerts.length} هشدار
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
              placeholder="جستجوی هشدارها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-14 pl-6 py-4 glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 text-lg transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Filter className="h-6 w-6 text-gray-300" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="all">همه سطوح</option>
              <option value="critical">بحرانی</option>
              <option value="high">بالا</option>
              <option value="medium">متوسط</option>
              <option value="low">پایین</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="open">باز</option>
              <option value="investigating">در حال بررسی</option>
              <option value="resolved">حل شده</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-6 relative z-10">
        {filteredAlerts.map((alert, index) => (
          <div
            key={alert.id}
            className="glass rounded-2xl p-8 card-hover relative overflow-hidden group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-2xl animate-float"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-start space-x-6 space-x-reverse flex-1">
                <div className="p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl animate-pulse-glow">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 space-x-reverse mb-3">
                    <h3 className="text-2xl font-bold text-white neon-text">
                      {alert.title}
                    </h3>
                    <span
                      className={`px-4 py-2 text-sm rounded-full font-semibold border ${getSeverityColor(alert.severity)}`}
                    >
                      {getSeverityLabel(alert.severity)}
                    </span>
                    <span
                      className={`px-4 py-2 text-sm rounded-full font-semibold border ${getStatusColor(alert.status)}`}
                    >
                      {getStatusLabel(alert.status)}
                    </span>
                  </div>
                  <p className="text-lg text-gray-300 mb-4">
                    {alert.description}
                  </p>
                  <div className="flex items-center space-x-6 space-x-reverse text-lg text-gray-400">
                    <span>منبع: {alert.source}</span>
                    <span>{formatTime(alert.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 rounded-xl transition-all duration-300 btn-glow"
                >
                  <Eye className="h-6 w-6" />
                </button>
                {alert.status !== "resolved" && (
                  <button
                    onClick={() => handleStatusChange(alert.id, "resolved")}
                    className="p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-green-300 rounded-xl transition-all duration-300 btn-glow"
                  >
                    <CheckCircle className="h-6 w-6" />
                  </button>
                )}
                {alert.status === "open" && (
                  <button
                    onClick={() =>
                      handleStatusChange(alert.id, "investigating")
                    }
                    className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-300 rounded-xl transition-all duration-300 btn-glow"
                  >
                    <Clock className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-8 w-full max-w-2xl mx-4 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-3xl animate-float"></div>
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <h3 className="text-2xl font-bold text-white neon-text">
                جزئیات هشدار
              </h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <X className="h-6 w-6 text-gray-300" />
              </button>
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  عنوان
                </label>
                <p className="text-xl text-white">{selectedAlert.title}</p>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  توضیحات
                </label>
                <p className="text-lg text-gray-300">
                  {selectedAlert.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-200 mb-2">
                    سطح خطر
                  </label>
                  <span
                    className={`px-4 py-2 text-sm rounded-full font-semibold border ${getSeverityColor(selectedAlert.severity)}`}
                  >
                    {getSeverityLabel(selectedAlert.severity)}
                  </span>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-200 mb-2">
                    وضعیت
                  </label>
                  <span
                    className={`px-4 py-2 text-sm rounded-full font-semibold border ${getStatusColor(selectedAlert.status)}`}
                  >
                    {getStatusLabel(selectedAlert.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-200 mb-2">
                    منبع
                  </label>
                  <p className="text-lg text-gray-300">
                    {selectedAlert.source}
                  </p>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-200 mb-2">
                    زمان
                  </label>
                  <p className="text-lg text-gray-300">
                    {formatTime(selectedAlert.timestamp)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse pt-6 border-t border-white/20">
                <button
                  onClick={() => {
                    handleStatusChange(selectedAlert.id, "investigating");
                    setSelectedAlert(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-300 py-3 px-6 rounded-xl transition-all duration-300 font-semibold btn-glow"
                >
                  شروع بررسی
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedAlert.id, "resolved");
                    setSelectedAlert(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-green-300 py-3 px-6 rounded-xl transition-all duration-300 font-semibold btn-glow"
                >
                  حل شده
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertList;
