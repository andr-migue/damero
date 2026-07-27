import { useState, useEffect } from 'react'
import { GeneratorPage } from './pages/GeneratorPage'

export default function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

    return <GeneratorPage theme={theme} toggleTheme={toggleTheme} />
}