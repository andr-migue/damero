import './SelectControl.css'

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
        <label className="select-control">
            <span className="select-control__label">{label}</span>
            <select
                className="select-control__select"
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
