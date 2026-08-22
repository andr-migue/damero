import './ColorControl.css'

interface ColorControlProps {
    label: string
    value: string
    onChange: (value: string) => void
}

export function ColorControl({ label, value, onChange }: ColorControlProps) {
    return (
        <label className="color-control">
            <span className="color-control__label">
                {label}
                <span className="color-control__value">{value.toUpperCase()}</span>
            </span>
            <input
                className="color-control__input"
                type="color"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </label>
    )
}
