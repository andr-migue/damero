import type { ComponentType } from 'react'
import type { Logo } from '../../core/params'

export type CategoryId = 'basic' | 'social' | 'contact' | 'utility'

export const CATEGORIES = [
    { id: 'basic',   label: 'Basic' },
    { id: 'social',  label: 'Social' },
    { id: 'contact', label: 'Contact' },
    { id: 'utility', label: 'Utility' },
] as const satisfies readonly { id: CategoryId; label: string }[]

export interface QRFormProps {
    icon?: string
    onSerialize: (data: string) => void
    onLogo?: (logo: Logo | undefined) => void
}

export interface QRType {
    id: string
    label: string
    category: CategoryId
    icon: string
    Form: ComponentType<QRFormProps>
}
