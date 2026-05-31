'use client'

/**
 * Animated gradient background, rendered directly in WebGL2.
 *
 * We initially tried @shadergradient/react@2.4.20 here, but it ships bundled
 * against R3F v8 + three v0.169 and silently fails to mount with our R3F v9 +
 * three v0.184 stack. We then tried a custom R3F v9 mesh — that compiled, but
 * R3F's ResizeObserver was not lifting the canvas off its default 300×150 size
 * inside an absolutely positioned parent. So this is the simplest robust path:
 * a plain canvas + raw WebGL2, identical pattern to the liquid-logo shader.
 */

import { useEffect, useRef } from 'react'

export type ShaderPreset = 'calm-light' | 'calm-ink' | 'demo'

const presets: Record<
  ShaderPreset,
  { c1: [number, number, number]; c2: [number, number, number]; c3: [number, number, number]; speed: number; scale: number; warp: number; brightness: number }
> = {
  'calm-light': {
    c1: [0.957, 0.965, 0.980], // Stone
    c2: [0.886, 0.918, 0.957], // Mist tint
    c3: [0.659, 0.761, 0.847], // Mist
    speed: 0.045,
    scale: 1.6,
    warp: 0.4,
    brightness: 1.0,
  },
  'calm-ink': {
    c1: [0.106, 0.153, 0.271], // Ink
    c2: [0.176, 0.227, 0.369], // Ink-70
    c3: [0.361, 0.478, 0.6],   // Mist-deep
    speed: 0.05,
    scale: 1.4,
    warp: 0.55,
    brightness: 0.96,
  },
  demo: {
    c1: [0.106, 0.153, 0.271],
    c2: [0.361, 0.478, 0.6],
    c3: [0.722, 0.616, 0.416],
    speed: 0.18,
    scale: 1.2,
    warp: 0.75,
    brightness: 1.05,
  },
}

const VERTEX = `#version 300 es
in vec2 a_position;
out vec2 vUv;
void main() {
  vUv = 0.5 * (a_position + 1.0);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const FRAGMENT = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec3  uC1;
uniform vec3  uC2;
uniform vec3  uC3;
uniform float uScale;
uniform float uWarp;
uniform float uBrightness;
uniform vec2  uResolution;

in vec2 vUv;
out vec4 fragColor;

vec3 mod289(vec3 x){return x - floor(x * (1./289.))*289.;}
vec2 mod289(vec2 x){return x - floor(x * (1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.);
  m = m*m; m = m*m;
  vec3 x = 2. * fract(p * C.www) - 1.;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130. * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Aspect-correct UV so the noise pattern doesn't squash on tall heroes.
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 uv = vUv * aspect;
  float t = uTime;

  vec2 warp = vec2(
    fbm(uv * uScale + vec2(0.0, t)),
    fbm(uv * uScale + vec2(t, 0.0))
  ) * uWarp;

  vec2 q = uv + warp;
  float n = 0.5 + 0.5 * fbm(q * 1.4 + t * 0.6);

  vec3 col = mix(uC1, uC2, smoothstep(0.05, 0.65, n + (vUv.y - 0.5) * 0.8));
  col = mix(col, uC3, smoothstep(0.55, 0.95, n * 0.7 + vUv.x * 0.5));

  col *= uBrightness;

  // Subtle paper grain
  float grain = (fract(sin(dot(vUv * uResolution, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
  col += grain;

  fragColor = vec4(col, 1.0);
}`

export function ShaderBg({
  preset = 'calm-ink',
  className,
  style,
}: {
  preset?: ShaderPreset
  className?: string
  style?: React.CSSProperties
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: true,
    })
    if (!gl) {
      // Fall back to a static CSS background if WebGL2 isn't available.
      const p = presets[preset]
      const c = (rgb: [number, number, number]) => `rgb(${rgb.map((v) => Math.round(v * 255)).join(',')})`
      canvas.style.background = `linear-gradient(135deg, ${c(p.c1)}, ${c(p.c2)} 50%, ${c(p.c3)})`
      return
    }

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.warn('ShaderBg shader compile error:', gl!.getShaderInfoLog(s))
        return null
      }
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('ShaderBg program link error:', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uC1: gl.getUniformLocation(program, 'uC1'),
      uC2: gl.getUniformLocation(program, 'uC2'),
      uC3: gl.getUniformLocation(program, 'uC3'),
      uScale: gl.getUniformLocation(program, 'uScale'),
      uWarp: gl.getUniformLocation(program, 'uWarp'),
      uBrightness: gl.getUniformLocation(program, 'uBrightness'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
    }

    const p = presets[preset]
    gl.uniform3fv(uniforms.uC1, p.c1)
    gl.uniform3fv(uniforms.uC2, p.c2)
    gl.uniform3fv(uniforms.uC3, p.c3)
    gl.uniform1f(uniforms.uScale, p.scale)
    gl.uniform1f(uniforms.uWarp, p.warp)
    gl.uniform1f(uniforms.uBrightness, p.brightness)

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl!.viewport(0, 0, canvas.width, canvas.height)
      gl!.uniform2f(uniforms.uResolution, canvas.width, canvas.height)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('resize', resize)

    const start = performance.now()
    function drawFrame() {
      const elapsed = (performance.now() - start) / 1000
      gl!.uniform1f(uniforms.uTime, elapsed * p.speed)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    }
    function loop() {
      drawFrame()
      rafRef.current = requestAnimationFrame(loop)
    }
    // Always draw at least one frame synchronously — rAF doesn't fire in
    // hidden tabs / preview captures, which would otherwise leave the canvas
    // black even though setup succeeded.
    drawFrame()
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('resize', resize)
      gl.deleteProgram(program)
      gl.deleteBuffer(buf)
    }
  }, [preset])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        ...style,
      }}
      aria-hidden="true"
    />
  )
}
