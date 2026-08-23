import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext, STORAGE_KEY } from './theme'
import type { Theme } from './theme'

function initialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(initialTheme)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    )
}
