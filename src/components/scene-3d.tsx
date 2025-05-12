"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Environment,
  Float,
  MeshDistortMaterial,
  GradientTexture,
  Text3D,
  OrbitControls,
  Sparkles,
} from "@react-three/drei"
import { Vector3, MathUtils } from "three"
import { motion } from "framer-motion-3d"

// Hexagonal grid component
function HexGrid({ count = 40, radius = 10 }) {
  const hexagons = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * radius
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r
      const y = (Math.random() - 0.5) * 5
      const scale = Math.random() * 0.5 + 0.5
      const rotationY = Math.random() * Math.PI
      temp.push({ position: [x, y, z], scale, rotationY })
    }
    return temp
  }, [count, radius])

  return (
    <group>
      {hexagons.map((props, i) => (
        <Hexagon key={i} {...props} />
      ))}
    </group>
  )
}

// Individual hexagon with animation
function Hexagon({ position, scale, rotationY }) {
  const ref = useRef()
  const initialY = position[1]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.y = initialY + Math.sin(t + initialY * 1000) * 0.3
    ref.current.rotation.y = rotationY + t * 0.1
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <cylinderGeometry args={[1, 1, 0.2, 6]} />
      <MeshDistortMaterial
        color="#ff6b00"
        emissive="#ff6b00"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
        distort={0.2}
        speed={2}
        metalness={1}
        roughness={0.2}
      />
    </mesh>
  )
}

// Fox logo in 3D
function FoxLogo() {
  const group = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t * 0.5) * 0.2
    group.current.position.y = Math.sin(t * 0.5) * 0.1
  })

  return (
    <motion.group
      ref={group}
      initial={{ scale: 0, rotateY: 0 }}
      animate={{ scale: 1, rotateY: Math.PI * 2 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Main fox head */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial>
          <GradientTexture stops={[0, 1]} colors={["#ff6b00", "#ff9500"]} size={1024} />
        </meshStandardMaterial>
      </mesh>

      {/* Fox ears */}
      <mesh position={[-0.7, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <tetrahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#ff6b00" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <tetrahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#ff6b00" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Fox eyes */}
      <mesh position={[-0.4, 0.2, 0.9]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0.4, 0.2, 0.9]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Fox snout */}
      <mesh position={[0, -0.1, 1]} rotation={[Math.PI / 4, 0, 0]}>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshStandardMaterial color="#ff7b00" />
      </mesh>

      {/* Fox tail */}
      <mesh position={[0, -1, -1]} rotation={[0.5, 0, 0]}>
        <coneGeometry args={[0.3, 1.5, 8]} />
        <meshStandardMaterial color="#ff6b00" metalness={0.5} roughness={0.2} />
      </mesh>
    </motion.group>
  )
}

// Floating text component
function FloatingText() {
  const textRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    textRef.current.position.y = Math.sin(t * 0.5) * 0.2
    textRef.current.rotation.y = Math.sin(t * 0.2) * 0.1
  })

  return (
    <group ref={textRef} position={[0, 2.5, 0]}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        GrantFox
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff6b00"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </group>
  )
}

// Energy flow lines
function EnergyFlows() {
  const linesCount = 50
  const lines = useMemo(() => {
    return Array.from({ length: linesCount }).map(() => {
      const radius = 15
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 10
      const targetX = (Math.random() - 0.5) * 5
      const targetY = (Math.random() - 0.5) * 5
      const targetZ = (Math.random() - 0.5) * 5
      const speed = Math.random() * 0.05 + 0.02
      return { position: [x, y, z], target: [targetX, targetY, targetZ], speed }
    })
  }, [linesCount])

  return (
    <group>
      {lines.map((line, i) => (
        <EnergyLine key={i} {...line} />
      ))}
    </group>
  )
}

// Individual energy line
function EnergyLine({ position, target, speed }) {
  const lineRef = useRef()
  const pos = useRef(new Vector3(...position))
  const targetPos = useRef(new Vector3(...target))

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Move toward target
    pos.current.lerp(targetPos.current, speed)

    // When close to target, get a new target
    if (pos.current.distanceTo(targetPos.current) < 0.5) {
      targetPos.current.set((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5)
    }

    // Update position
    lineRef.current.position.copy(pos.current)

    // Look at target
    lineRef.current.lookAt(targetPos.current)

    // Pulse scale
    const scale = 1 + Math.sin(t * 2 + Math.random() * 10) * 0.2
    lineRef.current.scale.set(scale, scale, MathUtils.clamp(pos.current.distanceTo(targetPos.current) * 0.5, 0.1, 10))
  })

  return (
    <mesh ref={lineRef} position={position}>
      <boxGeometry args={[0.05, 0.05, 1]} />
      <meshBasicMaterial color="#ff6b00" transparent opacity={0.6} />
    </mesh>
  )
}

// Particles system
function ParticleField() {
  return <Sparkles count={200} scale={15} size={2} speed={0.3} color="#ff6b00" opacity={0.5} />
}

// Main 3D scene
export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffbb73" />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#ff6b00" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <FoxLogo />
      </Float>

      <FloatingText />
      <HexGrid />
      <EnergyFlows />
      <ParticleField />

      <Environment preset="night" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}
