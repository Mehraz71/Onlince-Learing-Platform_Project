"use client";

import { useSessionCheck } from "@/components/findcookies";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type INSTRUCTOR = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  salary_status: string;
  payment_method: string;
  bank_acc: string;
  salary: number;
  courses: COURSE[];
};

type COURSE = {
  id: number;
  course_title: string;
  
};


export default function InstructorPage() {
  useSessionCheck();
  const [instructors, setInstructors] = useState<INSTRUCTOR[]>([]);
  const [id, setID] = useState("");
  const [error, setError] = useState("");

  const API = "http://localhost:3001/instructor";
  const API_COURSES = "http://localhost:3001/courses"; 

  const fetchInstructors = async () => {
    setError("");
    try {
      const res = await axios.get<INSTRUCTOR[]>(API);
      setInstructors(res.data);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      setError("No instructor details found.");
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleSearch = async (id: number) => {
    try {
      const res = await axios.get<INSTRUCTOR>(`${API}/${id}`);
      setInstructors([res.data]); 
    } catch (err) {
      console.error("No instructor found by ID");
      alert("No instructor found with this ID");
    }
  };

  const handlePaySalary = async(id:number) =>{
    try{
      await axios.post(`${API}/pay-salary/${id}`);
      fetchInstructors();
      }
      catch(err){
        console.error("Error Paying Salary",err);
        alert("Already Paid for the month.");
        fetchInstructors();
    }
  }





  return (
    <div className="p-6 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">INSTRUCTOR MANAGEMENT</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <div className="flex items-center gap-4 mb-6">
        <input
          type="number"
          value={id}
          onChange={(e) => setID(e.target.value)}
          className="input input-bordered w-40 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
          placeholder="Enter ID"
        />
        <button
          onClick={() => {
            const numericId = Number(id);
            if (!isNaN(numericId)) {
              void handleSearch(numericId);
            }
          }}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>
       <div className="mt-2">
                <Link href="instructors/scheduler"><button  className="btn btn-accent" >Scheduler</button></Link>
                
              </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {instructors.length === 0 ? (
          <p>No instructor found.</p>
        ) : (
          instructors.map((i) => (
            <div key={i.id} className="card  bg-[#fdfcfb] text-gray-800 p-6 rounded-2xl shadow-md border border-gray-100" >
              <Link href={`/instructors/viewprofile/${i.id}`}>

              <h3 className="text-xl font-semibold">{i.name}</h3>
              <p>Email: {i.email}</p>
              <p>Phone: {i.phone}</p>
              <p>Address: {i.address}</p>
              <p>Courses: {i.courses.map((c) => c.course_title).join(", ")}</p>

              <p>Salary: {i.salary}</p>
              <p>Status: {i.salary_status}</p>
              <p>Payment: {i.payment_method}</p>
              <p>Bank Acc: {i.bank_acc}</p>
              </Link>
              <div className="mt-2">
                <button onClick={()=>handlePaySalary(i.id)} className="btn btn-accent" >Pay</button>
              </div>
             
              
            </div>

          ))
        )}
        
      </div>
    </div>
  );
}
