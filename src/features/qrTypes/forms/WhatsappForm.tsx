import { Form, TextField, TextArea } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { whatsappDefaults, serializeWhatsapp } from '../serializers/social'
import type { QRFormProps } from '../types'

export function WhatsappForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(whatsappDefaults)
    useIconLogo(icon, onLogo)

    return (
        <Form
            onSubmit={() => onSerialize(serializeWhatsapp(values))}
            disabled={!values.phone.replace(/\D/g, '')}
        >
            <TextField
                label="Phone with country code"
                type="tel"
                value={values.phone}
                onChange={v => set('phone', v)}
                placeholder="34600000000"
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
