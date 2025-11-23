import React from 'react';
import { FileText, Search, Shield, CheckCircle, Clock, Bell, Sparkles, ArrowRight, Zap, Award } from 'lucide-react';

interface HomepageProps {
  onNavigateToForm: () => void;
  onNavigateToTrack: () => void;
  onNavigateToAdmin: () => void;
}

export default function Homepage({ onNavigateToForm, onNavigateToTrack, onNavigateToAdmin }: HomepageProps) {
  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-2.5 rounded-2xl shadow-lg transform hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-blue-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">DokUMen</h1>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-sm text-gray-600">Sistem Manajemen Dokumen Universitas</p>
            </div>
          </div>
          <button
            onClick={onNavigateToAdmin}
            className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-50 to-white text-gray-700 hover:from-blue-50 hover:to-indigo-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all shadow-md hover:shadow-xl transform hover:scale-105"
          >
            <Shield className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
            <span className="group-hover:text-blue-600 transition-colors">Login Admin</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6 border border-blue-200 shadow-lg">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">Pengajuan Dokumen Lebih Cepat & Mudah</span>
          </div>
          <h2 className="text-blue-900 mb-6 leading-tight">
            Ajukan & Lacak Dokumen Anda<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Tanpa Antre</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Sistem digital yang memudahkan mahasiswa mengajukan dokumen dan memantau progress secara real-time. 
            <span className="text-blue-600"> Hemat waktu, lebih efisien!</span>
          </p>
        </div>

        {/* Main Action Cards with enhanced design */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          <div
            onClick={onNavigateToForm}
            className="group relative bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Ajukan Dokumen</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Isi formulir online untuk mengajukan surat keterangan, transkrip, atau dokumen lainnya. Prosesnya cepat dan mudah, kapan saja dan di mana saja.
              </p>
              <div className="inline-flex items-center gap-2 text-blue-600 group-hover:gap-4 transition-all">
                <span>Mulai Pengajuan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={onNavigateToTrack}
            className="group relative bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-indigo-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Lacak Status</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Cek progress dokumen Anda kapan saja. Dapatkan informasi real-time tentang posisi pengajuan dengan tracking yang detail dan transparan.
              </p>
              <div className="inline-flex items-center gap-2 text-indigo-600 group-hover:gap-4 transition-all">
                <span>Lacak Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl" />
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full mb-4 border border-amber-200">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-700">Mengapa Memilih DokUMen?</span>
              </div>
              <h3 className="text-center text-gray-900">Keunggulan DokUMen</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center transform hover:scale-105 transition-all">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl transition-shadow border border-green-200">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-gray-900 mb-3">Mudah & Cepat</h4>
                <p className="text-gray-600 leading-relaxed">
                  Ajukan dokumen kapan saja, di mana saja tanpa perlu datang ke kampus. Hemat waktu dan tenaga Anda.
                </p>
              </div>
              <div className="group text-center transform hover:scale-105 transition-all">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl transition-shadow border border-blue-200">
                  <Clock className="w-10 h-10 text-blue-600" />
                </div>
                <h4 className="text-gray-900 mb-3">Tracking Real-time</h4>
                <p className="text-gray-600 leading-relaxed">
                  Pantau progress dokumen Anda dari pengajuan hingga selesai dengan update yang transparan dan akurat.
                </p>
              </div>
              <div className="group text-center transform hover:scale-105 transition-all">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl transition-shadow border border-purple-200">
                  <Bell className="w-10 h-10 text-purple-600" />
                </div>
                <h4 className="text-gray-900 mb-3">Notifikasi Otomatis</h4>
                <p className="text-gray-600 leading-relaxed">
                  Dapatkan pemberitahuan instant saat dokumen Anda sudah siap diambil. Tidak perlu khawatir terlewat!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-all">
            <div className="text-5xl mb-2">1000+</div>
            <p className="text-blue-100">Dokumen Diproses</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-all">
            <div className="text-5xl mb-2">98%</div>
            <p className="text-indigo-100">Kepuasan Mahasiswa</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-all">
            <div className="text-5xl mb-2">24/7</div>
            <p className="text-purple-100">Akses Kapan Saja</p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-12 mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-lg p-2 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-white">DokUMen</h3>
          </div>
          <p className="text-gray-300 mb-2">
            Sistem Manajemen Dokumen Universitas
          </p>
          <p className="text-gray-400 text-sm">
            © 2025 DokUMen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}