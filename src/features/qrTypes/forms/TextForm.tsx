import { useState } from 'react'
import { Form, TextField } from '../../../ui'
import { useIconLogo } from '../../../hooks/useIconLogo'
import type { QRFormProps } from '../types'

export function TextForm({ icon, onSerialize, onLogo }: QRFormProps) {
    const [text, setText] = useState('')
    useIconLogo(icon, onLogo)

    return (
        <Form onSubmit={() => onSerialize(text)} disabled={!text.trim()}>
            <TextField
                label="Text or URL"
                value={text}
                onChange={setText}
                placeholder="https://example.com"
            />
        </Form>
    )
}
