import { GeneratorPage } from './pages/GeneratorPage'
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider'
import { ToastProvider } from './providers/ToastProvider/ToastProvider'

export default function App() {
    return (
        <ThemeProvider>
            <ToastProvider>
                <GeneratorPage />
            </ToastProvider>
        </ThemeProvider>
    )
}
