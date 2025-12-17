import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useTexture, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ================= WALL CERTIFICATE ================= */
function WallCertificate({ texture, position }) {
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.58, 0.36, 0.02]} />
        <meshStandardMaterial color="#111" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[0.53, 0.31]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ================= HOVER SPARKS ================= */
function HoverSparks({ position }) {
  const pointsRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!pointsRef.current || !hovered) return;
    pointsRef.current.rotation.z += 0.02;
    pointsRef.current.material.opacity =
      0.5 + Math.sin(state.clock.elapsedTime * 6) * 0.3;
  });

  return (
    <points
      ref={pointsRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={new Float32Array(
            [...Array(50)].flatMap(() => [
              (Math.random() - 0.5) * 1.2,
              (Math.random() - 0.5) * 0.6,
              Math.random() * 0.1,
            ])
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ff8cff"
        transparent
        opacity={0}
      />
    </points>
  );
}

/* ================= NEON TUBE TEXT ================= */
function NeonTubeText() {
  const textRef = useRef();
  const subtitleRef = useRef();
  const analyserRef = useRef(null);
  const colorRef = useRef(new THREE.Color("#ff2bdc"));

  /* Audio reactive */
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioCtx = new AudioContext();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 128;
      analyserRef.current = analyser;
    }).catch(() => {
      analyserRef.current = null;
    });
  }, []);

  useFrame((state) => {
    if (!textRef.current) return;

    /* Color cycling */
    const t = (Math.sin(state.clock.elapsedTime * 0.6) + 1) / 2;
    colorRef.current.lerpColors(
      new THREE.Color("#ff2bdc"),
      new THREE.Color("#7f5cff"),
      t
    );

    /* Sound reactive intensity */
    let audioBoost = 1;
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(data);
      audioBoost = 1 + data[10] / 255;
    }

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;

    textRef.current.material.emissive = colorRef.current;
    textRef.current.material.color = colorRef.current;
    textRef.current.material.emissiveIntensity = pulse * audioBoost * 2.2;

    /* Subtitle animation */
    if (subtitleRef.current) {
      subtitleRef.current.position.y =
        3.9 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      subtitleRef.current.material.opacity =
        0.7 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  return (
    <group>
      {/* Neon Name */}
      <Text
        ref={textRef}
        position={[0.5, 4.25, -2.78]}
        fontSize={0.42}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        Shreya Raj Gupta
        <meshStandardMaterial
          emissive="#ff2bdc"
          emissiveIntensity={2}
          roughness={0.3}
        />
      </Text>

      {/* Subtitle */}
      <Text
        ref={subtitleRef}
        position={[0.5, 3.9, -2.78]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
       
        <meshStandardMaterial transparent opacity={0.8} />
      </Text>

      {/* Hover Sparks */}
      <HoverSparks position={[0.5, 4.25, -2.75]} />
    </group>
  );
}

/* ================= ROOM ================= */
export function Room(props) {
  const { nodes } = useGLTF("/models/optimized-room.glb");
  const bloomRef = useRef();

  const certTextures = useTexture([
    "/images/certificates/cert1.jpg",
    "/images/certificates/cert2.png",
    "/images/certificates/cert3.png",
  ]);

  return (
    <group {...props} dispose={null}>
      {/* Neon Text */}
      <NeonTubeText />

      {/* Bloom */}
      <EffectComposer>
        <SelectiveBloom
          selection={bloomRef}
          intensity={2.5}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>

      {/* Certificates */}
      <group ref={bloomRef}>
        <WallCertificate texture={certTextures[0]} position={[-0.6, 3.4, -2.8]} />
        <WallCertificate texture={certTextures[1]} position={[0.5, 3.4, -2.8]} />
        <WallCertificate texture={certTextures[2]} position={[1.6, 3.4, -2.8]} />
      </group>

      {/* Accent Light */}
      <spotLight
        position={[0.5, 4.8, -1.8]}
        intensity={1.8}
        angle={0.3}
        penumbra={0.6}
      />

      {/* Room */}
      <primitive object={nodes.Scene} />
    </group>
  );
}

useGLTF.preload("/models/optimized-room.glb");
