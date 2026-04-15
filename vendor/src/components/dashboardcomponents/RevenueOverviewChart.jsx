import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-[#006e2f]">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueOverviewChart = ({ monthlyRevenue = [], growth }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-5 sm:p-6 border border-gray-100 w-full">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-[#191c1e]">
            Revenue Overview
          </h2>
          <p className="text-xs sm:text-sm text-[#5c5f60]">
             Gross earnings compared to last month
          </p>
        </div>
        <div
          className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full ${growth >= 0
              ? "bg-[#22c55e]/10 text-[#006e2f]"
              : "bg-red-100 text-red-500"
            }`}
        >
          {growth !== null && growth !== undefined ? (
            <>
              {growth >= 0 ? "+" : ""}
              {growth}% Growth
            </>
          ) : (
            "--"
          )}
        </div>
      </div>
      {/* Chart */}
      <div className="w-full h-[240px] sm:h-[300px] md:h-[340px]">
        {!monthlyRevenue || monthlyRevenue.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <p>No revenue data available</p>
            <span className="text-xs text-gray-300 mt-1">
              Data will appear once sales start
            </span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue}>
              {/* Gradient */}
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006e2f" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#006e2f" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* Grid */}
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#f1f5f9"
              />
              {/* X Axis */}
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              {/* Y Axis */}
              <YAxis
                tickFormatter={(value) =>
                  value ? `₹${value / 1000}k` : "₹0"
                }
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              {/* Tooltip */}
              <Tooltip content={<CustomTooltip />} />
              {/* Area */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#006e2f"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RevenueOverviewChart;

