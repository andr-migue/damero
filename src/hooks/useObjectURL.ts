import { useEffect, useMemo } from 'react'

export function useObjectURL(blob: Blob | undefined): string | undefined {
    const url = useMemo(() => blob && URL.createObjectURL(blob), [blob])

    useEffect(() => () => {
        if (url) URL.revokeObjectURL(url)
    }, [url])

    return url
}
