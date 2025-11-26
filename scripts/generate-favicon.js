/**
 * Generate favicon files from a Lucide icon
 * 
 * This script generates icon.svg and apple-icon.svg
 * from a Lucide icon (Briefcase for portfolio)
 */

const { writeFileSync } = require("fs");
const { join } = require("path");

// Create a styled SVG with better proportions
function createFaviconSVG(size, backgroundColor = "#ffffff", iconColor = "#09090b") {
  // Scale factor to make icon fit nicely with padding
  const padding = size * 0.15;
  const iconSize = size - (padding * 2);
  const scale = iconSize / 24; // Lucide icons are 24x24
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size * 0.15}"/>
  <g transform="translate(${padding}, ${padding}) scale(${scale})">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <rect width="20" height="14" x="2" y="6" rx="2" fill="none" stroke="${iconColor}" stroke-width="2"/>
    <path d="M12 6v4" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 14v4" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round"/>
  </g>
</svg>`;
}

const appDir = join(process.cwd(), "src/app");

console.log("Generating favicon files...");

// Create SVG favicon - Next.js will use this automatically
// Standard favicon size is typically 32x32, but SVG scales
const faviconSVG = createFaviconSVG(32, "#ffffff", "#09090b");
writeFileSync(join(appDir, "icon.svg"), faviconSVG);
console.log("✓ Created icon.svg (32x32)");

// Create apple-touch-icon (180x180 for iOS)
const appleIconSVG = createFaviconSVG(180, "#ffffff", "#09090b");
writeFileSync(join(appDir, "apple-icon.svg"), appleIconSVG);
console.log("✓ Created apple-icon.svg (180x180)");

console.log("\n✓ Favicon files generated successfully!");
console.log("Next.js will automatically use:");
console.log("  - icon.svg (primary favicon)");
console.log("  - apple-icon.svg (iOS home screen)");
