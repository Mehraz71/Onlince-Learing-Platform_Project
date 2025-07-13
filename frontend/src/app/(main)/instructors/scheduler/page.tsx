"use client";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useSessionCheck } from "@/components/findcookies";

type Instructor = {
  id: number;
  name: string;
  courses: Course[];
};

type Course = {
  id: number;
  course_title: string;
};

export default function ASSIGNCOURSE() {

  useSessionCheck();
  
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<{ value: string; label: string } | null>(null);

  const API = "http://localhost:3001";

  useEffect(() => {
    fetchInstructors();
    fetchCourses();
  }, []);

  const fetchInstructors = async () => {
    const res = await axios.get<Instructor[]>(`${API}/instructor`);
    setInstructors(res.data);
  };

  const fetchCourses = async () => {
    const res = await axios.get<Course[]>(`${API}/courses`);
    setCourses(res.data);
  };

  const handleAssign = async (instructorId: number) => {
    if (!selectedCourse) return alert("Please select a course");

    try {
      await axios.post(`${API}/instructor/assign/${instructorId}`, {
        course_name: selectedCourse.value,
      });
      fetchInstructors();
      alert("Course Assigned Successfully");
    } catch (err) {
      console.error("Error Assigning The Course", err);
    }
  };

  const courseOptions = courses.map((c) => ({
    value: c.course_title,
    label: c.course_title,
  }));


  const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black', 
    backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
};


  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4">Assign Course to Instructors</h1>

      <div className="mb-6 text-black">
        <label className="block mb-2 font-semibold text-black">Select Course:</label>
        <Select
          options={courseOptions}
          value={selectedCourse}
          onChange={(val) => setSelectedCourse(val)}
          placeholder="Choose a course"
          styles={customStyles}
        />
      </div>

      <table className="table w-full text-black">
        <thead>
          <tr>
            <th className="text-black">Instructor ID</th>
            <th className="text-black">Name</th>
            <th className="text-black">Assigned Course</th>
            <th className="text-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.courses.map((c) => c.course_title).join(", ")}</td>
              <td>
                <button
                  onClick={() => handleAssign(i.id)}
                  className="btn btn-primary btn-sm"
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
