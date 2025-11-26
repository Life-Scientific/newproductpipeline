"use client";

import { Canvas } from "@react-three/fiber";
import { AuthParticles } from "./AuthParticles";

export const AuthGL = ({ hovering = false }: { hovering?: boolean }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [1.26, 2.66, -1.82],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
        gl={{ antialias: true }}
      >
        {/* Matching page background for seamless blend */}
        <color attach="background" args={["#f8f7f4"]} />
        <AuthParticles
          speed={0.6}
          aperture={1.79}
          focus={3.8}
          size={512}
          noiseScale={0.6}
          noiseIntensity={0.52}
          timeScale={0.6}
          pointSize={10.0}
          opacity={0.85}
          planeScale={10.0}
          useManualTime={false}
          manualTime={0}
          introspect={hovering}
        />
      </Canvas>
    </div>
  );
};

