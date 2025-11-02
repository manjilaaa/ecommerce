import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
  { month: "Jul", sales: 6500 },
];

const DashboardChart = () => {
  return (
    <div className="bg-white p-20 rounded-xl shadow mt-8 w-full ">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Monthly Sales Overview
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ fill: "#2563EB", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
