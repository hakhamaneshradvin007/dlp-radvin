import React from "react";
import { LucideIcon, DivideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor,
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-300 bg-green-500/20";
      case "negative":
        return "text-red-300 bg-red-500/20";
      default:
        return "text-gray-300 bg-gray-500/20";
    }
  };

  return (
    <div className="glass rounded-2xl p-6 card-hover relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-lg text-themed-secondary font-body mb-2">
            {title}
          </p>
          <p className="text-4xl text-themed-primary text-title font-display mb-3">
            {value}
          </p>
          {change && (
            <p
              className={`text-sm px-3 py-1 rounded-full inline-block font-caption ${getChangeColor()}`}
            >
              {change}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${iconColor} animate-float relative`}>
          <Icon className="h-8 w-8 text-white" />
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
