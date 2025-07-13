'use client';
import { useSessionCheck } from "@/components/findcookies";
import { useEffect, useRef, useState } from "react";

type Monthly = {
  id: number;
  month: string;
  total_income: number;
  total_refunds: number;
  net_revenue: number;
  transactions_count: number;
};

export default function MonthlySummary() {
  useSessionCheck();
  const [monthly, setMonthly] = useState<Monthly[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    fetch("http://localhost:3001/finance/monthly")
      .then((res) => res.json())
      .then(setMonthly);
  }, []);


  
  const handlePrint = () => {
    const printContent = tableRef.current?.outerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Monthly Income</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Monthly Income</h1>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-black">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Finance Summary</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm" ref={tableRef}>
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Income</th>
              <th className="px-4 py-3">Refunds</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Transactions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 ">
            {monthly.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 transition ">
                <td className="mr-40 px-4 py-3 font-medium text-gray-800">{m.month}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">৳{m.total_income}</td>
                <td className="px-4 py-3 text-red-500">৳{m.total_refunds}</td>
                <td className="px-4 py-3 text-blue-600 font-semibold">৳{m.net_revenue}</td>
                <td className="px-4 py-3">{m.transactions_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
    <button
      onClick={handlePrint}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
    >
    Print
    </button>
  </div>
    </div>
  );
}
