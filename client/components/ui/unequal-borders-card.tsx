import { cn } from "@/lib/utils";

interface UnequalBordersCardProps {
  title: string;
  date: string;
  tag: string;
  className?: string;
}

const UnequalBordersCard = ({ title, date, tag, className }: UnequalBordersCardProps) => {
  return (
    <div className={cn("relative w-full h-[30rem] bg-card border-2 border-b-0 border-r-0 border-blue-500/50 rounded-none overflow-hidden group transition-all duration-500 hover:border-blue-500", className)}>
      {/* Short right border */}
      <div className="absolute right-[0.2px] top-0 h-[100%] w-[1px] bg-blue-500/ group-hover:bg-blue-500 transition-colors"></div>

      {/* Content Area */}
      <div className="relative z-10 p-6 flex flex-col h-[10rem] justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono text-blue-500/60 uppercase tracking-[0.2em]">{tag}</span>
            <span className="text-[10px] font-mono text-blue-500/40 uppercase tracking-widest">{date}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground uppercase tracking-tight group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
        </div>

        
      </div>
      {/* Footer/Meta section in the card */}
        <div className="absolute bottom-1 right-5 z-50 items-center gap-2 mt-auto">
          <div className="w-1.5 h-1.5 bg-blue-500/60" />
          <span className="text-[10px] font-mono text-blue-500/60 uppercase tracking-widest">Technical Bulletin</span>
        </div>
      {/* Bottom Cut Corner - Main Decoration */}
      <div className="absolute -bottom-[32px] left-[47%] w-[10%] h-[40px] -rotate-[50deg] origin-left border-t-2 border-blue-500/50 bg-card group-hover:border-blue-500 transition-all duration-500">
      </div>

      {/* Bottom Cut Corner - Main Decoration */}
      <div className="absolute -bottom-[2.4rem] w-[43%] h-[40px] border-t-2 border-blue-500/50 bg-card group-hover:border-blue-500 transition-all duration-500">
      </div>

      {/* Bottom Cut Corner - Main Decoration */}
      <div className="absolute -bottom-[1.8rem] left-[50%] w-[50%] h-[3.8rem] border-t-2 border-blue-500/50 bg-card group-hover:border-blue-500 transition-all duration-500">
      </div>

      {/* Additional HUD Details */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1 h-1 bg-blue-500/20" />
        <div className="w-1 h-1 bg-blue-500/20" />
      </div>

      {/* HUD Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
    </div>
  );
};

export default UnequalBordersCard;
