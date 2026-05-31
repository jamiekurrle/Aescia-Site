'use client'

import { useEffect, useRef, useState } from 'react'
import { liquidFragSource } from './liquid-frag'
import type { ShaderParams } from './params'

const vertexShaderSource = `#version 300 es
precision mediump float;

in vec2 a_position;
out vec2 vUv;

void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
}` as const

export function LiquidCanvas({
  imageData,
  params,
  className,
}: {
  imageData: ImageData
  params: ShaderParams
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null)
  const [uniforms, setUniforms] = useState<Record<string, WebGLUniformLocation>>({})
  const totalAnimationTime = useRef(0)
  const lastRenderTime = useRef(0)

  function updateUniforms() {
    if (!gl || !uniforms) return
    gl.uniform1f(uniforms.u_edge, params.edge)
    gl.uniform1f(uniforms.u_patternBlur, params.patternBlur)
    gl.uniform1f(uniforms.u_time, 0)
    gl.uniform1f(uniforms.u_patternScale, params.patternScale)
    gl.uniform1f(uniforms.u_refraction, params.refraction)
    gl.uniform1f(uniforms.u_liquid, params.liquid)
  }

  useEffect(() => {
    function initShader() {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('webgl2', {
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      })
      if (!canvas || !ctx) {
        console.warn('WebGL2 not available')
        return
      }

      function createShader(c: WebGL2RenderingContext, sourceCode: string, type: number) {
        const shader = c.createShader(type)
        if (!shader) return null
        c.shaderSource(shader, sourceCode)
        c.compileShader(shader)
        if (!c.getShaderParameter(shader, c.COMPILE_STATUS)) {
          console.error('shader compile error: ' + c.getShaderInfoLog(shader))
          c.deleteShader(shader)
          return null
        }
        return shader
      }

      const vs = createShader(ctx, vertexShaderSource, ctx.VERTEX_SHADER)
      const fs = createShader(ctx, liquidFragSource, ctx.FRAGMENT_SHADER)
      const program = ctx.createProgram()
      if (!program || !vs || !fs) return
      ctx.attachShader(program, vs)
      ctx.attachShader(program, fs)
      ctx.linkProgram(program)
      if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
        console.error('program link error: ' + ctx.getProgramInfoLog(program))
        return
      }

      const uni: Record<string, WebGLUniformLocation> = {}
      const uniformCount = ctx.getProgramParameter(program, ctx.ACTIVE_UNIFORMS)
      for (let i = 0; i < uniformCount; i++) {
        const name = ctx.getActiveUniform(program, i)?.name
        if (!name) continue
        uni[name] = ctx.getUniformLocation(program, name) as WebGLUniformLocation
      }
      setUniforms(uni)

      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
      const buffer = ctx.createBuffer()
      ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer)
      ctx.bufferData(ctx.ARRAY_BUFFER, vertices, ctx.STATIC_DRAW)
      ctx.useProgram(program)
      const posLoc = ctx.getAttribLocation(program, 'a_position')
      ctx.enableVertexAttribArray(posLoc)
      ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer)
      ctx.vertexAttribPointer(posLoc, 2, ctx.FLOAT, false, 0, 0)

      setGl(ctx)
    }

    initShader()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!gl || !uniforms) return
    updateUniforms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, params, uniforms])

  useEffect(() => {
    if (!gl || !uniforms) return
    let id: number
    function drawOnce(currentTime: number) {
      const delta = currentTime - lastRenderTime.current
      lastRenderTime.current = currentTime
      totalAnimationTime.current += delta * params.speed
      gl!.uniform1f(uniforms.u_time, totalAnimationTime.current)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
    }
    function render(currentTime: number) {
      drawOnce(currentTime)
      id = requestAnimationFrame(render)
    }
    lastRenderTime.current = performance.now()
    // Synchronous first frame so the canvas is non-blank even when the tab is
    // hidden (rAF doesn't fire in hidden tabs / preview captures).
    drawOnce(performance.now())
    id = requestAnimationFrame(render)
    return () => cancelAnimationFrame(id)
  }, [gl, uniforms, params.speed])

  useEffect(() => {
    const el = canvasRef.current
    if (!el || !gl || !uniforms) return
    function resize() {
      if (!el || !gl || !uniforms) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const cssW = el.clientWidth
      const cssH = el.clientHeight
      const w = Math.max(1, Math.round(cssW * dpr))
      const h = Math.max(1, Math.round(cssH * dpr))
      if (el.width !== w) el.width = w
      if (el.height !== h) el.height = h
      gl.viewport(0, 0, w, h)
      const imgRatio = imageData.width / imageData.height
      gl.uniform1f(uniforms.u_img_ratio, imgRatio)
      gl.uniform1f(uniforms.u_ratio, w / h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    window.addEventListener('resize', resize)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [gl, uniforms, imageData])

  useEffect(() => {
    if (!gl || !uniforms) return
    const existing = gl.getParameter(gl.TEXTURE_BINDING_2D)
    if (existing) gl.deleteTexture(existing)
    const tex = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
    try {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        imageData.width,
        imageData.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        imageData.data,
      )
      gl.uniform1i(uniforms.u_image_texture, 0)
      // Synchronous draw immediately after texture upload — the rAF loop in
      // the render useEffect may not have fired yet, and won't fire at all
      // when the tab is hidden (preview captures, background tabs).
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    } catch (e) {
      console.error('texture upload error:', e)
    }
    return () => {
      if (tex) gl.deleteTexture(tex)
    }
  }, [gl, uniforms, imageData])

  return <canvas ref={canvasRef} className={className ?? 'block h-full w-full object-contain'} />
}
