import { useEffect, useRef } from 'react'
import { useToast } from '../../app/providers/toast'
import type { Params } from '../../core/params'

export function useLogoWarning({ logo, errorCorrection }: Params) {
    const { show } = useToast()
    const signature = useRef<string>('')

    useEffect(() => {
        const current = `${logo ? 'logo' : 'none'}:${errorCorrection}`
        const changed = signature.current !== current
        signature.current = current

        if (changed && logo && errorCorrection !== 'H') {
            show('A logo covers modules. Level H is recommended.', 'warning')
        }
    }, [logo, errorCorrection, show])
}
