import './Content.css'
import type { Params } from '../../core/params'
import { QRPreview } from '../QRPreview/QRPreview'

interface ContentProps {
    src: string | undefined
    hasData: boolean
    format: Params['format']
}

export function Content({ src, hasData, format }: ContentProps) {
    return (
        <aside className="content" style={{ gridArea: 'preview' }}>
            <div className="content__inner">
                <QRPreview src={src} hasData={hasData} />
                {src && hasData && (
                    <a
                        className="content__download"
                        href={src}
                        download={`qr.${format}`}
                    >
                        Download {format.toUpperCase()}
                    </a>
                )}
            </div>
        </aside>
    )
}
