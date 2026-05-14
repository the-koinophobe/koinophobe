/**
 * CaseCarousel — horizontal drag-to-scroll case study cards.
 * Inspired by Aceternity UI's Apple Cards Carousel pattern.
 * Self-contained: uses motion/react for drag, zero extra deps.
 *
 * Usage:
 *   <CaseCarousel cases={CASES} t={t} go={go} />
 */
import { useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { TbWorldWww, TbArrowRight } from "react-icons/tb";
import type { Case, Theme, GoFn } from "../types";
import { EASE } from "../theme";

interface CaseCarouselProps {
  cases: Case[];
  t:     Theme;
  go:    GoFn;
}

export default function CaseCarousel({ cases, t, go }: CaseCarouselProps) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const x         = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const CARD_W    = 360;
  const GAP       = 20;

  return (
    <div style={{ overflow: "hidden", cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}>
      <motion.div
        ref={trackRef}
        style={{ x, display: "flex", gap: GAP, paddingBottom: 16 }}
        drag="x"
        dragConstraints={{ left: -((CARD_W + GAP) * cases.length - (typeof window !== "undefined" ? window.innerWidth - 2 * 56 : 800)), right: 0 }}
        dragElastic={0.08}
        dragTransition={{ bounceDamping: 28, bounceStiffness: 300 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileTap={{ cursor: "grabbing" }}
      >
        {cases.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            style={{
              flexShrink: 0, width: CARD_W,
              border: `1px solid ${t.border}`, borderRadius: 6,
              background: t.card, overflow: "hidden",
              pointerEvents: isDragging ? "none" : "auto",
            }}
          >
            {/* Thumbnail */}
            <div style={{ background: t.bg3, height: 200, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`, backgroundSize: "32px 32px" }}>
              <TbWorldWww size={32} style={{ color: t.low }} />
              <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 2, background: t.bg, border: `1px solid ${t.border2}`, color: c.type === "agency" ? "#7dd3fc" : t.accent }}>{c.tag}</div>
              {/* Accent bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${t.accent}, transparent)` }} />
            </div>

            <div style={{ padding: "1.5rem" }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                {c.industry} · {c.location}
              </div>
              <h3 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.05rem", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 10 }}>
                {c.title}
              </h3>
              <p style={{ fontSize: 13, color: t.mid, lineHeight: 1.6, marginBottom: "1.25rem" }}>
                {c.short}
              </p>

              {/* Metric row */}
              <div style={{ display: "flex", gap: "1.25rem", paddingTop: "1rem", borderTop: `1px solid ${t.border}`, marginBottom: "1.25rem" }}>
                {c.metrics.slice(0, 2).map((m, j) => (
                  <div key={j}>
                    <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.35rem", fontWeight: 700, color: t.accent, letterSpacing: "-0.04em", lineHeight: 1 }}>{m.val}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.08em", marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => { go(`case:${c.slug}`); window.scrollTo(0, 0); }}
                whileHover={{ x: 4 }}
                style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: t.accent, background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                View case study <TbArrowRight size={12} />
              </motion.button>
            </div>
          </motion.div>
        ))}

        {/* End spacer */}
        <div style={{ flexShrink: 0, width: 56 }} />
      </motion.div>

      {/* Drag hint fade */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16, gap: 6 }}>
        {cases.map((_, i) => (
          <div key={i} style={{ width: 24, height: 2, borderRadius: 2, background: t.border2 }} />
        ))}
      </div>
    </div>
  );
}
