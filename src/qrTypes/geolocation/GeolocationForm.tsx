import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

export function GeolocationForm({ onSerialize }: Props) {
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const isValid = lat.trim() !== '' && lng.trim() !== '' &&
        !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng))

    const submit = () => {
        if (!isValid) return
        onSerialize(`geo:${Number(lat)},${Number(lng)}`)
    }

    return (
        <QRForm onSubmit={submit} disabled={!isValid}>
            <div className="qr-form__row">
                <label className="control">
                    <span className="control__label">Latitude</span>
                    <input
                        className="control__input"
                        type="number"
                        step="any"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        placeholder="41.4036"
                    />
                </label>
                <label className="control">
                    <span className="control__label">Longitude</span>
                    <input
                        className="control__input"
                        type="number"
                        step="any"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        placeholder="2.1744"
                    />
                </label>
            </div>
        </QRForm>
    )
}
