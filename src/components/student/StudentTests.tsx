import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ClipboardCheck,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart2,
  Sparkles,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TestItem, TestType, StudentTestAttempt } from '../../types';
import { TestRunnerModal } from '../TestRunnerModal';
import { MarksheetModal } from '../MarksheetModal';

export const StudentTests: React.FC = () => {
  const { tests, selectedClass, attempts, currentStudent } = useApp();
  const [activeSection, setActiveSection] = useState<'weekly' | 'mock' | 'results' | 'analytics'>('weekly');
  const [testToRun, setTestToRun] = useState<TestItem | null>(null);
  const [marksheetAttempt, setMarksheetAttempt] = useState<StudentTestAttempt | null>(null);

  // Filter for class
  const classTests = tests.filter((t) => t.grade === selectedClass && t.isPublished);
  const weeklyTests = classTests.filter((t) => t.testType === 'weekly');
  const mockTests = classTests.filter((t) => t.testType !== 'weekly');

  const classAttempts = attempts.filter((a) => a.studentClass === selectedClass && a.isPublished !== false);
  const myAttempts = classAttempts.filter((a) => a.studentId === currentStudent?.id);

  // Performance Analytics calculation
  const totalAttempted = myAttempts.length;
  const avgScore = totalAttempted > 0 ? Math.round(myAttempts.reduce((acc, a) => acc + a.percentage, 0) / totalAttempted) : 0;
  const highestScore = totalAttempted > 0 ? Math.max(...myAttempts.map((a) => a.score)) : 0;
  const bestRank = totalAttempted > 0 ? Math.min(...myAttempts.map((a) => a.rank || 99)) : 1;

  // Class Toppers
  const toppers = [...classAttempts].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div style={{ padding: '16px 0 32px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              background: '#092b63',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
            }}
          >
            EXAMINATION CENTER
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{selectedClass} Testing System</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#092b63', margin: '0 0 4px 0' }}>
          Tests, Results & Performance Analytics
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Take Sunday weekly mocks, chapter-wise evaluations, inspect scorecards, and track your academy percentile.
        </p>
      </div>

      {/* 4 Section Navigation Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
          background: '#ffffff',
          padding: '6px',
          borderRadius: '16px',
          border: '1.5px solid #e2e8f0',
          marginBottom: '22px',
          boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
        }}
      >
        {[
          { id: 'weekly', label: 'Weekly Tests', icon: ClipboardCheck, badge: weeklyTests.length },
          { id: 'mock', label: 'Mock Tests', icon: FileText, badge: mockTests.length },
          { id: 'results', label: 'Results', icon: Award, badge: myAttempts.length },
          { id: 'analytics', label: 'Analytics', icon: BarChart2 },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 6px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, #092b63, #1261c9)' : 'transparent',
                color: isActive ? '#ffffff' : '#475569',
                fontWeight: isActive ? 800 : 600,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={15} />
              <span className="hidden-xs">{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: isActive ? '#ffb703' : '#f1f5f9',
                    color: isActive ? '#092b63' : '#64748b',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: WEEKLY TESTS */}
      {activeSection === 'weekly' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
              📅 Sunday Weekly Test Series
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Curriculum Schedule 2026-27</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {weeklyTests.map((test) => {
              const attempt = classAttempts.find((a) => a.testId === test.id && a.studentId === currentStudent?.id);
              return (
                <div
                  key={test.id}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '18px',
                    boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          background: '#eff6ff',
                          color: '#1261c9',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        WEEKLY SERIES
                      </span>
                      {attempt && (
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>
                          ✓ Scored: {attempt.score}/{attempt.totalMarks}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#092b63', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                      {test.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>
                      {test.subject} • Scheduled: <b>{test.scheduledDate || 'Sunday'}</b>
                    </p>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '6px',
                        background: '#f8fafc',
                        padding: '10px',
                        borderRadius: '10px',
                        marginBottom: '16px',
                        fontSize: '11.5px',
                      }}
                    >
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '10px' }}>QUESTIONS</span>
                        <b>{test.questionsCount} MCQs</b>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '10px' }}>TIME LIMIT</span>
                        <b>⏱️ {test.durationMinutes} Mins</b>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '10px' }}>TOTAL MARKS</span>
                        <b>{test.totalMarks || 100} Marks</b>
                      </div>
                      <div>
                        <span style={{ color: '#64748b', display: 'block', fontSize: '10px' }}>EVALUATION</span>
                        <b>Instant Marking</b>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setTestToRun(test)}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: '10px',
                        background: attempt ? '#092b63' : '#1261c9',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '13px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{attempt ? '🔄 Re-Take Test' : '🚀 Start Test'}</span>
                    </button>
                    {attempt && (
                      <button
                        onClick={() => setMarksheetAttempt(attempt)}
                        style={{
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#334155',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Marksheet
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: MOCK TESTS */}
      {activeSection === 'mock' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
              🎯 Full Syllabus & Chapter Mocks
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Simulated CBSE / Entrance Format</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {mockTests.map((test) => {
              const attempt = classAttempts.find((a) => a.testId === test.id && a.studentId === currentStudent?.id);
              return (
                <div
                  key={test.id}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '18px',
                    boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          background: '#f0fdf4',
                          color: '#15803d',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {test.testType.replace('_', ' ')}
                      </span>
                      {attempt && (
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>
                          ✓ {attempt.score}/{attempt.totalMarks}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#092b63', margin: '0 0 6px 0' }}>
                      {test.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>
                      {test.subject} • {test.questionsCount} Questions • {test.durationMinutes} Minutes
                    </p>

                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', marginBottom: '14px', fontSize: '12px', color: '#334155' }}>
                      <span>🎯 Scoring: +4 for Correct, 0 for Unattempted</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setTestToRun(test)}
                      style={{
                        flex: 1,
                        padding: '11px',
                        borderRadius: '10px',
                        background: '#1261c9',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '13px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {attempt ? '🔄 Re-Attempt Mock' : '🚀 Start Mock Test'}
                    </button>
                    {attempt && (
                      <button
                        onClick={() => setMarksheetAttempt(attempt)}
                        style={{
                          padding: '11px 14px',
                          borderRadius: '10px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#334155',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Marksheet
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: RESULTS & SCORECARDS */}
      {activeSection === 'results' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
              🏆 Test Scorecards & Results
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Click any scorecard to inspect marksheet</span>
          </div>

          {myAttempts.length === 0 ? (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 20px', textAlign: 'center', color: '#64748b', marginBottom: '32px' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📝</div>
              <h3 style={{ fontSize: '16px', color: '#092b63', margin: '0 0 6px 0' }}>No test attempts yet</h3>
              <p style={{ fontSize: '13px', margin: 0 }}>Attempt a weekly or mock test from the tabs above to generate scorecards.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {myAttempts.map((attempt) => (
                <div
                  key={attempt.id}
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
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          background: '#eff6ff',
                          color: '#1261c9',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {attempt.subject}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{attempt.date}</span>
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#092b63', margin: '0 0 4px 0' }}>
                      {attempt.testTitle}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '10px' }}>
                      <span>Class Rank: <b style={{ color: '#1261c9' }}>#{attempt.rank || 1}</b></span>
                      <span>•</span>
                      <span>Accuracy: <b style={{ color: '#16a34a' }}>{attempt.percentage}%</b></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803d' }}>
                        {attempt.score} <span style={{ fontSize: '12px', color: '#64748b' }}>/ {attempt.totalMarks}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>Pass ✓</span>
                    </div>

                    <button
                      onClick={() => setMarksheetAttempt(attempt)}
                      style={{
                        background: 'linear-gradient(135deg, #092b63, #1261c9)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>📜</span> Marksheet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: PERFORMANCE ANALYTICS */}
      {activeSection === 'analytics' && (
        <div style={{ marginBottom: '32px' }}>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '22px' }}>
            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>TESTS TAKEN</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#092b63', margin: '4px 0' }}>{totalAttempted}</div>
              <small style={{ fontSize: '11px', color: '#16a34a' }}>Evaluated Mocks</small>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>AVG SCORE</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#1261c9', margin: '4px 0' }}>{avgScore}%</div>
              <small style={{ fontSize: '11px', color: '#1261c9' }}>Overall Accuracy</small>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>TOP SCORE</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#15803d', margin: '4px 0' }}>{highestScore}</div>
              <small style={{ fontSize: '11px', color: '#15803d' }}>Personal Best</small>
            </div>

            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>ACADEMY RANK</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#b45309', margin: '4px 0' }}>#{bestRank}</div>
              <small style={{ fontSize: '11px', color: '#b45309' }}>In {selectedClass}</small>
            </div>
          </div>

          {/* Leaderboard / Toppers Section */}
          <div
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
                🏅 Class {selectedClass} Merit List
              </h3>
              <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, background: '#dcfce7', padding: '2px 8px', borderRadius: '10px' }}>
                Top Scorers
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {toppers.map((top, idx) => (
                <div
                  key={top.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: idx === 0 ? '#fffbeb' : '#f8fafc',
                    border: idx === 0 ? '1px solid #fde68a' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: idx === 0 ? '#ffb703' : idx === 1 ? '#cbd5e1' : '#e2e8f0',
                        color: '#092b63',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '12px',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <b style={{ color: '#092b63' }}>{top.studentName}</b>
                      <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>({top.rollNo})</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <b style={{ color: '#15803d', fontSize: '14px' }}>{top.percentage}%</b>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>Score: {top.score}/{top.totalMarks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          background: '#092b63',
          color: '#ffffff',
          borderRadius: '18px',
          padding: '24px 20px',
          borderTop: '3px solid #ffb703',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: '#ffb703',
                color: '#092b63',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '12px',
              }}
            >
              PA
            </div>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>PARTH ACADEMY</span>
          </div>
          <span style={{ fontSize: '11px', color: '#93c5fd' }}>
            Near Priya School, Baran Road, Antah, Rajasthan
          </span>
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

      {/* Active Modals */}
      {testToRun && (
        <TestRunnerModal
          test={testToRun}
          onClose={() => setTestToRun(null)}
          onCompleted={() => {
            setTestToRun(null);
            setActiveSection('results');
          }}
        />
      )}

      {marksheetAttempt && (
        <MarksheetModal
          attempt={marksheetAttempt}
          onClose={() => setMarksheetAttempt(null)}
        />
      )}
    </div>
  );
};
