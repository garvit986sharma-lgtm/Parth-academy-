import React from 'react';
import { useApp } from '../../context/AppContext';
import { StudentNavTab } from '../../types';
import { Bell, Sparkles, Shield } from 'lucide-react';

interface StudentHeaderProps {
  activeTab: StudentNavTab;
  setActiveTab: (tab: StudentNavTab) => void;
  onOpenAdminLogin?: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdminLogin,
}) => {
  const {
    currentStudent,
    selectedClass,
    setSelectedClass,
    notifications,
    setIsNotificationsOpen,
    setIsAuthModalOpen,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      id="mobile-top-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 2px 10px rgba(9, 43, 99, 0.04)',
      }}
    >
      {/* Academy Top Announcement Strip */}
      <div
        style={{
          background: 'linear-gradient(90deg, #092b63 0%, #1261c9 100%)',
          color: '#ffffff',
          padding: '5px 16px',
          fontSize: '11px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ color: '#ffb703', fontWeight: 800 }}>★ PARTH ACADEMY</span>
          <span style={{ color: '#cbd5e1' }} className="hidden sm:inline">• Near Priya School, Antah</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', flexShrink: 0 }}>
          <span style={{ color: '#ffb703', fontWeight: 700 }} className="hidden md:inline">+91 97846 64518</span>
          {onOpenAdminLogin && (
            <button
              id="topstrip-admin-login-btn"
              onClick={onOpenAdminLogin}
              style={{
                background: '#ffb703',
                color: '#092b63',
                border: 'none',
                borderRadius: '12px',
                padding: '2px 9px',
                fontSize: '10.5px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                transition: 'all 0.15s ease',
              }}
              title="Open Admin & Faculty Portal Login"
            >
              <Shield size={11} />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Top Bar */}
      <div
        style={{
          maxWidth: '768px',
          margin: '0 auto',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Brand Logo & Name */}
        <div
          id="header-brand-logo"
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #092b63, #1261c9)',
              color: '#ffb703',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '16px',
              boxShadow: '0 3px 10px rgba(9, 43, 99, 0.25)',
              border: '1.5px solid rgba(255, 183, 3, 0.4)',
            }}
          >
            PA
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#092b63', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                PARTH ACADEMY
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  background: '#eff6ff',
                  color: '#1261c9',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  border: '1px solid #bfdbfe',
                }}
              >
                APP
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>
              Antah • CBSE Boards & Entrance
            </p>
          </div>
        </div>

        {/* Right Controls: Class Pill + Admin Button + Notifications + Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Class Switcher Pill */}
          <div
            style={{
              display: 'flex',
              background: '#f1f5f9',
              borderRadius: '16px',
              padding: '2px',
              border: '1px solid #e2e8f0',
            }}
          >
            <button
              id="header-btn-class12"
              onClick={() => setSelectedClass('Class 12th')}
              style={{
                border: 'none',
                background: selectedClass === 'Class 12th' ? '#092b63' : 'transparent',
                color: selectedClass === 'Class 12th' ? '#ffffff' : '#64748b',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              12th
            </button>
            <button
              id="header-btn-class10"
              onClick={() => setSelectedClass('Class 10th')}
              style={{
                border: 'none',
                background: selectedClass === 'Class 10th' ? '#092b63' : 'transparent',
                color: selectedClass === 'Class 10th' ? '#ffffff' : '#64748b',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              10th
            </button>
          </div>

          {/* Admin Panel Login Button */}
          {onOpenAdminLogin && (
            <button
              id="header-admin-login-btn"
              onClick={onOpenAdminLogin}
              style={{
                background: '#eff6ff',
                color: '#092b63',
                border: '1.5px solid #bfdbfe',
                padding: '6px 9px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.15s ease',
              }}
              title="Admin & Faculty Panel Login"
            >
              <Shield size={14} color="#1261c9" />
              <span style={{ display: 'inline', fontWeight: 800, color: '#092b63' }}>Admin</span>
            </button>
          )}

          {/* Notifications Button */}
          <button
            id="header-notification-btn"
            onClick={() => setIsNotificationsOpen(true)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              color: '#092b63',
            }}
            aria-label="Notices and Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontSize: '9.5px',
                  fontWeight: 800,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile Shortcut Avatar */}
          <button
            id="header-profile-btn"
            onClick={() => {
              if (currentStudent) {
                setActiveTab('profile');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            style={{
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            title={currentStudent ? 'View Profile' : 'Sign In'}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: currentStudent ? '#ffb703' : '#eff6ff',
                color: '#092b63',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: currentStudent ? '18px' : '13px',
                fontWeight: 800,
                border: currentStudent ? '1.5px solid #d97706' : '1px solid #bfdbfe',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              {currentStudent ? currentStudent.avatar || '👨‍🎓' : '🔑'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
