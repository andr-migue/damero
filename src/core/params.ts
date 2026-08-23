import type {
    DotType,
    CornerDotType,
    CornerSquareType,
    ShapeType,
    FileExtension,
} from 'qr-code-styling'

export type ErrorCorrection = 'L' | 'M' | 'Q' | 'H'
export type Format = FileExtension
export type LogoKind = 'raster' | 'svg'

export interface Logo {
    source: Blob
    kind: LogoKind
}

export interface Params {
    data: string
    logo?: Logo
    logoScale: number
    logoMargin: number
    fillColor: string
    backColor: string
    useCustomCornerColors: boolean
    cornersSquareColor: string
    cornersDotColor: string
    size: number
    margin: number
    errorCorrection: ErrorCorrection
    version?: number
    format: Format
    dotsType: DotType
    cornersSquareType: CornerSquareType
    cornersDotType: CornerDotType
    shape: ShapeType
}

export const DEFAULTS = {
    logoScale: 0.3,
    logoMargin: 2,
    fillColor: '#000000',
    backColor: '#FFFFFF',
    useCustomCornerColors: false,
    cornersSquareColor: '#000000',
    cornersDotColor: '#000000',
    size: 2048,
    margin: 64,
    errorCorrection: 'H',
    format: 'png',
    dotsType: 'square',
    cornersSquareType: 'square',
    cornersDotType: 'square',
    shape: 'square',
} as const satisfies Omit<Params, 'data' | 'logo' | 'version'>

export function createParams(data = ''): Params {
    return { data, ...DEFAULTS }
}

export type UpdateParam = <K extends keyof Params>(key: K, value: Params[K]) => void
