import React, { useState } from 'react';
import {
  Shield,
  Mail,
  Key,
  Bell,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    privacy: 'public',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSaving(true);

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password must match.');
      setIsSaving(false);
      return;
    }

    try {
      // Call API endpoint here for account settings update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update account settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-8 shadow-[0_35px_120px_-35px_rgba(16,185,129,0.45)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <Shield className="w-3.5 h-3.5" /> Security Center
            </div>
            <h1 className="text-4xl font-bold text-zinc-50 tracking-tight">Account Settings</h1>
            <p className="max-w-2xl text-sm text-zinc-400">
              Keep your SoundWave studio secure and updated. Manage email, password, and notification preferences from one sleek control panel.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/70 p-4 text-zinc-300 shadow-xl shadow-black/20">
            <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">Status</div>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-zinc-100">All systems secure</span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">No security alerts in the past 30 days.</p>
          </div>
        </div>
      </div>

      {success && (
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300 shadow-sm shadow-emerald-500/10">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Settings saved successfully. Your studio is up to date.</span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300 shadow-sm shadow-rose-500/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-950/80 p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3 text-zinc-300 mb-6">
              <Mail className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-xl font-semibold text-zinc-50">Login & Email</h2>
                <p className="text-sm text-zinc-500">Update the email address linked to your studio login.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-500 focus:bg-zinc-900"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Current Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 pr-12 text-sm text-zinc-100 outline-none transition focus:border-emerald-500 focus:bg-zinc-900"
                    />
                    <Lock className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 pr-12 text-sm text-zinc-100 outline-none transition focus:border-emerald-500 focus:bg-zinc-900"
                    />
                    <Key className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-emerald-500 focus:bg-zinc-900"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-zinc-800/90 bg-zinc-950/80 p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 text-zinc-300 mb-6">
                <Bell className="w-5 h-5 text-emerald-400" />
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50">Notifications</h2>
                  <p className="text-sm text-zinc-500">Choose how you want SoundWave alerts to reach you.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">Email Notifications</p>
                    <p className="text-xs text-zinc-500">Receive important updates and studio alerts.</p>
                  </div>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                    className="h-5 w-5 rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-950 px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">Privacy Mode</p>
                    <p className="text-xs text-zinc-500">Control whether your artist profile is visible to fans.</p>
                  </div>
                  <select
                    name="privacy"
                    value={formData.privacy}
                    onChange={handleInputChange}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none focus:border-emerald-500"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800/90 bg-zinc-950/80 p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 text-zinc-300 mb-6">
                <Shield className="w-5 h-5 text-emerald-400" />
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50">Privacy & Security</h2>
                  <p className="text-sm text-zinc-500">Secure your account with extra protection settings.</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-zinc-400">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-4 py-4">
                  <p className="font-medium text-zinc-100">Two-factor authentication</p>
                  <p className="mt-1 text-xs text-zinc-500">Coming soon — stay tuned for an extra layer of login security.</p>
                </div>
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-4 py-4">
                  <p className="font-medium text-zinc-100">Password strength</p>
                  <p className="mt-1 text-xs text-zinc-500">Use a long passphrase with letters, numbers, and symbols for best protection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 px-6 py-3 text-sm font-bold text-black shadow-[0_18px_50px_-25px_rgba(16,185,129,0.7)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving Changes...' : 'Save Settings'}
          </button>
          <p className="text-xs text-zinc-500">Changes are saved securely to your artist account.</p>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
