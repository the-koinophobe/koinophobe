import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TbCircleCheck, TbSend, TbLoader, TbMail, TbClock, TbCalendar } from "react-icons/tb";
import { Reveal, Em } from "../components/ui";
import { PageHero } from "../components/sections";
import { EASE } from "../theme";
import type { WithTheme } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface FormState { name: string; phone: string; email: string; business: string; city: string; service: string; budget: string; message: string; }
interface FAQ { q: string; a: string; }

const FAQS: FAQ[] = [
  { q: "How quickly can you respond?",            a: "Within 24 hours on business days. If you message on a Friday, you will hear back Monday morning." },
  { q: "Do I need to sign a long-term contract?", a: "WordPress builds are fixed-scope one-time projects. Local SEO is a 6-month fixed retainer — that is the minimum time to see real results, and we are transparent about that upfront." },
  { q: "What if I just want an audit first?",     a: "Completely fine. A site audit is $750 and gives you a full picture of what is holding your current site back — whether you hire us for the next step or not." },
  { q: "Do you work outside the US?",             a: "Our local SEO methodology is built specifically for the US market. Happy to discuss international projects case by case." },
];

const NEXT_STEPS = ["We read your message and research your business","Reply within 24 hours with initial thoughts","30-min discovery call to confirm scope and fit","Fixed-price proposal sent the same day as the call"];

const CONTACT_ROWS = [
  { icon: <TbMail size={16} />,     l: "Email",           v: "michael@koinophobe.dev" },
  { icon: <TbClock size={16} />,    l: "Response time",   v: "Within 24 hours" },
  { icon: <TbCalendar size={16} />, l: "Discovery calls", v: "Mon-Fri, 9am-6pm EST" },
];

export default function Contact({ t }: WithTheme) {
  useDocumentMeta({ title: 'Book a Free Audit — koinophobe.dev', description: 'Tell us your city, your service, and where you stand. We will show you what your site is missing and what it takes to rank. 30 minutes, no obligation.', canonicalPath: '/contact' });
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", business: "", city: "", service: "", budget: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = (): Partial<FormState> => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = "Required";
    if (!form.phone.trim())   e.phone   = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.business.trim()) e.business = "Required";
    if (!form.city.trim())    e.city    = "Required";
    if (!form.message.trim()) e.message = "Required";
    return e;
  };

  const handle = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(v => ({ ...v, [f]: e.target.value }));
    if (errors[f]) setErrors(er => { const n = { ...er }; delete n[f]; return n; });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1400));
    setStatus("sent");
  };

  const inp = (f: keyof FormState): React.CSSProperties => ({
    width: "100%", padding: "13px 16px",
    border: `1px solid ${errors[f] ? "#ef4444" : t.border2}`,
    borderRadius: 3, background: t.bg3, color: t.text,
    fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: 15, outline: "none",
  });

  const lbl: React.CSSProperties = { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: t.low, display: "block", marginBottom: 8 };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
      <div style={{ background: t.bg3, borderBottom: `1px solid ${t.border}`, padding: "10px 3.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent }} />
        <span style={{ fontFamily: "monospace", fontSize: 11, color: t.mid, letterSpacing: "0.08em", textAlign: "center" }}>Right now, a competitor in your city is getting calls you should be getting. Let's change that.</span>
      </div>
      <PageHero t={t} label="Book a Free Call" title={<>Tell us about<br /><Em t={t}>your business.</Em></>} subtitle="30 minutes. We will tell you exactly what we would do, what it costs, and whether we are the right fit." />

      <section style={{ background: t.bg, padding: "clamp(3rem,6vw,6rem) clamp(1.25rem,3.5vw,3.5rem)" }}>
        <div className="cg" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "5rem", alignItems: "start" }}>
          <Reveal>
            {status === "sent" ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                style={{ border: `1px solid ${t.accent}`, borderRadius: 3, padding: "4rem 3rem", textAlign: "center", background: t.card }}>
                <div style={{ width: 56, height: 56, background: t.accentBg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: t.accent }}><TbCircleCheck size={28} /></div>
                <h2 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.75rem", fontWeight: 700, color: t.text, letterSpacing: "-0.025em", marginBottom: 12 }}>Message sent.</h2>
                <p style={{ fontSize: 16, color: t.mid, lineHeight: 1.7 }}>We will respond within 24 hours. Talk soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.5rem", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", marginBottom: "2rem" }}>Tell us what you are working with</div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={lbl}>Phone number <span style={{ color: t.accent }}>*</span></label>
                  <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={handle("phone")}
                    onFocus={e => (e.target.style.borderColor = t.accent)} onBlur={e => (e.target.style.borderColor = errors.phone ? "#ef4444" : t.border2)}
                    style={inp("phone")} />
                  {errors.phone && <div style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors.phone}</div>}
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.06em", marginTop: 6 }}>We use this to confirm your call booking. No cold calls.</div>
                </div>
                <div className="fr" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  {([ ["name","Full name","Jane Smith","text",true], ["email","Email address","jane@yourco.com","email",true], ["business","Business name","Smith Plumbing LLC","text",true], ["city","City / State","Austin, TX","text",true] ] as [keyof FormState, string, string, string, boolean][]).map(([f, l, p, type, req]) => (
                    <div key={f}>
                      <label style={lbl}>{l}{req && <span style={{ color: t.accent }}> *</span>}</label>
                      <input type={type} placeholder={p} value={form[f]} onChange={handle(f)}
                        onFocus={e => (e.target.style.borderColor = t.accent)} onBlur={e => (e.target.style.borderColor = errors[f] ? "#ef4444" : t.border2)}
                        style={inp(f)} />
                      {errors[f] && <div style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors[f]}</div>}
                    </div>
                  ))}
                </div>
                <div className="fr" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={lbl}>Service needed</label>
                    <select value={form.service} onChange={handle("service")} style={{ ...inp("service"), appearance: "none" as const }}>
                      <option value="">Select one...</option>
                      <option>WordPress Web Design</option>
                      <option>Local SEO (6-month retainer)</option>
                      <option>AEO — Answer Engine Optimisation</option>
                      <option>Full Stack (Design + SEO + AEO)</option>
                      <option>Site Audit ($750)</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Rough budget</label>
                    <select value={form.budget} onChange={handle("budget")} style={{ ...inp("budget"), appearance: "none" as const }}>
                      <option value="">Select range...</option>
                      <option>Under $1,500</option>
                      <option>$1,500 - $3,000</option>
                      <option>$3,000 - $5,000</option>
                      <option>$5,000+</option>
                      <option>Monthly retainer ($500/mo)</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: "2rem" }}>
                  <label style={lbl}>Tell us about your situation <span style={{ color: t.accent }}>*</span></label>
                  <textarea value={form.message} onChange={handle("message")} rows={5}
                    placeholder="What is your current site? What city are you targeting? Who are your main competitors?"
                    onFocus={e => (e.target.style.borderColor = t.accent)} onBlur={e => (e.target.style.borderColor = errors.message ? "#ef4444" : t.border2)}
                    style={{ ...inp("message"), resize: "vertical" }} />
                  {errors.message && <div style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>{errors.message}</div>}
                </div>
                <motion.button type="submit" disabled={status === "sending"}
                  whileHover={status !== "sending" ? { scale: 1.02, y: -1 } : {}} whileTap={status !== "sending" ? { scale: 0.97 } : {}}
                  style={{ background: t.accent, color: t.bg, fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "15px 32px", borderRadius: 2, border: "none", cursor: status === "sending" ? "wait" : "pointer", display: "inline-flex", alignItems: "center", gap: 10, opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending"
                    ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><TbLoader size={14} /></motion.span>Sending...</>
                    : <><TbSend size={14} /> Send message</>
                  }
                </motion.button>
              </form>
            )}
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Reveal>
              <div style={{ border: `1px solid ${t.border}`, borderRadius: 3, padding: "2rem", background: t.card }}>
                <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.05rem", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>What happens next</div>
                {NEXT_STEPS.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < 3 ? 12 : 0 }}>
                    <div style={{ width: 20, height: 20, background: t.accentBg, border: `1px solid ${t.accent}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 10, color: t.accent, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontSize: 13, color: t.mid, lineHeight: 1.55 }}>{step}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div style={{ border: `1px solid ${t.border}`, borderRadius: 3, padding: "2rem", background: t.card }}>
                {CONTACT_ROWS.map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingBottom: i < 2 ? "1rem" : 0, marginBottom: i < 2 ? "1rem" : 0, borderBottom: i < 2 ? `1px solid ${t.border}` : "none" }}>
                    <div style={{ color: t.accent, flexShrink: 0, marginTop: 2 }}>{row.icon}</div>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{row.l}</div>
                      <div style={{ fontSize: 14, color: t.text }}>{row.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div style={{ border: `1px solid ${t.border}`, borderRadius: 3, overflow: "hidden", background: t.card }}>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: `1px solid ${t.border}`, fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1rem", fontWeight: 700, color: t.text }}>Quick answers</div>
                {FAQS.map((faq, i) => (
                  <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${t.border}` : "none" }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", padding: "1rem 1.5rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", textAlign: "left" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.4 }}>{faq.q}</span>
                      <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ color: t.low, flexShrink: 0, fontSize: "1.1rem", lineHeight: 1 }}>+</motion.span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: EASE }} style={{ overflow: "hidden" }}>
                          <p style={{ padding: "0 1.5rem 1rem", fontSize: 13, color: t.mid, lineHeight: 1.65 }}>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`.cg{grid-template-columns:1.4fr 1fr!important;}.fr{grid-template-columns:1fr 1fr!important;}@media(max-width:900px){.cg{grid-template-columns:1fr!important;gap:3rem!important;}}@media(max-width:580px){.fr{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </motion.div>
  );
}
