interface ColorControlProps {
    label: string
    value: string
    onChange: (value: string) => void
}

export function ColorControl({ label, value, onChange }: ColorControlProps) {
    return (
        <label className="control">
            <span className="control__label">
                {label}
                <span className="control__hint">{value.toUpperCase()}</span>
            </span>
            <input
                className="control__color"
                type="color"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </label>
    )
}
