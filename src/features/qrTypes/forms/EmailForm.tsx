import { Form, TextField, TextArea } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { emailDefaults, serializeEmail } from '../serializers/contact'
import type { QRFormProps } from '../types'

export function EmailForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(emailDefaults)
    useIconLogo(icon, onLogo)

    return (
        <Form
            onSubmit={() => onSerialize(serializeEmail(values))}
            disabled={!values.to.trim()}
        >
            <TextField
                label="To"
                type="email"
                value={values.to}
                onChange={v => set('to', v)}
                placeholder="foo@bar.com"
            />
            <TextField
                label="Subject"
                value={values.subject}
                onChange={v => set('subject', v)}
                placeholder="Optional"
            />
            <TextArea
                label="Body"
                value={values.body}
                onChange={v => set('body', v)}
                placeholder="Optional"
            />
        </Form>
    )
}
