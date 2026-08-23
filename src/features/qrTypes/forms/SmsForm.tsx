import { Form, TextField, TextArea } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { smsDefaults, serializeSms } from '../serializers/contact'
import type { QRFormProps } from '../types'

export function SmsForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(smsDefaults)
    useIconLogo(icon, onLogo)

    return (
        <Form
            onSubmit={() => onSerialize(serializeSms(values))}
            disabled={!values.phone.trim()}
        >
            <TextField
                label="Phone number"
                type="tel"
                value={values.phone}
                onChange={v => set('phone', v)}
                placeholder="+34 600 000 000"
            />
            <TextArea
                label="Message"
                value={values.message}
                onChange={v => set('message', v)}
                placeholder="Optional"
            />
        </Form>
    )
}
