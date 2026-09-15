import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlaySquare, Clock, CheckCircle2, Play, Sparkles, Filter, Video } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VideoLecture } from '../../types';
import { VideoPlayerModal } from '../VideoPlayerModal';

export const StudentVideos: React.FC = () => {
  const { videos, selectedClass, toggleVideoWatched } = useApp();
  const [activeSubject, setActiveSubject] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<VideoLecture | null>(null);

  const classVideos = videos.filter((v) => v.grade === selectedClass);
  const subjects = ['All', ...Array.from(new Set(classVideos.map((v) => v.subject)))];

  const filtered = classVideos.filter((v) => {
    return activeSubject === 'All' || v.subject === activeSubject;
  });

  // Continue Watching candidate videos (watched or first 2 class videos)
  const continueWatchingVideos = classVideos.slice(0, 2);

  return (
    <div style={{ padding: '16px 0 32px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              background: '#dc2626',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
            }}
          >
            RECORDED CLASSES
          </span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{selectedClass} Video Lectures</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#092b63', margin: '0 0 4px 0' }}>
          Video Lectures & Concept Classes
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Master key derivations, numerical problem-solving techniques, and board questions with high-yield video lectures.
        </p>
      </div>

      {/* 1. CONTINUE WATCHING SECTION */}
      {continueWatchingVideos.length > 0 && (
        <div style={{ marginBottom: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>▶️</span>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
                Continue Watching
              </h2>
            </div>
            <span style={{ fontSize: '11px', color: '#1261c9', fontWeight: 700 }}>In-Progress Topics</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {continueWatchingVideos.map((vid, idx) => {
              const progressPct = idx === 0 ? 68 : 42;
              return (
                <div
                  key={`continue-${vid.id}`}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(9, 43, 99, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    onClick={() => setSelectedVideo(vid)}
                    style={{
                      position: 'relative',
                      paddingBottom: '50%',
                      background: '#092b63',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`}
                      alt={vid.title}
                      referrerPolicy="no-referrer"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(9,43,99,0.85) 0%, transparent 60%)',
                      }}
                    />
                    {/* Floating Play Button */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: '#ffb703',
                        color: '#092b63',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      ▶
                    </div>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.75)',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {vid.duration}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: '4px', background: '#e2e8f0', width: '100%' }}>
                    <div
                      style={{
                        width: `${progressPct}%`,
                        height: '100%',
                        background: '#ffb703',
                      }}
                    />
                  </div>

                  <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                        <span style={{ color: '#1261c9', fontWeight: 700 }}>{vid.subject}</span>
                        <span style={{ color: '#64748b' }}>{progressPct}% completed</span>
                      </div>
                      <h3
                        onClick={() => setSelectedVideo(vid)}
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#092b63',
                          margin: '0 0 4px 0',
                          lineHeight: 1.3,
                          cursor: 'pointer',
                        }}
                      >
                        {vid.title}
                      </h3>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Faculty: <b>{vid.instructor}</b>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedVideo(vid)}
                      style={{
                        marginTop: '10px',
                        width: '100%',
                        background: '#eff6ff',
                        color: '#1261c9',
                        border: '1px solid #bfdbfe',
                        padding: '6px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>▶</span> Resume Lecture
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. SUBJECT CATEGORIES */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 2px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#092b63', margin: 0 }}>
            📚 Browse by Subject
          </h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{filtered.length} Lectures</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
          {subjects.map((sub) => {
            const isActive = activeSubject === sub;
            const count = sub === 'All' ? classVideos.length : classVideos.filter((v) => v.subject === sub).length;

            return (
              <button
                key={sub}
                onClick={() => setActiveSubject(sub)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '12px',
                  border: isActive ? '1.5px solid #1261c9' : '1px solid #cbd5e1',
                  background: isActive ? 'linear-gradient(135deg, #092b63, #1261c9)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#334155',
                  fontSize: '12px',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 10px rgba(9, 43, 99, 0.15)' : 'none',
                }}
              >
                <span>{sub}</span>
                <span
                  style={{
                    background: isActive ? '#ffb703' : '#f1f5f9',
                    color: isActive ? '#092b63' : '#64748b',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '10px',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. VIDEO CARDS WITH THUMBNAILS */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎬</div>
          <h3 style={{ fontSize: '16px', color: '#092b63', margin: '0 0 6px 0' }}>No video lectures available in this category</h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Check back later as new faculty classes are uploaded regularly.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px', marginBottom: '32px' }}>
          {filtered.map((vid) => (
            <div
              key={vid.id}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(9, 43, 99, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Video thumbnail with play trigger */}
                <div
                  onClick={() => setSelectedVideo(vid)}
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    background: '#092b63',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Play button overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(220, 38, 38, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '18px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    }}
                  >
                    ▶
                  </div>
                  {/* Duration badge */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.8)',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    ⏱️ {vid.duration}
                  </span>
                  {/* Watched tag */}
                  {vid.isWatched && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: '#16a34a',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      ✓ COMPLETED
                    </span>
                  )}
                </div>

                {/* Card details */}
                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: '#1261c9',
                        background: '#eff6ff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {vid.subject}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{vid.uploadDate}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedVideo(vid)}
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#092b63',
                      margin: '0 0 6px 0',
                      cursor: 'pointer',
                      lineHeight: 1.35,
                    }}
                  >
                    {vid.title}
                  </h3>

                  <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                    {vid.description}
                  </p>

                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Faculty: <b>{vid.instructor}</b>
                  </div>
                </div>
              </div>

              <div style={{ padding: '12px 14px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedVideo(vid)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#1261c9',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <span>▶</span> Play Video
                </button>
                <button
                  onClick={() => toggleVideoWatched(vid.id)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: vid.isWatched ? '#dcfce7' : '#ffffff',
                    color: vid.isWatched ? '#15803d' : '#475569',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  title={vid.isWatched ? 'Mark as Unwatched' : 'Mark as Watched'}
                >
                  {vid.isWatched ? '✓' : 'Mark'}
                </button>
              </div>
            </div>
          ))}
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

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};
