import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerminalNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandEntry {
  command: string;
  output: React.ReactNode;
  type: 'input' | 'output' | 'error' | 'system';
}

const AVAILABLE_SECTIONS = ['services', 'projects', 'expertise', 'testimonials', 'process', 'contact'];

export function TerminalNavigation({ isOpen, onClose }: TerminalNavigationProps) {
  const [history, setHistory] = useState<CommandEntry[]>([
    {
      command: '',
      output: 'Welcome to IZERE OS v2.0. Type "help" for a list of available commands.',
      type: 'system',
    },
  ]);
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ').filter(Boolean);
    const baseCmd = args[0];

    let output: React.ReactNode = '';
    let type: 'output' | 'error' | 'system' = 'output';

    if (!baseCmd) return;

    switch (baseCmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1">
            <span>Available commands:</span>
            <span className="text-blue-400">help      - Show this help message</span>
            <span className="text-blue-400">clear     - Clear terminal output</span>
            <span className="text-blue-400">whoami    - Display current user</span>
            <span className="text-blue-400">ls        - List navigable sections</span>
            <span className="text-blue-400">cd [dir]  - Navigate to a section (e.g., 'cd projects')</span>
            <span className="text-blue-400">exit      - Close the terminal</span>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
        output = 'guest@izere-portfolio ~';
        break;
      case 'ls':
        output = (
          <div className="flex flex-wrap gap-4 text-blue-300">
            {AVAILABLE_SECTIONS.map(s => <span key={s}>{s}/</span>)}
          </div>
        );
        break;
      case 'cd':
        const target = args[1];
        if (!target) {
          output = 'cd: missing argument. Try "cd projects"';
          type = 'error';
        } else if (target === '~' || target === '/') {
           window.scrollTo({ top: 0, behavior: 'smooth' });
           output = 'Navigating to root...';
           type = 'system';
        } else if (AVAILABLE_SECTIONS.includes(target)) {
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            output = `Navigating to /${target}...`;
            type = 'system';
          } else {
            output = `cd: section ${target} not found in DOM`;
            type = 'error';
          }
        } else {
          output = `cd: no such file or directory: ${target}`;
          type = 'error';
        }
        break;
      case 'exit':
        onClose();
        return;
      default:
        // Shortcut: just typing the section name
        if (AVAILABLE_SECTIONS.includes(baseCmd)) {
          const el = document.getElementById(baseCmd);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            output = `Navigating to /${baseCmd}...`;
            type = 'system';
          }
        } else {
          output = `command not found: ${baseCmd}. Type "help" for available commands.`;
          type = 'error';
        }
        break;
    }

    setHistory((prev) => [
      ...prev,
      { command: cmd, output, type },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input;
      setInput('');
      setHistory((prev) => [...prev, { command: cmd, output: '', type: 'input' }]);
      executeCommand(cmd);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        drag={!isMaximized}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed z-[1000] flex flex-col overflow-hidden bg-black/80 backdrop-blur-md border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]",
          isMaximized 
            ? "inset-4 rounded-none" 
            : "bottom-6 right-6 w-[500px] h-[400px] max-w-[calc(100vw-3rem)] rounded-none"
        )}
      >
        {/* Terminal Header */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-between px-4 py-2 bg-blue-500/10 border-b border-blue-500/30 cursor-move select-none"
        >
          <div className="flex items-center gap-2 text-blue-400">
            <TerminalIcon className="w-4 h-4" />
            <span className="text-xs font-mono font-bold tracking-widest">SYS_TERM</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-blue-500/20 text-blue-400 transition-colors">
              <Square className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-red-500/20 hover:text-red-400 text-blue-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          data-lenis-prevent
          className="flex-1 p-4 overflow-y-auto font-mono text-sm cursor-text terminal-scrollbar"
        >
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              {entry.type === 'input' && (
                <div className="flex gap-2 text-white">
                  <span className="text-blue-500">guest@izere ~$</span>
                  <span>{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className={cn(
                  "mt-1",
                  entry.type === 'error' ? "text-red-400" :
                  entry.type === 'system' ? "text-blue-300" :
                  "text-white/70"
                )}>
                  {entry.output}
                </div>
              )}
            </div>
          ))}
          
          <div className="flex gap-2 text-white mt-2">
            <span className="text-blue-500 shrink-0">guest@izere ~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0 p-0 m-0 caret-blue-500"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
