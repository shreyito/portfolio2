import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas
      camera={{
        position: [0, 0, 12], // closer default camera
        fov: 35,             // narrower FOV = stronger zoom
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
    >
      {/* Ambient */}
      <ambientLight intensity={0.25} color="#1a1a40" />

      {/* Orbit Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}          // allow zoom on all devices
        enableDamping={true}
        dampingFactor={0.08}

        /* 🔥 ZOOM LIMITS (IMPORTANT) */
        minDistance={1.8}          // allows close zoom to certificates
        maxDistance={22}

        /* Rotation limits */
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.9}

        /* Interaction speed */
        zoomSpeed={0.9}
        rotateSpeed={0.6}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />

        <group
          scale={isMobile ? 0.75 : isTablet ? 0.9 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
