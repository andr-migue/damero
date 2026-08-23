import { Field } from './Field'

export type Option<T extends string> = T | { value: T; label: string }

interface SelectProps<T extends string> {
    label: string
    value: T
    options: readonly Option<T>[]
    onChange: (value: T) => void
}

export function Select<T extends string>({ label, value, options, onChange }: SelectProps<T>) {
    const normalized = options.map(o =>
        typeof o === 'string' ? { value: o, label: o } : o,
    )

    return (
        <Field label={label}>
            <select
                className="field__select"
                value={value}
                onChange={e => onChange(e.target.value as T)}
            >
                {normalized.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </Field>
    )
}
