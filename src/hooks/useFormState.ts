import { useState } from 'react'

export function useFormState<T extends object>(initial: T) {
    const [values, setValues] = useState<T>(initial)

    const set = <K extends keyof T>(key: K, value: T[K]) =>
        setValues(prev => ({ ...prev, [key]: value }))

    return [values, set] as const
}
