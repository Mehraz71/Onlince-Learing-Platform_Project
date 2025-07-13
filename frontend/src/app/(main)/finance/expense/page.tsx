'use client';
import { useSessionCheck } from "@/components/findcookies";
import { useEffect, useRef, useState } from "react";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  paid_to: string;
  expense_date: string;
  notes: string;
};

export default function ExpensesPage() {
  useSessionCheck();
  const [expenses, setExpenses] = useState<Expense[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);
  

  useEffect(() => {
    fetch("http://localhost:3001/finance/expense") 
      .then((res) => res.json())
      .then(setExpenses);
  }, []);

  const handlePrint = () => {
    const printContent = tableRef.current?.outerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>PINT Expense</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>All Expenses</h1>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-black">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">All Expenses</h2>

  <div className="overflow-x-auto">
    <table
      className="min-w-full divide-y divide-gray-200 text-sm text-left"
      ref={tableRef}
    >
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
        <tr>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Paid To</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Note</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {expenses.map((e) => (
          <tr key={e.id} className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-medium text-gray-800">{e.title}</td>
            <td className="px-4 py-3 text-green-600 font-semibold">
              ৳{e.amount}
            </td>
            <td className="px-4 py-3">{e.category}</td>
            <td className="px-4 py-3">{e.paid_to}</td>
            <td className="px-4 py-3">
              {e.expense_date?.slice(0, 10) || 'N/A'}
            </td>
            <td className="px-4 py-3 text-gray-500">{e.notes}</td>
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
