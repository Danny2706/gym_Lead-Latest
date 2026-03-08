import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { motion } from "motion/react";
import { useAppSelector } from "../hooks";

interface ConversionChartProps {
  dark?: boolean;
}

export function ConversionChart({ dark = false }: ConversionChartProps) {
  const { leads } = useAppSelector((state) => state.contact);

  // Count leads by status
  const statusCounts = { new: 0, contacted: 0, qualified: 0, converted: 0 };
  leads.forEach((l) => {
    if (statusCounts[l.status] !== undefined) statusCounts[l.status]++;
  });

  const data = [
    { name: "New", value: statusCounts.new, color: "#3b82f6" },
    { name: "Contacted", value: statusCounts.contacted, color: "#eab308" },
    { name: "Qualified", value: statusCounts.qualified, color: "#a855f7" },
    { name: "Converted", value: statusCounts.converted, color: "#22c55e" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={`rounded-lg shadow-lg p-6 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-6">
        <h3
          className={`mb-1 font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}
        >
          Lead Status Distribution
        </h3>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
          Current pipeline breakdown
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

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

          <Legend
            wrapperStyle={{
              color: dark ? "#d1d5db" : "#111827",
              fontSize: "14px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
