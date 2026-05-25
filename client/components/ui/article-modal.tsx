import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface Article {
  title: string;
  date: string;
  tag: string;
  content?: string[];
}

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ArticleModal = ({ isOpen, onClose, article, onNext, onPrev }: ArticleModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onNext, onPrev]);

  if (!article) return null;

  const content = article.content || [];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur cursor-pointer"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4 sm:p-6 md:p-12 mt-10">
            <motion.div
              key={article.title} // Forces re-animation when article changes
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl h-[85vh] bg-background border border-blue-500/40 pointer-events-auto shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col dark:bg-[#050505] overflow-hidden"
            >
              {/* Decorative Tech Grid Background */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/80 z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-[1px] bg-blue-500/40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-[1px] h-12 bg-blue-500/40 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-2 bg-blue-500/10 hover:bg-blue-500 border border-blue-500/30 transition-all duration-300 text-blue-500 hover:text-white group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Header Section */}
              <div className="w-full border-b border-blue-500/30 bg-blue-500/[0.03] p-6 sm:p-8 md:p-12 relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                <div className="mb-6 flex flex-wrap gap-4 items-center relative z-10">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <Tag className="w-3 h-3" />
                    {article.tag}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <Calendar className="w-3 h-3 text-blue-500/50" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <Clock className="w-3 h-3 text-blue-500/50" />
                    5 min read
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-foreground leading-tight max-w-3xl relative z-10">
                  {article.title}
                </h2>
                
                {/* HUD Scanline */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar relative z-10" data-lenis-prevent="true" onWheel={(e) => e.stopPropagation()}>
                <div className="max-w-3xl mx-auto space-y-8 pb-12">
                  {/* Decorative starting block */}
                  <div className="flex gap-6 items-start">
                    <div className="w-1.5 h-full min-h-[4rem] bg-gradient-to-b from-blue-500 to-blue-500/10" />
                    <p className="text-xl md:text-2xl text-muted-foreground font-medium italic leading-relaxed border-b border-blue-500/20 pb-8 relative">
                      {content[0]}
                    </p>
                  </div>
                  
                  {/* Rest of the content */}
                  <div className="prose prose-invert prose-blue max-w-none">
                    {content.slice(1).map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-loose mb-6 text-lg tracking-wide">
                        {paragraph}
                      </p>
                    ))}
                    
                    <div className="mt-16 p-6 border border-blue-500/30 bg-blue-500/[0.02] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-500/10 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                      <h4 className="text-sm font-mono text-blue-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 animate-pulse" />
                        Engineering Note
                      </h4>
                      <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                        This document is a technical analysis. Implementations discussed here should be adapted to specific use cases and environments. Performance metrics are based on isolated benchmarks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="max-w-3xl mx-auto mt-8 flex items-center justify-between border-t border-blue-500/20 pt-8 pb-4">
                  {onPrev ? (
                    <button 
                      onClick={onPrev}
                      className="flex items-center gap-3 px-6 py-3 border border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 font-mono text-xs tracking-widest uppercase group bg-blue-500/5"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Previous
                    </button>
                  ) : <div />}

                  {onNext ? (
                    <button 
                      onClick={onNext}
                      className="flex items-center gap-3 px-6 py-3 border border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 font-mono text-xs tracking-widest uppercase group bg-blue-500/5"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : <div />}
                </div>

              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
