import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechWinkProps {
  className?: string;
}

export const TechWink = ({ className }: TechWinkProps) => {
  return (
    <span className={cn("inline-flex items-center justify-center vertical-middle ml-1.5 relative group cursor-pointer", className)}>
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-500 transition-colors duration-300 group-hover:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        whileHover={{ scale: 1.1 }}
      >
        {/* Futuristic HUD Outer Dashed Circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="10.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 2"
          className="opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Outer Solid Target Accents */}
        <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="0.5" className="opacity-15" />
        
        {/* Right Eye: Advanced glowing crosshair / Target Reticle */}
        <g className="opacity-90">
          <circle cx="16.5" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          <motion.circle
            cx="16.5"
            cy="10.5"
            r="1"
            fill="currentColor"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Crosshair ticks */}
          <line x1="16.5" y1="7" x2="16.5" y2="8" stroke="currentColor" strokeWidth="0.8" />
          <line x1="16.5" y1="13" x2="16.5" y2="14" stroke="currentColor" strokeWidth="0.8" />
          <line x1="13" y1="10.5" x2="14" y2="10.5" stroke="currentColor" strokeWidth="0.8" />
          <line x1="19" y1="10.5" x2="20" y2="10.5" stroke="currentColor" strokeWidth="0.8" />
        </g>

        {/* Left Eye: The "Wink" eye, interactive and animated on hover/loop */}
        <motion.path
          d="M 6.5 10.5 Q 8.5 7.5 10.5 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          variants={{
            wink: {
              d: "M 6.5 11 Q 8.5 13.5 10.5 11",
              transition: { duration: 0.15 }
            },
            normal: {
              d: "M 6.5 10.5 Q 8.5 7.5 10.5 10.5",
              transition: { duration: 0.3 }
            }
          }}
          initial="normal"
          animate="normal"
          whileHover="wink"
          className="group-hover:animate-none"
          // We also trigger a wink cycle automatically every few seconds to keep it "alive"
          onAnimationComplete={async () => {
            // Keep it dynamic
          }}
        />
        
        {/* We can overlay a looping wink animation */}
        <motion.path
          d="M 6.5 10.5 C 6.5 10.5 8.5 12.5 10.5 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="opacity-90"
          animate={{
            d: [
              "M 6.5 10.5 Q 8.5 9 10.5 10.5",     // Normal
              "M 6.5 10.5 Q 8.5 9 10.5 10.5",     // Normal
              "M 6.5 11.5 Q 8.5 11.5 10.5 11.5",  // Wink / closed
              "M 6.5 10.5 Q 8.5 9 10.5 10.5",     // Normal
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.8, 0.85, 0.9],
            ease: "easeInOut"
          }}
        />

        {/* Futuristic Grid Accent Smile */}
        <motion.path
          d="M 7.5 15.5 Q 12 19 16.5 15.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className="opacity-90"
          animate={{
            d: [
              "M 7.5 15.5 Q 12 19 16.5 15.5",
              "M 7.5 15.5 Q 12 20 16.5 15.5",
              "M 7.5 15.5 Q 12 19 16.5 15.5",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle holographic glare effect */}
        <motion.path
          d="M 4 5 L 8 4"
          stroke="currentColor"
          strokeWidth="1"
          className="opacity-40"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.svg>
      
      {/* Glow Backdrop */}
      <span className="absolute inset-0 bg-blue-500/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </span>
  );
};
