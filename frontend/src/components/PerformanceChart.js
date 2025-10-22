import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = "http://localhost:5000";

export default function PerformanceChart() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${API_URL}/list_rules`);
    const rules = await res.json();
    const allow = rules.rules.filter(r => r.action === "ACCEPT").length;
    const block = rules.rules.filter(r => r.action === "DROP").length;
    setData([
      { name: "Allow", count: allow },
      { name: "Block", count: block },
    ]);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}
