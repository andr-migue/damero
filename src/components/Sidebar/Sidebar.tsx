import { useState } from 'react'
import './Sidebar.css'
import type { Params } from '../../core/params'

interface SidebarProps {
    theme: 'light' | 'dark'
    toggleTheme: () => void
    onSubmitData: (value: string) => void
    src: string | undefined
    format: Params['format']
}

export function Sidebar({ theme, toggleTheme, onSubmitData, src, format }: SidebarProps) {
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
            {src && (
                <a className="download-button" href={src} download={`qr.${format}`}>
                    Descargar {format.toUpperCase()}
                </a>
            )}
        </aside>
    )
}
