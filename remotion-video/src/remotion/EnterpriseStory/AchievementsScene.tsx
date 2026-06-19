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

const TrophySVG: React.FC<{ scale: number; opacity: number }> = ({
  scale,
  opacity,
}) => (
  <svg
    width={130 * scale}
    height={150 * scale}
    viewBox="0 0 130 150"
    fill="none"
    style={{ opacity }}
  >
    {/* Cup */}
    <path d="M 28 18 Q 22 72 65 88 Q 108 72 102 18 Z" fill="#F59E0B" />
    {/* Shine */}
    <ellipse
      cx="44"
      cy="42"
      rx="6"
      ry="12"
      fill="white"
      opacity={0.18}
      transform="rotate(-25 44 42)"
    />
    {/* Star */}
    <polygon
      points="65,34 68,44 78,44 70,50 73,60 65,54 57,60 60,50 52,44 62,44"
      fill="#FEF3C7"
      opacity={0.9}
    />
    {/* Left handle */}
    <path
      d="M 28 18 Q 4 24 6 55 Q 8 76 28 73"
      stroke="#D97706"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
    {/* Right handle */}
    <path
      d="M 102 18 Q 126 24 124 55 Q 122 76 102 73"
      stroke="#D97706"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
    {/* Stem */}
    <rect x="57" y="86" width="16" height="28" fill="#D97706" />
    {/* Base */}
    <rect x="38" y="112" width="54" height="10" fill="#D97706" rx="3" />
    <rect x="28" y="120" width="74" height="8" fill="#B45309" rx="3" />
    {/* Engraving */}
    <rect x="42" y="125" width="46" height="2" fill="#92400E" rx="1" opacity={0.6} />
  </svg>
);

const STATS = [
  {
    value: '20',
    suffix: '',
    label: 'Years of Service',
    color: '#F59E0B',
    delay: 60,
  },
  {
    value: '500',
    suffix: '+',
    label: 'Colleagues Impacted',
    color: '#3B82F6',
    delay: 120,
  },
  {
    value: '∞',
    suffix: '',
    label: 'Memories Created',
    color: '#A78BFA',
    delay: 180,
  },
];

// Animated counter for numeric values
const AnimatedValue: React.FC<{
  value: string;
  suffix: string;
  frame: number;
  delay: number;
  color: string;
}> = ({ value, suffix, frame, delay, color }) => {
  const isNumeric = !isNaN(Number(value));
  const progress = interpolate(frame, [delay, delay + 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });
  const display = isNumeric
    ? Math.round(Number(value) * progress)
    : value;

  return (
    <span style={{ color }}>
      {display}
      {suffix}
    </span>
  );
};

export const AchievementsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOp = fadeIn(frame, 10, 55);
  const titleY = interpolate(frame, [10, 65], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });

  const trophyScale = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const trophyOp = fadeIn(frame, 30, 60);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #050810 0%, #080D20 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        padding: '0 60px',
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOp,
          textAlign: 'center',
          marginBottom: 36,
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
          Milestones of Excellence
        </div>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 50,
            fontWeight: 700,
            color: '#F8FAFC',
            margin: 0,
            letterSpacing: -1,
          }}
        >
          A Career of{' '}
          <span style={{ color: '#F59E0B' }}>Achievement</span>
        </h2>
      </div>

      {/* Trophy */}
      <div style={{ marginBottom: 32 }}>
        <TrophySVG scale={trophyScale} opacity={trophyOp} />
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
        }}
      >
        {STATS.map((s) => {
          const cardOp = fadeIn(frame, s.delay, 50);
          const cardY = interpolate(frame, [s.delay, s.delay + 50], [40, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: eio,
          });
          return (
            <div
              key={s.label}
              style={{
                transform: `translateY(${cardY}px)`,
                opacity: cardOp,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${s.color}28`,
                borderRadius: 18,
                padding: '28px 36px',
                textAlign: 'center',
                minWidth: 220,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '20%',
                  right: '20%',
                  height: 2,
                  background: s.color,
                  borderRadius: '0 0 4px 4px',
                }}
              />
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 60,
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <AnimatedValue
                  value={s.value}
                  suffix={s.suffix}
                  frame={frame}
                  delay={s.delay}
                  color={s.color}
                />
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 13,
                  color: '#64748B',
                  textTransform: 'uppercase' as const,
                  letterSpacing: 2,
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
