import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import albumService from "@/services/albumService";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";

export default function UploadAlbum() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !coverFile) {
      setError("Please provide an album title and cover image.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("genre", genre);
      formData.append("coverImage", coverFile);

      // Backend API call to create album
      await albumService.createAlbum(formData);

      setSuccess("Album uploaded successfully!");
      setTimeout(() => {
        navigate("/artist/albums");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload album. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-zinc-100 max-w-3xl mx-auto space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload New Album</h1>
        <p className="text-zinc-400 text-sm mt-1">Create an album and group your tracks together</p>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">{error}</div>}
      {success && <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Album Title</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter album title" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Write something about this album..." 
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-zinc-100 focus:outline-none focus:border-green-500 min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Genre</label>
          <Input 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
            placeholder="e.g. Pop, Hip-Hop, Electronic" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Cover Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setCoverFile(e.target.files[0])}
            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black hover:file:bg-green-400 cursor-pointer"
            required 
          />
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating Album..." : "Publish Album"}
          </Button>
        </div>
      </form>
    </div>
  );
}