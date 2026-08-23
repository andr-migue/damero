interface Option {
    value: string
    label: string
}

interface SelectControlProps {
    label: string
    value: string
    options: readonly Option[]
    onChange: (value: string) => void
}

export function SelectControl({ label, value, options, onChange }: SelectControlProps) {
    return (
        <label className="control">
            <span className="control__label">{label}</span>
            <select
                className="control__select"
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </label>
    )
}
