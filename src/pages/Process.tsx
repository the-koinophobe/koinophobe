import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TbPhone, TbSearch, TbCode, TbRocket, TbMapPin, TbChartLine, TbCircleCheck } from "react-icons/tb";
import { Reveal, Label, Hed, Em } from "../components/ui";
import { PageHero, CTAStrip } from "../components/sections";
import { EASE } from "../theme";
import type { WithThemeAndGo } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Step { num: string; icon: React.ReactNode; name: string; dur: string; short: string; detail: string[]; note: string; }
interface TimelineRow { p: string; e: string; }

const STEPS: Step[] = [
  { num: "01", icon: <TbPhone size={26} />,    name: "Discovery Call",        dur: "Free · 30 min", short: "30 minutes. We learn your business, market, and competitors.", detail: ["Walk through your current site and what is not working","Identify your primary service and target city / service area","Review your top 3 local competitors","Set realistic timeline and ranking expectations","Agree on scope, pricing, and whether we are the right fit"], note: "You leave with clarity — whether you hire us or not. No obligation, no pitch deck." },
  { num: "02", icon: <TbSearch size={26} />,   name: "Research & Strategy",   dur: "Week 1",        short: "Keyword research, competitor analysis, site architecture planned.", detail: ["Keyword research for your service + city combinations","Competitor content and gap analysis","Site architecture — page structure, URL slugs, internal linking plan","Draft title tags and meta descriptions for every page","Citation audit if you have an existing presence"], note: "We share this before building anything. You sign off on the strategy before a line of code is written." },
  { num: "03", icon: <TbCode size={26} />,     name: "Design & Build",        dur: "Weeks 2-4",     short: "WordPress site built to spec. SEO architecture baked in from day one.", detail: ["Design mockups for homepage and key service pages","WordPress build with SEO architecture from the first page","Schema markup (LocalBusiness, Service types)","Page speed optimisation","3 rounds of revision based on your feedback","Mobile-first QA across devices"], note: "You review real pages in a staging environment, not static mockups." },
  { num: "04", icon: <TbRocket size={26} />,   name: "Launch",                dur: "Week 4-5",      short: "Go live, submit, verify, activate everything.", detail: ["DNS transfer and domain setup","Google Search Console verification and sitemap submission","Google Analytics 4 setup and goal tracking","GBP linked to new site, service list updated","Post-launch crawl to catch any issues","30-day post-launch support window"], note: "Launch day is when the SEO clock starts. We monitor the first 30 days closely." },
  { num: "05", icon: <TbMapPin size={26} />,   name: "Local SEO + AEO Campaign", dur: "Month 1+",      short: "Citations, GBP, AEO schema, rank tracking, monthly reporting.", detail: ["60+ US directory citation submissions and cleanup","Google Business Profile optimisation and weekly posts","FAQ schema markup on all service pages","AI Overview-targeted Q&A content — 8+ questions per page","LocalBusiness, Service, and Review schema markup","Review acquisition strategy and email templates","Monthly rank tracking and AI Overview visibility tracking","Monthly report with plain-English commentary"], note: "Month 3 is when meaningful movement typically appears. Month 6-9 for map pack positions. AI Overview citations often begin appearing by month 4-5." },
  { num: "06", icon: <TbChartLine size={26} />, name: "Monthly Reporting",    dur: "Ongoing",       short: "Real data. Plain English. No vanity metrics.", detail: ["GSC data - clicks, impressions, CTR, average position","Rank tracking — where you sit for each target keyword","GBP insights — calls, direction requests, photo views","What moved this month and why","What is planned for next month","Open channel to redirect priorities anytime"], note: "Reports go out on the same date every month. If something is not working, we say so and change it." },
];

const TIMELINE: TimelineRow[] = [
  { p: "Day 1",     e: "Discovery call — scope, pricing, fit" },
  { p: "Day 3",     e: "Strategy doc shared — keywords, architecture, competitor gaps" },
  { p: "Week 2",    e: "Design mockups for review" },
  { p: "Week 3",    e: "Build + revisions on staging site" },
  { p: "Week 4-5",  e: "Launch — DNS, GSC, GA4, GBP linked, schema live" },
  { p: "Month 1",   e: "Citation campaign live — 60+ directories. FAQ schema and AEO content published." },
  { p: "Month 1-2", e: "GBP posting cadence established, review workflow active, AI Overview eligibility building" },
  { p: "Month 3",   e: "First meaningful ranking movement expected" },
  { p: "Month 4-5", e: "AI Overview citations begin appearing for primary queries" },
  { p: "Month 6-9", e: "Map pack positions for primary keywords + consistent AI Overview presence" },
  { p: "Ongoing",   e: "Monthly reports, rank updates, AEO tracking, continuous optimisation" },
];

export default function Process({ t, go }: WithThemeAndGo) {
  useDocumentMeta({ title: "Our Process — From Discovery to Map Pack Rankings | koinophobe.dev", description: "Six steps from discovery call to local SEO results and AI Overview citations. No surprises, no handoffs. See exactly how we work.", canonicalPath: "/process" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Steps stagger in
      gsap.from(".gsap-step", {
        scrollTrigger: { trigger: ".gsap-steps-grid", start: "top 78%", once: true },
        y: 40, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
      });
      // Timeline rows animate in one by one
      gsap.from(".gsap-tl-row", {
        scrollTrigger: { trigger: ".gsap-timeline", start: "top 80%", once: true },
        x: -20, opacity: 0, duration: 0.4, stagger: 0.07, ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, []);
  const [active, setActive] = useState<number | null>(0);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
      <PageHero t={t} label="Process" title={<>Simple process.<br /><Em t={t}>No surprises.</Em></>} subtitle="Six steps from discovery call to map pack rankings and AI Overview citations. You know exactly what happens at every stage." />

      <section style={{ background: t.bg, padding: "clamp(3rem,6vw,6rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div className="gsap-steps-grid" style={{ maxWidth: 1180, margin: "0 auto" }}>
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <motion.div whileHover={{ borderColor: t.border2 }} onClick={() => setActive(active === i ? null : i)}
                className="gsap-step"
                style={{ border: `1px solid ${active === i ? t.accent : t.border}`, background: t.card, marginBottom: 1, borderRadius: i === 0 ? "3px 3px 0 0" : i === STEPS.length - 1 ? "0 0 3px 3px" : 0, cursor: "pointer", overflow: "hidden", transition: "border-color 0.2s" }}>
                <div style={{ padding: "1.75rem 2.5rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                  <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "3rem", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.05em", color: active === i ? t.accent : t.low, minWidth: "3.5rem", transition: "color 0.2s", flexShrink: 0 }}>{s.num}</div>
                  <div style={{ color: active === i ? t.accent : t.mid, flexShrink: 0, transition: "color 0.2s" }}>{s.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.25rem", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 14, color: t.mid }}>{s.short}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${t.border2}`, borderRadius: 2 }}>{s.dur}</div>
                    <motion.div animate={{ rotate: active === i ? 45 : 0 }} transition={{ duration: 0.22 }} style={{ fontSize: "1.4rem", color: t.low, lineHeight: 1 }}>+</motion.div>
                  </div>
                </div>
                <AnimatePresence>
                  {active === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.35, ease: EASE }} style={{ overflow: "hidden" }}>
                      <div style={{ padding: "0 2.5rem 2.5rem", borderTop: `1px solid ${t.border}` }}>
                        <div style={{ paddingTop: "1.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="sdg">
                          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                            {s.detail.map((d, j) => (
                              <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: t.mid, lineHeight: 1.6 }}>
                                <TbCircleCheck size={14} style={{ color: t.accent, flexShrink: 0, marginTop: 2 }} />{d}
                              </li>
                            ))}
                          </ul>
                          <div style={{ background: t.accentBg, border: `1px solid ${t.border2}`, borderRadius: 3, padding: "1.25rem 1.5rem" }}>
                            <div style={{ fontFamily: "monospace", fontSize: 10, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>What to expect</div>
                            <p style={{ fontSize: 14, color: t.mid, lineHeight: 1.7 }}>{s.note}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          ))}
          <style>{`.sdg{grid-template-columns:1fr 1fr!important;}@media(max-width:768px){.sdg{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      <section style={{ background: t.bg2, borderTop: `1px solid ${t.border}`, padding: "clamp(3rem,6vw,6rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div className="gsap-timeline" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal><Label text="Timeline" t={t} /><Hed t={t} style={{ marginBottom: "3rem" }}>What happens <Em t={t}>when.</Em></Hed></Reveal>
          {TIMELINE.map((row, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="gsap-tl-row" style={{ display: "grid", gridTemplateColumns: "140px 1fr", borderBottom: i < TIMELINE.length - 1 ? `1px solid ${t.border}` : "none", padding: "1rem 0", alignItems: "center", gap: "2rem" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{row.p}</div>
                <div style={{ fontSize: 15, color: t.mid }}>{row.e}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTAStrip t={t} go={go} hed="Stop losing ground to competitors." sub="Book a free 30-minute call. We'll show you exactly what's holding your rankings back and what it takes to fix it." btn="Book a Free Call" />
    </motion.div>
  );
}
