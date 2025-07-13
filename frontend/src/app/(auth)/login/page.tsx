'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function page() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Evaluate password strength
  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setUser((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setUser({ ...user, password: newPassword });
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const onLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        user,
        {
          withCredentials: true,
        }
      );

      console.log('Login Success', response.data);

      if (rememberMe) {
        localStorage.setItem('savedEmail', user.email);
      } else {
        localStorage.removeItem('savedEmail');
      }

      router.push('/dashboard');
    } catch (error: any) {
      console.log('Login Failed');
      toast.error(error.message);
      alert("Please check your email to verify your account");
    }
  };

  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-green-500', 'bg-green-700'];

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/hero.jpg')" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 text-black">
        <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">C O U R S E R A</h1>
            <p className="text-gray-500 mt-2">Login to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label text-sm">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="input input-bordered w-full bg-white border-blue shadow-lg"
              />
            </div>

            <div>
              <label className="label text-sm">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={user.password}
                onChange={onPasswordChange}
                className="input input-bordered w-full bg-white border-blue shadow-lg"
              />

            
              {user.password.length > 0 && (
                <div className="mt-1">
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${strengthColor[passwordStrength - 1] || 'bg-gray-300'}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Strength: {strengthText[passwordStrength - 1] || 'Too Short'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <Link href="/forgot-password" className="link link-hover text-blue-600">
                Forgot password?
              </Link>
            </div>

            <button onClick={onLogin} className="btn btn-primary w-full mt-2">
              Login
            </button>

            <div className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="link link-info">
                Signup now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
