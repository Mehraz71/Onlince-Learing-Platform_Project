"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSessionCheck } from "@/components/findcookies";

type Course = {
  id: number;
  course_title: string;
  course_instructor: string;
  course_level: string;
  course_duration: string;
  course_price: number;
  total_enrolled: number;
};

export default function CoursesPage() {
  useSessionCheck();
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [enrolled, setTotal_Enrolled] = useState<number>(0);
  const [searchId, setSearchId] = useState("");
  const [searchInstructor, setSearchInstructor] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const cancelToken = useRef<import("axios").CancelTokenSource | null>(null);


  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  const API = "http://localhost:3001/courses";

  const fetchCourses = async () => {
    try {
      const res = await axios.get<Course[]>(API);
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


useEffect(() => {
    if (!searchTitle) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      fetchSuggestions(searchTitle);
    }, 300);

    return () => {
      clearTimeout(handler);
      if (cancelToken.current) {
        cancelToken.current.cancel("Operation canceled due to new request.");
      }
    };
  }, [searchTitle]);

  const handleCreate = async () => {
    try {
      const newCourse = {
        course_title: title,
        course_instructor: instructor,
        course_level: level,
        course_duration: duration,
        course_price: price,
        total_enrolled: enrolled,
      };

      await axios.post(`${API}/create_course`, newCourse);
      fetchCourses();
      resetForm();
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/delete-course/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const handleEditSave = async () => {
    if (!editCourse) return;
    try {
      await axios.patch(`${API}/update-course/${editCourse.id}`, editCourse);
      fetchCourses();
      setEditCourse(null);
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

 const searchByTitle = async () => {
  try {
    const res = await axios.get<Course[]>(`${API}/search/title/${encodeURIComponent(searchTitle)}`);
    setCourses(res.data); 
  } catch (err) {
    console.error("No courses found:", err);
    setCourses([]); 
  }
};

  const resetForm = () => {
    setTitle("");
    setInstructor("");
    setLevel("");
    setDuration("");
    setPrice(0);
    setTotal_Enrolled(0);
  };


  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    cancelToken.current = axios.CancelToken.source();

    try {
      const res = await axios.get<string[]>(
        `http://localhost:3001/courses/autocomplete/title`,
        {
          params: { q: query },
          cancelToken: cancelToken.current.token,
        }
      );
      setSuggestions(res.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error("Failed to fetch suggestions", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSuggestionClick = (title: string) => {
    setSearchTitle(title);
    setSuggestions([]);
  
  };

  
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-sky-100 to-indigo-100">
      <h1 className="text-3xl font-bold text-black ml-80">📚Course Management</h1>

    
       <div className="w-full max-w-md mx-auto relative text-black">
        <input
          type="text"
          placeholder="Search for course..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchByTitle();
              setSuggestions([]);
            }
          }}
        />

        {loading && (
          <div className=" text-black absolute right-3 top-3 animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-5 h-5"></div>
        )}

        {suggestions.length > 0 && (
          <ul className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg w-full mt-1 max-h-48 overflow-y-auto text-black">
            {suggestions.map((title, i) => (
              <li
                key={i}
                onClick={() => onSuggestionClick(title)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {currentCourses.map((course) => (
          <div key={course.id} className="card shadow-md bg-slate-100 text-gray-700 p-6 rounded-2xl shadow-md border border-slate-200">
            <div className="card-body">
              <h2 className="card-title">{course.course_title}</h2>
              <p> ID: {course.id}</p>
              <p>👤 Instructor: {course.course_instructor}</p>
              <p>📘 Level: {course.course_level}</p>
              <p>⏱ Duration: {course.course_duration}</p>
              <p>💵 Price: ${course.course_price}</p>
              <p>👥 Enrolled: {course.total_enrolled}</p>
              <div className="card-actions mt-2 justify-end">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setEditCourse(course)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex justify-center mt-4">
        <div className="join join-vertical lg:join-horizontal">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`join-item btn bg-white text-black shadow-lg ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      
      <div className="p-4 border rounded-lg space-y-2 max-w-xl mx-auto bg-white text-black shadow-lg ml-50">
        <h2 className="text-xl font-bold text-black">Add New Course</h2>
        <input
          placeholder="Title"
          className="input input-bordered w-full text-black border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Instructor"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
        <input
          placeholder="Level"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          placeholder="Duration"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Total Enrolled"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
          value={enrolled}
          onChange={(e) => setTotal_Enrolled(Number(e.target.value))}
        />
        <button className="btn btn-primary w-full" onClick={handleCreate}>
          Create Course
        </button>
      </div>

    
      {editCourse && (
        <dialog open className="modal modal-open">
          <div className="modal-box space-y-2 bg-white text-black shadow-lg ml-50">
            <h3 className="font-bold text-lg">Edit Course</h3>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
              value={editCourse.course_title}
              onChange={(e) =>
                setEditCourse({ ...editCourse, course_title: e.target.value })
              }
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
              value={editCourse.course_instructor}
              onChange={(e) =>
                setEditCourse({
                  ...editCourse,
                  course_instructor: e.target.value,
                })
              }
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
              value={editCourse.course_level}
              onChange={(e) =>
                setEditCourse({ ...editCourse, course_level: e.target.value })
              }
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
              value={editCourse.course_duration}
              onChange={(e) =>
                setEditCourse({
                  ...editCourse,
                  course_duration: e.target.value,
                })
              }
            />
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
              value={editCourse.course_price}
              onChange={(e) =>
                setEditCourse({
                  ...editCourse,
                  course_price: Number(e.target.value),
                })
              }
            />
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white text-gray-800 placeholder-gray-400"
              value={editCourse.total_enrolled}
              onChange={(e) =>
                setEditCourse({
                  ...editCourse,
                  total_enrolled: Number(e.target.value),
                })
              }
            />
            <div className="modal-action justify-between">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
               onClick={handleEditSave}>
                Save
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
                onClick={() => setEditCourse(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}



    </div>
  );
}
