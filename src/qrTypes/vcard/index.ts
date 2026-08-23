import type { QRType } from '../types'
import { VcardForm } from './VcardForm'

export const vcardType: QRType = {
    id: 'vcard',
    label: 'vCard',
    category: 'contact',
    icon: 'user-round',
    Form: VcardForm,
}
