import type { QRType } from '../types'
import { WhatsappForm } from './WhatsappForm'

export const whatsappType: QRType = {
    id: 'whatsapp',
    label: 'WhatsApp',
    category: 'social',
    icon: 'whatsapp',
    Form: WhatsappForm,
}
