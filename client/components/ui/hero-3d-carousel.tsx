import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

export interface CardData {
  label: string;
  title: string;
  tags?: string[];
  type?: 'project' | 'achievement';
}

interface Hero3DCarouselProps {
  imageSrc: string;
  projects: CardData[];
  achievements?: CardData[];
}

const RotatingGroup = ({ 
  data, 
  radius = 3.5, 
  speed = 0.2, 
  manualRotationRef,
  yOffset = 0,
  cardClassName = ""
}: { 
  data: CardData[]; 
  radius?: number; 
  speed?: number;
  manualRotationRef: React.MutableRefObject<number>;
  yOffset?: number;
  cardClassName?: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const autoRotation = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      autoRotation.current += delta * speed;
      // Combine auto-rotation with the manual drag offset
      groupRef.current.rotation.y = autoRotation.current + manualRotationRef.current;
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {data.map((item, i) => {
        const angle = (i / data.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group key={`${item.label}-${i}`} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Html
              transform
              center
              scale={0.25}
              className="pointer-events-none select-none"
            >
              <div className={`w-[768px] glass rounded-[4rem] p-12 border-4 border-primary/20 backdrop-blur-md shadow-2xl flex flex-col gap-6 items-center text-center relative group transition-all duration-500 hover:scale-[1.05] hover:border-primary/40 ${cardClassName}`}>
                <span className="text-3xl uppercase tracking-[0.4em] text-muted-foreground font-bold">{item.title}</span>
                <span className="text-7xl font-extrabold text-foreground tracking-tight leading-tight">{item.label}</span>
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-4 justify-center mt-6">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-8 py-3 rounded-full bg-primary/5 border-2 border-primary/10 text-2xl font-mono text-primary/60 font-bold shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.type === 'achievement' && (
                  <div className="absolute -top-6 -right-6 px-10 py-4 bg-blue-500 rounded-full text-white text-2xl font-black uppercase tracking-widest shadow-xl rotate-12">
                    Verified
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

const CenterImage = ({ imageSrc, manualRotationRef }: { imageSrc: string; manualRotationRef: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = manualRotationRef.current;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Html transform center scale={0.25} className="pointer-events-none">
        <div className="relative w-[896px] h-[896px] rounded-full border-[12px] border-primary/30 overflow-hidden glass shadow-[0_0_150px_rgba(59,130,246,0.3)] p-4">
          <div className="w-full h-full rounded-full overflow-hidden relative group">
            <img
              src={imageSrc}
              alt="Profile"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay" />
          </div>
        </div>
      </Html>
    </group>
  );
};

export const Hero3DCarousel: React.FC<Hero3DCarouselProps> = ({ 
  imageSrc, 
  projects, 
  achievements = [] 
}) => {
  const innerManualRot = useRef(0);
  const outerManualRot = useRef(0);
  const centerManualRot = useRef(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setActiveButton(e.button);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveButton(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const factor = 0.005;

    if (activeButton === 0) { // Left Click Drag -> Inner Ring
      innerManualRot.current += e.movementX * factor * Math.PI;
    } else if (activeButton === 2) { // Right Click Drag -> Outer Ring
      outerManualRot.current += e.movementX * factor * Math.PI;
    } else if (activeButton === 1) { // Middle Click Drag -> Center Image
      centerManualRot.current += e.movementX * factor * Math.PI;
    }
  };

  const handleDoubleClick = () => {
    innerManualRot.current = 0;
    outerManualRot.current = 0;
    centerManualRot.current = 0;
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const displayAchievements: CardData[] = achievements.length > 0 ? achievements : [
    { title: "Recognition", label: "Global Innovation Award", tags: ["First Place", "2024"], type: 'achievement' },
    { title: "Achievement", label: "2M+ Active Users Reached", tags: ["Scalability", "Impact"], type: 'achievement' },
    { title: "Certification", label: "Full-Stack System Architect", tags: ["Advanced", "Core"], type: 'achievement' },
    { title: "Recognition", label: "Top Contributor @ Brainly", tags: ["Community", "Growth"], type: 'achievement' }
  ];

  return (
    <div 
      className="w-full p-20 h-[500px] md:h-[650px] relative z-50 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <Canvas camera={{ position: [0, 2, 20], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        
        <group scale={0.8}>
          {/* Center Image */}
          <CenterImage imageSrc={imageSrc} manualRotationRef={centerManualRot} />

          {/* Inner Ring: Projects */}
          <RotatingGroup 
            data={projects} 
            radius={5.5} 
            speed={0.15} 
            manualRotationRef={innerManualRot}
            cardClassName="bg-background/40"
          />

          {/* Outer Ring: Achievements */}
          <RotatingGroup 
            data={displayAchievements} 
            radius={9.5} 
            speed={-0.12} 
            manualRotationRef={outerManualRot}
            cardClassName="bg-blue-500/5 border-blue-500/10"
          />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false} 
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
      
      <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[180px] pointer-events-none -z-10" />
      
      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] pointer-events-none opacity-50 flex flex-col items-center gap-2 text-center">
        <div className="flex flex-wrap gap-4 justify-center">
          <span>[Left Drag] Inner Ring</span>
          <span>[Middle Drag] Center Image</span>
          <span>[Right Drag] Outer Ring</span>
        </div>
        <span>[Double Click] Reset All</span>
      </div>
    </div>
  );
};
