import { createContext, use } from 'react'

export type ToastKind = 'info' | 'success' | 'warning' | 'error'

export interface Toast {
    id: number
    message: string
    kind: ToastKind
}

export interface ToastContextValue {
    show: (message: string, kind?: ToastKind) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
    const context = use(ToastContext)
    if (!context) throw new Error('useToast must be used inside ToastProvider')
    return context
}
