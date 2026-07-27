import { createParams } from "../core/params"
import { renderSVG } from "../core/qr"
import { useEffect, useState } from "react"

export function GeneratorPage() {
    const [src, setSrc] = useState<string>()

    useEffect(
        () => {
            let url: string
            renderSVG(createParams('https://example.com')).then(blob => {
                url = URL.createObjectURL(blob)
                setSrc(url)
            })
            return () => {
                if (url) URL.revokeObjectURL(url)
            }
        },
        []
    )

    return src ? <img src={src} alt="qr" /> : <p>generando…</p>
}