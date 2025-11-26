"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

// Type "secret" anywhere to trigger
const SECRET_WORD = "secret";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  velocity: { x: number; y: number };
  rotation: number;
  rotationSpeed: number;
  scale: number;
}

const EMOJIS = ["🌾", "🌿", "🍃", "🌱", "🚜", "🐛", "🦗", "🐝", "🌻", "🌽", "🥬", "🥕", "🍅", "🫑", "💚"];

function ParticleExplosion({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 8 + Math.random() * 12;
      initialParticles.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        velocity: {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        scale: 0.8 + Math.random() * 0.8,
      });
    }
    setParticles(initialParticles);

    // Animation loop
    let frame: number;
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed > 3000) {
        onComplete();
        return;
      }

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.velocity.x,
          y: p.y + p.velocity.y,
          velocity: {
            x: p.velocity.x * 0.98,
            y: p.velocity.y * 0.98 + 0.3, // gravity
          },
          rotation: p.rotation + p.rotationSpeed,
        }))
      );

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [onComplete]);

  if (!mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      {/* Flash effect */}
      <div 
        className="absolute inset-0 bg-primary/20 animate-pulse"
        style={{ animationDuration: "0.3s", animationIterationCount: 2 }}
      />
      
      {/* Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="text-center space-y-2 animate-bounce"
          style={{ animationDuration: "0.5s" }}
        >
          <div className="text-6xl">🌱</div>
          <div className="text-2xl font-bold text-primary drop-shadow-lg bg-background/80 px-4 py-2 rounded-lg backdrop-blur-sm">
            You found a secret!
          </div>
          <div className="text-sm text-muted-foreground bg-background/80 px-3 py-1 rounded-md">
            Now get back to work 🚜
          </div>
        </div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-3xl select-none"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            opacity: Math.max(0, 1 - (particle.y / window.innerHeight) * 0.5),
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>,
    document.body
  );
}

export function KonamiCode() {
  const [buffer, setBuffer] = useState("");
  const [activated, setActivated] = useState(false);

  const handleComplete = useCallback(() => {
    setActivated(false);
    setBuffer("");
  }, []);

  useEffect(() => {
    // Listen for custom trigger event (from clickable elements)
    const handleTrigger = () => {
      setActivated(true);
      console.log(
        "%c🌿 SECRET UNLOCKED! 🌿",
        "font-size: 24px; font-weight: bold; color: #22c55e; text-shadow: 2px 2px #000;"
      );
      console.log(
        "%cYou found the secret! You're officially a power user.",
        "font-size: 14px; color: #888;"
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Only track letter keys
      if (e.key.length !== 1) return;

      setBuffer((prev) => {
        const newBuffer = (prev + e.key.toLowerCase()).slice(-SECRET_WORD.length);
        
        // Check if buffer matches secret word
        if (newBuffer === SECRET_WORD) {
          handleTrigger();
          return "";
        }

        return newBuffer;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-easter-egg", handleTrigger);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-easter-egg", handleTrigger);
    };
  }, []);

  if (!activated) return null;

  return <ParticleExplosion onComplete={handleComplete} />;
}

// Helper to trigger from other components
export function triggerEasterEgg() {
  window.dispatchEvent(new CustomEvent("trigger-easter-egg"));
}

