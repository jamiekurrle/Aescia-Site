'use client'

/**
 * Care-orbit visual rendered with vanilla three.js (no React Three Fiber).
 *
 * Concept: the 30-day post-discharge window as a slowly rotating wireframe
 * ring. Seven faint patient nodes hold a steady band; one node — "Patient D"
 * — dips below the ring around day 11 and is highlighted in brass. Identical
 * subject to the existing SVG cohort diagram, just in three dimensions.
 *
 * Built directly on three.js rather than R3F because R3F v9's ResizeObserver
 * does not reliably lift the canvas off its default 300×150 size in our hero
 * layout (and in any background / hidden tab). A raw three.Renderer with our
 * own ResizeObserver and synchronous first frame avoids both problems.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const INK = 0xE2E6EE
const INK_DEEP = 0xC7D3E5
const BRASS = 0xB89D6A
const STONE = 0xF4F6FA

const RING_RADIUS = 1.65
const NODE_COUNT = 8
const HI_INDEX = 3
const DIP_OFFSET = 0.22

function buildRingGeometry(scale: number) {
  const points: THREE.Vector3[] = []
  const steps = 96
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(t) * RING_RADIUS * scale, 0, Math.sin(t) * RING_RADIUS * scale))
  }
  return new THREE.BufferGeometry().setFromPoints(points)
}

export function CareOrbit({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 1.6, 4.3)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.45))
    const keyLight = new THREE.DirectionalLight(STONE, 0.6)
    keyLight.position.set(3, 4, 2)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(BRASS, 0.25)
    rimLight.position.set(-3, -2, -2)
    scene.add(rimLight)

    // Root rotating group
    const root = new THREE.Group()
    scene.add(root)

    // Three concentric rings
    const ringMain = new THREE.Line(
      buildRingGeometry(1.0),
      new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.32 }),
    )
    const ringInner = new THREE.Line(
      buildRingGeometry(0.78),
      new THREE.LineBasicMaterial({ color: INK_DEEP, transparent: true, opacity: 0.18 }),
    )
    const ringOuter = new THREE.Line(
      buildRingGeometry(1.18),
      new THREE.LineBasicMaterial({ color: INK_DEEP, transparent: true, opacity: 0.12 }),
    )
    root.add(ringMain, ringInner, ringOuter)

    // Patient nodes
    const nodes: { mesh: THREE.Mesh; hi: boolean }[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const a = (i / NODE_COUNT) * Math.PI * 2
      const x = Math.cos(a) * RING_RADIUS
      const z = Math.sin(a) * RING_RADIUS
      const hi = i === HI_INDEX
      const y = hi ? -DIP_OFFSET : 0

      const geom = new THREE.SphereGeometry(hi ? 0.075 : 0.045, 24, 24)
      const mat = new THREE.MeshStandardMaterial({
        color: hi ? BRASS : STONE,
        emissive: hi ? BRASS : STONE,
        emissiveIntensity: hi ? 0.6 : 0.18,
        metalness: 0.3,
        roughness: 0.5,
      })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.set(x, y, z)
      root.add(mesh)
      nodes.push({ mesh, hi })

      if (hi) {
        // Soft halo around the highlighted node
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(0.16, 24, 24),
          new THREE.MeshBasicMaterial({ color: BRASS, transparent: true, opacity: 0.18 }),
        )
        halo.position.set(x, y, z)
        root.add(halo)

        // Vertical drop line from ring plane to dipped node
        const lineGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, 0, z),
          new THREE.Vector3(x, -DIP_OFFSET, z),
        ])
        const lineMat = new THREE.LineBasicMaterial({ color: BRASS, transparent: true, opacity: 0.6 })
        root.add(new THREE.Line(lineGeom, lineMat))
      }
    }

    function resize() {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h, false)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    window.addEventListener('resize', resize)

    const start = performance.now()
    function drawFrame() {
      const elapsed = (performance.now() - start) / 1000
      root.rotation.y = elapsed * 0.05
      root.rotation.x = Math.sin(elapsed * 0.08) * 0.04 + 0.32
      renderer.render(scene, camera)
    }
    function loop() {
      drawFrame()
      rafRef.current = requestAnimationFrame(loop)
    }
    // Synchronous first frame — rAF doesn't fire in hidden tabs.
    drawFrame()
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('resize', resize)
      renderer.dispose()
      if (canvas.parentElement === container) container.removeChild(canvas)
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose()
          const m = (obj as THREE.Mesh).material
          if (Array.isArray(m)) m.forEach((x) => x.dispose())
          else m?.dispose()
        }
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      aria-hidden="true"
    />
  )
}
