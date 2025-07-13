
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Instructor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  courses: string[];
  salary: number;
  salary_status: string;
  payment_method: string;
  bank_acc: string;
};

export default function ViewInstructorProfile() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState<Instructor | null>(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/instructor/${id}`);
        setInstructor(res.data);
      } catch (err) {
        console.error('Error fetching instructor profile', err);
      }
    };

    if (id) fetchInstructor();
  }, [id]);

  if (!instructor) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Instructor Profile</h1>
      <div className="card bg-base-100 shadow p-4">
        <p><strong>Name:</strong> {instructor.name}</p>
        <p><strong>Email:</strong> {instructor.email}</p>
        <p><strong>Phone:</strong> {instructor.phone}</p>
        <p><strong>Address:</strong> {instructor.address}</p>
        <p><strong>Salary:</strong> {instructor.salary}</p>
        <p><strong>Status:</strong> {instructor.salary_status}</p>
        <p><strong>Payment:</strong> {instructor.payment_method}</p>
        <p><strong>Bank Account:</strong> {instructor.bank_acc}</p>
        <Link href={`/instructors/edit/${instructor.id}`}>
  <button className="btn btn-warning mt-4">Edit Instructor</button>
</Link>

      </div>
    </div>
  );
}
