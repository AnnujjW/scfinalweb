import React, { useState, useEffect, useRef } from 'react';

interface StudentHeroAnimationProps {
  lang?: string;
}

export const StudentHeroAnimation: React.FC<StudentHeroAnimationProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Lamp state: Click to toggle on/off
  const [isLampOn, setIsLampOn] = useState(true);

  // Mouse tracking for 360-degree head movement
  const [lookOffset, setLookOffset] = useState({
    headRot: 0,
    headX: 0,
    headY: 0,
    pupilX: 0,
    pupilY: 0,
    faceAngle: 0
  });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Center of the student's head inside the 500x400 viewBox
      // Head base center is around x=250 (50%), y=190 (47.5%)
      const headCenterX = rect.left + rect.width * 0.5;
      const headCenterY = rect.top + rect.height * 0.475;

      const dx = e.clientX - headCenterX;
      const dy = e.clientY - headCenterY;
      const distance = Math.hypot(dx, dy);
      const angleRad = Math.atan2(dy, dx);
      const angleDeg = (angleRad * 180) / Math.PI;

      // Distance dampening factor (reaches 1 at ~280px away)
      const factor = Math.min(Math.max(distance / 280, 0.1), 1);

      // Smooth translation in the direction of the cursor (360 degrees)
      const maxHeadShift = 10;
      const headX = Math.cos(angleRad) * maxHeadShift * factor;
      const headY = Math.sin(angleRad) * maxHeadShift * factor;

      // Natural rotational tilt based on cursor angle
      // When cursor is top-left, tilt up-left; when bottom-right, tilt down-right
      let headRot = 0;
      if (angleDeg >= -90 && angleDeg <= 90) {
        // Cursor on right side: tilt smoothly with dy/dx
        headRot = (dy / (Math.abs(dx) + 140)) * 18 + (dx / (Math.abs(dx) + 180)) * 14;
      } else {
        // Cursor on left side: tilt smoothly towards left
        headRot = (dy / (Math.abs(dx) + 140)) * 18 - (Math.abs(dx) / (Math.abs(dx) + 180)) * 14;
      }
      headRot = Math.max(-28, Math.min(28, headRot));

      // Eye pupil shifts in 360 directions
      const maxPupilShift = 4.5;
      const pupilX = Math.cos(angleRad) * maxPupilShift * factor;
      const pupilY = Math.sin(angleRad) * maxPupilShift * factor;

      setLookOffset({
        headRot,
        headX,
        headY,
        pupilX,
        pupilY,
        faceAngle: angleDeg
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[540px] aspect-4/3 mx-auto flex items-center justify-center p-2 select-none"
    >
      <style>{`
        @keyframes float-cap {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes float-cert {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-3deg); }
        }
        @keyframes float-coin {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-16px) scale(1.05); }
        }
        @keyframes float-check {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-lamp-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.04); }
        }
        @keyframes cord-swing {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        .anim-cap { animation: float-cap 6.2s ease-in-out infinite; }
        .anim-cert { animation: float-cert 7.1s ease-in-out infinite 0.8s; }
        .anim-coin { animation: float-coin 5.8s ease-in-out infinite 1.4s; }
        .anim-check { animation: float-check 6.5s ease-in-out infinite 2s; }
        .lamp-beam-pulse { animation: pulse-lamp-glow 4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .anim-cap, .anim-cert, .anim-coin, .anim-check, .lamp-beam-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Earthy ambient aura reacting to lamp state */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center transition-opacity duration-500">
        <div
          className={`w-72 h-72 rounded-full blur-3xl transition-all duration-700 ${
            isLampOn
              ? 'bg-amber-600/15 dark:bg-amber-500/20 scale-105'
              : 'bg-stone-500/5 dark:bg-stone-800/10 scale-95 opacity-40'
          }`}
        />
        <div className="w-56 h-56 rounded-full bg-stone-500/5 dark:bg-stone-400/10 blur-2xl translate-x-12 -translate-y-8" />
      </div>

      <svg
        viewBox="0 0 500 400"
        className="w-full h-full drop-shadow-sm overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="laptopScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A2825" />
            <stop offset="100%" stopColor="#141312" />
          </linearGradient>

          <linearGradient id="goldCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DF9F48" />
            <stop offset="100%" stopColor="#B37728" />
          </linearGradient>

          {/* Lamp warm light beam gradient */}
          <linearGradient id="lampLightBeamGrad" x1="50%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="#F5B942" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#E29A26" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#C48C3A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#B87C31" stopOpacity="0" />
          </linearGradient>

          {/* Desk illumination pool radial gradient */}
          <radialGradient id="deskPoolGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.1" />
          </filter>

          <filter id="lampGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* 1. Ground shadow / Studio table */}
        <ellipse
          cx="250"
          cy="355"
          rx="190"
          ry="22"
          fill="currentColor"
          className="text-stone-200 dark:text-stone-800/80"
        />

        {/* Study Desk */}
        <g id="desk" transform="translate(60, 270)">
          {/* Desk Top */}
          <rect
            x="0"
            y="0"
            width="380"
            height="16"
            rx="8"
            fill="currentColor"
            className="text-stone-300 dark:text-stone-700"
          />
          {/* Desk Legs */}
          <rect
            x="35"
            y="16"
            width="10"
            height="75"
            rx="4"
            fill="currentColor"
            className="text-stone-400 dark:text-stone-800"
          />
          <rect
            x="335"
            y="16"
            width="10"
            height="75"
            rx="4"
            fill="currentColor"
            className="text-stone-400 dark:text-stone-800"
          />

          {/* Pool of light on table when lamp is ON */}
          {isLampOn && (
            <ellipse
              cx="260"
              cy="8"
              rx="90"
              ry="10"
              fill="url(#deskPoolGrad)"
              className="transition-opacity duration-300 pointer-events-none"
            />
          )}
        </g>

        {/* Book Stacks on Desk (Earthy tones: forest, clay, ochre) */}
        <g id="books" transform="translate(90, 225)">
          {/* Book 1 - Terracotta */}
          <rect x="0" y="32" width="65" height="13" rx="3" fill="#9E5336" />
          <rect x="5" y="34" width="55" height="2" fill="#BA6C4D" />
          {/* Book 2 - Forest Olive */}
          <rect x="5" y="18" width="56" height="14" rx="3" fill="#2D5843" />
          <rect x="10" y="20" width="46" height="2" fill="#4B8166" />
          {/* Book 3 - Raw Ochre */}
          <rect x="10" y="5" width="48" height="13" rx="3" fill="#C48C3A" />
        </g>

        {/* 2. Interactive Desk Lamp with Click-to-Toggle Light Feature */}
        <g
          id="lamp"
          transform="translate(370, 185)"
          onClick={() => setIsLampOn(prev => !prev)}
          className="cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLampOn(prev => !prev);
            }
          }}
          aria-label={`Study lamp is ${isLampOn ? 'turned on' : 'turned off'}. Click to toggle.`}
        >
          {/* Lamp Base Stand */}
          <path
            d="M 15 85 L 30 85 L 25 35 L 5 35 Z"
            fill="currentColor"
            className="text-stone-400 dark:text-stone-600 group-hover:text-stone-500 transition-colors"
          />
          {/* Curved Gooseneck Arm */}
          <path
            d="M 5 35 Q -10 15 5 5"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-stone-400 dark:text-stone-600"
          />

          {/* Lamp Shade - Glows warmly when ON, muted stone when OFF */}
          <path
            d="M -5 5 L 15 15 L 2 30 Z"
            fill={isLampOn ? '#F5B942' : '#6E6A63'}
            filter={isLampOn ? 'url(#lampGlowFilter)' : undefined}
            className="transition-colors duration-300 group-hover:brightness-110"
          />

          {/* Lamp Bulb / Light source point */}
          <circle
            cx="4"
            cy="24"
            r={isLampOn ? 4.5 : 3}
            fill={isLampOn ? '#FFF8D6' : '#454340'}
            className="transition-all duration-300"
          />

          {/* Luminous Light Cone Beam when Lamp is ON */}
          {isLampOn && (
            <polygon
              points="4,24 -115,90 20,90"
              fill="url(#lampLightBeamGrad)"
              className="lamp-beam-pulse pointer-events-none transition-opacity duration-300"
            />
          )}

          {/* Interactive Toggle Pull Switch String */}
          <g transform="translate(14, 20)">
            <line x1="0" y1="0" x2="0" y2="18" stroke="#9A9488" strokeWidth="1.5" />
            <circle
              cx="0"
              cy="19"
              r="2.5"
              fill={isLampOn ? '#F5B942' : '#9A9488'}
              className="group-hover:scale-125 transition-transform"
            />
          </g>

          {/* Subtle hover pulse ring on the lamp shade */}
          <circle
            cx="4"
            cy="20"
            r="16"
            fill="none"
            stroke={isLampOn ? '#F5B942' : '#9A9488'}
            strokeWidth="1"
            strokeDasharray="2 3"
            className="opacity-0 group-hover:opacity-75 transition-opacity"
          />
        </g>

        {/* 3. Student Figure with Cursor Tracking Head (360-degree responsiveness) */}
        <g id="student" transform="translate(190, 140)">
          {/* Torso / Hoodie - Black/Charcoal */}
          <path
            d="M 25 90 C 15 110 5 140 0 150 L 120 150 C 115 140 105 110 95 90 C 85 75 35 75 25 90 Z"
            fill="#191816"
            className="dark:fill-stone-800"
          />

          {/* Hood Collar - Earthy Ochre/Terracotta */}
          <path
            d="M 40 85 Q 60 105 80 85"
            stroke="#9E5336"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Neck with subtle tilt following head */}
          <rect
            x={52 + lookOffset.headX * 0.3}
            y={65 + lookOffset.headY * 0.2}
            width="16"
            height="20"
            rx="4"
            fill="#E2AC74"
            className="transition-transform duration-75 ease-out"
          />

          {/* DYNAMIC HEAD GROUP: Rotates and translates in 360 degrees to follow mouse cursor */}
          <g
            id="head-tracking-group"
            style={{
              transformOrigin: '60px 50px',
              transform: `translate(${lookOffset.headX}px, ${lookOffset.headY}px) rotate(${lookOffset.headRot}deg)`,
              transition: 'transform 80ms ease-out'
            }}
          >
            {/* Head Base */}
            <circle cx="60" cy="50" r="24" fill="#E2AC74" />

            {/* Cute Ear left & right */}
            <circle cx="37" cy="50" r="4.5" fill="#DFA469" />
            <circle cx="83" cy="50" r="4.5" fill="#DFA469" />

            {/* Modern Haircut - Deep Charcoal, tracks with head */}
            <path
              d="M 37 48 C 35 27 50 16 64 18 C 79 20 87 31 85 45 C 80 39 70 37 60 37 C 48 37 42 43 37 48 Z"
              fill="#121110"
            />
            {/* Hair tuff detail */}
            <path d="M 52 20 Q 56 12 66 18" stroke="#121110" strokeWidth="2.5" fill="none" />

            {/* Glasses Frames - Shifts dynamically toward cursor */}
            <g
              transform={`translate(${lookOffset.pupilX * 0.5}, ${lookOffset.pupilY * 0.5})`}
            >
              {/* Left Lens */}
              <rect
                x="46"
                y="43"
                width="12"
                height="10"
                rx="3.5"
                fill="none"
                stroke="#191816"
                strokeWidth="2"
              />
              {/* Right Lens */}
              <rect
                x="62"
                y="43"
                width="12"
                height="10"
                rx="3.5"
                fill="none"
                stroke="#191816"
                strokeWidth="2"
              />
              {/* Bridge */}
              <line x1="58" y1="48" x2="62" y2="48" stroke="#191816" strokeWidth="2" />
            </g>

            {/* Eyes & Interactive Pupils that look toward mouse cursor in 360 degrees */}
            <g id="interactive-eyes">
              {/* Left Eye White & Pupil */}
              <circle cx="52" cy="48" r="3.2" fill="#FFFFFF" />
              <circle
                cx={52 + lookOffset.pupilX}
                cy={48 + lookOffset.pupilY}
                r="1.9"
                fill="#191816"
              />
              {/* Pupil glint */}
              <circle
                cx={52 + lookOffset.pupilX + 0.6}
                cy={48 + lookOffset.pupilY - 0.6}
                r="0.7"
                fill="#FFFFFF"
              />

              {/* Right Eye White & Pupil */}
              <circle cx="68" cy="48" r="3.2" fill="#FFFFFF" />
              <circle
                cx={68 + lookOffset.pupilX}
                cy={48 + lookOffset.pupilY}
                r="1.9"
                fill="#191816"
              />
              {/* Pupil glint */}
              <circle
                cx={68 + lookOffset.pupilX + 0.6}
                cy={48 + lookOffset.pupilY - 0.6}
                r="0.7"
                fill="#FFFFFF"
              />
            </g>

            {/* Expressive Eyebrows that tilt slightly */}
            <path
              d={`M 46 ${40 + lookOffset.pupilY * 0.3} Q 52 ${38 + lookOffset.pupilY * 0.4} 57 ${40 + lookOffset.pupilY * 0.3}`}
              stroke="#191816"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 63 ${40 + lookOffset.pupilY * 0.3} Q 68 ${38 + lookOffset.pupilY * 0.4} 74 ${40 + lookOffset.pupilY * 0.3}`}
              stroke="#191816"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Subtle soft blush cheeks */}
            <circle cx="44" cy="54" r="3" fill="#D97E5E" opacity="0.35" />
            <circle cx="76" cy="54" r="3" fill="#D97E5E" opacity="0.35" />

            {/* Friendly Focused Smile */}
            <path
              d={`M ${56 + lookOffset.pupilX * 0.3} ${58 + lookOffset.pupilY * 0.3} Q 60 ${61 + lookOffset.pupilY * 0.3} ${64 + lookOffset.pupilX * 0.3} ${58 + lookOffset.pupilY * 0.3}`}
              stroke="#8B4513"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Arms typing on laptop keyboard */}
          <path
            d="M 12 135 Q 40 120 55 138"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-stone-300 dark:text-stone-700"
          />
          <path
            d="M 108 135 Q 80 120 65 138"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            className="text-stone-300 dark:text-stone-700"
          />
        </g>

        {/* Laptop on desk */}
        <g id="laptop" transform="translate(225, 235)">
          {/* Open screen */}
          <rect x="0" y="0" width="70" height="46" rx="5" fill="url(#laptopScreenGrad)" />
          {/* Screen lines */}
          <line x1="12" y1="12" x2="35" y2="12" stroke="#DF9F48" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="20" x2="55" y2="20" stroke="#E2E0D8" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="28" x2="45" y2="28" stroke="#9E5336" strokeWidth="2" strokeLinecap="round" />
          {/* Check icon on screen */}
          <circle cx="56" cy="12" r="4" fill="#2D5843" />
          {/* Keyboard base */}
          <polygon points="-8,46 78,46 70,54 -2,54" fill="#A8A49C" />
        </g>

        {/* 4. FLOATING SYMBOLS (Floating loop animation) */}

        {/* A. Floating Graduation Cap (Top Left) */}
        <g className="anim-cap" transform="translate(100, 75)" filter="url(#softShadow)">
          <polygon points="40,10 75,25 40,40 5,25" fill="#191816" className="dark:fill-stone-900" />
          <polygon points="40,12 70,25 40,38 10,25" fill="#2D2B28" className="dark:fill-stone-800" />
          <path d="M 22 28 C 22 42 58 42 58 28 Z" fill="#191816" />
          <circle cx="40" cy="25" r="3" fill="#C48C3A" />
          <path d="M 40 25 Q 65 32 68 45" stroke="#C48C3A" strokeWidth="2.5" fill="none" />
          <circle cx="68" cy="46" r="3.5" fill="#C48C3A" />
        </g>

        {/* B. Floating Degree Certificate (Top Right) */}
        <g className="anim-cert" transform="translate(340, 85)" filter="url(#softShadow)">
          <rect x="0" y="0" width="58" height="74" rx="6" fill="#FDFCF8" stroke="#E5E2D9" strokeWidth="1.5" />
          <rect x="12" y="10" width="34" height="4" rx="2" fill="#191816" />
          <rect x="10" y="20" width="38" height="2" fill="#A8A49C" />
          <rect x="10" y="26" width="38" height="2" fill="#A8A49C" />
          <rect x="10" y="32" width="26" height="2" fill="#A8A49C" />
          <circle cx="29" cy="50" r="8" fill="#C48C3A" />
          <path d="M 25 56 L 23 66 L 29 62 L 35 66 L 33 56 Z" fill="#9E5336" />
        </g>

        {/* C. Floating ₹ Rupee Coin (Right Lower) */}
        <g className="anim-coin" transform="translate(355, 195)" filter="url(#softShadow)">
          <circle cx="24" cy="24" r="22" fill="url(#goldCoinGrad)" stroke="#A06922" strokeWidth="2" />
          <circle cx="24" cy="24" r="18" fill="none" stroke="#F1D19F" strokeWidth="1.5" strokeDasharray="3 2" />
          <text
            x="24"
            y="31"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            fontWeight="bold"
            fontSize="19"
            fill="#45270A"
          >
            ₹
          </text>
        </g>

        {/* D. Floating Verified Checkmark Shield (Left Lower) */}
        <g className="anim-check" transform="translate(85, 175)" filter="url(#softShadow)">
          <rect x="0" y="0" width="42" height="42" rx="14" fill="#2D5843" />
          <path
            d="M 13 21 L 19 27 L 30 15"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>

      {/* Interactive Lamp Toggle Pill Badge below the desk */}
      <button
        onClick={() => setIsLampOn(prev => !prev)}
        type="button"
        className="absolute bottom-2 right-4 md:right-8 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer text-stone-700 dark:text-stone-300"
        title="Click desk lamp to turn on/off"
      >
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            isLampOn ? 'bg-amber-500 shadow-[0_0_8px_#F59E0B]' : 'bg-stone-400'
          }`}
        />
        <span>{isLampOn ? '💡 Lamp On (Click to off)' : '🌑 Lamp Off (Click to on)'}</span>
      </button>
    </div>
  );
};
