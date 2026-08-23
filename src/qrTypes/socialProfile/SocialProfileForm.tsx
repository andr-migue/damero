import { useEffect, useState } from 'react'
import { QRForm } from '../QRForm/QRForm'
import { fetchIconAsBlob } from '../../icons'
import type { Logo } from '../../core/params'

interface Props {
    onSerialize: (data: string) => void
    onLogoOverride?: (logo: Logo | undefined) => void
}

const PLATFORMS = [
    { id: 'instagram', label: 'Instagram', icon: 'instagram', url: (u: string) => `https://instagram.com/${u}` },
    { id: 'twitter',   label: 'Twitter / X', icon: 'twitter', url: (u: string) => `https://x.com/${u}` },
    { id: 'tiktok',    label: 'TikTok',    icon: 'tiktok',    url: (u: string) => `https://tiktok.com/@${u}` },
    { id: 'youtube',   label: 'YouTube',   icon: 'youtube',   url: (u: string) => `https://youtube.com/@${u}` },
    { id: 'facebook',  label: 'Facebook',  icon: 'facebook',  url: (u: string) => `https://facebook.com/${u}` },
    { id: 'linkedin',  label: 'LinkedIn',  icon: 'linkedin',  url: (u: string) => `https://linkedin.com/in/${u}` },
    { id: 'telegram',  label: 'Telegram',  icon: 'telegram',  url: (u: string) => `https://t.me/${u}` },
    { id: 'twitch',    label: 'Twitch',    icon: 'twitch',    url: (u: string) => `https://twitch.tv/${u}` },
    { id: 'github',    label: 'GitHub',    icon: 'github',    url: (u: string) => `https://github.com/${u}` },
    { id: 'discord',   label: 'Discord',   icon: 'discord',   url: (u: string) => `https://discord.gg/${u}` },
] as const

type PlatformId = typeof PLATFORMS[number]['id']

export function SocialProfileForm({ onSerialize, onLogoOverride }: Props) {
    const [platform, setPlatform] = useState<PlatformId>('instagram')
    const [username, setUsername] = useState('')

    // Al montarse, asegura que el logo por defecto sea el de la plataforma inicial
    useEffect(() => {
        if (!onLogoOverride) return
        let cancelled = false
        const p = PLATFORMS.find(x => x.id === platform)
        if (!p) return
        fetchIconAsBlob(p.icon)
            .then(blob => { if (!cancelled) onLogoOverride({ source: blob, kind: 'svg' }) })
            .catch(() => { if (!cancelled) onLogoOverride(undefined) })
        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const switchPlatform = async (id: PlatformId) => {
        setPlatform(id)
        if (!onLogoOverride) return
        const p = PLATFORMS.find(x => x.id === id)
        if (!p) return
        try {
            const blob = await fetchIconAsBlob(p.icon)
            onLogoOverride({ source: blob, kind: 'svg' })
        } catch {
            onLogoOverride(undefined)
        }
    }

    const submit = () => {
        const cleaned = username.trim().replace(/^@/, '')
        if (!cleaned) return
        const p = PLATFORMS.find(x => x.id === platform)!
        onSerialize(p.url(cleaned))
    }

    return (
        <QRForm onSubmit={submit} disabled={!username.trim()}>
            <label className="control">
                <span className="control__label">Platform</span>
                <select
                    className="control__select"
                    value={platform}
                    onChange={e => void switchPlatform(e.target.value as PlatformId)}
                >
                    {PLATFORMS.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                </select>
            </label>
            <label className="control">
                <span className="control__label">Username</span>
                <input
                    className="control__input"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="username (without @)"
                />
            </label>
        </QRForm>
    )
}
