import type { ReactNode, CSSProperties } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
export interface Theme {
  bg:        string;
  bg2:       string;
  bg3:       string;
  text:      string;
  mid:       string;
  low:       string;
  border:    string;
  border2:   string;
  accent:    string;
  accent2:   string;
  accentBg:  string;
  card:      string;
  shadow:    string;
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
export type Page = "home" | "services" | "work" | "process" | "blog" | "contact";

export type GoFn = (p: string) => void;

// ─── CONTENT ──────────────────────────────────────────────────────────────────
export interface CaseMetric {
  icon:  ReactNode;
  val:   string;
  label: string;
}

export interface CaseGSC {
  clicks:          number;
  impressions:     string;
  ctr:             string;
  pos:             string;
  prevClicks:      number;
  prevImpressions: string;
  note:            string;
}

export interface Case {
  slug:      string;
  type:      "agency" | "freelance";
  tag:       string;
  industry:  string;
  location:  string;
  year:      string;
  title:     string;
  short:     string;
  desc:      string;
  challenge: string;
  solution:  string;
  result:    string;
  metrics:   CaseMetric[];
  gsc:       CaseGSC;
  pills:     string[];
  thumbnail?: string;  // path to screenshot, e.g. '/screenshots/hvac-dallas.jpg'
  featured?: boolean;
  duration:  string;
}

export interface PostBlock {
  t: "p" | "h2";
  s: string;
}

export interface Post {
  slug:    string;
  tag:     string;
  date:    string;
  read:    string;
  title:   string;
  excerpt: string;
  body:    PostBlock[];
}

// ─── COMPONENT PROPS ──────────────────────────────────────────────────────────
export interface WithTheme      { t: Theme; }
export interface WithThemeAndGo { t: Theme; go: GoFn; }

export interface RevealProps {
  children:   ReactNode;
  delay?:     number;
  style?:     CSSProperties;
  className?: string;
}

export interface LabelProps { text: string; t: Theme; }
export interface HedProps   { children: ReactNode; style?: CSSProperties; t: Theme; }
export interface EmProps    { children: ReactNode; t: Theme; }

export interface BtnProps {
  children:  ReactNode;
  onClick?:  () => void;
  href?:     string;
  variant?:  "primary" | "dark" | "ghost" | "outline" | "accent";
  t:         Theme;
  icon?:     ReactNode;
  full?:     boolean;
  style?:    CSSProperties;
}

export interface CounterProps {
  to:        number;
  suffix?:   string;
  duration?: number;
}

export interface PageHeroProps {
  t:         Theme;
  label:     string;
  title:     ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

export interface CTAStripProps {
  t:    Theme;
  go:   GoFn;
  hed?: string;
  sub?: string;
  btn?: string;
}

export interface MarqueeProps {
  items: string[];
  t:     Theme;
}

export interface GSCPanelProps {
  c: Case;
  t: Theme;
}

export interface NavProps {
  t:       Theme;
  dark:    boolean;
  setDark: (v: boolean) => void;
  page:    string;
  go:      GoFn;
}

export interface FooterProps {
  t:  Theme;
  go: GoFn;
}

export interface WorkProps {
  t:       Theme;
  go:      GoFn;
  slug:    string | null;
  setSlug: (s: string | null) => void;
}

export interface BlogProps {
  t:           Theme;
  go:          GoFn;
  postSlug:    string | null;
  setPostSlug: (s: string | null) => void;
}
