import React from "react";
import { motion } from "motion/react";
import { TbWorldWww, TbMapPin, TbBrain, TbCheck, TbCircleCheck, TbArrowRight, TbBolt, TbCode, TbBuilding, TbUsers, TbHeartHandshake } from "react-icons/tb";
import { Reveal, Label, Hed, Em, Btn } from "../components/ui";
import { PageHero, CTAStrip } from "../components/sections";
import { EASE } from "../theme";
import type { WithThemeAndGo } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface WPTier      { name: string; price: string; label: string | null; desc: string; inc: string[]; }
interface AddonRow    { name: string; price: string; }
interface Industry    { icon: React.ReactNode; name: string; desc: string; }
interface TimelineRow { m: string; e: string; dot: "accent" | "border2"; }

const WP_TIERS: WPTier[] = [
  { name: "Starter",   price: "$1,500",  label: null,           desc: "5 pages. Replaces a site that's hurting you — fast, indexed, and built to convert from day one.", inc: ["5 core pages (Home, Services, About, Blog, Contact)", "Custom WordPress design (not a template)", "Mobile-first, fully responsive", "Title tags, meta, H1s optimised", "Contact form + click-to-call", "Google Maps embed", "GSC + GA4 setup", "LocalBusiness schema markup", "2 rounds of revision", "14-day post-launch support"] },
  { name: "Growth",    price: "$2,800",  label: "Most Popular", desc: "Up to 12 pages with full local SEO architecture. The foundation for map pack rankings and AI Overview eligibility.", inc: ["Everything in Starter", "Up to 12 pages", "Individual service pages (keyword-targeted by city)", "LocalBusiness + Service schema markup", "FAQ schema on every service page", "Page speed optimisation (90+ PageSpeed target)", "Internal linking architecture", "3 rounds of revision", "30-day post-launch support"] },
  { name: "Authority", price: "$5,000+", label: null,           desc: "Large sites, WooCommerce, multi-location, custom functionality. For businesses ready to dominate their market.", inc: ["Everything in Growth", "Unlimited pages", "WooCommerce / online ordering", "WordPress Multisite (multi-location)", "Custom post types + ACF", "Advanced schema (Product, FAQ, Review, HowTo)", "AEO content strategy included", "Priority support", "Ongoing maintenance option"] },
];

const SEO_INC = [
  "Google Business Profile full audit + optimisation",
  "60+ US directory citation submissions",
  "Citation consistency audit and cleanup",
  "On-page local SEO (location-modified content, H1s, meta)",
  "Monthly GBP posts (x8 per month)",
  "Review acquisition strategy + email templates",
  "Monthly rank tracking across primary keywords",
  "Competitor monitoring",
  "Monthly report — plain English, not just graphs",
  "Dedicated point of contact throughout",
];

const AEO_INC = [
  "FAQ schema markup on all service pages",
  "AI Overview-targeted Q&A content (8+ questions per page)",
  "LocalBusiness, Service, and Review schema",
  "GBP Q&A section fully populated and optimised",
  "Structured service descriptions matching AI query patterns",
  "Citation authority building for AI trust signals",
  "Monthly AI Overview visibility tracking",
  "HowTo schema for process-based queries",
  "NAP consistency audit (AI cross-checks all sources)",
  "Monthly AEO report with AI snapshot visibility",
];

const ADDONS: AddonRow[] = [
  { name: "Additional city targeting",            price: "$150/mo per city" },
  { name: "WooCommerce / online ordering",        price: "from $800" },
  { name: "WordPress Multisite (multi-location)", price: "from $1,200" },
  { name: "Site speed audit + fix",               price: "$400" },
  { name: "Full SEO + AEO audit (technical)",     price: "$750" },
  { name: "GBP + citation cleanup only",          price: "$350 one-time" },
];

const INDUSTRIES: Industry[] = [
  { icon: <TbBuilding size={20} />,       name: "Legal & Law",           desc: "Divorce attorneys, personal injury, criminal defence, employment law" },
  { icon: <TbUsers size={20} />,          name: "Healthcare",            desc: "Dental, chiropractic, optometry, urgent care" },
  { icon: <TbBolt size={20} />,           name: "Home Services",         desc: "HVAC, plumbing, electrical, roofing, landscaping" },
  { icon: <TbCode size={20} />,           name: "Restaurants",           desc: "Independent restaurants, cafes, food trucks, catering" },
  { icon: <TbBuilding size={20} />,       name: "Real Estate",           desc: "Agents, property managers, real estate attorneys" },
  { icon: <TbHeartHandshake size={20} />, name: "Professional Services", desc: "Accountants, consultants, insurance agents, financial advisors" },
];

const SEO_TIMELINE: TimelineRow[] = [
  { m: "Month 1",   e: "GBP optimised, 60+ citations submitted, on-page SEO + AEO setup completed", dot: "accent" },
  { m: "Month 2",   e: "Citation indexation, GBP posts running, review workflow + FAQ schema live", dot: "border2" },
  { m: "Month 3",   e: "First meaningful ranking movement. AI Overview eligibility building.",       dot: "border2" },
  { m: "Month 4-5", e: "Position improvements consolidating. Clicks growing. AI appearances.",       dot: "border2" },
  { m: "Month 6",   e: "Map pack positions + consistent AI Overview citations in most markets.",     dot: "accent" },
];

export default function Services({ t, go }: WithThemeAndGo) {
  useDocumentMeta({ title: "Services & Pricing — WordPress Design, Local SEO & AEO | koinophobe.dev", description: "Transparent pricing for WordPress web design, local SEO, and AEO for US service businesses. From $1,500 sites to 6-month SEO retainers with AI Overview optimisation.", canonicalPath: "/services" });
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
      <PageHero t={t} label="Services & Pricing"
        title={<>Three services.<br /><Em t={t}>No guesswork.</Em></>}
        subtitle="Transparent pricing on this page. No discovery calls required to find out what we charge." />

      {/* SERVICE 01 — WordPress */}
      <section style={{ background: t.bg, padding: "7rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.25rem" }}>
              <div style={{ width: 44, height: 44, background: t.accentBg, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent }}><TbWorldWww size={22} /></div>
              <Label text="Service 01" t={t} />
            </div>
            <Hed t={t} style={{ marginBottom: "1rem" }}>WordPress Web Design</Hed>
            <p style={{ fontSize: 17, color: t.mid, lineHeight: 1.8, maxWidth: "56ch", marginBottom: "3.5rem" }}>
              A slow, generic site doesn't just look unprofessional — it actively suppresses your rankings and hands customers to whoever built theirs properly. Every site we build is engineered for local search from the first line of code: schema markup, page speed, service page architecture, and FAQ content that makes you eligible for Google AI Overviews.
            </p>
          </Reveal>
          <div className="wpf" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {WP_TIERS.map((tier, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, borderColor: tier.label ? t.accent : t.border2 }}
                  style={{ border: `1px solid ${tier.label ? t.accent : t.border}`, borderRadius: 3, padding: "2.5rem", background: t.card, display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", height: "100%" }}>
                  {tier.label && <div style={{ position: "absolute", top: -10, left: "1.5rem", fontFamily: "monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: t.accent, color: t.bg, padding: "3px 10px", borderRadius: 2 }}>{tier.label}</div>}
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{tier.name}</div>
                    <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "2.5rem", fontWeight: 700, color: t.accent, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8 }}>{tier.price}</div>
                    <p style={{ fontSize: 13, color: t.mid, lineHeight: 1.6 }}>{tier.desc}</p>
                  </div>
                  <div style={{ paddingTop: "1.25rem", borderTop: `1px solid ${t.border}`, flex: 1 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>What is included</div>
                    {tier.inc.map((f, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: t.mid, lineHeight: 1.6, marginBottom: 8 }}>
                        <TbCheck size={13} style={{ color: t.accent, flexShrink: 0, marginTop: 2 }} />{f}
                      </div>
                    ))}
                  </div>
                  <Btn onClick={() => go("contact")} t={t} variant="outline" full icon={<TbArrowRight size={13} />}>Get started</Btn>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <style>{`.wpf{grid-template-columns:repeat(3,1fr)!important;}@media(max-width:900px){.wpf{grid-template-columns:1fr 1fr!important;}}@media(max-width:580px){.wpf{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* SERVICE 02 — Local SEO */}
      <section style={{ background: t.bg2, borderTop: `1px solid ${t.border}`, padding: "7rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.25rem" }}>
              <div style={{ width: 44, height: 44, background: t.accentBg, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent }}><TbMapPin size={22} /></div>
              <Label text="Service 02" t={t} />
            </div>
            <Hed t={t} style={{ marginBottom: "1rem" }}>Local SEO</Hed>
            <p style={{ fontSize: 17, color: t.mid, lineHeight: 1.8, maxWidth: "56ch", marginBottom: "3.5rem" }}>
              Ranking on Google's map pack doesn't happen from a website alone. It requires a fully optimised Google Business Profile, consistent citations across 60+ directories, and a structured review strategy — the exact signals Google uses to decide which three businesses get shown when someone searches in your city. Every day you're not in the top 3, those clicks go somewhere else.
            </p>
          </Reveal>
          <div className="seog" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <Reveal>
              <motion.div whileHover={{ borderColor: t.accent }} style={{ border: `1px solid ${t.accent}`, borderRadius: 3, padding: "2.5rem", background: t.card }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Local SEO Retainer</div>
                <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "2.5rem", fontWeight: 700, color: t.accent, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>$500<span style={{ fontSize: "1.25rem" }}>/mo</span></div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>6-month minimum · Fixed price</div>
                <div style={{ background: t.accentBg, border: `1px solid ${t.border2}`, borderRadius: 3, padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontSize: 13, color: t.mid, lineHeight: 1.65 }}>
                    <strong style={{ color: t.text }}>Why 6 months?</strong> Local SEO is not a switch you flip. Citations take time to index. GBP authority builds over months. The businesses at the top of the map pack didn't get there in 30 days — and neither will yours. Month 3 is when results start appearing. Month 6 is when they compound.
                  </p>
                </div>
                {SEO_INC.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: t.mid, lineHeight: 1.6, marginBottom: 8 }}>
                    <TbCircleCheck size={13} style={{ color: t.accent, flexShrink: 0, marginTop: 2 }} />{f}
                  </div>
                ))}
                <div style={{ marginTop: "1.5rem" }}><Btn onClick={() => go("contact")} t={t} full icon={<TbArrowRight size={13} />}>Start ranking</Btn></div>
              </motion.div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 3, padding: "1.75rem 2rem" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>What the 6-month timeline looks like</div>
                  {SEO_TIMELINE.map((row, k) => (
                    <div key={k} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: k < SEO_TIMELINE.length - 1 ? 14 : 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: row.dot === "accent" ? t.accent : t.border2, flexShrink: 0, marginTop: 5 }} />
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: 9, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{row.m}</div>
                        <div style={{ fontSize: 13, color: t.mid, lineHeight: 1.5 }}>{row.e}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <style>{`.seog{grid-template-columns:1fr 1fr!important;}@media(max-width:768px){.seog{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* SERVICE 03 — AEO */}
      <section style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "7rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.25rem" }}>
              <div style={{ width: 44, height: 44, background: t.accentBg, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent }}><TbBrain size={22} /></div>
              <Label text="Service 03 — New in 2025" t={t} />
            </div>
            <Hed t={t} style={{ marginBottom: "1rem" }}>AEO — Answer Engine Optimisation</Hed>
            <p style={{ fontSize: 17, color: t.mid, lineHeight: 1.8, maxWidth: "56ch", marginBottom: "2rem" }}>
              Google AI Overviews now reach over 2 billion users monthly. They appear at the top of search results — above organic rankings, above the map pack, above ads. The AI generates an answer and recommends businesses it trusts. If your competitor is being recommended and you're not, every single person asking Google about your service category is being sent to them before they ever see your name.
            </p>
            <div style={{ background: t.bg2, border: `1px solid ${t.border2}`, borderRadius: 3, padding: "1.5rem 2rem", maxWidth: "72ch", marginBottom: "3rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                {[
                  { val: "2B+", label: "Monthly users see AI Overviews" },
                  { val: "60%", label: "Of searches end without a click" },
                  { val: "32%", label: "Fewer businesses in AI local packs" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "2rem", fontWeight: 700, color: t.accent, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.08em", marginTop: 5, lineHeight: 1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="aeog" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <Reveal>
              <motion.div whileHover={{ borderColor: t.accent }} style={{ border: `1px solid ${t.accent}`, borderRadius: 3, padding: "2.5rem", background: t.card }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>AEO Setup + Monthly Optimisation</div>
                <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "2rem", fontWeight: 700, color: t.accent, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>Included</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>With all Local SEO retainers</div>
                {AEO_INC.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: t.mid, lineHeight: 1.6, marginBottom: 8 }}>
                    <TbCircleCheck size={13} style={{ color: t.accent, flexShrink: 0, marginTop: 2 }} />{f}
                  </div>
                ))}
                <div style={{ marginTop: "1.5rem" }}><Btn onClick={() => go("contact")} t={t} full icon={<TbArrowRight size={13} />}>Get into AI Overviews</Btn></div>
              </motion.div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 3, padding: "1.75rem 2rem" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>What AI Overviews look for vs traditional SEO</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem 1.5rem" }}>
                    {[
                      ["Traditional SEO Signal", "What AI Overviews Need Instead"],
                      ["Keyword in business name", "Consistent NAP across all directories"],
                      ["Number of backlinks", "Quality citations on trusted platforms"],
                      ["Keyword density", "Direct answers to customer questions"],
                      ["Generic category listing", "Specific service + location descriptions"],
                      ["Old reviews", "Recent, responded-to review activity"],
                      ["Basic GBP", "Fully completed GBP with Q&A + posts"],
                    ].map(([a, b], k) => (
                      <React.Fragment key={k}>
                        <div style={{ fontSize: k === 0 ? 10 : 12, color: k === 0 ? t.low : t.mid, fontFamily: k === 0 ? "monospace" : "inherit", letterSpacing: k === 0 ? "0.1em" : 0, textTransform: k === 0 ? "uppercase" : "none", lineHeight: 1.5, paddingBottom: k > 0 ? "0.5rem" : "0.75rem", borderBottom: k < 6 ? `1px solid ${t.border}` : "none" }}>{a}</div>
                        <div style={{ fontSize: k === 0 ? 10 : 12, color: k === 0 ? t.accent : t.text, fontFamily: k === 0 ? "monospace" : "inherit", letterSpacing: k === 0 ? "0.1em" : 0, textTransform: k === 0 ? "uppercase" : "none", lineHeight: 1.5, fontWeight: k === 0 ? 400 : 600, paddingBottom: k > 0 ? "0.5rem" : "0.75rem", borderBottom: k < 6 ? `1px solid ${t.border}` : "none" }}>{b}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <style>{`.aeog{grid-template-columns:1fr 1fr!important;}@media(max-width:768px){.aeog{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* ADD-ONS */}
      <section style={{ background: t.bg2, borderTop: `1px solid ${t.border}`, padding: "5rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <Label text="Add-Ons" t={t} />
            <Hed t={t} style={{ marginBottom: "2.5rem" }}>Optional extras.<br /><Em t={t}>Transparent pricing.</Em></Hed>
          </Reveal>
          <div className="ag" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", border: `1px solid ${t.border}`, borderRadius: 3, overflow: "hidden" }}>
            {ADDONS.map((a, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ padding: "1.5rem 1.75rem", background: t.card, borderRight: i % 3 < 2 ? `1px solid ${t.border}` : "none", borderBottom: i < 3 ? `1px solid ${t.border}` : "none" }}>
                  <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1rem", fontWeight: 700, color: t.text, marginBottom: 6 }}>{a.name}</div>
                  <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.25rem", fontWeight: 700, color: t.accent, letterSpacing: "-0.03em" }}>{a.price}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`.ag{grid-template-columns:repeat(3,1fr)!important;}@media(max-width:768px){.ag{grid-template-columns:1fr 1fr!important;}}@media(max-width:480px){.ag{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "6rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <Label text="Who We Work With" t={t} />
            <Hed t={t} style={{ marginBottom: "3rem" }}>Built for <Em t={t}>US service businesses.</Em></Hed>
          </Reveal>
          <div className="ig" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <motion.div whileHover={{ borderColor: t.accent }} style={{ padding: "1.75rem 2rem", border: `1px solid ${t.border}`, borderRadius: 3, display: "flex", gap: "1rem", alignItems: "flex-start", background: t.card }}>
                  <div style={{ color: t.accent, flexShrink: 0, marginTop: 2 }}>{ind.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1rem", fontWeight: 700, color: t.text, marginBottom: 4 }}>{ind.name}</div>
                    <div style={{ fontSize: 13, color: t.mid, lineHeight: 1.55 }}>{ind.desc}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <style>{`.ig{grid-template-columns:repeat(3,1fr)!important;}@media(max-width:900px){.ig{grid-template-columns:1fr 1fr!important;}}@media(max-width:500px){.ig{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      <CTAStrip t={t} go={go}
        hed="Your competitors are being recommended by AI. Are you?"
        sub="Tell us your city, your service, and where you stand. We'll show you what it takes to change that."
        btn="Get a Free Audit"
      />
    </motion.div>
  );
}
