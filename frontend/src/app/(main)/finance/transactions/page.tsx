"use client";
import { useSessionCheck } from '@/components/findcookies';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

type TRANSACTION = {
  id: number;
  student_id: string;
  name: string;
  transaction_type: string;
  amount: number;
  category: string;
  method: string;
  paid_at: string;
  created_at: string;
};

export default function TRANSACTIONS() {
  useSessionCheck();
  const [transaction, setTransaction] = useState<TRANSACTION[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);

  const API = "http://localhost:3001/finance/transactions";

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const res = await axios.get<TRANSACTION[]>(API);
      setTransaction(res.data);
    } catch (err) {
      console.error("Error Fetching Transaction", err);
    }
  };

  const handlePrint = () => {
    const printContent = tableRef.current?.outerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Transactions</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>All Transactions</h1>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="text-black bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-black mb-6">All Transactions</h1>

      

      {transaction.length === 0 ? (
        <p className='text-grey-500'>No Transaction Found</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="table min-w-full divide-y divide-black text-sm text-left" ref={tableRef}>
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>

             <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Payment Method</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-black-800'>
            {transaction.map((t) => (
              <tr key={t.id} className="hover:bg-grey-100 transition">
              <td className="px-4 py-3 font-medium text-gray-700">{t.id}</td>
              <td className="px-4 py-3">{t.name}</td>
              <td className="px-4 py-3 text-blue-600 font-semibold">{t.transaction_type}</td>
              <td className="px-4 py-3 text-green-600 font-bold">৳{t.amount}</td>
              <td className="px-4 py-3">{t.category}</td>
              <td className="px-4 py-3">{t.method}</td>
              <td className="px-4 py-3">{t.paid_at}</td>
              <td className="px-4 py-3 text-gray-400 text-sm">{t.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <button       className="btn btn-info px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
 onClick={handlePrint}>
         Print Transactions
      </button>
    </div>
  );
}
