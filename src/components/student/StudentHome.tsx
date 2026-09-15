import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  PlaySquare,
  ClipboardCheck,
  Award,
  CreditCard,
  User,
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  Bell,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Video,
  Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentNavTab, TestItem, StudyMaterialItem, UpcomingClass } from '../../types';
import { INITIAL_UPCOMING_CLASSES } from '../../data/initialData';
import { TestRunnerModal } from '../TestRunnerModal';
import { MaterialViewerModal } from '../MaterialViewerModal';

interface StudentHomeProps {
  onNavigate: (tab: StudentNavTab) => void;
  onOpenAdminLogin?: () => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({ onNavigate, onOpenAdminLogin }) => {
  const {
    currentStudent,
    selectedClass,
    setSelectedClass,
    announcements,
    tests,
    materials,
    fees,
    setIsAuthModalOpen,
  } = useApp();

  const [activeTestToRun, setActiveTestToRun] = useState<TestItem | null>(null);
  const [activeMaterialToView, setActiveMaterialToView] = useState<StudyMaterialItem | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any | null>(null);

  // Filter upcoming classes for student's class
  const upcomingClasses = INITIAL_UPCOMING_CLASSES.filter((c) => c.grade === selectedClass);

  // Filter tests for student's class
  const classTests = tests.filter((t) => t.grade === selectedClass && t.isPublished);
  const nextWeeklyTest = classTests.find((t) => t.testType === 'weekly') || classTests[0];

  // Quick Action items
  const quickActions = [
    {
      id: 'materials',
      title: 'Study Notes',
      subtitle: 'PDFs & Formulas',
      icon: BookOpen,
      bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      iconColor: '#1261c9',
      tab: 'materials' as StudentNavTab,
    },
    {
      id: 'videos',
      title: 'Video Classes',
      subtitle: 'Recorded Lectures',
      icon: PlaySquare,
      bg: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
      iconColor: '#dc2626',
      tab: 'videos' as StudentNavTab,
    },
    {
      id: 'tests',
      title: 'Weekly Tests',
      subtitle: 'Live & Mocks',
      icon: ClipboardCheck,
      bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
      iconColor: '#16a34a',
      tab: 'tests' as StudentNavTab,
    },
    {
      id: 'results',
      title: 'Results & Ranks',
      subtitle: 'Scorecards',
      icon: Award,
      bg: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
      iconColor: '#d97706',
      tab: 'tests' as StudentNavTab,
    },
    {
      id: 'fees',
      title: 'Fee Status',
      subtitle: 'Installments & Receipts',
      icon: CreditCard,
      bg: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
      iconColor: '#9333ea',
      tab: 'profile' as StudentNavTab,
    },
    {
      id: 'profile',
      title: 'My Profile',
      subtitle: 'Details & Attendance',
      icon: User,
      bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
      iconColor: '#092b63',
      tab: 'profile' as StudentNavTab,
    },
  ];

  return (
    <div style={{ padding: '16px 0 32px 0' }}>
      {/* 1. WELCOME CARD */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        id="home-welcome-card"
        style={{
          background: 'linear-gradient(135deg, #092b63 0%, #1261c9 60%, #1d4ed8 100%)',
          borderRadius: '20px',
          padding: '24px 20px',
          color: '#ffffff',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(9, 43, 99, 0.22)',
        }}
      >
        {/* Subtle decorative gold circle */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 183, 3, 0.25) 0%, rgba(255, 183, 3, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Top Badge & Class Switcher */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 183, 3, 0.18)',
                border: '1px solid rgba(255, 183, 3, 0.45)',
                color: '#ffb703',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.4px',
              }}
            >
              <Sparkles size={13} />
              <span>ACADEMIC EXCELLENCE 2026-27</span>
            </div>

            {/* Quick Class Toggle */}
            <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '20px', padding: '2px' }}>
              <button
                id="toggle-class-12"
                onClick={() => setSelectedClass('Class 12th')}
                style={{
                  border: 'none',
                  background: selectedClass === 'Class 12th' ? '#ffb703' : 'transparent',
                  color: selectedClass === 'Class 12th' ? '#092b63' : '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Class 12th
              </button>
              <button
                id="toggle-class-10"
                onClick={() => setSelectedClass('Class 10th')}
                style={{
                  border: 'none',
                  background: selectedClass === 'Class 10th' ? '#ffb703' : 'transparent',
                  color: selectedClass === 'Class 10th' ? '#092b63' : '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Class 10th
              </button>
            </div>
          </div>

          {/* Student Welcome Title */}
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.4px' }}>
            Welcome back, {currentStudent ? currentStudent.name : 'Aspirant'}! 👋
          </h1>
          <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px 0', lineHeight: 1.5, maxWidth: '520px' }}>
            Parth Academy Coaching Portal • {selectedClass} CBSE Boards & Entrance Preparation. Access your daily schedule, notes, and tests below.
          </p>

          {/* Student Profile Quick Strip or Sign In Button */}
          {currentStudent ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span style={{ color: '#ffb703', fontWeight: 700 }}>
                Roll No: <b style={{ color: '#ffffff' }}>{currentStudent.rollNo}</b>
              </span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span style={{ color: '#93c5fd' }}>
                Batch: <b style={{ color: '#ffffff' }}>Super-40 Regular</b>
              </span>
              <span style={{ color: '#94a3b8' }}>•</span>
              <span style={{ color: '#86efac', fontWeight: 700 }}>
                Status: Active ✓
              </span>
            </div>
          ) : (
            <button
              id="home-signin-btn"
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                background: '#ffb703',
                color: '#092b63',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(255, 183, 3, 0.35)',
              }}
            >
              <span>🔑</span> Sign In Student Account
            </button>
          )}
        </div>
      </motion.div>

      {/* ADMIN & FACULTY PORTAL BANNER (DIRECT ACCESS) */}
      {onOpenAdminLogin && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          id="home-admin-access-card"
          onClick={onOpenAdminLogin}
          style={{
            background: 'linear-gradient(135deg, #092b63 0%, #172554 100%)',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            cursor: 'pointer',
            border: '1.5px solid rgba(255, 183, 3, 0.45)',
            boxShadow: '0 4px 16px rgba(9, 43, 99, 0.14)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(255, 183, 3, 0.2)',
                color: '#ffb703',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255, 183, 3, 0.5)',
              }}
            >
              <Shield size={22} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                  Director & Faculty Admin Panel
                </span>
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 800,
                    background: '#ffb703',
                    color: '#092b63',
                    padding: '1px 6px',
                    borderRadius: '4px',
                  }}
                >
                  STAFF
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Upload study notes, create weekly tests & manage fee registers
              </p>
            </div>
          </div>

          <button
            id="home-admin-portal-cta"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAdminLogin();
            }}
            style={{
              background: '#ffb703',
              color: '#092b63',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            <span>Admin Login</span>
            <ArrowRight size={13} />
          </button>
        </motion.div>
      )}

      {/* 2. QUICK ACTION BUTTONS */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
            ⚡ Quick Actions
          </h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Shortcuts</span>
        </div>

        <div
          id="home-quick-actions"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
            gap: '12px',
          }}
        >
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                id={`quick-act-${action.id}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate(action.tab)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '14px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: action.bg,
                    color: action.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#092b63', lineHeight: 1.2 }}>
                    {action.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {action.subtitle}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. UPCOMING CLASSES */}
      <div style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
              📅 Upcoming Classes & Timetable
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Scheduled sessions for {selectedClass}</span>
          </div>
          <span
            style={{
              background: '#eff6ff',
              color: '#1261c9',
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '6px',
            }}
          >
            Today's Schedule
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {upcomingClasses.length === 0 ? (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', color: '#64748b' }}>
              No classes scheduled for today.
            </div>
          ) : (
            upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: '220px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: cls.subject === 'Physics' ? '#eff6ff' : cls.subject === 'Chemistry' ? '#fef2f2' : '#f0fdf4',
                      color: cls.subject === 'Physics' ? '#1261c9' : cls.subject === 'Chemistry' ? '#dc2626' : '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      flexShrink: 0,
                    }}
                  >
                    {cls.subject.slice(0, 3).toUpperCase()}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#092b63',
                          background: '#f1f5f9',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {cls.subject}
                      </span>
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a' }} />
                        {cls.date}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
                      {cls.topic}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#64748b', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} color="#092b63" /> {cls.time}
                      </span>
                      <span>•</span>
                      <span>Faculty: <b>{cls.faculty}</b></span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="#dc2626" /> {cls.room}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onNavigate('videos')}
                    style={{
                      background: 'linear-gradient(135deg, #092b63, #1261c9)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>🎥</span> Join / Notes
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. LATEST NOTICES */}
      <div style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
              📢 Latest Notices & Circulars
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Important institutional announcements</span>
          </div>
          <span
            style={{
              fontSize: '11px',
              color: '#d97706',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              padding: '2px 8px',
              borderRadius: '6px',
              fontWeight: 700,
            }}
          >
            Verified Updates
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {announcements.slice(0, 3).map((notice) => (
            <div
              key={notice.id}
              onClick={() => setSelectedAnnouncement(notice)}
              style={{
                background: '#ffffff',
                border: notice.priority === 'high' ? '1.5px solid #fed7aa' : '1.5px solid #e2e8f0',
                borderLeft: notice.priority === 'high' ? '5px solid #f97316' : '5px solid #1261c9',
                borderRadius: '14px',
                padding: '14px 16px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'transform 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: notice.priority === 'high' ? '#c2410c' : '#1261c9',
                    background: notice.priority === 'high' ? '#ffedd5' : '#eff6ff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {notice.category}
                </span>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {notice.date}
                </span>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#092b63', margin: '0 0 4px 0' }}>
                {notice.title}
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                {notice.content.slice(0, 110)}...
              </p>

              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: '#1261c9', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Read Notice <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. NEXT UPCOMING TEST BANNER */}
      {nextWeeklyTest && (
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            padding: '18px 20px',
            marginBottom: '26px',
            boxShadow: '0 2px 10px rgba(9, 43, 99, 0.04)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  background: '#fef3c7',
                  color: '#b45309',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                UPCOMING EXAM • {selectedClass}
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Scheduled: {nextWeeklyTest.scheduledDate || 'This Sunday'}
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: '0 0 4px 0' }}>
              {nextWeeklyTest.title}
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              {nextWeeklyTest.subject} • {nextWeeklyTest.questionsCount} Questions • {nextWeeklyTest.durationMinutes} Mins Duration
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTestToRun(nextWeeklyTest)}
              style={{
                background: '#ffb703',
                color: '#092b63',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 10px rgba(255, 183, 3, 0.25)',
              }}
            >
              <span>⏱️</span> Attempt Test
            </button>
            <button
              onClick={() => onNavigate('tests')}
              style={{
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              All Tests
            </button>
          </div>
        </div>
      )}

      {/* FOOTER SECTION: Design by Garvit Sharma */}
      <footer
        style={{
          background: '#092b63',
          color: '#ffffff',
          borderRadius: '18px',
          padding: '24px 20px',
          marginTop: '20px',
          borderTop: '3px solid #ffb703',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: '#ffb703',
                  color: '#092b63',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '13px',
                }}
              >
                PA
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>PARTH ACADEMY</span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#93c5fd' }}>
              Near Priya School, Baran Road, Antah, Rajasthan • Helpline: +91 97846 64518
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('profile')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Student Profile →
            </button>

            {onOpenAdminLogin && (
              <button
                id="footer-admin-login-btn"
                onClick={onOpenAdminLogin}
                style={{
                  background: '#ffb703',
                  border: 'none',
                  color: '#092b63',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                <Shield size={12} />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#cbd5e1',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span>© 2026 Parth Academy. All rights reserved.</span>
          <span style={{ color: '#ffb703', fontWeight: 700 }}>Design by Garvit Sharma</span>
        </div>
      </footer>

      {/* Notice Detail Modal */}
      {selectedAnnouncement && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9, 43, 99, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '16px',
          }}
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '24px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  background: '#eff6ff',
                  color: '#1261c9',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '12px',
                }}
              >
                {selectedAnnouncement.category}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{selectedAnnouncement.date}</span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#092b63', margin: '0 0 10px 0' }}>
              {selectedAnnouncement.title}
            </h3>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', fontSize: '13px', color: '#334155', lineHeight: 1.6, marginBottom: '20px' }}>
              {selectedAnnouncement.content}
            </div>

            <button
              onClick={() => setSelectedAnnouncement(null)}
              style={{
                width: '100%',
                background: '#092b63',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Close Notice
            </button>
          </div>
        </div>
      )}

      {/* Test Runner Modal */}
      {activeTestToRun && (
        <TestRunnerModal
          test={activeTestToRun}
          onClose={() => setActiveTestToRun(null)}
          onCompleted={() => {
            setActiveTestToRun(null);
            onNavigate('tests');
          }}
        />
      )}

      {/* Material Viewer Modal */}
      {activeMaterialToView && (
        <MaterialViewerModal
          material={activeMaterialToView}
          onClose={() => setActiveMaterialToView(null)}
        />
      )}
    </div>
  );
};
