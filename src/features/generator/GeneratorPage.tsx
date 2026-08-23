import { useCallback, useEffect, useState } from 'react'
import { createParams } from '../../core/params'
import type { Params, UpdateParam } from '../../core/params'
import { render } from '../../core/render'
import { useObjectURL } from '../../hooks/useObjectURL'
import { ConfigPanel } from './ConfigPanel/ConfigPanel'
import { Preview } from './Preview/Preview'
import './GeneratorPage.css'

export function GeneratorPage() {
    const [params, setParams] = useState<Params>(createParams)
    const [blob, setBlob] = useState<Blob>()

    useEffect(() => {
        if (!params.data) return

        let cancelled = false
        render(params).then(result => {
            if (!cancelled) setBlob(result)
        })
        return () => { cancelled = true }
    }, [params])

    const src = useObjectURL(params.data ? blob : undefined)

    const update = useCallback<UpdateParam>((key, value) => {
        setParams(prev => ({ ...prev, [key]: value }))
    }, [])

    return (
        <main className="generator">
            <ConfigPanel params={params} update={update} />
            <Preview
                src={src}
                format={params.format}
                size={params.size}
                quietZone={params.margin}
            />
        </main>
    )
}
