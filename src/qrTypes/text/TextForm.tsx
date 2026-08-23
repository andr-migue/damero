import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

export function TextForm({ onSerialize }: Props) {
    const [text, setText] = useState('')

    return (
        <QRForm onSubmit={() => onSerialize(text)} disabled={!text.trim()}>
            <label className="control">
                <span className="control__label">Text or URL</span>
                <input
                    className="control__input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="https://example.com or any text"
                />
            </label>
        </QRForm>
    )
}
