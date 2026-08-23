import type { CSSProperties } from 'react'
import type { Format } from '../../../core/params'
import './Preview.css'

interface PreviewProps {
    src: string | undefined
    format: Format
    size: number
    quietZone: number
}

export function Preview({ src, format, size, quietZone }: PreviewProps) {
    const markLength = `max(16px, ${(quietZone / size) * 100}%)`

    return (
        <aside className="preview">
            <div className="preview__inner">
                {src ? (
                    <>
                        <figure
                            className="preview__frame"
                            style={{ '--mark': markLength } as CSSProperties}
                        >
                            <img className="preview__image" src={src} alt="Generated QR code" />
                        </figure>
                        <a className="preview__download" href={src} download={`qr.${format}`}>
                            Download {format.toUpperCase()}
                        </a>
                    </>
                ) : (
                    <p className="preview__empty">No code yet. Fill a form to generate one.</p>
                )}
            </div>
        </aside>
    )
}
