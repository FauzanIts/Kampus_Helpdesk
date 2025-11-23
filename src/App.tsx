import React, { useState } from 'react';
import Homepage from './components/student/Homepage';
import SubmissionForm from './components/student/SubmissionForm';
import TrackStatus from './components/student/TrackStatus';
import AdminLogin from './components/admin/Login';
import AdminDashboard from './components/admin/Dashboard';
import SubmissionDetail from './components/admin/SubmissionDetail';

export type Submission = {
  id: string;
  name: string;
  nim: string;
  email: string;
  phone: string;
  documentType: string;
  reason: string;
  status: 'pending' | 'processing' | 'rector' | 'completed';
  submittedAt: Date;
  updatedAt: Date;
  attachments?: string[];
};

type Page = 
  | { type: 'home' }
  | { type: 'submission-form' }
  | { type: 'track-status' }
  | { type: 'admin-login' }
  | { type: 'admin-dashboard' }
  | { type: 'admin-detail'; submissionId: string };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 'DOC001',
      name: 'Ahmad Hidayat',
      nim: '20210101',
      email: 'ahmad@student.ac.id',
      phone: '081234567890',
      documentType: 'Surat Keterangan Aktif Kuliah',
      reason: 'Keperluan beasiswa',
      status: 'processing',
      submittedAt: new Date('2025-11-20T09:30:00'),
      updatedAt: new Date('2025-11-21T10:15:00'),
    },
    {
      id: 'DOC002',
      name: 'Siti Nurhaliza',
      nim: '20210202',
      email: 'siti@student.ac.id',
      phone: '081234567891',
      documentType: 'Transkrip Nilai Sementara',
      reason: 'Keperluan magang',
      status: 'completed',
      submittedAt: new Date('2025-11-18T14:20:00'),
      updatedAt: new Date('2025-11-20T16:45:00'),
    },
    {
      id: 'DOC003',
      name: 'Budi Santoso',
      nim: '20210303',
      email: 'budi@student.ac.id',
      phone: '081234567892',
      documentType: 'Surat Pengantar KP',
      reason: 'Keperluan Kerja Praktek di PT. XYZ',
      status: 'pending',
      submittedAt: new Date('2025-11-22T08:00:00'),
      updatedAt: new Date('2025-11-22T08:00:00'),
    },
  ]);

  const handleAddSubmission = (submission: Submission) => {
    setSubmissions([...submissions, submission]);
  };

  const handleUpdateSubmission = (id: string, updates: Partial<Submission>) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, ...updates, updatedAt: new Date() } : sub
    ));
  };

  const handleAdminLogin = (username: string, password: string) => {
    // Simple mock authentication
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setCurrentPage({ type: 'admin-dashboard' });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage({ type: 'home' });
  };

  const renderPage = () => {
    switch (currentPage.type) {
      case 'home':
        return (
          <Homepage
            onNavigateToForm={() => setCurrentPage({ type: 'submission-form' })}
            onNavigateToTrack={() => setCurrentPage({ type: 'track-status' })}
            onNavigateToAdmin={() => setCurrentPage({ type: 'admin-login' })}
          />
        );
      case 'submission-form':
        return (
          <SubmissionForm
            onBack={() => setCurrentPage({ type: 'home' })}
            onSubmit={handleAddSubmission}
          />
        );
      case 'track-status':
        return (
          <TrackStatus
            onBack={() => setCurrentPage({ type: 'home' })}
            submissions={submissions}
          />
        );
      case 'admin-login':
        return (
          <AdminLogin
            onBack={() => setCurrentPage({ type: 'home' })}
            onLogin={handleAdminLogin}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            submissions={submissions}
            onLogout={handleLogout}
            onViewDetail={(id) => setCurrentPage({ type: 'admin-detail', submissionId: id })}
          />
        );
      case 'admin-detail':
        return (
          <SubmissionDetail
            submission={submissions.find(s => s.id === currentPage.submissionId)}
            onBack={() => setCurrentPage({ type: 'admin-dashboard' })}
            onUpdateStatus={handleUpdateSubmission}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderPage()}
    </div>
  );
}
