import type { ReactNode } from 'react'

interface FieldProps {
    label: string
    hint?: ReactNode
    disabled?: boolean
    children: ReactNode
}

export function Field({ label, hint, disabled, children }: FieldProps) {
    return (
        <label className={`field${disabled ? ' is-disabled' : ''}`}>
            <span className="field__label">
                {label}
                {hint !== undefined && <span className="field__hint">{hint}</span>}
            </span>
            {children}
        </label>
    )
}
