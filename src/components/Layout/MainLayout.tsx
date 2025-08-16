import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

import { useAuth } from "../../contexts/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
      case "/dashboard":
        return "داشبورد";
      case "/policies":
        return "سیاست‌ها";
      case "/monitoring":
        return "نظارت زنده";
      case "/alerts":
        return "هشدارها";
      case "/reports":
        return "گزارش‌ها";
      case "/users":
        return "کاربران";
      case "/logs":
        return "لاگ‌ها";
      case "/settings":
        return "تنظیمات";
      default:
        return "داشبورد";
    }
  };

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "dashboard";
    return path.substring(1); // Remove leading slash
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <div className="min-h-screen animate-gradient flex relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-red-600/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 transition-transform duration-500 ease-in-out fixed right-0 top-0 h-full z-30 lg:z-10`}
      >
        <Sidebar currentPage={getCurrentPage()} onLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 lg:mr-72 h-screen">
        {/* Fixed Header */}
        <Header
          title={getPageTitle()}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-transparent">
          {children}
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="glass rounded-2xl p-8 w-full max-w-md mx-4 relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-3xl animate-float"></div>
            </div>

            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-themed-primary font-heading mb-4">
                خروج از سیستم
              </h3>
              <p className="text-lg text-themed-secondary font-body mb-8">
                آیا از خروج از حساب کاربری خود اطمینان دارید؟
              </p>

              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 text-themed-secondary py-3 px-6 rounded-xl transition-all duration-300 font-semibold font-body"
                >
                  لغو
                </button>
                <button
                  onClick={() => {
                    setShowLogoutModal(false);
                    logout();
                  }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold btn-glow font-body"
                >
                  خروج
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
