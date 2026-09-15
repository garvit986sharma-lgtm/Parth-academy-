import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Shield,
  Download,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudentFeeRecord, FeePayment } from '../../types';
import { INITIAL_ATTENDANCE_RECORD } from '../../data/initialData';
import { FeeReceiptModal } from '../FeeReceiptModal';

interface StudentProfileProps {
  onOpenAdminLogin: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ onOpenAdminLogin }) => {
  const {
    currentStudent,
    logoutStudent,
    setIsAuthModalOpen,
    selectedClass,
    setSelectedClass,
    fees,
    addFeePayment,
  } = useApp();

  const [selectedReceipt, setSelectedReceipt] = useState<FeePayment | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(5000);
  const [payMethod, setPayMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  // Student Fee Record
  const studentFee: StudentFeeRecord | undefined =
    fees.find((f) => f.studentId === currentStudent?.id) ||
    fees.find((f) => f.studentClass === selectedClass) ||
    fees[0];

  const attendance = INITIAL_ATTENDANCE_RECORD;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentFee) return;
    setIsProcessing(true);
    setTimeout(() => {
      const payment = addFeePayment(studentFee.studentId, {
        amount: Number(payAmount),
        method: payMethod,
        remarks: 'Online Tuition Installment',
      });
      setIsProcessing(false);
      setIsPayModalOpen(false);
      if (payment) {
        setSelectedReceipt(payment);
      }
    }, 600);
  };

  return (
    <div style={{ padding: '16px 0 32px 0' }}>
      {/* 1. STUDENT DETAILS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        id="profile-header-card"
        style={{
          background: 'linear-gradient(135deg, #092b63 0%, #1261c9 100%)',
          borderRadius: '20px',
          padding: '24px 20px',
          color: '#ffffff',
          marginBottom: '22px',
          boxShadow: '0 8px 24px rgba(9, 43, 99, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Avatar Circle */}
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '20px',
              background: '#ffb703',
              color: '#092b63',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              flexShrink: 0,
            }}
          >
            {currentStudent ? currentStudent.avatar || '👨‍🎓' : '👤'}
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  background: 'rgba(255, 183, 3, 0.2)',
                  border: '1px solid rgba(255, 183, 3, 0.4)',
                  color: '#ffb703',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
              >
                {selectedClass} • SUPER-40
              </span>
              <span style={{ fontSize: '11px', color: '#86efac', fontWeight: 700 }}>
                ● Active Student
              </span>
            </div>

            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>
              {currentStudent ? currentStudent.name : 'Candidate / Guest'}
            </h1>

            <div style={{ fontSize: '13px', color: '#cbd5e1', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span>Roll No: <b style={{ color: '#ffffff' }}>{currentStudent ? currentStudent.rollNo : 'Unassigned'}</b></span>
              <span>•</span>
              <span>Joined: <b>{currentStudent ? currentStudent.admissionDate : '2026 Batch'}</b></span>
            </div>
          </div>

          {/* Switch or Login Button */}
          <div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {currentStudent ? 'Switch Account' : 'Sign In / Register'}
            </button>
          </div>
        </div>

        {/* Detailed Information Grid */}
        {currentStudent && (
          <div
            style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              fontSize: '12px',
            }}
          >
            <div>
              <span style={{ color: '#93c5fd', display: 'block' }}>Email Address</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{currentStudent.email}</span>
            </div>
            <div>
              <span style={{ color: '#93c5fd', display: 'block' }}>Student Mobile</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{currentStudent.phone}</span>
            </div>
            <div>
              <span style={{ color: '#93c5fd', display: 'block' }}>Parent / Guardian</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{currentStudent.parentName || 'Mr. Rakesh Sharma'}</span>
            </div>
            <div>
              <span style={{ color: '#93c5fd', display: 'block' }}>Parent Helpline Phone</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{currentStudent.parentPhone || '+91 97846 64518'}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* 2. ATTENDANCE SECTION */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
              📊 Academic Attendance Record
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Verified biometric presence record</span>
          </div>
          <span
            style={{
              background: '#dcfce7',
              color: '#15803d',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '20px',
              border: '1px solid #bbf7d0',
            }}
          >
            {attendance.overallPercentage}% Attendance
          </span>
        </div>

        <div
          id="profile-attendance-card"
          style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
          }}
        >
          {/* Progress bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, color: '#092b63' }}>Overall Academic Presence</span>
              <b style={{ color: '#16a34a' }}>{attendance.overallPercentage}% (113 / 120 Sessions)</b>
            </div>
            <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${attendance.overallPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #1261c9, #16a34a)',
                  borderRadius: '5px',
                }}
              />
            </div>
          </div>

          {/* Stats 4-Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
            <div style={{ background: '#f8fafc', padding: '10px 6px', borderRadius: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#092b63' }}>120</div>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Total Days</span>
            </div>
            <div style={{ background: '#f0fdf4', padding: '10px 6px', borderRadius: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#16a34a' }}>113</div>
              <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: 600 }}>Present</span>
            </div>
            <div style={{ background: '#fef2f2', padding: '10px 6px', borderRadius: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#dc2626' }}>5</div>
              <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 600 }}>Absent</span>
            </div>
            <div style={{ background: '#eff6ff', padding: '10px 6px', borderRadius: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#1261c9' }}>2</div>
              <span style={{ fontSize: '10px', color: '#1261c9', fontWeight: 600 }}>Leave</span>
            </div>
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: '#334155',
            }}
          >
            <CheckCircle2 size={16} color="#16a34a" />
            <span>
              <b>Board Exam Eligibility Status:</b> Eligible for CBSE Admit Card (Requirement: &gt;75%).
            </span>
          </div>
        </div>
      </div>

      {/* 3. FEE STATUS SECTION */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
              💳 Tuition Fee Status & Receipts
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Annual coaching installment ledger</span>
          </div>
          <span
            style={{
              background: studentFee?.status === 'paid' ? '#dcfce7' : '#fee2e2',
              color: studentFee?.status === 'paid' ? '#15803d' : '#b91c1c',
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '20px',
              border: studentFee?.status === 'paid' ? '1px solid #86efac' : '1px solid #fca5a5',
            }}
          >
            {studentFee?.status === 'paid' ? '✓ FULLY CLEARED' : 'INSTALLMENT DUE'}
          </span>
        </div>

        <div
          id="profile-fee-card"
          style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>TOTAL COURSE FEE</span>
              <b style={{ fontSize: '16px', color: '#092b63' }}>₹{(studentFee?.totalFee || 35000).toLocaleString()}</b>
            </div>
            <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', color: '#16a34a', display: 'block' }}>AMOUNT PAID</span>
              <b style={{ fontSize: '16px', color: '#15803d' }}>₹{(studentFee?.paidAmount || 35000).toLocaleString()}</b>
            </div>
            <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', color: '#dc2626', display: 'block' }}>BALANCE DUE</span>
              <b style={{ fontSize: '16px', color: studentFee?.dueAmount ? '#dc2626' : '#16a34a' }}>
                ₹{(studentFee?.dueAmount || 0).toLocaleString()}
              </b>
            </div>
          </div>

          {/* Pay Button if due */}
          {studentFee && studentFee.dueAmount > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <button
                onClick={() => setIsPayModalOpen(true)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #092b63, #1261c9)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>💳</span> Pay Balance (₹{studentFee.dueAmount.toLocaleString()}) Online
              </button>
            </div>
          )}

          {/* Payment Receipts History */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#092b63', marginBottom: '8px' }}>
              Issued Payment Receipts
            </div>

            {studentFee?.payments && studentFee.payments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {studentFee.payments.map((pmt) => (
                  <div
                    key={pmt.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      fontSize: '12px',
                    }}
                  >
                    <div>
                      <b style={{ color: '#092b63' }}>Receipt #{pmt.receiptNo}</b>
                      <div style={{ color: '#64748b', fontSize: '11px' }}>
                        {pmt.date} • {pmt.method} • {pmt.remarks || 'Tuition Fee'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 800, color: '#15803d', fontSize: '14px' }}>
                        ₹{pmt.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => setSelectedReceipt(pmt)}
                        style={{
                          background: '#eff6ff',
                          color: '#1261c9',
                          border: '1px solid #bfdbfe',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Download size={12} /> Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>No payment receipts on file.</p>
            )}
          </div>
        </div>
      </div>

      {/* 4. ACADEMIC SETTINGS & CLASS SELECTION */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
            ⚙️ Academic Class & Course
          </h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Curriculum toggle</span>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <button
            onClick={() => setSelectedClass('Class 12th')}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              border: selectedClass === 'Class 12th' ? '2px solid #1261c9' : '1px solid #cbd5e1',
              background: selectedClass === 'Class 12th' ? '#eff6ff' : '#f8fafc',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 800, color: selectedClass === 'Class 12th' ? '#1261c9' : '#334155' }}>
              Class 12th
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Physics, Chemistry, Maths
            </div>
          </button>

          <button
            onClick={() => setSelectedClass('Class 10th')}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '12px',
              border: selectedClass === 'Class 10th' ? '2px solid #1261c9' : '1px solid #cbd5e1',
              background: selectedClass === 'Class 10th' ? '#eff6ff' : '#f8fafc',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 800, color: selectedClass === 'Class 10th' ? '#1261c9' : '#334155' }}>
              Class 10th
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Science, Mathematics, Social
            </div>
          </button>
        </div>
      </div>

      {/* 5. FACULTY & ADMIN ACCESS */}
      <div style={{ marginBottom: '22px' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#fffbeb',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#092b63', margin: '0 0 2px 0' }}>
                Director & Faculty Administration
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Restricted portal for faculty, marks entry & student roster.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAdminLogin}
            style={{
              background: '#ffb703',
              color: '#092b63',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Admin Login 🛡️
          </button>
        </div>
      </div>

      {/* 6. LOGOUT BUTTON */}
      {currentStudent && (
        <div style={{ marginBottom: '32px' }}>
          <button
            id="profile-logout-btn"
            onClick={() => logoutStudent()}
            style={{
              width: '100%',
              background: '#fef2f2',
              color: '#dc2626',
              border: '1.5px solid #fecaca',
              padding: '14px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.15s ease',
            }}
          >
            <LogOut size={18} />
            <span>Sign Out of Student Account</span>
          </button>
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

      {/* Online Pay Modal */}
      {isPayModalOpen && (
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
          onClick={() => setIsPayModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '24px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#092b63', margin: '0 0 8px 0' }}>
              Pay Tuition Fee Online
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
              Instant receipt generation for {studentFee?.studentName} ({studentFee?.rollNo}).
            </p>

            <form onSubmit={handlePay}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Installment Amount (₹)
                </label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  max={studentFee?.dueAmount}
                  min={500}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '15px',
                    fontWeight: 700,
                    boxSizing: 'border-box',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Select Payment Gateway
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {(['UPI', 'Card', 'NetBanking'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPayMethod(method)}
                      style={{
                        padding: '10px 6px',
                        borderRadius: '8px',
                        border: payMethod === method ? '2px solid #1261c9' : '1px solid #cbd5e1',
                        background: payMethod === method ? '#eff6ff' : '#ffffff',
                        color: payMethod === method ? '#1261c9' : '#475569',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsPayModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #092b63, #1261c9)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {isProcessing ? 'Verifying...' : `Pay ₹${payAmount.toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fee Receipt Modal */}
      {selectedReceipt && (
        <FeeReceiptModal
          payment={selectedReceipt}
          feeRecord={studentFee || fees[0]}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};
