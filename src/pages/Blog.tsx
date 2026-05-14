import { motion } from "motion/react";
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbFileText } from "react-icons/tb";
import { Reveal, Btn, Em } from "../components/ui";
import { PageHero, CTAStrip } from "../components/sections";
import { POSTS } from "../data/content";
import { EASE } from "../theme";
import type { BlogProps, Post } from "../types";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface PostDetailProps { post: Post; t: BlogProps["t"]; go: BlogProps["go"]; setPostSlug: BlogProps["setPostSlug"]; }

function PostDetail({ post, t, go, setPostSlug }: PostDetailProps) {
  const others = POSTS.filter(p => p.slug !== post.slug);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
      <div style={{ background: t.bg2, borderBottom: `1px solid ${t.border}`, padding: "9rem 3.5rem 4rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <motion.button onClick={() => { setPostSlug(null); window.scrollTo(0, 0); }} whileHover={{ x: -4 }}
            style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: t.mid, background: "none", border: "none", cursor: "pointer", marginBottom: "2rem" }}>
            <TbArrowLeft size={14} /> Back to Blog
          </motion.button>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", border: `1px solid ${t.accentBg}`, borderRadius: 2, background: t.accentBg }}>{post.tag}</div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.08em" }}>{post.date} · {post.read} read</div>
          </div>
          <h1 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(1.75rem,3.5vw,3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.text }}>{post.title}</h1>
        </div>
      </div>
      <section style={{ background: t.bg, padding: "5rem 3.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {post.body.map((block, i) => (
            <Reveal key={i} delay={i * 0.03}>
              {block.t === "h2"
                ? <h2 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", lineHeight: 1.2, marginTop: "3rem", marginBottom: "1.25rem" }}>{block.s}</h2>
                : <p style={{ fontSize: 17, color: t.mid, lineHeight: 1.85, marginBottom: "1.5rem" }}>{block.s}</p>
              }
            </Reveal>
          ))}
          <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: `1px solid ${t.border}` }}>
            <Btn onClick={() => go("contact")} t={t} icon={<TbArrowUpRight size={13} />}>Get this done for your business</Btn>
          </div>
        </div>
      </section>
      <section style={{ background: t.bg2, borderTop: `1px solid ${t.border}`, padding: "5rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2rem" }}>More from the blog</div>
          <div className="rg" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {others.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -3, borderColor: t.border2 }} onClick={() => { setPostSlug(p.slug); window.scrollTo(0, 0); }}
                  style={{ border: `1px solid ${t.border}`, borderRadius: 3, padding: "1.75rem", background: t.card, cursor: "pointer" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{p.tag}</div>
                  <div style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1rem", fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 8 }}>{p.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low }}>{p.read} read</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <style>{`.rg{grid-template-columns:repeat(3,1fr)!important;}@media(max-width:768px){.rg{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>
    </motion.div>
  );
}

export default function Blog({ t, go, postSlug, setPostSlug }: BlogProps) {
  useDocumentMeta({ title: "Blog — Local SEO & AEO Guides for US Service Businesses | koinophobe.dev", description: "Practical local SEO and Answer Engine Optimisation guides for US service businesses. What is working now, what changed with AI Overviews, and what to do about it.", canonicalPath: "/blog" });
  if (postSlug) {
    const post = POSTS.find(p => p.slug === postSlug);
    if (!post) return null;
    return <PostDetail post={post} t={t} go={go} setPostSlug={setPostSlug} />;
  }
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
      <PageHero t={t} label="Blog" title={<>The playbook they<Em t={t}> don't publish.</Em></>} subtitle="Real local SEO and AEO strategy for US service businesses. What's working now, what changed, and what to do about it." />
      <section style={{ background: t.bg, padding: "6rem 3.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal>
            <motion.div whileHover={{ borderColor: t.border2 }} onClick={() => { setPostSlug(POSTS[0].slug); window.scrollTo(0, 0); }}
              style={{ border: `1px solid ${t.border}`, borderRadius: 3, background: t.card, overflow: "hidden", cursor: "pointer", display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: "1.5rem" }} className="fp">
              <div style={{ background: t.bg3, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`, backgroundSize: "40px 40px" }}>
                <TbFileText size={36} style={{ color: t.low }} />
              </div>
              <div style={{ padding: "3rem" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "1.25rem" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: `1px solid ${t.accentBg}`, borderRadius: 2, background: t.accentBg }}>{POSTS[0].tag}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low }}>{POSTS[0].date} · {POSTS[0].read}</div>
                </div>
                <h2 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.85rem)", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "1rem" }}>{POSTS[0].title}</h2>
                <p style={{ fontSize: 15, color: t.mid, lineHeight: 1.7, marginBottom: "1.5rem" }}>{POSTS[0].excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 11, color: t.accent, letterSpacing: "0.08em" }}>Read article <TbArrowRight size={13} /></div>
              </div>
            </motion.div>
          </Reveal>
          <div className="bg2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {POSTS.slice(1).map((post, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, borderColor: t.border2 }} onClick={() => { setPostSlug(post.slug); window.scrollTo(0, 0); }}
                  style={{ border: `1px solid ${t.border}`, borderRadius: 3, background: t.card, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ background: t.bg3, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`, backgroundSize: "40px 40px" }}>
                    <TbFileText size={24} style={{ color: t.low }} />
                  </div>
                  <div style={{ padding: "1.75rem" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.tag}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: t.low }}>{post.read}</div>
                    </div>
                    <h3 style={{ fontFamily: "'Clash Grotesk',system-ui,sans-serif", fontSize: "1.1rem", fontWeight: 700, color: t.text, lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: t.mid, lineHeight: 1.65 }}>{post.excerpt}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div style={{ border: `1px dashed ${t.border2}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 240, padding: "2rem", textAlign: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: t.low, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.8 }}>More posts<br />coming soon</div>
              </div>
            </Reveal>
          </div>
          <style>{`.fp{grid-template-columns:1fr 1fr!important;}.bg2{grid-template-columns:repeat(3,1fr)!important;}@media(max-width:900px){.bg2{grid-template-columns:1fr 1fr!important;}}@media(max-width:580px){.bg2{grid-template-columns:1fr!important;}.fp{grid-template-columns:1fr!important;}.fp>div:first-child{min-height:200px;}}`}</style>
        </div>
      </section>
      <CTAStrip t={t} go={go} hed="Read enough? Let's get you ranking." sub="30 minutes with us is worth more than another hour of articles. We'll show you exactly what your site is missing." btn="Get a Free Audit" />
    </motion.div>
  );
}
