interface SliderControlProps {
    label: string
    value: number
    min: number
    max: number
    step: number
    unit?: string
    disabled?: boolean
    onChange: (value: number) => void
}

export function SliderControl({ label, value, min, max, step, unit, disabled, onChange }: SliderControlProps) {
    return (
        <label className={`control${disabled ? ' is-disabled' : ''}`}>
            <span className="control__label">
                {label}
                <span className="control__hint">
                    {unit ? `${value} ${unit}` : value}
                </span>
            </span>
            <input
                className="control__range"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                disabled={disabled}
                onChange={e => onChange(Number(e.target.value))}
            />
        </label>
    )
}
