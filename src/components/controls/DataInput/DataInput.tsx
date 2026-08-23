import { useState } from 'react'

interface DataInputProps {
    label?: string
    placeholder?: string
    onSubmit: (value: string) => void
}

export function DataInput({
    label = 'Data',
    placeholder = 'Type URL and press Enter',
    onSubmit,
}: DataInputProps) {
    const [draft, setDraft] = useState('')

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                onSubmit(draft)
            }}
        >
            <label className="control">
                <span className="control__label">{label}</span>
                <input
                    className="control__input"
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder={placeholder}
                />
            </label>
        </form>
    )
}
