import './QRPreview.css'

interface QRPreviewProps {
    src: string | undefined
    hasData: boolean
}

export function QRPreview({ src, hasData }: QRPreviewProps) {
    if (!hasData || !src) {
        return <p className="qr-preview__placeholder">Type something to generate a QR Code.</p>
    }
    return <img className="qr-preview__img" src={src} alt="qr" />
}
