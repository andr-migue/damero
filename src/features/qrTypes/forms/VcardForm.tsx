import { Form, FormRow, TextField, TextArea } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { vcardDefaults, serializeVcard } from '../serializers/vcard'
import type { QRFormProps } from '../types'

export function VcardForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(vcardDefaults)
    useIconLogo(icon, onLogo)

    const hasName = Boolean(values.firstName || values.lastName)

    return (
        <Form onSubmit={() => onSerialize(serializeVcard(values))} disabled={!hasName}>
            <FormRow>
                <TextField
                    label="First name"
                    value={values.firstName}
                    onChange={v => set('firstName', v)}
                />
                <TextField
                    label="Last name"
                    value={values.lastName}
                    onChange={v => set('lastName', v)}
                />
            </FormRow>
            <TextField
                label="Phone"
                type="tel"
                value={values.phone}
                onChange={v => set('phone', v)}
                placeholder="+34 600 000 000"
            />
            <TextField
                label="Email"
                type="email"
                value={values.email}
                onChange={v => set('email', v)}
                placeholder="foo@bar.com"
            />
            <FormRow>
                <TextField
                    label="Organization"
                    value={values.organization}
                    onChange={v => set('organization', v)}
                />
                <TextField
                    label="Title"
                    value={values.title}
                    onChange={v => set('title', v)}
                />
            </FormRow>
            <TextField
                label="Website"
                type="url"
                value={values.url}
                onChange={v => set('url', v)}
                placeholder="https://…"
            />
            <TextField
                label="Address"
                value={values.address}
                onChange={v => set('address', v)}
            />
            <TextArea
                label="Notes"
                rows={2}
                value={values.notes}
                onChange={v => set('notes', v)}
            />
        </Form>
    )
}
