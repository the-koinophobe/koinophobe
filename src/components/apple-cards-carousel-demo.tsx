import { Carousel, Card } from "../components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    // Removed py-20 — vertical rhythm is handled by the parent section
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}

/* ── Shared case study content layout ─────────────────────────────────────── */

const CaseStudyContent = ({
  intro,
  stats,
  detail,
}: {
  intro: string;
  stats: { label: string; value: string }[];
  detail: string;
}) => (
  <div style={{ fontFamily: "system-ui, sans-serif" }}>
    {/* Intro paragraph */}
    <p style={{ fontSize: 15, color: "#525252", lineHeight: 1.75, marginBottom: "1.75rem" }}>
      {intro}
    </p>

    {/* Stat grid — always 2 cols to prevent overflow in the narrower modal */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1px",
        marginBottom: "1.75rem",
        border: "1px solid #e5e5e5",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            textAlign: "center",
            padding: "1.25rem 0.75rem",
            background: i % 2 === 0 ? "#fafafa" : "#ffffff",
            borderRight: i % 2 === 0 ? "1px solid #e5e5e5" : "none",
            borderBottom: i < stats.length - 2 ? "1px solid #e5e5e5" : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Clash Grotesk', system-ui, sans-serif",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "#737373",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>

    {/* Detail paragraph */}
    <p style={{ fontSize: 15, color: "#737373", lineHeight: 1.75 }}>{detail}</p>
  </div>
);

/* ── Case study data ───────────────────────────────────────────────────────── */

const data = [
  {
    category: "Local SEO",
    title: "355K impressions in 6 months.",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop",
    content: (
      <CaseStudyContent
        intro="A US service business whose competitors were capturing every local search. Six months after a new WordPress build, full on-page SEO, citation push, and AEO setup — the numbers tell the story."
        stats={[
          { label: "Impressions", value: "355K" },
          { label: "Avg position", value: "17.9" },
          { label: "Clicks", value: "2×" },
          { label: "Starting impressions", value: "3" },
        ]}
        detail="Average position improved from 23.6 to 17.9 over the period. Clicks doubled. The low CTR reflects position 17 — it moves sharply as rankings break into the top 10. The foundation is in place and compounding."
      />
    ),
  },
  {
    category: "AEO",
    title: "Cited in Google AI Overviews by month 5.",
    src: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=2000&auto=format&fit=crop",
    content: (
      <CaseStudyContent
        intro="A Chicago family law firm not appearing in AI Overviews despite page 1 rankings. Full AEO implementation: FAQ schema on every service page, GBP Q&A optimisation, and AI Overview-targeted content structure."
        stats={[
          { label: "AI Overview citations", value: "Month 5" },
          { label: "FAQ schema pages", value: "12" },
          { label: "GBP Q&As added", value: "18" },
          { label: "Impression growth", value: "3.6×" },
        ]}
        detail="AI Overviews cite businesses with complete trust signals: consistent NAP, structured Q&A content, and high GBP engagement. By month 5 the firm was appearing in AI-generated answers for Chicago family law queries — capturing high-intent traffic before organic results."
      />
    ),
  },
  {
    category: "WordPress Design",
    title: "Zero to indexed in 18 days.",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    content: (
      <CaseStudyContent
        intro="A contractor running jobs off word of mouth, losing calls to every competitor who showed up on Google. Full package: WordPress build, schema markup, GSC setup, and mobile-first design optimised for conversion."
        stats={[
          { label: "Build time", value: "18d" },
          { label: "PageSpeed", value: "94" },
          { label: "Indexed", value: "Day 1" },
          { label: "Schema types", value: "5" },
        ]}
        detail="From zero digital footprint to a fully indexed, tracking-enabled site in under three weeks. LocalBusiness, Service, and FAQ schema live on day one — making the site immediately eligible for AI Overview citations as the SEO campaign builds authority."
      />
    ),
  },
  {
    category: "Local SEO",
    title: "From page 3 to map pack top 3.",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop",
    content: (
      <CaseStudyContent
        intro="An HVAC company in a competitive mid-size US city with an existing site but no off-page work, no GBP optimisation, no citations — watching competitors collect every 'AC repair near me' call."
        stats={[
          { label: "Map pack position", value: "Top 3" },
          { label: "Citations built", value: "60+" },
          { label: "GBP posts/mo", value: "8" },
          { label: "Months to result", value: "4" },
        ]}
        detail="Citation building across 60+ US directories, consistent GBP posting, and review velocity work. By month four the business was in the top 3 map pack for its primary service keywords. Every search that previously went to a competitor now triggers a call."
      />
    ),
  },
  {
    category: "WordPress Design",
    title: "A site that converts, not just ranks.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
    content: (
      <CaseStudyContent
        intro="A family law firm generating traffic but losing visitors at the homepage — effectively paying for clicks that never converted. Redesign focused on trust signals, clear service structure, and a single conversion path."
        stats={[
          { label: "Bounce rate drop", value: "31%" },
          { label: "Contact form CVR", value: "4.2%" },
          { label: "Mobile score", value: "91" },
          { label: "Load time", value: "1.4s" },
        ]}
        detail="The traffic was already there. The site was just failing to do its job. One CTA above the fold, social proof integrated into service pages, simplified contact form. The redesign stopped losing the customers the SEO was already sending."
      />
    ),
  },
  {
    category: "Local SEO",
    title: "4,170 impressions, 6.6% CTR.",
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop",
    content: (
      <CaseStudyContent
        intro="A plumbing business that had never touched Search Console. Starting from 3 impressions in the prior period. Six months of on-page and off-page work — plus full AEO setup — later, the trajectory was clear."
        stats={[
          { label: "Impressions", value: "4,170" },
          { label: "Clicks", value: "276" },
          { label: "CTR", value: "6.6%" },
          { label: "Avg position", value: "14.1" },
        ]}
        detail="6.6% CTR at position 14 signals that the titles and meta descriptions are pulling the right audience — genuinely relevant clicks, not accidental ones. Solid foundation for the next phase: breaking into the top 10 where click volume compounds."
      />
    ),
  },
];