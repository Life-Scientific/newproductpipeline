"use client";

import Image from "next/image";
import { ReactNode, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import GL component to avoid SSR issues with Three.js
const AuthGL = dynamic(
  () => import("@/components/gl/AuthGL").then((mod) => mod.AuthGL),
  {
    ssr: false,
    loading: () => null,
  }
);

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-[#f8f7f4] overflow-hidden">
      {/* GL Background - covers right side and fades into left */}
      <div
        className="absolute inset-0 hidden lg:block"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Suspense fallback={null}>
          <AuthGL hovering={hovering} />
        </Suspense>
      </div>

      {/* Gradient overlay to fade GL into white on the left */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{
          background: `linear-gradient(to right, 
            #ffffff 0%, 
            #ffffff 35%, 
            rgba(255,255,255,0.95) 40%,
            rgba(255,255,255,0.8) 45%,
            rgba(255,255,255,0.4) 55%,
            rgba(255,255,255,0) 65%
          )`,
        }}
      />

      {/* Left side - Form */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="w-full max-w-sm">
          {/* Logo - centered */}
          <div className="mb-10 flex justify-center">
            <Image
              src="/logo.png"
              alt="LifeScientific Logo"
              width={180}
              height={54}
              className="h-auto w-auto"
              priority
            />
          </div>

          {/* Form content */}
          {children}
        </div>
      </div>

      {/* Right side - spacer for layout (GL is absolute positioned) */}
      <div className="hidden lg:block lg:w-1/2" />
    </div>
  );
}
