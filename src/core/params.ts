type ErrorCorrection = 'L' | 'M' | 'Q' | 'H'
type LogoKind = 'raster' | 'svg'

type Logo = {
    source: Blob
    kind: LogoKind
}

export type Params = {
    data: string
    logo?: Logo
    logoScale: number
    fillColor: string
    backColor: string
    size: number
    margin: number
    error: ErrorCorrection
    version?: number
    format: string
}

export const DEFAULTS = {
  logoScale: 0.3,
  fillColor: '#000000',
  backColor: '#FFFFFF',
  size: 512,
  margin: 32,
  error: 'H',
  format: 'png'
} as const

export function createParams(data: string): Params {
    return {
        data,
        ...DEFAULTS
    }
}

export type UpdateParam = <K extends keyof Params>(key: K, value: Params[K]) => void