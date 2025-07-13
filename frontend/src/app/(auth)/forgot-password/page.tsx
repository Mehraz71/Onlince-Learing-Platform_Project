"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(true); 

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      await axios.post('http://localhost:3001/auth/forgot-password', { email });
      alert('Reset link sent to your email');
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert('User Not Found');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg relative">
            <input
              type="email"
              className="input input-bordered w-full mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleSubmit} className="btn btn-primary w-full">
              Send Reset Link
            </button>

            
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
