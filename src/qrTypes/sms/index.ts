import type { QRType } from '../types'
import { SmsForm } from './SmsForm'

export const smsType: QRType = {
    id: 'sms',
    label: 'SMS',
    category: 'basic',
    icon: 'message-square',
    Form: SmsForm,
}
