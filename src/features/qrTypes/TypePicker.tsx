import { useState } from 'react'
import { CATEGORIES } from './types'
import type { CategoryId } from './types'
import { QR_TYPES, findType, typesOf } from './registry'
import { Icon } from '../../ui'
import type { Logo } from '../../core/params'
import './TypePicker.css'

interface TypePickerProps {
    onSerialize: (data: string) => void
    onLogo: (logo: Logo | undefined) => void
}

export function TypePicker({ onSerialize, onLogo }: TypePickerProps) {
    const [category, setCategory] = useState<CategoryId>(QR_TYPES[0].category)
    const [typeId, setTypeId] = useState<string>(QR_TYPES[0].id)

    const type = findType(typeId)
    const { Form } = type

    const selectCategory = (id: CategoryId) => {
        setCategory(id)
        setTypeId(typesOf(id)[0].id)
        onSerialize('')
    }

    const selectType = (id: string) => {
        setTypeId(id)
        onSerialize('')
    }

    return (
        <div className="type-picker">
            <div className="type-picker__categories" role="tablist">
                {CATEGORIES.map(c => (
                    <button
                        key={c.id}
                        type="button"
                        role="tab"
                        aria-selected={c.id === category}
                        className="type-picker__category"
                        onClick={() => selectCategory(c.id)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            <div className="type-picker__types" role="tablist">
                {typesOf(category).map(t => (
                    <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={t.id === typeId}
                        className="type-picker__type"
                        onClick={() => selectType(t.id)}
                    >
                        <Icon slug={t.icon} />
                        {t.label}
                    </button>
                ))}
            </div>

            <Form key={typeId} icon={type.icon} onSerialize={onSerialize} onLogo={onLogo} />
        </div>
    )
}
