import type { QRType } from '../types'
import { PhoneForm } from './PhoneForm'

export const phoneType: QRType = {
    id: 'phone',
    label: 'Phone',
    category: 'basic',
    icon: 'phone',
    Form: PhoneForm,
}
