import { useState } from 'react'
import {
    CATEGORIES,
    QR_TYPES,
    QR_TYPES_BY_ID,
    typesByCategory,
} from '../../qrTypes'
import type { Category, QRType } from '../../qrTypes'
import { iconUrl, fetchIconAsBlob } from '../../icons'
import type { Logo } from '../../core/params'
import './QRContentBuilder.css'

interface Props {
    onSerialize: (data: string) => void
    onLogoDefault?: (logo: Logo | undefined) => void
}

export function QRContentBuilder({ onSerialize, onLogoDefault }: Props) {
    const [category, setCategory] = useState<Category>(QR_TYPES[0].category)
    const [typeId, setTypeId] = useState(QR_TYPES[0].id)

    const type = QR_TYPES_BY_ID[typeId]
    const Form = type.Form
    const currentTypes = typesByCategory(category)

    const applyDefaultLogo = async (t: QRType) => {
        if (!onLogoDefault) return
        if (!t.icon) {
            onLogoDefault(undefined)
            return
        }
        try {
            const blob = await fetchIconAsBlob(t.icon)
            onLogoDefault({ source: blob, kind: 'svg' })
        } catch {
            onLogoDefault(undefined)
        }
    }

    const switchCategory = (cat: Category) => {
        setCategory(cat)
        const first = typesByCategory(cat)[0]
        if (first) {
            setTypeId(first.id)
            void applyDefaultLogo(first)
        }
        onSerialize('')
    }

    const switchType = (id: string) => {
        setTypeId(id)
        void applyDefaultLogo(QR_TYPES_BY_ID[id])
        onSerialize('')
    }

    return (
        <div className="qr-content-builder">
            <div className="qr-content-builder__categories" role="tablist">
                {CATEGORIES.map(c => (
                    <button
                        key={c.id}
                        type="button"
                        role="tab"
                        aria-selected={c.id === category}
                        className={`qr-content-builder__category${c.id === category ? ' is-active' : ''}`}
                        onClick={() => switchCategory(c.id)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            <div className="qr-content-builder__types" role="tablist">
                {currentTypes.map(t => (
                    <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={t.id === typeId}
                        className={`qr-content-builder__type${t.id === typeId ? ' is-active' : ''}`}
                        onClick={() => switchType(t.id)}
                    >
                        {t.icon && (
                            <img
                                className="qr-content-builder__type-icon"
                                src={iconUrl(t.icon)}
                                alt=""
                                width={16}
                                height={16}
                            />
                        )}
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="qr-content-builder__form">
                <Form
                    key={typeId}
                    onSerialize={onSerialize}
                    onLogoOverride={onLogoDefault}
                />
            </div>
        </div>
    )
}
