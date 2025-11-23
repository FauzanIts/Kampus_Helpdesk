import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Bell } from 'lucide-react';
import type { Submission } from '../../App';

interface SubmissionDetailProps {
  submission: Submission | undefined;
  onBack: () => void;
  onUpdateStatus: (id: string, updates: Partial<Submission>) => void;
}

export default function SubmissionDetail({ submission, onBack, onUpdateStatus }: SubmissionDetailProps) {
  const [showNotification, setShowNotification] = useState(false);

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Pengajuan tidak ditemukan</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: Submission['status']) => {
    onUpdateStatus(submission.id, { status: newStatus });
    if (newStatus === 'completed') {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const getNextStatus = (currentStatus: Submission['status']): Submission['status'] | null => {
    switch (currentStatus) {
      case 'pending': return 'processing';
      case 'processing': return 'rector';
      case 'rector': return 'completed';
      case 'completed': return null;
    }
  };

  const getNextStatusLabel = (currentStatus: Submission['status']): string => {
    switch (currentStatus) {
      case 'pending': return 'Mulai Proses';
      case 'processing': return 'Kirim ke Rektorat';
      case 'rector': return 'Tandai Selesai';
      case 'completed': return 'Selesai';
    }
  };

  const nextStatus = getNextStatus(submission.status);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Dashboard</span>
        </button>

        {showNotification && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
            <Bell className="w-5 h-5 text-green-600" />
            <p className="text-green-800">
              Notifikasi telah dikirim ke mahasiswa bahwa dokumen sudah siap diambil!
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <h2 className="mb-2">Detail Pengajuan</h2>
            <p className="text-blue-100">Kode: {submission.id}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Student Info */}
            <div className="mb-8">
              <h3 className="text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">
                Informasi Mahasiswa
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                  <p className="text-gray-900">{submission.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">NIM</p>
                  <p className="text-gray-900">{submission.nim}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-gray-900">{submission.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">No. Telepon</p>
                  <p className="text-gray-900">{submission.phone}</p>
                </div>
              </div>
            </div>

            {/* Document Info */}
            <div className="mb-8">
              <h3 className="text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">
                Informasi Dokumen
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jenis Dokumen</p>
                  <p className="text-gray-900">{submission.documentType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Keperluan</p>
                  <p className="text-gray-900">{submission.reason}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tanggal Pengajuan</p>
                    <p className="text-gray-900">
                      {submission.submittedAt.toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Terakhir Diupdate</p>
                    <p className="text-gray-900">
                      {submission.updatedAt.toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Management */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-gray-900 mb-4">Kelola Status</h3>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Status Saat Ini:</p>
                <div className="flex items-center gap-3">
                  {submission.status === 'pending' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-xl">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      Menunggu Verifikasi
                    </span>
                  )}
                  {submission.status === 'processing' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      Sedang Diproses
                    </span>
                  )}
                  {submission.status === 'rector' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-xl">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                      Di Rektorat
                    </span>
                  )}
                  {submission.status === 'completed' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl">
                      <CheckCircle className="w-5 h-5" />
                      Selesai
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">Ubah Status:</p>
                <div className="grid md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleStatusChange('pending')}
                    disabled={submission.status === 'pending'}
                    className={`px-4 py-3 rounded-xl transition-all ${
                      submission.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    Menunggu
                  </button>
                  <button
                    onClick={() => handleStatusChange('processing')}
                    disabled={submission.status === 'processing'}
                    className={`px-4 py-3 rounded-xl transition-all ${
                      submission.status === 'processing'
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    Diproses
                  </button>
                  <button
                    onClick={() => handleStatusChange('rector')}
                    disabled={submission.status === 'rector'}
                    className={`px-4 py-3 rounded-xl transition-all ${
                      submission.status === 'rector'
                        ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    Di Rektorat
                  </button>
                  <button
                    onClick={() => handleStatusChange('completed')}
                    disabled={submission.status === 'completed'}
                    className={`px-4 py-3 rounded-xl transition-all ${
                      submission.status === 'completed'
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    Selesai
                  </button>
                </div>

                {nextStatus && (
                  <button
                    onClick={() => handleStatusChange(nextStatus)}
                    className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {submission.status === 'rector' ? (
                      <>
                        <Bell className="w-5 h-5" />
                        <span>{getNextStatusLabel(submission.status)} & Kirim Notifikasi</span>
                      </>
                    ) : (
                      <span>{getNextStatusLabel(submission.status)}</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
