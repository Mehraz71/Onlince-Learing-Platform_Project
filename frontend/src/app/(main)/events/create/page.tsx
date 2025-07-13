"use client";
import { useSessionCheck } from '@/components/findcookies';
import axios from 'axios';
import router, { Router } from 'next/router';
import React, { useEffect, useState } from 'react'

type EVENT = {
    id:number;
    title: string;
    description: string;
    date: string;
    event_start_time: string;
    event_end_time: string;
    status: string;
}


export default function EVENTPAGE() {
  useSessionCheck();
    const [event, setEvent] = useState  <EVENT[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [event_start_time, setStarttime] = useState("");
    const [event_end_time,setEndtime] = useState("");
    const [status, setStatus] = useState("");
    const [editEvent, setEditEvent] = useState<EVENT | null>(null);
    const [error, setError] = useState("");

    const API = "http://localhost:3001/events";

    useEffect(()=>{
    fetchEvent();
    },[]);
    
    const fetchEvent = async () => {
        try { 
            const res = await axios.get<EVENT[]>(API);
            setEvent(res.data);
            
        } catch (err) {
            console.error("Error Fatching Events",err);
            
        }
    }
    const handleCreate = async () =>{
        if(!title.trim() || !description.trim() || !date.trim()){
            setError("All fields are required !");
            return;
               }
               setError("");
               try{
                await axios.post(`${API}/create-event`,
                    {
                        title,
                        description,
                        date,
                        event_start_time,
                        event_end_time,
                    });
                    fetchEvent();
                    resetForm();
                    router.push("/events");
                                   
               } catch(err){
                console.error("Error creating Project",err);
                setError("Failed to Create Project");
               }

    };


    const handleEdit = async () =>{
        if (!editEvent) return;
        if(!title.trim() || !description.trim() || !date.trim() || !event_start_time.trim()){
            setError("Title , Description & Date are needed !");
            return;
                }
                try{
                    await axios.patch(`${API}/${editEvent.id}/update-event`, {
                        title,
                        description,
                        date,
                        event_start_time,
                        event_end_time,
                    })
                }catch (err){
                    console.error("Error updating event:", err);
                    setError("Failed to update event");
                }
                };
                const handleDelete = async (id: number) =>{
                    try{
                        await axios.delete(`${API}/${id}/delete-event`);
                        
                            }
                            catch (err){
                                console.error("Error Deleting Event");
                                setError(`Failed to delete Event`);
                            }
                };
                const resetForm= ()=>{
                    setTitle("");
                    setDescription("");
                    setDate("");
                    setStarttime("");
                    setEndtime("");
                }
                
 return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-100 to-indigo-100">


  
    <div className="max-w-xl mx-auto  p-6 rounded-xl shadow-md space-y-4 mt-6 bg-white text-black shadow-lg">
      <h2 className='font-semibold text-2xl'>{editEvent ? "Edit Event" : "Create a New Event"}</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
      className='w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400'
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400'
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-grey text-gray-800 placeholder-gray-400'
      />

      <input
        type="text"
        placeholder="Start Time (e.g. 10:00 AM)"
        value={event_start_time}
        onChange={(e) => setStarttime(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400'
      />

      <input
        type="text"
        placeholder="End Time (e.g. 2:00 PM)"
        value={event_end_time}
        onChange={(e) => setEndtime(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400'
      />

      {editEvent ? (
        <>
          <button onClick={handleEdit} className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-xl shadow-md hover:bg-yellow-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200">
            Update
          </button>
          <button onClick={resetForm} className="m-5 px-6 py-2 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={handleCreate} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
          Create
        </button>
      )}
    </div>
  </div>
);
}

