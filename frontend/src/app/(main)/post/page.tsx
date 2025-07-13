"use client";


import { useSessionCheck } from "@/components/findcookies";
import axios from "axios";


import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  post_title: string;
  post_description: string;
};

export default function POST() {
useSessionCheck();
 
  
  const [post, setPost] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [error, setError] = useState("");

  const API = "http://localhost:3001/post";

  const fetchPosts = async () => {
    try {
      const res = await axios.get<Post[]>(API);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    setError("");

    try {
      await axios.post(`${API}/create_post`, {
        post_title: title,
        post_description: description,
      });
      fetchPosts();
      resetForm();
    } catch (err) {
      console.error("Error creating post:", err);
      setError(" Failed to create post.");
    }
  };

  const handleEdit = async () => {
    if (!editPost) return;
    if (!title.trim() || !description.trim()) {
      setError(" Title and Description are required.");
      return;
    }

    try {
      await axios.patch(`${API}/${editPost.id}/update_post`, {
        post_title: title,
        post_description: description,
      });
      fetchPosts();
      resetForm();
    } catch (err) {
      console.error("Error updating post:", err);
      setError(" Failed to update post.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}/delete_post`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditPost(null);
    setError("");
  };

  return (
        
    
      
      <div className="bg-gradient-to-br from-sky-100 to-indigo-100 p-6 w-full text-black ">
        <h1 className="text-3xl font-bold mb-6"> Notice Management</h1>

        
        {error && <div className="text-red-500 mb-4">{error}</div>}

        
        <div className="bg-white text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl text-black font-semibold mb-4"> All Notice</h2>
          {post.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            post.map((p) => (
              <div key={p.id} className="text-gray-800 p-4   rounded-2xl shadow-md bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl border-indigo-500 card gap-6">
                <h3 className="text-lg font-bold">{p.post_title}</h3>
                <p className="mb-2">{p.post_description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditPost(p);
                      setTitle(p.post_title);
                      setDescription(p.post_description);
                    }}
                    className="btn btn-neutral btn-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      
        <div className="bg-white card 2 pr-7 pt-10 pl-6 pb-4 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            {editPost ? " Edit Post" : " Create New Post"}
          </h2>
          <div className="form-control mb-4 bg-white">
            <label className="p-2 label font-medium pr-17 font-bold">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered bg-white rounded-xl shadow-lg border-black"
            />
          </div>

          <div className="form-control mb-4 bg-white">
            <label className="label font-medium pr-4 font-bold">Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered h-24 bg-white shadow-lg border-black rounded-xl"
            ></textarea>
          </div>

          <div className="flex gap-4">
            {editPost ? (
              <>
                <button onClick={handleEdit} className="btn btn-warning">
                  Update
                </button>
                <button onClick={resetForm} className="btn btn-outline">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleCreate} className="btn btn-primary ml-92">
                Post
              </button>
            )}
          </div>
        </div>
         </div>
  
  );
}
