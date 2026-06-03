import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ── Gold Dust Particles ── */
function GoldParticles({ count = 1200 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { positions, speeds, phases } = useMemo(() => {
    const pos = []
    const spd = []
    const ph = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 1.5 + Math.random() * 5
      pos.push(
        Math.cos(theta) * r + (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6,
        Math.sin(theta) * r + (Math.random() - 0.5) * 4
      )
      spd.push(0.002 + Math.random() * 0.004)
      ph.push(Math.random() * Math.PI * 2)
    }
    return { positions: new Float32Array(pos), speeds: spd, phases: ph }
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      dummy.position.set(
        positions[ix] + Math.sin(t * speeds[i] + phases[i]) * 0.3,
        positions[ix + 1] + Math.cos(t * speeds[i] * 0.7 + phases[i]) * 0.4,
        positions[ix + 2] + Math.sin(t * speeds[i] * 0.5 + phases[i]) * 0.2
      )
      const scale = 0.015 + Math.sin(t * 1.2 + phases[i]) * 0.008
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial
        color="#c9a84c"
        emissive="#8b6914"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.9}
      />
    </instancedMesh>
  )
}

/* ── Luxury Orb ── */
function LuxuryOrb() {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08 + mouse.y * 0.15
      meshRef.current.rotation.y = t * 0.12 + mouse.x * 0.15
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -t * 0.05
      glowRef.current.rotation.y = -t * 0.07
    }
  })

  return (
    <group>
      {/* Core orb */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.9, 64, 64]} />
          <MeshDistortMaterial
            color="#1a1a2e"
            emissive="#c9a84c"
            emissiveIntensity={0.12}
            metalness={1}
            roughness={0.05}
            distort={0.25}
            speed={1.5}
          />
        </mesh>
      </Float>

      {/* Gold ring */}
      <mesh ref={glowRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.4, 0.018, 16, 120]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Outer thin ring */}
      <mesh rotation={[Math.PI / 3, 0.3, 0]}>
        <torusGeometry args={[1.9, 0.008, 8, 100]} />
        <meshStandardMaterial
          color="#e2c97e"
          emissive="#e2c97e"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  )
}

/* ── Camera Rig (mouse tracking) ── */
function CameraRig() {
  const { camera, mouse } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    target.current.x += (mouse.x * 0.8 - target.current.x) * 0.04
    target.current.y += (mouse.y * 0.3 - target.current.y) * 0.04
    camera.position.x = target.current.x
    camera.position.y = target.current.y + Math.sin(clock.getElapsedTime() * 0.3) * 0.15
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Light Rays ── */
function LightRays() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  const rays = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      length: 3 + Math.random() * 2,
      opacity: 0.03 + Math.random() * 0.04
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {rays.map((ray, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(ray.angle) * 2,
            0,
            Math.sin(ray.angle) * 2
          ]}
          rotation={[0, -ray.angle, 0]}
        >
          <cylinderGeometry args={[0.01, 0.3, ray.length, 8, 1, true]} />
          <meshBasicMaterial
            color="#c9a84c"
            transparent
            opacity={ray.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#c9a84c" />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#4a3000" />
      <directionalLight position={[0, 10, 5]} intensity={0.3} color="#fff8e7" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.2}
        color="#c9a84c"
        castShadow={false}
      />

      <Stars radius={60} depth={30} count={800} factor={2} saturation={0} fade speed={0.8} />
      <GoldParticles count={900} />
      <LuxuryOrb />
      <LightRays />
      <CameraRig />
    </Canvas>
  )
}
