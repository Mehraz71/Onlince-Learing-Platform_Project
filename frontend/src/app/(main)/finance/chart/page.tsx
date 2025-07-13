'use client';

import { useSessionCheck } from "@/components/findcookies";
import IncomeByCategoryChart from "../IncomeByCategoryChart/page";
import MonthlyIncomeChart from "../MonthlyIncomeChart/page";

 

export default function ChartDashboard() {
  useSessionCheck();
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">📈 Finance Charts</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <IncomeByCategoryChart />
        <MonthlyIncomeChart />
      </div>
    </div>
  );
}
