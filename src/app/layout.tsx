import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProviderWrapper } from "@/components/providers/ThemeProviderWrapper";
import { KonamiCode } from "@/components/easter-eggs/KonamiCode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navigator",
  description: "Portfolio management system for agricultural products",
};

// Inline script to prevent FOUC (Flash of Unstyled Content)
// This runs before React hydrates and sets the theme immediately
const themeScript = `
(function() {
  try {
    var DARK_THEMES = ['dark', 'dark-exec', 'joshs-theme', 'high-contrast', 'bloomberg'];
    var slug = localStorage.getItem('ls-portfolio-theme') || 'light';
    var themeData = localStorage.getItem('ls-portfolio-theme-data');
    
    // Set theme attribute for theme-specific CSS
    document.documentElement.setAttribute('data-theme', slug);
    
    // Determine if dark theme
    var isDark = slug && DARK_THEMES.indexOf(slug) !== -1;
    
    // Apply dark class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply CSS variables from stored theme data
    if (themeData) {
      var theme = JSON.parse(themeData);
      if (theme && theme.colors) {
        theme.colors.forEach(function(color) {
          document.documentElement.style.setProperty('--' + color.color_name, color.color_value);
        });
      }
    }
  } catch (e) {
    // Fail silently - will use default light theme
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviderWrapper>
          {children}
          <Toaster />
          <KonamiCode />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
