import type { Logo } from '../core/params'

export function iconUrl(slug: string): string {
    return `${import.meta.env.BASE_URL}icons/${slug}.svg`
}

export async function iconToLogo(slug: string | undefined): Promise<Logo | undefined> {
    if (!slug) return undefined
    try {
        const res = await fetch(iconUrl(slug))
        if (!res.ok) return undefined
        return { source: await res.blob(), kind: 'svg' }
    } catch {
        return undefined
    }
}
