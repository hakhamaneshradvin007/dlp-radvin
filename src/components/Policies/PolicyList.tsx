import React, { useState } from "react";
import {
  Shield,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreVertical,
  Sparkles,
} from "lucide-react";
import { Policy } from "../../types";

const PolicyList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const policies: Policy[] = [
    {
      id: "1",
      name: "اسکنر پیوست ایمیل",
      description: "اسکن پیوست‌های ایمیل برای الگوهای داده حساس",
      type: "email_security",
      status: "active",
      severity: "high",
      rules: [],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "2",
      name: "نظارت دستگاه USB",
      description: "نظارت و کنترل اتصالات دستگاه USB",
      type: "endpoint_protection",
      status: "active",
      severity: "critical",
      rules: [],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "3",
      name: "تحلیلگر ترافیک شبکه",
      description: "تحلیل ترافیک شبکه برای تلاش‌های نشت داده",
      type: "network_monitoring",
      status: "inactive",
      severity: "medium",
      rules: [],
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300";
      case "inactive":
        return "bg-gray-500/20 text-gray-300";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-300";
      case "high":
        return "bg-orange-500/20 text-orange-300";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300";
      case "low":
        return "bg-blue-500/20 text-blue-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "data_classification":
        return "طبقه‌بندی داده";
      case "endpoint_protection":
        return "حفاظت نقطه پایانی";
      case "network_monitoring":
        return "نظارت شبکه";
      case "email_security":
        return "امنیت ایمیل";
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "فعال";
      case "inactive":
        return "غیرفعال";
      case "pending":
        return "در انتظار";
      default:
        return status;
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

  return (
    <div className="space-y-8 relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white  mb-2">سیاست‌ها</h2>
          <p className="text-xl text-gray-300">
            مدیریت سیاست‌های جلوگیری از نشت داده
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl flex items-center space-x-3 space-x-reverse transition-all duration-300 card-hover btn-glow animate-pulse-glow"
        >
          <Plus className="h-6 w-6" />
          <span className="text-lg font-semibold">ایجاد سیاست</span>
          <Sparkles className="h-5 w-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-6 sm:space-x-reverse relative z-10">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-300" />
            <input
              type="text"
              placeholder="جستجوی سیاست‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-14 pl-6 py-4 glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 text-lg transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Filter className="h-6 w-6 text-gray-300" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="all">همه انواع</option>
              <option value="email_security">امنیت ایمیل</option>
              <option value="endpoint_protection">حفاظت نقطه پایانی</option>
              <option value="network_monitoring">نظارت شبکه</option>
              <option value="data_classification">طبقه‌بندی داده</option>
            </select>
          </div>
        </div>
      </div>

      {/* Policy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {policies.map((policy, index) => (
          <div
            key={policy.id}
            className="glass rounded-2xl p-8 card-hover relative overflow-hidden group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl animate-float"></div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl animate-pulse-glow">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white ">
                    {policy.name}
                  </h3>
                  <p className="text-lg text-gray-300">
                    {getTypeLabel(policy.type)}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <MoreVertical className="h-5 w-5 text-gray-300" />
                </button>
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-6 relative z-10">
              {policy.description}
            </p>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span
                  className={`px-4 py-2 text-sm rounded-full font-semibold ${getStatusColor(policy.status)}`}
                >
                  {getStatusLabel(policy.status)}
                </span>
                <span
                  className={`px-4 py-2 text-sm rounded-full font-semibold ${getSeverityColor(policy.severity)}`}
                >
                  {getSeverityLabel(policy.severity)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-lg text-gray-300 mb-6 relative z-10">
              <span>
                به‌روزرسانی{" "}
                {new Date(policy.updatedAt).toLocaleDateString("fa-IR")}
              </span>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse pt-6 border-t border-white/20 relative z-10">
              <button className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse btn-glow">
                <Edit className="h-5 w-5" />
                <span className="font-semibold">ویرایش</span>
              </button>
              <button className="bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 py-3 px-4 rounded-xl transition-all duration-300 btn-glow">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Policy Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass rounded-2xl p-8 w-full max-w-lg mx-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6  relative z-10">
              ایجاد سیاست جدید
            </h3>
            <form className="space-y-6 relative z-10">
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  نام سیاست
                </label>
                <input
                  type="text"
                  className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="نام سیاست را وارد کنید"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  نوع
                </label>
                <select className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white">
                  <option value="">نوع را انتخاب کنید</option>
                  <option value="email_security">امنیت ایمیل</option>
                  <option value="endpoint_protection">حفاظت نقطه پایانی</option>
                  <option value="network_monitoring">نظارت شبکه</option>
                  <option value="data_classification">طبقه‌بندی داده</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={4}
                  className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="توضیحات سیاست را وارد کنید"
                ></textarea>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 py-3 px-6 rounded-xl transition-all duration-300 font-semibold"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold btn-glow"
                >
                  ایجاد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyList;
