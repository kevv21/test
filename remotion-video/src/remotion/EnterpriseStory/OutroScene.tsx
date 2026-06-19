import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

const SERIF = 'Georgia, "Times New Roman", Times, serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const eio = Easing.bezier(0.16, 1, 0.3, 1);

const fadeIn = (f: number, s: number, d = 60) =>
  interpolate(f, [s, s + d], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// Deterministic star field
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: ((i * 193 + 47) % 1280),
  y: ((i * 251 + 83) % 720),
  r: ((i * 5 + 2) % 16) / 10 + 0.2,
  phase: (i * 53) % 100,
}));

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene: 270 frames total. Fade in first 40, fade out last 60.
  const sceneIn = fadeIn(frame, 0, 40);
  const sceneOut = interpolate(frame, [200, 270], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sceneOp = Math.min(sceneIn, sceneOut);

  const titleY = interpolate(frame, [15, 75], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });
  const titleOp = fadeIn(frame, 15, 60);
  const ruleOp = fadeIn(frame, 65, 45);
  const subOp = fadeIn(frame, 90, 50);
  const badgeOp = fadeIn(frame, 130, 50);

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(160deg, #03050E 0%, #060A18 60%, #030510 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: sceneOp,
      }}
    >
      {/* Stars */}
      <svg
        width="1280"
        height="720"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {STARS.map((s, i) => {
          const twinkle = Math.sin((frame + s.phase) * 0.07) * 0.3 + 0.7;
          return (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="white"
              opacity={0.6 * twinkle}
            />
          );
        })}
      </svg>

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 640,
          height: 640,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* "A tribute to" */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOp,
          textAlign: 'center',
          marginBottom: 0,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            letterSpacing: 8,
            textTransform: 'uppercase' as const,
            color: '#F59E0B',
            marginBottom: 14,
          }}
        >
          A tribute to
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 96,
            fontWeight: 800,
            color: '#F8FAFC',
            letterSpacing: -3,
            lineHeight: 1,
            textShadow: '0 0 60px rgba(245,158,11,0.18)',
          }}
        >
          Thank You
        </div>
      </div>

      {/* Gold rule */}
      <div
        style={{
          opacity: ruleOp,
          width: 320,
          height: 1.5,
          background:
            'linear-gradient(90deg, transparent, #F59E0B 30%, #FCD34D 50%, #F59E0B 70%, transparent)',
          margin: '24px auto',
        }}
      />

      {/* Subtitle lines */}
      <div style={{ opacity: subOp, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 24,
            color: '#CBD5E1',
            fontWeight: 300,
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          For 20 Years of Exceptional Service
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 14,
            color: '#334155',
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
          }}
        >
          Enterprise Administration Excellence
        </div>
      </div>

      {/* Award badge */}
      <div
        style={{
          opacity: badgeOp,
          marginTop: 44,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            border: '1.5px solid rgba(245,158,11,0.5)',
            background: 'rgba(245,158,11,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
          }}
        >
          ⭐
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 11,
            color: '#334155',
            letterSpacing: 5,
            textTransform: 'uppercase' as const,
          }}
        >
          2004 — 2024
        </div>
      </div>
    </AbsoluteFill>
  );
};
