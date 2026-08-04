import { useState } from 'react'
import './Sidebar.css'
import type { Params } from '../../core/params'
import { SliderControl } from '../controls/SliderControl/SliderControl'

interface SidebarProps {
    theme: 'light' | 'dark'
    toggleTheme: () => void
    params: Params
    onSubmitData: (value: string) => void
    src: string | undefined
    updateSize: (value: number) => void
    updateMargin: (value: number) => void
    updateFormat: (value: string) => void
}

export function Sidebar({ theme, toggleTheme, params, onSubmitData, src, updateSize, updateMargin, updateFormat }: SidebarProps) {
    const [draft, setDraft] = useState('')

    return (
        <aside className="sidebar">
            <button type="button" onClick={toggleTheme}>
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>

            <form onSubmit={e => {
                e.preventDefault()
                onSubmitData(draft)
            }}>
                <input
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Type URL and press Enter"
                />
            </form>

            <SliderControl
                label="size-slider"
                value={params.size}
                min={256}
                max={1024}
                step={1}
                onChange={updateSize}
            />

            <SliderControl
                label="margin-slider"
                value={params.margin}
                min={16}
                max={64}
                step={1}
                onChange={updateMargin}
            />

            <select
                value={params.format}
                onChange={e => updateFormat(e.target.value)}    
            >
                <option value="svg">svg</option>
                <option value="png">png</option>
                <option value="jpeg">jpeg</option>
                <option value="webp">webp</option>
            </select>

            {src && (
                <a className="download-button" href={src} download={`qr.${params.format}`}>
                    Descargar {params.format.toUpperCase()}
                </a>
            )}
        </aside>
    )
}
