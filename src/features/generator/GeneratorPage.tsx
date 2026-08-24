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

type RenderState =
    | { status: 'idle' }
    | { status: 'ready', blob: Blob }
    | { status: 'failed', message: string }

export function GeneratorPage() {
    const [params, setParams] = useState<Params>(createParams)
    const [state, setState] = useState<RenderState>({ status: 'idle' })
    const { show } = useToast()

    useEffect(() => {
        if (!params.data) return

        let cancelled = false
        render(params)
            .then(blob => {
                if (!cancelled) setState({ status: 'ready', blob })
            })
            .catch((cause: unknown) => {
                if (cancelled) return
                const message = renderErrorMessage(cause, params)
                setState({ status: 'failed', message })
                show(message, 'error')
            })
        return () => { cancelled = true }
    }, [params, show])

    const live = params.data ? state : { status: 'idle' as const }
    const src = useObjectURL(live.status === 'ready' ? live.blob : undefined)

    const update = useCallback<UpdateParam>((key, value) => {
        setParams(prev => ({ ...prev, [key]: value }))
    }, [])

    return (
        <main className="generator">
            <ConfigPanel params={params} update={update} />
            <Preview
                src={src}
                error={live.status === 'failed' ? live.message : undefined}
                format={params.format}
                size={params.size}
                quietZone={params.margin}
            />
        </main>
    )
}
