import { useEffect, useRef } from 'react'
import './ConfigPanel.css'
import type { Params, UpdateParam } from '../../core/params'
import {
    DOT_TYPES,
    CORNERS_SQUARE_TYPES,
    CORNERS_DOT_TYPES,
    SHAPE_TYPES,
} from '../../core/params'
import { SliderControl } from '../controls/SliderControl/SliderControl'
import { SelectControl } from '../controls/SelectControl/SelectControl'
import { ColorControl } from '../controls/ColorControl/ColorControl'
import { DataInput } from '../controls/DataInput/DataInput'
import { LogoDropzone } from '../controls/LogoDropzone/LogoDropzone'
import { useTheme } from '../../providers/ThemeProvider/ThemeProvider'
import { useToast } from '../../providers/ToastProvider/ToastProvider'

interface ConfigPanelProps {
    params: Params
    update: UpdateParam
    onSubmitData: (value: string) => void
    src: string | undefined
}

export function ConfigPanel({ params, update, onSubmitData, src }: ConfigPanelProps) {
    const { theme, toggleTheme } = useTheme()
    const { show } = useToast()

    const isRisky = !!params.logo && params.error !== 'H'
    const prevError = useRef(params.error)
    const prevLogo = useRef(params.logo)
    useEffect(() => {
        const errorChanged = prevError.current !== params.error
        const logoChanged = prevLogo.current !== params.logo
        if (isRisky && (errorChanged || logoChanged)) {
            show('El logo puede degradar la lectura. Se recomienda nivel H.', 'warning')
        }
        prevError.current = params.error
        prevLogo.current = params.logo
    }, [isRisky, params.error, params.logo, show])

    return (
        <aside className="config-panel">
            <button type="button" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>

            <DataInput onSubmit={onSubmitData} />

            <LogoDropzone
                value={params.logo}
                onChange={v => update('logo', v)}
            />

            <SliderControl
                label="Logo scale"
                value={params.logoScale}
                min={0.05}
                max={0.30}
                step={0.01}
                disabled={!params.logo}
                onChange={v => update('logoScale', v)}
            />

            <SliderControl
                label="Logo margin"
                value={params.imageMargin}
                min={0}
                max={20}
                step={1}
                unit="px"
                disabled={!params.logo}
                onChange={v => update('imageMargin', v)}
            />

            <SliderControl
                label="Margin"
                value={params.margin}
                min={32}
                max={128}
                step={1}
                unit="px"
                onChange={value => update('margin', value)}
            />

            <SelectControl
                label="Format"
                value={params.format}
                options={[
                    { value: 'svg', label: 'SVG' },
                    { value: 'png', label: 'PNG' },
                    { value: 'jpeg', label: 'JPEG' },
                    { value: 'webp', label: 'WEBP' },
                ]}
                onChange={v => update('format', v as Params['format'])}
            />

            <ColorControl
                label="Fill color"
                value={params.fillColor}
                onChange={v => update('fillColor', v)}
            />

            <ColorControl
                label="Background color"
                value={params.backColor}
                onChange={v => update('backColor', v)}
            />

            <details className="config-panel__advanced">
                <summary>Advanced colors</summary>

                <label className="config-panel__toggle">
                    <input
                        type="checkbox"
                        checked={params.useCustomCornerColors}
                        onChange={e => update('useCustomCornerColors', e.target.checked)}
                    />
                    Use custom corner colors
                </label>

                {params.useCustomCornerColors && (
                    <>
                        <ColorControl
                            label="Corner square color"
                            value={params.cornersSquareColor}
                            onChange={v => update('cornersSquareColor', v)}
                        />

                        <ColorControl
                            label="Corner dot color"
                            value={params.cornersDotColor}
                            onChange={v => update('cornersDotColor', v)}
                        />
                    </>
                )}
            </details>

            <SelectControl
                label="Error correction"
                value={params.error}
                options={[
                    { value: 'L', label: 'L — 7%' },
                    { value: 'M', label: 'M — 15%' },
                    { value: 'Q', label: 'Q — 25%' },
                    { value: 'H', label: 'H — 30%' },
                ]}
                onChange={v => update('error', v as Params['error'])}
            />

            <SelectControl
                label="Shape"
                value={params.shape}
                options={SHAPE_TYPES.map(v => ({ value: v, label: v }))}
                onChange={v => update('shape', v as Params['shape'])}
            />

            <SelectControl
                label="Dots style"
                value={params.dotsType}
                options={DOT_TYPES.map(v => ({ value: v, label: v }))}
                onChange={v => update('dotsType', v as Params['dotsType'])}
            />

            <SelectControl
                label="Corner square style"
                value={params.cornersSquareType}
                options={CORNERS_SQUARE_TYPES.map(v => ({ value: v, label: v }))}
                onChange={v => update('cornersSquareType', v as Params['cornersSquareType'])}
            />

            <SelectControl
                label="Corner dot style"
                value={params.cornersDotType}
                options={CORNERS_DOT_TYPES.map(v => ({ value: v, label: v }))}
                onChange={v => update('cornersDotType', v as Params['cornersDotType'])}
            />

            <SelectControl
                label="Version"
                value={params.version === undefined ? '' : String(params.version)}
                options={[
                    { value: '', label: 'Auto' },
                    ...Array.from({ length: 40 }, (_, i) => ({
                        value: String(i + 1),
                        label: `Version ${i + 1}`,
                    })),
                ]}
                onChange={v => update('version', v === '' ? undefined : Number(v))}
            />

            {src && (
                <a className="download-button" href={src} download={`qr.${params.format}`}>
                    Descargar {params.format.toUpperCase()}
                </a>
            )}
        </aside>
    )
}
