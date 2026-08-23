import { useCallback, useEffect, useState } from 'react'
import { createParams } from '../../core/params'
import type { Params, UpdateParam } from '../../core/params'
import { render } from '../../core/render'
import { useToast } from '../../app/providers/toast'
import { useObjectURL } from '../../hooks/useObjectURL'
import { ConfigPanel } from './ConfigPanel/ConfigPanel'
import { Preview } from './Preview/Preview'
import { renderErrorMessage } from './renderError'
import './GeneratorPage.css'

export function GeneratorPage() {
    const [params, setParams] = useState<Params>(createParams)
    const [blob, setBlob] = useState<Blob>()
    const [error, setError] = useState<string>()
    const { show } = useToast()

    useEffect(() => {
        if (!params.data) return

        let cancelled = false
        render(params)
            .then(result => {
                if (cancelled) return
                setBlob(result)
                setError(undefined)
            })
            .catch((cause: unknown) => {
                if (cancelled) return
                const message = renderErrorMessage(cause, params)
                setBlob(undefined)
                setError(message)
                show(message, 'error')
            })
        return () => { cancelled = true }
    }, [params, show])

    const src = useObjectURL(params.data ? blob : undefined)

    const update = useCallback<UpdateParam>((key, value) => {
        setParams(prev => ({ ...prev, [key]: value }))
    }, [])

    return (
        <main className="generator">
            <ConfigPanel params={params} update={update} />
            <Preview
                src={src}
                error={error}
                format={params.format}
                size={params.size}
                quietZone={params.margin}
            />
        </main>
    )
}
