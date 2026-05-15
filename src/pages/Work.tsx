import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TbWorldWww, TbArrowLeft, TbArrowRight, TbArrowUpRight, TbBrandGoogle } from "react-icons/tb";
import { Reveal, Btn } from "../components/ui";
import { CTAStrip, GSCPanel } from "../components/sections";

import { CASES } from "../data/content";
import { EASE } from "../theme";
import type { WorkProps, Case } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface CaseDetailProps { c: Case; t: WorkProps["t"]; go: WorkProps["go"]; setSlug: WorkProps["setSlug"]; }

function CaseDetail({ c, t, go, setSlug }: CaseDetailProps) {
  const idx = CASES.findIndex(x => x.slug === c.slug);
  const nextCase = CASES[(idx + 1) % CASES.length];
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
      <div style={{ background: t.bg2, borderBottom: `1px solid ${t.border}`, padding: "clamp(6rem,9vw,9rem) clamp(1.25rem,3.5vw,3.5rem) 4rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <motion.button onClick={() => { setSlug(null); go("work"); window.scrollTo(0, 0); }} whileHover={{ x: -4 }}
            style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: t.mid, background: "none", border: "none", cursor: "pointer", marginBottom: "2.5rem" }}>
            <TbArrowLeft size={14} /> Back to Work
          </motion.button>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2, background: t.bg, border: `1px solid ${t.border2}`, color: c.type === "agency" ? "#7dd3fc" : t.accent }}>{c.tag}</div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.industry} · {c.location} · {c.year}</div>
          </div>
          <h1 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(2rem,4vw,3.75rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.025em", color: t.text, marginBottom: "1rem" }}>{c.title}</h1>
          <p style={{ fontSize: 18, color: t.mid, lineHeight: 1.7, maxWidth: "56ch" }}>{c.short}</p>
        </div>
      </div>

      <div style={{ background: t.bg3, aspectRatio: "21/9", maxHeight: 460, display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`, backgroundSize: "56px 56px" }}>
        <div style={{ textAlign: "center" }}>
          <TbWorldWww size={44} style={{ color: t.low }} />
          <div style={{ fontFamily: "monospace", fontSize: 11, color: t.low, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 12 }}>Add project screenshot here</div>
        </div>
      </div>

      <div style={{ background: t.accent, padding: "2rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", gap: "3rem", flexWrap: "wrap", justifyContent: "space-between" }}>
          {c.metrics.map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "2rem", fontWeight: 700, color: "#0e0d0c", letterSpacing: "-0.04em", lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(14,13,12,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section style={{ background: t.bg, padding: "clamp(3rem,6vw,6rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div className="cbd" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "5rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {([["The Challenge", c.challenge], ["The Solution", c.solution], ["The Result", c.result]] as [string, string][]).map(([label, text], i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: t.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{label}</div>
                <p style={{ fontSize: 16, color: t.mid, lineHeight: 1.8 }}>{text}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Reveal>
              <div style={{ border: `1px solid ${t.border}`, borderRadius: 3, overflow: "hidden", background: t.card }}>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <TbBrandGoogle size={14} style={{ color: t.accent }} />
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase" }}>Google Search Console</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${t.border}` }}>
                  {([["Clicks", String(c.gsc.clicks)], ["Impressions", c.gsc.impressions], ["CTR", c.gsc.ctr], ["Avg Position", c.gsc.pos]] as [string, string][]).map(([l, v], k) => (
                    <div key={k} style={{ padding: "1rem 1.25rem", textAlign: "center", borderRight: k % 2 === 0 ? `1px solid ${t.border}` : "none", borderBottom: k < 2 ? `1px solid ${t.border}` : "none" }}>
                      <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.4rem", fontWeight: 700, color: t.accent, lineHeight: 1 }}>{v}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontSize: 13, color: t.mid, lineHeight: 1.65 }}><strong style={{ color: t.text }}>What the data shows: </strong>{c.gsc.note}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ border: `1px solid ${t.border}`, borderRadius: 3, padding: "1.5rem", background: t.card }}>
                {([["Duration", c.duration], ["Services", c.pills.join(", ")], ["Year", c.year], ["Type", c.tag]] as [string, string][]).map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: "0.75rem 0", borderBottom: i < 3 ? `1px solid ${t.border}` : "none" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</span>
                    <span style={{ fontSize: 13, color: t.text, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}><Btn onClick={() => go("contact")} t={t} full icon={<TbArrowUpRight size={13} />}>Start a similar project</Btn></Reveal>
          </div>
        </div>
        <style>{`.cbd{grid-template-columns:2fr 1fr!important;}@media(max-width:900px){.cbd{grid-template-columns:1fr!important;gap:3rem!important;}}`}</style>
      </section>

      <section style={{ background: t.bg2, borderTop: `1px solid ${t.border}`, padding: "clamp(2.5rem,4vw,4rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.15em", textTransform: "uppercase" }}>Next case study</div>
          <motion.button onClick={() => { setSlug(nextCase.slug); go("work", nextCase.slug); window.scrollTo(0, 0); }} whileHover={{ x: 6 }}
            style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(1rem,2vw,1.5rem)", fontWeight: 700, color: t.text, background: "none", border: "none", cursor: "pointer" }}>
            {nextCase.title} <TbArrowRight size={20} style={{ color: t.accent }} />
          </motion.button>
        </div>
      </section>
      <CTAStrip t={t} go={go} hed="Your competitors have case studies like these. Do you want to be next?" sub="Tell us your market. We will tell you what it takes to rank there." btn="Get a Free Audit" />
    </motion.div>
  );
}

export default function Work({ t, go, slug, setSlug }: WorkProps) {
  useDocumentMeta({ title: "Case Studies — Local SEO & WordPress Results | koinophobe.dev", description: "Real GSC data from real US service businesses. Map pack rankings, AI Overview citations, and WordPress builds that convert. See the proof.", canonicalPath: "/work" });
  const [filter, setFilter] = useState<"all" | "agency" | "freelance">("all");
  if (slug) {
    const c = CASES.find(x => x.slug === slug);
    if (!c) return null;
    return <CaseDetail c={c} t={t} go={go} setSlug={setSlug} />;
  }
  const filtered = filter === "all" ? CASES : CASES.filter(c => c.type === filter);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>

      <section style={{ background: t.bg, padding: "clamp(3rem,6vw,6rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: "3.5rem", flexWrap: "wrap" }}>
            {(["all", "agency", "freelance"] as const).map(f => (
              <motion.button key={f} onClick={() => setFilter(f)} whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "7px 16px", border: `1px solid ${filter === f ? t.accent : t.border2}`, borderRadius: 2, cursor: "pointer", color: filter === f ? t.accent : t.low, background: filter === f ? t.accentBg : "transparent", transition: "all 0.2s" }}>
                {f}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="popLayout">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {filtered.map((c, i) => (
                <motion.article key={c.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
                  style={{ border: `1px solid ${t.border}`, borderRadius: 3, background: t.card, overflow: "hidden", display: "grid", gridTemplateColumns: "280px 1fr" }} className="cli">
                  <div style={{ background: t.bg3, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`, backgroundSize: "40px 40px" }}>
                    <TbWorldWww size={28} style={{ color: t.low }} />
                    <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 2, background: t.bg, border: `1px solid ${t.border2}`, color: c.type === "agency" ? "#7dd3fc" : t.accent }}>{c.tag}</div>
                  </div>
                  <div style={{ padding: "2.25rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{c.industry} · {c.location} · {c.year}</div>
                      <h2 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(1.15rem,2vw,1.55rem)", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 8 }}>{c.title}</h2>
                      <p style={{ fontSize: 14, color: t.mid, lineHeight: 1.7 }}>{c.desc}</p>
                    </div>
                    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", paddingTop: "1.25rem", borderTop: `1px solid ${t.border}` }}>
                      {c.metrics.map((m, j) => (
                        <div key={j}>
                          <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.35rem", fontWeight: 700, color: t.accent, letterSpacing: "-0.03em", lineHeight: 1 }}>{m.val}</div>
                          <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <GSCPanel c={c} t={t} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {c.pills.map((p, j) => (
                          <span key={j} style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: `1px solid ${t.border2}`, borderRadius: 2, color: t.low }}>{p}</span>
                        ))}
                      </div>
                      <Btn onClick={() => { setSlug(c.slug); go("work", c.slug); window.scrollTo(0, 0); }} t={t} variant="ghost" icon={<TbArrowRight size={13} />}>Full case study</Btn>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>
      <style>{`.cli{grid-template-columns:280px 1fr!important;}@media(max-width:768px){.cli{grid-template-columns:1fr!important;}.cli>div:first-child{min-height:160px;}}`}</style>
      <CTAStrip t={t} go={go} hed="Your competitors have case studies like these. Do you want to be next?" sub="Tell us your market. We will tell you what it takes to rank there." btn="Get a Free Audit" />
    </motion.div>
  );
}
