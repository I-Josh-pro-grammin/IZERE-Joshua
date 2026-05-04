import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { Badge } from "@/components/ui/badge";

export interface ProjectCardData {
  label: string;
  title: string;
  tags?: string[];
}

interface Hero3DCarouselProps {
  imageSrc: string;
  projects: ProjectCardData[];
}

const RotatingGroup = ({ projects }: { projects: ProjectCardData[] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slowly rotate the group around the Y axis
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const radius = 3.5; // Radius of the circle

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group key={project.label} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Html
              transform
              center
              scale={0.25}
              // This makes the HTML face outward or inward depending on the rotation.
              // To make them face the camera like billboards, we can either use sprite-like behavior
              // or let them be fixed in the 3D space. Transform mode fixes them in 3D space.
              className="pointer-events-none"
            >
              <div className="w-[768px] glass rounded-[4rem] p-12 border-4 border-primary/20 backdrop-blur-md shadow-2xl flex flex-col gap-6 items-center text-center">
                <span className="text-3xl uppercase tracking-[0.3em] text-muted-foreground font-bold">{project.title}</span>
                <span className="text-7xl font-extrabold text-foreground tracking-tight">{project.label}</span>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 justify-center mt-4">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-6 py-2 rounded-full bg-muted/80 border-2 border-border text-2xl font-mono text-muted-foreground font-semibold shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const Hero3DCarousel: React.FC<Hero3DCarouselProps> = ({ imageSrc, projects }) => {
  return (
    <div className="w-full h-[350px] md:h-[400px] relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 1.5, 14], fov: 35 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <group scale={0.85}>
        
        {/* Center Image */}
        <group position={[0, 0, 0]}>
          <Html transform center scale={0.25} className="pointer-events-none">
            <div className="relative w-[100rem] h-[100rem] md:w-[896px] md:h-[896px] rounded-full border-8 border-primary/20 overflow-hidden glass shadow-[0_0_100px_rgba(var(--primary),0.2)]">
              <img
                src={imageSrc}
                alt="Profile"
                className="w-full  h-full object-cover"
              />
            </div>
          </Html>
        </group>

        {/* Orbiting Projects */}
        <RotatingGroup projects={projects} />

        </group>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      {/* Decorative Blur */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
};
