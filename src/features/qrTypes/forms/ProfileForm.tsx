import { useState } from 'react'
import { Form, TextField } from '../../../ui'
import { useIconLogo } from '../../../hooks/useIconLogo'
import { serializeProfile } from '../serializers/social'
import type { Platform } from '../serializers/social'
import type { QRFormProps } from '../types'

export function createProfileForm(platform: Platform) {
    return function ProfileForm({ icon, onSerialize, onLogo }: QRFormProps) {
        const [handle, setHandle] = useState('')
        useIconLogo(icon, onLogo)

        return (
            <Form
                onSubmit={() => onSerialize(serializeProfile(platform, handle))}
                disabled={!handle.trim()}
            >
                <TextField
                    label={platform.field}
                    value={handle}
                    onChange={setHandle}
                    placeholder={platform.placeholder}
                />
            </Form>
        )
    }
}
