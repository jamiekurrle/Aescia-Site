export type ShaderParams = {
  patternScale: number
  refraction: number
  edge: number
  patternBlur: number
  liquid: number
  speed: number
}

export const defaultParams: ShaderParams = {
  patternScale: 2,
  refraction: 0.015,
  edge: 0.4,
  patternBlur: 0.005,
  liquid: 0.07,
  speed: 0.3,
}
