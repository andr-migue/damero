import './SliderControl.css'

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
        <label className={`slider-control${disabled ? ' is-disabled' : ''}`}>
            <span className="slider-control__label">
                {label}
            </span>
            <span className="slider-control__value">
                {value}{unit && ` ${unit}`}
            </span>
            <input
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
