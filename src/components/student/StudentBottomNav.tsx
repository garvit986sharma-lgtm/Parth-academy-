import React from 'react';
import { motion } from 'motion/react';
import { Home, BookOpen, PlaySquare, ClipboardCheck, User } from 'lucide-react';
import { StudentNavTab } from '../../types';

interface StudentBottomNavProps {
  activeTab: StudentNavTab;
  onTabChange: (tab: StudentNavTab) => void;
  unreadTestsCount?: number;
}

export const StudentBottomNav: React.FC<StudentBottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadTestsCount = 0,
}) => {
  // Map internal aliases: 'dashboard' -> 'home'
  const current = activeTab === 'dashboard' ? 'home' : activeTab;

  const tabs: { id: StudentNavTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'materials', label: 'Study Material', icon: BookOpen },
    { id: 'videos', label: 'Video Lectures', icon: PlaySquare },
    { id: 'tests', label: 'Tests', icon: ClipboardCheck },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      id="bottom-nav-bar"
      aria-label="Student Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(226, 232, 240, 0.9)',
        zIndex: 50,
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
        paddingTop: '6px',
        boxShadow: '0 -4px 20px rgba(9, 43, 99, 0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          alignItems: 'center',
          padding: '0 8px',
        }}
      >
        {tabs.map((tab) => {
          const isActive = current === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              id={`nav-btn-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 4px 4px 4px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: isActive ? '#092b63' : '#64748b',
                transition: 'color 0.2s ease',
                userSelect: 'none',
                outline: 'none',
                minHeight: '52px',
              }}
            >
              {/* Active Pill Glow Background */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  style={{
                    position: 'absolute',
                    top: '2px',
                    width: '36px',
                    height: '32px',
                    background: 'linear-gradient(135deg, rgba(18, 97, 201, 0.12), rgba(255, 183, 3, 0.2))',
                    borderRadius: '12px',
                    zIndex: 0,
                  }}
                />
              )}

              {/* Icon with active animation */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#092b63' : '#64748b',
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.12 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <Icon size={20} />
                </motion.div>

                {/* Badge for Tests */}
                {tab.id === 'tests' && unreadTestsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-8px',
                      background: '#ffb703',
                      color: '#092b63',
                      fontSize: '10px',
                      fontWeight: 800,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid #ffffff',
                    }}
                  >
                    {unreadTestsCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '10.5px',
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? '#092b63' : '#64748b',
                  marginTop: '4px',
                  letterSpacing: '-0.1px',
                  lineHeight: 1.1,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </span>

              {/* Gold Micro Accent Dot */}
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: '1px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#ffb703',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
