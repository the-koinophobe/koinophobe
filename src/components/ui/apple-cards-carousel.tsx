
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

/* ── Types ─────────────────────────────────────────────────────────────────── */

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
};

/* ── Card dimensions — single source of truth ──────────────────────────────── */
const CARD_W = 320;
const CARD_GAP = 16;

/* ── Context ────────────────────────────────────────────────────────────────── */

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

/* ── Carousel ───────────────────────────────────────────────────────────────── */

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -(CARD_W + CARD_GAP), behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: CARD_W + CARD_GAP, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const scrollPosition = (CARD_W + CARD_GAP) * (index + 1);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">

        {/* Scroll track */}
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-8 [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className="flex flex-row justify-start"
            style={{
              maxWidth: 1180,
              paddingLeft: "3.5rem",
              paddingRight: "3.5rem",
              margin: "0 auto",
              gap: CARD_GAP,
            }}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, delay: 0.12 * index, ease: "easeOut" },
                }}
                key={"card" + index}
                style={{ flexShrink: 0 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div
          style={{
            maxWidth: 1180,
            margin: "12px auto 0",
            padding: "0 3.5rem 2rem",
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          {[
            { onClick: scrollLeft, disabled: !canScrollLeft, Icon: IconArrowNarrowLeft, label: "Scroll left" },
            { onClick: scrollRight, disabled: !canScrollRight, Icon: IconArrowNarrowRight, label: "Scroll right" },
          ].map(({ onClick, disabled, Icon, label }, i) => (
            <button
              key={i}
              onClick={onClick}
              disabled={disabled}
              aria-label={label}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #e0e0e0",
                background: disabled ? "#f5f5f5" : "#fff",
                cursor: disabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: disabled ? 0.38 : 1,
                transition: "opacity 0.2s, background 0.15s",
                flexShrink: 0,
              }}
            >
              <Icon style={{ width: 17, height: 17, color: "#444" }} />
            </button>
          ))}
        </div>

      </div>
    </CarouselContext.Provider>
  );
};

/* ── Card ───────────────────────────────────────────────────────────────────── */

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  return (
    <>
      {/* ── Modal ─────────────────────────────────────────────────────────────── */}
      {mounted && open && createPortal(
        <AnimatePresence>
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "fixed", inset: 0, zIndex: 9999,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onClick={handleClose}
            />

            {/* Center wrapper */}
            <div
              style={{
                position: "fixed", inset: 0, zIndex: 10000,
                overflowY: "auto",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "48px 16px",
              }}
              onClick={handleBackdropClick}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 18 }}
                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                ref={containerRef}
                layoutId={layout ? `card-${card.title}` : undefined}
                style={{
                  width: "100%",
                  maxWidth: 540,
                  borderRadius: 20,
                  background: "#fff",
                  overflow: "hidden",
                  flexShrink: 0,
                  boxShadow: "0 24px 72px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.05)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero image */}
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img
                    src={card.src}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    style={{
                      position: "absolute", top: 12, right: 12, zIndex: 10,
                      width: 30, height: 30, borderRadius: "50%",
                      background: "rgba(0,0,0,0.48)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <IconX style={{ width: 14, height: 14, color: "#fff" }} />
                  </button>

                  {/* Bottom scrim — no radial, pure linear bottom-up */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)",
                  }} />

                  {/* Category + title */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 20px" }}>
                    <p style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.52)",
                      margin: "0 0 4px",
                    }}>
                      {card.category}
                    </p>
                    <p style={{
                      fontFamily: "'Clash Grotesk', system-ui, sans-serif",
                      fontSize: "clamp(1.05rem, 2.4vw, 1.35rem)",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.18,
                      letterSpacing: "-0.025em",
                      margin: 0,
                    }}>
                      {card.title}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "22px 22px 26px" }}>
                  {card.content}
                </div>
              </motion.div>
            </div>
          </>
        </AnimatePresence>,
        document.body
      )}

      {/* ── Card thumbnail ────────────────────────────────────────────────────── */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          width: CARD_W,
          height: 480,
          borderRadius: 20,
          background: "#f5f5f5",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          cursor: "pointer",
          border: "none",
          padding: 0,
          textAlign: "left",
        }}
      >
        {/* Image zone — taller to reduce white text area */}
        <div style={{ height: "72%", overflow: "hidden", flexShrink: 0 }}>
          <BlurImage
            src={card.src}
            alt={card.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Hairline divider */}
        <div style={{ height: 1, background: "#e8e8e8", flexShrink: 0 }} />

        {/* Text zone */}
        <div style={{
          flex: 1,
          padding: "10px 14px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}>
          <p style={{
            fontFamily: "'Clash Grotesk', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#0f0f0f",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            margin: 0,
          }}>
            {card.title}
          </p>
          <p style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#999",
            margin: 0,
          }}>
            {card.category}
          </p>
        </div>
      </motion.button>
    </>
  );
};

/* ── BlurImage ──────────────────────────────────────────────────────────────── */

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill: _fill,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ?? "Background of a beautiful view"}
      {...rest}
    />
  );
};