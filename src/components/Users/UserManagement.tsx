import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreVertical,
  UserCheck,
  UserX,
  Sparkles,
} from "lucide-react";
import { User } from "../../types";
import { mockUsers } from "../../data/mockData";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "analyst":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "viewer":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "inactive":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "مدیر";
      case "analyst":
        return "تحلیلگر";
      case "viewer":
        return "مشاهده‌گر";
      default:
        return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "فعال";
      case "inactive":
        return "غیرفعال";
      default:
        return status;
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : ("active" as any),
            }
          : user
      )
    );
  };

  const deleteUser = (userId: string) => {
    if (confirm("آیا از حذف این کاربر اطمینان دارید؟")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const formatLastActive = (timestamp: string) => {
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
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white  mb-2">
            مدیریت کاربران
          </h2>
          <p className="text-xl text-gray-300">
            مدیریت کاربران و سطوح دسترسی سیستم
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 sm:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-2xl flex items-center space-x-3 space-x-reverse transition-all duration-300 card-hover btn-glow animate-pulse-glow"
        >
          <Plus className="h-6 w-6" />
          <span className="text-lg font-semibold">افزودن کاربر</span>
          <Sparkles className="h-5 w-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-8 card-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-6 lg:space-x-reverse relative z-10">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-300" />
            <input
              type="text"
              placeholder="جستجوی کاربران..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-14 pl-6 py-4 glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 text-lg transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Filter className="h-6 w-6 text-gray-300" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="all">همه نقش‌ها</option>
              <option value="admin">مدیر</option>
              <option value="analyst">تحلیلگر</option>
              <option value="viewer">مشاهده‌گر</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="glass rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg transition-all duration-300"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {filteredUsers.map((user, index) => (
          <div
            key={user.id}
            className="glass rounded-2xl p-8 card-hover relative overflow-hidden group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-2xl animate-float"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse-glow">
                  <span className="text-xl font-bold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white ">{user.name}</h3>
                  <p className="text-lg text-gray-300">{user.email}</p>
                </div>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <MoreVertical className="h-5 w-5 text-gray-300" />
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-300">بخش:</span>
                <span className="text-lg font-semibold text-white">
                  {user.department}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-300">آخرین فعالیت:</span>
                <span className="text-lg text-gray-300">
                  {formatLastActive(user.lastActive)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6 relative z-10">
              <span
                className={`px-4 py-2 text-sm rounded-full font-semibold border ${getRoleColor(user.role)}`}
              >
                {getRoleLabel(user.role)}
              </span>
              <span
                className={`px-4 py-2 text-sm rounded-full font-semibold border ${getStatusColor(user.status)}`}
              >
                {getStatusLabel(user.status)}
              </span>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse pt-6 border-t border-white/20 relative z-10">
              <button
                onClick={() => setSelectedUser(user)}
                className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse btn-glow"
              >
                <Edit className="h-5 w-5" />
                <span className="font-semibold">ویرایش</span>
              </button>
              <button
                onClick={() => toggleUserStatus(user.id)}
                className={`py-3 px-4 rounded-xl transition-all duration-300 btn-glow ${
                  user.status === "active"
                    ? "bg-gradient-to-r from-gray-500/20 to-red-500/20 hover:from-gray-500/30 hover:to-red-500/30 text-gray-300"
                    : "bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-green-300"
                }`}
              >
                {user.status === "active" ? (
                  <UserX className="h-5 w-5" />
                ) : (
                  <UserCheck className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 py-3 px-4 rounded-xl transition-all duration-300 btn-glow"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit User Modal */}
      {(showModal || selectedUser) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-8 w-full max-w-lg mx-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-float"></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6  relative z-10">
              {selectedUser ? "ویرایش کاربر" : "افزودن کاربر جدید"}
            </h3>
            <form className="space-y-6 relative z-10">
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  نام کامل
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser?.name || ""}
                  className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="نام کامل کاربر"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser?.email || ""}
                  className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="email@company.ir"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  نقش
                </label>
                <select
                  defaultValue={selectedUser?.role || ""}
                  className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="">نقش را انتخاب کنید</option>
                  <option value="admin">مدیر</option>
                  <option value="analyst">تحلیلگر</option>
                  <option value="viewer">مشاهده‌گر</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-200 mb-2">
                  بخش
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser?.department || ""}
                  className="w-full glass rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="نام بخش"
                />
              </div>
              <div className="flex items-center space-x-4 space-x-reverse pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 py-3 px-6 rounded-xl transition-all duration-300 font-semibold"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold btn-glow"
                >
                  {selectedUser ? "به‌روزرسانی" : "ایجاد"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
