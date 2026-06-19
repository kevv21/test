import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

const SERIF = 'Georgia, "Times New Roman", Times, serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// Deterministic star field — stable across re-renders
const STARS = Array.from({ length: 110 }, (_, i) => ({
  x: ((i * 167 + 31) % 1280),
  y: ((i * 213 + 71) % 720),
  r: ((i * 7 + 3) % 20) / 10 + 0.3,
  phase: (i * 37) % 100,
}));

const eio = Easing.bezier(0.16, 1, 0.3, 1);

const slideUp = (
  frame: number,
  start: number,
  dur = 60,
  dist = 40,
): number =>
  interpolate(frame, [start, start + dur], [dist, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });

const fadeIn = (frame: number, start: number, dur = 60): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const buildingY = slideUp(frame, 0, 80, -180);
  const buildingOp = fadeIn(frame, 0, 80);
  const labelY = slideUp(frame, 60, 50);
  const labelOp = fadeIn(frame, 60, 50);
  const titleY = slideUp(frame, 90, 60);
  const titleOp = fadeIn(frame, 90, 60);
  const lineW = interpolate(frame, [160, 240], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });
  const yearOp = fadeIn(frame, 210, 50);

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(160deg, #03050E 0%, #060A18 50%, #030510 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Star field */}
      <svg
        width="1280"
        height="720"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {STARS.map((s, i) => {
          const twinkle = Math.sin((frame + s.phase) * 0.08) * 0.3 + 0.7;
          const appear = interpolate(
            frame,
            [s.phase % 40, (s.phase % 40) + 30],
            [0, 0.85],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          return (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="white"
              opacity={appear * twinkle}
            />
          );
        })}
      </svg>

      {/* Radial glow behind building */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: buildingOp,
        }}
      />

      {/* Building SVG */}
      <div
        style={{
          transform: `translateY(${buildingY}px)`,
          opacity: buildingOp,
          marginBottom: 24,
        }}
      >
        <svg width="150" height="182" viewBox="0 0 150 182" fill="none">
          <rect x="12" y="52" width="126" height="126" fill="#1E3A8A" rx="3" />
          <polygon points="0,52 75,8 150,52" fill="#2563EB" />
          <rect x="75" y="-4" width="2" height="16" fill="#F59E0B" />
          <polygon points="77,0 97,-8 77,-16" fill="#F59E0B" />
          {[18, 46, 74, 102].map((x) => (
            <rect key={`w1-${x}`} x={x} y={70} width={22} height={15} fill="#93C5FD" rx="2" opacity={0.85} />
          ))}
          {[18, 46, 74, 102].map((x) => (
            <rect key={`w2-${x}`} x={x} y={100} width={22} height={15} fill="#93C5FD" rx="2" opacity={0.7} />
          ))}
          {[18, 46, 74, 102].map((x) => (
            <rect key={`w3-${x}`} x={x} y={130} width={22} height={15} fill="#93C5FD" rx="2" opacity={0.55} />
          ))}
          <rect x="56" y="144" width="38" height="34" fill="#1E40AF" rx="2" />
          <circle cx="89" cy="162" r="2.5" fill="#F59E0B" />
          <rect x="30" y="144" width="9" height="34" fill="#1E40AF" />
          <rect x="111" y="144" width="9" height="34" fill="#1E40AF" />
          <rect x="4" y="175" width="142" height="5" fill="#1D4ED8" rx="1" />
          <rect x="0" y="179" width="150" height="3" fill="#172554" rx="0" />
        </svg>
      </div>

      {/* Label */}
      <div
        style={{
          transform: `translateY(${labelY}px)`,
          opacity: labelOp,
          fontFamily: SANS,
          fontSize: 12,
          letterSpacing: 7,
          textTransform: 'uppercase' as const,
          color: '#F59E0B',
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        Enterprise Administration
      </div>

      {/* Main title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOp,
          fontFamily: SERIF,
          fontSize: 76,
          fontWeight: 800,
          color: '#F8FAFC',
          letterSpacing: -2,
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: 30,
        }}
      >
        A Story of{' '}
        <span style={{ color: '#F59E0B' }}>Dedication</span>
      </div>

      {/* Gold rule */}
      <div
        style={{
          width: lineW,
          height: 1.5,
          background:
            'linear-gradient(90deg, transparent, #F59E0B 30%, #FCD34D 50%, #F59E0B 70%, transparent)',
          marginBottom: 22,
        }}
      />

      {/* Year range */}
      <div
        style={{
          opacity: yearOp,
          fontFamily: SANS,
          fontSize: 18,
          color: '#64748B',
          letterSpacing: 10,
          fontWeight: 300,
        }}
      >
        2004 &nbsp;—&nbsp; 2024
      </div>
    </AbsoluteFill>
  );
};
