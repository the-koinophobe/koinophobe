import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TbArrowUpRight, TbBrandGoogle } from "react-icons/tb";
import { Reveal, Label } from "./ui";
import { EASE } from "../theme";
import { Meteors } from "./ui/meteors";
import { LOGO_B64 } from "../assets/logo_b64";
import { LogoSVG } from "./LogoSVG";
import type { Theme } from "../types";
import type { ReactNode } from "react";

// ─── LOGO PATTERN BACKGROUND (95% transparency = 5% opacity) ─────────────────
function LogoPattern({ size = 100 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `url("${LOGO_B64}")`,
        backgroundRepeat: "repeat",
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: "center top",
        opacity: 0.05,
        zIndex: 1,
      }}
    />
  );
}

// ─── PAGE HERO ────────────────────────────────────────────────────────────────
interface PageHeroProps {
  t: Theme;
  label: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHero({ t, label, title, subtitle, children }: PageHeroProps) {
  return (
    <div style={{
      background: t.bg2, borderBottom: `1px solid ${t.border}`,
      padding: "9rem 3.5rem 5rem", position: "relative", overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`,
        backgroundSize: "56px 56px", opacity: 0.35,
      }} />
      {/* Logo pattern at 95% transparency */}
      <LogoPattern size={120} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Label text={label} t={t} />
          <h1 style={{
            fontFamily: "'Clash Grotesk',system-ui,sans-serif",
            fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 700,
            lineHeight: 1.0, letterSpacing: "-0.03em", color: t.text,
            marginBottom: subtitle ? "1.25rem" : 0, maxWidth: "20ch",
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: "clamp(15px,1.5vw,18px)", color: t.mid, lineHeight: 1.7, maxWidth: "52ch" }}>
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// ─── CTA STRIP ────────────────────────────────────────────────────────────────
interface CTAStripProps {
  t: Theme;
  go: (page: string) => void;
  hed?: string;
  sub?: string;
  btn?: string;
}

export function CTAStrip({
  t, go,
  hed = "Ready to stop being invisible?",
  sub = "No pitch. No pressure. 30 minutes and we'll tell you exactly what we'd do.",
  btn = "Book a Free Call",
}: CTAStripProps) {
  return (
    <section style={{ background: t.accent, padding: "6rem 3.5rem", position: "relative", overflow: "hidden" }}>
      <Meteors number={22} className="[&>span]:bg-black [&>span]:before:from-black/60" />
      {/* Tiled white logo at 5% opacity */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 301 294'%3E%3Cpath fill='%23ffffff' d='M199,1C231,1 263,1 295.7,1.4C298.8,1.7 299.3,3.1 299,5.2C297.3,16.3 296.4,27.5 293.9,38.4C288.9,59.8 278.6,78.8 262.9,94.2C252.8,104.1 241.2,112.7 229.5,120.8C215,130.8 199.7,139.7 184.7,149C167.3,159.9 150.5,171.3 135.6,185.6C119.9,200.8 113.1,219.3 112.1,240.3C111.2,258.5 111.3,276.8 111,295C74.5,295 37.9,295 1,295C1,286.3 1,277.6 1.4,268.3C2.2,261.1 1.7,254.3 3.2,248C6.7,232.2 11.8,216.9 19.9,202.7C30.4,184.1 44.3,168.8 61.3,156.1C82.2,140.5 103.4,125.1 123.6,108.4C136.1,98.1 147.9,86.4 158.3,73.8C172.3,56.8 183.2,37.7 189.2,16C190.8,10.5 191.4,3.1 199,1z'/%3E%3Cpath fill='%23ffffff' d='M1,103C1,69.6 1,36.3 1.5,2.5C38.5,2 75.1,2 111.8,2C111.5,6.3 111.4,10.2 110.9,14C109.7,23.5 108.3,33 107,42.5C106.2,48.4 105.2,54.4 105,60.4C104.6,70.7 104,81.2 105,91.4C105.9,100 105.9,102.9 100.6,106.9C91.3,113.8 82,120.9 72.7,127.8C60.5,136.8 48.2,145.7 35.9,154.5C34.6,155.4 31.8,155.8 30.8,155C18.3,146 10.1,133.8 5.1,119.5C3.2,114.2 2.3,108.5 1,103z'/%3E%3Cpath fill='%23ffffff' d='M202.5,295C199.3,292.4 198.9,289.3 198.9,285.7C199.4,265.3 196.9,245.3 186.8,227.2C182.3,219.1 176,211.8 170,204.7C165.1,199 159.4,194 153.5,188.2C168.3,178.6 182.7,169.3 197.1,160C200.4,157.9 203.8,156.2 207,153.9C211.6,150.7 215.8,151 220.6,154.1C238.5,165.9 255.3,179.2 268.9,195.8C285.8,216.3 295.8,240.6 301,266.7C301.2,267.7 301.2,268.7 301.6,269.9C302,278.3 302,286.6 302,295C269,295 236,295 202.5,295z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "110px 110px",
          backgroundPosition: "center top",
          opacity: 0.07,
          zIndex: 1,
        }}
      />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "'Clash Grotesk',system-ui,sans-serif",
        fontSize: "16vw", fontWeight: 700, color: "rgba(14,13,12,0.05)",
        whiteSpace: "nowrap", pointerEvents: "none",
        letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none",
        zIndex: 1,
      }}>
        ordinary?
      </div>
      <Reveal>
        <div style={{
          maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 2,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: "3rem", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* White logo mark in CTA */}
            <LogoSVG color="#ffffff" size={32} />
            <h2 style={{
              fontFamily: "'Clash Grotesk',system-ui,sans-serif",
              fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700,
              color: "#0e0d0c", lineHeight: 1.0, letterSpacing: "-0.03em",
            }}>
              {hed}
            </h2>
            <p style={{ fontSize: 16, color: "rgba(14,13,12,0.65)", maxWidth: "42ch", lineHeight: 1.65 }}>
              {sub}
            </p>
          </div>
          <motion.button
            onClick={() => go("contact")}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "#0e0d0c", color: "#c8f23a",
              fontFamily: "monospace", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "18px 32px", borderRadius: 2, border: "none",
              cursor: "pointer", display: "inline-flex", alignItems: "center",
              gap: 10, flexShrink: 0,
            }}
          >
            {btn} <TbArrowUpRight size={14} />
          </motion.button>
        </div>
      </Reveal>
    </section>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
export function Marquee({ items, t }: { items: string[]; t: Theme }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", background: t.accent, padding: "11px 0", whiteSpace: "nowrap" }}>
      <motion.div
        style={{ display: "inline-flex" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "monospace", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: t.bg, padding: "0 2.5rem",
            display: "inline-flex", alignItems: "center", gap: "2.5rem",
          }}>
            {item}<span style={{ fontSize: 9, opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── GSC PANEL ───────────────────────────────────────────────────────────────
export function GSCPanel({ c, t }: { c: { gsc: { clicks: number | string; impressions: string; ctr: string; pos: string; note: string } }; t: Theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.97 }}
        style={{
          background: t.accentBg, border: `1px solid ${t.border2}`, borderRadius: 2,
          padding: "6px 12px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 7, marginBottom: 10,
        }}
      >
        <TbBrandGoogle size={12} style={{ color: t.accent }} />
        <span style={{
          fontFamily: "monospace", fontSize: 9, letterSpacing: "0.1em",
          textTransform: "uppercase", color: t.mid,
        }}>
          {open ? "Hide" : "Show"} GSC data
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              background: t.bg3, border: `1px solid ${t.border}`,
              borderRadius: 3, padding: "1rem 1.25rem", marginBottom: 10,
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                border: `1px solid ${t.border}`, borderRadius: 2,
                overflow: "hidden", marginBottom: 12,
              }}>
                {[
                  { l: "Clicks",      v: c.gsc.clicks },
                  { l: "Impressions", v: c.gsc.impressions },
                  { l: "CTR",         v: c.gsc.ctr },
                  { l: "Avg Pos",     v: c.gsc.pos },
                ].map((g, k) => (
                  <div key={k} style={{
                    padding: "8px 10px", textAlign: "center",
                    borderRight: k < 3 ? `1px solid ${t.border}` : "none",
                  }}>
                    <div style={{
                      fontFamily: "'Clash Grotesk',system-ui,sans-serif",
                      fontSize: "1rem", fontWeight: 700, color: t.accent, lineHeight: 1,
                    }}>
                      {g.v}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, marginTop: 3 }}>
                      {g.l}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12.5, color: t.mid, lineHeight: 1.65 }}>
                <strong style={{ color: t.text }}>Insight: </strong>{c.gsc.note}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
