import React, { useState, useEffect } from "react";
import {
  Activity,
  Eye,
  Shield,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

interface MonitoringEvent {
  id: string;
  type: "network" | "endpoint" | "email" | "file";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  source: string;
  status: "active" | "blocked" | "allowed";
}

const LiveMonitoring: React.FC = () => {
  const [events, setEvents] = useState<MonitoringEvent[]>([
    {
      id: "1",
      type: "network",
      title: "ترافیک خروجی غیرعادی شناسایی شد",
      description: "انتقال داده حجیم به IP خارجی 192.168.1.100",
      severity: "high",
      timestamp: new Date().toISOString(),
      source: "اسکنر شبکه",
      status: "blocked",
    },
    {
      id: "2",
      type: "email",
      title: "ایمیل با محتوای حساس",
      description: "شماره کارت اعتباری در ایمیل خروجی شناسایی شد",
      severity: "critical",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      source: "فیلتر ایمیل",
      status: "blocked",
    },
    {
      id: "3",
      type: "endpoint",
      title: "اتصال دستگاه USB",
      description: "دستگاه USB ناشناخته به ایستگاه کاری-15 متصل شد",
      severity: "medium",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      source: "عامل نقطه پایانی",
      status: "active",
    },
  ]);

  const [isLive, setIsLive] = useState(true);

  // Simulate real-time events
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const eventTitles = [
        "رویداد امنیتی جدید شناسایی شد",
        "تلاش دسترسی غیرمجاز",
        "انتقال فایل مشکوک",
        "فعالیت غیرعادی کاربر",
      ];

      const newEvent: MonitoringEvent = {
        id: Date.now().toString(),
        type: ["network", "endpoint", "email", "file"][
          Math.floor(Math.random() * 4)
        ] as any,
        title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
        description: "سیستم نظارت خودکار ریسک احتمالی را شناسایی کرد",
        severity: ["low", "medium", "high"][
          Math.floor(Math.random() * 3)
        ] as any,
        timestamp: new Date().toISOString(),
        source: "اسکنر خودکار",
        status: ["active", "blocked", "allowed"][
          Math.floor(Math.random() * 3)
        ] as any,
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "network":
        return Wifi;
      case "endpoint":
        return Shield;
      case "email":
        return Activity;
      case "file":
        return Eye;
      default:
        return Activity;
    }
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "blocked":
        return <Shield className="h-5 w-5 text-red-300" />;
      case "allowed":
        return <CheckCircle className="h-5 w-5 text-green-300" />;
      case "active":
        return <Clock className="h-5 w-5 text-yellow-300" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "blocked":
        return "مسدود شده";
      case "allowed":
        return "مجاز";
      case "active":
        return "فعال";
      default:
        return status;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "همین الان";
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    return date.toLocaleTimeString("fa-IR");
  };

  return (
    <div className="space-y-8 relative">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <h2 className="text-4xl font-bold text-white neon-text mb-2">
            نظارت زنده
          </h2>
          <p className="text-xl text-gray-300">
            نظارت real-time رویدادهای امنیتی
          </p>
        </div>
        <div className="mt-6 sm:mt-0 flex items-center space-x-6 space-x-reverse">
          <div className="flex items-center space-x-3 space-x-reverse glass rounded-xl px-4 py-2">
            <div
              className={`w-4 h-4 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
            ></div>
            <span className="text-lg font-semibold text-white">
              {isLive ? "زنده" : "متوقف"}
            </span>
            <Zap className="h-5 w-5 text-yellow-400" />
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 btn-glow ${
              isLive
                ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300"
                : "bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-green-300"
            }`}
          >
            {isLive ? "توقف" : "شروع"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">رویدادهای فعال</p>
              <p className="text-3xl font-bold text-white neon-text">
                {events.filter((e) => e.status === "active").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl animate-pulse-glow">
              <Clock className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400 to-pink-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">مسدود شده</p>
              <p className="text-3xl font-bold text-white neon-text">
                {events.filter((e) => e.status === "blocked").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl animate-pulse-glow">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">مجاز</p>
              <p className="text-3xl font-bold text-white neon-text">
                {events.filter((e) => e.status === "allowed").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl animate-pulse-glow">
              <CheckCircle className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full blur-2xl animate-float"></div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-lg text-gray-300 mb-1">بحرانی</p>
              <p className="text-3xl font-bold text-white neon-text">
                {events.filter((e) => e.severity === "critical").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl animate-pulse-glow">
              <AlertTriangle className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Stream */}
      <div className="glass rounded-2xl card-hover relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="p-8 border-b border-white/20 relative z-10">
          <h3 className="text-2xl font-bold text-white neon-text">
            جریان رویدادها
          </h3>
        </div>
        <div className="divide-y divide-white/10 max-h-96 overflow-y-auto relative z-10">
          {events.map((event, index) => {
            const TypeIcon = getTypeIcon(event.type);
            return (
              <div
                key={event.id}
                className="p-6 hover:bg-white/5 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-6 space-x-reverse">
                  <div className="flex-shrink-0">
                    <div className="p-3 glass rounded-xl">
                      <TypeIcon className="h-7 w-7 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <p className="text-lg font-semibold text-white">
                        {event.title}
                      </p>
                      <div
                        className={`w-3 h-3 rounded-full ${getSeverityColor(event.severity)} animate-pulse`}
                      ></div>
                    </div>
                    <p className="text-lg text-gray-300 mb-3">
                      {event.description}
                    </p>
                    <div className="flex items-center space-x-6 space-x-reverse">
                      <span className="text-sm text-gray-400">
                        {event.source}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatTime(event.timestamp)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {getStatusLabel(event.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="p-2 glass rounded-lg">
                      {getStatusIcon(event.status)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
