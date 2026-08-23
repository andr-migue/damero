import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

export function SmsForm({ onSerialize }: Props) {
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    const submit = () => {
        const trimmed = phone.trim()
        if (!trimmed) return
        const body = message ? `?body=${encodeURIComponent(message)}` : ''
        onSerialize(`sms:${trimmed}${body}`)
    }

    return (
        <QRForm onSubmit={submit} disabled={!phone.trim()}>
            <label className="control">
                <span className="control__label">Phone number</span>
                <input
                    className="control__input"
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                />
            </label>
            <label className="control">
                <span className="control__label">Message (optional)</span>
                <textarea
                    className="control__input"
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Message body"
                />
            </label>
        </QRForm>
    )
}
