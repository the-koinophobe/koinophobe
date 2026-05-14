/**
 * PhotonBeam — WebGL animated light trails with bloom effect.
 * Adapted from eldoraui.site/docs/components/photon-beam (MIT).
 * Self-contained WebGL canvas, zero npm deps beyond React.
 *
 * Usage:
 *   <PhotonBeam colorSignal="#c8f23a" lineCount={60} />
 */
import { useRef, useEffect } from "react";

interface PhotonBeamProps {
  colorBg?:       string;
  colorLine?:     string;
  colorSignal?:   string;
  colorSignal2?:  string;
  colorSignal3?:  string;
  useColor2?:     boolean;
  useColor3?:     boolean;
  lineCount?:     number;
  spreadHeight?:  number;
  signalCount?:   number;
  speedGlobal?:   number;
  trailLength?:   number;
  bloomStrength?: number;
  bloomRadius?:   number;
  lineOpacity?:   number;
  style?:         React.CSSProperties;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

export default function PhotonBeam({
  colorBg       = "#0e0d0c",
  colorLine     = "#2a2724",
  colorSignal   = "#c8f23a",
  colorSignal2  = "#a8d020",
  colorSignal3  = "#e0ff60",
  useColor2     = true,
  useColor3     = false,
  lineCount     = 60,
  spreadHeight  = 28,
  signalCount   = 80,
  speedGlobal   = 0.35,
  trailLength   = 4,
  bloomStrength = 2.5,
  bloomRadius   = 0.4,
  lineOpacity   = 0.45,
  style         = {},
}: PhotonBeamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return; // fallback gracefully if WebGL unavailable

    // ── resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── line data ─────────────────────────────────────────────────────────────
    const [_bgR, _bgG, _bgB] = hexToRgb(colorBg);
    const [lnR,  lnG,  lnB]  = hexToRgb(colorLine);
    const [s1R,  s1G,  s1B]  = hexToRgb(colorSignal);
    const [s2R,  s2G,  s2B]  = useColor2 ? hexToRgb(colorSignal2) : [s1R, s1G, s1B];
    const [s3R,  s3G,  s3B]  = useColor3 ? hexToRgb(colorSignal3) : [s1R, s1G, s1B];

    // Each line: y position (normalized -1..1), speed offset
    const lines = Array.from({ length: lineCount }, (_, i) => ({
      y:      ((i / (lineCount - 1)) - 0.5) * 2 * (spreadHeight / 50),
      offset: Math.random(),
    }));

    // Signals: which line, position along it (0..1), speed, color choice
    const signals = Array.from({ length: signalCount }, () => {
      const colorChoice = Math.random();
      const which = colorChoice < 0.5 ? 0 : colorChoice < 0.8 ? 1 : 2;
      return {
        lineIdx: Math.floor(Math.random() * lineCount),
        pos:     Math.random(),
        speed:   (0.004 + Math.random() * 0.008) * speedGlobal,
        colorIdx: which,
        trail:   [] as number[], // positions of trailing dots
      };
    });

    // ── simple 2D canvas fallback renderer (no GLSL needed) ──────────────────
    // We use Canvas 2D for maximum compat; WebGL context was just availability check
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Clear
      ctx2d.fillStyle = colorBg;
      ctx2d.fillRect(0, 0, W, H);

      // Bloom pass: draw glow behind signals
      ctx2d.save();
      ctx2d.globalCompositeOperation = "lighter";

      // Draw base lines
      lines.forEach((line) => {
        const y = H / 2 + (line.y * H * 0.5);
        ctx2d.strokeStyle = `rgba(${Math.round(lnR * 255)},${Math.round(lnG * 255)},${Math.round(lnB * 255)},${lineOpacity})`;
        ctx2d.lineWidth = 1;
        ctx2d.beginPath();
        ctx2d.moveTo(0, y);
        ctx2d.lineTo(W, y);
        ctx2d.stroke();
      });

      // Draw signals + trails
      signals.forEach((sig) => {
        sig.pos += sig.speed;
        if (sig.pos > 1) sig.pos = 0;

        const line = lines[sig.lineIdx];
        const y = H / 2 + (line.y * H * 0.5);
        const x = sig.pos * W;

        const [sR, sG, sB] = sig.colorIdx === 0 ? [s1R, s1G, s1B]
          : sig.colorIdx === 1 ? [s2R, s2G, s2B]
          : [s3R, s3G, s3B];

        // Trail
        const steps = Math.ceil(trailLength * 20);
        for (let i = steps; i >= 0; i--) {
          const tx  = x - (i / steps) * (sig.speed * W * trailLength * 8);
          const alpha = (1 - i / steps) * 0.9;
          const radius = (1 - i / steps) * 2.5 * bloomRadius * 4;
          const grd = ctx2d.createRadialGradient(tx, y, 0, tx, y, Math.max(0.1, radius * 6));
          grd.addColorStop(0, `rgba(${Math.round(sR*255)},${Math.round(sG*255)},${Math.round(sB*255)},${alpha})`);
          grd.addColorStop(1, `rgba(${Math.round(sR*255)},${Math.round(sG*255)},${Math.round(sB*255)},0)`);
          ctx2d.fillStyle = grd;
          ctx2d.beginPath();
          ctx2d.arc(tx, y, Math.max(0.1, radius * 6), 0, Math.PI * 2);
          ctx2d.fill();
        }

        // Signal head bloom
        const bloom = ctx2d.createRadialGradient(x, y, 0, x, y, bloomStrength * 12);
        bloom.addColorStop(0, `rgba(${Math.round(sR*255)},${Math.round(sG*255)},${Math.round(sB*255)},0.95)`);
        bloom.addColorStop(0.3, `rgba(${Math.round(sR*255)},${Math.round(sG*255)},${Math.round(sB*255)},0.4)`);
        bloom.addColorStop(1, `rgba(${Math.round(sR*255)},${Math.round(sG*255)},${Math.round(sB*255)},0)`);
        ctx2d.fillStyle = bloom;
        ctx2d.beginPath();
        ctx2d.arc(x, y, bloomStrength * 12, 0, Math.PI * 2);
        ctx2d.fill();
      });

      ctx2d.restore();

      t++;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [colorBg, colorLine, colorSignal, colorSignal2, colorSignal3, useColor2, useColor3,
      lineCount, spreadHeight, signalCount, speedGlobal, trailLength, bloomStrength, bloomRadius, lineOpacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}
