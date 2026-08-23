import { useRef, useState } from 'react'
import { useObjectURL } from '../hooks/useObjectURL'

interface DropzoneProps {
    label: string
    accept: readonly string[]
    file: Blob | undefined
    hint?: string
    onSelect: (file: File) => void
    onClear: () => void
    onReject?: (file: File) => void
}

export function Dropzone({
    label, accept, file, hint = 'Drop an image or click to select',
    onSelect, onClear, onReject,
}: DropzoneProps) {
    const [dragging, setDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const preview = useObjectURL(file)

    const handle = (files: FileList | null) => {
        const picked = files?.[0]
        if (!picked) return
        if (accept.includes(picked.type)) onSelect(picked)
        else onReject?.(picked)
    }

    return (
        <div className="dropzone">
            <span className="dropzone__label">{label}</span>
            <div
                className={`dropzone__area${dragging ? ' is-dragging' : ''}`}
                onClick={() => inputRef.current?.click()}
                onDragEnter={e => { e.preventDefault(); setDragging(true) }}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => {
                    e.preventDefault()
                    setDragging(false)
                    handle(e.dataTransfer.files)
                }}
            >
                {preview ? (
                    <>
                        <img className="dropzone__preview" src={preview} alt="" />
                        <button
                            type="button"
                            className="dropzone__clear"
                            aria-label={`Remove ${label.toLowerCase()}`}
                            onClick={e => { e.stopPropagation(); onClear() }}
                        >
                            ×
                        </button>
                    </>
                ) : (
                    <span className="dropzone__hint">{hint}</span>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept.join(',')}
                    hidden
                    onChange={e => handle(e.target.files)}
                />
            </div>
        </div>
    )
}
