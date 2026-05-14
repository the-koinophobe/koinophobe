import { useRef, useEffect, useState, type CSSProperties } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "../theme";
import type { RevealProps, LabelProps, HedProps, EmProps, BtnProps, CounterProps } from "../types";

export function Reveal({ children, delay = 0, style = {}, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-56px" });
  return (
    <motion.div ref={ref} style={style} className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export function Label({ text, t }: LabelProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 22, height: 1, background: t.accent, flexShrink: 0 }} />
      <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: t.accent }}>
        {text}
      </span>
    </div>
  );
}

export function Hed({ children, style = {}, t }: HedProps) {
  return (
    <h2 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(2rem,3.5vw,3.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.025em", color: t.text, ...style }}>
      {children}
    </h2>
  );
}

export function Em({ children, t }: EmProps) {
  return <em style={{ fontStyle: "italic", color: t.accent, fontWeight: 400 }}>{children}</em>;
}

export function Btn({ children, onClick, href, variant = "primary", t, icon, full = false, style = {} }: BtnProps) {
  const base: CSSProperties = {
    fontFamily: "monospace", fontSize: 12, fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase",
    padding: "13px 24px", borderRadius: 2, textDecoration: "none",
    display: "inline-flex", alignItems: "center", gap: 8,
    cursor: "pointer", border: "none", whiteSpace: "nowrap",
    width: full ? "100%" : "auto",
    justifyContent: full ? "center" : "flex-start",
    ...style,
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: t.accent,                    color: t.bg },
    dark:    { background: t.text,                      color: t.bg },
    ghost:   { background: "transparent", color: t.mid, border: `1px solid ${t.border2}` },
    outline: { background: "transparent", color: t.accent, border: `1px solid ${t.accent}` },
    accent:  { background: t.accent,                    color: "#0e0d0c" },
  };
  const El = href ? motion.a : motion.button;
  return (
    <El href={href} onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
      style={{ ...base, ...variants[variant] }}>
      {children}{icon}
    </El>
  );
}

export function Counter({ to, suffix = "", duration = 2 }: CounterProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export function Divider({ t }: { t: import("../types").Theme }) {
  return <div style={{ height: 1, background: t.border, width: "100%" }} />;
}
