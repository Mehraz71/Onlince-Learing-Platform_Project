'use client';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { useSessionCheck } from '@/components/findcookies';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

type CategoryData = {
  category: string;
  total: number;
};

export default function IncomeByCategoryChart() {
  useSessionCheck();
  const [data, setData] = useState<CategoryData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/finance/chart/income-by-category')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Income by Category</h2>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="total"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
