"use client";

import { useSessionCheck } from "@/components/findcookies";
import axios from "axios";
import React, { useEffect, useState } from "react";




type PROJECT = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  file: string[];
};

export default function ProjectComponent() {
  useSessionCheck();
  const [project, setProject] = useState<PROJECT[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editProject, setEditProject] = useState<PROJECT | null>(null);
  const [error, setError] = useState("");

  const API = "http://localhost:3001/project";

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await axios.get<PROJECT[]>(API);
      setProject(res.data);
    } catch (err) {
      console.error("Error Fetching Projects", err);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Please Enter Your Project Title.");
      return;
    }
    if (!description.trim()) {
      setError("Please Enter Your Project Description.");
      return;
    }
    if (!deadline.trim()) {
      setError("Please Enter Your Project Deadline.");
      return;
    }
  

    setError("");
    try {
      await axios.post(`${API}/create_project`, {
        title,
        description,
        deadline,
        file,
      });
      fetchProject();
      resetForm();
    } catch (err) {
      console.error("Error creating Project", err);
      setError("Failed to Create Project");
    }
     if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    await axios.post(`http://localhost:3001/project/1/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Upload successful");
  } catch (err) {
    console.error("Upload error:", err);
  }
  };

  const handleEdit = async () => {
    if (!editProject) return;
    if (!title.trim() || !description.trim() || !deadline.trim()) {
      setError("All fields are required");
      return;
    }
    try {
      await axios.patch(`${API}/${editProject.id}/update-project`, {
        title,
        description,
        deadline,
        file,
      });
      fetchProject();
      resetForm();
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project.");
    }
  };

  const handleStatus = async (id: number, newStatus: string) => {
    try {
      await axios.patch(`${API}/${id}/status`, {
        status: newStatus,

      });
      fetchProject();
      resetForm();
    } catch (err) {
      console.error("Error changing status:", err);
      setError("Failed to change status.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}/delete-project`);
      fetchProject();
    } catch (err) {
      console.error("Error Deleting Project", err);
    }
  };
  

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setEditProject(null);
    setError("");
    setFile(null);
  };

  return (
    
  <div className="p-6 top-2 bg-white text-black bg-gradient-to-br from-sky-100 to-indigo-100 ">
    <h1 className="text-2xl font-bold mb-4  text-blue-700">Project Manager</h1>

   

    
    <div className="mb-15 bg-white shadow-lg rounded-xl p-10 w-full">
      <h2 className="text-xl font-semibold mb-2">All Projects</h2>
      {project.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        project.map((p) => (
          <div key={p.id} className="bg-white text-black bg-gradient-to-br from-sky-100 to-indigo-100 p-4 w-full">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>Deadline:</strong> {p.deadline}</p>
            <p><strong>Status:</strong> {p.status}</p>
            <div className="mt-2 space-x-2">
              <button className="btn btn-sm btn-warning" onClick={() => {
                setEditProject(p);
                setTitle(p.title);
                setDescription(p.description);
                setDeadline(p.deadline);

              }}>Edit</button>
              <button className="btn btn-sm btn-error" onClick={() => handleDelete(p.id)}>Delete</button>
              <button
  className="btn btn-sm btn-primary"
  onClick={() => {
    const newStatus = "Completed";
    if (p.status === "Pending") {
      handleStatus(p.id, newStatus);
    }
  }}
  disabled={p.status === "Completed"}
>
  Mark as Completed
</button>

            
            </div>
          </div>
        ))
      )}
    </div>

    
    <div className="bg-white  m-t-10 p-5 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{editProject ? "Edit Project" : "Create New Project"}</h2>
         
    {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full mb-3 bg-white shadow-lg border-black"
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full mb-3 bg-white shadow-lg border-black"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="input input-bordered w-50 mb-3 bg-indigo-200 shadow-lg border-white"
      /><br></br>
<input
  type="file"
  onChange={(e) => setFile(e.target.files?.[0] || null)}
  className="file-input file-input-bordered bg-white shadow-lg border-black"
/>

      <div className="space-x-2 pt-4">
        {editProject ? (
          <>
            <button onClick={handleEdit} className="btn btn-primary">Update</button>
            <button onClick={resetForm} className="btn btn-neutral">Cancel</button>
          </>
        ) : (
          <button onClick={handleCreate} className="btn bg-green-500 text-white hover:bg-green-600 border-0 rounded-xl shadow-md transition duration-200 ease-in-out px-6 py-2">Save Project</button>
        )}
      </div>
    </div>
  </div>
);
}
