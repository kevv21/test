import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

const SERIF = 'Georgia, "Times New Roman", Times, serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// Deterministic confetti pieces
const CONFETTI_COLORS = [
  '#F59E0B', '#3B82F6', '#EC4899', '#10B981',
  '#F87171', '#A78BFA', '#FCD34D', '#34D399',
];
const CONFETTI = Array.from({ length: 160 }, (_, i) => ({
  x: ((i * 167 + 31) % 1280),
  startY: -30 - ((i * 113) % 180),
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  w: 5 + (i * 3) % 8,
  h: 10 + (i * 5) % 12,
  rot: (i * 43) % 360,
  speed: 1.2 + ((i * 70) % 100) / 40,
  wobble: (i * 17) % 80,
}));

// Firework burst points
const BURSTS = [
  { x: 200,  y: 140, delay:  5, color: '#F59E0B' },
  { x: 1080, y: 110, delay: 22, color: '#3B82F6' },
  { x: 140,  y: 520, delay: 38, color: '#EC4899' },
  { x: 1100, y: 460, delay: 14, color: '#A78BFA' },
  { x: 640,  y:  90, delay: 28, color: '#FCD34D' },
  { x: 320,  y: 600, delay: 50, color: '#10B981' },
  { x: 950,  y: 580, delay: 45, color: '#F87171' },
];

const fadeIn = (f: number, s: number, d = 60) =>
  interpolate(f, [s, s + d], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const CelebrationScene: React.FC = () => {
  const frame = useCurrentFrame();

  const numberScale = interpolate(frame, [10, 80], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const numberOp = fadeIn(frame, 10, 60);
  const yearsOp = fadeIn(frame, 60, 50);
  const subtitleOp = fadeIn(frame, 100, 50);
  const ringPulse = Math.sin(frame * 0.08) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse at center, #0F172A 0%, #050810 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Confetti */}
      <svg
        width="1280"
        height="720"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {CONFETTI.map((c, i) => {
          const progress = interpolate(
            frame,
            [c.wobble / 2, c.wobble / 2 + 200],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          const y = c.startY + progress * 800;
          const wx = Math.sin((frame + c.wobble) * 0.05) * 22;
          const rot = c.rot + frame * c.speed * 2;
          const op = interpolate(progress, [0.75, 1], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <rect
              key={i}
              x={c.x + wx - c.w / 2}
              y={y}
              width={c.w}
              height={c.h}
              fill={c.color}
              rx="1"
              opacity={op}
              transform={`rotate(${rot}, ${c.x + wx}, ${y + c.h / 2})`}
            />
          );
        })}

        {/* Firework bursts */}
        {BURSTS.map((b, bi) => {
          const progress = interpolate(
            frame,
            [b.delay, b.delay + 45],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.quad),
            },
          );
          const op = interpolate(
            frame,
            [b.delay, b.delay + 15, b.delay + 45, b.delay + 70],
            [0, 1, 0.6, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          );
          return Array.from({ length: 12 }, (_, j) => {
            const angle = (j / 12) * Math.PI * 2;
            const len = 70 * progress;
            return (
              <line
                key={`${bi}-${j}`}
                x1={b.x}
                y1={b.y}
                x2={b.x + Math.cos(angle) * len}
                y2={b.y + Math.sin(angle) * len}
                stroke={b.color}
                strokeWidth={2.5 * (1 - progress * 0.6)}
                opacity={op}
                strokeLinecap="round"
              />
            );
          });
        })}
      </svg>

      {/* Pulsing ring */}
      <div
        style={{
          position: 'absolute',
          width: 560 * ringPulse,
          height: 560 * ringPulse,
          borderRadius: '50%',
          border: '1px solid rgba(245,158,11,0.12)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 420 * (2 - ringPulse),
          height: 420 * (2 - ringPulse),
          borderRadius: '50%',
          border: '1px solid rgba(245,158,11,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* "20" */}
      <div
        style={{
          transform: `scale(${numberScale})`,
          opacity: numberOp,
          fontFamily: SERIF,
          fontSize: 240,
          fontWeight: 900,
          lineHeight: 0.85,
          color: '#F59E0B',
          textShadow: '0 0 80px rgba(245,158,11,0.5), 0 0 160px rgba(245,158,11,0.25)',
          letterSpacing: -8,
        }}
      >
        20
      </div>

      {/* YEARS */}
      <div
        style={{
          opacity: yearsOp,
          fontFamily: SANS,
          fontSize: 56,
          fontWeight: 800,
          color: '#F8FAFC',
          letterSpacing: 20,
          textTransform: 'uppercase' as const,
          marginTop: -16,
        }}
      >
        YEARS
      </div>

      {/* Gold rule */}
      <div
        style={{
          opacity: subtitleOp,
          width: 280,
          height: 1.5,
          background:
            'linear-gradient(90deg, transparent, #F59E0B, transparent)',
          margin: '18px auto',
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOp,
          fontFamily: SANS,
          fontSize: 16,
          color: '#64748B',
          letterSpacing: 6,
          textTransform: 'uppercase' as const,
        }}
      >
        of Excellence
      </div>
    </AbsoluteFill>
  );
};
