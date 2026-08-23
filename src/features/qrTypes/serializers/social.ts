export interface Platform {
    id: string
    label: string
    icon: string
    field: string
    placeholder: string
    url: (handle: string) => string
}

export const PLATFORMS = [
    {
        id: 'instagram', label: 'Instagram', icon: 'brand/instagram',
        field: 'Username', placeholder: 'username',
        url: h => `https://instagram.com/${h}`,
    },
    {
        id: 'twitter', label: 'X', icon: 'brand-mono/twitter',
        field: 'Username', placeholder: 'username',
        url: h => `https://x.com/${h}`,
    },
    {
        id: 'tiktok', label: 'TikTok', icon: 'brand-mono/tiktok',
        field: 'Username', placeholder: 'username',
        url: h => `https://tiktok.com/@${h}`,
    },
    {
        id: 'youtube', label: 'YouTube', icon: 'brand/youtube',
        field: 'Handle', placeholder: 'handle',
        url: h => `https://youtube.com/@${h}`,
    },
    {
        id: 'facebook', label: 'Facebook', icon: 'brand/facebook',
        field: 'Username or page', placeholder: 'username',
        url: h => `https://facebook.com/${h}`,
    },
    {
        id: 'linkedin', label: 'LinkedIn', icon: 'brand/linkedin',
        field: 'Profile slug', placeholder: 'your-name',
        url: h => `https://linkedin.com/in/${h}`,
    },
    {
        id: 'telegram', label: 'Telegram', icon: 'brand/telegram',
        field: 'Username', placeholder: 'username',
        url: h => `https://t.me/${h}`,
    },
    {
        id: 'twitch', label: 'Twitch', icon: 'brand/twitch',
        field: 'Username', placeholder: 'username',
        url: h => `https://twitch.tv/${h}`,
    },
    {
        id: 'github', label: 'GitHub', icon: 'brand-mono/github',
        field: 'Username', placeholder: 'username',
        url: h => `https://github.com/${h}`,
    },
    {
        id: 'discord', label: 'Discord', icon: 'brand/discord',
        field: 'Invite code', placeholder: 'abc123',
        url: h => `https://discord.gg/${h}`,
    },
] as const satisfies readonly Platform[]

export function serializeProfile(platform: Platform, handle: string): string {
    return platform.url(handle.trim().replace(/^@/, ''))
}

export const whatsappDefaults = { phone: '', message: '' }
export type WhatsappValues = typeof whatsappDefaults

export function serializeWhatsapp({ phone, message }: WhatsappValues): string {
    const digits = phone.replace(/\D/g, '')
    const text = message ? `?text=${encodeURIComponent(message)}` : ''
    return `https://wa.me/${digits}${text}`
}
