"use client";
import { useSessionCheck } from '@/components/findcookies';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function PROFILE() {
  useSessionCheck();
    const[user, setUser]= useState<{email: string,username:string,phone:string, password:string, sub:string}| null>(null);
  const [error, setError] = useState("");


  useEffect(()=>{
    axios.get("http://localhost:3001/auth/profile", {
      withCredentials: true,
    })
    .then((res)=>{
      setUser(res.data);
   
      
    })
    .catch((err)=>{
      setError("Unable to fetch user");
      console.error(err);
    });

  },[]);




    
  return ( <div className="p-6 absolute left-63 top-10 h-full w-350 rounded-xl mx-auto bg-gradient-to-br from-sky-100 to-indigo-100 ">
      <div className="form max-w-xl p-6 ml-60 text-white">
      <h1 className="text-2xl font-bold mb-6  text-blue-700">My Profile</h1>
      <div className="card bg-white shadow-lg shadow-lg p-4 text-black">
        <p><strong>ID :</strong> {user ? user.sub:""}</p>
        <p><strong>Name :</strong> {user ? user.username:""}</p>
        <p><strong>Email :</strong> {user? user.email:""}</p>
        <p><strong>Phone :</strong> {user?user.phone:""}</p>
        <Link href="profile/editprofile">
  <button className="btn btn-warning mt-4">Edit profile</button>
</Link>
</div>

      </div>
    </div>
  )
}
