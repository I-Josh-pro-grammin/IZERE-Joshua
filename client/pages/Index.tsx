import { Github, Linkedin, Mail, ArrowUpRight, Plus, Menu, X, Send, Loader2, CheckCircle, Check, Globe, Smartphone, Layout, Palette, Sun, Moon, Phone, Download, Server, Terminal } from "lucide-react";
import { TerminalNavigation } from "@/components/ui/terminal-navigation";
import { ArchitectureSimulation } from "@/components/ui/architecture-simulation";

const bCode = "/bcode.png";
const akaguriro = "/akaguriroo.png";
const projects = "/projects.png";
const joshImg = "/nkera.jpeg";
const icode = "/icode.png";
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
import { ArticleModal, Article } from "@/components/ui/article-modal";
import UnequalBordersCard from "@/components/ui/unequal-borders-card";
import { TechWink } from "@/components/ui/tech-wink";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const ARTICLES: Article[] = [
  { 
    title: "Building a Multi-Tenant SaaS Architecture", 
    date: "Oct 2025", 
    tag: "Architecture",
    content: [
      "Designing a multi-tenant SaaS application introduces complex challenges around data isolation, security, and scalability. In a multi-tenant architecture, a single instance of the software serves multiple customers (tenants), which drastically reduces infrastructure costs and simplifies deployment. However, it requires a robust strategy to ensure that tenant data remains strictly partitioned.",
      "The most critical decision in multi-tenancy is the data isolation model. The 'Silo' model provisions a separate database for each tenant, offering maximum isolation and easing compliance (like HIPAA or SOC2), but at the cost of high maintenance overhead. The 'Pool' model mixes all tenant data in a single database, using a tenant_id column to filter rows. This is highly scalable and cost-effective but introduces the risk of cross-tenant data leaks if a query is malformed.",
      "To mitigate the risks of the Pool model, modern systems heavily leverage Row-Level Security (RLS). By utilizing PostgreSQL's RLS policies, we can enforce tenant isolation at the database engine level. When a request comes in, the application sets a local configuration parameter for the current database session with the tenant's ID. The database then automatically appends the isolation filters to every query, making it virtually impossible for application-level bugs to leak data.",
      "Caching in a multi-tenant environment also requires careful design. A common pitfall is caching a generic response without considering the tenant context. To solve this, cache keys must always be prefixed with the tenant ID. Using Redis, we implement a namespace pattern (e.g., `tenant:{id}:users:list`), which not only isolates the data but also allows us to easily invalidate all cached data for a specific tenant when their configuration changes.",
      "Ultimately, there is no silver bullet. The choice between Silo, Pool, or a hybrid Bridge model depends entirely on your application's specific compliance requirements, scale, and operational capacity. By enforcing strict boundaries at the database and caching layers, you can build a highly scalable SaaS architecture that doesn't compromise on security."
    ]
  },
  { 
    title: "Rust vs Go for High-Throughput Microservices", 
    date: "Aug 2025", 
    tag: "Performance",
    content: [
      "As backend systems scale to handle millions of concurrent connections, the choice of programming language becomes critical. Node.js and Python often hit performance ceilings under extreme load, leading engineering teams to evaluate compiled, memory-safe languages. In recent years, the debate has largely narrowed down to two giants: Go and Rust.",
      "Go, designed by Google, is practically built for network I/O and microservices. Its killer feature is goroutines—lightweight, user-space threads multiplexed onto OS threads. You can spawn hundreds of thousands of goroutines with minimal memory overhead. Coupled with an incredibly fast compiler and a garbage collector optimized for low latency, Go allows teams to iterate quickly and build highly concurrent network services with very simple, readable code.",
      "Rust, on the other hand, takes a fundamentally different approach. Instead of a garbage collector, Rust uses an ownership model evaluated at compile time. This ensures memory safety and thread safety without runtime overhead, eliminating 'stop-the-world' GC pauses. For high-throughput systems where predictable tail latency (p99) is critical—such as financial trading engines or real-time gaming backends—Rust's deterministic performance is unmatched.",
      "However, this performance comes with a trade-off in developer experience. Rust's steep learning curve and strict compiler (the notorious 'borrow checker') can significantly slow down initial development speed compared to Go. Writing asynchronous code in Rust is also inherently more complex than Go's straightforward blocking-style goroutines.",
      "The verdict? If your microservice is primarily I/O bound (routing requests, querying databases, calling other services) and rapid delivery is a priority, Go is almost always the better choice. It hits the sweet spot of high performance and high developer productivity. But if your service is CPU-bound (complex cryptography, heavy data parsing, video encoding), or if strict control over memory and predictable tail latency are absolute requirements, Rust is the superior tool for the job."
    ]
  },
  { 
    title: "Debugging Memory Leaks in Node.js at Scale", 
    date: "Jun 2025", 
    tag: "Debugging",
    content: [
      "Memory leaks in Node.js can be incredibly insidious. Because JavaScript is a garbage-collected language, developers rarely think about manual memory management. However, when an application scales, a leak of just a few kilobytes per request can quickly compound, leading to massive heap sizes, frequent garbage collection pauses, and eventual Out-Of-Memory (OOM) crashes.",
      "The most common culprits for memory leaks in Node.js are unhandled closures and event listeners. If a closure retains a reference to a large object, and that closure is kept alive (for example, by being attached to an EventEmitter that is never cleaned up), the garbage collector cannot free that memory. Another frequent issue is unbounded caching—storing data in in-memory objects or Maps without implementing a Time-To-Live (TTL) or Least-Recently-Used (LRU) eviction policy.",
      "Identifying a leak requires proactive monitoring. The first step is setting up robust observability. By tracking `process.memoryUsage().heapUsed` over time in a dashboard like Grafana, you can visualize the leak. A healthy Node.js process will show a 'sawtooth' pattern—memory grows, then drops sharply when the GC runs. A memory leak is characterized by a sawtooth pattern where the baseline continuously trends upward over hours or days.",
      "Once a leak is suspected, the next step is capturing a heap snapshot. By starting the Node.js process with the `--inspect` flag, you can connect Chrome DevTools to the running server. When memory usage is high, taking a snapshot serializes the entire V8 heap. You can take a baseline snapshot, apply load to the system using a tool like Artillery, and then take a second snapshot. Comparing the two snapshots reveals exactly which objects were allocated and not freed.",
      "Mitigating these leaks often involves architectural tweaks. Utilizing `WeakMap` or `WeakSet` allows you to associate data with objects without preventing those objects from being garbage collected. For caching, always use dedicated solutions like Redis, or robust in-memory libraries like `lru-cache`. Finally, always ensure that `removeListener` or `off` is called when an event subscription is no longer needed, especially in long-lived connections like WebSockets."
    ]
  },
];

export const CASE_STUDIES: Article[] = [
  {
    title: "High-Performance API with Microservices Architecture",
    date: "Mar 2026",
    tag: "System Design",
    content: [
      "Our team built a full-featured Node.js API as a monolith during the initial development phase — a pragmatic choice that let us move fast, iterate quickly, and ship the product on time. But after launch, as real traffic grew past 50,000 daily requests, the cracks started showing. Response times spiked past 4 seconds during peak hours, and the system was beginning to buckle. Something had to change.",
      "We ran a thorough profiling session to understand what was actually happening before touching a single line of code. The findings were clear: three core domains — user authentication, data processing, and notification delivery — were all running on the same Node.js event loop, starving each other during bursts. A single heavy database query in the processing pipeline cascaded latency across every other endpoint in the system. The monolith's shared-everything model had become its biggest liability.",
      "After aligning as a team on the decomposition strategy, we carved the system into four independently deployable services. An API Gateway handled all inbound traffic — routing, rate limiting, and JWT validation — so downstream services never had to worry about these concerns. An Auth Service got its own isolated PostgreSQL database and a Redis session store. A Data Processing Service was rewritten as a dedicated cluster of Node.js workers. A Notification Service was fully decoupled using a RabbitMQ queue, meaning email and push delivery never blocked a user-facing request again.",
      "One of the more important architectural decisions we made was around inter-service communication. For synchronous, user-facing calls, we adopted gRPC over HTTP/2. Binary serialization reduced payload sizes by over 60% compared to our previous REST/JSON approach, which made a noticeable difference at scale. For async work — notifications, analytics events, audit logs — services published messages to RabbitMQ and moved on. No waiting, no coupling.",
      "Each service was containerized with Docker and deployed on a Kubernetes cluster with three nodes. We configured Horizontal Pod Autoscaling based on CPU thresholds, so the Data Processing service could scale from 2 pods up to 12 automatically within 90 seconds of a traffic spike — no manual intervention needed, even during unexpected peaks.",
      "The outcome validated every decision we made as a team. Average API response time dropped from 4.1 seconds to under 120ms. The system held steady through a stress test simulating 200,000+ concurrent connections. And because each service now failed independently, a bug in the notification pipeline no longer took down authentication or data processing. Over the three months following the migration, we recorded 99.97% uptime — a number the monolith could never have hit under that load."
    ]
  },
  {
    title: "Optimizing Database Performance at Scale",
    date: "Jan 2026",
    tag: "Performance",
    content: [
      "A production PostgreSQL database powering an e-commerce platform was processing 3-second average query times during peak load, directly translating to abandoned carts and lost revenue. The goal was sub-100ms queries without changing the application's data model.",
      "The first diagnostic step was enabling pg_stat_statements to capture a real workload fingerprint over 48 hours. The top 10 slowest queries accounted for 80% of total database CPU time—a classic 80/20 distribution. The primary culprit was a product search query performing sequential scans on a 12-million-row table, joining three other tables without any composite indexes.",
      "I introduced a GIN index on the product name and description columns to support full-text search (tsvector), immediately eliminating the sequential scan. For the join-heavy analytics queries, I created carefully targeted composite indexes that matched the exact column order of the WHERE and ORDER BY clauses—a detail that is frequently overlooked but critical for the query planner to use an index scan instead of falling back to a sequential scan.",
      "Connection pooling via PgBouncer in transaction mode was the second major lever. The application was opening a new connection per request, with peaks of 800 simultaneous connections overwhelming PostgreSQL's process-per-connection model. PgBouncer reduced the active connection count to a stable 25, dramatically reducing memory overhead and context-switching on the database server.",
      "Finally, frequently-read, rarely-written data (category trees, configuration tables) was moved to a Redis cache with a 5-minute TTL. This offloaded roughly 35% of all read queries from PostgreSQL entirely. The combined result: average query time fell from 3.1s to 38ms—a 75x improvement—CPU load on the database server dropped by 60%, and the platform handled Black Friday traffic without a single slow-query alert firing."
    ]
  }
];

export const PORTFOLIO_PROJECTS = [ {
                        title: "Web Platforms",
                        label: "Brainly Code",
                        desc: "Interactive educational platform for learning to code with engaging challenges and projects designed for all ages.",
                        image: bCode,
                        icon: <Globe className="w-6 h-6" />,
                        // github: "https://brainlycode.dpdns.org",
                        liveUrl: "https://brainlycode.dpdns.org",
                        tags: ["React", "Nest.js", "PostgreSQL", "Docker"],
                        colSpan: "md:col-span-12 lg:col-span-7",
                        rowSpan: "md:row-span-2",
                        imageHeight: "h-[300px] md:h-[450px]",
                        details: {
                          problem: "Beginners often find learning to code intimidating and dry, lacking interactive, engaging environments that foster practical skills.",
                          architecture: "Full-stack application using React for interactive UI components and Nest.js for managing user progress, courses, and execution.",
                          techStack: [
                            { name: "React", reason: "Enables building dynamic and highly interactive learning interfaces." },
                            { name: "Nest.js", reason: "Provides a structured and scalable backend for managing courses and user data." },
                            { name: "PostgreSQL", reason: "Reliable relational database for storing user progress and course materials." }
                          ],
                          impact: [
                            { metric: "Student Engagement", value: "Increased by 40%" },
                            { metric: "Course Completion", value: "85% Rate" },
                            { metric: "Active Learners", value: "10k+" }
                          ],
                          challenges: "Creating a seamless, lag-free interactive coding environment required optimizing state management and efficiently handling real-time code evaluation feedback."
                        }
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
                        imageHeight: "h-[250px]",
                        details: {
                          problem: "The Burundian market lacked a localized, performant e-commerce platform that integrated seamlessly with local payment systems.",
                          architecture: "Modern single-page application built with TypeScript and Vite, backed by Supabase for real-time database and authentication.",
                          techStack: [
                            { name: "TypeScript", reason: "Ensures type safety across the entire stack, reducing runtime errors." },
                            { name: "Supabase", reason: "Accelerated development with built-in auth, database, and real-time subscriptions." },
                            { name: "Vite", reason: "Lightning-fast build tool improving developer experience and bundle sizes." }
                          ],
                          impact: [
                            { metric: "Page Load Time", value: "< 1.5s" },
                            { metric: "Monthly Orders", value: "5,000+" },
                            { metric: "Uptime", value: "99.9%" }
                          ],
                          challenges: "Implementing custom payment gateways specific to the local market required building resilient integration layers that gracefully handle network instability."
                        }
                      },
                      {
                        title: "Mobile Architecture",
                        label: "IMove App",
                        desc: "Mobile app for finding nearest riders with real-time booking and geolocation tracking for seamless transit.",
                        icon: <Smartphone className="w-6 h-6" />,
                        // github: "https://i-move-admin-frontend.vercel.app/",
                        liveUrl: "https://i-move-admin-frontend.vercel.app/",
                        tags: ["React Native", "Expo", "MongoDB"],
                        colSpan: "md:col-span-12 lg:col-span-5",
                        rowSpan: "md:row-span-2",
                        imageHeight: "h-[350px]",
                        customContent: true,
                        details: {
                          problem: "Commuters faced difficulties in reliably locating and booking nearby riders, leading to long wait times and inefficient routing.",
                          architecture: "Mobile application built with React Native and Expo, utilizing MongoDB for flexible, location-based data storage.",
                          techStack: [
                            { name: "React Native", reason: "Allows cross-platform development for iOS and Android from a single codebase." },
                            { name: "Expo", reason: "Simplifies the mobile development workflow and access to native device features." },
                            { name: "MongoDB", reason: "Geospatial queries make it easy to find riders near a specific location." }
                          ],
                          impact: [
                            { metric: "Avg Wait Time", value: "-50%" },
                            { metric: "Daily Rides", value: "2,000+" },
                            { metric: "Driver Matching", value: "< 5s" }
                          ],
                          challenges: "Implementing real-time geolocation tracking without severely draining the device's battery required careful optimization of background location updates and WebSocket connections."
                        }
                      },
                      {
                        title: "Company Website",
                        label: "I CODE website",
                        desc: "Futuristic component modern website for a Rwandan tech company that builds and designs scalable and reliable systems.",
                        image: icode,
                        icon: <Palette className="w-6 h-6" />,
                        // github: "https://github.com/I-Josh-pro-grammin/E-buy",
                        liveUrl: "https://e-buy-store.vercel.app/",
                        tags: ["Next.js", "Node.js", "Tailwind"],
                        colSpan: "md:col-span-12 lg:col-span-7",
                        rowSpan: "md:row-span-1",
                        imageHeight: "h-[250px]",
                        details: {
                          problem: "The company needed a highly modern, futuristic digital presence to effectively showcase their system architecture and engineering capabilities to high-end clients.",
                          architecture: "Server-side rendered Next.js application utilizing Tailwind CSS for intricate, responsive, and futuristic styling components.",
                          techStack: [
                            { name: "Next.js", reason: "Provides excellent SEO and fast initial page loads through server-side rendering." },
                            { name: "Tailwind CSS", reason: "Utility-first styling enables rapid prototyping of complex, futuristic UI components." },
                            { name: "Node.js", reason: "Powers custom backend integrations and form submissions seamlessly." }
                          ],
                          impact: [
                            { metric: "Client Inquiries", value: "+120%" },
                            { metric: "Lighthouse Score", value: "98/100" },
                            { metric: "Bounce Rate", value: "-35%" }
                          ],
                          challenges: "Achieving complex, high-performance web animations (like 3D tilts and magnetic cursors) without compromising page performance and accessibility on lower-end devices."
                        }
                      },
                      {
                        title: "Career Guidance",
                        label: "Vantage",
                        desc: "A mobile app that provides an advantage to students by recommending the optimal career path based on the RIASEC model.",
                        image: vantage,
                        // icon: <Smartphone className="w-6 h-6" />,
                        liveUrl: "https://vantage-frontend-beta.vercel.app/",
                        tags: ["React Native", "AI", "Mobile"],
                        colSpan: "md:col-span-12 lg:col-span-5",
                        rowSpan: "md:row-span-1",
                        imageHeight: "h-[250px]",
                        // customContent: true,
                        // customIcon: <Smartphone className="w-24 h-24" />,
                        // customLabel: "Mobile Architecture",
                        details: {
                          problem: "Students frequently struggle to identify career paths that align with their natural aptitudes and interests, leading to misalignment and wasted educational resources.",
                          architecture: "AI-integrated application utilizing React Native on the frontend, interfacing with an AI recommendation engine.",
                          techStack: [
                            { name: "React Native", reason: "Delivers a native-like experience on both iOS and Android platforms." },
                            { name: "AI/ML", reason: "Powers the core recommendation engine based on the RIASEC model." },
                            { name: "Node.js", reason: "Serves as the middleware handling AI requests and user profile management." }
                          ],
                          impact: [
                            { metric: "Career Matches", value: "50,000+" },
                            { metric: "User Satisfaction", value: "4.8/5" },
                            { metric: "Accuracy Rate", value: "92%" }
                          ],
                          challenges: "Fine-tuning the AI prompts and models to consistently output structured, accurate, and culturally relevant career advice based on varied user inputs."
                        }
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
                        customLabel: "AI System Interface",
                        details: {
                          problem: "Job recruiters spend countless hours manually screening resumes, leading to bottlenecks in the hiring process and potential human bias.",
                          architecture: "Next.js web application deeply integrated with OpenAI APIs to automate resume parsing and candidate evaluation.",
                          techStack: [
                            { name: "Next.js", reason: "Robust framework for building the dashboard and handling server-side API calls." },
                            { name: "OpenAI", reason: "Provides the natural language processing power required to understand and score complex resumes." },
                            { name: "TypeScript", reason: "Ensures type safety across complex data structures exchanged with the AI models." }
                          ],
                          impact: [
                            { metric: "Screening Time", value: "-80%" },
                            { metric: "Placements", value: "1,000+" },
                            { metric: "Bias Reduction", value: "Measurable" }
                          ],
                          challenges: "Designing resilient systems to handle API rate limits and structuring AI outputs to guarantee JSON formatting for the frontend dashboard."
                        }
                      } ];



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
      className={cn("relative bg-card border border-blue-500/20 rounded-none overflow-hidden group transition-all duration-500 hover:border-blue-500/50 p-6 md:p-10 shadow-sm dark:shadow-none", className)}
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
        <div className="w-10 sm:w-12 md:w-16 flex items-center justify-center border-r border-blue-500/10 bg-blue-500/[0.02]">
          <span className="rotate-[-90deg] whitespace-nowrap text-lg sm:text-2xl md:text-4xl font-black tracking-tighter text-blue-500/80 uppercase">
            {project.label}
          </span>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col p-6 md:p-8">

          {/* Top Row: Meta Data */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-widest mb-1">Architecture</span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase">{project.title}</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-widest mb-1">Integrity</span>
                <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase">Verified</span>
              </div>
            </div>

            <div className="max-w-[200px] sm:max-w-[240px] text-right">
              <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-widest mb-2 block">Project Brief</span>
              <p className="text-[10px] md:text-xs leading-relaxed text-muted-foreground font-medium uppercase tracking-wider">
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
                className="w-full h-full object-contain bg-blue-500/[0.03] opacity-50 hover:opacity-60 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
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
              {/* <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 flex items-center justify-center rounded-none hover:bg-blue-500 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </div> */}
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["4rem", "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.4], ["100px", "0px"]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 0 : (index % 2 === 0 ? 5 : -5), 0]);
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const selectedProject = selectedProjectIndex !== null ? PORTFOLIO_PROJECTS[selectedProjectIndex] : null;
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number | null>(null);
  const selectedArticle = selectedArticleIndex !== null ? ARTICLES[selectedArticleIndex] : null;
  const [selectedCaseStudyIndex, setSelectedCaseStudyIndex] = useState<number | null>(null);
  const selectedCaseStudy = selectedCaseStudyIndex !== null ? CASE_STUDIES[selectedCaseStudyIndex] : null;
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
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const introEnd = 0; // Removed dealing phase
  const isIntroDone = 1;
  const introOpacity = 1;
  const mainContentOpacity = 1;

  useEffect(() => {
    let lenisRafId: number;
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 2, // Slower scrolling duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.7, // Reduce wheel speed
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      lenisRafId = requestAnimationFrame(raf);
    }
    lenisRafId = requestAnimationFrame(raf);

    setIsLoaded(true);
    setVh(window.innerHeight);
    setIsMobile(window.innerWidth < 1024);

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
      setIsMobile(window.innerWidth < 1024);
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on backtick or tilde
      if (e.key === '`' || e.key === '~') {
        // Only prevent default if we're not inside an input, unless we want global hijack
        // Actually, preventing default stops backtick from typing. We can check active element
        const tag = document.activeElement?.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setIsTerminalOpen(prev => !prev);
        } else if (isTerminalOpen) {
           // Allow toggling it off even when typing inside terminal
           e.preventDefault();
           setIsTerminalOpen(false);
        }
      }
    };

    // Measure once fonts/images load so layout is stable
    const timer = setTimeout(measureCarousel, 500);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleGlobalKeyDown);

    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    return () => {
      cancelAnimationFrame(lenisRafId);
      lenis.destroy();
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleGlobalKeyDown);
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

    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

    if (!formId) {
      console.warn("VITE_FORMSPREE_FORM_ID is missing in environment variables.");
      setIsSending(false);
      setShowError(true);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message via Formspree");
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
    // { title: "Certification", label: "Software Development Certificates", tags: ["Cloud", "Security"], type: 'achievement' as const },
    { title: "Success", label: "10x Engineer", tags: ["Excellence", "100% JS"], type: 'achievement' as const },
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
        isOpen={selectedProjectIndex !== null}
        onClose={() => setSelectedProjectIndex(null)}
        project={selectedProject}
        onNext={selectedProjectIndex !== null && selectedProjectIndex < PORTFOLIO_PROJECTS.length - 1 ? () => setSelectedProjectIndex(selectedProjectIndex + 1) : undefined}
        onPrev={selectedProjectIndex !== null && selectedProjectIndex > 0 ? () => setSelectedProjectIndex(selectedProjectIndex - 1) : undefined}
      />
      <ArticleModal
        isOpen={selectedArticleIndex !== null}
        onClose={() => setSelectedArticleIndex(null)}
        article={selectedArticle}
        onNext={selectedArticleIndex !== null && selectedArticleIndex < ARTICLES.length - 1 ? () => setSelectedArticleIndex(selectedArticleIndex + 1) : undefined}
        onPrev={selectedArticleIndex !== null && selectedArticleIndex > 0 ? () => setSelectedArticleIndex(selectedArticleIndex - 1) : undefined}
      />
      <ArticleModal
        isOpen={selectedCaseStudyIndex !== null}
        onClose={() => setSelectedCaseStudyIndex(null)}
        article={selectedCaseStudy}
        onNext={selectedCaseStudyIndex !== null && selectedCaseStudyIndex < CASE_STUDIES.length - 1 ? () => setSelectedCaseStudyIndex(selectedCaseStudyIndex + 1) : undefined}
        onPrev={selectedCaseStudyIndex !== null && selectedCaseStudyIndex > 0 ? () => setSelectedCaseStudyIndex(selectedCaseStudyIndex - 1) : undefined}
      />
      <TerminalNavigation isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      <div className="min-h-screen relative bg-background text-foreground selection:bg-primary selection:text-primary-foreground cursor-none transition-colors duration-500">
        <CustomCursor />

        {/* Navigation - Always Visible */}
        <nav
          className="fixed top-0 left-0 right-0 z-[101] border-b border-border/30 bg-background/80 backdrop-blur-xl transition-all duration-500"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
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

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="p-2 rounded-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-blue-500"
                aria-label="Open Terminal"
              >
                <Terminal className="w-5 h-5" />
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

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-4">
              {["Services", "Projects", "Process", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border/20 last:border-0"
                >
                  {item}
                </a>
              ))}
              <a
                href="/IZERE_JOSHUA_CV.pdf"
                download="IZERE_JOSHUA_CV.pdf"
                className="mt-2 flex items-center justify-center gap-2 bg-blue-500 text-white text-sm font-semibold py-3 px-6"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          )}
        </nav>

        {/* Phase 1: Intro Dealer (Fixed Overlay) */}
        {/* Intro Phase (Hint only) */}
        <motion.div style={{ opacity: introOpacity }} className="z-[100]">
          <IntroDealer scrollY={scrollY} vh={vh} />
        </motion.div>

        {/* Hero Section */}
        <div className="relative z-0">
          <section className="min-h-screen pt-32 sm:pt-44 pb-32 px-4 sm:px-6 border-b border-border/30 relative overflow-x-hidden">
            {/* Hero text and Carousel are here */}
            {/* We will hide the text during dealing but keep carousel visible */}
            {/* Marquee Background Name */}
            <div className="absolute lg:top-[25rem] top-[28rem] h-[50rem] -translate-y-1/2 left-0 w-full overflow-hidden z-0 pointer-events-none select-none">
              {/* Vibrant blue glow behind the name */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-blue-500/[0.08] blur-[120px] rounded-full dark:bg-blue-500/[0.05]" />

              <div className="animate-marquee whitespace-nowrap flex items-center">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter mx-4 sm:mx-8 text-blue-500/10 dark:text-blue-500/20">
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
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      <Badge variant="outline" className="px-4 py-2 border-blue-500/60 bg-blue-500/10 rounded-none text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] animate-pulse">
                        ✦ 10X+ ENGINEER
                      </Badge>
                      <Badge variant="outline" className="px-3 py-2 border-border/30 bg-muted/5 rounded-none text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-muted-foreground flex items-center">
                        SYSTEM ARCHITECT & FULL-STACK ENGINEER
                      </Badge>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 sm:mb-10 leading-[0.9] gradient-text overflow-hidden z-10 relative">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-foreground font-medium"
                      >
                        Engineering Solutions
                      </motion.span>
                    </h2>

                    <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 sm:mb-12 font-medium leading-relaxed px-2 sm:px-0">
                      Full-stack engineer building AI-powered products, scalable distributed systems, and modern digital architectures.
                    </p>

                    <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-3 sm:gap-6 justify-center items-center w-full max-w-lg sm:max-w-none">
                      <Button size="lg" className="h-12 sm:h-16 bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-12 text-sm" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                        View Projects
                      </Button>
                      <Button size="lg" variant="outline" className="h-12 sm:h-16 px-6 sm:px-12 border-blue-500/30 hover:bg-blue-500/10 text-foreground transition-colors text-sm" asChild>
                        <a href="/IZERE_JOSHUA_CV.pdf" download="IZERE_JOSHUA_CV.pdf">
                          <Download className="mr-2 w-4 sm:w-5 h-4 sm:h-5 text-blue-500" />
                          Download CV
                        </a>
                      </Button>
                      <Button size="lg" variant="outline" className="h-12 sm:h-16 px-6 sm:px-12 border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors text-sm" onClick={() => setIsTerminalOpen(true)}>
                        <Terminal className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
                        Terminal
                      </Button>
                      <Button size="lg" className="h-12 sm:h-16 bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-12 text-sm" asChild>
                        <a href="https://mail.google.com/mail/?view=cm&to=izerejoshua94@gmail.com" target="_blank" rel="noopener noreferrer">Contact Me</a>
                      </Button>
                    </div>
                  </motion.div>

                  {/* Featured Stats or Tags */}
                  <motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="mt-16 sm:mt-32 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
                    >
                      {[
                        { label: "Experience", value: "2+ Years" },
                        { label: "Projects", value: "20+ Completed" },
                        { label: "Design", value: "Minimalist" },
                        { label: "Stack", value: "Full-Stack" },
                      ].map((stat, i) => (
                        <div key={i} className="glass p-5 sm:p-8 flex flex-col justify-between h-32 sm:h-40 rounded-none">
                          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</span>
                          <span className="text-xl sm:text-2xl font-bold">{stat.value}</span>
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
                id="services"
                className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden bg-background z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 md:mb-16">
                      Engineering <span className="text-muted-foreground font-medium">Case Studies</span>
                    </h2>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "High-Performance API with Microservices",
                        desc: "How our team took a working monolithic Node.js API and decomposed it into microservices after launch — cutting response times from 4.1s to 120ms to handle 200k+ concurrent users.",
                        meta: "System Design · Microservices · Docker · Kubernetes",
                        metrics: ["Latency: 4.1s → 120ms", "Users: 200k+ concurrent", "Uptime: 99.97%"]
                      },
                      {
                        title: "Optimizing Database Performance",
                        desc: "A deep dive into indexing strategies, query refactoring, and connection pooling that reduced PostgreSQL query times from 3s to 38ms on a 12-million-row production table.",
                        meta: "PostgreSQL · Performance · Indexing · PgBouncer",
                        metrics: ["Speed: 75x Faster", "CPU Load: -60%", "Connections: 800 → 25"]
                      }
                    ].map((study, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedCaseStudyIndex(i)}
                      >
                        <UnequalBordersCard
                          title={study.title}
                          tag={`Case Study 0${i + 1}`}
                          date={study.meta}
                          description={study.desc}
                          className="h-full"
                        >
                          <div className="flex gap-4 border-t border-blue-500/10 pt-4">
                            {study.metrics.map((metric, idx) => (
                              <div key={idx} className="text-xs font-mono text-blue-500/80 font-bold tracking-tight">
                                {metric}
                              </div>
                            ))}
                          </div>
                        </UnequalBordersCard>
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
                className="py-16 md:py-32 px-4 md:px-6 bg-muted/30 border-b border-border/30 relative z-10"
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
                    {PORTFOLIO_PROJECTS.map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${project.colSpan} ${project.rowSpan} group cursor-pointer`}
                        onClick={() => setSelectedProjectIndex(i)}
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
                className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden bg-background border-b border-border/30 z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 md:mb-16 text-foreground">
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
              <section id="system-design" className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden bg-muted/30 border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 md:mb-16 text-foreground">
                      System <span className="text-muted-foreground font-medium">Architecture</span>
                    </h2>
                  </ScrollReveal>
                  <div className="bg-card border border-blue-500/20 p-6 md:p-12 relative min-h-[400px]">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none" />
                    <AnimatePresence mode="wait">
                      {!showSimulation ? (
                        <motion.div 
                          key="placeholder"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-center max-w-2xl mx-auto py-12 relative z-10 flex flex-col items-center justify-center"
                        >
                          <Server className="w-16 h-16 text-blue-500 mx-auto mb-6 opacity-80 animate-pulse" />
                          <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Event-Driven Microservices</h3>
                          <p className="text-muted-foreground leading-relaxed mb-8 font-medium">
                            Explore an interactive visual simulation of a production-ready microservices architecture. Witness live request routing, token-bucket rate limiting (DDoS defense), event streaming via Kafka, and cache invalidation in real-time.
                          </p>
                          <Button 
                            onClick={() => setShowSimulation(true)}
                            className="bg-blue-500 w-[300px] text-white hover:bg-blue-600 rounded-none h-12 px-8 font-mono font-bold uppercase tracking-widest"
                          >
                            Explore Architecture Simulation
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="simulation"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          className="relative z-10 flex flex-col gap-4"
                        >
                          <div className="flex justify-between items-center border-b border-blue-500/20 pb-4 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                              <h4 className="font-mono text-sm font-bold uppercase text-blue-400 tracking-wider">LIVE CLUSTER CONTROLLER</h4>
                            </div>
                            <Button 
                              onClick={() => setShowSimulation(false)}
                              variant="outline"
                              className="border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-none h-9 px-4 font-mono font-bold text-xs uppercase"
                            >
                              Exit Simulation
                            </Button>
                          </div>
                          <ArchitectureSimulation />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Technical Writing Section */}
            <SectionReveal index={4}>
              <section id="writing" className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden bg-background border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 md:mb-16 text-foreground">
                      Technical <span className="text-muted-foreground font-medium">Writing</span>
                    </h2>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ARTICLES.map((post, i) => (
                      <UnequalBordersCard key={i} title={post.title} tag={post.tag} date={post.date} className="cursor-pointer h-full" onClick={() => setSelectedArticleIndex(i)} />
                    ))}
                  </div>
                </div>
              </section>
            </SectionReveal>

            {/* Open Source Section */}
            {/* <SectionReveal index={5}>
              <section id="opensource" className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden bg-muted/30 border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-8">
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
            </SectionReveal> */}

            {/* Experience Timeline Section */}
            <SectionReveal index={6}>
              <section id="experience" className="py-16 md:py-32 px-4 md:px-6 relative overflow-hidden bg-background border-b border-border/30 z-10">
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 md:mb-16 text-foreground">
                      Engineering <span className="text-muted-foreground font-medium">Experience</span>
                    </h2>
                  </ScrollReveal>
                  <div className="pl-8 lg:pl-4 md:pl-12 border-l border-blue-500/20 space-y-16">
                    {[
                      { role: "Systems Engineer", company: "ICODE CO Ltd", period: "2024 - 2025", impact: "Scaled backend systems to handle 5M+ daily requests. Migrated monolith to event-driven microservices reducing latency by 40%." },
                      { role: "Backend Developer", company: "Blink Tech", period: "2025 - Present", impact: "Led development of a high-performance application. Improved deployment speed by implementing robust CI/CD pipelines." }
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
                className="py-16 md:py-32 px-4 md:px-6 bg-muted/30 relative overflow-hidden border-b border-border/30 z-10"
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
                className="py-16 md:py-32 px-4 md:px-6 border-b border-border/30 relative z-10 bg-background"
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
                        { image: "/aaron.png", name: "Twarimitswe Aaron", role: "Mentor At Brainiacs and Minister of Discipline at RCA", text: "Joshua is a persistent and highly motivated Full Stack Engineer who approaches every project with determination and ownership. His commitment to delivering quality results and pushing through challenges makes him someone you can confidently rely on for complex and demanding work.", rating: 5 },
                        { image: "/darius.jpg", name: "Niyonkuru Darius", role: "Mentor At Brainiacs and Minister of Academics at RCA", text: "Joshua is not just a developer but a true programmer. He doesn’t only write code; he understands the logic behind it and thinks deeply to find better solutions. His way of thinking is unique and impactful. I’ve known him for a year, and he continues to impress me—not only technically, but also mentally and socially. Beyond his skills, he has been a great friend, and working with him is truly inspiring.", rating: 5 },
                        { image: "/Ange.jpeg", name: "Ange", role: "Design Lead, Bloom", text: "Joshua is a hardworking colleague who fearlessly risks himself to get the job done. He cooperates seamlessly with others and always drives team success.", rating: 5 },
                        { image: "/ashrafu.png", name: "Ashrafu", role: "Design Lead, Bloom", text: "Working with Joshua has been an incredibly rewarding experience. He brings a rare combination of technical skill, creativity, and genuine curiosity to every discussion. Whether we were brainstorming ideas or mentoring together at Brainiacs, he consistently showed strong leadership, thoughtful problem-solving, and a passion for helping others grow. Joshua doesn't just build solutions — he elevates the people around him and turns ideas into clear, actionable outcomes. Any team would benefit from his energy and vision.", rating: 5 }
                      ].map((client, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="relative lg:sticky mb-8 sm:mb-12 lg:mb-24"
                          style={{ zIndex: i + 1, top: isMobile ? 'auto' : 120 + i * 20 }}
                        >
                          <TechnicalCard
                            title={client.name}
                            label={`Verification ID: 00${i + 1}`}
                            className="border-blue-500/20"
                          >
                            <div className="flex items-center space-x-6 mb-8">
                              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-none bg-muted border border-blue-500/20 flex items-center justify-center overflow-hidden">
                                {client.image ? (
                                  <img src={client.image} alt={client.name} className={`absolute inset-0 w-full ${client.name === "Twarimitswe Aaron" || client.name === "Niyonkuru Darius" ? "h-full" : "" } object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
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
                            <p className="text-base md:text-xl font-medium text-muted-foreground leading-relaxed italic border-l-2 border-blue-500/20 pl-4 sm:pl-6">
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
                id="process"
                className="py-16 md:py-32 px-4 md:px-6 bg-muted/30 border-b border-border/30 relative z-10"
              >
                <div className="max-w-7xl mx-auto border-x border-border/30 relative">
                  <div className="hidden md:block absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 -translate-x-1/2 z-10" />
                  <div className="hidden md:block absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 bg-foreground/30 translate-y-1/2 translate-x-1/2 z-10" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                    {/* Left Column: Core Principles */}
                    <div>
                      <div className="mb-8 md:mb-16">
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
                className="py-16 md:py-32 px-4 md:px-6 bg-background border-t border-border/30 relative z-10"
              >
                <div className="max-w-7xl mx-auto">

                  {/* CUSTOM SHAPE CONTAINER */}
                  <div className="relative">

                    {/* MAIN BACKGROUND */}
                    <div
                      className="relative bg-card border border-blue-500/20 p-6 sm:p-12 md:p-24 overflow-hidden rounded-none dark:bg-[#080808]"
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
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 sm:mb-10 leading-[0.9]">
                              Let's Grow <br />
                              <span className="text-muted-foreground italic">Together</span>
                            </h2>

                            <p className="text-base sm:text-xl text-muted-foreground mb-10 sm:mb-8 md:mb-16 font-medium leading-relaxed">
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
                                  <input 
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    className="w-full bg-muted/20 border border-blue-500/10 px-4 py-3 text-xs font-mono uppercase text-foreground placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/40 transition-colors dark:bg-blue-500/[0.03]" 
                                    placeholder="ENTER YOUR NAME" 
                                  />
                                  <input 
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    type="email"
                                    className="w-full bg-muted/20 border border-blue-500/10 px-4 py-3 text-xs font-mono uppercase text-foreground placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/40 transition-colors dark:bg-blue-500/[0.03]" 
                                    placeholder="YOUR EMAIL@DOMAIN.COM" 
                                  />
                                  <textarea 
                                    value={contactMessage}
                                    onChange={(e) => setContactMessage(e.target.value)}
                                    rows={4} 
                                    className="w-full bg-muted/20 border border-blue-500/10 px-4 py-3 text-xs font-mono uppercase text-foreground placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/40 transition-colors resize-none dark:bg-blue-500/[0.03]" 
                                    placeholder="PROVIDE A DESCRIPTION OF YOUR PROJECT" 
                                  />
                                </div>

                                {/* Status Messages */}
                                {showSuccess && (
                                  <div className="mt-4 text-xs font-mono uppercase text-green-400 border border-green-500/20 bg-green-500/[0.03] px-4 py-3">
                                    MESSAGE SENT SUCCESSFULLY. STANDBY FOR REPLY.
                                  </div>
                                )}
                                {showError && (
                                  <div className="mt-4 text-xs font-mono uppercase text-red-400 border border-red-500/20 bg-red-500/[0.03] px-4 py-3">
                                    TRANSMISSION FAILED. CHECK YOUR CONNECTIVITY AND TRY AGAIN.
                                  </div>
                                )}

                                {/* Button */}
                                <div className="mt-6 flex justify-end">
                                  <Button 
                                    onClick={handleSubmit}
                                    disabled={isSending}
                                    className="bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {isSending ? "TRANSMITTING..." : "SEND MESSAGE"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Bottom right text */}
                      <div className="hidden sm:flex absolute bottom-10 right-14 text-xs font-mono uppercase gap-2">
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

                    <div className="text-center pt-20 text-xs text-muted-foreground max-w-sm leading-relaxed">
                        <p>Everything you've seen so far was all part of my plan.</p>
                        <p className="flex items-center justify-center gap-1 text-center">To give you a great experience <TechWink /></p>
                    </div>

                    <div className="flex gap-8 text-sm text-muted-foreground">
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


