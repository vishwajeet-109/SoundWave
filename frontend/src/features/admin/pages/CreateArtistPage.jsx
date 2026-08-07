import React, { useState } from "react";
import adminService from "@/services/adminService"; // ya aapke feature ke andar ka service path

export default function CreateArtistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessData(null);

    try {
      await adminService.createArtist(formData);
      
      setSuccessData({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setFormData({ name: "", email: "", password: "", bio: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create artist ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Create New Artist ID</h2>

      {error && <div className="mb-4 p-3 bg-red-600/30 border border-red-500 rounded text-red-200">{error}</div>}

      {successData && (
        <div className="mb-6 p-4 bg-green-600/30 border border-green-500 rounded text-green-200">
          <p className="font-bold text-lg mb-2">✅ Artist Account Created Successfully!</p>
          <p><strong>Name:</strong> {successData.name}</p>
          <p><strong>Email:</strong> {successData.email}</p>
          <p><strong>Password:</strong> {successData.password}</p>
          <p className="text-xs text-gray-300 mt-2">Ye credentials artist ko share karein login karne ke liye.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Artist Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. Arijit Singh"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="artist@soundwave.com"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Set password for artist"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio (Optional)</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Short bio..."
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Artist Account"}
        </button>
      </form>
    </div>
  );
}