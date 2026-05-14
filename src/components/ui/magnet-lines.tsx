/**
 * MagnetLines — React Bits
 * Source: https://reactbits.dev/animations/magnet-lines
 * Install: npx shadcn@latest add @react-bits/MagnetLines-TS-CSS
 * No extra npm deps needed beyond React.
 */
import React, { useRef, useEffect, useCallback } from "react";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  style?: React.CSSProperties;
  className?: string;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "black",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  style = {},
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: rows * columns });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const spans = containerRef.current?.querySelectorAll("span");
      if (!spans) return;

      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle =
          Math.atan2(e.clientY - centerY, e.clientX - centerX) *
          (180 / Math.PI);
        span.style.setProperty("--angle", `${angle}deg`);
      });
    },
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <>
      <style>{`
        .magnet-lines-container {
          display: grid;
          place-items: center;
        }
        .magnet-lines-container span {
          display: block;
          transform: rotate(var(--angle, ${baseAngle}deg));
          transition: transform 0.1s ease;
          will-change: transform;
          background-color: ${lineColor};
        }
      `}</style>
      <div
        ref={containerRef}
        className={`magnet-lines-container ${className}`}
        style={{
          width: containerSize,
          height: containerSize,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          ...style,
        }}
      >
        {items.map((_, i) => (
          <span
            key={i}
            style={{
              width: lineWidth,
              height: lineHeight,
              borderRadius: "9999px",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default MagnetLines;
