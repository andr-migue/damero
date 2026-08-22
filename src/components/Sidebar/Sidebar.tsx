import './Sidebar.css'
import type { Params, UpdateParam } from '../../core/params'
import { SliderControl } from '../controls/SliderControl/SliderControl'
import { SelectControl } from '../controls/SelectControl/SelectControl'
import { ColorControl } from '../controls/ColorControl/ColorControl'
import { DataInput } from '../controls/DataInput/DataInput'

interface SidebarProps {
    theme: 'light' | 'dark'
    toggleTheme: () => void
    params: Params
    update: UpdateParam
    onSubmitData: (value: string) => void
    src: string | undefined
}

export function Sidebar({ theme, toggleTheme, params, update, onSubmitData, src }: SidebarProps) {
    return (
        <aside className="sidebar">
            <button type="button" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>

            <DataInput onSubmit={onSubmitData} />

            <SliderControl
                label="Size"
                value={params.size}
                min={256}
                max={1024}
                step={1}
                unit="px"
                onChange={value => update('size', value)}
            />

            <SliderControl
                label="Margin"
                value={params.margin}
                min={16}
                max={64}
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

            {src && (
                <a className="download-button" href={src} download={`qr.${params.format}`}>
                    Descargar {params.format.toUpperCase()}
                </a>
            )}
        </aside>
    )
}
