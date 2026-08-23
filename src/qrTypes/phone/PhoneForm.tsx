import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

export function PhoneForm({ onSerialize }: Props) {
    const [phone, setPhone] = useState('')

    const submit = () => {
        const trimmed = phone.trim()
        if (!trimmed) return
        onSerialize(`tel:${trimmed}`)
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
        </QRForm>
    )
}
