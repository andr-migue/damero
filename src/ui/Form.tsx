import type { ReactNode } from 'react'

interface FormProps {
    children: ReactNode
    onSubmit: () => void
    disabled?: boolean
    submitLabel?: string
}

export function Form({ children, onSubmit, disabled, submitLabel = 'Generate QR' }: FormProps) {
    return (
        <form
            className="form"
            onSubmit={e => {
                e.preventDefault()
                onSubmit()
            }}
        >
            {children}
            <button type="submit" className="form__submit" disabled={disabled}>
                {submitLabel}
            </button>
        </form>
    )
}

export function FormRow({ children }: { children: ReactNode }) {
    return <div className="form__row">{children}</div>
}
