'use client';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { useSessionCheck } from '@/components/findcookies';

type MonthlyData = {
  month: string;
  total: number;
};

export default function MonthlyIncomeChart() {
  useSessionCheck();
  const [data, setData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/finance/chart/monthly-income')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Monthly Income Trend</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </div>
  );
}
