import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbWorldWww, TbMapPin, TbArrowUpRight, TbArrowRight,
  TbCircleCheck, TbMessageCircle, TbBrain, TbAlertTriangle,
} from "react-icons/tb";
import { Reveal, Label, Hed, Em, Btn, Counter } from "../components/ui";
import MagnetLines from "../components/ui/magnet-lines";
import { Marquee, CTAStrip } from "../components/sections";
import { EASE } from "../theme";
import type { WithThemeAndGo } from "../types";
import AppleCardsCarouselDemo from "../components/apple-cards-carousel-demo";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ t, go }: WithThemeAndGo) {
  useDocumentMeta({ title: "koinophobe.dev — WordPress Design & Local SEO for US Service Businesses", description: "Custom WordPress sites, local SEO, and AEO for US service businesses. Get found on Google, rank in the map pack, and get cited in AI Overviews. 355K impressions in 6 months.", canonicalPath: "/" });
  const { scrollY } = useScroll();

  // ─── GSAP: counter animation for the 3 stats ──────────────────────────────
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Hero heading word slide-in ────────────────────────────────────────
      gsap.from(".hero-word", {
        y: "110%", opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.2,
      });

      // ─── Service cards stagger on scroll ──────────────────────────────────
      // Small delay so Reveal's parent animation completes first
      gsap.from(".gsap-svc-card", {
        scrollTrigger: { trigger: ".gsap-svc-section", start: "top 75%", once: true },
        y: 40, opacity: 0, duration: 0.55, stagger: 0.09, ease: "power3.out",
      });

      // ─── Horizontal parallax on section labels ─────────────────────────────
      gsap.utils.toArray<HTMLElement>(".gsap-label-slide").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          x: -20, opacity: 0, duration: 0.45, ease: "power2.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);
  const y = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {/* ICP BAR */}
      <div style={{
        background: t.bg3, borderBottom: `1px solid ${t.border}`,
        padding: "10px clamp(1.25rem, 3.5vw, 3.5rem)", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10, flexWrap: "wrap",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent, flexShrink: 0 }} />
        <span style={{ fontFamily: "monospace", fontSize: 11, color: t.mid, letterSpacing: "0.08em", textAlign: "center" }}>
          Right now, someone in your city is Googling what you do. Google is deciding whether to send them to you — or your competitor.
        </span>
      </div>

      {/* HERO */}
      <section style={{ background: t.bg, position: "relative", overflow: "hidden", minHeight: "46svh" }}>
        <MagnetLines
          rows={20} columns={20} containerSize="100%"
          lineColor={t.border} lineWidth="1px" lineHeight="20px" baseAngle={-10}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", pointerEvents: "none" }}
        />

        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }} className="hero-grid">
          <motion.div style={{
            y, padding: "3.5rem 2rem 3rem",
            display: "flex", flexDirection: "column", justifyContent: "center",
            position: "relative", zIndex: 2,
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              style={{
                fontFamily: "'Clash Grotesk',system-ui,sans-serif",
                fontSize: "clamp(2.75rem,5vw,5.5rem)", fontWeight: 600,
                lineHeight: 1.0, letterSpacing: "-0.035em",
                color: t.text, marginBottom: "1.5rem",
              }}
            >
              Your competitors are{" "}
              <em style={{ fontStyle: "italic", color: t.accent, fontWeight: 400 }}>getting your calls.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
              style={{ fontSize: "clamp(15px,1.5vw,18px)", color: t.mid, maxWidth: "44ch", lineHeight: 1.75, marginBottom: "2.5rem" }}
            >
              Every day your site sits invisible on Google is a day you're paying your competitors' marketing bills. We build the site and run the SEO that puts you in front of customers who are actively looking — before someone else takes that spot permanently.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Btn onClick={() => go("contact")} t={t} icon={<TbArrowUpRight size={13} />}>
                Get Your Site Ranking
              </Btn>
              <Btn onClick={() => go("work")} t={t} variant="ghost" icon={<TbArrowRight size={13} />}>
                See the proof
              </Btn>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{ display: "flex", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}
            >
              {[
                { val: "355K", label: "Impressions, 1 client, 6 months" },
                { val: "Top 3", label: "Map pack placements" },
                { val: "96", label: "Avg PageSpeed score" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: "'Clash Grotesk',system-ui,sans-serif",
                    fontSize: "1.6rem", fontWeight: 700, color: t.accent,
                    letterSpacing: "-0.04em", lineHeight: 1,
                  }}>{s.val}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.08em", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right col */}
          <div className="hero-right" style={{ position: "relative", borderLeft: `1px solid ${t.border}`, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 2.5rem" }}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(2.5rem,4.5vw,5rem)", fontWeight: 700, color: t.low, lineHeight: 1.05, letterSpacing: "-0.04em" }}
              >
                koinophobe
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.65, ease: EASE }}
                style={{ border: `1px solid ${t.border2}`, borderRadius: 3, padding: "1.6rem 2rem", margin: "1.75rem 0", background: t.bg2 }}
              >
                <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: t.accent, marginBottom: 10 }}>
                  / koi·no·phobe / noun
                </div>
                <p style={{ fontSize: 14, color: t.mid, lineHeight: 1.7 }}>
                  Someone with an{" "}
                  <strong style={{ color: t.text, fontWeight: 600 }}>intense fear of the ordinary.</strong>{" "}
                  Of blending in. Of having a website that looks exactly like every other contractor in their city — invisible, forgettable, and quietly handing customers to whoever ranked above them.<br /><br />
                  We build for people who refuse that outcome.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(1.5rem,3vw,3rem)", fontWeight: 700, color: t.low, lineHeight: 1.05, letterSpacing: "-0.04em" }}
              >
                not average
              </motion.div>
            </div>

            <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <motion.div
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 1, height: 52, background: `linear-gradient(to bottom,${t.accent},transparent)` }}
              />
              <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: t.low, writingMode: "vertical-rl" }}>
                Scroll
              </span>
            </div>
          </div>
        </div>

        <style>{`
          .hero-grid{display:grid;grid-template-columns:1fr 1fr;min-height:46svh;}
          .hero-right{display:block;}
          @media(max-width:768px){.hero-grid{grid-template-columns:1fr;}.hero-right{display:none;}}
        `}</style>
      </section>

      <Marquee t={t} items={["WordPress Design", "Local SEO", "AEO", "AI Overviews", "Google Business Profile", "WooCommerce", "Citation Building", "Page Speed", "Schema Markup", "Map Pack Rankings", "FAQ Schema"]} />

      {/* THE COST OF INVISIBILITY */}
      <section style={{ background: t.bg2, borderBottom: `1px solid ${t.border}`, padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div className="mg" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "6rem", alignItems: "start" }}>
          <Reveal>
            <div className="gsap-label-slide"><Label text="What Invisibility Costs You" t={t} /></div>
            <Hed t={t}>Every month you wait<br /><Em t={t}>is revenue gone.</Em></Hed>
            {/* ─── 3 metrics horizontal ─── */}
            <div ref={statsRef} className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0", marginTop: "2rem", border: `1px solid ${t.border}`, borderRadius: 3, overflow: "hidden" }}>
              {[
                { to: 76, suffix: "%",  label: "of local searches result in a store visit or call within 24 hours — if the business shows up" },
                { to: 60, suffix: "%",  label: "of searches now end without a click because AI answered it — from someone else's content" },
                { to: 27, suffix: "×",  label: "more clicks for position #1 vs position #10 — the gap compounds every single day" },
              ].map((s, i) => (
                <div key={i} className="stat-card" style={{ padding: "1.5rem 1.25rem", borderRight: i < 2 ? `1px solid ${t.border}` : "none", background: t.card }}>
                  <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(2rem,3.5vw,2.75rem)", fontWeight: 700, color: t.accent, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8 }}>
                    <Counter to={s.to} suffix={s.suffix} duration={1.8} />
                  </div>
                  <div style={{ fontSize: 12, color: t.mid, lineHeight: 1.55 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(16px,1.5vw,18px)", color: t.mid, lineHeight: 1.8 }}>
                Your competitors' websites are collecting the calls you should be getting. Not because they're better at what they do — but because they show up when someone searches, and you don't.{" "}
                <strong style={{ color: t.text, fontWeight: 600 }}>That's not a marketing problem. It's a revenue leak.</strong>
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div style={{ background: t.bg3, border: `1px solid ${t.border2}`, borderRadius: 3, padding: "1.5rem 2rem", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <TbAlertTriangle size={18} style={{ color: t.accent, flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 14, color: t.mid, lineHeight: 1.7 }}>
                  <strong style={{ color: t.text }}>The AI search shift made this urgent:</strong> Google AI Overviews now appear above every organic result, above the map pack, and above ads. If your competitor's content is what the AI cites, every person asking Google about your service category gets pointed to them — before they ever see your name.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div style={{ borderLeft: `3px solid ${t.accent}`, paddingLeft: "1.75rem", fontSize: "clamp(1.05rem,1.8vw,1.35rem)", fontStyle: "italic", color: t.text, lineHeight: 1.45, fontFamily: "'Clash Grotesk',system-ui,sans-serif" }}>
                "The longer you wait to fix this, the deeper the hole gets. Your competitors are compounding their ranking advantage every single week."
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <p style={{ fontSize: "clamp(16px,1.5vw,18px)", color: t.mid, lineHeight: 1.8 }}>
                We close that gap. A <strong style={{ color: t.text, fontWeight: 600 }}>custom WordPress site</strong> engineered to rank, combined with <strong style={{ color: t.text, fontWeight: 600 }}>local SEO and AEO</strong> that positions you as the answer both Google and its AI recommend.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                <Btn onClick={() => go("services")} t={t} variant="ghost" icon={<TbArrowRight size={13} />}>See services and pricing</Btn>
                <Btn onClick={() => go("process")} t={t} variant="ghost" icon={<TbArrowRight size={13} />}>How it works</Btn>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`.mg{grid-template-columns:1fr 2fr!important;}@media(max-width:900px){.mg{grid-template-columns:1fr!important;gap:3rem!important;}}.stats-grid{grid-template-columns:repeat(3,1fr)!important;}@media(max-width:600px){.stats-grid{grid-template-columns:1fr!important;}.stat-card{border-right:none!important;border-bottom:1px solid var(--border-col);}}`}</style>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="gsap-svc-section" style={{ background: t.bg, padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", gap: "2rem", flexWrap: "wrap" }}>
            <Reveal><Label text="What We Do" t={t} /><Hed t={t}>Three services.<br /><Em t={t}>One outcome: more calls.</Em></Hed></Reveal>
            <Reveal delay={0.1}><Btn onClick={() => go("services")} t={t} variant="ghost" icon={<TbArrowRight size={13} />}>Full pricing</Btn></Reveal>
          </div>
          <div className="spg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
            {[
              {
                icon: <TbWorldWww size={36} />, num: "01", name: "WordPress Web Design",
                price: "From $1,500", tag: "Fixed price",
                desc: "A slow, generic site doesn't just look bad — it actively kills your rankings. We build sites that Google trusts and visitors convert from.",
                features: ["Custom design, not a template", "SEO architecture from line one", "Schema markup built in", "PageSpeed 90+ target", "30-day post-launch support"],
              },
              {
                icon: <TbMapPin size={36} />, num: "02", name: "Local SEO",
                price: "$500/mo × 6 months", tag: "Fixed retainer",
                desc: "Get found in your city by people who are ready to call. Map pack, GBP, citations — the signals that put you in front of high-intent buyers.",
                features: ["Google Business Profile optimisation", "60+ US directory citations", "Monthly rank tracking", "GBP posts × 8/month", "Plain-English monthly report"],
              },
              {
                icon: <TbBrain size={36} />, num: "03", name: "AEO — AI Overviews",
                price: "Included in retainer", tag: "New in 2026",
                desc: "60% of searches now end without a click because AI answered the question. We make sure the AI is citing you, not your competitors.",
                features: ["FAQ schema markup", "AI Overview-optimised Q&A content", "LocalBusiness + Service schema", "Citation authority building", "GBP Q&A optimisation"],
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover="hov" initial="rest" animate="rest"
                  onClick={() => go("services")}
                  style={{ padding: "2.75rem", border: `1px solid ${t.border}`, borderRadius: 3, position: "relative", overflow: "hidden", cursor: "pointer", background: t.card, height: "100%" }}
                >
                  <motion.div
                    variants={{ rest: { scaleY: 0 }, hov: { scaleY: 1 } }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    style={{ position: "absolute", inset: 0, background: t.accent, transformOrigin: "bottom", zIndex: 0 }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", marginBottom: 16 }}>{s.num}</div>
                    <motion.div variants={{ rest: { color: t.accent }, hov: { color: t.bg } }}>{s.icon}</motion.div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", margin: "1rem 0 0.75rem", flexWrap: "wrap" }}>
                      <motion.h3 variants={{ rest: { color: t.text }, hov: { color: t.bg } }} style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{s.name}</motion.h3>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <motion.div variants={{ rest: { color: t.accent }, hov: { color: t.bg } }} style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.price}</motion.div>
                        <motion.div variants={{ rest: { color: t.low }, hov: { color: "rgba(14,13,12,0.6)" } }} style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{s.tag}</motion.div>
                      </div>
                    </div>
                    <motion.p variants={{ rest: { color: t.mid }, hov: { color: t.bg } }} style={{ fontSize: 14, lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "36ch" }}>{s.desc}</motion.p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, marginBottom: "1.75rem" }}>
                      {s.features.map((f, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <motion.span variants={{ rest: { color: t.accent }, hov: { color: t.bg } }}><TbCircleCheck size={13} /></motion.span>
                          <motion.span variants={{ rest: { color: t.mid }, hov: { color: t.bg } }} style={{ fontSize: 13 }}>{f}</motion.span>
                        </li>
                      ))}
                    </ul>
                    <motion.span variants={{ rest: { color: t.accent }, hov: { color: t.bg } }} style={{ fontSize: "1.4rem", display: "inline-block" }}>↗</motion.span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Bundle card */}
          <Reveal>
            <div style={{ border: `1px solid ${t.accent}`, borderRadius: 3, padding: "2.75rem", background: t.accentBg, position: "relative", overflow: "hidden" }}>
              {/* Logo pattern at 95% transparency — white on accent bg */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 301 294'%3E%3Cpath fill='%23ffffff' d='M199,1C231,1 263,1 295.7,1.4C298.8,1.7 299.3,3.1 299,5.2C297.3,16.3 296.4,27.5 293.9,38.4C288.9,59.8 278.6,78.8 262.9,94.2C252.8,104.1 241.2,112.7 229.5,120.8C215,130.8 199.7,139.7 184.7,149C167.3,159.9 150.5,171.3 135.6,185.6C119.9,200.8 113.1,219.3 112.1,240.3C111.2,258.5 111.3,276.8 111,295C74.5,295 37.9,295 1,295C1,286.3 1,277.6 1.4,268.3C2.2,261.1 1.7,254.3 3.2,248C6.7,232.2 11.8,216.9 19.9,202.7C30.4,184.1 44.3,168.8 61.3,156.1C82.2,140.5 103.4,125.1 123.6,108.4C136.1,98.1 147.9,86.4 158.3,73.8C172.3,56.8 183.2,37.7 189.2,16C190.8,10.5 191.4,3.1 199,1z'/%3E%3Cpath fill='%23ffffff' d='M1,103C1,69.6 1,36.3 1.5,2.5C38.5,2 75.1,2 111.8,2C111.5,6.3 111.4,10.2 110.9,14C109.7,23.5 108.3,33 107,42.5C106.2,48.4 105.2,54.4 105,60.4C104.6,70.7 104,81.2 105,91.4C105.9,100 105.9,102.9 100.6,106.9C91.3,113.8 82,120.9 72.7,127.8C60.5,136.8 48.2,145.7 35.9,154.5C34.6,155.4 31.8,155.8 30.8,155C18.3,146 10.1,133.8 5.1,119.5C3.2,114.2 2.3,108.5 1,103z'/%3E%3Cpath fill='%23ffffff' d='M202.5,295C199.3,292.4 198.9,289.3 198.9,285.7C199.4,265.3 196.9,245.3 186.8,227.2C182.3,219.1 176,211.8 170,204.7C165.1,199 159.4,194 153.5,188.2C168.3,178.6 182.7,169.3 197.1,160C200.4,157.9 203.8,156.2 207,153.9C211.6,150.7 215.8,151 220.6,154.1C238.5,165.9 255.3,179.2 268.9,195.8C285.8,216.3 295.8,240.6 301,266.7C301.2,267.7 301.2,268.7 301.6,269.9C302,278.3 302,286.6 302,295C269,295 236,295 202.5,295z'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "100px 100px", backgroundPosition: "center top", opacity: 0.07 }} />
              <div style={{ position: "absolute", top: -10, right: -10, fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "8rem", fontWeight: 700, color: t.accentBg, lineHeight: 1, letterSpacing: "-0.05em", pointerEvents: "none" }}>✦</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: t.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent }} />
                    Most Popular — Best Value — Every Signal Covered
                  </div>
                  <h3 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(1.35rem,2.5vw,1.75rem)", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", marginBottom: 10 }}>WordPress Design + Local SEO + AEO — The Full Stack</h3>
                  <p style={{ fontSize: 15, color: t.mid, lineHeight: 1.7, maxWidth: "56ch", marginBottom: 10 }}>A custom site, a 6-month SEO retainer, and full AEO setup built together as one system. This is the combination that covers every signal Google uses to decide whether to show you — or someone else — in organic results, the map pack, and AI Overviews.</p>
                  <p style={{ fontFamily: "monospace", fontSize: 11, color: t.low, letterSpacing: "0.06em" }}>Bundle pricing is always less than the three services combined separately.</p>
                </div>
                <Btn onClick={() => go("contact")} t={t} icon={<TbMessageCircle size={13} />} style={{ flexShrink: 0 }}>Get a Custom Quote</Btn>
              </div>
            </div>
          </Reveal>

          <style>{`.spg{grid-template-columns:1fr 1fr 1fr!important;}@media(max-width:900px){.spg{grid-template-columns:1fr 1fr!important;}}@media(max-width:580px){.spg{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section style={{ background: t.bg2, borderTop: `1px solid ${t.border}`, paddingTop: "clamp(4rem,8vw,8rem)", paddingBottom: "2rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(1.25rem,3.5vw,3.5rem)", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
            <Reveal><Label text="Recent Work" t={t} /><Hed t={t}>Results, not<Em t={t}> promises.</Em></Hed></Reveal>
            <Reveal delay={0.1}><Btn onClick={() => go("work")} t={t} variant="ghost" icon={<TbArrowRight size={13} />}>All case studies</Btn></Reveal>
          </div>
        </div>
        <AppleCardsCarouselDemo t={t} />
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <Label text="Client Results" t={t} />
            <Hed t={t} style={{ marginBottom: "3rem" }}>What happens when <Em t={t}>you actually rank.</Em></Hed>
          </Reveal>
          <div className="tg" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {[
              { q: "We went from page 3 to the top 3 map pack in our city within 4 months. The phone started ringing differently — calls from people who already decided they wanted to hire us, not just shopping around.", n: "Marcus T.", b: "HVAC Company — Dallas, TX" },
              { q: "Our old site was embarrassing. The new one looks like we're actually good at what we do. Clients mention it on the first call. Two competitors in our market have worse sites and I know exactly why they're losing jobs they should be getting.", n: "Diane K.", b: "Family Law Firm — Chicago, IL" },
              { q: "Two agencies before this. Both disappeared after launch. I get monthly reports that actually explain what moved and why, and when something wasn't working they told me and changed it. That's rare.", n: "Roberto V.", b: "Dental Practice — Miami, FL" },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="gsap-testi"
                  style={{ border: `1px solid ${t.border}`, borderRadius: 3, padding: "2.25rem", background: t.card, display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <div style={{ color: t.accent, fontSize: 13, letterSpacing: "0.1em" }}>★★★★★</div>
                  <p style={{ fontSize: "14.5px", fontStyle: "italic", color: t.mid, lineHeight: 1.7, flex: 1 }}>"{r.q}"</p>
                  <div style={{ paddingTop: "1.25rem", borderTop: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{r.n}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: t.accent, letterSpacing: "0.08em", marginTop: 2 }}>{r.b}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <style>{`.tg{grid-template-columns:repeat(3,1fr)!important;}@media(max-width:900px){.tg{grid-template-columns:1fr 1fr!important;}}@media(max-width:580px){.tg{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      <CTAStrip
        t={t} go={go}
        hed="Every week you wait, a competitor gets stronger."
        sub="We'll show you exactly what your site is missing and what it would take to fix it. 30 minutes. No pitch deck."
        btn="Get a Free Audit"
      />
    </motion.div>
  );
}
