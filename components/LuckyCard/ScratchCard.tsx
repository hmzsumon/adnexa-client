"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  /** ফিক্সড সাইজ (px)। না দিলে কনটেইনারের প্রস্থ অনুযায়ী রেসপন্সিভ হয়। */
  size?: number;
  accent?: string;
  disabled?: boolean;
  /** কত অংশ ঘষলে রিভিল হবে (0–1), ডিফল্ট 0.5 */
  threshold?: number;
  onFirstScratch?: () => void;
  onComplete?: () => void;
  children: React.ReactNode; // ফয়েলের নিচে যা দেখা যাবে
}

// HTML5 canvas foil — আঙুল দিয়ে ঘষে মুছে ফেলা যায়। মোবাইলের জন্য অপটিমাইজড:
//  • Pointer Events + setPointerCapture (মাউস/টাচ/পেন সব একসাথে)
//  • non-passive touchmove -> preventDefault (iOS স্ক্রল / রাবার-ব্যান্ড বন্ধ)
//  • পয়েন্টের মাঝে ইন্টারপোলেশন — দ্রুত টান দিলেও দাগ ফাঁকা পড়ে না
//  • 64×64 অফস্ক্রিন ট্র্যাকার দিয়ে প্রগ্রেস মাপা (প্রতি মুভে getImageData নয়)
//  • কনটেইনার অনুযায়ী রেসপন্সিভ সাইজ
export default function ScratchCard({
  size,
  accent = "#7C5CFC",
  disabled = false,
  threshold = 0.5,
  onFirstScratch,
  onComplete,
  children,
}: ScratchCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLCanvasElement | null>(null); // 64×64 অফস্ক্রিন

  const drawing = useRef(false);
  const started = useRef(false);
  const done = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const lastCheck = useRef(0);

  const [dim, setDim] = useState(size ?? 280);
  const [cleared, setCleared] = useState(false);

  // ----- কনটেইনার অনুযায়ী রেসপন্সিভ সাইজ -----
  useEffect(() => {
    if (size) {
      setDim(size);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 280;
      setDim(Math.max(220, Math.min(360, Math.round(w))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [size]);

  const paintCover = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#2b3350");
      g.addColorStop(0.5, accent);
      g.addColorStop(1, "#2b3350");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // হালকা "স্ক্র্যাচ" টেক্সচার
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 2;
      for (let i = -h; i < w; i += 14) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.textAlign = "center";
      ctx.font = "700 18px system-ui, -apple-system, sans-serif";
      ctx.fillText("👆 আঙুল দিয়ে ঘষুন", w / 2, h / 2 - 4);
      ctx.font = "500 12px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.fillText("SCRATCH TO REVEAL", w / 2, h / 2 + 16);
    },
    [accent],
  );

  // ----- canvas + tracker সেটআপ / রি-সাইজ -----
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(dim * dpr);
    c.height = Math.round(dim * dpr);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    paintCover(ctx, dim, dim);

    // অফস্ক্রিন ট্র্যাকার — একই ঘষা স্কেল-ডাউন করে এখানেও আঁকি, সস্তা মাপ
    const t = document.createElement("canvas");
    t.width = 64;
    t.height = 64;
    const tctx = t.getContext("2d");
    if (tctx) {
      tctx.fillStyle = "#000";
      tctx.fillRect(0, 0, 64, 64);
    }
    trackRef.current = t;

    done.current = false;
    started.current = false;
    last.current = null;
    setCleared(false);
  }, [dim, paintCover]);

  // ----- iOS-এ পেজ স্ক্রল ঠেকাতে non-passive touchmove -----
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const stop = (e: TouchEvent) => {
      if (drawing.current) e.preventDefault();
    };
    c.addEventListener("touchmove", stop, { passive: false });
    c.addEventListener("touchstart", stop, { passive: false });
    return () => {
      c.removeEventListener("touchmove", stop);
      c.removeEventListener("touchstart", stop);
    };
  }, []);

  const pointPos = (e: React.PointerEvent) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * dim,
      y: ((e.clientY - r.top) / r.height) * dim,
    };
  };

  // মূল canvas + ট্র্যাকারে একটা সেগমেন্ট মুছি (লাইন + দুই মাথায় বৃত্ত)
  const eraseSegment = (
    from: { x: number; y: number } | null,
    to: { x: number; y: number },
  ) => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const brush = Math.max(20, dim * 0.11);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = brush * 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from ? from.x : to.x, from ? from.y : to.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, brush, 0, Math.PI * 2);
    ctx.fill();

    // ট্র্যাকারে স্কেল-ডাউন (dim -> 64)
    const t = trackRef.current;
    if (t) {
      const tctx = t.getContext("2d")!;
      const s = 64 / dim;
      const tb = Math.max(2, brush * s);
      tctx.globalCompositeOperation = "destination-out";
      tctx.lineWidth = tb * 2;
      tctx.lineCap = "round";
      tctx.lineJoin = "round";
      tctx.beginPath();
      tctx.moveTo(from ? from.x * s : to.x * s, from ? from.y * s : to.y * s);
      tctx.lineTo(to.x * s, to.y * s);
      tctx.stroke();
      tctx.beginPath();
      tctx.arc(to.x * s, to.y * s, tb, 0, Math.PI * 2);
      tctx.fill();
    }
  };

  const clearedRatio = () => {
    const t = trackRef.current;
    if (!t) return 0;
    const tctx = t.getContext("2d")!;
    const { data } = tctx.getImageData(0, 0, 64, 64);
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] === 0) clear += 1;
    return clear / (data.length / 4);
  };

  const finish = () => {
    if (done.current) return;
    done.current = true;
    drawing.current = false;
    onComplete?.();
    const c = canvasRef.current;
    if (!c) {
      setCleared(true);
      return;
    }
    const ctx = c.getContext("2d")!;
    let a = 1;
    const fade = () => {
      a -= 0.09;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, c.width, c.height);
      if (a > 0) {
        ctx.globalAlpha = a;
        paintCover(ctx, dim, dim);
        ctx.globalAlpha = 1;
        requestAnimationFrame(fade);
      } else {
        setCleared(true);
      }
    };
    requestAnimationFrame(fade);
  };

  const maybeCheck = () => {
    const now = performance.now();
    if (now - lastCheck.current < 90) return;
    lastCheck.current = now;
    if (clearedRatio() >= threshold) finish();
  };

  const down = (e: React.PointerEvent) => {
    if (disabled || done.current) return;
    e.preventDefault();
    drawing.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const p = pointPos(e);
    last.current = p;
    eraseSegment(null, p);
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current || done.current) return;
    e.preventDefault();

    if (!started.current) {
      started.current = true;
      onFirstScratch?.();
    }

    // কিছু ব্রাউজারে একসাথে একাধিক পয়েন্ট আসে — সবগুলো ব্যবহার করি
    const evs =
      typeof e.nativeEvent.getCoalescedEvents === "function"
        ? e.nativeEvent.getCoalescedEvents()
        : [e.nativeEvent];

    for (const ne of evs.length ? evs : [e.nativeEvent]) {
      const c = canvasRef.current!;
      const r = c.getBoundingClientRect();
      const p = {
        x: ((ne.clientX - r.left) / r.width) * dim,
        y: ((ne.clientY - r.top) / r.height) * dim,
      };
      eraseSegment(last.current, p);
      last.current = p;
    }
    maybeCheck();
  };

  const up = (e?: React.PointerEvent) => {
    drawing.current = false;
    last.current = null;
    if (e) {
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[360px] select-none overflow-hidden rounded-3xl border border-white/10"
      style={{
        width: size ? size : undefined,
        height: dim,
        touchAction: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
        overscrollBehavior: "contain",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-[#141a2e]">
        {children}
      </div>
      {!cleared && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-pointer touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={() => {
            // ক্যাপচার থাকলে leave-এ থামানো ঠিক নয়; ক্যাপচার না থাকলে থামাই
            if (!drawing.current) return;
          }}
        />
      )}
    </div>
  );
}
