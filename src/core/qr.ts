import QRCodeStyling from "qr-code-styling";
import type { Params } from "./params";

export async function renderSVG(params: Params): Promise<Blob> {
    const qr = new QRCodeStyling({
        width: params.size,
        height: params.size,
        data: params.data,
        margin: params.margin,
        dotsOptions: { color: params.fillColor },
        backgroundOptions: { color: params.backColor },
        qrOptions: { errorCorrectionLevel: params.error },
    })
    return qr.getRawData('svg')
}