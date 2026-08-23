import { Form, TextField } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { phoneDefaults, serializePhone } from '../serializers/contact'
import type { QRFormProps } from '../types'

export function PhoneForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(phoneDefaults)
    useIconLogo(icon, onLogo)

    return (
        <Form
            onSubmit={() => onSerialize(serializePhone(values))}
            disabled={!values.phone.trim()}
        >
            <TextField
                label="Phone number"
                type="tel"
                value={values.phone}
                onChange={v => set('phone', v)}
                placeholder="+34 600 000 000"
            />
        </Form>
    )
}
