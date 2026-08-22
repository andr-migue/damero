import type {
    DotType,
    CornerDotType,
    CornerSquareType,
    ShapeType,
} from 'qr-code-styling'

type ErrorCorrection = 'L' | 'M' | 'Q' | 'H'
export type LogoKind = 'raster' | 'svg'

export type Logo = {
    source: Blob
    kind: LogoKind
}

export type Params = {
    data: string
    logo?: Logo
    logoScale: number
    imageMargin: number
    fillColor: string
    backColor: string
    cornersSquareColor: string
    cornersDotColor: string
    size: number
    margin: number
    error: ErrorCorrection
    version?: number
    format: string
    dotsType: DotType
    cornersSquareType: CornerSquareType
    cornersDotType: CornerDotType
    shape: ShapeType
}

export const DEFAULTS = {
    logoScale: 0.3,
    imageMargin: 2,
    fillColor: '#000000',
    backColor: '#FFFFFF',
    cornersSquareColor: '#000000',
    cornersDotColor: '#000000',
    size: 2048,
    margin: 64,
    error: 'H',
    format: 'png',
    dotsType: 'square',
    cornersSquareType: 'square',
    cornersDotType: 'square',
    shape: 'square',
} as const

export function createParams(data: string): Params {
    return {
        data,
        ...DEFAULTS,
    }
}

export type UpdateParam = <K extends keyof Params>(key: K, value: Params[K]) => void

export const DOT_TYPES = [
    'square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded',
] as const satisfies readonly DotType[]

export const CORNERS_SQUARE_TYPES = [
    'square', 'dot', 'extra-rounded', 'dots', 'rounded', 'classy', 'classy-rounded',
] as const satisfies readonly CornerSquareType[]

export const CORNERS_DOT_TYPES = [
    'square', 'dot', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded',
] as const satisfies readonly CornerDotType[]

export const SHAPE_TYPES = ['square', 'circle'] as const satisfies readonly ShapeType[]
