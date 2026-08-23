import type { QRType, Category } from './types'
import { textType } from './text'
import { phoneType } from './phone'
import { emailType } from './email'
import { smsType } from './sms'
import { whatsappType } from './whatsapp'
import { socialProfileType } from './socialProfile'
import { vcardType } from './vcard'
import { wifiType } from './wifi'
import { geolocationType } from './geolocation'

export { CATEGORIES } from './types'
export type { QRType, Category } from './types'

export const QR_TYPES: readonly QRType[] = [
    textType,
    phoneType,
    emailType,
    smsType,
    whatsappType,
    socialProfileType,
    vcardType,
    wifiType,
    geolocationType,
]

export const QR_TYPES_BY_ID: Record<string, QRType> = Object.fromEntries(
    QR_TYPES.map(t => [t.id, t]),
)

export function typesByCategory(cat: Category): QRType[] {
    return QR_TYPES.filter(t => t.category === cat)
}
