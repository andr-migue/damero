import { Form, Select, TextField, Checkbox } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { wifiDefaults, serializeWifi } from '../serializers/utility'
import type { Encryption } from '../serializers/utility'
import type { QRFormProps } from '../types'

const ENCRYPTION_OPTIONS = [
    { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
    { value: 'WEP', label: 'WEP' },
    { value: 'nopass', label: 'None (open)' },
] as const

export function WifiForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(wifiDefaults)
    useIconLogo(icon, onLogo)

    return (
        <Form
            onSubmit={() => onSerialize(serializeWifi(values))}
            disabled={!values.ssid.trim()}
        >
            <TextField
                label="Network name"
                value={values.ssid}
                onChange={v => set('ssid', v)}
                placeholder="MyWiFi"
            />
            <Select<Encryption>
                label="Encryption"
                value={values.encryption}
                options={ENCRYPTION_OPTIONS}
                onChange={v => set('encryption', v)}
            />
            {values.encryption !== 'nopass' && (
                <TextField
                    label="Password"
                    value={values.password}
                    onChange={v => set('password', v)}
                />
            )}
            <Checkbox
                label="Hidden network"
                checked={values.hidden}
                onChange={v => set('hidden', v)}
            />
        </Form>
    )
}
