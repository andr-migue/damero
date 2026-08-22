import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import './ToastProvider.css'

type ToastKind = 'info' | 'success' | 'warning' | 'error'

interface Toast {
    id: number
    message: string
    kind: ToastKind
}

interface ToastContextValue {
    show: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const DURATION_MS = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const dismiss = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const show = useCallback((message: string, kind: ToastKind = 'info') => {
        const id = Date.now() + Math.random()
        setToasts(prev => [...prev, { id, message, kind }])
        setTimeout(() => dismiss(id), DURATION_MS)
    }, [dismiss])

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div className="toast-container" role="status" aria-live="polite">
                {toasts.map(t => (
                    <button
                        type="button"
                        key={t.id}
                        className={`toast toast--${t.kind}`}
                        onClick={() => dismiss(t.id)}
                    >
                        {t.message}
                    </button>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used within a ToastProvider')
    return ctx
}
