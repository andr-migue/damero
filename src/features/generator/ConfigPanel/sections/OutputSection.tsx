import { Select } from '../../../../ui'
import { Section } from '../Section'
import type { ErrorCorrection, Format, Params, UpdateParam } from '../../../../core/params'

const ERROR_LEVELS = [
    { value: 'L', label: 'L — 7%' },
    { value: 'M', label: 'M — 15%' },
    { value: 'Q', label: 'Q — 25%' },
    { value: 'H', label: 'H — 30%' },
] as const

const FORMATS = [
    { value: 'svg', label: 'SVG' },
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'webp', label: 'WEBP' },
] as const

const VERSIONS = [
    { value: '', label: 'Auto' },
    ...Array.from({ length: 40 }, (_, i) => ({
        value: String(i + 1),
        label: `Version ${i + 1}`,
    })),
]

interface OutputSectionProps {
    params: Params
    update: UpdateParam
}

export function OutputSection({ params, update }: OutputSectionProps) {
    return (
        <Section title="Output">
            <Select<ErrorCorrection>
                label="Error correction"
                value={params.errorCorrection}
                options={ERROR_LEVELS}
                onChange={v => update('errorCorrection', v)}
            />
            <Select
                label="Version"
                value={params.version === undefined ? '' : String(params.version)}
                options={VERSIONS}
                onChange={v => update('version', v === '' ? undefined : Number(v))}
            />
            <Select<Format>
                label="Format"
                value={params.format}
                options={FORMATS}
                onChange={v => update('format', v)}
            />
        </Section>
    )
}
