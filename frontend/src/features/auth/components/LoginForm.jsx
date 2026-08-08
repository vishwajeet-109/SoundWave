import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, Lock, Loader2, ArrowRight, ShieldCheck, 
  Mic2, Headphones, ArrowLeft 
} from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Step 1: Role Selection State
  const [selectedRole, setSelectedRole] = useState(null);
  
  // Step 2: Form State
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(
  {
    email: formData.email,
    password: formData.password,
  },
  selectedRole
);
      const userRole = user?.role;

      // Strict Role-Based Portal Validation (Issue 4)
      if (selectedRole === 'user' && userRole !== 'user') {
        throw new Error('You are not authorized to login from this page.');
      }
      if (selectedRole === 'artist' && userRole !== 'artist') {
        throw new Error('Access denied. Only artist accounts can login here.');
      }
      if (selectedRole === 'admin' && userRole !== 'admin' && userRole !== 'super_admin' && userRole !== 'moderator') {
        throw new Error('Access denied. Only administrator accounts can login here.');
      }

      // Strict Portal Redirection
      if (userRole === 'admin' || userRole === 'super_admin' || userRole === 'moderator') {
        navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
      } else if (userRole === 'artist') {
        navigate(ROUTES.ARTIST_DASHBOARD, { replace: true });
      } else {
        navigate(ROUTES.HOME, { replace: true });
      }
    } catch (err) {
      setError(
        err?.message || 
        err?.response?.data?.message || 
        'Invalid email or password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // VIEW 1: ROLE SELECTION
  // ==========================================
  if (!selectedRole) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-2">Welcome to SoundWave</h1>
          <p className="text-zinc-400 text-sm">Choose your account type to continue.</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-4">
          
          <button 
            type="button"
            onClick={() => setSelectedRole('user')}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-green-500 hover:bg-green-500/5 transition-all text-left group"
          >
            <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-green-500/20 group-hover:text-green-500 text-zinc-400 transition-colors">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-zinc-50 font-bold">Listener</h3>
              <p className="text-zinc-400 text-xs mt-1">Stream music, create playlists, and follow artists.</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => setSelectedRole('artist')}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left group"
          >
            <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-500 text-zinc-400 transition-colors">
              <Mic2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-zinc-50 font-bold">Artist</h3>
              <p className="text-zinc-400 text-xs mt-1">Upload music, view analytics, and manage profile.</p>
            </div>
          </button>

          <button 
            type="button"
            onClick={() => setSelectedRole('admin')}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 hover:border-red-500 hover:bg-red-500/5 transition-all text-left group"
          >
            <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-red-500/20 group-hover:text-red-500 text-zinc-400 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-zinc-50 font-bold">SoundWave Team</h3>
              <p className="text-zinc-400 text-xs mt-1">Moderation, approvals, and platform administration.</p>
            </div>
          </button>

        </div>
        
        <div className="mt-8 text-center text-sm text-zinc-500">
          New to SoundWave?{' '}
          <Link to={ROUTES.REGISTER} className="text-zinc-50 hover:text-green-500 transition-colors font-medium">
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGIN FORM
  // ==========================================
  return (
    <div className="w-full max-w-md mx-auto">
      
      <button 
        type="button"
        onClick={() => {
          setSelectedRole(null);
          setError('');
          setFormData({ email: '', password: '' });
        }}
        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to roles
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-2">
          {selectedRole === 'artist' ? 'Artist Portal' : selectedRole === 'admin' ? 'Team Portal' : 'Welcome back'}
        </h1>
        <p className="text-zinc-400 text-sm">
          Sign in to your {selectedRole === 'artist' ? 'creator' : selectedRole === 'admin' ? 'administrator' : 'listener'} account.
        </p>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-50 pl-11 pr-4 py-3 rounded-xl outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-zinc-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-green-500 hover:text-green-400 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-950 border border-zinc-800 text-zinc-50 pl-11 pr-4 py-3 rounded-xl outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-black ${
              selectedRole === 'artist' ? 'bg-blue-500 hover:bg-blue-400' : 
              selectedRole === 'admin' ? 'bg-red-500 hover:bg-red-400' : 
              'bg-green-500 hover:bg-green-400'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
      
      {/* Dev Helper - Pre-fills info to make testing easier */}
      {import.meta.env.DEV && (
        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={() => {
              if (selectedRole === 'artist') setFormData({ email: 'artist@soundwave.com', password: 'password123' });
              if (selectedRole === 'admin') setFormData({ email: 'admin@soundwave.com', password: 'password123' });
              if (selectedRole === 'user') setFormData({ email: 'user@soundwave.com', password: 'password123' });
            }}
            className="text-xs text-zinc-500 hover:text-zinc-300 underline"
          >
            Fill Demo Credentials
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;