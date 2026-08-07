import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Music, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import useUploadSong from '../hooks/useUploadSong';

const UploadSong = () => {
  const navigate = useNavigate();
  const { mutateAsync: uploadSong, isPending } = useUploadSong();
  
  const audioInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
  });
  
  const [files, setFiles] = useState({
    audio: null,
    cover: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const removeFile = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
    if (type === 'audio' && audioInputRef.current) audioInputRef.current.value = '';
    if (type === 'cover' && coverInputRef.current) coverInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title || !files.audio || !files.cover) {
      setError('Please provide a title, an audio file, and cover art.');
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    if (formData.genre) payload.append('genre', formData.genre);
    
    // Names must match backend uploadMiddleware.fields array
    payload.append('audio', files.audio); 
    payload.append('cover', files.cover); 

    try {
      await uploadSong(payload);
      setSuccess(true);
      setTimeout(() => {
        navigate('/artist/dashboard');
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to upload song. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-2">Upload New Release</h1>
          <p className="text-zinc-400 text-sm">Share your latest track with your listeners globally.</p>
        </div>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-zinc-50 mb-2">Upload Successful!</h2>
            <p className="text-zinc-400">Your track is being processed. Redirecting to dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="space-y-6">
                
                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-md">
                    {error}
                  </div>
                )}

                {/* Track Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 flex flex-col">
                    <label className="text-sm font-medium text-zinc-50">Track Title *</label>
                    <input 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Midnight City"
                      className="bg-zinc-950 border border-zinc-800 text-zinc-50 px-4 py-2 rounded-md outline-none focus:border-green-500 transition-colors"
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <label className="text-sm font-medium text-zinc-50">Genre</label>
                    <input 
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      placeholder="e.g. Synthwave"
                      className="bg-zinc-950 border border-zinc-800 text-zinc-50 px-4 py-2 rounded-md outline-none focus:border-green-500 transition-colors"
                      disabled={isPending}
                    />
                  </div>
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
                  
                  {/* Audio Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-50">Audio File (MP3, WAV) *</label>
                    <input 
                      type="file" 
                      accept="audio/*" 
                      className="hidden" 
                      ref={audioInputRef}
                      onChange={(e) => handleFileChange(e, 'audio')}
                      disabled={isPending}
                    />
                    {!files.audio ? (
                      <div 
                        onClick={() => audioInputRef.current?.click()}
                        className="h-32 border-2 border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-500/5 transition-colors"
                      >
                        <Music className="w-6 h-6 text-zinc-500 mb-2" />
                        <span className="text-xs text-zinc-500">Click to select audio</span>
                      </div>
                    ) : (
                      <div className="h-32 bg-zinc-950 border border-green-500/30 rounded-lg p-4 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <Music className="w-5 h-5 text-green-500" />
                          <button type="button" onClick={() => removeFile('audio')} disabled={isPending}>
                            <X className="w-4 h-4 text-zinc-500 hover:text-red-500" />
                          </button>
                        </div>
                        <p className="text-sm text-zinc-50 truncate">{files.audio.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Cover Art Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-50">Cover Art (JPG, PNG) *</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={coverInputRef}
                      onChange={(e) => handleFileChange(e, 'cover')}
                      disabled={isPending}
                    />
                    {!files.cover ? (
                      <div 
                        onClick={() => coverInputRef.current?.click()}
                        className="h-32 border-2 border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-500/5 transition-colors"
                      >
                        <ImageIcon className="w-6 h-6 text-zinc-500 mb-2" />
                        <span className="text-xs text-zinc-500">Click to select artwork</span>
                      </div>
                    ) : (
                      <div className="h-32 relative rounded-lg overflow-hidden border border-green-500/30">
                        <img 
                          src={URL.createObjectURL(files.cover)} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover opacity-60"
                        />
                        <button 
                          type="button" 
                          onClick={() => removeFile('cover')} 
                          className="absolute top-2 right-2 p-1 bg-black/80 rounded-full"
                          disabled={isPending}
                        >
                          <X className="w-4 h-4 text-zinc-50 hover:text-red-500" />
                        </button>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs text-zinc-50 truncate drop-shadow-md">{files.cover.name}</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => navigate('/artist/dashboard')}
                disabled={isPending}
                className="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isPending}
                className="bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-full font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <UploadCloud className="w-4 h-4 animate-bounce" /> Uploading...
                  </>
                ) : (
                  'Publish Track'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadSong;