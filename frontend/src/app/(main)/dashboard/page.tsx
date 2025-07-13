
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSessionCheck } from "@/components/findcookies";
import IncomeByCategoryChart from "../finance/IncomeByCategoryChart/page";
import MonthlyIncomeChart from "../finance/MonthlyIncomeChart/page";




type EVENT = {
  id: number;
  title: string;
  date: string;
};

type Monthly = {
  id: number;
  month: string;
  total_income: number;
  net_revenue: number;
  
};

export default   function DashboardHome() {
    useSessionCheck();

  const [instructorCount, setInstructorCount] = useState<number>(0);
  const [studentcount, setStudentCount]= useState<number>(0);
  const [projects, setProjects]=useState<number>(0);
  const [events, setEvents] = useState<EVENT[]>([]);
  const [incomethismonth, setIncome] =useState<Monthly[]>([]);
  const [user, setUser] = useState<{email:string,username:string,isVerified:string} | null>(null);
  const [error, setError] = useState("");


  useEffect(() => {
    axios.get("http://localhost:3001/instructor")
      .then(res => {
        setInstructorCount(res.data.length); 
      })
      .catch(err => {
        console.error("Error fetching instructors", err);
      });
  }, []);

    useEffect(() => {
    axios.get("http://localhost:3001/project")
      .then(res => {
        setProjects(res.data.length); 
      })
      .catch(err => {
        console.error("Error fetching Projects", err);
      });
  }, []);


   useEffect(() => {
    axios.get("http://localhost:3001/students")
      .then(res => {
        setStudentCount(res.data.length);
      })
      .catch(err => {
        console.error("Error fetching instructors", err);
      });
  }, []);

   useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get<EVENT[]>("http://localhost:3001/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setError("Unable to load events.");
      }
    };

    fetchEvents();
  }, []);

    const upcomingEvents = events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


     useEffect(() => {
    const fetchincome = async () => {
      try {
        const res = await axios.get<Monthly[]>("http://localhost:3001/finance/monthly");
        setIncome(res.data);
      } catch (err) {
        console.error("Failed to fetch income", err);
        setError("Unable to load income.");
      }
    };

    fetchincome();
  }, []);



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



  return (
    <div className="p-6 top-2 bg-white text-black bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl border-indigo-200">

      <h1 className="text-3xl font-bold mb-4 text-blue-700">
      Welcome, {user ? user.username : "Guest"}
      </h1>
      

      {error && <p className="text-red-500">{error}</p>}

  <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

  
  <div className=" grid grid-cols-1 md:grid-cols-4 gap-6">
    
    
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
      <div className="font-bold text-2xl font bold">Total Instructors</div>
      <div className=" text-3xl font-bold">{instructorCount}</div>
      <div className="">Active Instructors</div>
    </div>

  
    <div className="bg-gradient-to-br from-green-400 to-teal-500 text-white p-6 rounded-2xl shadow-lg">
      <div className="stat-title text-white text-2xl font-bold">Total Students</div>
      <div className="stat-value text-white text-3xl font-bold">{studentcount}</div>
      <div className="text-white">Currently Enrolled</div>
    </div>

    
    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg stat">
      <div className="font-bold text-2xl">Upcoming Projects</div>
      <div className="font-bold text-3xl">{projects}</div>
      
    </div>

    
    <div className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
      <div className="text-xl font-bold">Total Income This Month</div>
      <div className="font-bold text-green-400 text-3xl">
              {error && <p className="text-red-500">{error}</p>}
              {incomethismonth.length === 0 ?(
                <p>No Income</p>
              ):(
                <div>
                  <span className="font-bold"> {incomethismonth[0].total_income}</span>

                </div>
              )}
      </div>
    </div>
    {/*<div className="bg-gradient-to-br from-orange-500 to-violet-500 text-white p-6 rounded-2xl shadow-lg stat">
      <div className="font-bold text-xl">Net Revenue</div>
      <div className="font-bold text-green-400 text-3xl">
              {error && <p className="text-red-500">{error}</p>}
              {incomethismonth.length === 0 ?(
                <p>No Income</p>
              ):(
                <div>
                  <span className="font-bold"> {incomethismonth[0].net_revenue}</span>

                </div>
              )}
      </div>
    </div>*/}
  </div>

  
  <div className="mt-10">
    <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">📅 Upcoming Event</h2>
      {error && <p className="text-red-500">{error}</p>}

      {upcomingEvents.length === 0 ? (
        <p className="text-gray-600">No upcoming events.</p>
      ) : (
        <div className="text-gray-800">
          <span className="font-bold">{upcomingEvents[0].title}</span> —{" "}
          <span className="text-sm text-gray-600">
            {new Date(upcomingEvents[0].date).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
    <div className="p-4 space-y-6 mt-10 bg-white rounded-2xl shadow-xl">
  <h1 className="text-2xl font-bold text-blue-700">📈 Finance Charts</h1>
  <div className="grid md:grid-cols-2 gap-8">
    <div className="bg-blue-50 p-4 rounded-xl shadow-inner">
      <MonthlyIncomeChart />
    </div>

    
     
  </div>
</div>
    
  </div>

  













</div>
  )}
