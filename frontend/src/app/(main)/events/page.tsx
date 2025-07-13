"use client";
import { useSessionCheck } from "@/components/findcookies";
import axios from "axios";
import React, { useEffect, useState } from "react";

type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  event_start_time: string;
  event_end_time: string;
  status: string;
};

export default function EventPage() {
  useSessionCheck();

  const [events, setEvents] = useState<EventType[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    event_start_time: "",
    event_end_time: "",
  });
  const [editEvent, setEditEvent] = useState<EventType | null>(null);
  const [error, setError] = useState("");

  const API = "http://localhost:3001/events";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get<EventType[]>(API);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      event_start_time: "",
      event_end_time: "",
    });
    setEditEvent(null);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEdit = async () => {
    if (!editEvent) return;

    if (!form.title.trim() || !form.description.trim() || !form.date.trim()) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.patch(`${API}/${editEvent.id}/update-event`, form);
      fetchEvents();
      resetForm();
    } catch (err) {
      console.error("Error updating event", err);
      setError("Failed to update event");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}/delete-event`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event", err);
      setError("Failed to delete event");
    }
  };

  const openEditModal = (event: EventType) => {
    setEditEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      event_start_time: event.event_start_time,
      event_end_time: event.event_end_time,
    });
    setError("");
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-100 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-black">EVENTS</h1>

      
      {events.length === 0 ? (
        <p className="text-red-600">No Events Found</p>
      ) : (
        events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300 text-black" >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500"> {event.date}</p>
            <p className="text-sm text-gray-500"> {event.event_start_time} - {event.event_end_time}</p>
            <p className="text-green-600">Status: {event.status}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => openEditModal(event)}
                className="px-5 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {editEvent && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div className="relative bg-white text-black p-6 rounded-xl w-full max-w-lg shadow-xl space-y-4">
      
      <button
        onClick={resetForm}
        className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
      >
        ✖
      </button>

      <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={form.title}
        onChange={handleChange}
        className="input w-full bg-white border-black text-black"
      />

      <textarea
        name="description"
        placeholder="Event Description"
        value={form.description}
        onChange={handleChange}
        className="textarea w-full bg-white border-black text-black"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="input w-full bg-white border-black text-black"
      />

      <input
        type="text"
        name="event_start_time"
        placeholder="Start Time"
        value={form.event_start_time}
        onChange={handleChange}
        className="input w-full bg-white border-black text-black"
      />

      <input
        type="text"
        name="event_end_time"
        placeholder="End Time"
        value={form.event_end_time}
        onChange={handleChange}
        className="input w-full bg-white border-black text-black"
      />

      <div className="flex justify-end gap-4 mt-4">
        <button onClick={handleEdit} className="btn btn-success">
          Update
        </button>
        <button onClick={resetForm} className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
   </div>
  );
}
