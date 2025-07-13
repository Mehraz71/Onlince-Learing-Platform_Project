"use client";
import { useSessionCheck } from '@/components/findcookies';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type USER = {
  sub: number;
  username: string;
  email: string;
  phone: number;
  password: string;
};

export default function Page() {
  useSessionCheck();
  const [user, setUser] = useState<USER | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/auth/profile", {
      withCredentials: true,
    })
    .then((res) => {
      setUser(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      
    })
    .catch((err) => {
      setError("Unable to fetch user");
      console.error(err);
    });
  }, []);

  const handleEdit = async () => {
    if (!user) return; 

    try {
      await axios.patch(`http://localhost:3001/users/update/profile/${user.sub}`, {
        username,
        email,
        phone,
        password,
      }, {
        withCredentials: true
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="p-6  bg-gradient-to-br from-sky-100 to-indigo-100 m-10">
      <div className="form max-w-xl p-6 ml-60 bg-white shadow-lg border-black rounded-xl">
      <h1 className="text-xl font-bold text-blue-700">Edit Profile</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 mt-4 bg ">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"

        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
        />
         <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Update Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
        />


        <button onClick={handleEdit} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
          Update Profile
        </button>
        </div>
      </div>
    </div>
  );
}
