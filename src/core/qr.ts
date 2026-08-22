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
            image: logoUrl,
            imageOptions: {
                imageSize: params.logoScale,
                hideBackgroundDots: true,
                margin: 2,
            },
            dotsOptions: { color: params.fillColor },
            backgroundOptions: { color: params.backColor },
            qrOptions: { errorCorrectionLevel: params.error },
        })
        return await qr.getRawData(params.format) as Blob
    } finally {
        if (logoUrl) URL.revokeObjectURL(logoUrl)
    }
}
