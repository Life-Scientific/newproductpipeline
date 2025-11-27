"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { AnimatedGrid } from "@/components/landing/AnimatedGrid";

export default function LandingPage() {
  const [isEightiesMode, setIsEightiesMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showFlash, setShowFlash] = useState(false);

  // Preload the 80s logo on mount so it's ready for instant swap
  useEffect(() => {
    const img = new window.Image();
    img.src = "/Logo_80.png";
  }, []);

  // Reset click count if too much time passes between clicks
  useEffect(() => {
    if (clickCount > 0 && clickCount < 3) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [clickCount, lastClickTime]);

  const handleLogoClick = useCallback(() => {
    const now = Date.now();
    setLastClickTime(now);
    
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      // Trigger 80s mode!
      setShowFlash(true);
      setTimeout(() => {
        setIsEightiesMode((prev) => !prev);
        setShowFlash(false);
        setClickCount(0);
      }, 150);
    }
  }, [clickCount]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-700 ${
        isEightiesMode
          ? "bg-[#0a0a1a]"
          : "bg-[#fafafa]"
      }`}
    >
      {/* Flash effect on mode switch */}
      {showFlash && (
        <div className="fixed inset-0 z-50 bg-white animate-flash pointer-events-none" />
      )}

      {/* Animated grid background */}
      <AnimatedGrid isEightiesMode={isEightiesMode} />

      {/* 80s mode scanlines overlay */}
      {isEightiesMode && (
        <div
          className="fixed inset-0 pointer-events-none z-20 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`,
          }}
        />
      )}

      {/* 80s Synthwave Sun */}
      {isEightiesMode && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none z-0">
          <div
            className="w-[600px] h-[300px] rounded-t-full opacity-60"
            style={{
              background: `linear-gradient(
                to bottom,
                #ff6b35 0%,
                #f7931e 20%,
                #ffcc00 40%,
                #ff6b9d 60%,
                #c44569 80%,
                #5f27cd 100%
              )`,
              maskImage: `repeating-linear-gradient(
                to bottom,
                black 0px,
                black 8px,
                transparent 8px,
                transparent 12px
              )`,
              WebkitMaskImage: `repeating-linear-gradient(
                to bottom,
                black 0px,
                black 8px,
                transparent 8px,
                transparent 12px
              )`,
            }}
          />
        </div>
      )}

      {/* 80s Floating Shapes */}
      {isEightiesMode && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Triangle 1 */}
          <div
            className="absolute animate-float-slow"
            style={{
              top: "15%",
              left: "10%",
              width: 0,
              height: 0,
              borderLeft: "30px solid transparent",
              borderRight: "30px solid transparent",
              borderBottom: "50px solid rgba(255, 0, 255, 0.15)",
              filter: "drop-shadow(0 0 10px rgba(255, 0, 255, 0.3))",
            }}
          />
          {/* Triangle 2 */}
          <div
            className="absolute animate-float-medium"
            style={{
              top: "60%",
              right: "8%",
              width: 0,
              height: 0,
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderBottom: "40px solid rgba(0, 255, 255, 0.15)",
              filter: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))",
              transform: "rotate(180deg)",
            }}
          />
          {/* Diamond */}
          <div
            className="absolute w-10 h-10 animate-float-fast"
            style={{
              top: "30%",
              right: "15%",
              background: "rgba(255, 102, 0, 0.12)",
              transform: "rotate(45deg)",
              boxShadow: "0 0 20px rgba(255, 102, 0, 0.3)",
            }}
          />
          {/* Circle */}
          <div
            className="absolute w-16 h-16 rounded-full animate-float-medium border-2 border-[#ff00ff]/20"
            style={{
              bottom: "25%",
              left: "12%",
              boxShadow: "0 0 15px rgba(255, 0, 255, 0.2), inset 0 0 15px rgba(255, 0, 255, 0.1)",
            }}
          />
        </div>
      )}

      {/* Main content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-6 z-10">
        {/* Decorative blurs */}
        <div
          className={`absolute top-1/4 right-[20%] w-64 h-64 rounded-full blur-[100px] animate-blob-drift transition-colors duration-700 ${
            isEightiesMode ? "bg-[#ff00ff]/20" : "bg-[#9ACD32]/15"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-[15%] w-72 h-72 rounded-full blur-[120px] animate-blob-drift transition-colors duration-700 ${
            isEightiesMode ? "bg-[#00ffff]/15" : "bg-[#6B8E23]/10"
          }`}
          style={{ animationDelay: "-12s" }}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] animate-blob-drift transition-colors duration-700 ${
            isEightiesMode ? "bg-[#ff6600]/10" : "bg-[#9ACD32]/5"
          }`}
          style={{ animationDelay: "-6s" }}
        />

        <div className="relative z-10 text-center max-w-lg">
          {/* Logo - clickable for Easter egg */}
          <button
            onClick={handleLogoClick}
            className="mb-6 flex justify-center animate-fade-in-up focus:outline-none group"
            style={{ animationDelay: "0.1s" }}
            aria-label="Life Scientific logo"
          >
            <div className="relative">
              {/* Hover glow ring */}
              <div
                className={`absolute -inset-4 rounded-2xl transition-all duration-300 ${
                  isEightiesMode
                    ? "group-hover:bg-[#ff00ff]/10 group-hover:shadow-[0_0_30px_rgba(255,0,255,0.3)]"
                    : "group-hover:bg-[#6B8E23]/5 group-hover:shadow-[0_0_20px_rgba(107,142,35,0.15)]"
                }`}
              />
              {/* Both logos rendered, toggle visibility for instant swap */}
              <div className="relative">
                {/* Normal logo */}
                <Image
                  src="/logo.png"
                  alt="Life Scientific"
                  width={280}
                  height={100}
                  className={`relative transition-all duration-300 cursor-pointer h-20 sm:h-24 w-auto ${
                    isEightiesMode
                      ? "opacity-0 scale-95"
                      : "opacity-100 group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-95"
                  }`}
                  priority
                />
                {/* 80s logo - absolute positioned on top */}
                <Image
                  src="/Logo_80.png"
                  alt="Life Scientific - Retro"
                  width={400}
                  height={160}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer h-32 w-auto ${
                    isEightiesMode
                      ? "opacity-100 drop-shadow-[0_0_20px_rgba(255,0,255,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(255,0,255,0.8)]"
                      : "opacity-0 scale-95"
                  }`}
                  priority
                />
              </div>
              {/* Click indicator dots */}
              {clickCount > 0 && clickCount < 3 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        i < clickCount
                          ? isEightiesMode
                            ? "bg-[#ff00ff] shadow-[0_0_8px_#ff00ff] scale-110"
                            : "bg-[#6B8E23] shadow-[0_0_6px_rgba(107,142,35,0.5)] scale-110"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </button>

          {/* Title */}
          <h1
            className={`text-2xl font-semibold tracking-tight sm:text-3xl mb-8 animate-fade-in-up opacity-0 transition-colors duration-700 ${
              isEightiesMode
                ? "text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff] animate-gradient-x drop-shadow-[0_0_30px_rgba(255,0,255,0.3)]"
                : "text-gray-600"
            }`}
            style={{ animationDelay: "0.25s" }}
          >
            Navigator
          </h1>

          {/* Login Button */}
          <div
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/login"
              className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isEightiesMode
                  ? "bg-gradient-to-r from-[#ff00ff] to-[#00ffff] hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] border border-[#00ffff]/50"
                  : "bg-[#6B8E23] hover:bg-[#556B2F] hover:shadow-xl"
              }`}
            >
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p
          className={`text-xs transition-colors duration-700 ${
            isEightiesMode ? "text-[#ff00ff]/40" : "text-gray-400"
          }`}
        >
          © {new Date().getFullYear()} Life Scientific
          {isEightiesMode && " • Est. 1995"}
        </p>
      </footer>
    </div>
  );
}
