export const phoneDefaults = { phone: '' }
export type PhoneValues = typeof phoneDefaults

export function serializePhone({ phone }: PhoneValues): string {
    return `tel:${phone.trim()}`
}

export const emailDefaults = { to: '', subject: '', body: '' }
export type EmailValues = typeof emailDefaults

export function serializeEmail({ to, subject, body }: EmailValues): string {
    const query = new URLSearchParams()
    if (subject) query.set('subject', subject)
    if (body) query.set('body', body)
    const suffix = query.toString()
    return `mailto:${to.trim()}${suffix ? `?${suffix}` : ''}`
}

export const smsDefaults = { phone: '', message: '' }
export type SmsValues = typeof smsDefaults

export function serializeSms({ phone, message }: SmsValues): string {
    const body = message ? `?body=${encodeURIComponent(message)}` : ''
    return `sms:${phone.trim()}${body}`
}
