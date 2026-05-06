import { useEffect, useRef } from "react";

// ── Grid constants ────────────────────────────────────────────────────────────
const GRID = 70;      // Version-1 QR code module count (21×21)
const MOD  = 21;      // CSS pixels per module → 231×231 px
const TOTAL = GRID * MOD;

// ── QR-code structural modules (finder patterns, timing, separators) ──────────
function getStaticValue(r: number, c: number): boolean | null {
  // Helper: test if (lr, lc) falls in a 7×7 finder pattern
  const finder = (lr: number, lc: number): boolean | null => {
    if (lr < 0 || lr > 6 || lc < 0 || lc > 6) return null;
    if (lr === 0 || lr === 6 || lc === 0 || lc === 6) return true;  // outer ring
    if (lr === 1 || lr === 5 || lc === 1 || lc === 5) return false; // white ring
    return true;                                                      // inner square
  };

  // Top-left finder
  const tl = finder(r, c);
  if (tl !== null) return tl;

  // Top-right finder
  const tr = finder(r, c - (GRID - 7));
  if (tr !== null) return tr;

  // Bottom-left finder
  const bl = finder(r - (GRID - 7), c);
  if (bl !== null) return bl;

  // Separator rows / columns (white border around finders)
  if (r === 7 && c <= 7)          return false;
  if (r <= 7 && c === 7)          return false;
  if (r === 7 && c >= GRID - 8)   return false;
  if (r <= 7 && c === GRID - 8)   return false;
  if (r >= GRID - 8 && c === 7)   return false;
  if (r === GRID - 8 && c <= 7)   return false;

  // Timing patterns (row 6 and col 6)
  if (r === 6 && c > 7 && c < GRID - 8) return c % 2 === 0;
  if (c === 6 && r > 7 && r < GRID - 8) return r % 2 === 0;

  // Dark module (QR spec, always dark)
  if (r === 8 && c === GRID - 8) return true;

  return null; // data module — animated
}

// ── Component ─────────────────────────────────────────────────────────────────
interface PixelNoiseProps {
  className?: string;
  /** Size in CSS pixels (the canvas is always square). Default = 231 */
  size?: number;
}

export function PixelNoise({ className = "", size = TOTAL }: PixelNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const t0        = useRef<number>(0);

  // Stable per-cell phase / speed arrays (set once on mount)
  const phases = useRef(new Float32Array(GRID * GRID));
  const speeds = useRef(new Float32Array(GRID * GRID));

  useEffect(() => {
    // Generate slow, wave-like phase offsets so nearby modules move together
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        const i = r * GRID + c;
        phases.current[i] =
          Math.sin(c * 0.7 + r * 0.4) * 3.0 +
          Math.cos(c * 0.3 - r * 0.9) * 2.0 +
          Math.sin((c + r) * 0.5)      * 1.5;
        // Very slow – full cycle ≈ 8–12 s
        speeds.current[i] = 0.10 + (Math.sin(c * 2.1 + r * 1.7) * 0.5 + 0.5) * 0.06;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // HiDPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const modPx = size / GRID; // module size in CSS px (fractional OK)

    const draw = (ts: number) => {
      if (!t0.current) t0.current = ts;
      const t = (ts - t0.current) / 1000; // seconds

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);

      for (let r = 0; r < GRID; r++) {
        for (let c = 0; c < GRID; c++) {
          const sv = getStaticValue(r, c);
          let scale: number;

          if (sv !== null) {
            scale = sv ? 1 : 0; // structural module — fixed
          } else {
            const i = r * GRID + c;
            // Use a diagonal wave + per-cell phase for an organic sweep effect
            const diagonal = (r + c) / (GRID * 2);
            const val = 0.5 + 0.5 * Math.sin(t * speeds.current[i] + phases.current[i] + diagonal * Math.PI * 2);
            
            // Smoother transition: map sine value to a sharp but non-binary scale
            // val 0.4-0.6 is the transition zone
            scale = Math.max(0, Math.min(1, (val - 0.4) * 5));
          }

          if (scale > 0) {
            ctx.fillStyle = "#000000";
            const currentModSize = modPx * scale;
            const offset = (modPx - currentModSize) / 2;
            
            ctx.fillRect(
              Math.round(c * modPx + offset),
              Math.round(r * modPx + offset),
              Math.ceil(currentModSize),
              Math.ceil(currentModSize),
            );
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: `${500}px`, height: `${200}px` }}
      className={className}
    />
  );
}
