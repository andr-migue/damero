export const PLATFORMS = [
    { id: 'instagram', label: 'Instagram',   icon: 'instagram', url: (u: string) => `https://instagram.com/${u}` },
    { id: 'twitter',   label: 'Twitter / X', icon: 'twitter',   url: (u: string) => `https://x.com/${u}` },
    { id: 'tiktok',    label: 'TikTok',      icon: 'tiktok',    url: (u: string) => `https://tiktok.com/@${u}` },
    { id: 'youtube',   label: 'YouTube',     icon: 'youtube',   url: (u: string) => `https://youtube.com/@${u}` },
    { id: 'facebook',  label: 'Facebook',    icon: 'facebook',  url: (u: string) => `https://facebook.com/${u}` },
    { id: 'linkedin',  label: 'LinkedIn',    icon: 'linkedin',  url: (u: string) => `https://linkedin.com/in/${u}` },
    { id: 'telegram',  label: 'Telegram',    icon: 'telegram',  url: (u: string) => `https://t.me/${u}` },
    { id: 'twitch',    label: 'Twitch',      icon: 'twitch',    url: (u: string) => `https://twitch.tv/${u}` },
    { id: 'github',    label: 'GitHub',      icon: 'github',    url: (u: string) => `https://github.com/${u}` },
    { id: 'discord',   label: 'Discord',     icon: 'discord',   url: (u: string) => `https://discord.gg/${u}` },
] as const

export type PlatformId = typeof PLATFORMS[number]['id']

export function findPlatform(id: PlatformId) {
    return PLATFORMS.find(p => p.id === id)!
}

export const socialDefaults = {
    platform: 'instagram' as PlatformId,
    username: '',
}

export type SocialValues = typeof socialDefaults

export function serializeSocial({ platform, username }: SocialValues): string {
    return findPlatform(platform).url(username.trim().replace(/^@/, ''))
}

export const whatsappDefaults = { phone: '', message: '' }
export type WhatsappValues = typeof whatsappDefaults

export function serializeWhatsapp({ phone, message }: WhatsappValues): string {
    const digits = phone.replace(/\D/g, '')
    const text = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://wa.me/${digits}${text}`
}
