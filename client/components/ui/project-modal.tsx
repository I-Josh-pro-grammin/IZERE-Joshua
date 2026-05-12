import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Activity, Server, Cpu, Layers } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export interface ProjectDetail {
  problem: string;
  architecture: string;
  techStack: { name: string; reason: string }[];
  impact: { metric: string; value: string }[];
  challenges: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  if (!project) return null;

  // Placeholder details if not provided
  const details: ProjectDetail = project.details || {
    problem: "Existing solutions lacked real-time synchronization, resulting in a 3s delay during high concurrency events.",
    architecture: "Event-driven microservices utilizing Kafka for message queuing and WebSockets for real-time client updates.",
    techStack: [
      { name: "Node.js", reason: "Non-blocking I/O ideal for high-throughput websocket connections." },
      { name: "Redis", reason: "In-memory caching to reduce database read load by 85%." },
      { name: "PostgreSQL", reason: "ACID compliance for critical transactional data." }
    ],
    impact: [
      { metric: "Latency Reduced", value: "3s → 40ms" },
      { metric: "Concurrent Users", value: "100k+" },
      { metric: "Uptime", value: "99.99%" }
    ],
    challenges: "Handling race conditions during distributed state updates required implementing a distributed lock using Redis Redlock. Additionally, scaling the WebSocket layer necessitated sticky sessions and a custom load balancing strategy."
  };

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
          <div className="fixed mt-10 inset-0 z-[101] pointer-events-none flex items-center justify-center md:p-6 lg:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-full bg-[#080808] border border-blue-500/30  pointer-events-auto shadow-2xl flex flex-col md:flex-row"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/60 z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-[1px] bg-blue-500/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-[1px] h-12 bg-blue-500/20 pointer-events-none" />
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-1 right-4 z-30 p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-colors text-blue-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Visuals & Core Info */}
              <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-blue-500/20 bg-blue-500/[0.02] flex flex-col relative">
                {/* Image/Visual Area */}
                <div className="relative h-[800px] w-full overflow-hidden border-b border-blue-500/20 bg-blue-500/5 flex items-center justify-center">
                   {project.customContent ? (
                      <div className="flex flex-col items-center gap-4 text-blue-500">
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                        {project.customIcon || <Server className="w-16 h-16 z-10" />}
                      </div>
                    ) : (
                      <img 
                        src={project.image}
                        alt={project.label}
                        className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    )}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-blue-500/60 uppercase tracking-widest block mb-2">Project Classification</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase text-foreground">{project.title}</h2>
                    <h3 className="text-xl text-muted-foreground uppercase tracking-wider mt-1">{project.label}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                    {project.desc}
                  </p>

                  <div className="space-y-4">
                    {/* <Button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-none shadow-[0_0_15px_rgba(59,130,246,0.3)]" onClick={() => project.github && window.open(project.github, "_blank")}>
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button> */}
                    {project.liveUrl && (
                       <Button variant="outline" className="w-full h-12 border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white rounded-none" onClick={() => window.open(project.liveUrl, "_blank")}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Deployment
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Deep Dive Details */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                <div className="grid grid-cols-1 gap-12">
                  
                  {/* Problem & Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <h4 className="text-sm font-mono text-blue-500 tracking-widest uppercase">The Problem</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {details.problem}
                      </p>
                    </div>

                    <div>
                       <div className="flex items-center gap-2 mb-4">
                        <Cpu className="w-4 h-4 text-blue-500" />
                        <h4 className="text-sm font-mono text-blue-500 tracking-widest uppercase">System Impact</h4>
                      </div>
                      <div className="flex flex-col gap-3">
                        {details.impact.map((imp, idx) => (
                          <div key={idx} className="flex items-center justify-between border-b border-blue-500/10 pb-2">
                            <span className="text-xs text-muted-foreground uppercase">{imp.metric}</span>
                            <span className="text-sm font-bold text-foreground">{imp.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Architecture */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Layers className="w-4 h-4 text-blue-500" />
                      <h4 className="text-sm font-mono text-blue-500 tracking-widest uppercase">Architecture Overview</h4>
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/20 p-6 relative">
                      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                        {details.architecture}
                      </p>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-xl pointer-events-none" />
                    </div>
                  </div>

                  {/* Engineering Challenges */}
                  <div>
                    <h4 className="text-sm font-mono text-blue-500 tracking-widest uppercase mb-4">Engineering Challenges</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-blue-500/30 pl-4 py-1 italic">
                      {details.challenges}
                    </p>
                  </div>

                  {/* Tech Stack Breakdown */}
                  <div>
                     <h4 className="text-sm font-mono text-blue-500 tracking-widest uppercase mb-4">Technology Stack Analysis</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {details.techStack.map((tech, idx) => (
                          <div key={idx} className="bg-[#0f0f0f] border border-blue-500/10 p-4 hover:border-blue-500/30 transition-colors group">
                            <h5 className="text-sm font-bold text-foreground mb-1 group-hover:text-blue-500 transition-colors">{tech.name}</h5>
                            <p className="text-xs text-muted-foreground">{tech.reason}</p>
                          </div>
                        ))}
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
