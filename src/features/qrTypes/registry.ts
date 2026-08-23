import { TextForm } from './forms/TextForm'
import { PhoneForm } from './forms/PhoneForm'
import { EmailForm } from './forms/EmailForm'
import { SmsForm } from './forms/SmsForm'
import { WhatsappForm } from './forms/WhatsappForm'
import { SocialProfileForm } from './forms/SocialProfileForm'
import { VcardForm } from './forms/VcardForm'
import { WifiForm } from './forms/WifiForm'
import { GeolocationForm } from './forms/GeolocationForm'
import type { CategoryId, QRType } from './types'

export const QR_TYPES = [
    { id: 'text',     label: 'Text / URL',     category: 'basic',   icon: 'link',           Form: TextForm },
    { id: 'phone',    label: 'Phone',          category: 'basic',   icon: 'phone',          Form: PhoneForm },
    { id: 'email',    label: 'Email',          category: 'basic',   icon: 'mail',           Form: EmailForm },
    { id: 'sms',      label: 'SMS',            category: 'basic',   icon: 'message-square', Form: SmsForm },
    { id: 'whatsapp', label: 'WhatsApp',       category: 'social',  icon: 'whatsapp',       Form: WhatsappForm },
    { id: 'social',   label: 'Social profile', category: 'social',  icon: 'user-round',     Form: SocialProfileForm },
    { id: 'vcard',    label: 'vCard',          category: 'contact', icon: 'user-round',     Form: VcardForm },
    { id: 'wifi',     label: 'Wi-Fi',          category: 'utility', icon: 'wifi',           Form: WifiForm },
    { id: 'geo',      label: 'Geolocation',    category: 'utility', icon: 'map-marker',     Form: GeolocationForm },
] as const satisfies readonly QRType[]

export function findType(id: string): QRType {
    return QR_TYPES.find(t => t.id === id) ?? QR_TYPES[0]
}

export function typesOf(category: CategoryId): readonly QRType[] {
    return QR_TYPES.filter(t => t.category === category)
}
