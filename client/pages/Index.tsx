import { Github, Linkedin, Mail, ArrowUpRight, Plus, Menu, X, Send, Loader2, CheckCircle, Check, Globe, Smartphone, Layout, Palette, Sun, Moon, Phone, Download } from "lucide-react";

const bCode = "/bcode.png";
const akaguriro = "/akaguriroo.png";
const projects = "/projects.png";
const joshImg = "/Greenland2.jpg";
const ebuy = "/ebuy.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

// Helper for 3D Tilt effect
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

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setIsLoaded(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground cursor-none transition-colors duration-500">
      <CustomCursor />
      {/* Background Decor */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-4">
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
              className="p-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Magnetic>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col space-y-6 text-2xl font-bold text-foreground">
            {["Services", "Projects", "Process", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-muted-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-80 h-80 mb-10 group"
            >
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
              <div className="relative w-full h-full rounded-[5px] border border-primary/10 overflow-hidden glass">
                <img
                  src={joshImg}
                  alt="IZERE JOSHUA"
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-7 right-7 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </motion.div>

            <Badge variant="outline" className="mb-8 px-4 py-1.5 border-border bg-muted rounded-full text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
              ✦ SYSTEM ARCHITECT & FULL-STACK ENGINEER
            </Badge>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 leading-[0.9] gradient-text overflow-hidden">
              {"IZERE JOSHUA".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-muted-foreground font-medium"
              >
                Engineering Solutions
              </motion.span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed">
              Building high-performance, scalable systems and immersive digital experiences with modern technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Magnetic>
                <Button size="lg" className="h-16 px-12" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  View Projects
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="outline" className="h-16 px-12" asChild>
                  <a href="/IZERE_JOSHUA_CV.pdf" download="IZERE_JOSHUA_CV.pdf">
                    <Download className="mr-2 w-5 h-5" />
                    Download CV
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="outline" className="h-16 px-12" asChild>
                  <a href="https://mail.google.com/mail/?view=cm&to=izerejoshua94@gmail.com" target="_blank" rel="noopener noreferrer">Contact Me</a>
                </Button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Featured Stats or Tags in Design Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Experience", value: "2+ Years" },
              { label: "Projects", value: "15+ Completed" },
              { label: "Design", value: "Minimalist" },
              { label: "Stack", value: "Full-Stack" },
            ].map((stat, i) => (
              <div key={i} className="glass p-8 flex flex-col justify-between h-40 rounded-[2rem]">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</span>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
              Design <span className="text-muted-foreground font-medium">Services</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Product Design", desc: "Crafting intuitive digital products from concept to launch.", meta: "User Research · Wireframing · Prototyping" },
              { title: "Visual Design", desc: "Creating stunning visual identities and marketing materials.", meta: "Branding · Illustrations · Social Media" },
              { title: "Web Development", desc: "Building high-performance, responsive websites and apps.", meta: "React · Next.js · Node.js" },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] group hover:bg-primary/[0.02] transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-8 border border-border group-hover:border-primary/20 transition-colors">
                  <Plus className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed font-medium">{service.desc}</p>
                <div className="pt-8 border-t border-border flex flex-wrap gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{service.meta}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-32 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Engineering <span className="text-muted-foreground font-medium">Projects</span>
              </h2>
            </ScrollReveal>
            <Button variant="outline" className="rounded-full px-8 border-border hover:bg-muted" onClick={() => window.open("https://github.com/I-Josh-pro-grammin", "_blank")}>
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
                github: "https://brainlycode.dpdns.org",
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
                github: "https://akaguriroo.com",
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
                github: "https://github.com/I-Josh-pro-grammin/E-buy",
                tags: ["Next.js", "Node.js", "Tailwind"],
                colSpan: "md:col-span-12 lg:col-span-7",
                rowSpan: "md:row-span-1",
                imageHeight: "h-[250px]"
              },
              {
                title: "Career Guidance",
                label: "Vantage",
                desc: "A mobile app that provides an advantage to students by recommending the optimal career path based on the RIASEC model.",
                icon: <Smartphone className="w-6 h-6" />,
                github: "#",
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
                icon: <Layout className="w-6 h-6" />,
                github: "#",
                tags: ["OpenAI", "Next.js", "TypeScript"],
                colSpan: "md:col-span-12 lg:col-span-7",
                rowSpan: "md:row-span-1",
                imageHeight: "h-[250px]",
                customContent: true,
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
                onClick={() => project.github && window.open(project.github, "_blank")}
              >
                <TiltCard className="h-full">
                  <div className={`relative h-full flex flex-col overflow-hidden p-8 md:p-10 rounded-[2.5rem] glass group-hover:bg-primary/[0.01]`}>
                    {/* Card Header: Icon + Title */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center border border-border group-hover:border-primary/10 transition-colors">
                        {project.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground font-medium mb-6 text-base leading-relaxed max-w-lg">
                      {project.desc}
                    </p>

                    {/* Tech Stacks */}
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tags?.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-muted/50 border border-border text-[10px] font-mono font-bold tracking-tight text-muted-foreground uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Image Area */}
                    <div className={`relative mt-auto w-full ${project.imageHeight} rounded-[2rem] overflow-hidden border border-border bg-muted/30 group-hover:border-primary/10 transition-all duration-700`}>
                      {project.customContent ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-3xl">
                          <div className="flex flex-col items-center gap-6 opacity-30 group-hover:opacity-50 transition-opacity">
                            {project.customIcon || <Smartphone className="w-24 h-24" />}
                            <span className="font-mono text-sm tracking-widest uppercase text-center px-4">{project.customLabel || "System Interface Architecture"}</span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.label}
                          className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                        />
                      )}

                      {/* Label Overlay */}
                      <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                        <div className="px-4 py-2 rounded-full border border-primary/10 bg-background/60 backdrop-blur-md">
                          <span className="text-xs font-bold tracking-wide uppercase">{project.label}</span>
                        </div>
                      </div>

                      {/* Click Indicator */}
                      <div className="absolute top-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* <div className="flex mt-10 items-center justify-center">
            <h2 className="text-2xl  md:text-xl font-bold tracking-tighter">
              Other Projects
            </h2>
          </div>
          {/* Secondary Projects Grid (Monospace/Technical Style) */}
          {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              { title: "Springboot backend", github: "https://github.com/I-Josh-pro-grammin/springboot-backend-app", tags: ["Java", "Spring Boot", "Docker"] },
              { title: "Sapient API", github: "https://github.com/I-Josh-pro-grammin/sapient-backend-app", tags: ["Spring Boot", "PostgreSQL", "AWS"] },
              { title: "Budgetly", github: "https://github.com/I-Josh-pro-grammin/budgetly", tags: ["Next.js", "Django", "Firebase"] },
              { title: "Commerce Flow", github: "https://github.com/I-Josh-pro-grammin/commerce-flow", tags: ["React", "Tailwind", "Vite"] },
              { title: "Motion Lab", github: "https://github.com/I-Josh-pro-grammin/motion-lab", tags: ["Framer Motion", "GSAP"] },
              { title: "E-Commerce API", github: "https://github.com/I-Josh-pro-grammin/e-commerce-backend-app", tags: ["Node.js", "Prisma", "Redis"] },
              { title: "Design Systems", github: "https://github.com/I-Josh-pro-grammin/design-templates", tags: ["Figma", "Storybook", "CSS"] },
              { title: "Portfolio V1", github: "https://github.com/I-Josh-pro-grammin/Portfolio-With-Next", tags: ["Next.js", "Tailwind", "Framer"] },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="glass p-8 rounded-[2rem] hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => window.open(project.github, "_blank")}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30">
                    <Github className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => <span key={tag} className="text-[10px] font-mono text-white/40">{tag}</span>)}
                </div>
              </motion.div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section id="services" className="py-32 px-6 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-foreground">
              Technical <span className="text-muted-foreground font-medium">Expertise</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Backend Systems", desc: "Architecting scalable, secure server-side solutions and robust APIs.", meta: "Spring Boot · Node.js · PostgreSQL · Docker" },
              { title: "Frontend Engineering", desc: "Building high-performance, responsive web interfaces with smooth motion.", meta: "React · Next.js · TypeScript · Tailwind" },
              { title: "Mobile Development", desc: "Developing cross-platform mobile applications with native-like performance.", meta: "React Native · Expo · Android SDK" },
            ].map((expertise, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <TiltCard className="h-full">
                  <div className="glass p-10 rounded-[2.5rem] group-hover:bg-primary/[0.01] transition-colors h-full">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-8 border border-border group-hover:border-primary/10 transition-colors">
                      <Plus className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{expertise.title}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed font-medium">{expertise.desc}</p>
                    <div className="pt-8 border-t border-border flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground font-bold">{expertise.meta}</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Skills Ticker */}
      <style>{`
        @keyframes ticker-left {
          0%   { transform: translateX(0px); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0px); }
        }
        .ticker-row-left  { animation: ticker-left  30s linear infinite; display: flex; gap: 1rem; width: max-content; }
        .ticker-row-right { animation: ticker-right 32s linear infinite; display: flex; gap: 1rem; width: max-content; }
        .ticker-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--muted-foreground);
          white-space: nowrap;
          cursor: default;
          transition: all 0.2s;
        }
        .ticker-chip:hover { 
          color: var(--foreground); 
          background: var(--muted); 
          border-color: var(--primary); 
        }
        .ticker-icon { 
          filter: grayscale(1);
          opacity: 0.5;
          font-style: normal; 
          font-size: 1rem; 
          line-height: 1; 
        }
      `}</style>

      <div style={{ padding: "4rem 0", overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "6rem", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "6rem", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
          <div className="ticker-row-left">
            {(([
              ["⊛", "React"], ["△", "Next.js"], ["⬡", "Node.js"], ["◈", "NestJS"], ["◉", "Vue.js"],
              ["◆", "TypeScript"], ["⬢", "Spring Boot"], ["◎", "PostgreSQL"], ["⊕", "MongoDB"],
              ["□", "Docker"], ["◇", "AWS"], ["△", "Firebase"], ["◫", "React Native"], ["⚡", "GraphQL"],
              /* repeat for seamless loop */
              ["⊛", "React"], ["△", "Next.js"], ["⬡", "Node.js"], ["◈", "NestJS"], ["◉", "Vue.js"],
              ["◆", "TypeScript"], ["⬢", "Spring Boot"], ["◎", "PostgreSQL"], ["⊕", "MongoDB"],
              ["□", "Docker"], ["◇", "AWS"], ["△", "Firebase"], ["◫", "React Native"], ["⚡", "GraphQL"],
            ]) as [string, string][]).map(([icon, label], i) => (
              <span key={i} className="ticker-chip">
                <em className="ticker-icon">{icon}</em>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: "hidden" }}>
          <div className="ticker-row-right">
            {([
              ["◐", "Python"], ["☕", "Java"], ["⬟", "Rust"], ["◧", "PHP"], ["◈", "Redis"],
              ["◉", "Prisma"], ["✓", "Jest"], ["◌", "Framer Motion"], ["◯", "Tailwind CSS"],
              ["⇌", "REST APIs"], ["◆", "JWT Auth"], ["⬡", "Webpack"], ["⟳", "CI/CD"], ["◎", "GitHub"],
              /* repeat for seamless loop */
              ["◐", "Python"], ["☕", "Java"], ["⬟", "Rust"], ["◧", "PHP"], ["◈", "Redis"],
              ["◉", "Prisma"], ["✓", "Jest"], ["◌", "Framer Motion"], ["◯", "Tailwind CSS"],
              ["⇌", "REST APIs"], ["◆", "JWT Auth"], ["⬡", "Webpack"], ["⟳", "CI/CD"], ["◎", "GitHub"],
            ] as [string, string][]).map(([icon, label], i) => (
              <span key={i} className="ticker-chip">
                <em className="ticker-icon">{icon}</em>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering Excellence Section */}

      <section className="py-32 px-6 bg-muted/30 relative overflow-hidden border-y border-border">
        <div className="max-w-7xl mx-auto">
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
                className="glass p-8 rounded-[2rem] flex items-center space-x-4 group hover:bg-primary/[0.02] transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary opacity-20" />
                <span className="font-bold text-sm tracking-tight">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Clients */}
      <section id="testimonials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left: Sticky Panel */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Badge variant="outline" className="px-4 py-1.5 border-border bg-muted/50 rounded-full text-[10px] font-mono tracking-widest uppercase relative overflow-hidden group">
                    <span className="relative z-10">✦ Happy Clients</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
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
                      className="glass p-5 rounded-2xl group hover:bg-primary/[0.02] transition-colors"
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
                  <Button variant="outline" className="rounded-full px-8 h-12" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                    See All Projects
                  </Button>
                  <Button className="rounded-full px-8 h-12" asChild>
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
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 1.8 + (i * 0.2)
                  }}
                  viewport={{ once: true }}
                  className="sticky top-32 mb-12 sm:mb-24"
                  style={{ zIndex: i + 1, top: 120 + i * 20 }}
                >
                  <TiltCard className="h-full">
                    <div className="glass p-8 md:p-12 rounded-[2.5rem] relative group-hover:bg-primary/[0.01] transition-all shadow-xl">
                      <div className="flex items-center space-x-6 mb-10">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                          {client.image ? (
                            <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl font-bold text-muted-foreground">{client.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <div className="text-2xl font-bold mb-1">{client.name}</div>
                          <div className="text-sm text-muted-foreground font-mono tracking-wider uppercase">{client.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center mb-8 space-x-1">
                        <span className="text-base font-bold mr-3">{client.rating.toFixed(1)}</span>
                        {[...Array(5)].map((_, s) => (
                          <span key={s} className={cn("text-base", s < Math.floor(client.rating) ? "text-yellow-500" : "text-muted opacity-20")}>★</span>
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed italic">
                        "{client.text}"
                      </p>
                      <div className="absolute top-12 right-12 w-3 h-3 rounded-full bg-primary/20 group-hover:bg-green-500 transition-colors duration-500" />
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combined Process & FAQ Section */}
      <section className="py-32 px-6 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

            {/* Left Column: Development Lifecycle */}
            <div>
              <div className="mb-16">
                <ScrollReveal>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                    Development <br />
                    <span className="text-muted-foreground font-medium whitespace-nowrap">Lifecycle</span>
                  </h2>
                  <p className="text-muted-foreground max-w-xl font-medium leading-relaxed">
                    Building secure, high-performance systems through a structured engineering approach.
                  </p>
                </ScrollReveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { step: "01", title: "Discovery", desc: "Analyzing requirements, identifying bottlenecks, and defining technical goals." },
                  { step: "02", title: "Architecture", desc: "Designing system components, database schemas, and API structures." },
                  { step: "03", title: "Implementation", desc: "Writing clean, modular code with unit tests and continuous integration." },
                  { step: "04", title: "Scale & QC", desc: "Deployment, performance monitoring, and ensuring long-term scalability." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group"
                  >
                    <TiltCard className="h-full">
                      <div className="relative glass p-8 rounded-[2.5rem] group-hover:bg-primary/[0.01] transition-all h-full">
                        <div className="text-3xl font-bold text-muted-foreground/10 group-hover:text-primary/20 transition-colors mb-6 font-mono">{item.step}</div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-primary/[0.04] transition-all" />
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: FAQ */}
            <div className="lg:pt-10">
              <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                  Technical <br />
                  <span className="text-muted-foreground font-medium whitespace-nowrap">Insights & FAQ</span>
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { q: "What is your primary tech stack?", a: "I focus on React/Next.js for the frontend, Spring Boot or Node.js for the backend, and PostgreSQL/MongoDB for databases." },
                  { q: "How do you ensure system scalability?", a: "I implement micro-services architecture where needed, optimize database queries, and use caching layers like Redis for high-load applications." },
                  { q: "Do you provide API documentation?", a: "Always. I use Swagger/OpenAPI or Postman collections to ensure seamless integration for frontend teams or third-party developers." },
                  { q: "What is your approach to security?", a: "I follow OWASP principles, implement robust JWT authentication, and ensure data encryption at rest and in transit." },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="glass rounded-[1.5rem] overflow-hidden"
                  >
                    <button
                      className="w-full p-6 text-left flex items-center justify-between group"
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    >
                      <span className="text-base font-bold group-hover:text-primary transition-colors">{faq.q}</span>
                      <Plus className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", activeFaq === i && "rotate-45")} />
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

      {/* Footer CTA & Contact Form */}
      <footer id="contact" className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.02] blur-[100px] rounded-full -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
                    <Button size="lg" variant="outline" className="h-16 px-12 border-border hover:bg-foreground hover:text-background transition-colors" asChild>
                      <a href="tel:+250739587054">
                        <Phone className="mr-3 w-5 h-5" />
                        Call Me
                      </a>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </ScrollReveal>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-8 md:p-12 rounded-[2.5rem] relative z-10 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Your Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Message</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 transition-colors resize-none"
                  />
                </div>
                <Button
                  size="lg"
                  variant="cyber"
                  className="w-full h-16 group relative"
                  onClick={handleSubmit}
                  disabled={isSending || !contactName || !contactEmail || !contactMessage}
                >
                  {isSending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="mr-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Email Me
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mt-6 flex items-center justify-center space-x-3 text-green-600 bg-green-500/10 border border-green-500/20 p-4 rounded-2xl"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold text-sm">Message sent successfully!</span>
                    </motion.div>
                  )}
                  {showError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
                    >
                      <div className="flex items-center space-x-3 text-red-600 mb-3">
                        <X className="w-5 h-5" />
                        <span className="font-bold text-sm">Message Delivery Interrupted.</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        Your current network or proxy might be blocking the request. You can try again or use the fallback below.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                          asChild
                        >
                          <a href={`mailto:izerejoshua94@gmail.com?subject=Contact from ${contactName}&body=${encodeURIComponent(contactMessage)}%0A%0AFrom: ${contactName} (${contactEmail})`}>
                            <Mail className="w-4 h-4 mr-2" />
                            Send via Email App
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            setContactName("");
                            setContactEmail("");
                            setContactMessage("");
                            setShowError(false);
                          }}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-muted-foreground/30 text-[10px] font-mono tracking-widest uppercase">
                  ✦ Direct Response Guaranteed
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-sm font-bold tracking-tighter font-mono text-muted-foreground">IZERE.SYSTEMS [v 2.5]</div>
            <div className="flex items-center space-x-8 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <span>© 2025 IZERE JOSHUA</span>
            </div>
            <div className="flex items-center space-x-4">
              {[
                { Icon: Github, href: "https://github.com/I-Josh-pro-grammin" },
                { Icon: Linkedin, href: "https://linkedin.com/in/izere-joshua" },
                { Icon: Mail, href: "https://mail.google.com/mail/?view=cm&to=izerejoshua94@gmail.com" }
              ].map((item, i) => (
                <Magnetic key={i}>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} className="w-10 h-10 bg-primary/5 border border-border rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground">
                    <item.Icon className="w-4 h-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </footer>

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
    </div >
  );
}
