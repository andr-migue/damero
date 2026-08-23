import type { QRType } from '../types'
import { TextForm } from './TextForm'

export const textType: QRType = {
    id: 'text',
    label: 'Text / URL',
    category: 'basic',
    icon: 'link',
    Form: TextForm,
}
