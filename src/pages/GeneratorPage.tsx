import { createParams } from "../core/params"
import { render } from "../core/qr"
import { useEffect, useState } from "react"
import type { Params, UpdateParam } from "../core/params"
import './GeneratorPage.css'
import { Sidebar } from "../components/Sidebar/Sidebar"
import { Content } from "../components/Content/Content"
import { useObjectURL } from "../hooks/useObjectURL"

interface GeneratorPageProps {
    theme: 'light' | 'dark'
    toggleTheme: () => void
}

export function GeneratorPage({ theme, toggleTheme }: GeneratorPageProps) {
    const [blob, setBlob] = useState<Blob>()
    const [params, setParams] = useState<Params>(createParams(''))

    useEffect(
        () => {
            if (!params.data) return
            let cancelled = false
            render(params).then(blob => {if (!cancelled) setBlob(blob)})
            return () => { cancelled = true }
        }, [params]
    )

    const src = useObjectURL(blob)
    const commitData = (value: string) => setParams(prev => ({ ...prev, data: value }))
    
    const update: UpdateParam = (key, value) =>
        setParams(prev => ({ ...prev, [key]: value }))

    return (
        <div className="box">
            <Sidebar
                theme={theme}
                toggleTheme={toggleTheme}
                params={params}
                update={update}
                onSubmitData={commitData}
                src={src}
            />
            <Content src={src} hasData={!!params.data} />
        </div>
    )
}
