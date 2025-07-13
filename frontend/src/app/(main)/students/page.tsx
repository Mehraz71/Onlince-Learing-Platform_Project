'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSessionCheck } from '@/components/findcookies';

type Student = {
  id: number;
  name: string;
  email: string;
};

type Course = {
  id: number;
  course_title: string;
  course_price: number;
};

export default function StudentPage() {
    useSessionCheck();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<number | ''>('');
  const [selectedCourseId, setSelectedCourseId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState<string | null>(null);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3001/students');
      setStudents(res.data);
    } catch (error) {
      console.error('Failed to fetch students', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:3001/courses'); 
      setCourses(res.data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const handleCreateStudent = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/students/create_student', {
        name,
        email,
      });
      setName('');
      setEmail('');
      fetchStudents();
    } catch (err) {
      console.error('Error creating student:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!selectedStudentId || !selectedCourseId) {
      setEnrollError('Please select both student and course.');
      setEnrollMessage(null);
      return;
    }
    setEnrollLoading(true);
    setEnrollError(null);
    setEnrollMessage(null);

    try {
      const res = await axios.post(
        `http://localhost:3001/students/${selectedStudentId}/enroll/${selectedCourseId}`
      );
      setEnrollMessage(res.data.message || 'Enrolled successfully!');
      
      fetchStudents();
    } catch (error: any) {
      setEnrollError(
        error.response?.data?.message || 'Failed to enroll student.'
      );
    } finally {
      setEnrollLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      
      <div className="bg-gray-100 p-4 rounded border border-black shadow mb-6">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full mb-2 text-black border-black bg-white"
        />
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-2 text-black border-black bg-white"
        />
        <button
          onClick={handleCreateStudent}
          disabled={loading}
          className="btn w-full bg-black text-white hover:bg-gray-800"
        >
          {loading ? 'Creating...' : 'Create Student'}
        </button>
      </div>

      
      <div>
        <h2 className="text-xl font-semibold mb-2">All Students</h2>
        <div className="border border-black rounded mb-6">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-black p-2">#</th>
                <th className="border border-black p-2">Name</th>
                <th className="border border-black p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td className="border border-black p-2">{index + 1}</td>
                  <td className="border border-black p-2">{student.name}</td>
                  <td className="border border-black p-2">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="bg-gray-100 p-4 rounded border border-black shadow">
        <h2 className="text-xl font-semibold mb-4">Enroll Student in Course</h2>

        <label className="block mb-1 font-medium" htmlFor="student-select">
          Select Student
        </label>
        <select
          id="student-select"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(Number(e.target.value))}
          className="input input-bordered w-full mb-4 text-black border-black bg-white"
        >
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.email})
            </option>
          ))}
        </select>

        <label className="block mb-1 font-medium" htmlFor="course-select">
          Select Course
        </label>
        <select
          id="course-select"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          className="input input-bordered w-full mb-4 text-black border-black bg-white"
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_title} (${course.course_price})
            </option>
          ))}
        </select>

        <button
          onClick={handleEnroll}
          disabled={enrollLoading}
          className="btn w-full bg-black text-white hover:bg-gray-800"
        >
          {enrollLoading ? 'Enrolling...' : 'Enroll Student'}
        </button>

        {enrollMessage && (
          <p className="mt-3 text-green-600 font-medium">{enrollMessage}</p>
        )}
        {enrollError && (
          <p className="mt-3 text-red-600 font-medium">{enrollError}</p>
        )}
      </div>
    </div>
  );
}
