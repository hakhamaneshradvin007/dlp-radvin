import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  BarChart3,
  AlertTriangle,
  FileSearch,
  Users,
  Settings,
  Bell,
  Activity,
  LogOut,
  FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { usePermissions } from "../../hooks/usePermissions";

interface SidebarProps {
  currentPage: string;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onLogout }) => {
  const { user, logout } = useAuth();
  const { canAccessRoute } = usePermissions();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };

  const handleNavigation = (page: string) => {
    if (page === "dashboard") {
      navigate("/");
    } else {
      navigate(`/${page}`);
    }
  };

  const menuItems = [
    { id: "dashboard", label: "داشبورد", icon: BarChart3 },
    { id: "policies", label: "سیاست‌ها", icon: Shield },
    { id: "monitoring", label: "نظارت زنده", icon: Activity },
    { id: "alerts", label: "هشدارها", icon: AlertTriangle },
    { id: "reports", label: "گزارش‌ها", icon: FileSearch },
    { id: "users", label: "کاربران", icon: Users },
    { id: "logs", label: "لاگ‌ها", icon: FileText },
    { id: "settings", label: "تنظیمات", icon: Settings },
  ];

  const getRouteFromId = (id: string) => {
    return id === "dashboard" ? "/" : `/${id}`;
  };

  const visibleMenuItems = menuItems.filter((item) =>
    canAccessRoute(getRouteFromId(item.id))
  );

  return (
    <div className="w-64 sm:w-72 glass-dark h-screen flex flex-col relative overflow-hidden fixed right-0 top-0 z-30">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400 to-red-600 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 border-b border-white/20">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl animate-pulse-glow">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl text-themed-primary font-display font-bold">
              DLP
            </h1>
            <p className="text-xs sm:text-sm text-themed-muted font-body">
              پلتفرم جلوگیری از نشت داده
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 relative z-10">
        <ul className="space-y-2 sm:space-y-3">
          {visibleMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in"
              >
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center space-x-4 space-x-reverse px-4 py-4 rounded-xl transition-all duration-300 card-hover relative overflow-hidden group ${
                    currentPage === item.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl animate-pulse-glow"
                      : "text-themed-muted hover:bg-white/10 hover:text-themed-primary"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
                  <span className="font-semibold text-sm sm:text-base lg:text-lg relative z-10 font-heading">
                    {item.label}
                  </span>
                  {currentPage === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 sm:p-4 border-t border-white/20 relative z-10 mt-auto">
        <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse px-3 sm:px-4 py-3 sm:py-4 glass rounded-xl mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-glow">
            <span className="text-sm sm:text-base lg:text-lg font-bold text-white">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm sm:text-base lg:text-lg text-themed-primary font-heading font-semibold">
              {user?.name}
            </p>
            <p className="text-xs sm:text-sm text-themed-muted font-body">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 sm:space-x-4 space-x-reverse px-3 sm:px-4 py-2 sm:py-3 text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-300 btn-glow font-body text-sm sm:text-base"
        >
          <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-semibold">خروج از سیستم</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
