import type { TextareaHTMLAttributes } from 'react'
import { Field } from './Field'

type NativeProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

interface TextAreaProps extends NativeProps {
    label: string
    value: string
    onChange: (value: string) => void
}

export function TextArea({ label, value, onChange, rows = 3, ...rest }: TextAreaProps) {
    return (
        <Field label={label}>
            <textarea
                className="field__input"
                rows={rows}
                value={value}
                onChange={e => onChange(e.target.value)}
                {...rest}
            />
        </Field>
    )
}
