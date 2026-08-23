import type { ReactNode, FormEvent } from 'react'
import './QRForm.css'

interface Props {
    children: ReactNode
    onSubmit: () => void
    disabled?: boolean
    submitLabel?: string
}

export function QRForm({ children, onSubmit, disabled, submitLabel = 'Generar QR' }: Props) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className="qr-form" onSubmit={handleSubmit}>
            {children}
            <button type="submit" className="qr-form__submit" disabled={disabled}>
                {submitLabel}
            </button>
        </form>
    )
}
