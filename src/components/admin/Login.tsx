import React, { useState } from 'react';
import { ArrowLeft, Shield, AlertCircle, Lock, User } from 'lucide-react';

interface AdminLoginProps {
  onBack: () => void;
  onLogin: (username: string, password: string) => boolean;
}

export default function AdminLogin({ onBack, onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-8 transition-all transform hover:translate-x-[-4px]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
          <span>Kembali</span>
        </button>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-lg w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-center text-white mb-2">Login Admin</h2>
              <p className="text-center text-blue-100">
                Masuk ke dashboard untuk mengelola pengajuan dokumen
              </p>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white/70"
                  placeholder="Masukkan username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-600" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white/70"
                  placeholder="Masukkan password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-[1.02]"
              >
                Masuk ke Dashboard
              </button>
            </form>

            <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <p className="text-sm text-blue-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Demo Credentials:
              </p>
              <div className="space-y-1">
                <p className="text-sm text-blue-700">Username: <span className="font-mono bg-white px-2 py-0.5 rounded">admin</span></p>
                <p className="text-sm text-blue-700">Password: <span className="font-mono bg-white px-2 py-0.5 rounded">admin123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}