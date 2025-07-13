'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSessionCheck } from '@/components/findcookies';

type Instructor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  salary: number;
  salary_status: string;
  payment_method: string;
  bank_acc: string;
};

export default function EditInstructorProfile() {
  useSessionCheck();
  const { id } = useParams();
  const router = useRouter();

  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/instructor/${id}`)
        .then((res) => setInstructor(res.data))
        .catch(() => setError("Failed to load instructor"));
    }
  }, [id]);

  const handleChange = (field: keyof Instructor, value: string | number) => {
    if (!instructor) return;
    setInstructor({ ...instructor, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3001/instructor/update/${id}`, instructor);
      router.push(`/instructors/viewprofile/${id}`);
    } catch (err) {
      setError("Failed to update instructor");
    }
  };

  if (!instructor) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">Edit Instructor</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="space-y-4">
        <input
          className="input input-bordered w-full bg-white border-black text-black"
          type="text"
          placeholder="Name"
          value={instructor.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          className="input input-bordered w-full bg-white border-black text-black"
          type="email"
          placeholder="Email"
          value={instructor.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          className="input input-bordered w-full bg-white border-black text-black"
          type="text"
          placeholder="Phone"
          value={instructor.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <input
          className="input input-bordered w-full bg-white border-black text-black"
          type="text"
          placeholder="Address"
          value={instructor.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <input
          className="input input-bordered w-full bg-white border-black text-black"
          type="text"
          placeholder="Bank Account"
          value={instructor.bank_acc}
          onChange={(e) => handleChange("bank_acc", e.target.value)}
        />
        <input
          className="input input-bordered w-full bg-white border-black text-black"
          type="number"
          placeholder="Salary"
          value={instructor.salary}
          onChange={(e) => handleChange("salary", parseFloat(e.target.value))}
        />

        <select
          className="select select-bordered w-full bg-white border-black text-black"
          value={instructor.salary_status}
          onChange={(e) => handleChange("salary_status", e.target.value)}
        >
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <select
          className="select select-bordered w-full bg-white border-black text-black"
          value={instructor.payment_method}
          onChange={(e) => handleChange("payment_method", e.target.value)}
        >
          <option value="Bank">Bank</option>
          <option value="Bkash">Bkash</option>
        </select>

        <button className="btn btn-primary w-full" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
