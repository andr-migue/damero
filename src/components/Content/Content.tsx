import './Content.css'

interface ContentProps {
    src: string | undefined
    hasData: boolean
}

export function Content({ src, hasData }: ContentProps) {
    return (
        <div className="content">
            {hasData && src
                ? <img src={src} alt="qr" />
                : <p>Type something to generate a QR Code.</p>}
        </div>
    )
}
