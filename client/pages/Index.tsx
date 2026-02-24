import { Github, Linkedin, Mail, ArrowUpRight, Plus, Menu, X, Send, Loader2, CheckCircle } from "lucide-react";
const bCode = "/bcode.png";
const akaguriro = "/akaguriroo.png";
const projects = "/projects.png";
const joshImg = "/Greenland2.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async () => {
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSending(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSending(false);
    setShowSuccess(true);

    // Reset form
    setContactName("");
    setContactEmail("");
    setContactMessage("");

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Background Decor */}
      <div className="fixed inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-extrabold tracking-tighter">IZERE.</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {["Services", "Projects", "Process", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Let's talk
            </Button>
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
          className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col space-y-6 text-2xl font-bold">
            {["Services", "Projects", "Process", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
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
              <div className="absolute -inset-10 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="relative w-full h-full rounded-full border border-white/10 overflow-hidden glass">
                <img
                  src={joshImg}
                  alt="IZERE JOSHUA"
                  className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </motion.div>

            <Badge variant="outline" className="mb-8 px-4 py-1.5 border-white/10 bg-white/5 rounded-full text-[10px] font-mono tracking-widest uppercase">
              ✦ SYSTEM ARCHITECT & FULL-STACK ENGINEER
            </Badge>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 leading-[0.9] gradient-text">
              IZERE JOSHUA<br />
              <span className="text-white/40 font-medium">Engineering Solutions</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mb-12 font-medium leading-relaxed">
              Building high-performance, scalable systems and immersive digital experiences with modern technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="h-16 px-12" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12" asChild>
                <a href="https://mail.google.com/mail/?view=cm&to=izerejoshua94@gmail.com" target="_blank" rel="noopener noreferrer">Connect Now</a>
              </Button>
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
              <div key={i} className="glass p-8 rounded-3xl flex flex-col justify-between h-40">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</span>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
              Design <span className="text-white/40 font-medium">Services</span>
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
                className="glass p-10 rounded-[2.5rem] group hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-white/30 transition-colors">
                  <Plus className="w-5 h-5 text-white/40 group-hover:text-white group-hover:rotate-90 transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/50 mb-8 leading-relaxed font-medium">{service.desc}</p>
                <div className="pt-8 border-t border-white/5 flex flex-wrap gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{service.meta}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Engineering <span className="text-white/40 font-medium">Projects</span>
              </h2>
            </ScrollReveal>
            <Button variant="outline" className="rounded-full px-8" onClick={() => window.open("https://github.com/I-Josh-pro-grammin", "_blank")}>
              <Github className="mr-2 w-4 h-4" />
              View Full GitHub
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {[
              {
                title: "Brainly Code",
                desc: "Real‑time analytics dashboard with animated charts and seamless UX.",
                image: bCode,
                github: "https://brainlycode.dpdns.org",
                tags: ["React", "Nest.js", "PostgreSQL", "Docker"],
                colSpan: "md:col-span-8",
                aspect: "aspect-[16/9]"
              },
              {
                title: "Akaguriro",
                desc: "Full-stack E-commerce platform for the Burundian market.",
                image: akaguriro,
                github: "https://akaguriroo.com",
                tags: ["TypeScript", "Express", "Supabase", "Vite"],
                colSpan: "md:col-span-4",
                aspect: "aspect-[4/5]"
              },
              {
                title: "E-Buy Store",
                desc: "Futuristic component library and global commerce experience.",
                image: projects,
                github: "https://github.com/I-Josh-pro-grammin/E-buy",
                tags: ["React", "Node.js", "MongoDB", "Tailwind"],
                colSpan: "md:col-span-5",
                aspect: "aspect-square"
              },
              {
                title: "IMove Mobile",
                desc: "Mobile app for finding nearest riders with real-time booking.",
                github: "https://github.com/I-Josh-pro-grammin/imove-mobile-app",
                tags: ["React Native", "Express", "MongoDB", "Expo"],
                colSpan: "md:col-span-7",
                customContent: true
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${project.colSpan} group cursor-pointer`}
                onClick={() => project.github && window.open(project.github, "_blank")}
              >
                <div className={`relative ${project.aspect || "h-full"} overflow-hidden rounded-[3rem] bg-[#111] border border-white/5 group-hover:border-white/20 transition-all duration-500`}>
                  {project.customContent ? (
                    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 p-12 gap-8">
                      <div className="flex flex-col justify-end">
                        <h3 className="text-3xl font-bold mb-4 leading-tight">{project.title}</h3>
                        <p className="text-white/50 font-medium mb-8">{project.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map(tag => <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded bg-white/5">{tag}</span>)}
                        </div>
                        <Button variant="outline" className="w-fit">Source Code</Button>
                      </div>
                      <div className="hidden md:flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/10 backdrop-blur-3xl overflow-hidden flex items-center justify-center">
                          <Github className="w-32 h-32 opacity-10" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img src={project.image || projects} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-10 left-10">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map(tag => <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">{tag}</span>)}
                        </div>
                        <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                        <p className="text-white/60 font-medium">{project.desc}</p>
                      </div>
                      <div className="absolute top-10 right-10 w-14 h-14 bg-white rounded-full flex items-center justify-center -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <ArrowUpRight className="text-black w-6 h-6" />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex mt-10 items-center justify-center">
            <h2 className="text-2xl  md:text-xl font-bold tracking-tighter">
              Other Projects
            </h2>
          </div>
          {/* Secondary Projects Grid (Monospace/Technical Style) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">

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
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section id="services" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
              Technical <span className="text-white/40 font-medium">Expertise</span>
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
                className="glass p-10 rounded-[2.5rem] group hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-white/30 transition-colors">
                  <Plus className="w-5 h-5 text-white/40 group-hover:text-white group-hover:rotate-90 transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{expertise.title}</h3>
                <p className="text-white/50 mb-8 leading-relaxed font-medium">{expertise.desc}</p>
                <div className="pt-8 border-t border-white/5 flex flex-wrap gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/30 font-bold">{expertise.meta}</span>
                </div>
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
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          white-space: nowrap;
          cursor: default;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }
        .ticker-chip:hover { color: white; background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); }
        .ticker-icon { filter: grayscale(1) brightness(0.55); font-style: normal; font-size: 1rem; line-height: 1; }
      `}</style>

      <div style={{ padding: "4rem 0", overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "6rem", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, black, transparent)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "6rem", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, black, transparent)" }} />

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

      <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Engineering <span className="text-white/40 font-medium">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Scalable Architecture", "Clean Code Enthusiast", "Performance Optimization", "Security Best Practices",
              "CI/CD Pipelines", "Database Optimization", "Responsive Web Design", "Technical Documentation"
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className="glass p-8 rounded-[2rem] flex items-center space-x-4 group"
              >
                <div className="w-2 h-2 rounded-full bg-white opacity-20" />
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
                <Badge variant="outline" className="px-4 py-1.5 border-white/10 bg-white/5 rounded-full text-[10px] font-mono tracking-widest uppercase">
                  ✦ Happy Clients
                </Badge>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                  Clients <span className="text-white/40 font-medium">Love me</span>
                </h2>
                <p className="text-lg text-white/50 max-w-sm font-medium leading-relaxed">
                  Trusted by 10+ happy clients, providing great solutions through optimized engineering.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Happy Clients", value: "10+" },
                    { label: "Produced projects", value: "20+" },
                    { label: "Avg Rating", value: "4.8" },
                  ].map((stat, i) => (
                    <div key={i} className="glass p-5 rounded-2xl">
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-[10px] text-white/40 font-bold uppercase tracking-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="rounded-full px-8 h-12" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                    See All Projects
                  </Button>
                  <Button className="rounded-full px-8 h-12" asChild>
                    <a href="mailto:izerejoshua94@gmail.com">Contact Now</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: Scrollable Cards */}
            <div className="lg:col-span-7 space-y-6">
              {[
                { name: "John Doe", role: "CEO, TechFlow", text: "Izere is a visionary. His design and development skills are unmatched. The final product not only looks great but also enhances user engagement.", rating: 5 },
                { name: "Sarah Smith", role: "Founder, GreenArt", text: "The focus on motion and user experience really made our project stand out. Engineering meets art in the best way possible.", rating: 5 },
                { name: "David Chen", role: "CTO, NexaLink", text: "Technical depth and speed. We built a complex dashboard in record time with perfect performance scores.", rating: 5 },
                { name: "Emma Wilson", role: "Product Manager, Sphere", text: "A rare mix of engineering excellence and creative flair. He understood our complex requirements perfectly.", rating: 4.9 },
                { name: "Michael Ross", role: "MD, Stellar", text: "Exceptional creativity and attention to detail! The final product delivered was beyond our expectations.", rating: 5 },
                { name: "Lisa Wong", role: "Design Lead, Bloom", text: "His ability to bridge gap between complex backend logic and smooth frontend motion is incredible.", rating: 5 }
              ].map((client, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="glass p-10 rounded-[2.5rem] relative group"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-white/40">{client.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{client.name}</div>
                      <div className="text-xs text-white/40 font-mono tracking-wider uppercase">{client.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-6 space-x-1">
                    <span className="text-sm font-bold mr-2">{client.rating.toFixed(1)}</span>
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className={cn("text-sm", s < Math.floor(client.rating) ? "text-yellow-500" : "text-white/10")}>★</span>
                    ))}
                  </div>
                  <p className="text-lg font-medium text-white/70 leading-relaxed italic">
                    "{client.text}"
                  </p>
                  <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-white/20 group-hover:bg-green-500 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Development <span className="text-white/40 font-medium">Lifecycle</span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto font-medium">Focused on building secure, high-performance systems through a structured engineering approach.</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Analyzing requirements, identifying bottlenecks, and defining technical goals." },
              { step: "02", title: "Architecture", desc: "Designing system components, database schemas, and API structures." },
              { step: "03", title: "Implementation", desc: "Writing clean, modular code with unit tests and continuous integration." },
              { step: "04", title: "Scale & QC", desc: "Deployment, performance monitoring, and ensuring long-term scalability." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative glass p-10 rounded-[2.5rem] group overflow-hidden"
              >
                <div className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors mb-8 font-mono">{item.step}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{item.desc}</p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-white/10 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Technical <span className="text-white/40 font-medium">Insights & FAQ</span>
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass rounded-[1.5rem] overflow-hidden"
              >
                <button
                  className="w-full p-8 text-left flex items-center justify-between group"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="text-lg font-bold group-hover:text-white/80 transition-colors">{faq.q}</span>
                  <Plus className={cn("w-5 h-5 text-white/30 transition-transform duration-300", activeFaq === i && "rotate-45")} />
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
                      <div className="px-8 pb-8 text-white/50 font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA & Contact Form */}
      <footer id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 blur-[100px] rounded-full -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
                  Let's Grow <br />
                  <span className="text-white/40 italic">Together</span>
                </h2>
                <p className="text-xl text-white/50 mb-16 font-medium leading-relaxed">
                  Have a visionary project in mind? Let's turn your ideas into a high-performance digital reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button size="lg" variant="outline" className="h-16 px-12" asChild>
                    <a href="https://linkedin.com/in/izere-joshua" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-3 w-5 h-5" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-8 md:p-12 rounded-[2.5rem] relative z-10"
            >
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Your Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Message</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
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
                      className="mt-6 flex items-center justify-center space-x-3 text-green-400 bg-green-400/10 border border-green-400/20 p-4 rounded-2xl"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold text-sm">Message sent successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-white/30 text-[10px] font-mono tracking-widest uppercase">
                  ✦ Direct Response Guaranteed
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-sm font-bold tracking-tighter font-mono">IZERE.SYSTEMS [v 2.5]</div>
            <div className="flex items-center space-x-8 text-sm font-medium text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>© 2025 IZERE JOSHUA</span>
            </div>
            <div className="flex items-center space-x-4">
              {[
                { Icon: Github, href: "https://github.com/I-Josh-pro-grammin" },
                { Icon: Linkedin, href: "https://linkedin.com/in/izere-joshua" },
                { Icon: Mail, href: "https://mail.google.com/mail/?view=cm&to=izerejoshua94@gmail.com" }
              ].map((item, i) => (
                <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <item.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cosmic-purple-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div >
  );
}
