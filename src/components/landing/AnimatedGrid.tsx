"use client";

import { useEffect, useState, useMemo } from "react";

interface Pulse {
  id: number;
  type: "horizontal" | "vertical";
  position: number;
  delay: number;
  speed: number;
}

interface AnimatedGridProps {
  isEightiesMode?: boolean;
}

export function AnimatedGrid({ isEightiesMode = false }: AnimatedGridProps) {
  const [mounted, setMounted] = useState(false);
  const gridSize = 80;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate pulses once on mount
  const pulses = useMemo(() => {
    const newPulses: Pulse[] = [];
    let id = 0;

    // Horizontal pulses
    for (let i = 0; i < 3; i++) {
      newPulses.push({
        id: id++,
        type: "horizontal",
        position: 20 + i * 30,
        delay: i * 2.5,
        speed: 6 + Math.random() * 2,
      });
    }

    // Vertical pulses
    for (let i = 0; i < 3; i++) {
      newPulses.push({
        id: id++,
        type: "vertical",
        position: 15 + i * 35,
        delay: i * 3,
        speed: 7 + Math.random() * 2,
      });
    }

    return newPulses;
  }, []);

  // Colors based on mode
  const colors = isEightiesMode
    ? {
        gridLine: "#ff00ff",
        pulseStart: "#00ffff",
        pulseEnd: "#ff00ff",
        glow: "rgba(255, 0, 255, 0.6)",
        nodeColor: "#00ffff",
        nodeShadow: "rgba(0, 255, 255, 0.8)",
      }
    : {
        gridLine: "#6B8E23",
        pulseStart: "#9ACD32",
        pulseEnd: "#6B8E23",
        glow: "rgba(154, 205, 50, 0.4)",
        nodeColor: "#9ACD32",
        nodeShadow: "rgba(154, 205, 50, 0.5)",
      };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base grid */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isEightiesMode ? 0.15 : 0.03,
          backgroundImage: `
            linear-gradient(to right, ${colors.gridLine} 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Animated pulse lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`pulse-h-${isEightiesMode ? '80s' : 'normal'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.pulseStart} stopOpacity="0" />
            <stop offset="30%" stopColor={colors.pulseStart} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.pulseEnd} stopOpacity="1" />
            <stop offset="70%" stopColor={colors.pulseStart} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.pulseStart} stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`pulse-v-${isEightiesMode ? '80s' : 'normal'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.pulseStart} stopOpacity="0" />
            <stop offset="30%" stopColor={colors.pulseStart} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.pulseEnd} stopOpacity="1" />
            <stop offset="70%" stopColor={colors.pulseStart} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.pulseStart} stopOpacity="0" />
          </linearGradient>

          <filter id={`glow-${isEightiesMode ? '80s' : 'normal'}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation={isEightiesMode ? "6" : "4"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {pulses.map((pulse) => (
          <g key={pulse.id}>
            {pulse.type === "horizontal" ? (
              <rect
                x="-150"
                y={`${pulse.position}%`}
                width="150"
                height={isEightiesMode ? "3" : "2"}
                fill={`url(#pulse-h-${isEightiesMode ? '80s' : 'normal'})`}
                filter={`url(#glow-${isEightiesMode ? '80s' : 'normal'})`}
                style={{
                  animation: `pulse-horizontal ${pulse.speed}s linear infinite`,
                  animationDelay: `${pulse.delay}s`,
                }}
              />
            ) : (
              <rect
                x={`${pulse.position}%`}
                y="-150"
                width={isEightiesMode ? "3" : "2"}
                height="150"
                fill={`url(#pulse-v-${isEightiesMode ? '80s' : 'normal'})`}
                filter={`url(#glow-${isEightiesMode ? '80s' : 'normal'})`}
                style={{
                  animation: `pulse-vertical ${pulse.speed}s linear infinite`,
                  animationDelay: `${pulse.delay}s`,
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Corner accent nodes */}
      {[
        { x: 10, y: 15 },
        { x: 85, y: 20 },
        { x: 20, y: 75 },
        { x: 80, y: 80 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full transition-all duration-1000"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            backgroundColor: colors.nodeColor,
            boxShadow: `0 0 ${isEightiesMode ? '12px 4px' : '8px 2px'} ${colors.nodeShadow}`,
            animation: `node-pulse ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}
