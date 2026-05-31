'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

function FloatingOrb() {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * 0.08
    ref.current.rotation.y = clock.elapsedTime * 0.12
  })

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 4]} />
        <MeshDistortMaterial
          color="#1B2745"
          attach="material"
          distort={0.42}
          speed={1.6}
          roughness={0.15}
          metalness={0.8}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

export function R3FScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#A8C2D8" />
        <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#B89D6A" />
        <pointLight position={[0, 0, 3]} intensity={0.4} color="#FFFFFF" />
        <FloatingOrb />
      </Canvas>
    </div>
  )
}
