import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, Clock } from "lucide-react";
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
}

export const ArticleModal = ({ isOpen, onClose, article }: ArticleModalProps) => {
  if (!article) return null;

  // Placeholder content if not provided
  const content = article.content || [
    "This is a placeholder for the technical writing. The complete article will go into the deep technical details of the selected topic.",
    "When building robust systems, one must consider various trade-offs. Architecture is fundamentally about making decisions with imperfect information. By understanding the core constraints of our domain, we can design systems that scale effectively and gracefully degrade under load.",
    "In the coming sections, we would typically dive deep into code examples, architectural diagrams, and performance metrics. We would explore how specific design patterns can mitigate common bottlenecks and improve the overall resilience of the application.",
    "Through rigorous testing and continuous profiling, we can ensure that our technical choices remain sound even as requirements evolve. We focus on maintainability as a primary objective, knowing that the cost of software lies predominantly in its lifecycle rather than its initial creation."
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4 sm:p-6 md:p-12 mt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl h-[85vh] bg-background border border-blue-500/30 pointer-events-auto shadow-2xl flex flex-col dark:bg-[#080808]"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/60 z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-[1px] bg-blue-500/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-[1px] h-12 bg-blue-500/20 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-colors text-blue-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Section */}
              <div className="w-full border-b border-blue-500/20 bg-blue-500/[0.02] p-8 md:p-12 relative flex-shrink-0">
                <div className="mb-4 flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-500/80 uppercase tracking-widest bg-blue-500/10 px-3 py-1 border border-blue-500/20">
                    <Tag className="w-3 h-3" />
                    {article.tag}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    5 min read
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-foreground leading-tight max-w-3xl">
                  {article.title}
                </h2>
                
                {/* HUD Scanline */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-8">
                  {/* Decorative starting block */}
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-full min-h-[4rem] bg-blue-500/40" />
                    <p className="text-xl md:text-2xl text-muted-foreground font-medium italic leading-relaxed border-b border-blue-500/10 pb-8">
                      {content[0]}
                    </p>
                  </div>
                  
                  {/* Rest of the content */}
                  <div className="prose prose-invert prose-blue max-w-none">
                    {content.slice(1).map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-loose mb-6 text-lg">
                        {paragraph}
                      </p>
                    ))}
                    
                    <div className="mt-12 p-6 border border-blue-500/20 bg-card">
                      <h4 className="text-sm font-mono text-blue-500 tracking-widest uppercase mb-4">Engineering Note</h4>
                      <p className="text-sm text-muted-foreground">
                        This document is a technical analysis. Implementations discussed here should be adapted to specific use cases and environments. Performance metrics are based on isolated benchmarks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
