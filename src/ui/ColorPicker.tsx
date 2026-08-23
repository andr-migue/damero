import { Field } from './Field'

interface ColorPickerProps {
    label: string
    value: string
    onChange: (value: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    return (
        <Field label={label} hint={value.toUpperCase()}>
            <input
                className="field__color"
                type="color"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </Field>
    )
}
