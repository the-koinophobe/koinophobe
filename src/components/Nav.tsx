import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { TbSun, TbMoon, TbMenu2, TbX, TbArrowUpRight } from "react-icons/tb";
import { Btn } from "./ui";
import StaggeredMenu from "./ui/staggered-menu";
import type { NavProps } from "../types";
import { LogoSVG } from "./LogoSVG";
import { BRAND_GREEN } from "../theme";

const LINKS = [
  { l: "Services", p: "services" },
  { l: "Work",     p: "work" },
  { l: "Process",  p: "process" },
  { l: "Blog",     p: "blog" },
] as const;

export default function Nav({ t, dark, setDark, page, go }: NavProps) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  const nav = (p: string) => { go(p); setOpen(false); };

  return (
    <>
      <motion.nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, padding: "1.1rem 3.5rem" }}>
        <motion.div style={{ position: "absolute", inset: 0, background: t.bg, opacity: bgOpacity, borderBottom: `1px solid ${t.border}` }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", position: "relative", zIndex: 1 }}>
          <motion.button onClick={() => nav("home")} whileHover={{ opacity: 0.8 }}
            style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0, display: "flex", alignItems: "center" }}>
            <LogoSVG color={BRAND_GREEN} size={34} />
          </motion.button>

          <div className="nd" style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
            {LINKS.map((l) => (
              <motion.button key={l.p} onClick={() => nav(l.p)} whileHover={{ color: t.text }}
                style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: page === l.p ? t.accent : t.mid, background: "none", border: "none", cursor: "pointer", position: "relative" }}>
                {l.l}
                {page === l.p && (
                  <motion.div layoutId="nav-underline"
                    style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1, background: t.accent }} />
                )}
              </motion.button>
            ))}

            <motion.button onClick={() => setDark(!dark)} whileTap={{ scale: 0.9 }}
              style={{ background: t.bg3, border: `1px solid ${t.border}`, borderRadius: 20, padding: "5px 11px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: t.mid }}>
              <AnimatePresence mode="wait">
                <motion.span key={dark ? "sun" : "moon"}
                  initial={{ rotate: -20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 20, opacity: 0 }}
                  transition={{ duration: 0.18 }}>
                  {dark ? <TbSun size={13} /> : <TbMoon size={13} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <Btn onClick={() => nav("contact")} t={t} icon={<TbArrowUpRight size={13} />}>Book a Call</Btn>
          </div>

          <motion.button className="nm" onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }}
            style={{ background: "none", border: "none", cursor: "pointer", color: t.text }}>
            {open ? <TbX size={22} /> : <TbMenu2 size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* StaggeredMenu — ReactBits GSAP-powered staggered nav */}
      <StaggeredMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        backgroundColor={t.bg}
        textColor={t.text}
        accentColor={t.accent}
        links={[
          ...LINKS.map(l => ({ label: l.l, onClick: () => nav(l.p) })),
          { label: "Book a Call", onClick: () => nav("contact") },
        ]}
      />

      <style>{`
        @media(max-width:768px){.nd{display:none!important;}.nm{display:flex!important;}}
        @media(min-width:769px){.nm{display:none!important;}}
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}body{overflow-x:hidden;}button{font-family:inherit;}
      `}</style>
    </>
  );
}
