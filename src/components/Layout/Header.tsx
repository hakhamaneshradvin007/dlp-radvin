import React from "react";
import {
  Bell,
  Search,
  Menu,
  Star,
  LogOut,
  User,
  Sun,
  Moon,
  Palette,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

interface HeaderProps {
  title: string;
  onMenuToggle?: () => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuToggle, onLogout }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      default:
        return <Palette className="h-5 w-5" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "روشن";
      case "dark":
        return "تیره";
      default:
        return "گرادیانت";
    }
  };

  return (
    <header className="glass border-b border-white/20 px-4 sm:px-6 py-4 relative overflow-visible sticky top-0 z-[2000] flex-shrink-0">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute top-0 right-1/3 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4 sm:space-x-6 space-x-reverse">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 sm:p-3 rounded-xl glass hover:bg-white/20 transition-all duration-300 card-hover"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-themed-primary" />
          </button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-themed-primary font-display font-bold">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6 space-x-reverse">
          <div className="relative hidden md:block">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
            <input
              type="text"
              placeholder="جستجو..."
              className="pr-12 pl-4 py-2 sm:py-3 glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-themed-primary placeholder-gray-300 w-48 lg:w-64 xl:w-80 transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          <div className="relative">
            <button className="p-2 sm:p-3 rounded-xl glass hover:bg-white/20 relative transition-all duration-300 card-hover">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-themed-primary" />
              <span className="absolute -top-1 -left-1 h-3 w-3 sm:h-4 sm:w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                3
              </span>
            </button>
          </div>

          {/* Theme Selector */}
          <div className="relative group">
            <button className="p-2 sm:p-3 rounded-xl glass hover:bg-white/20 transition-all duration-300 card-hover flex items-center space-x-2 space-x-reverse">
              {getThemeIcon()}
              <span className="text-sm font-semibold text-themed-primary hidden lg:block">
                {getThemeLabel()}
              </span>
            </button>

            {/* Theme Dropdown */}
            <div className="absolute left-0 top-full mt-2 w-36 sm:w-40 lg:w-48 glass rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[3000]">
              <button
                onClick={() => setTheme("light")}
                className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 ${
                  theme === "light"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-themed-secondary hover:bg-white/10"
                }`}
              >
                <Sun className="h-5 w-5" />
                <span className="text-sm sm:text-base">تم روشن</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-themed-secondary hover:bg-white/10"
                }`}
              >
                <Moon className="h-5 w-5" />
                <span className="text-sm sm:text-base">تم تیره</span>
              </button>
              <button
                onClick={() => setTheme("gradient")}
                className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 ${
                  theme === "gradient"
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-themed-secondary hover:bg-white/10"
                }`}
              >
                <Palette className="h-5 w-5" />
                <span className="text-sm sm:text-base">تم گرادیانت</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse-glow cursor-pointer card-hover">
                <span className="text-sm sm:text-lg font-bold text-white">
                  {user?.name.charAt(0)}
                </span>
              </div>

              {/* User Dropdown */}
              <div className="absolute left-0 top-full mt-2 w-48 sm:w-56 lg:w-64 glass rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[3000]">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-themed-primary font-semibold">
                      {user?.name}
                    </p>
                    <p className="text-xs sm:text-sm text-themed-muted font-caption">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-3">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 space-x-reverse px-3 py-2 text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 font-body text-sm sm:text-base"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>خروج از سیستم</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
