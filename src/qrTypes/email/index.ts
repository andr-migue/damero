import type { QRType } from '../types'
import { EmailForm } from './EmailForm'

export const emailType: QRType = {
    id: 'email',
    label: 'Email',
    category: 'basic',
    icon: 'mail',
    Form: EmailForm,
}
