import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

const SERIF = 'Georgia, "Times New Roman", Times, serif';
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const eio = Easing.bezier(0.16, 1, 0.3, 1);

const slideUp = (f: number, s: number, d = 60, dist = 40) =>
  interpolate(f, [s, s + d], [dist, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });

const fadeIn = (f: number, s: number, d = 60) =>
  interpolate(f, [s, s + d], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const CARDS = [
  { icon: '🤝', text: 'First handshake', delay: 110 },
  { icon: '📋', text: 'First assignment', delay: 160 },
  { icon: '⭐', text: 'First achievement', delay: 210 },
];

const DeskIllustration: React.FC = () => (
  <svg width="340" height="260" viewBox="0 0 340 260" fill="none">
    {/* Monitor stand */}
    <rect x="152" y="168" width="11" height="36" fill="#334155" />
    <rect x="128" y="202" width="59" height="7" fill="#334155" rx="3" />
    {/* Monitor bezel */}
    <rect x="58" y="48" width="209" height="128" fill="#1E3A8A" rx="7" />
    {/* Screen */}
    <rect x="63" y="53" width="199" height="118" fill="#0F172A" rx="4" />
    {/* Welcome screen content */}
    <rect x="73" y="66" width="110" height="9" fill="#3B82F6" rx="2" opacity={0.8} />
    <rect x="73" y="83" width="75" height="6" fill="#475569" rx="2" opacity={0.6} />
    <rect x="73" y="97" width="95" height="6" fill="#475569" rx="2" opacity={0.5} />
    <rect x="73" y="111" width="58" height="6" fill="#475569" rx="2" opacity={0.4} />
    <rect x="73" y="130" width="48" height="5" fill="#F59E0B" rx="1" opacity={0.9} />
    <text x="73" y="148" fontFamily="monospace" fontSize="11" fill="#22C55E" opacity={0.8}>
      Welcome aboard! 👋
    </text>
    {/* Keyboard */}
    <rect x="88" y="210" width="149" height="14" fill="#334155" rx="5" />
    {[0, 1, 2, 3].map((row) =>
      [0, 1, 2, 3, 4, 5].map((col) => (
        <rect
          key={`k-${row}-${col}`}
          x={93 + col * 23}
          y={212 + row * 0}
          width={18}
          height={9}
          fill="#1E293B"
          rx="2"
          opacity={0.7}
        />
      )),
    )}
    {/* Mouse */}
    <ellipse cx="262" cy="220" rx="14" ry="18" fill="#334155" />
    <line x1="262" y1="207" x2="262" y2="226" stroke="#1E293B" strokeWidth="1.5" />
    {/* Desk surface */}
    <rect x="8" y="228" width="324" height="14" fill="#1E293B" rx="4" />
    <rect x="28" y="240" width="284" height="18" fill="#0F172A" rx="0 0 4 4" />
    {/* Coffee mug */}
    <rect x="288" y="196" width="30" height="26" fill="#7C3AED" rx="4" />
    <path d="M 318 203 Q 328 207 318 214" stroke="#7C3AED" strokeWidth="4" fill="none" strokeLinecap="round" />
    <rect x="290" y="196" width="26" height="5" fill="#6D28D9" rx="2 2 0 0" />
    <path d="M 297 190 Q 295 184 297 179" stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5} />
    <path d="M 304 188 Q 302 182 304 177" stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
    {/* Notepad */}
    <rect x="14" y="195" width="60" height="36" fill="#FEF3C7" rx="3" />
    <rect x="14" y="200" width="60" height="4" fill="#FDE68A" rx="1" />
    <line x1="19" y1="211" x2="69" y2="211" stroke="#D97706" strokeWidth="1" opacity={0.5} />
    <line x1="19" y1="220" x2="69" y2="220" stroke="#D97706" strokeWidth="1" opacity={0.4} />
    <line x1="19" y1="229" x2="55" y2="229" stroke="#D97706" strokeWidth="1" opacity={0.3} />
    {/* Desk plant */}
    <rect x="12" y="198" width="22" height="22" fill="#374151" rx="4 4 6 6" />
    <ellipse cx="23" cy="196" rx="12" ry="18" fill="#15803D" />
    <ellipse cx="14" cy="188" rx="8" ry="14" fill="#166534" transform="rotate(-20 14 188)" />
    <ellipse cx="32" cy="189" rx="8" ry="13" fill="#166534" transform="rotate(15 32 189)" />
    {/* ID badge on desk */}
    <rect x="165" y="192" width="44" height="32" fill="#1D4ED8" rx="4" />
    <rect x="168" y="196" width="38" height="12" fill="#3B82F6" rx="2" />
    <circle cx="187" cy="213" r="5" fill="#BFDBFE" />
    <rect x="177" y="221" width="20" height="2" fill="#93C5FD" rx="1" />
  </svg>
);

export const BeginningScene: React.FC = () => {
  const frame = useCurrentFrame();

  const badgeOp = fadeIn(frame, 15, 40);
  const badgeY = slideUp(frame, 15, 40, 30);
  const titleOp = fadeIn(frame, 50, 55);
  const titleY = slideUp(frame, 50, 55);
  const paraOp = fadeIn(frame, 90, 50);
  const deskX = interpolate(frame, [25, 110], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: eio,
  });
  const deskOp = fadeIn(frame, 25, 85);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #060A18 0%, #0A1428 100%)',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* ── Left panel ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 48px 0 72px',
          gap: 20,
        }}
      >
        {/* Badge */}
        <div
          style={{
            transform: `translateY(${badgeY}px)`,
            opacity: badgeOp,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.35)',
              borderRadius: 100,
              padding: '5px 16px',
              fontFamily: SANS,
              fontSize: 11,
              color: '#F59E0B',
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#F59E0B',
                display: 'inline-block',
              }}
            />
            Chapter I
          </span>

          {/* Ghost year */}
          <div
            style={{
              fontFamily: SANS,
              fontSize: 110,
              fontWeight: 900,
              color: 'rgba(30,58,138,0.25)',
              lineHeight: 0.85,
              marginTop: 8,
              userSelect: 'none',
            }}
          >
            2004
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOp,
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 54,
              fontWeight: 700,
              color: '#F8FAFC',
              lineHeight: 1.15,
              margin: '0 0 16px',
            }}
          >
            The Journey
            <br />
            <span style={{ color: '#F59E0B' }}>Begins</span>
          </h2>
        </div>

        {/* Paragraph */}
        <p
          style={{
            fontFamily: SANS,
            fontSize: 15,
            color: '#94A3B8',
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 340,
            opacity: paraOp,
          }}
        >
          A new chapter opens. The enterprise welcomes a future leader — ready
          to shape the world of administration, one decision at a time.
        </p>

        {/* Story cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CARDS.map((card) => {
            const cardOp = fadeIn(frame, card.delay, 45);
            const cardY = slideUp(frame, card.delay, 45, 28);
            return (
              <div
                key={card.text}
                style={{
                  transform: `translateY(${cardY}px)`,
                  opacity: cardOp,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                  padding: '10px 16px',
                  width: 270,
                }}
              >
                <span style={{ fontSize: 19 }}>{card.icon}</span>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 14,
                    color: '#CBD5E1',
                    fontWeight: 500,
                  }}
                >
                  {card.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          background: 'rgba(255,255,255,0.07)',
          margin: '80px 0',
        }}
      />

      {/* ── Right panel — desk ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateX(${deskX}px)`,
          opacity: deskOp,
          gap: 16,
        }}
      >
        <DeskIllustration />
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            color: '#334155',
            letterSpacing: 4,
            textTransform: 'uppercase' as const,
          }}
        >
          Day 1 at the Enterprise
        </div>
      </div>
    </AbsoluteFill>
  );
};
