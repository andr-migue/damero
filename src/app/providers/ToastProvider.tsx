import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { ToastContext } from './toast'
import type { Toast, ToastKind } from './toast'
import './ToastProvider.css'

const DURATION = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const dismiss = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const show = useCallback((message: string, kind: ToastKind = 'warning') => {
        const id = Date.now() + Math.random()
        setToasts(prev => [...prev, { id, message, kind }])
        setTimeout(() => dismiss(id), DURATION)
    }, [dismiss])

    return (
        <ToastContext value={{ show }}>
            {children}
            <div className="toasts" role="status" aria-live="polite">
                {toasts.map(toast => (
                    <button
                        key={toast.id}
                        type="button"
                        className={`toast toast--${toast.kind}`}
                        onClick={() => dismiss(toast.id)}
                    >
                        {toast.message}
                    </button>
                ))}
            </div>
        </ToastContext>
    )
}
