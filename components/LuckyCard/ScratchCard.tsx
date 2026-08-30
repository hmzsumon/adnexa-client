"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  size?: number;
  accent?: string;
  disabled?: boolean;
  onFirstScratch?: () => void;
  onComplete?: () => void;
  children: React.ReactNode; // what is revealed under the foil
}

// HTML5 canvas foil — scratch with a finger to erase it. After ~55% is
// cleared, onComplete fires and the rest fades out to reveal the content.
export default function ScratchCard({
  size = 280,
  accent = "#7C5CFC",
  disabled = false,
  onFirstScratch,
  onComplete,
  children,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const started = useRef(false);
  const done = useRef(false);
  const [cleared, setCleared] = useState(false);

  const paintCover = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#2b3350");
      g.addColorStop(0.5, accent);
      g.addColorStop(1, "#2b3350");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.textAlign = "center";
      ctx.font = "700 18px system-ui, sans-serif";
      ctx.fillText("👆 SCRATCH HERE", w / 2, h / 2 - 4);
      ctx.font = "500 12px system-ui, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillText("SCRATCH TO REVEAL", w / 2, h / 2 + 16);
    },
    [accent],
  );

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = size * dpr;
    c.height = size * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    paintCover(ctx, size, size);
  }, [size, paintCover]);

  const pos = (e: React.PointerEvent) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (c.width / r.width),
      y: (e.clientY - r.top) * (c.height / r.height),
    };
  };

  const ratio = () => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear += 1;
    return clear / (data.length / 64);
  };

  const erase = (e: React.PointerEvent) => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
  };

  const down = (e: React.PointerEvent) => {
    if (disabled || done.current) return;
    drawing.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    if (!started.current) {
      started.current = true;
      onFirstScratch?.();
    }
    erase(e);
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current || done.current) return;
    erase(e);
    if (ratio() > 0.55) {
      done.current = true;
      drawing.current = false;
      onComplete?.();
      const c = canvasRef.current!;
      const ctx = c.getContext("2d")!;
      let a = 1;
      const fade = () => {
        a -= 0.08;
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, c.width, c.height);
        if (a > 0) {
          ctx.globalAlpha = a;
          paintCover(ctx, size, size);
          ctx.globalAlpha = 1;
          requestAnimationFrame(fade);
        } else {
          setCleared(true);
        }
      };
      requestAnimationFrame(fade);
    }
  };

  const up = () => {
    drawing.current = false;
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-[#141a2e]">
        {children}
      </div>
      {!cleared && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-pointer"
          style={{ touchAction: "none" }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
        />
      )}
    </div>
  );
}
