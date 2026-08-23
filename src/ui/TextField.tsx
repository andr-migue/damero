import type { InputHTMLAttributes } from 'react'
import { Field } from './Field'

type NativeProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface TextFieldProps extends NativeProps {
    label: string
    value: string
    onChange: (value: string) => void
}

export function TextField({ label, value, onChange, ...rest }: TextFieldProps) {
    return (
        <Field label={label}>
            <input
                className="field__input"
                value={value}
                onChange={e => onChange(e.target.value)}
                {...rest}
            />
        </Field>
    )
}
