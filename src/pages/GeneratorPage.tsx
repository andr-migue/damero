import { createParams } from "../core/params"
import { render } from "../core/qr"
import { useEffect, useState } from "react"
import './GeneratorPage.css'

export function GeneratorPage() {
    const [src, setSrc] = useState<string>()

    useEffect(
        () => {
            let url: string
            render(createParams('https://example.com')).then(blob => {
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