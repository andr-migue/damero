import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

export function WhatsappForm({ onSerialize }: Props) {
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    const submit = () => {
        const digits = phone.replace(/\D/g, '')
        if (!digits) return
        const qs = message ? `?text=${encodeURIComponent(message)}` : ''
        onSerialize(`https://wa.me/${digits}${qs}`)
    }

    return (
        <QRForm onSubmit={submit} disabled={!phone.replace(/\D/g, '')}>
            <label className="control">
                <span className="control__label">Phone (with country code)</span>
                <input
                    className="control__input"
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="34600000000"
                />
            </label>
            <label className="control">
                <span className="control__label">Message (optional)</span>
                <textarea
                    className="control__input"
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Hola!"
                />
            </label>
        </QRForm>
    )
}
