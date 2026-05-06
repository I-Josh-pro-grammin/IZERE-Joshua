import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PixelNoise } from "./pixel-noise";

interface LoadingScreenProps {
  onComplete: () => void;
}

// Tick counter shown as streaming hex lines
const HEX_CHARS = "0123456789ABCDEF";
const randomBinary = (len: number) =>
  Array.from({ length: len }, () => (Math.random() > 0.5 ? "1" : "0")).join("");

function StreamLine({ delay }: { delay: number }) {
  // Much longer string to cover wide screens
  const [text, setText] = useState(randomBinary(128));

  useEffect(() => {
    const id = setInterval(() => setText(randomBinary(128)), 100 + Math.random() * 150);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="font-mono text-[20px] line-height-[0px] leading-none tracking-[0.3em] text-white/[0.07] whitespace-nowrap overflow-hidden"
    >
      {text}
    </motion.div>
  );
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // Drive progress bar over ~2.2 s
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      // ease-out curve
      setProgress(1 - Math.pow(1 - p, 3));

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        // Short pause then exit
        setTimeout(() => {
          setPhase("out");
          setTimeout(onComplete, 800);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "out" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background streaming hex lines - DENSE FILL */}
          <div className="absolute inset-0 flex flex-col gap-[2px] pointer-events-none select-none overflow-hidden opacity-50">
            {Array.from({ length: 120 }).map((_, i) => (
              <StreamLine key={i} delay={i * 0.01} />
            ))}
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8 w-full max-w-lg px-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-white text-4xl font-extrabold tracking-tighter leading-none">
                IZERE.
              </span>
              <span className="text-white/30 font-mono text-[10px] tracking-[0.5em] uppercase">
                Portfolio v2.0
              </span>
            </motion.div>

            {/* QR-code noise — square, centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[500px] h-[50px] overflow-hidden"
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded ring-1 ring-white/10 shadow-[0_0_60px_rgba(59,130,246,0.18)] pointer-events-none" />
              <PixelNoise size={520} className="rounded" />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full flex flex-col gap-2"
            >
              {/* Track */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full origin-left"
                  style={{ scaleX: progress, transformOrigin: "left" }}
                />
              </div>

              {/* Labels */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/30 tracking-[0.4em] uppercase">
                  Initializing
                </span>
                <span className="font-mono text-[10px] text-blue-400 tabular-nums">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 font-mono text-[9px] text-white/15 tracking-widest">
            SYS_BOOT · {new Date().getFullYear()}
          </div>
          <div className="absolute top-6 right-6 font-mono text-[9px] text-white/15 tracking-widest">
            ENV: PROD
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/15 tracking-widest">
            SECURE TRANSMISSION
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[9px] text-blue-500/40 tracking-widest">
            ● ONLINE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
