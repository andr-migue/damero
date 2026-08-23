import { TextForm } from './forms/TextForm'
import { PhoneForm } from './forms/PhoneForm'
import { EmailForm } from './forms/EmailForm'
import { SmsForm } from './forms/SmsForm'
import { WhatsappForm } from './forms/WhatsappForm'
import { createProfileForm } from './forms/ProfileForm'
import { VcardForm } from './forms/VcardForm'
import { WifiForm } from './forms/WifiForm'
import { GeolocationForm } from './forms/GeolocationForm'
import { PLATFORMS } from './serializers/social'
import type { CategoryId, QRType } from './types'

const profileTypes: readonly QRType[] = PLATFORMS.map(platform => ({
    id: platform.id,
    label: platform.label,
    category: 'social',
    icon: platform.icon,
    Form: createProfileForm(platform),
}))

export const QR_TYPES: readonly QRType[] = [
    { id: 'text',     label: 'Text / URL',  category: 'basic',   icon: 'ui/link',           Form: TextForm },
    { id: 'phone',    label: 'Phone',       category: 'basic',   icon: 'ui/phone',          Form: PhoneForm },
    { id: 'email',    label: 'Email',       category: 'basic',   icon: 'ui/mail',           Form: EmailForm },
    { id: 'sms',      label: 'SMS',         category: 'basic',   icon: 'ui/message-square', Form: SmsForm },
    { id: 'whatsapp', label: 'WhatsApp',    category: 'social',  icon: 'brand/whatsapp',       Form: WhatsappForm },
    ...profileTypes,
    { id: 'vcard',    label: 'vCard',       category: 'contact', icon: 'ui/user-round',     Form: VcardForm },
    { id: 'wifi',     label: 'Wi-Fi',       category: 'utility', icon: 'ui/wifi',           Form: WifiForm },
    { id: 'geo',      label: 'Geolocation', category: 'utility', icon: 'ui/map-pin',     Form: GeolocationForm },
]

export function findType(id: string): QRType {
    return QR_TYPES.find(t => t.id === id) ?? QR_TYPES[0]
}

export function typesOf(category: CategoryId): readonly QRType[] {
    return QR_TYPES.filter(t => t.category === category)
}
