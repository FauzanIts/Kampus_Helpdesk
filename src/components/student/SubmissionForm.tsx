import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, FileText, User, Mail, Phone, BookOpen } from 'lucide-react';
import type { Submission } from '../../App';

interface SubmissionFormProps {
  onBack: () => void;
  onSubmit: (submission: Submission) => void;
}

export default function SubmissionForm({ onBack, onSubmit }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    email: '',
    phone: '',
    documentType: '',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const documentTypes = [
    'Surat Keterangan Aktif Kuliah',
    'Transkrip Nilai Sementara',
    'Surat Pengantar KP',
    'Surat Keterangan Lulus',
    'Surat Rekomendasi',
    'Surat Keterangan Berkelakuan Baik',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = `DOC${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const newSubmission: Submission = {
      id: newId,
      ...formData,
      status: 'pending',
      submittedAt: new Date(),
      updatedAt: new Date(),
    };

    onSubmit(newSubmission);
    setSubmissionId(newId);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
          
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white animate-bounce-slow">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
          
          <h2 className="text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Pengajuan Berhasil!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Dokumen Anda telah berhasil diajukan. Simpan kode pengajuan di bawah ini untuk melacak status dokumen Anda.
          </p>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-8 shadow-inner">
            <p className="text-sm text-gray-600 mb-3">Kode Pengajuan Anda:</p>
            <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
              <p className="text-4xl text-blue-600 tracking-widest select-all">{submissionId}</p>
            </div>
            <p className="text-xs text-gray-500">Klik untuk menyalin kode</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  nim: '',
                  email: '',
                  phone: '',
                  documentType: '',
                  reason: '',
                });
              }}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Ajukan Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-8 transition-all transform hover:translate-x-[-4px]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
          <span>Kembali</span>
        </button>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-lg p-2 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-white">Formulir Pengajuan Dokumen</h2>
              </div>
              <p className="text-blue-100">
                Lengkapi formulir di bawah ini untuk mengajukan dokumen. Pastikan semua data yang diisi sudah benar.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Data Diri */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-gray-900">Data Diri</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all group-hover:border-gray-300 bg-white/50"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="nim" className="block text-gray-700 mb-2">
                    NIM <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nim"
                    name="nim"
                    required
                    value={formData.nim}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all group-hover:border-gray-300 bg-white/50"
                    placeholder="Contoh: 20210101"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all group-hover:border-gray-300 bg-white/50"
                    placeholder="email@student.ac.id"
                  />
                </div>
                <div className="group">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    No. Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all group-hover:border-gray-300 bg-white/50"
                    placeholder="08123456789"
                  />
                </div>
              </div>
            </div>

            {/* Jenis Dokumen */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 rounded-xl">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-gray-900">Detail Pengajuan</h3>
              </div>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="documentType" className="block text-gray-700 mb-2">
                    Jenis Dokumen <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="documentType"
                    name="documentType"
                    required
                    value={formData.documentType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all group-hover:border-gray-300 bg-white/50"
                  >
                    <option value="">Pilih jenis dokumen</option>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="group">
                  <label htmlFor="reason" className="block text-gray-700 mb-2">
                    Keperluan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    required
                    rows={4}
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all group-hover:border-gray-300 resize-none bg-white/50"
                    placeholder="Jelaskan keperluan dokumen ini..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Upload Dokumen Pendukung (Opsional)
                  </label>
                  <div className="group border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                    <Upload className="w-14 h-14 text-gray-400 mx-auto mb-4 group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                    <p className="text-gray-600 mb-2 group-hover:text-blue-600">Klik untuk upload atau drag & drop</p>
                    <p className="text-sm text-gray-500">PDF, JPG, atau PNG (Max. 5MB)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="group w-full px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Ajukan Dokumen</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}