'use client'

/**
 * Vanilla WebGL fragment-shader backdrop for the hero.
 *
 * Renders a slow, FBM-noise-displaced gradient field in Aescia's palette
 * (Deep Pine ground, Teal + Brass highlights) onto a fullscreen quad.
 * A soft hot-spot follows the cursor, giving the impression of an
 * ambient observation field that responds to presence.
 *
 * Deliberately not a Three.js scene. Single quad, single fragment
 * shader, about 3 KB of GLSL. Zero dependencies. Reduced-motion users
 * get a static final frame (no RAF loop).
 */

import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse; // 0..1
uniform float u_reduced; // 0 or 1

// ----- noise -----
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p *= 2.05;
    a *= 0.52;
  }
  return v;
}

// ----- palette -----
vec3 pine  = vec3(0.043, 0.122, 0.165);  // #0B1F2A Deep Pine
vec3 teal  = vec3(0.184, 0.420, 0.365);  // #2F6B5D Clinical Teal
vec3 brass = vec3(0.788, 0.651, 0.420);  // #C9A66B Aged Brass
vec3 bone  = vec3(0.969, 0.957, 0.933);  // #F7F4EE Bone

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p  = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;

  float t = mix(u_time * 0.04, 0.6, u_reduced);

  // Slow domain warp
  vec2 q;
  q.x = fbm(p * 0.8 + vec2(0.0, t));
  q.y = fbm(p * 0.8 + vec2(5.2 + t, 1.3));
  vec2 r;
  r.x = fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * 0.35);
  r.y = fbm(p + 2.4 * q + vec2(8.3, 2.8) + t * 0.28);
  float f = fbm(p + 1.8 * r);
  f = 0.5 + 0.5 * f;

  // Cursor hot-spot (aspect corrected)
  vec2 mp = u_mouse * 2.0 - 1.0;
  mp.x *= u_res.x / u_res.y;
  float d = length(p - mp);
  float hot = exp(-d * 2.1) * mix(0.55, 0.0, u_reduced);

  // Base gradient: pine at bottom/edges, fading into teal-rich middle
  float verticalMix = smoothstep(-1.0, 1.0, p.y + r.y * 0.4);
  vec3 col = pine;
  col = mix(col, mix(pine, teal, 0.35), f);
  col = mix(col, teal * 0.75 + pine * 0.25, smoothstep(0.45, 0.85, f));

  // Brass streaks where f is high and q varies
  float streak = smoothstep(0.72, 0.92, f) * smoothstep(0.15, 0.55, abs(q.x));
  col = mix(col, brass * 0.72 + col * 0.28, streak * 0.35);

  // Cursor-driven lift
  col += mix(teal, brass, 0.6) * hot * 0.45;
  col += bone * hot * hot * 0.12;

  // Subtle vertical film (like old film base tone)
  col *= mix(0.85, 1.05, smoothstep(-1.0, 1.0, p.y));

  // Grain for warmth
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.012;

  // Vignette
  float vig = smoothstep(1.4, 0.2, length(p));
  col *= mix(0.55, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

export function HeroShaderBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, alpha: false }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const reducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Shader compile helpers
    function compile(src: string, type: number): WebGLShader | null {
      const s = gl!.createShader(type)
      if (!s) return null
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error('[HeroShaderBg] shader error', gl!.getShaderInfoLog(s))
        gl!.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compile(VERT, gl.VERTEX_SHADER)
    const fs = compile(FRAG, gl.FRAGMENT_SHADER)
    if (!vs || !fs) return

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[HeroShaderBg] link error', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    // Fullscreen quad (triangle strip 2 tris)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uReduced = gl.getUniformLocation(prog, 'u_reduced')
    gl.uniform1f(uReduced, reducedMotion ? 1 : 0)

    let mx = 0.5
    let my = 0.45
    let smx = mx
    let smy = my

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const pw = Math.max(1, Math.floor(w * dpr))
      const ph = Math.max(1, Math.floor(h * dpr))
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw
        canvas.height = ph
      }
      gl!.viewport(0, 0, pw, ph)
      gl!.uniform2f(uRes, pw, ph)
    }

    function onMouse(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mx = (e.clientX - rect.left) / rect.width
      my = 1 - (e.clientY - rect.top) / rect.height
    }
    function onLeave() {
      mx = 0.5
      my = 0.45
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const start = performance.now()
    let frame = 0

    function render(now: number) {
      if (!gl) return
      // Smooth mouse
      smx += (mx - smx) * 0.06
      smy += (my - smy) * 0.06
      gl.uniform2f(uMouse, smx, smy)
      gl.uniform1f(uTime, (now - start) * 0.001)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (!reducedMotion) {
        frame = requestAnimationFrame(render)
      }
    }

    if (reducedMotion) {
      // Single paint
      gl.uniform2f(uMouse, 0.5, 0.45)
      gl.uniform1f(uTime, 0.0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    } else {
      frame = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseleave', onLeave)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full block"
      style={{ display: 'block' }}
    />
  )
}
