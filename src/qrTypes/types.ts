import type { ComponentType } from 'react'
import type { Logo } from '../core/params'

export type Category = 'basic' | 'social' | 'contact' | 'utility'

export const CATEGORIES: { id: Category; label: string }[] = [
    { id: 'basic',   label: 'Basic'   },
    { id: 'social',  label: 'Social'  },
    { id: 'contact', label: 'Contact' },
    { id: 'utility', label: 'Utility' },
]

export interface QRType {
    id: string
    label: string
    category: Category
    icon?: string   // slug del SVG en public/icons/ — se usa como logo por defecto
    Form: ComponentType<{
        onSerialize: (data: string) => void
        onLogoOverride?: (logo: Logo | undefined) => void
    }>
}
