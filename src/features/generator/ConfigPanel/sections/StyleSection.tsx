import { Select, Slider } from '../../../../ui'
import { Section } from '../Section'
import type { Params, UpdateParam } from '../../../../core/params'

const SHAPES = ['square', 'circle'] as const
const DOTS = ['square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'] as const
const CORNERS = ['square', 'dot', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'] as const

interface StyleSectionProps {
    params: Params
    update: UpdateParam
}

export function StyleSection({ params, update }: StyleSectionProps) {
    return (
        <Section title="Style">
            <Select
                label="Shape"
                value={params.shape}
                options={SHAPES}
                onChange={v => update('shape', v)}
            />
            <Select
                label="Dots"
                value={params.dotsType}
                options={DOTS}
                onChange={v => update('dotsType', v)}
            />
            <Select
                label="Corner squares"
                value={params.cornersSquareType}
                options={CORNERS}
                onChange={v => update('cornersSquareType', v)}
            />
            <Select
                label="Corner dots"
                value={params.cornersDotType}
                options={CORNERS}
                onChange={v => update('cornersDotType', v)}
            />
            <Slider
                label="Quiet zone"
                value={params.margin}
                min={32}
                max={128}
                step={1}
                unit="px"
                onChange={v => update('margin', v)}
            />
        </Section>
    )
}
