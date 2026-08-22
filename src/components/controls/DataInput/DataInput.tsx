import { useState } from 'react'
import './DataInput.css'

interface DataInputProps {
    label?: string
    placeholder?: string
    onSubmit: (value: string) => void
}

export function DataInput({ label = 'Data', placeholder = 'Type URL and press Enter', onSubmit, }: DataInputProps) {
    const [draft, setDraft] = useState('')

    return (
        <form
            className="data-input"
            onSubmit={e => {
                e.preventDefault()
                onSubmit(draft)
            }}
        >
            <label className="data-input__label">
                <span>{label}</span>
                <input
                    className="data-input__input"
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder={placeholder}
                />
            </label>
        </form>
    )
}
