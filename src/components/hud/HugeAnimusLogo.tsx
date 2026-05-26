import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAppSound, SOUND_ASSETS } from '../../hooks/useAppSound';

interface ChargingParticle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  char: string;
  speed: number;
  opacity: number;
}

interface HugeAnimusLogoProps {
  onSyncComplete?: () => void;
}

export function HugeAnimusLogo({ onSyncComplete }: HugeAnimusLogoProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 1
  const [particles, setParticles] = useState<{id: number, x: number, y: number, tx: string, ty: string, rot: string, char: string, size: number}[]>([]);
  const [chargingParticles, setChargingParticles] = useState<ChargingParticle[]>([]);
  
  const [playSync] = useAppSound(SOUND_ASSETS.ANIMUS.SYNC);
  const [playClick] = useAppSound(SOUND_ASSETS.UI.CLICK);
  
  const controls = useAnimation();
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const holdProgressRef = useRef(0);

  // Holding continuous frame loops
  useEffect(() => {
    if (isHolding) {
      const animateCharge = (time: number) => {
        if (previousTimeRef.current !== null) {
          const deltaTime = Math.min(50, time - previousTimeRef.current); // cap delta to prevent jumps
          
          // Speed: complete charge (reaches 1) in 3.0 seconds
          const chargeDelta = deltaTime / 3000;
          holdProgressRef.current = Math.min(1, holdProgressRef.current + chargeDelta);
          setHoldProgress(holdProgressRef.current);

          // Update outward memory/cyber particles radiating close to the center logo
          setChargingParticles((prevParticles) => {
            let updated = prevParticles
              .map((p) => {
                const newDist = p.distance + p.speed * (deltaTime / 16);
                return {
                  ...p,
                  distance: newDist,
                  opacity: Math.min(1, (110 - newDist) / 35), // fade out beautifully near 110px
                };
              })
              .filter((p) => p.distance < 110);

            // Periodically spawn new particle extremely close to the core
            if (Math.random() < 0.45 && updated.length < 48) {
              const symbols = ['✦', '⬡', '▪', '▫', '⊹', '•', '✦', '·', '⧉', 'SYS', 'SYNC', 'MEM', '01'];
              const angle = Math.random() * Math.PI * 2;
              const distance = 10 + Math.random() * 20; // right near the very center of Animus X
              const size = Math.random() > 0.6 ? 9 : 6;
              const char = symbols[Math.floor(Math.random() * symbols.length)];
              const speed = 0.8 + Math.random() * 1.5; // gentle, majestic float rate

              updated.push({
                id: Math.random(),
                angle,
                distance,
                size,
                char,
                speed,
                opacity: 1,
              });
            }
            return updated;
          });

          // Check if fully synchronized!
          if (holdProgressRef.current >= 1) {
            handleCompleteSync();
            return;
          }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animateCharge);
      };
      
      previousTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animateCharge);
    } else {
      // Smooth decay when letting go
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      const decayDuration = 400; // ms to decay
      const startProgress = holdProgressRef.current;
      const startTime = performance.now();
      
      const animateDecay = (time: number) => {
        const elapsed = time - startTime;
        const ratio = Math.min(1, elapsed / decayDuration);
        holdProgressRef.current = startProgress * (1 - ratio);
        setHoldProgress(holdProgressRef.current);
        
        // Disperse particles outwards gracefully
        setChargingParticles((prev) => 
          prev.map(p => ({
            ...p,
            distance: p.distance + 3,
            opacity: p.opacity * 0.85
          })).filter(p => p.opacity > 0.05)
        );
        
        if (ratio < 1 && holdProgressRef.current > 0) {
          requestRef.current = requestAnimationFrame(animateDecay);
        } else {
          holdProgressRef.current = 0;
          setHoldProgress(0);
          setChargingParticles([]);
        }
      };
      requestRef.current = requestAnimationFrame(animateDecay);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHolding]);

  const handleCompleteSync = () => {
    setIsHolding(false);
    setIsSpinning(true);
    playSync();
    
    // Generate code particles for the Animus memory burst explosion - beautiful
    const symbols = ['✦', '⬡', '▪', '▫', '⊹', '•', '✦', '·', '⧉', '⚙'];
    const newParticles = Array.from({length: 120}).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const dist = 80 + Math.random() * 260; // sutil yet wider dispersal
      const char = symbols[Math.floor(Math.random() * symbols.length)];
      const size = Math.random() > 0.6 ? 12 : 7;
      
      return {
        id: Date.now() + i,
        x: 220,
        y: 250,
        tx: `${Math.cos(angle) * dist}px`,
        ty: `${Math.sin(angle) * dist}px`,
        rot: `${(Math.random() - 0.5) * 540}deg`,
        char,
        size
      };
    });
    setParticles(newParticles);
    
    // Smooth, deep organic pulse transition
    controls.start({
      scale: [1, 1.12, 0.96, 1.03, 1],
      filter: [
        "drop-shadow(0 0 10px rgba(0,240,224,0.4))", 
        "drop-shadow(0 0 70px rgba(0,240,224,1.0))", 
        "drop-shadow(0 0 30px rgba(0,240,224,0.7))",
        "drop-shadow(0 0 10px rgba(0,240,224,0.4))"
      ],
      transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
    });

    setTimeout(() => {
      setIsSpinning(false);
      setParticles([]);
    }, 1600);
  };

  const handleClick = async () => {
    if (isSpinning || isHolding) return;
    setIsSpinning(true);
    playClick();
    
    // Generate fluid, elegant and sutil bursts
    const symbols = ['✦', '⬡', '▪', '▫', '⊹', '•', '▫', '✦', '·'];
    const newParticles = Array.from({length: 45}).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const dist = 50 + Math.random() * 140;
      const char = symbols[Math.floor(Math.random() * symbols.length)];
      const size = Math.random() > 0.5 ? 9 : 6;
      
      return {
        id: Date.now() + i,
        x: 220,
        y: 250,
        tx: `${Math.cos(angle) * dist}px`,
        ty: `${Math.sin(angle) * dist}px`,
        rot: `${(Math.random() - 0.5) * 360}deg`,
        char,
        size
      };
    });
    setParticles(newParticles);
    
    // Smooth ease-in, bounce-free microscale
    controls.start({
      scale: [1, 1.04, 0.99, 1],
      filter: [
        "drop-shadow(0 0 10px rgba(0,240,224,0.4))", 
        "drop-shadow(0 0 40px rgba(0,240,224,0.85))", 
        "drop-shadow(0 0 10px rgba(0,240,224,0.4))"
      ],
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    });
    
    setTimeout(() => {
      setIsSpinning(false);
      setParticles([]);
    }, 1000);
  };

  return (
    <div 
      className="relative w-[340px] h-[380px] sm:w-[440px] sm:h-[500px] cursor-pointer group select-none touch-none"
      onClick={handleClick}
      onPointerDown={() => { if (!isSpinning) setIsHolding(true); }}
      onPointerUp={() => setIsHolding(false)}
      onPointerLeave={() => setIsHolding(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* SVG Background, Hexagons, Scanlines */}
      <svg width="100%" height="100%" viewBox="0 0 440 500" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        <defs>
          <clipPath id="hc">
            <polygon points="220,40 402,145 402,355 220,460 38,355 38,145"/>
          </clipPath>

          <radialGradient id="hexFill" cx="38%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#ddf5fb"/>
            <stop offset="18%" stopColor="#b0e8f5"/>
            <stop offset="42%" stopColor="#5ec8e0"/>
            <stop offset="72%" stopColor="#1e8098"/>
            <stop offset="100%" stopColor="#083848"/>
          </radialGradient>

          <radialGradient id="bloom" cx="40%" cy="36%" r="38%">
            <stop offset="0%" stopColor="#fff" stopOpacity=".65"/>
            <stop offset="60%" stopColor="#cff4ff" stopOpacity=".12"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </radialGradient>

          <linearGradient id="bg" x1="25%" y1="0%" x2="75%" y2="100%">
            <stop offset="0%" stopColor="#88ffef"/>
            <stop offset="40%" stopColor="#00f0e0"/>
            <stop offset="100%" stopColor="#00a8c0"/>
          </linearGradient>

          <linearGradient id="xg" x1="30%" y1="5%" x2="70%" y2="95%">
            <stop offset="0%" stopColor="#e87060"/>
            <stop offset="45%" stopColor="#cc3822"/>
            <stop offset="100%" stopColor="#8a1a0a"/>
          </linearGradient>

          <linearGradient id="xh" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff9988" stopOpacity=".55"/>
            <stop offset="40%" stopColor="#ff9988" stopOpacity="0"/>
            <stop offset="100%" stopColor="#ff9988" stopOpacity=".2"/>
          </linearGradient>

          <filter id="hexGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="b2"/>
            <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <filter id="xs" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#c02010" floodOpacity=".7"/>
            <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#000" floodOpacity=".55"/>
          </filter>

          <filter id="sl"><feGaussianBlur stdDeviation="1 0"/></filter>
          <filter id="netBlur"><feGaussianBlur stdDeviation="0.8"/></filter>
        </defs>

        <motion.g 
          className="origin-[220px_250px] text-animus-cyan dark:text-[#00f0e0]"
          animate={isSpinning ? controls : {
            scale: 1 + holdProgress * 0.04,
            filter: `drop-shadow(0 0 ${10 + holdProgress * 35}px rgba(0,240,224,${0.4 + holdProgress * 0.6}))`,
            x: isHolding ? (Math.random() - 0.5) * holdProgress * 4 : 0,
            y: isHolding ? (Math.random() - 0.5) * holdProgress * 4 : 0,
          }}
          initial={{ rotate: 0, scale: 1, filter: "drop-shadow(0 0 10px currentColor)" }}
        >
          <polygon points="220,40 402,145 402,355 220,460 38,355 38,145"
            fill="none" stroke="currentColor" strokeWidth="3.5"
            filter="url(#hexGlow)" opacity=".75">
            <animate attributeName="opacity" values=".5;.9;.5" dur="3.2s" repeatCount="indefinite"/>
          </polygon>

          <g clipPath="url(#hc)">
            <polygon points="220,40 402,145 402,355 220,460 38,355 38,145"
              fill="url(#hexFill)"/>

            <polygon points="220,40 402,145 402,355 220,460 38,355 38,145"
              fill="url(#bloom)"/>

            <rect x="38" y="0" width="364" height="5" fill="rgba(180,255,255,.22)" filter="url(#sl)">
              <animateTransform attributeName="transform" type="translate"
                from="0,-30" to="0,480" dur="4.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0;.5;.5;0"
                keyTimes="0;.08;.92;1" dur="4.5s" repeatCount="indefinite"/>
            </rect>

            <rect x="38" y="0" width="364" height="3" fill="rgba(255,255,255,.12)">
              <animateTransform attributeName="transform" type="translate"
                from="0,200" to="0,480" dur="7s" begin="-3s" repeatCount="indefinite"/>
            </rect>
          </g>

          <polygon points="220,48 394,151 394,349 220,452 46,349 46,151"
            fill="none" stroke="rgba(160,245,240,.22)" strokeWidth="1.5"/>

          <polygon points="220,40 402,145 402,355 220,460 38,355 38,145"
            fill="none" stroke="url(#bg)" strokeWidth="5.5"
            strokeLinejoin="round" filter="url(#hexGlow)">
            <animate attributeName="stroke-opacity" values=".8;1;.8" dur="3.2s" repeatCount="indefinite"/>
          </polygon>

          <polygon points="220,40 402,145 402,355 220,460 38,355 38,145"
            fill="none" stroke="#c0c0c0" strokeWidth="1.5"
            transform="scale(0.96)" transformOrigin="220 250"/>

          <line x1="212" y1="34" x2="228" y2="34" stroke="currentColor" strokeWidth="2.5"/>
          <line x1="220" y1="28" x2="220" y2="42" stroke="currentColor" strokeWidth="1.5" opacity=".6"/>
          <line x1="212" y1="466" x2="228" y2="466" stroke="currentColor" strokeWidth="2.5"/>
          <line x1="220" y1="460" x2="220" y2="472" stroke="currentColor" strokeWidth="1.5" opacity=".6"/>
          <line x1="408" y1="139" x2="396" y2="151" stroke="currentColor" strokeWidth="2" opacity=".7"/>
          <line x1="408" y1="361" x2="396" y2="349" stroke="currentColor" strokeWidth="2" opacity=".7"/>
          <line x1="32"  y1="139" x2="44"  y2="151" stroke="currentColor" strokeWidth="2" opacity=".7"/>
          <line x1="32"  y1="361" x2="44"  y2="349" stroke="currentColor" strokeWidth="2" opacity=".7"/>



          <circle cx="196" cy="52"  r="3"   fill="currentColor"><animate attributeName="opacity" values=".2;.9;.2" dur="2.4s" repeatCount="indefinite"/></circle>
          <circle cx="370" cy="185" r="2.5" fill="currentColor"><animate attributeName="opacity" values=".1;.7;.1" dur="3.2s" repeatCount="indefinite"/></circle>
          <circle cx="65"  cy="225" r="3.5" fill="currentColor"><animate attributeName="opacity" values=".2;.95;.2" dur="2s" repeatCount="indefinite"/></circle>
          <circle cx="255" cy="460" r="3"   fill="currentColor"><animate attributeName="opacity" values=".1;.65;.1" dur="2.8s" repeatCount="indefinite"/></circle>
          <circle cx="335" cy="82"  r="2"   fill="#80ffef"><animate attributeName="opacity" values=".1;.55;.1" dur="3.6s" repeatCount="indefinite"/></circle>
          <circle cx="100" cy="390" r="2.5" fill="currentColor"><animate attributeName="opacity" values=".2;.6;.2" dur="2.2s" repeatCount="indefinite"/></circle>
          <circle cx="28"  cy="160" r="2"   fill="currentColor"><animate attributeName="opacity" values=".1;.5;.1" dur="4.1s" repeatCount="indefinite"/></circle>
          <circle cx="410" cy="310" r="2"   fill="currentColor"><animate attributeName="opacity" values=".1;.6;.1" dur="3s" repeatCount="indefinite"/></circle>
          <circle cx="150" cy="18"  r="1.8" fill="#aaf7ef"><animate attributeName="opacity" values=".2;.7;.2" dur="2.6s" repeatCount="indefinite"/></circle>
          <circle cx="295" cy="490" r="1.8" fill="#aaf7ef"><animate attributeName="opacity" values=".1;.5;.1" dur="3.4s" repeatCount="indefinite"/></circle>

          <g stroke="currentColor" strokeWidth=".7" opacity=".15" filter="url(#netBlur)">
            <line x1="196" y1="52"  x2="370" y2="185"/>
            <line x1="65"  y1="225" x2="196" y2="52"/>
            <line x1="370" y1="185" x2="255" y2="460"/>
            <line x1="65"  y1="225" x2="100" y2="390"/>
            <line x1="335" y1="82"  x2="370" y2="185"/>
            <line x1="100" y1="390" x2="255" y2="460"/>
            <line x1="335" y1="82"  x2="196" y2="52"/>
            <line x1="28"  y1="160" x2="65"  y2="225"/>
            <line x1="410" y1="310" x2="370" y2="185"/>
            <line x1="150" y1="18"  x2="196" y2="52"/>
            <line x1="295" y1="490" x2="255" y2="460"/>
          </g>
        </motion.g>
        
        {/* Elegant pulsing circular elements near the middle, no spinning across the screen */}
        {holdProgress > 0 && (
          <g className="text-animus-cyan dark:text-[#00f0e0]" style={{ transformOrigin: '220px 250px' }}>
            {/* Core Ambient Aura behind center logo */}
            <circle
              cx="220"
              cy="250"
              r={75 + holdProgress * 15}
              fill="none"
              stroke="currentColor"
              strokeWidth={4 + holdProgress * 12}
              opacity={holdProgress * 0.35}
              filter="url(#hexGlow)"
            />
            
            {/* Subtly glowing dotted lock frame, static for precision */}
            <circle
              cx="220"
              cy="250"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 8"
              opacity={0.25 + holdProgress * 0.55}
              filter="drop-shadow(0 0 5px currentColor)"
            />

            {/* Clean progress ring completing itself close to the core */}
            <circle 
              cx="220" 
              cy="250" 
              r="85" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeDasharray={`${2 * Math.PI * 85}`}
              strokeDashoffset={`${2 * Math.PI * 85 * (1 - holdProgress)}`}
              opacity={0.3 + holdProgress * 0.7}
              transform="rotate(-90 220 250)"
              style={{ transformOrigin: '220px 250px' }}
              filter="drop-shadow(0 0 8px currentColor)"
            />
          </g>
        )}

        {/* Charging Particles flowing inward with full theme compatibility */}
        {(isHolding || holdProgress > 0) && chargingParticles.map(p => {
          const px = 220 + Math.cos(p.angle) * p.distance;
          const py = 250 + Math.sin(p.angle) * p.distance;
          return (
            <text
              key={p.id}
              x={px}
              y={py}
              className="font-mono text-animus-cyan dark:text-[#00f0e0] select-none pointer-events-none"
              fill="currentColor"
              fontSize={p.size}
              fontWeight="bold"
              alignmentBaseline="middle"
              textAnchor="middle"
              style={{
                opacity: p.opacity,
                filter: `drop-shadow(0px 0px ${p.size / 3.5}px currentColor)`
              }}
            >
              {p.char}
            </text>
          );
        })}
        
        {/* Expansive Data Shockwaves */}
        {isSpinning && (
          <g className="text-animus-cyan dark:text-[#00f0e0]">
            <circle cx="220" cy="250" r="115" fill="none" stroke="currentColor" className="animate-wave-expand" />
            <circle cx="220" cy="250" r="110" fill="none" stroke="#aaf7ef" className="animate-wave-expand" style={{ animationDelay: '0.08s' }} />
            <circle cx="220" cy="250" r="105" fill="none" stroke="currentColor" className="animate-wave-expand" style={{ animationDelay: '0.14s' }} strokeDasharray="5 15"/>
          </g>
        )}

        {/* Particles with drop shadow that matches theme colors dynamically */}
        {particles.map(p => (
          <text
            key={p.id}
            x={p.x}
            y={p.y}
            className="animate-particle-explode font-mono text-animus-cyan/70 dark:text-[#00f0e0]"
            fontSize={p.size}
            fontWeight="bold"
            alignmentBaseline="middle"
            textAnchor="middle"
            style={{
              '--tx': p.tx,
              '--ty': p.ty,
              '--rot': p.rot,
              fill: 'currentColor',
              filter: `drop-shadow(0px 0px ${p.size / 4}px currentColor)`
            } as React.CSSProperties}
          >
            {p.char}
          </text>
        ))}

        <g transform="translate(220, 310) scale(0.9,0.85)">
          <text
            x="0" y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            alignmentBaseline="middle"
            className="font-x-square"
            fontSize="420"
            fill="url(#xg)"
            filter="url(#xs)"
            opacity=".95">X</text>
          <text
            x="0" y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            alignmentBaseline="middle"
            className="font-x-square"
            fontSize="420"
            fill="url(#xh)"
            opacity=".45">X</text>
        </g>
      </svg>
      
      {/* ANIMUS Text Overlay */}
      <div 
        className="label-animus absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 text-white font-black text-[3.8rem] sm:text-[4.6rem] tracking-[0.08em] whitespace-nowrap z-30"
        data-text="ANIMUS"
      >
        ANIMUS
      </div>
    </div>
  );
}
