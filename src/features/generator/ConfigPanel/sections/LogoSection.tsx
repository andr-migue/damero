import { Dropzone, Slider } from '../../../../ui'
import { useToast } from '../../../../app/providers/toast'
import { Section } from '../Section'
import type { Params, UpdateParam } from '../../../../core/params'

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

interface LogoSectionProps {
    params: Params
    update: UpdateParam
}

export function LogoSection({ params, update }: LogoSectionProps) {
    const { show } = useToast()

    return (
        <Section title="Logo">
            <Dropzone
                label="Image"
                accept={ACCEPTED}
                file={params.logo?.source}
                previewBackground={params.backColor}
                onSelect={file => update('logo', {
                    source: file,
                    kind: file.type === 'image/svg+xml' ? 'svg' : 'raster',
                })}
                onClear={() => update('logo', undefined)}
                onReject={file => show(`"${file.name}" is not a supported image.`, 'error')}
            />
            <Slider
                label="Scale"
                value={params.logoScale}
                min={0.05}
                max={0.3}
                step={0.01}
                disabled={!params.logo}
                onChange={v => update('logoScale', v)}
            />
            <Slider
                label="Margin"
                value={params.logoMargin}
                min={0}
                max={20}
                step={1}
                unit="px"
                disabled={!params.logo}
                onChange={v => update('logoMargin', v)}
            />
        </Section>
    )
}
