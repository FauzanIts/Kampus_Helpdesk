import React, { useState } from 'react';
import { FileText, LogOut, Clock, CheckCircle, AlertCircle, Eye, BarChart3, TrendingUp } from 'lucide-react';
import type { Submission } from '../../App';

interface AdminDashboardProps {
  submissions: Submission[];
  onLogout: () => void;
  onViewDetail: (id: string) => void;
}

export default function AdminDashboard({ submissions, onLogout, onViewDetail }: AdminDashboardProps) {
  const [filter, setFilter] = useState<'all' | Submission['status']>('all');

  const getStatusBadge = (status: Submission['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 rounded-full text-sm border border-yellow-200">
            <Clock className="w-4 h-4" />
            Menunggu
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm border border-blue-200">
            <Clock className="w-4 h-4" />
            Diproses
          </span>
        );
      case 'rector':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm border border-indigo-200">
            <FileText className="w-4 h-4" />
            Di Rektorat
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm border border-green-200">
            <CheckCircle className="w-4 h-4" />
            Selesai
          </span>
        );
    }
  };

  const filteredSubmissions = filter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filter);

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    processing: submissions.filter(s => s.status === 'processing').length,
    completed: submissions.filter(s => s.status === 'completed').length,
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-2.5 rounded-2xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-blue-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard Admin</h1>
              <p className="text-sm text-gray-600">Sistem Manajemen Dokumen</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-50 to-white text-gray-700 hover:from-red-50 hover:to-red-100 rounded-xl border-2 border-gray-200 hover:border-red-300 transition-all shadow-md hover:shadow-lg"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-600 transition-colors" />
            <span className="group-hover:text-red-600 transition-colors">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600">Total Pengajuan</p>
                <div className="bg-blue-100 p-2 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl text-gray-900 mb-1">{stats.total}</p>
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <TrendingUp className="w-4 h-4" />
                <span>Semua dokumen</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600">Menunggu</p>
                <div className="bg-yellow-100 p-2 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-4xl text-gray-900 mb-1">{stats.pending}</p>
              <div className="flex items-center gap-1 text-sm text-yellow-600">
                <Clock className="w-4 h-4" />
                <span>Perlu verifikasi</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600">Diproses</p>
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl text-gray-900 mb-1">{stats.processing}</p>
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <TrendingUp className="w-4 h-4" />
                <span>Sedang berjalan</span>
              </div>
            </div>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/20 to-transparent rounded-full -mr-12 -mt-12" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600">Selesai</p>
                <div className="bg-green-100 p-2 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-4xl text-gray-900 mb-1">{stats.completed}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Siap diambil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-6 border border-white/20">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-1.5 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            Filter Status
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-xl transition-all transform hover:scale-105 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semua ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-5 py-2.5 rounded-xl transition-all transform hover:scale-105 ${
                filter === 'pending'
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Menunggu ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('processing')}
              className={`px-5 py-2.5 rounded-xl transition-all transform hover:scale-105 ${
                filter === 'processing'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Diproses ({stats.processing})
            </button>
            <button
              onClick={() => setFilter('rector')}
              className={`px-5 py-2.5 rounded-xl transition-all transform hover:scale-105 ${
                filter === 'rector'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Di Rektorat
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-5 py-2.5 rounded-xl transition-all transform hover:scale-105 ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Selesai ({stats.completed})
            </button>
          </div>
        </div>

        {/* Enhanced Submissions Table */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700">Kode</th>
                  <th className="px-6 py-4 text-left text-gray-700">Nama</th>
                  <th className="px-6 py-4 text-left text-gray-700">NIM</th>
                  <th className="px-6 py-4 text-left text-gray-700">Jenis Dokumen</th>
                  <th className="px-6 py-4 text-left text-gray-700">Tanggal</th>
                  <th className="px-6 py-4 text-left text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions
                    .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
                    .map((submission) => (
                      <tr key={submission.id} className="hover:bg-blue-50/50 transition-colors group">
                        <td className="px-6 py-4 text-gray-900">{submission.id}</td>
                        <td className="px-6 py-4 text-gray-900">{submission.name}</td>
                        <td className="px-6 py-4 text-gray-700">{submission.nim}</td>
                        <td className="px-6 py-4 text-gray-700">{submission.documentType}</td>
                        <td className="px-6 py-4 text-gray-700">
                          {submission.submittedAt.toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(submission.status)}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => onViewDetail(submission.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Detail</span>
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-gray-100 p-4 rounded-full">
                          <FileText className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Tidak ada pengajuan dengan status ini</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}