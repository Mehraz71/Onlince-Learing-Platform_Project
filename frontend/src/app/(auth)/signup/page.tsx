"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        user
      );
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const allFilled = Object.values(user).every((val) => val.trim() !== "");
    setButtonDisabled(!allFilled);
  }, [user]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative  bg-black/50 backdrop-blur-sm"
      style={{
        backgroundImage: "url('/hero.jpg')",
      }}
    >
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            {loading ? "Processing..." : "Signup"}
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSignup();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="input  w-full bg-white border-black  rounded-xl text-black"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-white border-black  rounded-xl text-black"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-white border-black  rounded-xl text-black"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full bg-white border-black  rounded-xl text-black"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={buttonDisabled}
              className="btn btn-primary w-full bg-blue-500 hover:bg-blue-700 text-black"
            >
              {buttonDisabled ? "Fill all fields" : "Signup"}
            </button>
          </form>

          <div className="mt-4 text-center text-black">
            <Link href="/login" className="link link-info">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
