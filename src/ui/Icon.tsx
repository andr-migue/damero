import { iconUrl } from '../lib/icons'

interface IconProps {
    slug: string
    size?: number
}

export function Icon({ slug, size = 14 }: IconProps) {
    const tinted = !slug.startsWith('brand/')

    return (
        <img
            className={tinted ? 'icon icon--tinted' : 'icon'}
            src={iconUrl(slug)}
            alt=""
            width={size}
            height={size}
        />
    )
}
