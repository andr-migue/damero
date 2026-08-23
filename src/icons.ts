// Iconos SVG estáticos servidos desde public/icons/
// Marcas de skill-icons y simple-icons; genéricos de Lucide.

export function iconUrl(slug: string): string {
    return `${import.meta.env.BASE_URL}icons/${slug}.svg`
}

export async function fetchIconAsBlob(slug: string): Promise<Blob> {
    const res = await fetch(iconUrl(slug))
    if (!res.ok) throw new Error(`Icon "${slug}" not found`)
    return await res.blob()
}
