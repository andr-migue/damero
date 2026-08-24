import { GeneratorPage } from '../features/generator/GeneratorPage'
import { ErrorBoundary } from './ErrorBoundary'
import { ThemeProvider } from './providers/ThemeProvider'
import { ToastProvider } from './providers/ToastProvider'

export function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <ToastProvider>
                    <GeneratorPage />
                </ToastProvider>
            </ThemeProvider>
        </ErrorBoundary>
    )
}
