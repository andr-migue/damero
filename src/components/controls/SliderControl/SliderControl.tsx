import './SliderControl.css'

interface SliderControlProps {
    label: string
    value: number
    min: number
    max: number
    step: number
    unit?: string
    onChange: (value: number) => void
}

export function SliderControl({ label, value, min, max, step, unit, onChange }: SliderControlProps) {
    return (
        <label className="slider-control">
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
                onChange={e => onChange(Number(e.target.value))}
            />
        </label>
    )
}
