import { useState } from 'react'
import './Sidebar.css'

interface SidebarProps {
    theme: 'light' | 'dark'
    toggleTheme: () => void
    onSubmitData: (value: string) => void
}

export function Sidebar({ theme, toggleTheme, onSubmitData }: SidebarProps) {
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
        </aside>
    )
}
