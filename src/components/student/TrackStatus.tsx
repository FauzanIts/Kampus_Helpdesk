import React, { useState } from 'react';
import { ArrowLeft, Search, Clock, CheckCircle, AlertCircle, FileText, TrendingUp } from 'lucide-react';
import type { Submission } from '../../App';

interface TrackStatusProps {
  onBack: () => void;
  submissions: Submission[];
}

export default function TrackStatus({ onBack, submissions }: TrackStatusProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Submission | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = submissions.find(
      (sub) => sub.id === searchQuery.toUpperCase() || sub.nim === searchQuery
    );
    setSearchResult(result || null);
    setSearched(true);
  };

  const getStatusInfo = (status: Submission['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Menunggu Verifikasi',
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: Clock,
        };
      case 'processing':
        return {
          label: 'Sedang Diproses',
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: Clock,
        };
      case 'rector':
        return {
          label: 'Di Rektorat',
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          border: 'border-indigo-200',
          icon: FileText,
        };
      case 'completed':
        return {
          label: 'Selesai - Siap Diambil',
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: CheckCircle,
        };
    }
  };

  const getProgressPercentage = (status: Submission['status']) => {
    switch (status) {
      case 'pending': return 25;
      case 'processing': return 50;
      case 'rector': return 75;
      case 'completed': return 100;
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-8 transition-all transform hover:translate-x-[-4px]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
          <span>Kembali</span>
        </button>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full -ml-16 -mb-16" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2.5 rounded-xl">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Lacak Status Dokumen</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Masukkan kode pengajuan atau NIM Anda untuk melihat status dokumen secara real-time
            </p>

            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Masukkan kode pengajuan (contoh: DOC001) atau NIM"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white/70 group-hover:border-gray-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Lacak</span>
              </button>
            </form>
          </div>
        </div>

        {searched && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {searchResult ? (
              <div>
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <h3 className="text-white mb-2">Detail Pengajuan</h3>
                      <p className="text-indigo-100">Kode: {searchResult.id}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 bg-white/20 backdrop-blur-lg ${getStatusInfo(searchResult.status).border}`}>
                      {React.createElement(getStatusInfo(searchResult.status).icon, {
                        className: 'w-5 h-5 text-white',
                      })}
                      <span className="text-white">
                        {getStatusInfo(searchResult.status).label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Info Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-sm text-gray-500 mb-1">Nama</p>
                      <p className="text-gray-900">{searchResult.name}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-sm text-gray-500 mb-1">NIM</p>
                      <p className="text-gray-900">{searchResult.nim}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                      <p className="text-sm text-gray-500 mb-1">Jenis Dokumen</p>
                      <p className="text-gray-900">{searchResult.documentType}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                      <p className="text-sm text-gray-500 mb-1">Tanggal Pengajuan</p>
                      <p className="text-gray-900">
                        {searchResult.submittedAt.toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full -mr-16 -mt-16" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-white p-2 rounded-lg shadow-md">
                          <TrendingUp className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h4 className="text-gray-900">Progress Pengajuan</h4>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="mb-10">
                        <div className="flex justify-between text-sm text-gray-600 mb-3">
                          <span>Progress</span>
                          <span className="text-indigo-600">{getProgressPercentage(searchResult.status)}%</span>
                        </div>
                        <div className="relative w-full bg-white rounded-full h-4 shadow-inner overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full transition-all duration-1000 flex items-center justify-end"
                            style={{ width: `${getProgressPercentage(searchResult.status)}%` }}
                          >
                            <div className="w-3 h-3 bg-white rounded-full mr-1 shadow-lg animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Timeline */}
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${searchResult.status === 'pending' || searchResult.status === 'processing' || searchResult.status === 'rector' || searchResult.status === 'completed' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-300'}`}>
                            <CheckCircle className="w-6 h-6 text-white" />
                            {(searchResult.status === 'processing' || searchResult.status === 'rector' || searchResult.status === 'completed') && (
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-green-400 to-blue-400" />
                            )}
                          </div>
                          <div className="flex-1 bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <p className="text-gray-900 mb-1">Pengajuan Diterima</p>
                            <p className="text-sm text-gray-600">
                              {searchResult.submittedAt.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${searchResult.status === 'processing' || searchResult.status === 'rector' || searchResult.status === 'completed' ? 'bg-gradient-to-br from-blue-400 to-cyan-500' : 'bg-gray-300'}`}>
                            {searchResult.status === 'processing' || searchResult.status === 'rector' || searchResult.status === 'completed' ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <Clock className="w-6 h-6 text-white" />
                            )}
                            {(searchResult.status === 'rector' || searchResult.status === 'completed') && (
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400" />
                            )}
                          </div>
                          <div className="flex-1 bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <p className="text-gray-900 mb-1">Verifikasi TU</p>
                            <p className="text-sm text-gray-600">
                              {searchResult.status === 'processing' || searchResult.status === 'rector' || searchResult.status === 'completed'
                                ? 'Dokumen telah diverifikasi'
                                : 'Menunggu verifikasi'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${searchResult.status === 'rector' || searchResult.status === 'completed' ? 'bg-gradient-to-br from-indigo-400 to-purple-500' : 'bg-gray-300'}`}>
                            {searchResult.status === 'rector' || searchResult.status === 'completed' ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <Clock className="w-6 h-6 text-white" />
                            )}
                            {searchResult.status === 'completed' && (
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-indigo-400 to-pink-400" />
                            )}
                          </div>
                          <div className="flex-1 bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <p className="text-gray-900 mb-1">Proses di Rektorat</p>
                            <p className="text-sm text-gray-600">
                              {searchResult.status === 'rector' || searchResult.status === 'completed'
                                ? 'Dokumen sedang ditandatangani'
                                : 'Belum diproses'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${searchResult.status === 'completed' ? 'bg-gradient-to-br from-pink-400 to-rose-500' : 'bg-gray-300'}`}>
                            {searchResult.status === 'completed' ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <Clock className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1 bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <p className="text-gray-900 mb-1">Selesai</p>
                            <p className="text-sm text-gray-600">
                              {searchResult.status === 'completed'
                                ? 'Dokumen siap diambil di TU'
                                : 'Belum selesai'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {searchResult.status === 'completed' && (
                    <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16" />
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="bg-green-500 p-3 rounded-xl shadow-lg">
                          <CheckCircle className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-green-900 mb-2">🎉 Dokumen Anda Sudah Siap!</p>
                          <p className="text-green-700 leading-relaxed">
                            Silakan datang ke Bagian Tata Usaha untuk mengambil dokumen Anda. Jangan lupa membawa kartu mahasiswa dan tunjukkan kode pengajuan ini.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 px-8">
                <div className="bg-gradient-to-br from-red-100 to-rose-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-gray-900 mb-3">Dokumen Tidak Ditemukan</h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  Kode pengajuan atau NIM yang Anda masukkan tidak ditemukan dalam sistem. Silakan periksa kembali atau hubungi Bagian Tata Usaha.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}