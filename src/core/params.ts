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
    border: number
    error: ErrorCorrection
    version?: number
}

const DEFAULTS = {
  logoScale: 0.3,
  fillColor: '#000000',
  backColor: '#FFFFFF',
  size: 10,
  border: 4,
  error: 'H',
} as const

export function createParams(data: string): Params {
    return {
        data,
        ...DEFAULTS
    }
}