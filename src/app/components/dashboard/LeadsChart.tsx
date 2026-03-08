import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { motion } from "motion/react";
import { useAppSelector } from "../hooks";

export function LeadsChart({ dark = false }: { dark?: boolean }) {
  const leads = useAppSelector((state) => state.contact?.leads ?? []);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyData: { name: string; leads: number }[] = [];

  for (let i = 0; i < 12; i++) {
    const monthLeads = leads.filter((l) => {
      const dateValue = l.created_at || l.createdAt;
      if (!dateValue) return false;
      const date = new Date(dateValue);
      return date.getMonth() === i;
    });
    monthlyData.push({ name: monthNames[i], leads: monthLeads.length });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`rounded-lg shadow-lg p-6 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="mb-6">
        <h3 className={`mb-1 ${dark ? "text-gray-100" : "text-gray-900"}`}>
          Lead Growth
        </h3>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
          Monthly lead acquisition trends
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyData}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={dark ? "#374151" : "#e5e7eb"}
          />
          <XAxis
            dataKey="name"
            stroke={dark ? "#d1d5db" : "#6b7280"}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke={dark ? "#d1d5db" : "#6b7280"}
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: dark ? "#1f2937" : "#ffffff",
              border: `1px solid ${dark ? "#374151" : "#e5e7eb"}`,
              borderRadius: "8px",
              boxShadow: dark
                ? "0 4px 6px -1px rgb(0 0 0 / 0.5)"
                : "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              color: dark ? "#f3f4f6" : "#111827",
            }}
          />
          <Area
            type="monotone"
            dataKey="leads"
            stroke="#dc2626"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorLeads)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
