import { useEffect } from 'react'
import { iconToLogo } from '../lib/icons'
import type { Logo } from '../core/params'

export function useIconLogo(
    slug: string | undefined,
    onLogo?: (logo: Logo | undefined) => void,
) {
    useEffect(() => {
        if (!onLogo) return

        let cancelled = false
        iconToLogo(slug).then(logo => {
            if (!cancelled) onLogo(logo)
        })
        return () => { cancelled = true }
    }, [slug, onLogo])
}
