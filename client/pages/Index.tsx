import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-cosmic-purple-950 text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Animated Particle Background */}
      <AnimatedBackground />

      {/* Dynamic Mouse Follower */}
      <div
        className="fixed w-64 h-64 rounded-full bg-gradient-to-r from-cosmic-purple-500/20 to-neon-cyan-400/20 blur-3xl pointer-events-none transition-all duration-300 ease-out z-0"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/Greenland2.jpg" alt="IZERE Joshua" className="w-12 h-12 bg-gradient-to-br from-cosmic-purple-400 to-neon-cyan-400 rounded-full animate-pulse-slow" />
            <span className="text-xl font-bold text-glow">IZERE Joshua</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="hover:text-cosmic-purple-300 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-cosmic-purple-300 transition-colors duration-300"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-cosmic-purple-300 transition-colors duration-300"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="hover:text-cosmic-purple-300 transition-colors duration-300"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="hover:text-cosmic-purple-300 transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button className="btn-cyber hidden sm:block">Get Started</Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-cosmic-purple-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-cosmic-purple-900/95 backdrop-blur-lg border-t border-cosmic-purple-600/30 md:hidden">
              <div className="px-6 py-4 space-y-4">
                <a
                  href="#about"
                  className="block hover:text-cosmic-purple-300 transition-colors duration-300"
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="block hover:text-cosmic-purple-300 transition-colors duration-300"
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  className="block hover:text-cosmic-purple-300 transition-colors duration-300"
                >
                  Skills
                </a>
                <a
                  href="#experience"
                  className="block hover:text-cosmic-purple-300 transition-colors duration-300"
                >
                  Experience
                </a>
                <a
                  href="#contact"
                  className="block hover:text-cosmic-purple-300 transition-colors duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center items-center">
        <div className="hover:transition-all hover:duration-8000 hover:cursor-pointer w-[15rem] h-[15rem] bg-gradient-to-br from-cosmic-purple-400 to-neon-cyan-400 border-2 border-black rounded-full animate-pulse-slow overflow-hidden">
        <img src="/Greenland2.jpg" alt="IZERE Joshua" className="" />
        </div>
        </div>


          {/* Floating Badge */}
          <div
            className={`mb-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="absolute bottom-[10rem] right-[10] bg-cosmic-purple-800/50 text-cosmic-purple-200 border-cosmic-purple-600/50 px-6 py-2 text-sm animate-float">
              ✦ Available for freelance · Portfolio
            </Badge>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-8xl font-extrabold mb-6 md:mb-8 transition-all duration-1000 delay-300 leading-tight ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="bg-gradient-to-r from-cosmic-purple-400 via-neon-cyan-400 to-electric-blue-400 bg-clip-text text-transparent animate-gradient-x text-glow">
              IZERE Joshua
            </span>
            <br />
            <span className="text-white">Software Engineer</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            I craft immersive, high‑performance interfaces with a love for
            motion, precision and futuristic aesthetics.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Button
              size="lg"
              className="btn-cyber px-8 py-4 text-lg font-semibold"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="border border-cosmic-purple-500/30 hover:bg-cosmic-purple-800/20 px-8 py-4 text-lg"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-cyan-400 mb-2 animate-glow">
                4+
              </div>
              <div className="text-gray-400">Projects Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-purple-400 mb-2 animate-glow">
                12+
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-blue-400 mb-2 animate-glow">
                &lt; 24h
              </div>
              <div className="text-gray-400">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cosmic-purple-400 to-neon-cyan-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              I'm a software engineer focused on building beautiful, accessible
              and blazing‑fast web experiences. I love micro‑interactions,
              motion design and creating fluid interfaces that feel alive and efficient and secure backend solutions.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              "React",
              "TypeScript",
              "Tailwind",
              "Vite",
              "Framer Motion",
              "Next.js",
              "Node.js",
              "Express",
              "MongoDB",
              "PostgreSQL",
              "Docker",
              "Prisma"
            ].map((skill) => (
              <div
                key={skill}
                className="glass p-4 text-center border-cosmic-purple-600/30"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-cosmic-purple-400 to-neon-cyan-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛒",
                title: "E-Buy",
                description:
                  "A futuristic component library with neon aesthetics and fluid micro‑interactions.",
                link: "https://e-buy.vercel.app/",
                github: "https://github.com/izerejoshua/e-buy",
                technologies: ["React", "TypeScript", "Tailwind", "Vite", "Node.js", "Express", "MongoDB"],
              },
              {
                icon: "💻",
                title: "Brainly Code",
                description:
                  "Real‑time analytics dashboard with animated charts and seamless UX.",
                link: "https://brainly-code.vercel.app/",
                github: "https://github.com/izerejoshua/brainly-code",
                technologies: ["React", "TypeScript", "Tailwind", "Vite", "Node.js", "Nest.js", "PostgreSQL", "Docker", "Prisma"],
              },
              {
                icon: "💻",
                title: "Commerce Flow",
                description:
                  "Headless e‑commerce storefront focused on speed, accessibility and conversion.",
                link: "https://commerce-flow.vercel.app/",
                github: "https://github.com/izerejoshua/commerce-flow",
                technologies: ["React", "TypeScript", "Tailwind"],
              },
              {
                icon: "💻",
                title: "Motion Lab",
                description:
                  "Playground of complex page transitions and magnetic cursor effects.",
                link: "https://motion-lab.vercel.app/",
                github: "https://github.com/izerejoshua/motion-lab",
                technologies: ["React", "TypeScript", "Tailwind"],
              },
              {
                icon: "🛒",
                title: "E-commerce backend app",
                description:
                  "Responsive PWA with offline support and delightful gestures.",
                link: "https://e-commerce-backend-app.vercel.app/",
                github: "https://github.com/izerejoshua/e-commerce-backend-app",
                technologies: ["React", "TypeScript", "Tailwind"],
              },
              {
                icon: "🧩",
                title: "Design Templates",
                description:
                  "Token‑driven, themeable systems with full documentation and templates.",
                link: "https://design-templates.vercel.app/",
                github: "https://github.com/izerejoshua/design-templates",
                technologies: ["React", "TypeScript", "Tailwind"],
              },
              {
                icon: "🧩",
                title: "My NextJs portfolio Template",
                description:
                  "Token‑driven, themeable systems with full documentation and templates.",
                link: "https://my-nextjs-portfolio-template.vercel.app/",
                github: "https://github.com/izerejoshua/my-nextjs-portfolio-template",
                technologies: ["React", "TypeScript", "Tailwind"],
              },
              {
                icon: "💰",
                title: "Budgetly",
                description:
                  "Token‑driven, themeable systems with full documentation and templates.",
                link: "https://budgetly.vercel.app/",
                github: "https://github.com/izerejoshua/budgetly",
                technologies: ["React", "TypeScript", "Tailwind"],
              },
              {
                icon: "💰",
                title: "Spring-boot backend app",
                description:
                  "Token‑driven, themeable systems with full documentation and templates.",
                link: "https://spring-boot-backend-app.vercel.app/",
                github: "https://github.com/izerejoshua/spring-boot-backend-app",
                technologies: ["React", "TypeScript", "Tailwind"],
              }
            ].map((project, index) => (
              <ScrollReveal key={index} delay={index * 100} direction="up">
                <Card className="glass border-cosmic-purple-600/30 hover:border-cosmic-purple-400/50 transition-all duration-500 group hover:transform hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div
                      className="text-4xl mb-6 animate-float"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-cosmic-purple-200 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                      {project.technologies.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded border border-cosmic-purple-600/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-electric-blue-400 to-neon-cyan-400 bg-clip-text text-transparent">
              Skills & Tools
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Modern stack focused on performance, accessibility and delightful
            UX.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "React",
              "TypeScript",
              "Tailwind",
              "Vite",
              "Framer Motion",
              "Next.js",
              "Node.js",
              "Express",
              "MongoDB",
              "PostgreSQL",
              "Docker",
              "Prisma"
            ].map((tech, index) => (
              <div
                key={index}
                className="holographic rounded-lg p-6 border border-cosmic-purple-600/30 hover:border-neon-cyan-400/50 transition-all duration-500 group"
              >
                <div className="text-lg font-semibold text-cosmic-purple-200 group-hover:text-white transition-colors">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-cosmic-purple-400 to-neon-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="space-y-6">
            {[
              {
                role: "Frontend Engineer",
                company: "Freelance",
                period: "2024 — 2025",
                desc: "Designing and building bespoke interfaces for startups and agencies.",
              },
              {
                role: "Backend Engineer",
                company: "Blink Tech",
                period: "2025 — Present",
                desc: "Building secure , efficient and scalable backend solutions and maintaining backend development of the company websites.",
              },
              {
                role: "UI Designer",
                company: "Blink Tech",
                period: "2025 — Present",
                desc: "Led component libraries and animations for high‑traffic sites.",
              },
            ].map((job, i) => (
              <div key={i} className="glass p-6 border-cosmic-purple-600/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold">
                      {job.role} —{" "}
                      <span className="text-cosmic-purple-300">
                        {job.company}
                      </span>
                    </div>
                    <div className="text-gray-400">{job.desc}</div>
                  </div>
                  <div className="text-gray-400">{job.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-neon-cyan-400 to-cosmic-purple-400 bg-clip-text text-transparent">
              Get in touch
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12">
            For collaborations or opportunities, reach out and I’ll respond
            within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="btn-cyber px-12 py-4 text-lg font-semibold"
              onClick={() =>
                (window.location.href = "mailto:hello@example.com")
              }
            >
              Email Me
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="border border-cosmic-purple-500/30 hover:bg-cosmic-purple-800/20 px-12 py-4 text-lg"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-cosmic-purple-800/30">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 IZERE Joshua. All rights reserved.</p>
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
    </div>
  );
}
