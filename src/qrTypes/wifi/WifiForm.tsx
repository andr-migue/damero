import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

// Escape WiFi QR special chars: \ ; , " :
function escape(v: string): string {
    return v.replace(/([\\;,":])/g, '\\$1')
}

type Encryption = 'WPA' | 'WEP' | 'nopass'

export function WifiForm({ onSerialize }: Props) {
    const [ssid, setSsid] = useState('')
    const [password, setPassword] = useState('')
    const [encryption, setEncryption] = useState<Encryption>('WPA')
    const [hidden, setHidden] = useState(false)

    const submit = () => {
        if (!ssid.trim()) return
        const t = encryption === 'nopass' ? 'nopass' : encryption
        const p = encryption === 'nopass' ? '' : escape(password)
        const s = escape(ssid)
        const h = hidden ? 'true' : 'false'
        onSerialize(`WIFI:T:${t};S:${s};P:${p};H:${h};;`)
    }

    return (
        <QRForm onSubmit={submit} disabled={!ssid.trim()}>
            <label className="control">
                <span className="control__label">Network name (SSID)</span>
                <input
                    className="control__input"
                    value={ssid}
                    onChange={e => setSsid(e.target.value)}
                    placeholder="MyWiFi"
                />
            </label>
            <label className="control">
                <span className="control__label">Encryption</span>
                <select
                    className="control__select"
                    value={encryption}
                    onChange={e => setEncryption(e.target.value as Encryption)}
                >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (open)</option>
                </select>
            </label>
            {encryption !== 'nopass' && (
                <label className="control">
                    <span className="control__label">Password</span>
                    <input
                        className="control__input"
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </label>
            )}
            <label className="qr-form__checkbox">
                <input
                    type="checkbox"
                    checked={hidden}
                    onChange={e => setHidden(e.target.checked)}
                />
                Hidden network
            </label>
        </QRForm>
    )
}
