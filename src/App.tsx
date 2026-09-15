import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { StudentNavTab, AdminNavTab } from './types';

// Mobile-First Student Portal Components
import { StudentHeader } from './components/student/StudentHeader';
import { StudentBottomNav } from './components/student/StudentBottomNav';
import { StudentHome } from './components/student/StudentHome';
import { StudentMaterials } from './components/student/StudentMaterials';
import { StudentVideos } from './components/student/StudentVideos';
import { StudentTests } from './components/student/StudentTests';
import { StudentProfile } from './components/student/StudentProfile';

// Admin Portal Components (Strictly Separate)
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminMaterials } from './components/admin/AdminMaterials';
import { AdminVideos } from './components/admin/AdminVideos';
import { AdminTests } from './components/admin/AdminTests';
import { AdminResults } from './components/admin/AdminResults';
import { AdminFees } from './components/admin/AdminFees';
import { AdminStudents } from './components/admin/AdminStudents';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';

// Global Modals
import { StudentAuthModal } from './components/StudentAuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { NotificationDrawer } from './components/NotificationDrawer';

const MainApp: React.FC = () => {
  const {
    currentRole,
    adminUser,
    isAdminAuthenticated,
    switchRole,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isAdminLoginModalOpen,
    setIsAdminLoginModalOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    tests,
    selectedClass,
  } = useApp();

  // Navigation states - Default to mobile 'home' page
  const [studentTab, setStudentTab] = useState<StudentNavTab>('home');
  const [adminTab, setAdminTab] = useState<AdminNavTab>('overview');
  const [adminModalMode, setAdminModalMode] = useState<'login' | 'change_password' | 'forgot_password' | 'setup'>('login');

  // Strict Protection: Redirect unauthorized users out of admin panel
  useEffect(() => {
    if (currentRole === 'admin' && !isAdminAuthenticated) {
      switchRole('student');
    }
  }, [currentRole, isAdminAuthenticated, switchRole]);

  const handleOpenChangePassword = () => {
    setAdminModalMode('change_password');
    setIsAdminLoginModalOpen(true);
  };

  const handleOpenAdminLogin = () => {
    setAdminModalMode('login');
    setIsAdminLoginModalOpen(true);
  };

  // Published tests count for selected class
  const unreadTests = tests.filter((t) => t.grade === selectedClass && t.isPublished).length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f6f9fc' }}>
      {/* 
        ADMIN PANEL:
        Must be completely separate and visible only after admin login 
      */}
      {currentRole === 'admin' && isAdminAuthenticated && adminUser ? (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f1f5f9' }}>
          <AdminHeader
            activeTab={adminTab}
            setActiveTab={setAdminTab}
            onOpenChangePassword={handleOpenChangePassword}
          />
          <main style={{ flex: 1, maxWidth: '1360px', margin: '0 auto', width: '100%', padding: '20px 20px 60px 20px' }}>
            {adminTab === 'overview' && <AdminOverview onNavigate={setAdminTab} />}
            {adminTab === 'materials' && <AdminMaterials />}
            {adminTab === 'videos' && <AdminVideos />}
            {adminTab === 'tests' && <AdminTests />}
            {adminTab === 'results' && <AdminResults />}
            {adminTab === 'fees' && <AdminFees />}
            {adminTab === 'students' && <AdminStudents />}
            {adminTab === 'announcements' && <AdminAnnouncements />}
          </main>
        </div>
      ) : (
        /* 
          STUDENT PORTAL:
          Mobile-first app layout with fixed bottom navigation bar
        */
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Mobile Top Header */}
          <StudentHeader
            activeTab={studentTab}
            setActiveTab={setStudentTab}
            onOpenAdminLogin={handleOpenAdminLogin}
          />

          {/* Main App Content Container (with safe-area bottom clearance) */}
          <main
            id="mobile-main-content"
            style={{
              flex: 1,
              maxWidth: '768px',
              margin: '0 auto',
              width: '100%',
              padding: '0 16px 96px 16px',
              boxSizing: 'border-box',
            }}
          >
            {(studentTab === 'home' || studentTab === 'dashboard') && (
              <StudentHome onNavigate={setStudentTab} onOpenAdminLogin={handleOpenAdminLogin} />
            )}
            {studentTab === 'materials' && <StudentMaterials />}
            {studentTab === 'videos' && <StudentVideos />}
            {studentTab === 'tests' && <StudentTests />}
            {(studentTab === 'profile' || studentTab === 'fees' || studentTab === 'results') && (
              <StudentProfile onOpenAdminLogin={handleOpenAdminLogin} />
            )}
          </main>

          {/* 
            MOBILE-FIRST BOTTOM NAVIGATION BAR:
            Home, Study Material, Video Lectures, Tests, Profile
          */}
          <StudentBottomNav
            activeTab={studentTab}
            onTabChange={setStudentTab}
            unreadTestsCount={unreadTests}
          />
        </div>
      )}

      {/* GLOBAL MODALS */}
      {isAuthModalOpen && (
        <StudentAuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}

      {isAdminLoginModalOpen && (
        <AdminLoginModal
          initialMode={adminModalMode}
          onClose={() => setIsAdminLoginModalOpen(false)}
        />
      )}

      {isNotificationsOpen && (
        <NotificationDrawer onClose={() => setIsNotificationsOpen(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
