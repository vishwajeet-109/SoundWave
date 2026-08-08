import React, { useState } from "react";
import adminService from "@/services/adminService";

export default function CreateArtistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    genre: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await adminService.createArtist(formData);
      setMessage({ type: "success", text: "Artist created successfully!" });
      setFormData({ name: "", email: "", bio: "", genre: "", password: "" });
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to create artist. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 text-white rounded-xl shadow-xl mt-8 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Create New Artist Profile</h2>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg text-sm ${message.type === "success" ? "bg-green-600/20 border border-green-500 text-green-300" : "bg-red-600/20 border border-red-500 text-red-300"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Artist / Band Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Enter artist name"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="artist@soundwave.com"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a secure password"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Primary Genre</label>
          <input 
            type="text" 
            name="genre" 
            value={formData.genre} 
            onChange={handleChange} 
            placeholder="e.g. Pop, Hip-Hop, Classical"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Artist Bio</label>
          <textarea 
            name="bio" 
            rows="4" 
            value={formData.bio} 
            onChange={handleChange} 
            placeholder="Write a short description about the artist..."
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 transition font-semibold rounded-lg shadow-md text-white disabled:opacity-50"
        >
          {loading ? "Creating Artist..." : "Create Artist"}
        </button>
      </form>
    </div>
  );
}