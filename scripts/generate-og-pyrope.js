/**
 * Generates a Pyrope-specific Open Graph image (1200×630 PNG) from an
 * inline SVG. The SVG uses the exact Pyrope color tokens so the OG image
 * is itself a demonstration of the colorscheme — consistent with the page's
 * "the page IS the demo" philosophy.
 *
 * Output: public/og-pyrope.png
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "../public");

// Pyrope tokens
const C = {
  bgBase: "#171513",
  bg1: "#1e1b19",
  bg2: "#282420",
  bg3: "#3a3430",
  fg: "#e6ddd0",
  fgDim: "#9c9186",
  fgFaint: "#6b625a",
  fgBright: "#f0e9dd",
  accent: "#a8c155",
  success: "#5683c4",
  warning: "#d4893f",
  error: "#c33d5e",
  gold: "#d1a83e",
  garnet: "#b5475c",
  rosewood: "#b04f86",
  lagoon: "#3f93a0",
  verdant: "#4f9c87",
};

// Swatch grid for the right side — 4 rows × 4 cols = 16 swatches
// Row 1: backgrounds | Row 2: foregrounds | Row 3: accent+status | Row 4: jewels
const swatches = [
  [C.bgBase, C.bg1, C.bg2, C.bg3],
  [C.fg, C.fgDim, C.fgFaint, C.fgBright],
  [C.accent, C.success, C.warning, C.error],
  [C.garnet, C.rosewood, C.lagoon, C.verdant],
];

const swatchSize = 52;
const swatchGap = 8;
const gridW = 4 * swatchSize + 3 * swatchGap; // 232
const gridH = 4 * swatchSize + 3 * swatchGap; // 232
const gridX = 1200 - gridW - 80; // right margin
const gridY = (630 - gridH) / 2; // vertically centered

function swatchRects() {
  let svg = "";
  swatches.forEach((row, rowIdx) => {
    row.forEach((color, colIdx) => {
      const x = gridX + colIdx * (swatchSize + swatchGap);
      const y = gridY + rowIdx * (swatchSize + swatchGap);
      svg += `<rect x="${x}" y="${y}" width="${swatchSize}" height="${swatchSize}" rx="8" fill="${color}" />`;
    });
  });
  return svg;
}

// Ambient blobs — same treatment as the page hero
function blobs() {
  return `
    <circle cx="180" cy="500" r="280" fill="${C.accent}" opacity="0.06" />
    <circle cx="1050" cy="120" r="220" fill="${C.gold}" opacity="0.05" />
  `;
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.bgBase}" />
      <stop offset="100%" stop-color="${C.bg1}" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Ambient blobs -->
  ${blobs()}

  <!-- Left content -->
  <g>
    <!-- Eyebrow pill -->
    <rect x="80" y="100" width="290" height="34" rx="6" fill="${C.bg2}" stroke="${C.bg3}" stroke-width="1" />
    <text x="95" y="122" font-family="JetBrains Mono, monospace" font-size="13" fill="${C.accent}" letter-spacing="2">// COLORSCHEME PROJECT</text>

    <!-- Main title -->
    <text x="80" y="240" font-family="Space Grotesk, Inter, sans-serif" font-size="120" font-weight="700" fill="${C.fgBright}" letter-spacing="-4">Pyrope</text>

    <!-- Subtitle -->
    <text x="80" y="295" font-family="Space Grotesk, Inter, sans-serif" font-size="32" font-weight="400" fill="${C.fgDim}">A deutan-aware dark colorscheme.</text>

    <!-- Descriptor -->
    <text x="80" y="345" font-family="Inter, sans-serif" font-size="18" fill="${C.fg}">One palette. Seven design rules. Consistent roles across every tool.</text>

    <!-- Port chips — laid out with wrapping -->
    <g>
      ${(() => {
        const ports = ["VS Code", "Neovim", "Zed", "Kate", "KDE", "Kitty", "Alacritty", "Lichess"];
        let x = 80;
        let y = 390;
        let out = "";
        ports.forEach((p) => {
          const w = p.length * 7.2 + 22;
          if (x + w > 580) { x = 80; y += 38; }
          out += `<rect x="${x}" y="${y}" width="${w}" height="28" rx="5" fill="${C.bg2}" stroke="${C.bg3}" stroke-width="1" />`;
          out += `<text x="${x + 11}" y="${y + 19}" font-family="JetBrains Mono, monospace" font-size="11" fill="${C.fgDim}">${p}</text>`;
          x += w + 8;
        });
        return out;
      })()}
    </g>

    <!-- Bottom attribution -->
    <text x="80" y="565" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="${C.fgBright}">Nirvik Dhungana</text>
    <text x="80" y="588" font-family="JetBrains Mono, monospace" font-size="13" fill="${C.fgFaint}">nirvikdhungana.com.np/projects/pyrope</text>
  </g>

  <!-- Right: color swatch grid -->
  ${swatchRects()}

  <!-- Grid label -->
  <text x="${gridX}" y="${gridY - 14}" font-family="JetBrains Mono, monospace" font-size="11" fill="${C.fgFaint}" letter-spacing="1.5">PALETTE — 16 TOKENS</text>
</svg>
`;

async function generate() {
  try {
    const svgBuffer = Buffer.from(svg);
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png()
      .toFile(path.join(publicDir, "og-pyrope.png"));
    console.log("✓ Generated public/og-pyrope.png (1200×630)");
  } catch (err) {
    console.error("Error generating OG image:", err);
    process.exit(1);
  }
}

generate();
