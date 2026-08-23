import type { Format } from '../../../core/params'
import './Preview.css'

interface PreviewProps {
    src: string | undefined
    format: Format
}

export function Preview({ src, format }: PreviewProps) {
    return (
        <aside className="preview">
            <div className="preview__inner">
                {src ? (
                    <>
                        <img className="preview__image" src={src} alt="Generated QR code" />
                        <a className="preview__download" href={src} download={`qr.${format}`}>
                            Download {format.toUpperCase()}
                        </a>
                    </>
                ) : (
                    <p className="preview__empty">
                        Fill a form and generate your QR code.
                    </p>
                )}
            </div>
        </aside>
    )
}
