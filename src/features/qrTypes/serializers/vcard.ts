export const vcardDefaults = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    title: '',
    url: '',
    address: '',
    notes: '',
}

export type VcardValues = typeof vcardDefaults

function escape(value: string): string {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;')
}

export function serializeVcard(v: VcardValues): string {
    const fullName = [v.firstName, v.lastName].filter(Boolean).join(' ')
    const lines = ['BEGIN:VCARD', 'VERSION:3.0']

    if (fullName) lines.push(`FN:${escape(fullName)}`)
    lines.push(`N:${escape(v.lastName)};${escape(v.firstName)};;;`)
    if (v.phone) lines.push(`TEL;TYPE=CELL:${escape(v.phone)}`)
    if (v.email) lines.push(`EMAIL:${escape(v.email)}`)
    if (v.organization) lines.push(`ORG:${escape(v.organization)}`)
    if (v.title) lines.push(`TITLE:${escape(v.title)}`)
    if (v.url) lines.push(`URL:${escape(v.url)}`)
    if (v.address) lines.push(`ADR:;;${escape(v.address)};;;;`)
    if (v.notes) lines.push(`NOTE:${escape(v.notes)}`)
    lines.push('END:VCARD')

    return lines.join('\n')
}
