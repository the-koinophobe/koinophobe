import { useState } from "react";
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

export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [caseSlug, setCaseSlug] = useState<string | null>(null);
  const [postSlug, setPostSlug] = useState<string | null>(null);
  const t = dark ? T.dark : T.light;

  const go = (p: string) => {
    if (p.startsWith("case:")) {
      setCaseSlug(p.replace("case:", ""));
      setPage("work");
    } else {
      setCaseSlug(null);
      setPostSlug(null);
      setPage(p);
    }
    window.scrollTo(0, 0);
  };

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
      {/* Global reset injected once at root — fixes the white-strip layout bug.
          The old Nav.tsx scoped <style> only applied inside that shadow context;
          body/html need explicit 100% width from the document root. */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Clash Grotesk', system-ui, sans-serif; }
        button { font-family: inherit; cursor: pointer; }
        @media(max-width:768px){.nd{display:none!important;}.nm{display:flex!important;}}
        @media(min-width:769px){.nm{display:none!important;}}
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
