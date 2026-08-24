import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import './ErrorBoundary.css'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error(error, info.componentStack)
    }

    render() {
        const { error } = this.state
        if (!error) return this.props.children

        return (
            <main className="crash" role="alert">
                <h1 className="crash__title">damero stopped</h1>
                <p className="crash__detail">{error.message || error.name}</p>
                <button
                    type="button"
                    className="crash__action"
                    onClick={() => window.location.reload()}
                >
                    Reload
                </button>
            </main>
        )
    }
}
