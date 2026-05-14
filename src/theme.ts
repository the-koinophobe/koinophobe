import type { Theme } from "./types";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── BRAND GREEN ─────────────────────────────────────────────────────────────
// Single green hue (92°) used across both modes.
// Dark mode: lighter value for visibility on dark backgrounds.
// Light mode: darker value for WCAG AA contrast on cream.
export const BRAND_GREEN = "#5ab400"; // mid-point, used for logo & favicon

export const T: Record<"dark" | "light", Theme> = {
  dark: {
    bg:       "#0e0d0c",
    bg2:      "#1a1916",
    bg3:      "#242220",
    text:     "#f2ede3",
    mid:      "rgba(242,237,227,0.72)",   // raised from 0.55 → better contrast
    low:      "rgba(242,237,227,0.42)",   // raised from 0.28
    border:   "#2a2724",
    border2:  "#3a3733",
    accent:   "#8be000",                  // bright green on dark bg (hue 92°)
    accent2:  "#72c200",
    accentBg: "rgba(139,224,0,0.08)",
    card:     "#1a1916",
    shadow:   "0 4px 32px rgba(0,0,0,0.45)",
  },
  light: {
    bg:       "#f8f5ee",
    bg2:      "#f0ece2",
    bg3:      "#e8e3d8",
    text:     "#0e0d0c",
    mid:      "rgba(14,13,12,0.78)",      // raised from 0.6 → better contrast
    low:      "rgba(14,13,12,0.52)",      // raised from 0.35
    border:   "#ddd8ce",
    border2:  "#ccc7bc",
    accent:   "#3d7200",                  // dark green on cream (hue 92°, ~6:1 contrast)
    accent2:  "#2f5e00",
    accentBg: "rgba(61,114,0,0.07)",
    card:     "#ffffff",
    shadow:   "0 4px 32px rgba(0,0,0,0.08)",
  },
};
