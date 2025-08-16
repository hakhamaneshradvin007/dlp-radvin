import React, { useState } from "react";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { usePermissions } from "../../hooks/usePermissions";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const getDefaultRoute = (userRole: string) => {
    switch (userRole) {
      case "admin":
      case "analyst":
        return "/dashboard";
      case "viewer":
        return "/logs";
      default:
        return "/dashboard";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError("ایمیل یا رمز عبور اشتباه است");
    } else {
      // Get user info after successful login
      const savedUser = localStorage.getItem("dlp_user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        const defaultRoute = getDefaultRoute(userData.role);
        navigate(defaultRoute, { replace: true });
      }
    }
  };

  const demoAccounts = [
    { email: "admin@company.ir", role: "مدیر سیستم", password: "123456" },
    { email: "analyst@company.ir", role: "مسئول رده", password: "123456" },
    { email: "viewer@company.ir", role: "کاربر معمولی", password: "123456" },
  ];

  return (
    <div className="min-h-screen animate-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-red-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="glass rounded-3xl p-8 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl animate-pulse-glow">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white neon-text mb-2">
              گارد امن
            </h1>
            <p className="text-lg text-gray-300">
              ورود به پلتفرم جلوگیری از نشت داده
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center space-x-3 space-x-reverse relative z-10">
              <AlertCircle className="h-5 w-5 text-red-300 flex-shrink-0" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-lg font-semibold text-gray-200 mb-2">
                ایمیل
              </label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-14 pl-4 py-4 glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 text-lg transition-all duration-300"
                  placeholder="email@company.ir"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-200 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-14 pl-14 py-4 glass rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-300 text-lg transition-all duration-300"
                  placeholder="رمز عبور"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-300"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 btn-glow animate-pulse-glow flex items-center justify-center space-x-3 space-x-reverse"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>در حال ورود...</span>
                </>
              ) : (
                <>
                  <span>ورود به سیستم</span>
                  <Sparkles className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 glass rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-600 rounded-full blur-2xl animate-float"></div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 neon-text relative z-10">
            حساب‌های نمونه
          </h3>
          <div className="space-y-3 relative z-10">
            {demoAccounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div>
                  <p className="text-white font-semibold">{account.email}</p>
                  <p className="text-gray-300 text-sm">{account.role}</p>
                </div>
                <button
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                  className="text-blue-300 hover:text-blue-200 text-sm font-semibold px-3 py-1 rounded-lg glass hover:bg-white/10 transition-all duration-300"
                >
                  استفاده
                </button>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4 text-center relative z-10">
            رمز عبور همه حساب‌ها:{" "}
            <span className="font-mono bg-gray-700/50 px-2 py-1 rounded">
              123456
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
