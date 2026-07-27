import { createParams } from "../core/params"
import { render } from "../core/qr"
import { useEffect, useState } from "react"
import type { Params } from "../core/params"
import './GeneratorPage.css'

export function GeneratorPage() {
    const [src, setSrc] = useState<string>()
    const [params, setParams] = useState<Params>(createParams(''))
    const [draft, setDraft] = useState('')

    useEffect(
        () => {
            if (!params.data) return

            let url: string | undefined

            render(params).then(blob => {
                url = URL.createObjectURL(blob)
                setSrc(url)
            })

            return () => {
                if (url) URL.revokeObjectURL(url)
            }
        },
        [params]
    )

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                setParams({ ...params, data: draft })
            }}>
                <input
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Type URL and press Enter"
                />
            </form>
            {params.data && src
                ? <img src={src} alt="qr" />
                : <p>Type something to generate a QR Code.</p>}
        </div>
    )
}
