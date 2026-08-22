import QRCodeStyling from "qr-code-styling"
import type { Params } from "./params"

export async function render(params: Params): Promise<Blob> {
    const logoUrl = params.logo ? URL.createObjectURL(params.logo.source) : undefined

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
                margin: params.imageMargin,
            },
            dotsOptions: {
                color: params.fillColor,
                type: params.dotsType,
            },
            cornersSquareOptions: {
                color: params.cornersSquareColor,
                type: params.cornersSquareType,
            },
            cornersDotOptions: {
                color: params.cornersDotColor,
                type: params.cornersDotType,
            },
            backgroundOptions: { color: params.backColor },
            qrOptions: {
                errorCorrectionLevel: params.error,
                ...(params.version !== undefined && { typeNumber: params.version as never }),
            },
        })
        return await qr.getRawData(params.format) as Blob
    } finally {
        if (logoUrl) URL.revokeObjectURL(logoUrl)
    }
}
