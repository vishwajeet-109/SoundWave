import React, { useState, useRef } from 'react';
import { Camera, Save, User, Music, Globe, Instagram, Twitter, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const ProfileSettings = () => {
  const { user } = useAuth();

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [formData, setFormData] = useState({
    artistName: user?.name || '',
    genre: user?.genre || 'Hip-Hop',
    bio: user?.bio || 'Independent artist crafting soundscapes and electronic beats.',
    location: user?.location || 'Mumbai, India',
    website: user?.socials?.website || '',
    instagram: user?.socials?.instagram || '',
    twitter: user?.socials?.twitter || '',
    spotify: user?.socials?.spotify || '',
  });

  const [avatar, setAvatar] = useState({ file: null, preview: user?.avatarUrl || null });
  const [banner, setBanner] = useState({ file: null, preview: user?.bannerUrl || null });

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes('image')) {
        setError('Please select a valid image file.');
        return;
      }
      setError('');
      const previewUrl = URL.createObjectURL(file);
      if (type === 'avatar') setAvatar({ file, preview: previewUrl });
      if (type === 'banner') setBanner({ file, preview: previewUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSaving(true);

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => payload.append(key, formData[key]));
      if (avatar.file) payload.append('avatar', avatar.file);
      if (banner.file) payload.append('banner', banner.file);

      // Call API endpoint here (e.g. await updateArtistProfile(payload))
      await new Promise((res) => setTimeout(res, 1200));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update profile settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-1">Artist Profile</h1>
        <p className="text-zinc-400 text-sm">Manage your public artist identity, artwork, and social presence.</p>
      </div>

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner & Avatar Customizer */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="relative h-44 bg-zinc-950 border-b border-zinc-800">
            {banner.preview ? (
              <img src={banner.preview} alt="Profile Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
            )}

            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-zinc-50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              Change Banner
            </button>

            <input
              type="file"
              ref={bannerInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'banner')}
            />

            {/* Overlapping Avatar */}
            <div className="absolute -bottom-10 left-6">
              <div className="relative w-24 h-24 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden group">
                {avatar.preview ? (
                  <img src={avatar.preview} alt="Artist Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-500">
                    <User className="w-10 h-10" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <input
                type="file"
                ref={avatarInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, 'avatar')}
              />
            </div>
          </div>

          <div className="pt-14 p-6">
            <p className="text-xs text-zinc-500">Banner recommended size: 1200x300px. Square format for Avatar.</p>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-6">
          <h2 className="text-lg font-bold text-zinc-50">Basic Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-50">Artist / Stage Name *</label>
              <input
                type="text"
                name="artistName"
                value={formData.artistName}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-50">Primary Genre</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-50">Artist Bio</label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
              placeholder="Tell your fans your story..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-50">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Mumbai, India"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-6">
          <h2 className="text-lg font-bold text-zinc-50">Social & Streaming Profiles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-500" /> Instagram Handle
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@username"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                <Twitter className="w-3.5 h-3.5 text-sky-400" /> Twitter / X
              </label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="@username"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-green-500" /> Spotify Link
              </label>
              <input
                type="url"
                name="spotify"
                value={formData.spotify}
                onChange={handleInputChange}
                placeholder="https://open.spotify.com/artist/..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-400 text-black px-6 py-2.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving Changes...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;