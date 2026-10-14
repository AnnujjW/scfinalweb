import React, { useState, useEffect, useRef, useId } from 'react';

interface BrandLogoProps {
  size?: number; // Size in pixels (default: 38)
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  onNavigate?: (route: string) => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 38,
  className = '',
  showWordmark = false,
  wordmarkClassName = '',
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, '');

  // Proximity detection state
  const [proximity, setProximity] = useState(0); // 0 (far) to 1 (close/hovering)
  const [mouseAngle, setMouseAngle] = useState(0); // In degrees for directional reflection
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      // Detection radius: 220 pixels around the logo
      const maxDistance = 220;
      if (distance < maxDistance) {
        const factor = Math.max(0, 1 - distance / maxDistance);
        setProximity(factor);
        const rad = Math.atan2(dy, dx);
        setMouseAngle((rad * 180) / Math.PI);
      } else {
        setProximity(0);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const isShining = isHovered || proximity > 0.08;
  const shineIntensity = isHovered ? 1 : Math.min(1, proximity * 1.35);

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/');
    }
  };

  const handleTouchStart = () => {
    setIsHovered(true);
    setProximity(1);
    setTimeout(() => {
      setIsHovered(false);
      setProximity(0);
    }, 2200);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      className={`relative inline-flex items-center gap-2.5 select-none ${
        onNavigate ? 'cursor-pointer group' : ''
      } ${className}`}
      style={{ touchAction: 'manipulation' }}
      title="ScholarConnect — Connecting Students to Scholarships"
    >
      <style>{`
        /* True Lemniscate / Infinity Moving Float Keyframes */
        @keyframes infinity-glide-${uniqueId} {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          12.5% {
            transform: translate(2.2px, -1.8px) rotate(2.5deg);
          }
          25% {
            transform: translate(3.8px, 0px) rotate(3.2deg);
          }
          37.5% {
            transform: translate(2.0px, 1.8px) rotate(1.2deg);
          }
          50% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          62.5% {
            transform: translate(-2.2px, -1.8px) rotate(-2.5deg);
          }
          75% {
            transform: translate(-3.8px, 0px) rotate(-3.2deg);
          }
          87.5% {
            transform: translate(-2.0px, 1.8px) rotate(-1.2deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }

        /* Continuous Infinity Ribbon Dash Flow */
        @keyframes infinity-dash-${uniqueId} {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -120;
          }
        }

        /* Fast Specular Light Sweep when cursor is near */
        @keyframes shine-sweep-${uniqueId} {
          0% {
            transform: translateX(-40px) translateY(-20px) rotate(35deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(45px) translateY(25px) rotate(35deg);
            opacity: 0;
          }
        }

        /* Sparkle Twinkle Animation */
        @keyframes star-twinkle-${uniqueId} {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          40% {
            transform: scale(1.3) rotate(90deg);
            opacity: 1;
          }
          70% {
            transform: scale(0.9) rotate(180deg);
            opacity: 0.9;
          }
        }

        /* Tassel Sway on Proximity */
        @keyframes tassel-sway-${uniqueId} {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }

        .anim-infinity-${uniqueId} {
          animation: infinity-glide-${uniqueId} 5.6s ease-in-out infinite;
          transform-origin: 24px 22px;
        }

        .anim-ribbon-${uniqueId} {
          animation: infinity-dash-${uniqueId} 4.2s linear infinite;
        }

        .anim-sweep-${uniqueId} {
          animation: shine-sweep-${uniqueId} 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .anim-star-1-${uniqueId} {
          animation: star-twinkle-${uniqueId} 2.2s ease-in-out infinite;
          transform-origin: 24px 11px;
        }

        .anim-star-2-${uniqueId} {
          animation: star-twinkle-${uniqueId} 2.6s ease-in-out infinite 0.7s;
          transform-origin: 37px 18px;
        }

        .anim-star-3-${uniqueId} {
          animation: star-twinkle-${uniqueId} 2.4s ease-in-out infinite 1.3s;
          transform-origin: 36.5px 29.5px;
        }

        .anim-tassel-${uniqueId} {
          animation: tassel-sway-${uniqueId} 3.2s ease-in-out infinite;
          transform-origin: 24px 17.5px;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-infinity-${uniqueId},
          .anim-ribbon-${uniqueId},
          .anim-sweep-${uniqueId},
          .anim-star-1-${uniqueId},
          .anim-star-2-${uniqueId},
          .anim-star-3-${uniqueId},
          .anim-tassel-${uniqueId} {
            animation: none !important;
          }
        }
      `}</style>

      {/* Main Logo Container */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-full transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Soft Radial Ambient Golden Flare (expands when cursor is near) */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none"
          style={{
            background: isShining
              ? `radial-gradient(circle, rgba(245, 185, 66, ${0.45 * shineIntensity}) 0%, rgba(224, 130, 100, ${
                  0.2 * shineIntensity
                }) 55%, transparent 75%)`
              : 'transparent',
            filter: 'blur(4px)',
            transform: `scale(${1 + 0.35 * shineIntensity})`,
          }}
        />

        {/* SVG Canvas (48x48 viewBox for ultra-crisp resolution) */}
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dark & Earthy base badge gradient */}
            <radialGradient id={`badgeGrad-${uniqueId}`} cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#25221E" />
              <stop offset="100%" stopColor="#121110" />
            </radialGradient>

            {/* Infinity loop ribbon gradient */}
            <linearGradient id={`infinityGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5B942" />
              <stop offset="45%" stopColor="#E08264" />
              <stop offset="75%" stopColor="#C88214" />
              <stop offset="100%" stopColor="#F5B942" />
            </linearGradient>

            {/* Gold Bachelor Cap Upper Facet (Sunlit) */}
            <linearGradient id={`goldFacetLeft-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isShining ? '#FFF5C2' : '#FFE270'} />
              <stop offset="50%" stopColor={isShining ? '#FBD362' : '#F5B942'} />
              <stop offset="100%" stopColor={isShining ? '#F0AA22' : '#D49015'} />
            </linearGradient>

            {/* Gold Bachelor Cap Lower Facet (Shaded Depth) */}
            <linearGradient id={`goldFacetRight-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isShining ? '#FCD668' : '#E8A725'} />
              <stop offset="60%" stopColor={isShining ? '#D48C12' : '#B87208'} />
              <stop offset="100%" stopColor={isShining ? '#995B00' : '#7D4700'} />
            </linearGradient>

            {/* Cap Undercup / Skull Band */}
            <linearGradient id={`goldCupGrad-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E2822" />
              <stop offset="50%" stopColor="#4A3418" />
              <stop offset="100%" stopColor="#8C5305" />
            </linearGradient>

            {/* Tassel Metallic Gold Strand */}
            <linearGradient id={`tasselGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1AA" />
              <stop offset="60%" stopColor="#F5B942" />
              <stop offset="100%" stopColor="#B37007" />
            </linearGradient>

            {/* Specular White Shimmer Beam Gradient */}
            <linearGradient id={`shineBeam-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="35%" stopColor="#FFFEE8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#FFECA8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Clip path covering the Mortarboard diamond for the specular beam */}
            <clipPath id={`mortarboardClip-${uniqueId}`}>
              <polygon points="24,11 37,18 24,24 11,18" />
            </clipPath>

            {/* Glow Filter for Cap When Shining */}
            <filter id={`goldGlow-${uniqueId}`} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor="#F5B942" floodOpacity={isShining ? 0.95 : 0.3} />
              <feDropShadow dx="0" dy="1.5" stdDeviation="4.5" floodColor="#E08264" floodOpacity={isShining ? 0.5 : 0.15} />
            </filter>
          </defs>

          {/* 1. Base Outer Coin / Disc in Earthy Black Stone */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="13"
            fill={`url(#badgeGrad-${uniqueId})`}
            stroke={isShining ? '#F5B942' : '#3A352F'}
            strokeWidth={isShining ? '1.5' : '1.1'}
            className="transition-colors duration-300"
          />

          {/* 2. INFINITY MOVING LOOP (∞ Lemniscate Path) */}
          <g>
            {/* Background infinity guide track */}
            <path
              d="M 24 24 C 19 14, 8 14, 8 24 C 8 34, 19 34, 24 24 C 29 14, 40 14, 40 24 C 40 34, 29 34, 24 24 Z"
              stroke="#2E2B27"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Continuously Animated Glowing Infinity Ribbon */}
            <path
              d="M 24 24 C 19 14, 8 14, 8 24 C 8 34, 19 34, 24 24 C 29 14, 40 14, 40 24 C 40 34, 29 34, 24 24 Z"
              stroke={`url(#infinityGrad-${uniqueId})`}
              strokeWidth={isShining ? '3' : '2.2'}
              strokeDasharray="24 36"
              strokeLinecap="round"
              fill="none"
              className={`anim-ribbon-${uniqueId} transition-all duration-300`}
              style={{
                filter: isShining ? 'drop-shadow(0 0 3px #F5B942)' : 'none',
                opacity: isShining ? 1 : 0.85,
              }}
            />
          </g>

          {/* 3. GOLD BACHELOR CAP (Floats in smooth Infinity Motion + Shines on Cursor Near) */}
          <g
            className={`anim-infinity-${uniqueId}`}
            style={{
              filter: `url(#goldGlow-${uniqueId})`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            {/* Academic Skull Cup (Under-Dome) */}
            <path
              d="M 17 20 C 17 26.5, 31 26.5, 31 20 L 24 23.5 Z"
              fill={`url(#goldCupGrad-${uniqueId})`}
              stroke="#5E3807"
              strokeWidth="0.6"
            />

            {/* Mortarboard Rim Thickness (3D Edge) */}
            <polygon
              points="11,18 11,19.2 24,24.8 37,19.2 37,18 24,23.8"
              fill="#6E3E00"
            />

            {/* Mortarboard Diamond Top - Left Sunlit Facet */}
            <polygon
              points="24,11 11,18 24,24"
              fill={`url(#goldFacetLeft-${uniqueId})`}
            />

            {/* Mortarboard Diamond Top - Right Shaded Facet */}
            <polygon
              points="24,11 37,18 24,24"
              fill={`url(#goldFacetRight-${uniqueId})`}
            />

            {/* Crisp Gold Mortarboard Edge Highlight */}
            <polygon
              points="24,11 37,18 24,24 11,18"
              fill="none"
              stroke={isShining ? '#FFFDF0' : '#FFE885'}
              strokeWidth="0.65"
              strokeLinejoin="round"
            />

            {/* Center Gold Pin / Stud */}
            <circle
              cx="24"
              cy="17.5"
              r="1.4"
              fill="#FFF6CC"
              stroke="#8C5305"
              strokeWidth="0.5"
            />

            {/* SPECULAR SHINE SWEEP OVER THE GOLD CAP (Triggers on cursor proximity) */}
            {isShining && (
              <g clipPath={`url(#mortarboardClip-${uniqueId})`}>
                <rect
                  x="0"
                  y="0"
                  width="14"
                  height="48"
                  fill={`url(#shineBeam-${uniqueId})`}
                  className={`anim-sweep-${uniqueId}`}
                  style={{
                    transformOrigin: '24px 18px',
                    filter: 'drop-shadow(0 0 2px #FFFFFF)',
                  }}
                />
              </g>
            )}

            {/* Cascading Golden Tassel with Inertia */}
            <g className={`anim-tassel-${uniqueId}`}>
              {/* Tassel Draped Ribbon */}
              <path
                d="M 24 17.5 Q 32 18, 36.5 21"
                fill="none"
                stroke={`url(#tasselGrad-${uniqueId})`}
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Tassel Ring / Knot */}
              <circle
                cx="36.5"
                cy="21.8"
                r="1"
                fill="#FFF4B8"
                stroke="#8C5305"
                strokeWidth="0.4"
              />

              {/* Tassel Silk Fringe / Skirt */}
              <polygon
                points="35.2,22.2 37.8,22.2 38.8,28.8 34.2,28.8"
                fill={`url(#tasselGrad-${uniqueId})`}
                stroke="#6B3E03"
                strokeWidth="0.3"
              />

              {/* Small Golden End Bead */}
              <circle
                cx="36.5"
                cy="29"
                r="0.9"
                fill={isShining ? '#FFFFFF' : '#FFD54F'}
                stroke="#8C5305"
                strokeWidth="0.3"
              />
            </g>

            {/* 4. GOLDEN SPARKLES / STARBURST GLINTS (Shine when cursor is near) */}
            {isShining && (
              <g className="pointer-events-none">
                {/* Sparkle 1 at Top Corner */}
                <path
                  d="M 24 8.5 Q 24 11 21.5 11 Q 24 11 24 13.5 Q 24 11 26.5 11 Q 24 11 24 8.5 Z"
                  fill="#FFFFFF"
                  className={`anim-star-1-${uniqueId}`}
                  style={{ filter: 'drop-shadow(0 0 2px #FFE57F)' }}
                />

                {/* Sparkle 2 at Right Corner */}
                <path
                  d="M 37 16 Q 37 18 35 18 Q 37 18 37 20 Q 37 18 39 18 Q 37 18 37 16 Z"
                  fill="#FFF7C2"
                  className={`anim-star-2-${uniqueId}`}
                  style={{ filter: 'drop-shadow(0 0 2px #FFD54F)' }}
                />

                {/* Sparkle 3 at Tassel End */}
                <path
                  d="M 36.5 27.5 Q 36.5 29.5 35 29.5 Q 36.5 29.5 36.5 31.5 Q 36.5 29.5 38 29.5 Q 36.5 29.5 36.5 27.5 Z"
                  fill="#FFFFFF"
                  className={`anim-star-3-${uniqueId}`}
                  style={{ filter: 'drop-shadow(0 0 2px #FFC107)' }}
                />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Optional Wordmark with Earthy Terracotta Brand Highlight */}
      {showWordmark && (
        <span
          className={`font-heading font-bold tracking-tight text-stone-900 dark:text-stone-100 ${
            wordmarkClassName || 'text-base md:text-lg'
          }`}
        >
          Scholar
          <span className="text-[#9A5034] dark:text-[#E08264] transition-colors">
            Connect
          </span>
        </span>
      )}
    </div>
  );
};
