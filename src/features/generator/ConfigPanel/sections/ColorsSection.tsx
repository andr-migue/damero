import { Checkbox, ColorPicker } from '../../../../ui'
import { Section } from '../Section'
import type { Params, UpdateParam } from '../../../../core/params'

interface ColorsSectionProps {
    params: Params
    update: UpdateParam
}

export function ColorsSection({ params, update }: ColorsSectionProps) {
    return (
        <Section title="Colors">
            <ColorPicker
                label="Fill"
                value={params.fillColor}
                onChange={v => update('fillColor', v)}
            />
            <ColorPicker
                label="Background"
                value={params.backColor}
                onChange={v => update('backColor', v)}
            />

            <details className="section__advanced">
                <summary>Advanced</summary>
                <Checkbox
                    label="Custom corner colors"
                    checked={params.useCustomCornerColors}
                    onChange={v => update('useCustomCornerColors', v)}
                />
                {params.useCustomCornerColors && (
                    <>
                        <ColorPicker
                            label="Corner square"
                            value={params.cornersSquareColor}
                            onChange={v => update('cornersSquareColor', v)}
                        />
                        <ColorPicker
                            label="Corner dot"
                            value={params.cornersDotColor}
                            onChange={v => update('cornersDotColor', v)}
                        />
                    </>
                )}
            </details>
        </Section>
    )
}
