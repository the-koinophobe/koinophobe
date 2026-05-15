import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { T } from "./theme";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Process from "./pages/Process";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// ─── URL ↔ page state sync ───────────────────────────────────────────────────
function parseRoute() {
  const path = (typeof window !== "undefined" ? window.location.pathname : "/")
    .replace(/\/$/, "") || "/";
  const parts = path.split("/").filter(Boolean);
  const page  = parts[0] || "home";
  const slug  = parts[1] || null;
  return { page, slug };
}

function pageToPath(page: string, slug?: string | null) {
  if (page === "home") return "/";
  return "/" + page + (slug ? "/" + slug : "");
}

export default function App() {
  const [dark, setDark] = useState(true);
  const init = parseRoute();
  const [page,      setPage]      = useState(init.page);
  const [caseSlug,  setCaseSlug]  = useState<string | null>(init.page === "work"  ? init.slug : null);
  const [postSlug,  setPostSlug]  = useState<string | null>(init.page === "blog"  ? init.slug : null);
  const t = dark ? T.dark : T.light;

  const go = useCallback((p: string, slug?: string) => {
    let resolvedPage = p;
    let resolvedCase: string | null  = null;
    let resolvedPost: string | null  = null;

    if (p.startsWith("case:")) {
      resolvedPage = "work";
      resolvedCase = p.replace("case:", "");
    } else if (p === "work" && slug) {
      resolvedPage = "work";
      resolvedCase = slug;
    } else if (p === "blog" && slug) {
      resolvedPage = "blog";
      resolvedPost = slug;
    }

    setPage(resolvedPage);
    setCaseSlug(resolvedCase);
    setPostSlug(resolvedPost);
    window.scrollTo(0, 0);

    const url = pageToPath(resolvedPage, resolvedCase ?? resolvedPost);
    window.history.pushState({ page: resolvedPage, caseSlug: resolvedCase, postSlug: resolvedPost }, "", url);
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => {
      const { page: p, slug: s } = parseRoute();
      setPage(p);
      setCaseSlug(p === "work" ? s : null);
      setPostSlug(p === "blog" ? s : null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home":     return <Home     t={t} go={go} />;
      case "services": return <Services t={t} go={go} />;
      case "work":     return <Work     t={t} go={go} slug={caseSlug}  setSlug={setCaseSlug} />;
      case "process":  return <Process  t={t} go={go} />;
      case "blog":     return <Blog     t={t} go={go} postSlug={postSlug} setPostSlug={setPostSlug} />;
      case "contact":  return <Contact  t={t} />;
      default:         return <Home     t={t} go={go} />;
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Clash Grotesk', system-ui, sans-serif; }
        button { font-family: inherit; cursor: pointer; }
        @media(max-width:768px){.nd{display:none!important;}.nm{display:flex!important;}}
        @media(min-width:769px){.nm{display:none!important;}}
        /* Mobile: tighten all horizontal section padding */
        @media(max-width:640px){
          [data-rpad]{padding-left:1.25rem!important;padding-right:1.25rem!important;}
        }
      `}</style>
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap" rel="stylesheet" />
      <div style={{
        background: t.bg, color: t.text,
        width: "100%", minHeight: "100vh",
        fontFamily: "'Clash Grotesk',system-ui,sans-serif",
        transition: "background 0.3s ease, color 0.3s ease",
        overflowX: "hidden",
      }}>
        <LayoutGroup>
          <Nav t={t} dark={dark} setDark={setDark} page={page} go={go} />
          <main style={{ width: "100%", paddingTop: 64 }}>
            <AnimatePresence mode="wait">
              <motion.div key={page + (caseSlug ?? "") + (postSlug ?? "")} style={{ width: "100%" }}>
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer t={t} go={go} />
        </LayoutGroup>
      </div>
    </>
  );
}
