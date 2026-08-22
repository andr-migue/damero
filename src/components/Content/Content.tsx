import './Content.css'
import { QRPreview } from '../QRPreview/QRPreview'

interface ContentProps {
    src: string | undefined
    hasData: boolean
}

export function Content({ src, hasData }: ContentProps) {
    return (
        <div className="content">
            <QRPreview src={src} hasData={hasData} />
        </div>
    )
}
