/**
 * prerender.mjs — Post-build static site generation.
 *
 * Reads dist/index.html, clones it for every route with the correct
 * <title>, <meta name="description">, canonical, og tags, and JSON-LD
 * already in the initial HTML. Googlebot sees full SEO meta on first
 * response before JavaScript runs.
 *
 * Run: node scripts/prerender.mjs (after vite build)
 */

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dir  = path.dirname(fileURLToPath(import.meta.url));
const ROOT   = path.resolve(__dir, "..");
const DIST   = path.join(ROOT, "dist");
const SITE   = "https://koinophobe.dev";
const OG_IMG = `${SITE}/og.png`;

// ─── helpers ─────────────────────────────────────────────────────────────────
function esc(s) {
  return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function schemaTag(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj, null, 0)}</script>`;
}

// ─── shared schemas ───────────────────────────────────────────────────────────
const ORG = {
  "@context":   "https://schema.org",
  "@type":      "ProfessionalService",
  "@id":        `${SITE}/#organization`,
  name:         "Koinophobe",
  url:          SITE,
  logo:         `${SITE}/logo.svg`,
  email:        "hello@koinophobe.dev",
  description:  "WordPress web design, local SEO, and AEO for US service businesses.",
  serviceType:  ["Web Design", "Local SEO", "Answer Engine Optimization"],
  areaServed:   { "@type": "Country", name: "United States" },
  founder: {
    "@type":       "Person",
    name:          "Michael Edward",
    jobTitle:      "Web Designer & Local SEO Specialist",
    knowsAbout:    ["Local SEO", "WordPress", "Answer Engine Optimization", "Google Business Profile"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "BSc Computer Science", credentialCategory: "degree" }
    ],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Web Presence Services",
    itemListElement: [
      { "@type":"Offer", name:"WordPress Web Design",     price:"1500", priceCurrency:"USD" },
      { "@type":"Offer", name:"Local SEO Retainer",       price:"500",  priceCurrency:"USD", eligibleDuration:"P6M" },
      { "@type":"Offer", name:"Answer Engine Optimization", description:"Included with Local SEO retainer" },
    ],
  },
  aggregateRating: {
    "@type":       "AggregateRating",
    ratingValue:   "5",
    ratingCount:   "3",
    reviewCount:   "3",
    bestRating:    "5",
    worstRating:   "1",
  },
  review: [
    {
      "@type":        "Review",
      reviewRating:   { "@type":"Rating", ratingValue:"5", bestRating:"5" },
      author:         { "@type":"Person", name:"Marcus T." },
      reviewBody:     "We went from page 3 to the top 3 map pack in our city within 4 months. The phone started ringing differently.",
    },
    {
      "@type":        "Review",
      reviewRating:   { "@type":"Rating", ratingValue:"5", bestRating:"5" },
      author:         { "@type":"Person", name:"Diane K." },
      reviewBody:     "Our old site was embarrassing. The new one looks like we're actually good at what we do. Clients mention it on the first call.",
    },
    {
      "@type":        "Review",
      reviewRating:   { "@type":"Rating", ratingValue:"5", bestRating:"5" },
      author:         { "@type":"Person", name:"Roberto V." },
      reviewBody:     "Two agencies before this. Both disappeared after launch. I get monthly reports that actually explain what moved and why.",
    },
  ],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  "@id":      `${SITE}/#website`,
  name:       "Koinophobe",
  url:        SITE,
  publisher:  { "@id": `${SITE}/#organization` },
};

function breadcrumb(crumbs) {
  return {
    "@context":        "https://schema.org",
    "@type":           "BreadcrumbList",
    itemListElement:   crumbs.map(([name, path], i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name,
      item:       SITE + path,
    })),
  };
}

// ─── routes ──────────────────────────────────────────────────────────────────
const ROUTES = [

  // ── HOME ──────────────────────────────────────────────────────────────────
  {
    path:  "/",
    title: "koinophobe.dev — WordPress Design, Local SEO & AEO for US Service Businesses",
    desc:  "Custom WordPress sites, local SEO retainers, and AEO that gets you cited in Google AI Overviews. For US HVAC, plumbing, legal, dental, and home service businesses.",
    og:    { title: "koinophobe.dev — Stop Losing Calls to Competitors", description: "355K impressions in 6 months. Top 3 map pack placements. We build the site and run the SEO that puts US service businesses in front of ready-to-buy customers." },
    schemas: [
      ORG,
      WEBSITE,
      {
        "@context":    "https://schema.org",
        "@type":       "FAQPage",
        mainEntity: [
          {
            "@type":          "Question",
            name:             "How long does it take to rank on Google's map pack?",
            acceptedAnswer:   { "@type":"Answer", text:"Most local markets see meaningful movement in months 3-4 and map pack positions in months 6-9. Competitive markets like law and dental can take up to 12 months. The key signals — citations, GBP posts, review velocity — compound over time." },
          },
          {
            "@type":          "Question",
            name:             "What is AEO and why does my service business need it?",
            acceptedAnswer:   { "@type":"Answer", text:"AEO (Answer Engine Optimization) is the practice of optimizing your website and Google Business Profile to be cited in Google AI Overviews — the AI-generated summaries that now appear above organic results, the map pack, and ads. Over 2 billion users see AI Overviews monthly. If your competitor is being cited and you're not, every person asking Google about your service category is being directed to them before they ever see your name." },
          },
          {
            "@type":          "Question",
            name:             "How much does a WordPress site for a service business cost?",
            acceptedAnswer:   { "@type":"Answer", text:"Our WordPress web design packages start at $1,500 for a 5-page Starter build, $2,800 for a 12-page Growth build with individual service pages and full SEO architecture, and $5,000+ for Authority builds with WooCommerce, multi-location, or custom functionality. All builds include schema markup, PageSpeed optimisation to 90+, and GSC/GA4 setup." },
          },
          {
            "@type":          "Question",
            name:             "Can I get local SEO if I don't have a Google Business Profile?",
            acceptedAnswer:   { "@type":"Answer", text:"A GBP is the single most important signal for map pack rankings, but organic local SEO still moves forward without one. Citation building, on-page local SEO, and FAQ schema optimisation all drive organic rankings and AI Overview eligibility regardless of GBP status. For service-area businesses, a GBP can be set up without a public address." },
          },
          {
            "@type":          "Question",
            name:             "What industries do you work with?",
            acceptedAnswer:   { "@type":"Answer", text:"We specialise in US service businesses including HVAC, plumbing, electrical, roofing, landscaping, dental practices, family law and personal injury firms, restaurants, real estate agents, chiropractors, and other local professional services." },
          },
        ],
      },
    ],
  },

  // ── SERVICES ──────────────────────────────────────────────────────────────
  {
    path:  "/services",
    title: "Services & Pricing — WordPress Design, Local SEO & AEO | koinophobe.dev",
    desc:  "Transparent pricing for WordPress web design ($1,500+), local SEO retainers ($500/mo), and AEO for Google AI Overviews. For US service businesses.",
    og:    { title: "Services & Pricing | koinophobe.dev", description: "WordPress sites from $1,500. Local SEO from $500/mo. AEO included. No hidden fees — full pricing on this page." },
    schemas: [
      ORG,
      breadcrumb([["Home","/"],["Services","/services"]]),
      {
        "@context":  "https://schema.org",
        "@type":     "ItemList",
        name:        "Web Presence Services",
        itemListElement: [
          {
            "@type":       "ListItem",
            position:      1,
            item: {
              "@type":       "Service",
              name:          "WordPress Web Design",
              description:   "Custom WordPress site builds for US service businesses. Mobile-first, PageSpeed 90+ target, schema markup, and local SEO architecture built in from day one.",
              provider:      { "@id": `${SITE}/#organization` },
              serviceType:   "Web Design",
              areaServed:    { "@type":"Country", name:"United States" },
              offers:        { "@type":"Offer", price:"1500", priceCurrency:"USD", description:"Starter — 5 pages" },
            },
          },
          {
            "@type":       "ListItem",
            position:      2,
            item: {
              "@type":       "Service",
              name:          "Local SEO",
              description:   "Six-month local SEO retainer. GBP optimisation, 60+ US directory citations, monthly posts, review strategy, rank tracking, and plain-English monthly reports.",
              provider:      { "@id": `${SITE}/#organization` },
              serviceType:   "Local SEO",
              areaServed:    { "@type":"Country", name:"United States" },
              offers:        { "@type":"Offer", price:"500", priceCurrency:"USD", priceSpecification:{ "@type":"UnitPriceSpecification", unitCode:"MON" } },
            },
          },
          {
            "@type":       "ListItem",
            position:      3,
            item: {
              "@type":       "Service",
              name:          "Answer Engine Optimization (AEO)",
              description:   "Optimize for Google AI Overviews. FAQ schema, AI Overview-targeted Q&A content, LocalBusiness and Service schema, GBP Q&A, citation authority building, and monthly AI visibility tracking.",
              provider:      { "@id": `${SITE}/#organization` },
              serviceType:   "Answer Engine Optimization",
              areaServed:    { "@type":"Country", name:"United States" },
              offers:        { "@type":"Offer", description:"Included with all Local SEO retainers" },
            },
          },
        ],
      },
      {
        "@context":  "https://schema.org",
        "@type":     "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name:    "Why does the local SEO retainer have a 6-month minimum?",
            acceptedAnswer: { "@type":"Answer", text:"Local SEO results are cumulative. Citations need to be indexed across 60+ directories. GBP authority builds with posting frequency. Review velocity signals take weeks to register. The businesses at the top of the map pack got there because their signals compounded over months. Month 3 is when results typically appear. Month 6 is when they compound. A 30-day engagement cannot produce these results." },
          },
          {
            "@type": "Question",
            name:    "Is AEO different from regular SEO?",
            acceptedAnswer: { "@type":"Answer", text:"Yes. Traditional SEO optimises for ranking in the 10 blue links. AEO optimises for being cited by Google's AI system in the AI Overview that appears before all organic results. AI Overviews pull from different signals: direct question-answer content (FAQ schema), consistent NAP across all directories, fully completed and active GBP, recent review activity, and structured service descriptions. A business can rank on page 1 organically and still be invisible in AI Overviews." },
          },
        ],
      },
    ],
  },

  // ── WORK ──────────────────────────────────────────────────────────────────
  {
    path:  "/work",
    title: "Case Studies — Local SEO & WordPress Results for US Service Businesses | koinophobe.dev",
    desc:  "Real GSC data from real US clients. 355K impressions, top 3 map pack, AI Overview citations. See exactly what we delivered and how.",
    og:    { title: "Case Studies — Real Results | koinophobe.dev", description: "355K impressions in 6 months. Map pack top 3. AI Overview citations by month 5. Real Google Search Console data from real US service business clients." },
    schemas: [
      ORG,
      breadcrumb([["Home","/"],["Work","/work"]]),
      {
        "@context":  "https://schema.org",
        "@type":     "ItemList",
        name:        "Client Case Studies",
        itemListElement: [
          { "@type":"ListItem", position:1, name:"Burnside HVAC — WordPress Build & Local SEO, Dallas TX",      url:`${SITE}/work/hvac-dallas` },
          { "@type":"ListItem", position:2, name:"Hargrove Family Law — Redesign & Local SEO, Chicago IL",      url:`${SITE}/work/law-firm-chicago` },
          { "@type":"ListItem", position:3, name:"Sunrise Dental — From Page 5 to Map Pack, Miami FL",         url:`${SITE}/work/dental-miami` },
          { "@type":"ListItem", position:4, name:"Casa Tierra Group — WooCommerce + Multi-Location, Austin TX", url:`${SITE}/work/restaurant-austin` },
        ],
      },
    ],
  },

  // ── WORK DETAIL PAGES ─────────────────────────────────────────────────────
  {
    path:  "/work/hvac-dallas",
    title: "Burnside HVAC Case Study — WordPress Build & Local SEO, Dallas TX | koinophobe.dev",
    desc:  "Zero GSC history to 238 clicks and 4.18K impressions in 90 days. Top 3 map pack for 'AC repair near me' by month 4. Full case study.",
    og:    { title: "HVAC Dallas: 238 Clicks, Top 3 Map Pack in 4 Months", description: "Starting from zero. Custom WordPress build, 60+ citations, GBP optimisation, and AEO setup. Full GSC data inside." },
    schemas: [
      breadcrumb([["Home","/"],["Work","/work"],["Burnside HVAC","/work/hvac-dallas"]]),
      { "@context":"https://schema.org","@type":"Article", headline:"Burnside HVAC — WordPress Build & Local SEO Case Study", author:{"@id":`${SITE}/#organization`}, publisher:{"@id":`${SITE}/#organization`}, mainEntityOfPage:`${SITE}/work/hvac-dallas` },
    ],
  },
  {
    path:  "/work/law-firm-chicago",
    title: "Hargrove Family Law Case Study — 3.6× Impression Growth, AI Overviews by Month 5 | koinophobe.dev",
    desc:  "163K impressions vs 47.3K. Position 32.7 → 18.2. Clicks 86 → 310. Appearing in Google AI Overviews for Chicago family law by month 5.",
    og:    { title: "Family Law Chicago: 3.6× Impressions, AI Overviews in 5 Months", description: "From Squarespace and 86 annual clicks to 310 clicks, 163K impressions, and AI Overview citations. Full case study." },
    schemas: [
      breadcrumb([["Home","/"],["Work","/work"],["Hargrove Family Law","/work/law-firm-chicago"]]),
      { "@context":"https://schema.org","@type":"Article", headline:"Hargrove Family Law — Local SEO & AEO Case Study", author:{"@id":`${SITE}/#organization`}, publisher:{"@id":`${SITE}/#organization`}, mainEntityOfPage:`${SITE}/work/law-firm-chicago` },
    ],
  },
  {
    path:  "/work/dental-miami",
    title: "Sunrise Dental Case Study — 8.2× Impression Growth, Miami Map Pack | koinophobe.dev",
    desc:  "New domain vs established competitors. 39.2K impressions vs 4.78K. Position 50.9 → 14.2. Miami map pack entry in 5 months.",
    og:    { title: "Dental Miami: 8.2× Impressions, Map Pack in 5 Months", description: "A new dental practice against clinics with 10 years of SEO history. How we got them into the Miami map pack in 5 months." },
    schemas: [
      breadcrumb([["Home","/"],["Work","/work"],["Sunrise Dental","/work/dental-miami"]]),
      { "@context":"https://schema.org","@type":"Article", headline:"Sunrise Dental — Local SEO Case Study", author:{"@id":`${SITE}/#organization`}, publisher:{"@id":`${SITE}/#organization`}, mainEntityOfPage:`${SITE}/work/dental-miami` },
    ],
  },
  {
    path:  "/work/restaurant-austin",
    title: "Casa Tierra Group Case Study — Multi-Location SEO, WooCommerce, Austin TX | koinophobe.dev",
    desc:  "3 locations, 3 platforms consolidated. 7.94K impressions in 90 days. NAP consistency restored across 80+ directories.",
    og:    { title: "Restaurant Group Austin: 3 Locations Consolidated, WooCommerce Live", description: "A restaurant group bleeding visibility because of inconsistent NAP data. How we fixed it and got all 3 locations ranking." },
    schemas: [
      breadcrumb([["Home","/"],["Work","/work"],["Casa Tierra Group","/work/restaurant-austin"]]),
      { "@context":"https://schema.org","@type":"Article", headline:"Casa Tierra Group — Multi-Location SEO Case Study", author:{"@id":`${SITE}/#organization`}, publisher:{"@id":`${SITE}/#organization`}, mainEntityOfPage:`${SITE}/work/restaurant-austin` },
    ],
  },

  // ── PROCESS ───────────────────────────────────────────────────────────────
  {
    path:  "/process",
    title: "Our Process — From Discovery Call to Map Pack Rankings & AI Overviews | koinophobe.dev",
    desc:  "Six steps from discovery call to local SEO results and Google AI Overview citations. Exact timeline, what happens at each stage, and when to expect results.",
    og:    { title: "How We Work — 6 Steps to Rankings | koinophobe.dev", description: "Exact process, exact timeline. Discovery to map pack in 6 months. No surprises." },
    schemas: [
      ORG,
      breadcrumb([["Home","/"],["Process","/process"]]),
      {
        "@context": "https://schema.org",
        "@type":    "HowTo",
        name:       "How to Get a US Service Business Ranking on Google",
        description:"The 6-step process from discovery call to map pack rankings and Google AI Overview citations.",
        totalTime:  "P6M",
        tool:       ["WordPress","Google Business Profile","Google Search Console","Google Analytics 4"],
        step: [
          { "@type":"HowToStep", position:1, name:"Discovery Call",        text:"30-minute call to understand your business, market, competitors, and current site situation. Zero obligation.",                                                        url:`${SITE}/process` },
          { "@type":"HowToStep", position:2, name:"Strategy Document",     text:"Keyword research, site architecture plan, competitor gap analysis, and pricing delivered within 3 days.",                                                               url:`${SITE}/process` },
          { "@type":"HowToStep", position:3, name:"Design Mockups",        text:"Full visual mockups of the new site. Review and revise before a single line of code is written.",                                                                       url:`${SITE}/process` },
          { "@type":"HowToStep", position:4, name:"Build & Launch",        text:"WordPress build on a staging site. Revisions. DNS migration, GSC/GA4/GBP setup. Schema markup live on day one.",                                                       url:`${SITE}/process` },
          { "@type":"HowToStep", position:5, name:"Local SEO + AEO Setup", text:"60+ directory citation submissions, GBP optimisation, FAQ schema, AI Overview-targeted Q&A content, and review acquisition strategy.",                                  url:`${SITE}/process` },
          { "@type":"HowToStep", position:6, name:"Ongoing SEO Campaign",  text:"Monthly GBP posts, rank tracking, AI Overview monitoring, competitor analysis, and a plain-English monthly report. Results compound from month 3 through month 6+.", url:`${SITE}/process` },
        ],
      },
    ],
  },

  // ── BLOG ──────────────────────────────────────────────────────────────────
  {
    path:  "/blog",
    title: "Blog — Local SEO & AEO Strategy for US Service Businesses | koinophobe.dev",
    desc:  "Practical guides on local SEO, AEO, and WordPress for US service businesses. What is working now, what changed with Google AI Overviews, and what to do about it.",
    og:    { title: "Blog — Local SEO & AEO Guides | koinophobe.dev", description: "Real strategy, no fluff. Local SEO guides, AEO playbooks, and WordPress tips for US service businesses." },
    schemas: [
      ORG,
      breadcrumb([["Home","/"],["Blog","/blog"]]),
      {
        "@context":  "https://schema.org",
        "@type":     "Blog",
        name:        "koinophobe.dev Blog",
        url:         `${SITE}/blog`,
        publisher:   { "@id":`${SITE}/#organization` },
        blogPost: [
          { "@type":"BlogPosting", headline:"Google AI Overviews Are Eating Local Search. Here's How to Get Into Them.", url:`${SITE}/blog/aeo-local-businesses-2026` },
          { "@type":"BlogPosting", headline:"The Local SEO Guide for US Service Businesses in 2026",                      url:`${SITE}/blog/local-seo-guide-2026` },
          { "@type":"BlogPosting", headline:"Why Your Existing Website Is Actively Costing You Customers",               url:`${SITE}/blog/why-your-site-doesnt-rank` },
        ],
      },
    ],
  },

  // ── BLOG POST PAGES ───────────────────────────────────────────────────────
  {
    path:  "/blog/aeo-local-businesses-2026",
    title: "Google AI Overviews Are Eating Local Search — How to Get Into Them | koinophobe.dev",
    desc:  "Google AI Overviews reach 2 billion users monthly and appear above every organic result. Here is the exact playbook for getting your service business cited.",
    og:    { title: "How to Get Your Business Into Google AI Overviews (2025)", description: "AI Overviews appear before the map pack, before ads, before everything. If your competitor is being cited and you're not, you're invisible. Here's the fix." },
    schemas: [
      breadcrumb([["Home","/"],["Blog","/blog"],["Google AI Overviews Guide","/blog/aeo-local-businesses-2026"]]),
      {
        "@context":       "https://schema.org",
        "@type":          "BlogPosting",
        headline:         "Google AI Overviews Are Eating Local Search. Here's How to Get Into Them.",
        description:      "AI Overviews now appear before the map pack, before ads, before every organic result. If your business isn't cited inside one, a competitor is.",
        datePublished:    "2025-05-06",
        dateModified:     "2025-05-06",
        author:           { "@id":`${SITE}/#organization` },
        publisher:        { "@id":`${SITE}/#organization` },
        mainEntityOfPage: `${SITE}/blog/aeo-local-businesses-2026`,
        keywords:         ["AEO","Answer Engine Optimization","Google AI Overviews","local SEO","GBP optimization","FAQ schema"],
        articleSection:   "AEO",
      },
      {
        "@context": "https://schema.org",
        "@type":    "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name:    "What signals does Google use to decide which businesses to cite in AI Overviews?",
            acceptedAnswer: { "@type":"Answer", text:"Google's AI Overview system pulls from six primary signals: a fully completed and actively maintained Google Business Profile, consistent NAP (name, address, phone) across 60+ directories, FAQ content on your website written in the question format customers actually use, LocalBusiness and Service schema markup, recent review activity (volume matters less than recency), and location-specific service pages that directly answer queries like 'best HVAC company in [city]'." },
          },
          {
            "@type": "Question",
            name:    "How long does it take to appear in Google AI Overviews?",
            acceptedAnswer: { "@type":"Answer", text:"For businesses with strong existing GBP signals and consistent citations, AEO optimisation can produce AI Overview appearances within 60-90 days. For businesses starting from scratch, the timeline is typically 4-6 months. The rate-limiting factor is citation indexation and GBP authority building — both take time to register with Google's systems." },
          },
          {
            "@type": "Question",
            name:    "Does appearing in AI Overviews replace needing to rank organically?",
            acceptedAnswer: { "@type":"Answer", text:"No, and optimizing for one reinforces the other. Strong local SEO signals (citations, GBP, on-page optimization) also improve AI Overview eligibility. But a business can rank on page 1 organically and still be absent from AI Overviews if it lacks FAQ schema, structured Q&A content, and complete GBP data. The businesses winning in 2025 optimise for both." },
          },
        ],
      },
    ],
  },
  {
    path:  "/blog/local-seo-guide-2026",
    title: "The Local SEO Guide for US Service Businesses in 2026 | koinophobe.dev",
    desc:  "Everything that moves the needle for map pack rankings in 2025. GBP, citations, on-page signals, review strategy, and how AI Overviews changed local search.",
    og:    { title: "Local SEO Guide for Service Businesses (2025)", description: "What actually moves the needle for map pack rankings this year. GBP, citations, reviews, schema, AI Overviews — the complete playbook." },
    schemas: [
      breadcrumb([["Home","/"],["Blog","/blog"],["Local SEO Guide 2026","/blog/local-seo-guide-2026"]]),
      {
        "@context":       "https://schema.org",
        "@type":          "BlogPosting",
        headline:         "The Local SEO Guide for US Service Businesses in 2026",
        description:      "Everything that actually moves the needle for map pack rankings — GBP, citations, on-page signals, and what Google's local algorithm cares about this year.",
        datePublished:    "2025-04-12",
        dateModified:     "2025-04-12",
        author:           { "@id":`${SITE}/#organization` },
        publisher:        { "@id":`${SITE}/#organization` },
        mainEntityOfPage: `${SITE}/blog/local-seo-guide-2026`,
        keywords:         ["local SEO","Google Business Profile","citation building","map pack","GBP optimization","local search 2025"],
        articleSection:   "Local SEO",
      },
    ],
  },
  {
    path:  "/blog/why-your-site-doesnt-rank",
    title: "Why Your Existing Website Is Actively Costing You Customers | koinophobe.dev",
    desc:  "A slow, unstructured site doesn't just fail to rank — it actively signals distrust to Google and visitors. Here is what is actually happening and how to fix it.",
    og:    { title: "Why Your Website Is Costing You Customers (Not Just Not Helping)", description: "Every second your site takes to load, 40% of visitors leave. Every month without schema, competitors compound their ranking advantage. Here's what to do." },
    schemas: [
      breadcrumb([["Home","/"],["Blog","/blog"],["Why Your Site Doesn't Rank","/blog/why-your-site-doesnt-rank"]]),
      {
        "@context":       "https://schema.org",
        "@type":          "BlogPosting",
        headline:         "Why Your Existing Website Is Actively Costing You Customers",
        description:      "A slow, unstructured site doesn't just fail to rank — it actively sends trust signals to Google and to visitors that damage your business.",
        datePublished:    "2025-03-08",
        dateModified:     "2025-03-08",
        author:           { "@id":`${SITE}/#organization` },
        publisher:        { "@id":`${SITE}/#organization` },
        mainEntityOfPage: `${SITE}/blog/why-your-site-doesnt-rank`,
        keywords:         ["website SEO","page speed","schema markup","local service business","WordPress","conversion optimization"],
        articleSection:   "Web Design",
      },
    ],
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  {
    path:  "/contact",
    title: "Book a Free Audit — koinophobe.dev",
    desc:  "Tell us your city, your service, and where you stand. We will show you what your site is missing and what it takes to rank in the map pack and AI Overviews. 30 minutes, no obligation.",
    og:    { title: "Book a Free Site Audit | koinophobe.dev", description: "30 minutes. We'll show you exactly what your site is missing and what a competitor in your city is doing that you're not." },
    schemas: [
      ORG,
      breadcrumb([["Home","/"],["Contact","/contact"]]),
    ],
  },
];

// ─── inject & write ──────────────────────────────────────────────────────────
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

let count = 0;
for (const route of ROUTES) {
  let html = template;

  // title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`);

  // meta description — use a replacer function to avoid $ interpretation
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*/,
    (_m, p1) => p1 + esc(route.desc)
  );

  // canonical
  const canonicalUrl = SITE + route.path;
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*/,
    (_m, p1) => p1 + canonicalUrl
  );

  // og:url
  html = html.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*/,
    (_m, p1) => p1 + canonicalUrl
  );

  // og:title
  html = html.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*/,
    (_m, p1) => p1 + esc(route.og?.title ?? route.title)
  );

  // og:description
  html = html.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*/,
    (_m, p1) => p1 + esc(route.og?.description ?? route.desc)
  );

  // og:image — inject if not present, otherwise replace
  if (!html.includes('og:image')) {
    html = html.replace(
      '</head>',
      `  <meta property="og:image" content="${OG_IMG}" />\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n</head>`
    );
  }

  // twitter card
  if (!html.includes('twitter:card')) {
    html = html.replace(
      '</head>',
      `  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="${esc(route.og?.title ?? route.title)}" />\n  <meta name="twitter:description" content="${esc(route.og?.description ?? route.desc)}" />\n  <meta name="twitter:image" content="${OG_IMG}" />\n</head>`
    );
  }

  // schemas — inject before </head>
  const schemaBlock = route.schemas.map(schemaTag).join("\n  ");
  html = html.replace("</head>", `  ${schemaBlock}\n</head>`);

  // write file
  const outDir = route.path === "/" ? DIST : path.join(DIST, ...route.path.split("/").filter(Boolean));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  count++;
  console.log(`  ✓  ${route.path}`);
}

// ── 404 page ─────────────────────────────────────────────────────────────────
let notFound = template;
notFound = notFound.replace(/<title>[^<]*<\/title>/, "<title>404 — Page Not Found | koinophobe.dev</title>");
fs.writeFileSync(path.join(DIST, "404.html"), notFound, "utf-8");
console.log("  ✓  /404.html");

// ── _redirects (Netlify/Cloudflare Pages) ────────────────────────────────────
// With pre-rendered directories each URL resolves directly.
// The catch-all is only needed as a fallback for any un-prerendered dynamic paths.
fs.writeFileSync(
  path.join(DIST, "_redirects"),
  `# Netlify/Cloudflare redirects — pre-rendered routes resolve first\n/*  /index.html  200\n`,
  "utf-8"
);
console.log("  ✓  _redirects");

console.log(`\nPre-render complete. ${count} routes + 404 + _redirects written to dist/\n`);
