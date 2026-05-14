/**
 * StaggeredMenu — React Bits
 * Source: https://reactbits.dev/components/staggered-menu
 * Install: npx shadcn@latest add @react-bits/StaggeredMenu-TS-CSS
 * Peer dep: npm install gsap
 */
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MenuLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface StaggeredMenuProps {
  links: MenuLink[];
  isOpen: boolean;
  onClose?: () => void;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  className?: string;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  links,
  isOpen,
  onClose,
  backgroundColor = "#0e0d0c",
  textColor = "#f2ede3",
  accentColor = "#c8f23a",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !linksRef.current) return;

    const linkEls = linksRef.current.querySelectorAll<HTMLElement>(".stag-link");
    const overlay = containerRef.current;

    tlRef.current = gsap.timeline({ paused: true });

    // Fade in overlay
    tlRef.current.fromTo(
      overlay,
      { opacity: 0, pointerEvents: "none" },
      { opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "power2.out" }
    );

    // Stagger links up
    tlRef.current.fromTo(
      linkEls,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.15"
    );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[290] flex flex-col items-center justify-center opacity-0 pointer-events-none ${className}`}
      style={{ backgroundColor }}
      onClick={(e) => {
        if (e.target === containerRef.current) onClose?.();
      }}
    >
      <div ref={linksRef} className="flex flex-col items-center gap-6">
        {links.map((link, i) => (
          <div key={i} className="stag-link overflow-hidden">
            <a
              href={link.href ?? "#"}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                  onClose?.();
                }
              }}
              style={{ color: textColor, textDecoration: "none" }}
              className="block text-5xl font-bold tracking-tight transition-colors duration-200 hover:opacity-70"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = accentColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = textColor;
              }}
            >
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaggeredMenu;
