'use client';
import { useSessionCheck } from "@/components/findcookies";
import Link from "next/link";

export default function FinanceDashboard() {
  useSessionCheck();
  return (
  

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💰 Finance Dashboard</h1>
      <div className="space-y-3">
        <Link href="/finance/transactions" className="btn btn-primary">Transactions</Link>
        <Link href="/finance/expense" className="btn btn-secondary">Expenses</Link>
        <Link href="/finance/monthly" className="btn btn-accent">Monthly Summary</Link>
        <Link href="/finance/chart" className="btn btn-info">Income Charts</Link>
      </div>
    </div>
    
  );
}
