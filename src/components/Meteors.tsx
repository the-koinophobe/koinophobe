/**
 * Meteors — diagonal animated streak particles.
 * Adapted from Aceternity UI (MIT). Zero extra dependencies.
 * Works in both dark and light themes.
 *
 * Usage:
 *   <Meteors number={18} color="#c8f23a" />
 */
import { useEffect, useRef } from "react";

interface MeteorsProps {
  number?: number;
  color?:  string;
}

interface Meteor {
  x:       number;
  y:       number;
  len:     number;
  speed:   number;
  opacity: number;
  delay:   number;
  width:   number;
  active:  boolean;
  elapsed: number;
}

function randomMeteor(W: number, _H: number): Meteor {
  return {
    x:       Math.random() * (W + 400) - 200,
    y:       -20 - Math.random() * 200,
    len:     80 + Math.random() * 180,
    speed:   4 + Math.random() * 6,
    opacity: 0.4 + Math.random() * 0.6,
    delay:   Math.random() * 3000,
    width:   1 + Math.random() * 1.5,
    active:  false,
    elapsed: 0,
  };
}

export default function Meteors({ number = 18, color = "#c8f23a" }: MeteorsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.width;
    const H = () => canvas.height;

    const meteors: Meteor[] = Array.from({ length: number }, () => randomMeteor(W(), H()));

    let last = 0;
    const tick = (ts: number) => {
      const dt = Math.min(ts - last, 50);
      last = ts;

      ctx.clearRect(0, 0, W(), H());

      meteors.forEach((m) => {
        m.elapsed += dt;
        if (!m.active && m.elapsed >= m.delay) m.active = true;
        if (!m.active) return;

        m.x += m.speed * 0.8;
        m.y += m.speed;

        // Tail gradient: head bright, tail fades
        const tailX = m.x - Math.cos((215 * Math.PI) / 180) * m.len;
        const tailY = m.y - Math.sin((215 * Math.PI) / 180) * m.len;
        const grd = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grd.addColorStop(0, `rgba(${hexToRgba(color, m.opacity)})`);
        grd.addColorStop(1, `rgba(${hexToRgba(color, 0)})`);

        ctx.save();
        ctx.strokeStyle = grd;
        ctx.lineWidth   = m.width * devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();

        // Reset when off-screen
        if (m.x > W() + 200 || m.y > H() + 200) {
          Object.assign(m, randomMeteor(W(), H()));
          m.active  = false;
          m.elapsed = 0;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [number, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

function hexToRgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b},${a}`;
}
