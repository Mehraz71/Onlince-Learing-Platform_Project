"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:3001/auth/reset-password", {
        token,
        password,
      });
      alert("Password updated!");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        className="border rounded px-4 py-2 mb-4"
      />
      <button
        onClick={handleReset}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Reset Password
      </button>
    </div>
  );
}
