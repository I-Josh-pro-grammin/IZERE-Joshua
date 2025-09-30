import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-cosmic-purple-950 text-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
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
            <div className="w-8 h-8 bg-gradient-to-br from-cosmic-purple-400 to-neon-cyan-400 rounded-lg animate-pulse-slow" />
            <span className="text-xl font-bold text-glow">NexaCore</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-cosmic-purple-300 transition-colors duration-300">Features</a>
            <a href="#technology" className="hover:text-cosmic-purple-300 transition-colors duration-300">Technology</a>
            <a href="#contact" className="hover:text-cosmic-purple-300 transition-colors duration-300">Contact</a>
          </div>

          <Button className="btn-cyber">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating Badge */}
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="bg-cosmic-purple-800/50 text-cosmic-purple-200 border-cosmic-purple-600/50 px-6 py-2 text-sm animate-float">
              🚀 Next-Gen Technology Platform
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className={`text-6xl md:text-8xl font-extrabold mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-gradient-to-r from-cosmic-purple-400 via-neon-cyan-400 to-electric-blue-400 bg-clip-text text-transparent animate-gradient-x text-glow">
              Future is
            </span>
            <br />
            <span className="text-white">
              Now Here
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Experience the next evolution of digital innovation with cutting-edge AI, 
            quantum-ready architecture, and immersive interfaces that redefine possibility.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button size="lg" className="btn-cyber px-8 py-4 text-lg font-semibold">
              Launch Platform
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            
            <Button variant="ghost" size="lg" className="border border-cosmic-purple-500/30 hover:bg-cosmic-purple-800/20 px-8 py-4 text-lg">
              Watch Demo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12l-2-2m0 0l2-2m-2 2H6l2 2" />
              </svg>
            </Button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-cyan-400 mb-2 animate-glow">99.9%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-purple-400 mb-2 animate-glow">&lt; 50ms</div>
              <div className="text-gray-400">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-blue-400 mb-2 animate-glow">24/7</div>
              <div className="text-gray-400">AI Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cosmic-purple-400 to-neon-cyan-400 bg-clip-text text-transparent">
              Core Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Analytics",
                description: "Advanced machine learning algorithms that adapt and evolve with your data patterns."
              },
              {
                icon: "⚡",
                title: "Quantum Speed",
                description: "Lightning-fast processing with quantum-inspired optimization algorithms."
              },
              {
                icon: "🔒",
                title: "Zero-Trust Security", 
                description: "Military-grade encryption with biometric authentication and blockchain verification."
              },
              {
                icon: "🌐",
                title: "Global Network",
                description: "Edge computing nodes across 150+ locations for minimal latency worldwide."
              },
              {
                icon: "🎯",
                title: "Precision Control",
                description: "Granular control systems with real-time monitoring and predictive maintenance."
              },
              {
                icon: "🚀",
                title: "Scalable Architecture",
                description: "Auto-scaling infrastructure that grows with your needs, from startup to enterprise."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass border-cosmic-purple-600/30 hover:border-cosmic-purple-400/50 transition-all duration-500 group hover:transform hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-6 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-cosmic-purple-200 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-electric-blue-400 to-neon-cyan-400 bg-clip-text text-transparent">
              Powered by Tomorrow
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Built on cutting-edge technologies that push the boundaries of what's possible in digital innovation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Quantum AI', 'Neural Networks', 'Blockchain', 'Edge Computing', 'IoT Integration', 'AR/VR Ready', 'Cloud Native', '5G Optimized'].map((tech, index) => (
              <div key={index} className="holographic rounded-lg p-6 border border-cosmic-purple-600/30 hover:border-neon-cyan-400/50 transition-all duration-500 group">
                <div className="text-lg font-semibold text-cosmic-purple-200 group-hover:text-white transition-colors">
                  {tech}
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
              Ready to Begin?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of innovators already building the future with NexaCore.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="btn-cyber px-12 py-4 text-lg font-semibold">
              Start Free Trial
            </Button>
            <Button variant="ghost" size="lg" className="border border-cosmic-purple-500/30 hover:bg-cosmic-purple-800/20 px-12 py-4 text-lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-cosmic-purple-800/30">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 NexaCore. Shaping the future, one innovation at a time.</p>
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
