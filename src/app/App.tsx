import { GeneratorPage } from '../features/generator/GeneratorPage'
import { ThemeProvider } from './providers/ThemeProvider'
import { ToastProvider } from './providers/ToastProvider'

export function App() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <GeneratorPage />
            </ToastProvider>
        </ThemeProvider>
    )
}
