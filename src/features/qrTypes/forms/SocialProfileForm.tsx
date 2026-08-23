import { Form, Select, TextField } from '../../../ui'
import { useFormState } from '../../../hooks/useFormState'
import { useIconLogo } from '../../../hooks/useIconLogo'
import {
    PLATFORMS,
    findPlatform,
    socialDefaults,
    serializeSocial,
} from '../serializers/social'
import type { PlatformId } from '../serializers/social'
import type { QRFormProps } from '../types'

const OPTIONS = PLATFORMS.map(p => ({ value: p.id, label: p.label }))

export function SocialProfileForm({ onSerialize, onLogo }: QRFormProps) {
    const [values, set] = useFormState(socialDefaults)
    useIconLogo(findPlatform(values.platform).icon, onLogo)

    return (
        <Form
            onSubmit={() => onSerialize(serializeSocial(values))}
            disabled={!values.username.trim()}
        >
            <Select<PlatformId>
                label="Platform"
                value={values.platform}
                options={OPTIONS}
                onChange={v => set('platform', v)}
            />
            <TextField
                label="Username"
                value={values.username}
                onChange={v => set('username', v)}
                placeholder="username"
            />
        </Form>
    )
}
