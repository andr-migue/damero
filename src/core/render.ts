import QRCodeStyling from 'qr-code-styling'
import type { TypeNumber } from 'qr-code-styling'
import type { Params } from './params'

export type RenderFailure = 'capacity' | 'empty' | 'unknown'

export interface Capacity {
    needed: number
    available: number
}

export class RenderError extends Error {
    readonly reason: RenderFailure
    readonly capacity?: Capacity

    constructor(reason: RenderFailure, capacity?: Capacity, options?: ErrorOptions) {
        super(`QR render failed: ${reason}`, options)
        this.name = 'RenderError'
        this.reason = reason
        this.capacity = capacity
    }
}

function classify(cause: unknown): RenderError {
    if (cause instanceof RenderError) return cause

    const message = cause instanceof Error ? cause.message : String(cause)
    const overflow = /overflow\.?\s*\((\d+)>(\d+)\)/.exec(message)

    if (overflow) {
        return new RenderError(
            'capacity',
            { needed: Number(overflow[1]), available: Number(overflow[2]) },
            { cause },
        )
    }
    return new RenderError(message.includes('overflow') ? 'capacity' : 'unknown', undefined, { cause })
}

export async function render(params: Params): Promise<Blob> {
    const logoUrl = params.logo && URL.createObjectURL(params.logo.source)

    try {
        const qr = new QRCodeStyling({
            width: params.size,
            height: params.size,
            data: params.data,
            margin: params.margin,
            shape: params.shape,
            image: logoUrl,
            imageOptions: {
                imageSize: params.logoScale,
                hideBackgroundDots: true,
                margin: params.logoMargin,
            },
            dotsOptions: {
                color: params.fillColor,
                type: params.dotsType,
            },
            cornersSquareOptions: {
                color: params.useCustomCornerColors ? params.cornersSquareColor : params.fillColor,
                type: params.cornersSquareType,
            },
            cornersDotOptions: {
                color: params.useCustomCornerColors ? params.cornersDotColor : params.fillColor,
                type: params.cornersDotType,
            },
            backgroundOptions: { color: params.backColor },
            qrOptions: {
                errorCorrectionLevel: params.errorCorrection,
                ...(params.version !== undefined && { typeNumber: params.version as TypeNumber }),
            },
        })

        const data = await qr.getRawData(params.format)
        if (!data) throw new RenderError('empty')
        return data as Blob
    } catch (cause) {
        throw classify(cause)
    } finally {
        if (logoUrl) URL.revokeObjectURL(logoUrl)
    }
}
