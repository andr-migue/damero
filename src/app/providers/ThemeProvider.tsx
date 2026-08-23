import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './theme'
import type { Theme } from './theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    )
}
