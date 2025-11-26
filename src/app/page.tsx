import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Subtle grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #6B8E23 1px, transparent 1px),
            linear-gradient(to bottom, #6B8E23 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content - centered */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-6">
        {/* Decorative blurs */}
        <div className="absolute top-1/4 right-[20%] w-64 h-64 bg-[#9ACD32]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-[15%] w-72 h-72 bg-[#6B8E23]/10 rounded-full blur-[120px]" />

        <div className="relative z-10 text-center max-w-lg">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="Life Scientific"
              width={200}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Navigator
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-10">
            Portfolio Management System
          </p>

          {/* Login Button */}
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-[#6B8E23] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#556B2F] transition-all hover:shadow-xl active:scale-[0.98]"
          >
            Sign In
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Internal tool notice */}
          <p className="mt-8 text-sm text-gray-400">
            Internal tool for Life Scientific employees
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Life Scientific
        </p>
      </footer>
    </div>
  );
}
