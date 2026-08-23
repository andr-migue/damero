import { Field } from './Field'

interface SliderProps {
    label: string
    value: number
    min: number
    max: number
    step: number
    unit?: string
    disabled?: boolean
    onChange: (value: number) => void
}

export function Slider({ label, value, min, max, step, unit, disabled, onChange }: SliderProps) {
    return (
        <Field label={label} hint={unit ? `${value} ${unit}` : value} disabled={disabled}>
            <input
                className="field__range"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                disabled={disabled}
                onChange={e => onChange(Number(e.target.value))}
            />
        </Field>
    )
}
