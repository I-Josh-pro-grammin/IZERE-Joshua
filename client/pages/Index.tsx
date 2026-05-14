import { Github, Linkedin, Mail, ArrowUpRight, Plus, Menu, X, Send, Loader2, CheckCircle, Check, Globe, Smartphone, Layout, Palette, Sun, Moon, Phone, Download, Server } from "lucide-react";

const bCode = "/bcode.png";
const akaguriro = "/akaguriroo.png";
const projects = "/projects.png";
const joshImg = "/nkera.jpeg";
const ebuy = "/ebuy.png";
const Bora = "/Bora.png";
const vantage = "/Vantage.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { ProjectModal } from "@/components/ui/project-modal";
import UnequalBordersCard from "@/components/ui/unequal-borders-card";

// Reusable Technical HUD Card
const TechnicalCard = ({
  children,
  title,
  label,
  meta,
  icon,
  className
}: {
  children?: React.ReactNode,
  title?: string,
  label?: string,
  meta?: string,
  icon?: React.ReactNode,
  className?: string
}) => {
  return (
    <div
      className={cn("relative bg-card border border-blue-500/20 rounded-none overflow-hidden group transition-all duration-500 hover:border-blue-500/50 p-10 shadow-sm dark:shadow-none", className)}
    >
      {/* HUD Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/40" />
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1 h-1 bg-blue-500/20" />
        <div className="w-1 h-1 bg-blue-500/20" />
      </div>

      {icon && (
        <div className="w-12 h-12 rounded-none bg-blue-500/5 border border-blue-500/20 flex items-center justify-center mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
          {icon}
        </div>
      )}

      {label && <div className="text-[9px] font-mono text-blue-500/50 uppercase tracking-[0.3em] mb-2">{label}</div>}
      {title && <h3 className="text-2xl font-bold mb-4 tracking-tighter uppercase">{title}</h3>}
      {children}
      {meta && (
        <div className="mt-8 pt-8 border-t border-blue-500/10 flex flex-wrap gap-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500/60 font-bold">{meta}</span>
        </div>
      )}

      {/* HUD Scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
    </div>
  );
};

// Technical HUD Card for Projects (F1 Style)
const ProjectTechnicalCard = ({ project }: { project: any }) => {
  return (
    <div
      className="relative w-full h-full bg-card border border-blue-500/20 rounded-none overflow-hidden group transition-all duration-500 hover:border-blue-500/50 shadow-sm dark:shadow-none"
    >
      {/* Technical Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/60 z-20" />
      <div className="absolute top-4 right-4 w-12 h-[1px] bg-blue-500/20" />
      <div className="absolute bottom-4 left-4 w-[1px] h-12 bg-blue-500/20" />

      {/* Main Grid Layout */}
      <div className="relative h-full flex flex-row">

        {/* Left: Vertical Brand Label */}
        <div className="w-12 md:w-16 flex items-center justify-center border-r border-blue-500/10 bg-blue-500/[0.02]">
          <span className="rotate-[-90deg] whitespace-nowrap text-2xl md:text-4xl font-black tracking-tighter text-blue-500/80 uppercase">
            {project.label}
          </span>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col p-6 md:p-8">

          {/* Top Row: Meta Data */}
          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div className="flex gap-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-widest mb-1">Architecture</span>
                <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase">{project.title}</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-widest mb-1">Integrity</span>
                <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase">Verified</span>
              </div>
            </div>

            <div className="max-w-[240px] text-right">
              <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-widest mb-2 block">Project Brief</span>
              <p className="text-[11px] md:text-xs leading-relaxed text-muted-foreground font-medium uppercase tracking-wider">
                {project.desc}
              </p>
            </div>
          </div>

          {/* Center: Image/Visual Area */}
          <div className="relative flex-1 min-h-[200px] mb-8 bg-blue-500/[0.01] border border-blue-500/10 rounded-none overflow-hidden flex items-center justify-center group-hover:border-blue-500/30 transition-colors">
            {project.customContent ? (
              <div className="flex flex-col items-center gap-4 opacity-40 group-hover:opacity-100 transition-all duration-700">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                  {project.customIcon || <Smartphone className="w-16 h-16 text-blue-500" />}
                </div>
                <span className="font-mono text-[10px] tracking-[0.5em] text-blue-500 uppercase">{project.customLabel || "Technical Architecture"}</span>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.label}
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
            )}

            {/* HUD Overlay Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_2px,3px_100%]" />
          </div>

          {/* Bottom Row: Tech & Actions */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag: string, idx: number) => (
                <div key={idx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-none">
                  <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest">{tag}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center rounded-none hover:bg-blue-500 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </div>
              <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-none shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Data Tape Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500/10 overflow-hidden">
        <div className="w-full h-full bg-blue-500/40 animate-marquee" />
      </div>
    </div>
  );
};

// Helper for 3D Tilt effect
import { Hero3DCarousel } from "@/components/ui/hero-3d-carousel";
import { LoadingScreen } from "@/components/ui/loading-screen";
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
};

// Helper for Magnetic effect
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// Helper for Custom Cursor
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest(".cursor-pointer") !== null
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-foreground pointer-events-none z-[99999] hidden md:block shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 6,
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
    />
  );
};

const SectionReveal = ({ children, index }: { children: React.ReactNode, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 0%"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["4rem", "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.4], ["100px", "0px"]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.4], [index % 2 === 0 ? 5 : -5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 1]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["0px 0px 100px 30px rgba(59, 130, 246, 0.15)", "0px 0px 0px 0px rgba(59, 130, 246, 0)"]
  );

  return (
    <div ref={ref} className="w-full relative z-10 pt-20 md:pt-40">
      <motion.div
        style={{ scale, borderRadius, y, rotateZ, opacity, boxShadow }}
        className="origin-center overflow-visible bg-background border-t border-blue-500/20"
      >
        {children}
      </motion.div>
    </div>
  );
};

const IntroDealer = ({ scrollY, vh }: { scrollY: any, vh: number }) => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none" />
  );
};

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [vh, setVh] = useState(800);
  const [imageOffsetVh, setImageOffsetVh] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const introEnd = 0; // Removed dealing phase
  const isIntroDone = 1;
  const introOpacity = 1;
  const mainContentOpacity = 1;

  useEffect(() => {
    setIsLoaded(true);
    setVh(window.innerHeight);

    const measureCarousel = () => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const carouselCenterY = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        // Positive = carousel is BELOW viewport center
        const offsetVh = ((carouselCenterY - viewportCenter) / window.innerHeight) * 100;
        setImageOffsetVh(offsetVh);
      }
    };

    const handleResize = () => {
      setVh(window.innerHeight);
      measureCarousel();
    };

    // Measure once fonts/images load so layout is stable
    const timer = setTimeout(measureCarousel, 500);
    window.addEventListener('resize', handleResize);

    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { scrollY: scrollYRaw } = useScroll();
  const heroTextOpacity = useTransform(scrollYRaw, [0, vh * 0.4], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYRaw.on("change", (v) => {
      setShowScrollTop(v > 300);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(v / maxScroll, 1) : 0);
    });
    return () => unsubscribe();
  }, [scrollYRaw]);

  const scrollToTop = () => {
    if (isLaunching) return;
    setIsLaunching(true);

    const startY = window.scrollY;
    const duration = 1000;
    const startTime = performance.now();

    // Dramatic ease-in-out quart: fast start, smooth deceleration at top
    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuart(progress);
      window.scrollTo(0, startY * (1 - easedProgress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsLaunching(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const sections = [
    { id: "services", title: "Services" },
    { id: "projects", title: "Projects" },
    { id: "expertise", title: "Expertise" },
    { id: "testimonials", title: "Testimonials" },
    { id: "process", title: "Process" },
    { id: "contact", title: "Contact" }
  ];

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const handleSubmit = async () => {
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSending(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message via server");
      }

      setIsSending(false);
      setShowSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Submission Error:", error);
      setIsSending(false);
      setShowError(true);
      // We don't auto-hide error if it requires manual fallback
    }
  };

  const heroCarouselProjects = useMemo(() => [
    { title: "Visual Identity", label: "E-Buy Store", tags: ["Next.js", "Tailwind"], type: 'project' as const },
    { title: "Web Platforms", label: "Brainly Code", tags: ["React", "Nest.js"], type: 'project' as const },
    { title: "Digital Commerce", label: "Akaguriro", tags: ["TypeScript", "Supabase"], type: 'project' as const },
    { title: "Mobile Architecture", label: "IMove App", tags: ["React Native", "MongoDB"], type: 'project' as const },
    { title: "Career Guidance", label: "Vantage", tags: ["React Native", "AI"], type: 'project' as const },
    { title: "AI Recruitment", label: "Bora AI", tags: ["OpenAI", "Next.js"], type: 'project' as const }
  ], []);

  const heroAchievements = useMemo(() => [
    { title: "Recognition", label: "Best Backend Developer Around", tags: ["First Place", "2024"], type: 'achievement' as const },
    { title: "Impact", label: "10K+ Active Users", tags: ["Scalability", "Growth"], type: 'achievement' as const },
    { title: "Certification", label: "Software Development Certificates", tags: ["Cloud", "Security"], type: 'achievement' as const },
    { title: "Success", label: "Best of the Best", tags: ["Excellence", "100% JS"], type: 'achievement' as const },
    { title: "Achievement", label: "Open Source Contributor", tags: ["React", "Motion"], type: 'achievement' as const },
    { title: "Milestone", label: "20+ High-End Apps Delivered", tags: ["Experience", "Velocity"], type: 'achievement' as const }
  ], []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      <div className="min-h-screen relative bg-background text-foreground selection:bg-primary selection:text-primary-foreground cursor-none transition-colors duration-500">
        <CustomCursor />

        {/* Navigation - Always Visible */}
        <nav
          className="fixed top-0 left-0 right-0 z-[101] border-b border-border/30 bg-background/80 backdrop-blur-xl transition-all duration-500"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tighter">IZERE.</span>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              {["Services", "Projects", "Process", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs font-normal text-muted-foreground hover:text-foreground sm:text-sm sm:font-semibold transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <Magnetic>
                <Button variant="outline" size="sm" className="hidden bg-blue-500 text-white hover:bg-blue-600 sm:inline-flex" asChild>
                  <a href="/IZERE_JOSHUA_CV.pdf" download="IZERE_JOSHUA_CV.pdf">
                    <Download className="mr-2 w-4 h-4" />
                    Download CV
                  </a>
                </Button>
              </Magnetic>
              <button
                className="md:hidden p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>

        {/* Phase 1: Intro Dealer (Fixed Overlay) */}
        {/* Intro Phase (Hint only) */}
        <motion.div style={{ opacity: introOpacity }} className="z-[100]">
          <IntroDealer scrollY={scrollY} vh={vh} />
        </motion.div>

        {/* Hero Section */}
        <div className="relative z-0">
          <section className="min-h-screen pt-44 pb-32 px-6 border-b border-border/30 relative">
            {/* Hero text and Carousel are here */}
            {/* We will hide the text during dealing but keep carousel visible */}
            {/* Marquee Background Name */}
            <div className="absolute top-[15rem] p-[10rem] h-[50rem] -translate-y-1/2 left-0 w-full overflow-hidden z-0 pointer-events-none select-none">
              {/* Vibrant blue glow behind the name */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-blue-500/[0.08] blur-[120px] rounded-full dark:bg-blue-500/[0.05]" />

              <div className="animate-marquee whitespace-nowrap flex items-center">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="text-[12rem] md:text-[20rem] font-black tracking-tighter mx-8 text-blue-500/10 dark:text-blue-500/20">
                    IZERE JOSHUA
                  </span>
                ))}
              </div>
            </div>

            <div className="max-w-7xl -mt-20 mx-auto border-x border-border/30 relative z-20">
              <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
              <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
              <div className="flex flex-col items-center text-center">
                {/* The Image Carousel - Visible during intro dealing */}
                <motion.div
                  ref={carouselRef}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative w-full max-w-4xl mx-auto mb-10"
                >
                  <Hero3DCarousel
                    imageSrc={joshImg}
                    projects={heroCarouselProjects}
                    achievements={heroAchievements}
                  />
                </motion.div>

                {/* The Hero Content - Hidden during dealing, fades in after */}
                <motion.div
                  style={{ opacity: mainContentOpacity }}
                  className="flex flex-col items-center"
                >
                  <motion.div className="flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      <Badge variant="outline" className="px-5 py-2 border-blue-500/60 bg-blue-500/10 rounded-none text-xs font-bold font-mono tracking-widest uppercase text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] animate-pulse">
                        ✦ 10X+ ENGINEER
                      </Badge>
                      <Badge variant="outline" className="px-4 py-2 border-border/30 bg-muted/5 rounded-none text-[10px] font-mono tracking-widest uppercase text-muted-foreground flex items-center">
                        SYSTEM ARCHITECT & FULL-STACK ENGINEER
                      </Badge>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-10 leading-[0.9] gradient-text overflow-hidden z-10 relative">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-foreground font-medium"
                      >
                        Engineering Solutions
                      </motion.span>
                    </h2>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed">
                      Full-stack engineer building AI-powered products, scalable distributed systems, and modern digital architectures.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                      <Magnetic>
                        <Button size="lg" className="h-16 bg-blue-500 hover:bg-blue-600 text-white px-12" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                          View Projects
                        </Button>
                      </Magnetic>
                      <Magnetic>
                        <Button size="lg" variant="outline" className="h-16 px-12 border-blue-500/30 hover:bg-blue-500/10 text-foreground transition-colors" asChild>
                          <a href="/IZERE_JOSHUA_CV.pdf" download="IZERE_JOSHUA_CV.pdf">
                            <Download className="mr-2 w-5 h-5 text-blue-500" />
                            Download CV
                          </a>
                        </Button>
                      </Magnetic>
                      <Magnetic>
                        <Button size="lg" variant="outline" className="h-16 px-12 border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors" asChild>
                          <a href="https://mail.google.com/mail/?view=cm&to=izerejoshua94@gmail.com" target="_blank" rel="noopener noreferrer">Contact Me</a>
                        </Button>
                      </Magnetic>
                    </div>
                  </motion.div>

                  {/* Featured Stats or Tags */}
                  <motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {[
                        { label: "Experience", value: "2+ Years" },
                        { label: "Projects", value: "20+ Completed" },
                        { label: "Design", value: "Minimalist" },
                        { label: "Stack", value: "Full-Stack" },
                      ].map((stat, i) => (
                        <div key={i} className="glass p-8 flex flex-col justify-between h-40 rounded-none">
                          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</span>
                          <span className="text-2xl font-bold">{stat.value}</span>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Main Content Phase 2 - Hidden during Dealing */}
          <motion.div style={{ opacity: mainContentOpacity }}>
            {/* Case Studies Section */}
            <SectionReveal index={0}>
              <section
                id="case-studies"
                className="py-32 px-6 relative overflow-hidden bg-background z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
                      Engineering <span className="text-muted-foreground font-medium">Case Studies</span>
                    </h2>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Scaling WebSocket Infrastructure",
                        desc: "How I designed and scaled a real-time collaborative editor to support 100k+ concurrent users with sub-50ms latency.",
                        meta: "System Design · WebSockets · Redis · Node.js",
                        metrics: ["Latency: <50ms", "Users: 100k+", "Uptime: 99.99%"]
                      },
                      {
                        title: "Optimizing Database Performance",
                        desc: "A deep dive into indexing strategies, query refactoring, and connection pooling that reduced PostgreSQL query times from 3s to 40ms.",
                        meta: "PostgreSQL · Performance · Indexing · Profiling",
                        metrics: ["Speed: 75x Faster", "CPU Load: -60%", "Memory: Optimized"]
                      }
                    ].map((study, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="group"
                      >
                        <TechnicalCard
                          title={study.title}
                          label={`Case Study 0${i + 1}`}
                          meta={study.meta}
                          className="h-full cursor-pointer hover:border-blue-500/50"
                        >
                          <p className="text-muted-foreground leading-relaxed font-medium mb-6">{study.desc}</p>
                          <div className="flex gap-4 border-t border-blue-500/10 pt-4">
                            {study.metrics.map((metric, idx) => (
                              <div key={idx} className="text-xs font-mono text-blue-500/80 font-bold tracking-tight">
                                {metric}
                              </div>
                            ))}
                          </div>
                        </TechnicalCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Featured Projects Section */}
            <SectionReveal index={1}>
              <section
                id="projects"
                className="py-32 px-6 bg-muted/30 border-b border-border/30 relative z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <ScrollReveal>
                      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        FEATURED Engineering <span className="text-muted-foreground font-medium">Projects</span>
                      </h2>
                    </ScrollReveal>
                    <Button variant="outline" className="rounded-none px-8 border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors" onClick={() => window.open("https://github.com/I-Josh-pro-grammin", "_blank")}>
                      <Github className="mr-2 w-4 h-4" />
                      View Full GitHub
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {[
                      {
                        title: "Web Platforms",
                        label: "Brainly Code",
                        desc: "Real‑time analytics dashboard with animated charts and seamless UX, built for high-performance data visualization.",
                        image: bCode,
                        icon: <Globe className="w-6 h-6" />,
                        // github: "https://brainlycode.dpdns.org",
                        liveUrl: "https://brainlycode.dpdns.org",
                        tags: ["React", "Nest.js", "PostgreSQL", "Docker"],
                        colSpan: "md:col-span-12 lg:col-span-7",
                        rowSpan: "md:row-span-2",
                        imageHeight: "h-[300px] md:h-[450px]"
                      },
                      {
                        title: "Digital Commerce",
                        label: "Akaguriro",
                        desc: "Full-stack E-commerce platform for the Burundian market with optimized performance and localized payment flows.",
                        image: akaguriro,
                        icon: <Layout className="w-6 h-6" />,
                        // github: "https://akaguriroo.com",
                        liveUrl: "https://akaguriroo.com",
                        tags: ["TypeScript", "Supabase", "Vite"],
                        colSpan: "md:col-span-12 lg:col-span-5",
                        rowSpan: "md:row-span-1",
                        imageHeight: "h-[250px]"
                      },
                      {
                        title: "Mobile Architecture",
                        label: "IMove App",
                        desc: "Mobile app for finding nearest riders with real-time booking and geolocation tracking for seamless transit.",
                        icon: <Smartphone className="w-6 h-6" />,
                        github: "https://i-move-admin-frontend.vercel.app/",
                        liveUrl: "https://i-move-admin-frontend.vercel.app/",
                        tags: ["React Native", "Expo", "MongoDB"],
                        colSpan: "md:col-span-12 lg:col-span-5",
                        rowSpan: "md:row-span-2",
                        imageHeight: "h-[350px]",
                        customContent: true
                      },
                      {
                        title: "Visual Identity",
                        label: "E-Buy Store",
                        desc: "Futuristic component library and global commerce experience with a focus on high-fidelity motion and design systems.",
                        image: ebuy,
                        icon: <Palette className="w-6 h-6" />,
                        // github: "https://github.com/I-Josh-pro-grammin/E-buy",
                        liveUrl: "https://e-buy-store.vercel.app/",
                        tags: ["Next.js", "Node.js", "Tailwind"],
                        colSpan: "md:col-span-12 lg:col-span-7",
                        rowSpan: "md:row-span-1",
                        imageHeight: "h-[250px]"
                      },
                      {
                        title: "Career Guidance",
                        label: "Vantage",
                        desc: "A mobile app that provides an advantage to students by recommending the optimal career path based on the RIASEC model.",
                        image: vantage,
                        icon: <Smartphone className="w-6 h-6" />,
                        liveUrl: "https://vantage-frontend-beta.vercel.app/",
                        tags: ["React Native", "AI", "Mobile"],
                        colSpan: "md:col-span-12 lg:col-span-5",
                        rowSpan: "md:row-span-1",
                        imageHeight: "h-[250px]",
                        customContent: true,
                        customIcon: <Smartphone className="w-24 h-24" />,
                        customLabel: "Mobile Architecture"
                      },
                      {
                        title: "AI Recruitment",
                        label: "Bora AI",
                        desc: "An AI application built for job recruiters that provides accurate, automated screening results to streamline hiring.",
                        image: Bora,
                        icon: <Layout className="w-6 h-6" />,
                        liveUrl: "https://bora-ai-web.vercel.app/",
                        tags: ["OpenAI", "Next.js", "TypeScript"],
                        colSpan: "md:col-span-12 lg:col-span-7",
                        rowSpan: "md:row-span-1",
                        imageHeight: "h-[250px]",
                        // customContent: true,
                        customIcon: <Layout className="w-24 h-24" />,
                        customLabel: "AI System Interface"
                      }
                    ].map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${project.colSpan} ${project.rowSpan} group cursor-pointer`}
                        onClick={() => setSelectedProject(project)}
                      >
                        <ProjectTechnicalCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Skills Section - Categorized */}
            <SectionReveal index={2}>
              <section
                id="expertise"
                className="py-32 px-6 relative overflow-hidden bg-background border-b border-border/30 z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-foreground">
                      Technical <span className="text-muted-foreground font-medium">Capabilities</span>
                    </h2>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                      { title: "Backend", skills: ["Node.js", "Spring Boot", "NestJS", "Python"] },
                      { title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                      { title: "Infrastructure", skills: ["Docker", "Kubernetes", "AWS", "CI/CD Pipelines"] },
                      { title: "Data", skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
                      { title: "AI / ML", skills: ["LLM Integration", "OpenAI API", "Vector DBs", "RAG Systems"] },
                      { title: "Architecture", skills: ["Microservices", "Event-Driven", "REST & GraphQL", "WebSockets"] }
                    ].map((category, i) => (
                      <div key={i} className="border-t border-blue-500/20 pt-6">
                        <h3 className="text-xl font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500" />
                          {category.title}
                        </h3>
                        <div className="flex flex-col gap-3">
                          {category.skills.map((skill, idx) => (
                            <div key={idx} className="flex items-center text-sm font-mono text-muted-foreground hover:text-blue-500 transition-colors">
                              <span className="opacity-50 mr-3">{'//'}</span>
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* System Design / Architecture Section */}
            <SectionReveal index={3}>
              <section id="system-design" className="py-32 px-6 relative overflow-hidden bg-muted/30 border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-foreground">
                      System <span className="text-muted-foreground font-medium">Architecture</span>
                    </h2>
                  </ScrollReveal>
                  <div className="bg-card border border-blue-500/20 p-12 relative flex flex-col items-center justify-center min-h-[400px]">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none" />
                    <div className="text-center max-w-2xl relative z-10">
                      <Server className="w-16 h-16 text-blue-500 mx-auto mb-6 opacity-80" />
                      <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Event-Driven Microservices</h3>
                      <p className="text-muted-foreground leading-relaxed mb-8 font-medium">
                        [Interactive Diagram Placeholder: Visualizing scalable Kafka-backed event-driven architecture, rate limiters, and custom API gateways.]
                      </p>
                      <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-none h-12 px-8">Explore Architecture Simulation</Button>
                    </div>
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Technical Writing Section */}
            <SectionReveal index={4}>
              <section id="writing" className="py-32 px-6 relative overflow-hidden bg-background border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-foreground">
                      Technical <span className="text-muted-foreground font-medium">Writing</span>
                    </h2>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: "Building a Multi-Tenant SaaS Architecture", date: "Oct 2025", tag: "Architecture" },
                      { title: "Rust vs Go for High-Throughput Microservices", date: "Aug 2025", tag: "Performance" },
                      { title: "Debugging Memory Leaks in Node.js at Scale", date: "Jun 2025", tag: "Debugging" },
                    ].map((post, i) => (
                      <UnequalBordersCard key={i} title={post.title} tag={post.tag} date={post.date} className="cursor-pointer h-full" />
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Open Source Section */}
            <SectionReveal index={5}>
              <section id="opensource" className="py-32 px-6 relative overflow-hidden bg-muted/30 border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <ScrollReveal>
                      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                        Open <span className="text-muted-foreground font-medium">Source</span>
                      </h2>
                    </ScrollReveal>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { project: "React Flow", desc: "Implemented AST parsing optimization reducing compile time by 18%.", pr: "#1425 Merged" },
                      { project: "Next.js", desc: "Fixed memory leak in image optimization middleware for high concurrency loads.", pr: "#8931 Merged" }
                    ].map((oss, i) => (
                      <div key={i} className="p-8 border border-blue-500/20 bg-card hover:border-blue-500/50 transition-all flex justify-between items-start group shadow-sm dark:shadow-none">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-blue-500 transition-colors">{oss.project}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{oss.desc}</p>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-500 rounded-none bg-green-500/10 whitespace-nowrap ml-4">{oss.pr}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Experience Timeline Section */}
            <SectionReveal index={6}>
              <section id="experience" className="py-32 px-6 relative overflow-hidden bg-background border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-foreground">
                      Engineering <span className="text-muted-foreground font-medium">Experience</span>
                    </h2>
                  </ScrollReveal>
                  <div className="pl-4 md:pl-12 border-l border-blue-500/20 space-y-16">
                    {[
                      { role: "Systems Engineer", company: "ICODE CO Ltd", period: "2024 - Present", impact: "Scaled backend systems to handle 10M+ daily requests. Migrated monolith to event-driven microservices reducing latency by 40%." },
                      { role: "Backend Developer", company: "Blink Tech", period: "2022 - 2024", impact: "Led development of a high-performance application. Improved deployment speed by implementing robust CI/CD pipelines." }
                    ].map((exp, i) => (
                      <div key={i} className="relative pl-8 group">
                        <div className="absolute -left-[41px] top-1 w-5 h-5 border-2 border-blue-500 bg-background rounded-full group-hover:bg-blue-500 transition-colors" />
                        <span className="text-xs font-mono text-blue-500 mb-2 block tracking-widest">{exp.period}</span>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{exp.role}</h3>
                        <h4 className="text-lg text-muted-foreground mb-4 font-medium">{exp.company}</h4>
                        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{exp.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Engineering Excellence Section */}

            <SectionReveal index={3}>
              <section
                className="py-32 px-6 bg-muted/30 relative overflow-hidden border-b border-border/30 z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                      Engineering <span className="text-muted-foreground font-medium">Excellence</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      "Scalable Architecture", "Clean Code Enthusiast", "Performance Optimization", "Security Best Practices",
                      "CI/CD Pipelines", "Database Optimization", "Responsive Web Design", "Technical Documentation"
                    ].map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="glass p-8 rounded-none flex items-center space-x-4 group hover:bg-primary/[0.02] transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary opacity-20" />
                        <span className="font-bold text-sm tracking-tight">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Testimonials / Clients */}
            <SectionReveal index={4}>
              <section
                id="testimonials"
                className="py-32 px-6 border-b border-border/30 relative z-10 bg-background"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left: Sticky Panel */}
                    <div className="lg:col-span-5">
                      <div className="sticky top-32 space-y-10">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <Badge variant="outline" className="px-4 py-1.5 border-blue-500/30 bg-blue-500/5 rounded-none text-[10px] font-mono tracking-widest uppercase relative overflow-hidden group">
                            <span className="relative z-10 text-blue-500">✦ Happy Clients</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                          </Badge>
                        </motion.div>

                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0 }}
                          className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight animate-float"
                        >
                          Clients <span className="text-muted-foreground font-medium">Love me</span>
                        </motion.h2>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="text-lg text-muted-foreground max-w-sm font-medium leading-relaxed"
                        >
                          Trusted by 10+ happy clients, providing great solutions through optimized engineering.
                        </motion.p>

                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: "Happy Clients", value: "10+" },
                            { label: "Completed projects", value: "20+" },
                            { label: "Avg Rating", value: "4.8" },
                          ].map((stat, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                              className="glass p-5 rounded-none group hover:bg-primary/[0.02] transition-colors"
                            >
                              <div className="text-2xl font-bold mb-1 transition-colors">{stat.value}</div>
                              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <Button variant="outline" className="rounded-none px-8 h-12 border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                            See All Projects
                          </Button>
                          <Button className="rounded-none px-8 h-12 bg-blue-500 text-white hover:bg-blue-600 transition-colors" asChild>
                            <a href="mailto:izerejoshua94@gmail.com">Contact Now</a>
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Right: Overlapping Sticky Cards */}
                    <div className="lg:col-span-7 relative">
                      {[
                        { image: "/delice.png", name: "Delice", role: "Mobile developer at ThinkStack", text: "I’ve had the pleasure of working with this developer, and I highly recommend them. They are skilled, reliable, and passionate about writing clean and efficient code. They solve problems effectively and are always eager to learn and improve. A great team player and a valuable asset to any development team.", rating: 5 },
                        { image: "/Isaac.jpeg", name: "Isaac", role: "Mentor At Brainiacs", text: "Josh is a strong Engineer who is good at collaborating with others in different projects. He is a good design at System  design and backend  models which are optimal for impactful solutions, I can recommend him for team work, collaboration and hard working.", rating: 5 },
                        { image: "/KIRENGA_Kenny.png", name: "KIRENGA Kenny", role: "Backend Developer at I-Code Rwanda", text: "He was instrumental in building the backend of IMove, delivering a scalable, secure, and well-architected system. Highly skilled, reliable, and committed to excellence — a backend developer you can truly trust.", rating: 5 },
                        { image: "/aaron.png", name: "Twarimitswe Aaron", role: "Mentor At Brainiacs and Minister of Discipline at RCA", text: "Joshua is a persistent and highly motivated Full Stack Engineer who approaches every project with determination and ownership. His commitment to delivering quality results and pushing through challenges makes him someone you can confidently rely on for complex and demanding work.", rating: 4.9 },
                        { image: "/darius.jpg", name: "Niyonkuru Darius", role: "Mentor At Brainiacs and Minister of Academics at RCA", text: "Joshua is not just a developer but a true programmer. He doesn’t only write code; he understands the logic behind it and thinks deeply to find better solutions. His way of thinking is unique and impactful. I’ve known him for a year, and he continues to impress me—not only technically, but also mentally and socially. Beyond his skills, he has been a great friend, and working with him is truly inspiring.", rating: 5 },
                        { image: "/Ange.jpeg", name: "Ange", role: "Design Lead, Bloom", text: "Joshua is a hardworking colleague who fearlessly risks himself to get the job done. He cooperates seamlessly with others and always drives team success.", rating: 5 },
                        { image: "/ashrafu.png", name: "Ashrafu", role: "Design Lead, Bloom", text: "Working with Joshua has been an incredibly rewarding experience. He brings a rare combination of technical skill, creativity, and genuine curiosity to every discussion. Whether we were brainstorming ideas or mentoring together at Brainiacs, he consistently showed strong leadership, thoughtful problem-solving, and a passion for helping others grow. Joshua doesn’t just build solutions — he elevates the people around him and turns ideas into clear, actionable outcomes. Any team would benefit from his energy and vision.", rating: 5 }
                      ].map((client, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="sticky mb-12 sm:mb-24"
                          style={{ zIndex: i + 1, top: 120 + i * 20 }}
                        >
                          <TechnicalCard
                            title={client.name}
                            label={`Verification ID: 00${i + 1}`}
                            className="border-blue-500/20"
                          >
                            <div className="flex items-center space-x-6 mb-8">
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-none bg-muted border border-blue-500/20 flex items-center justify-center overflow-hidden">
                                {client.image ? (
                                  <img src={client.image} alt={client.name} className="w-full h-full object-cover grayscale" />
                                ) : (
                                  <span className="text-2xl font-bold text-muted-foreground">{client.name[0]}</span>
                                )}
                              </div>
                              <div>
                                <div className="text-sm text-blue-500 font-mono tracking-[0.2em] uppercase">{client.role}</div>
                                <div className="flex items-center mt-2 space-x-1">
                                  {[...Array(5)].map((_, s) => (
                                    <span key={s} className={cn("text-xs", s < Math.floor(client.rating) ? "text-blue-500" : "text-blue-500/10")}>★</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed italic border-l-2 border-blue-500/20 pl-6">
                              "{client.text}"
                            </p>
                          </TechnicalCard>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Engineering Philosophy / How I Work */}
            <SectionReveal index={5}>
              <section
                id="philosophy"
                className="py-32 px-6 bg-muted/30 border-b border-border/30 relative z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                    {/* Left Column: Core Principles */}
                    <div>
                      <div className="mb-16">
                        <ScrollReveal>
                          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                            Engineering <br />
                            <span className="text-muted-foreground font-medium whitespace-nowrap">Philosophy</span>
                          </h2>
                          <p className="text-muted-foreground max-w-xl font-medium leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
                            "I optimize for maintainability first, then performance bottlenecks proven by profiling."
                          </p>
                        </ScrollReveal>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          { title: "Ownership", desc: "Taking full accountability from architecture design to production monitoring." },
                          { title: "Code Quality", desc: "Writing clean, modular, and extensively tested code." },
                          { title: "Performance", desc: "Optimizing critical paths, reducing latency, and profiling resources." },
                          { title: "DX Principles", desc: "Building intuitive internal tools and maintaining robust CI/CD pipelines." },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group"
                          >
                            <TechnicalCard
                              title={item.title}
                              label={`Principle 0${i + 1}`}
                              className="h-full border-blue-500/10 hover:border-blue-500/30 transition-colors"
                            >
                              <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                            </TechnicalCard>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Methods */}
                    <div className="lg:pt-10">
                      <div className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                          How I <br />
                          <span className="text-muted-foreground font-medium whitespace-nowrap">Work</span>
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {[
                          { q: "Testing Standards", a: "Test-Driven Development (TDD) for critical logic. High coverage using Vitest and Playwright to catch regressions early." },
                          { q: "Product Thinking", a: "I don't just build features; I align engineering decisions with business goals to drive user adoption and revenue." },
                          { q: "Continuous Integration", a: "Automated linting, type-checking, and testing on every PR. Zero-downtime deployments via container orchestration." },
                          { q: "Architecture Reviews", a: "Writing RFCs (Request for Comments) for major system changes to align teams and document tradeoffs before writing code." },
                        ].map((faq, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="glass rounded-none overflow-hidden border border-blue-500/10"
                          >
                            <button
                              className="w-full p-6 text-left flex items-center justify-between group"
                              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            >
                              <span className="text-base font-bold group-hover:text-blue-500 transition-colors">{faq.q}</span>
                              <Plus className={cn("w-4 h-4 text-blue-500 transition-transform duration-300", activeFaq === i && "rotate-45")} />
                            </button>
                            <AnimatePresence>
                              {activeFaq === i && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-6 text-sm text-muted-foreground font-medium leading-relaxed">
                                    {faq.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Footer CTA & Contact Form */}
            <SectionReveal index={6}>
              <footer
                id="contact"
                className="py-32 px-6 bg-background border-t border-border/30 relative z-10"
              >
                <div className="max-w-7xl mx-auto">

                  {/* CUSTOM SHAPE CONTAINER */}
                  <div className="relative">

                    {/* MAIN BACKGROUND */}
                    <div
                      className="relative bg-card border border-blue-500/20 p-12 md:p-24 overflow-hidden rounded-none dark:bg-[#080808]"
                    >
                      {/* Glow */}
                      <div className="absolute inset-0 pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.15)]" />

                      {/* Scanline */}
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

                      {/* Top glow */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/[0.05] blur-[100px] rounded-full -translate-y-1/2" />

                      {/* CONTENT */}
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* LEFT SIDE */}
                        <ScrollReveal>
                          <div className="max-w-xl">
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
                              Let's Grow <br />
                              <span className="text-muted-foreground italic">Together</span>
                            </h2>

                            <p className="text-xl text-muted-foreground mb-16 font-medium leading-relaxed">
                              Have a visionary project in mind? Let's turn your ideas into a high-performance digital reality.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                              <Magnetic>
                                <Button
                                  size="lg"
                                  variant="outline"
                                  className="h-16 px-12 border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                                  asChild
                                >
                                  <a href="tel:+250739587054">
                                    <Phone className="mr-3 w-5 h-5" />
                                    Call Me
                                  </a>
                                </Button>
                              </Magnetic>
                            </div>
                          </div>
                        </ScrollReveal>

                        {/* RIGHT SIDE — TRANSMISSION */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          className="relative z-10 w-full"
                        >
                          <div className="relative w-full bg-card border border-blue-500/20 rounded-none overflow-hidden hover:border-blue-500/50 transition-all dark:bg-[#080808]">

                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500/40" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500/40" />

                            <div className="relative flex flex-row min-h-[450px]">

                              {/* Vertical label */}
                              <div className="w-10 md:w-14 flex items-center justify-center border-r border-blue-500/10 bg-blue-500/[0.03]">
                                <span className="rotate-[-90deg] whitespace-nowrap text-xl md:text-2xl font-black tracking-tighter text-blue-500/60 uppercase">
                                  TRANSMISSION
                                </span>
                              </div>

                              {/* FORM */}
                              <div className="flex-1 flex flex-col p-6 md:p-8">

                                {/* Header */}
                                <div className="flex justify-between mb-8 pb-4 border-b border-blue-500/10">
                                  <div className="flex gap-6">
                                    <div>
                                      <span className="text-[8px] font-mono text-blue-500/40 uppercase">Status</span>
                                      <div className="text-sm font-bold uppercase animate-pulse">Available</div>
                                    </div>
                                    <div>
                                      <span className="text-[8px] font-mono text-blue-500/40 uppercase">Protocol</span>
                                      <div className="text-sm font-bold uppercase">SMTP_SEC</div>
                                    </div>
                                  </div>

                                  <div className="hidden sm:block text-right">
                                    <span className="text-[8px] font-mono text-blue-500/40 uppercase">Security</span>
                                    <div className="text-blue-500 text-[10px] font-bold uppercase">AES-256</div>
                                  </div>
                                </div>

                                <div className="space-y-6 flex-1">
                                  <input className="w-full bg-muted/20 border border-blue-500/10 px-4 py-3 text-xs font-mono uppercase text-foreground placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/40 transition-colors dark:bg-blue-500/[0.03]" placeholder="ENTER YOUR NAME" />
                                  <input className="w-full bg-muted/20 border border-blue-500/10 px-4 py-3 text-xs font-mono uppercase text-foreground placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/40 transition-colors dark:bg-blue-500/[0.03]" placeholder="YOUR EMAIL@DOMAIN.COM" />
                                  <textarea rows={4} className="w-full bg-muted/20 border border-blue-500/10 px-4 py-3 text-xs font-mono uppercase text-foreground placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/40 transition-colors resize-none dark:bg-blue-500/[0.03]" placeholder="PROVIDE A DESCRIPTION OF YOUR PROJECT" />
                                </div>

                                {/* Button */}
                                <div className="mt-6 flex justify-end">
                                  <Button className="bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                    SEND MESSAGE
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Bottom right text */}
                      <div className="absolute bottom-10 right-14 text-xs font-mono uppercase flex gap-2">
                        <span className="text-muted-foreground/40 uppercase">Discoball</span>
                        <span className="text-blue-500 font-bold">2025</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer bottom */}
                  <div className="mt-24 pt-12 border-t border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-sm font-mono text-blue-500/60">
                      IZERE.SYSTEMS [v 2.5]
                    </div>

                    <div className="flex gap-8 text-sm text-muted-foreground">
                      <a href="#">Privacy</a>
                      <a href="#">Terms</a>
                      <span>© 2025 IZERE JOSHUA</span>
                    </div>
                  </div>

                </div>
              </footer>
            </SectionReveal>
          </motion.div>

          {/* Floating Particles */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.2
                }}
                animate={{
                  y: ["-10%", "110%"],
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -Math.random() * 20
                }}
                className="absolute w-1 h-1 bg-foreground rounded-full"
                style={{
                  filter: `blur(${Math.random() * 2}px)`,
                }}
              />
            ))}
          </div>

          {/* Scroll-To-Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                key="scroll-top"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                initial={{ opacity: 0, y: 60, scale: 0.6 }}
                animate={isLaunching
                  ? { scale: [1, 1.25, 0.85, 1.1, 1], y: [0, -8, 4, -4, 0], opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
                }
                exit={{ opacity: 0, y: 60, scale: 0.5 }}
                transition={isLaunching
                  ? { duration: 0.5, ease: "easeInOut" }
                  : { type: "spring", stiffness: 280, damping: 20 }
                }
                whileHover={!isLaunching ? { scale: 1.1 } : {}}
                whileTap={!isLaunching ? { scale: 0.93 } : {}}
                className="fixed bottom-8 right-8 z-[200] w-16 h-16 flex items-center justify-center cursor-pointer"
                style={{ backdropFilter: "blur(16px)" }}
              >
                {/* SVG progress ring + background */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background fill */}
                  <rect width="64" height="64" fill="var(--background)" fillOpacity="0.85" />
                  {/* Outer border */}
                  <rect x="0.5" y="0.5" width="63" height="63" stroke="rgba(59,130,246,0.35)" strokeWidth="1" />
                  {/* Track circle */}
                  <circle cx="32" cy="32" r="26" stroke="rgba(59,130,246,0.12)" strokeWidth="3" />
                  {/* Progress arc */}
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="rgba(59,130,246,0.9)"
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    style={{
                      strokeDashoffset: (1 - scrollProgress) * 2 * Math.PI * 26,
                      rotate: "-90deg",
                      transformOrigin: "32px 32px",
                    }}
                  />
                  {/* Corner HUD brackets */}
                  <polyline points="0,10 0,0 10,0" stroke="rgba(59,130,246,0.8)" strokeWidth="1.5" fill="none" />
                  <polyline points="54,0 64,0 64,10" stroke="rgba(59,130,246,0.8)" strokeWidth="1.5" fill="none" />
                  <polyline points="64,54 64,64 54,64" stroke="rgba(59,130,246,0.8)" strokeWidth="1.5" fill="none" />
                  <polyline points="10,64 0,64 0,54" stroke="rgba(59,130,246,0.8)" strokeWidth="1.5" fill="none" />
                </svg>

                {/* Glow burst on launch */}
                <AnimatePresence>
                  {isLaunching && (
                    <motion.span
                      key="burst"
                      className="absolute inset-0 rounded-none"
                      initial={{ opacity: 0.9, scale: 1 }}
                      animate={{ opacity: 0, scale: 2.6 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)" }}
                    />
                  )}
                </AnimatePresence>

                {/* Animated chevron */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(59,130,246,1)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10"
                  animate={isLaunching
                    ? { y: [-2, -10, -2], opacity: [1, 0.4, 1] }
                    : { y: [0, -4, 0] }
                  }
                  transition={isLaunching
                    ? { duration: 0.8, ease: "easeInOut", repeat: Infinity }
                    : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <polyline points="18 15 12 9 6 15" />
                </motion.svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
