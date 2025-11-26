"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

function ArtworkPanel() {
  // Local image path - using the custom background image
  const localImage = "/auth-background.png";
  
  return (
    <div className="hidden lg:flex lg:w-1/2 lg:p-6">
      {/* Rounded container for the image */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6B8E23] via-[#8FBC8F] to-[#9ACD32]" />
        
        {/* Image with proper Next.js Image component */}
        <Image
          src={localImage}
          alt="Agricultural landscape"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen auth-background">
      {/* Left side - Form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
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

      {/* Right side - Artwork */}
      <ArtworkPanel />
    </div>
  );
}
