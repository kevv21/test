import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

const SERIF = 'Georgia, "Times New Roman", Times, serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const eio = Easing.bezier(0.16, 1, 0.3, 1);
const pop = Easing.bezier(0.34, 1.56, 0.64, 1);

const fadeIn = (f: number, s: number, d = 60) =>
  interpolate(f, [s, s + d], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const MILESTONES = [
  { year: '2004', role: 'Associate',    desc: 'First steps',           above: true  },
  { year: '2008', role: 'Specialist',   desc: 'Growing expertise',     above: false },
  { year: '2012', role: 'Manager',      desc: 'Leading teams',         above: true  },
  { year: '2016', role: 'Director',     desc: 'Strategic vision',      above: false },
  { year: '2020', role: 'VP',           desc: 'Enterprise-wide impact',above: true  },
  { year: '2024', role: '20 Years ✦',  desc: 'Legacy secured',        above: false },
];

const TIMELINE_W = 1100;

export const JourneyScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [10, 70], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });
  const titleOp = fadeIn(frame, 10, 60);

  const lineProgress = interpolate(frame, [55, 290], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #070B1A 0%, #0B1130 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
      }}
    >
      {/* Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOp,
          textAlign: 'center',
          marginBottom: 48,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
            color: '#F59E0B',
            marginBottom: 10,
          }}
        >
          The Road Traveled
        </div>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 54,
            fontWeight: 700,
            color: '#F8FAFC',
            margin: 0,
            letterSpacing: -1,
          }}
        >
          20 Years of{' '}
          <span style={{ color: '#F59E0B' }}>Growth</span>
        </h2>
      </div>

      {/* Timeline container */}
      <div style={{ position: 'relative', width: TIMELINE_W, height: 260 }}>
        {/* Track */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: 0,
            right: 0,
            height: 2,
            background: '#1E293B',
            borderRadius: 1,
          }}
        />

        {/* Animated progress */}
        <div
          style={{
            position: 'absolute',
            top: 129,
            left: 0,
            width: lineProgress * TIMELINE_W,
            height: 4,
            background:
              'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 50%, #F59E0B 100%)',
            borderRadius: 2,
            boxShadow: '0 0 10px rgba(245,158,11,0.4)',
          }}
        />

        {/* Milestones */}
        {MILESTONES.map((m, i) => {
          const xPos = (i / (MILESTONES.length - 1)) * TIMELINE_W;
          const isLast = i === MILESTONES.length - 1;
          const dotDelay = 55 + i * 35;
          const dotScale = interpolate(frame, [dotDelay, dotDelay + 40], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: pop,
          });
          const textOp = fadeIn(frame, dotDelay + 20, 50);

          return (
            <div
              key={m.year}
              style={{
                position: 'absolute',
                left: xPos,
                top: 130,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'translate(-50%, -50%)',
                  width: (isLast ? 22 : 14) * dotScale,
                  height: (isLast ? 22 : 14) * dotScale,
                  borderRadius: '50%',
                  background: isLast ? '#F59E0B' : '#3B82F6',
                  boxShadow: isLast
                    ? `0 0 ${18 * dotScale}px rgba(245,158,11,0.7)`
                    : `0 0 ${10 * dotScale}px rgba(59,130,246,0.5)`,
                }}
              />

              {/* Label */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  transform: 'translateX(-50%)',
                  ...(m.above ? { bottom: 18 } : { top: 18 }),
                  opacity: textOp,
                  textAlign: 'center',
                  width: 130,
                }}
              >
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 20,
                    fontWeight: 700,
                    color: isLast ? '#F59E0B' : '#F8FAFC',
                    marginBottom: 2,
                    lineHeight: 1,
                  }}
                >
                  {m.year}
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 12,
                    fontWeight: 700,
                    color: isLast ? '#FCD34D' : '#60A5FA',
                    marginBottom: 4,
                    textTransform: 'uppercase' as const,
                    letterSpacing: 1,
                  }}
                >
                  {m.role}
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    color: '#475569',
                    lineHeight: 1.4,
                  }}
                >
                  {m.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
