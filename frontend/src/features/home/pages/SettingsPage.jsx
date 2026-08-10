import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import authService from "@/services/authService";

export default function SettingsPage() {
  const { user } = useAuth();
  
  // Profile Form State
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  
  // Preferences State
  const [audioQuality, setAudioQuality] = useState("high");
  const [explicitFilter, setExplicitFilter] = useState(true);
  
  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // Feedback Messages
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      
      // Simulating or calling update service
      if (authService.updateProfile) {
        await authService.updateProfile({ name, audioQuality, explicitFilter });
      }
      setSuccessMsg("Settings and profile updated successfully!");
    } catch (err) {
      setErrorMsg(err.message || "Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      
      await authService.changePassword(currentPassword, newPassword);
      setSuccessMsg("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setErrorMsg(err.message || "Failed to change password. Check your current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-zinc-100 max-w-4xl mx-auto space-y-10 pb-32">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings & Preferences</h1>
        <p className="text-zinc-400 text-sm mt-1">Customize your streaming experience and account security</p>
      </div>

      {successMsg && <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">{successMsg}</div>}
      {errorMsg && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">{errorMsg}</div>}

      {/* Profile & General Settings */}
      <form onSubmit={handleUpdateProfile} className="space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-3">Account Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Display Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email Address</label>
            <Input value={email} disabled className="opacity-60 cursor-not-allowed bg-zinc-800" />
          </div>
        </div>

        {/* Audio Quality Preferences */}
        <div className="space-y-3 pt-4">
          <label className="text-sm font-medium text-zinc-300">Streaming Audio Quality</label>
          <div className="grid grid-cols-3 gap-4">
            {["normal", "high", "lossless"].map((quality) => (
              <button
                type="button"
                key={quality}
                onClick={() => setAudioQuality(quality)}
                className={`py-3 px-4 rounded-lg border text-sm font-medium capitalize transition-all ${
                  audioQuality === quality 
                    ? "bg-green-500/20 border-green-500 text-green-400" 
                    : "bg-zinc-800/40 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>

        {/* Explicit Content Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div>
            <p className="text-sm font-medium text-zinc-200">Allow Explicit Content</p>
            <p className="text-xs text-zinc-400">Play explicit content marked with the E tag</p>
          </div>
          <input 
            type="checkbox" 
            checked={explicitFilter} 
            onChange={(e) => setExplicitFilter(e.target.checked)}
            className="w-5 h-5 accent-green-500 cursor-pointer" 
          />
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={loading}>Save Preferences</Button>
        </div>
      </form>

      {/* Security & Password Change */}
      <form onSubmit={handleChangePassword} className="space-y-6 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-3">Security & Password</h2>
        
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Current Password</label>
            <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">New Password</label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" />
          </div>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="secondary" disabled={loading}>Update Password</Button>
        </div>
      </form>
    </div>
  );
}