import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

export function EmailForm({ onSerialize }: Props) {
    const [to, setTo] = useState('')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')

    const submit = () => {
        const trimmed = to.trim()
        if (!trimmed) return
        const params = new URLSearchParams()
        if (subject) params.set('subject', subject)
        if (body) params.set('body', body)
        const qs = params.toString()
        onSerialize(`mailto:${trimmed}${qs ? `?${qs}` : ''}`)
    }

    return (
        <QRForm onSubmit={submit} disabled={!to.trim()}>
            <label className="control">
                <span className="control__label">To</span>
                <input
                    className="control__input"
                    type="email"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    placeholder="foo@bar.com"
                />
            </label>
            <label className="control">
                <span className="control__label">Subject (optional)</span>
                <input
                    className="control__input"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Hello"
                />
            </label>
            <label className="control">
                <span className="control__label">Body (optional)</span>
                <textarea
                    className="control__input"
                    rows={3}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Message"
                />
            </label>
        </QRForm>
    )
}
