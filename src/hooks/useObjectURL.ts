import { useState, useEffect } from "react";

export function useObjectURL(blob: Blob | undefined): string | undefined {
    const [url, setUrl] = useState<string>()

    useEffect(
        () => {
            if (!blob) {
                setUrl(undefined)
                return
            }
            const u = URL.createObjectURL(blob)
            setUrl(u)
            return () => URL.revokeObjectURL(u)
        }, [blob]
    )
    return url
}