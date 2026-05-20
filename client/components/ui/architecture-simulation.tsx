import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Shield, Database, Cpu, MessageSquare, 
  Terminal as TerminalIcon, AlertTriangle, CheckCircle, 
  Play, Pause, RefreshCw, Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Node {
  id: string;
  name: string;
  role: string;
  tech: string[];
  desc: string;
  coords: { x: number; y: number }; // percentage coords
  icon: React.ComponentType<any>;
  color: string;
}

interface Packet {
  id: string;
  path: string[];
  progress: number;
  color: string;
  status: 'active' | 'blocked' | 'success';
}

interface LogEntry {
  timestamp: string;
  node: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

const NODES: Node[] = [
  {
    id: 'client',
    name: 'Client App',
    role: 'Frontend / User App',
    tech: ['React 18', 'Vite', 'TailwindCSS'],
    desc: 'The user facing SPA interface. Dispatches HTTPS/REST requests and listens for real-time WebSocket updates.',
    coords: { x: 5, y: 50 },
    icon: Smartphone,
    color: 'border-blue-400 text-blue-400 bg-blue-500/10'
  },
  {
    id: 'gateway',
    name: 'API Gateway',
    role: 'Reverse Proxy & Router',
    tech: ['Golang', 'Gin', 'Nginx'],
    desc: 'The single entrypoint for all requests. Performs SSL termination, routes endpoints, and forwards requests to target services.',
    coords: { x: 22, y: 50 },
    icon: Shield,
    color: 'border-cyan-400 text-cyan-400 bg-cyan-500/10'
  },
  {
    id: 'limiter',
    name: 'Rate Limiter',
    role: 'Redis Token-Bucket Shield',
    tech: ['Redis', 'Lua Scripting'],
    desc: 'Mitigates DDoS and brute-force attacks by inspecting client IP/token headers and rate-limiting requests dynamically.',
    coords: { x: 38, y: 20 },
    icon: Shield,
    color: 'border-purple-400 text-purple-400 bg-purple-500/10 animate-pulse'
  },
  {
    id: 'auth',
    name: 'Auth Service',
    role: 'Identity Management',
    tech: ['Go', 'gRPC', 'JWT', 'Argon2'],
    desc: 'Verifies authentication tokens, credentials, and parses user RBAC scopes before executing business operations.',
    coords: { x: 55, y: 20 },
    icon: Cpu,
    color: 'border-indigo-400 text-indigo-400 bg-indigo-500/10'
  },
  {
    id: 'user',
    name: 'User Service',
    role: 'Domain Account Service',
    tech: ['Rust', 'Actix-Web', 'SQLx'],
    desc: 'Handles profile creation, account modifications, and fetches user status records with high memory efficiency.',
    coords: { x: 55, y: 50 },
    icon: Server,
    color: 'border-emerald-400 text-emerald-400 bg-emerald-500/10'
  },
  {
    id: 'order',
    name: 'Order Service',
    role: 'Checkout & Operations',
    tech: ['Go', 'GraphQL', 'gRPC'],
    desc: 'Handles purchase requests and transaction logs. Publishes events asynchronously to Kafka broker upon creation.',
    coords: { x: 55, y: 80 },
    icon: Server,
    color: 'border-teal-400 text-teal-400 bg-teal-500/10'
  },
  {
    id: 'cache',
    name: 'Redis Cache',
    role: 'In-Memory Key-Value Store',
    tech: ['Redis Core', 'LRU eviction'],
    desc: 'Speeds up read latency by caching active user sessions and frequently searched project products (0.5ms reads).',
    coords: { x: 75, y: 20 },
    icon: Database,
    color: 'border-pink-400 text-pink-400 bg-pink-500/10'
  },
  {
    id: 'kafka',
    name: 'Kafka Broker',
    role: 'Event Streaming Backbone',
    tech: ['Apache Kafka', 'KRaft'],
    desc: 'Decoupled event queue. Orchestrates message distribution for asynchronous jobs like invoice emailing and telemetry logs.',
    coords: { x: 75, y: 80 },
    icon: MessageSquare,
    color: 'border-amber-400 text-amber-400 bg-amber-500/10'
  },
  {
    id: 'database',
    name: 'PostgreSQL DB',
    role: 'Relational Database',
    tech: ['PostgreSQL 16', 'TimescaleDB'],
    desc: 'Primary ACID-compliant persistence layer. Leverages indexing, transaction isolation levels, and regular automated backups.',
    coords: { x: 92, y: 50 },
    icon: Database,
    color: 'border-rose-400 text-rose-400 bg-rose-500/10'
  }
];

export function ArchitectureSimulation() {
  const [selectedNode, setSelectedNode] = useState<Node>(NODES[1]); // Default API Gateway
  const [simMode, setSimMode] = useState<'idle' | 'healthy' | 'ddos'>('idle');
  const [packets, setPackets] = useState<Packet[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Add event log helper
  const addLog = (node: string, message: string, type: LogEntry['type'] = 'info') => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    setLogs((prev) => [
      ...prev.slice(-49), // Keep last 50 logs
      { timestamp, node, message, type }
    ]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Initial welcome logs
  useEffect(() => {
    setLogs([
      { timestamp: '21:24:00', node: 'SYSTEM', message: 'Visualizing Event-Driven Microservices cluster...', type: 'info' },
      { timestamp: '21:24:01', node: 'SYSTEM', message: 'API Gateway ready on port :443', type: 'success' },
      { timestamp: '21:24:01', node: 'REDIS', message: 'Rate Limiter shielding active. Bucket size: 10.', type: 'info' }
    ]);
  }, []);

  // Packet factory and routing logic
  const firePacket = (isDdos = false) => {
    const id = Math.random().toString(36).substring(7);
    
    // Healthy or normal traffic route
    let paths = ['client', 'gateway', 'limiter'];
    if (!isDdos) {
      // Pick random destination service
      const targetService = ['auth', 'user', 'order'][Math.floor(Math.random() * 3)];
      paths.push(targetService);
      if (targetService === 'auth') paths.push('cache', 'database');
      else if (targetService === 'user') paths.push('cache', 'database');
      else if (targetService === 'order') paths.push('kafka', 'database');
    }

    const newPacket: Packet = {
      id,
      path: paths,
      progress: 0,
      color: isDdos ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-green-400 shadow-[0_0_10px_#4ade80]',
      status: 'active'
    };

    setPackets((prev) => [...prev, newPacket]);
  };

  // Continuous traffic generator based on simulation mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (simMode === 'healthy') {
      interval = setInterval(() => {
        firePacket(false);
      }, 900);
    } else if (simMode === 'ddos') {
      interval = setInterval(() => {
        // Heavy burst: fires 4 ddos packets and 1 normal packet
        firePacket(true);
        firePacket(true);
        firePacket(true);
        firePacket(false);
      }, 350);
    }
    return () => clearInterval(interval);
  }, [simMode]);

  // Animate packets along their routes
  useEffect(() => {
    const interval = setInterval(() => {
      setPackets((prevPackets) => {
        return prevPackets
          .map((p) => {
            const nextProgress = p.progress + 0.08; // speed of packet
            const currentIdx = Math.floor(p.progress * (p.path.length - 1));
            const currentNode = p.path[currentIdx];

            // If the packet passes a node, emit systems log
            if (Math.abs((nextProgress * (p.path.length - 1)) - (currentIdx + 1)) < 0.05) {
              const arrivedNodeId = p.path[currentIdx + 1];
              if (arrivedNodeId) {
                const arrivedNode = NODES.find(n => n.id === arrivedNodeId);
                
                // Rate limit drop logic!
                if (arrivedNodeId === 'limiter' && p.color.includes('red')) {
                  addLog('LIMITER', '⚠️ RATE LIMIT EXCEEDED. Packet dropped (429 Too Many Requests).', 'error');
                  return { ...p, progress: 1, status: 'blocked', color: 'bg-red-600/20 shadow-none' };
                }

                // Normal logging
                if (arrivedNodeId === 'gateway') {
                  addLog('GATEWAY', `Incoming REST request routed...`, 'info');
                } else if (arrivedNodeId === 'limiter') {
                  addLog('REDIS', 'Token verified (Rate Limit OK). Fwd request.', 'success');
                } else if (arrivedNodeId === 'auth') {
                  addLog('AUTH', 'JWT parsed. User credentials verified.', 'success');
                } else if (arrivedNodeId === 'user') {
                  addLog('USER_SVC', 'Profile fetched.', 'info');
                } else if (arrivedNodeId === 'order') {
                  addLog('ORDER_SVC', 'Order record initialized.', 'info');
                } else if (arrivedNodeId === 'cache') {
                  addLog('REDIS', 'Read hit. Session key loaded.', 'success');
                } else if (arrivedNodeId === 'kafka') {
                  addLog('KAFKA', 'Topic transaction: order.completed queued.', 'warn');
                } else if (arrivedNodeId === 'database') {
                  addLog('POSTGRES', 'ACID transaction committed successfully.', 'success');
                }
              }
            }

            if (nextProgress >= 1) {
              return { ...p, progress: 1, status: p.status === 'active' ? 'success' : p.status };
            }
            return { ...p, progress: nextProgress };
          })
          .filter((p) => p.progress < 1 && p.status === 'active'); // Clear completed/dropped packets
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Helper to interpolate position along a multi-node pathway
  const getPacketPosition = (packet: Packet) => {
    const totalSegments = packet.path.length - 1;
    if (totalSegments <= 0) return { left: '0%', top: '0%' };

    const rawIdx = packet.progress * totalSegments;
    const currentSegment = Math.min(Math.floor(rawIdx), totalSegments - 1);
    const segmentProgress = rawIdx - currentSegment;

    const startNode = NODES.find((n) => n.id === packet.path[currentSegment]);
    const endNode = NODES.find((n) => n.id === packet.path[currentSegment + 1]);

    if (!startNode || !endNode) return { left: '0%', top: '0%' };

    const currentX = startNode.coords.x + (endNode.coords.x - startNode.coords.x) * segmentProgress;
    const currentY = startNode.coords.y + (endNode.coords.y - startNode.coords.y) * segmentProgress;

    return {
      left: `${currentX}%`,
      top: `${currentY}%`
    };
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full border border-blue-500/20 bg-black/40 backdrop-blur-md p-6 font-mono text-sm overflow-hidden z-10 relative">
      
      {/* Visual Canvas Area */}
      <div className="flex-1 min-h-[460px] relative border border-blue-500/10 p-4 bg-black/60 overflow-hidden">
        
        {/* Neon HUD Background Grid */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        
        {/* Visual Pathways (SVG Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          {/* Main system line routes */}
          <line x1="5%" y1="50%" x2="22%" y2="50%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="22%" y1="50%" x2="38%" y2="20%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="22%" y1="50%" x2="55%" y2="50%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="22%" y1="50%" x2="55%" y2="80%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="38%" y1="20%" x2="55%" y2="20%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="55%" y1="20%" x2="75%" y2="20%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="55%" y1="50%" x2="75%" y2="20%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="55%" y1="80%" x2="75%" y2="80%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          
          <line x1="75%" y1="20%" x2="92%" y2="50%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="55%" y1="50%" x2="92%" y2="50%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="75%" y1="80%" x2="92%" y2="50%" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Animated Packets */}
        <AnimatePresence>
          {packets.map((p) => {
            const pos = getPacketPosition(p);
            return (
              <motion.div
                key={p.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={cn(
                  "absolute w-2.5 h-2.5 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 transition-shadow duration-300",
                  p.color
                )}
                style={{
                  left: pos.left,
                  top: pos.top
                }}
              />
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        {NODES.map((n) => {
          const NodeIcon = n.icon;
          const isSelected = selectedNode.id === n.id;
          return (
            <motion.button
              key={n.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedNode(n)}
              className={cn(
                "absolute border px-2.5 py-1.5 flex items-center gap-1.5 transition-all z-10 -translate-x-1/2 -translate-y-1/2 rounded-none",
                n.color,
                isSelected ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105" : "border-opacity-40"
              )}
              style={{
                left: `${n.coords.x}%`,
                top: `${n.coords.y}%`
              }}
            >
              <NodeIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="text-[10px] font-bold tracking-tight select-none uppercase hidden sm:inline">{n.name}</span>
            </motion.button>
          );
        })}

        {/* Simulation Controls Panel (HUD Float) */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-between items-center bg-black/80 border border-blue-500/20 p-2.5 z-20">
          <div className="flex gap-2">
            <button
              onClick={() => firePacket(false)}
              className="px-3 py-1 bg-blue-500/10 border border-blue-500/40 hover:bg-blue-500/30 text-blue-400 text-xs font-bold uppercase transition-colors rounded-none flex items-center gap-1"
            >
              <Play className="w-3 h-3" /> Fwd Request
            </button>
            <button
              onClick={() => setSimMode(simMode === 'healthy' ? 'idle' : 'healthy')}
              className={cn(
                "px-3 py-1 border text-xs font-bold uppercase transition-all rounded-none flex items-center gap-1",
                simMode === 'healthy' 
                  ? "bg-green-500/20 border-green-500 text-green-400" 
                  : "bg-blue-500/10 border-blue-500/40 hover:bg-blue-500/30 text-blue-400"
              )}
            >
              <RefreshCw className={cn("w-3 h-3", simMode === 'healthy' && "animate-spin")} />
              {simMode === 'healthy' ? 'Stop Stream' : 'Auto Flow'}
            </button>
            <button
              onClick={() => setSimMode(simMode === 'ddos' ? 'idle' : 'ddos')}
              className={cn(
                "px-3 py-1 border text-xs font-bold uppercase transition-all rounded-none flex items-center gap-1",
                simMode === 'ddos' 
                  ? "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)] animate-pulse" 
                  : "bg-red-500/10 border-red-500/40 hover:bg-red-500/30 text-red-400"
              )}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {simMode === 'ddos' ? 'Stop DDoS' : 'Sim DDoS'}
            </button>
          </div>

          <div className="text-[10px] uppercase text-blue-400 font-bold tracking-widest hidden md:block">
            Cluster State: <span className={cn(
              simMode === 'ddos' ? "text-red-500" : simMode === 'healthy' ? "text-green-400 animate-pulse" : "text-blue-400"
            )}>
              {simMode === 'ddos' ? "UNDER_DDoS_ATTACK" : simMode === 'healthy' ? "STEADY_LOAD" : "SYS_IDLE"}
            </span>
          </div>
        </div>
      </div>

      {/* Side HUD Panel: Node Inspector & Live logs */}
      <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
        
        {/* Node Inspector */}
        <div className="border border-blue-500/20 bg-black/60 p-4 flex-1 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-2 mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">Node Inspector</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/15 text-blue-300 uppercase tracking-widest font-semibold border border-blue-500/30">ONLINE</span>
            </div>
            
            <div className="text-white text-base font-bold uppercase tracking-tight mb-0.5">
              {selectedNode.name}
            </div>
            <div className="text-blue-500/80 text-[10px] uppercase tracking-wide font-extrabold mb-3">
              {selectedNode.role}
            </div>
            
            <p className="text-white/60 text-xs leading-relaxed mb-4">
              {selectedNode.desc}
            </p>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-blue-500/40 block mb-1.5">Technologies:</span>
            <div className="flex flex-wrap gap-1">
              {selectedNode.tech.map((t, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] font-mono px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-none uppercase select-none font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Systems logs terminal */}
        <div className="border border-blue-500/20 bg-black/60 p-4 h-[200px] flex flex-col">
          <div className="flex items-center justify-between border-b border-blue-500/20 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-blue-400">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span className="text-xs uppercase font-extrabold tracking-wider">LOG_STREAM</span>
            </div>
            <button 
              onClick={() => setLogs([])}
              className="text-[9px] uppercase hover:text-white text-blue-500/50 transition-colors font-bold"
            >
              Clear
            </button>
          </div>

          <div 
            data-lenis-prevent
            className="flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed space-y-1 terminal-scrollbar select-none cursor-default"
          >
            {logs.map((log, index) => (
              <div key={index} className="flex gap-1.5 items-start">
                <span className="text-blue-500/40 shrink-0 font-bold select-none">{log.timestamp}</span>
                <span className="text-blue-300 font-semibold uppercase shrink-0 select-none">[{log.node}]</span>
                <span className={cn(
                  "font-medium",
                  log.type === 'error' ? "text-red-400" :
                  log.type === 'success' ? "text-green-400" :
                  log.type === 'warn' ? "text-amber-400" :
                  "text-white/70"
                )}>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}
