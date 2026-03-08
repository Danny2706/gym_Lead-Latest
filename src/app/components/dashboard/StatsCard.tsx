import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  delay = 0,
  dark = false,
}: StatsCardProps & { dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition-all border ${
        dark
          ? "bg-gray-900 text-gray-100 border-gray-700"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-900 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        {trend && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              trend.isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold mb-1">{value}</h3>
      <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
        {title}
      </p>
    </motion.div>
  );
}
