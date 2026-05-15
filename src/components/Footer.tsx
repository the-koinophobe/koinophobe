import { motion } from "motion/react";
import { TbBrandLinkedin, TbBrandX, TbBrandInstagram } from "react-icons/tb";
import type { FooterProps } from "../types";
import { LogoSVG } from "./LogoSVG";
import { BRAND_GREEN } from "../theme";

type FooterCol = { h: string; items: [string, string][] };

const COLS: FooterCol[] = [
  { h: "Services",   items: [["WordPress Design","services"],["Local SEO","services"],["AEO — AI Overviews","services"],["Full Stack Package","contact"],["Site Audits","contact"]] },
  { h: "Company",    items: [["Work","work"],["Process","process"],["Blog","blog"],["Contact","contact"]] },
  { h: "Industries", items: [["Legal & Law","services"],["Healthcare","services"],["Home Services","services"],["Restaurants","services"],["Real Estate","services"]] },
];

const SOCIAL_ICONS = [TbBrandLinkedin, TbBrandX, TbBrandInstagram] as const;

export default function Footer({ t, go }: FooterProps) {
  return (
    <footer style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "4.5rem clamp(1.25rem,3.5vw,3.5rem) 2.5rem" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="fg" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3.5rem", marginBottom: "3.5rem", paddingBottom: "3.5rem", borderBottom: `1px solid ${t.border}` }}>
          <div>
            <LogoSVG color={BRAND_GREEN} size={38} />
            <div style={{ height: 10 }} />
            <p style={{ fontSize: 13, color: t.low, lineHeight: 1.7, maxWidth: "26ch", marginBottom: 16 }}>
              WordPress design, local SEO, and AEO for US service businesses that refuse to be invisible.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: t.accent }}>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent }} />
              Available for new projects
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.h}>
              <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: t.low, marginBottom: 16 }}>{col.h}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {col.items.map(([l, p]) => (
                  <li key={l}>
                    <motion.button onClick={() => go(p)} whileHover={{ color: t.text, x: 3 }}
                      style={{ fontSize: 13, color: t.mid, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      {l}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.06em" }}>
            © 2026 Koinophobe — All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {SOCIAL_ICONS.map((Icon, i) => (
              <motion.a key={i} href="#" whileHover={{ color: t.accent, y: -2 }} style={{ color: t.low, textDecoration: "none" }}>
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <style>{`.fg{grid-template-columns:2fr 1fr 1fr 1fr!important;}@media(max-width:900px){.fg{grid-template-columns:1fr 1fr!important;gap:2rem!important;}}@media(max-width:500px){.fg{grid-template-columns:1fr!important;}}`}</style>
    </footer>
  );
}
