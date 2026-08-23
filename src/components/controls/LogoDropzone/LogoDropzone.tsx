import { useRef, useState } from 'react'
import type { Logo } from '../../../core/params'
import { useObjectURL } from '../../../hooks/useObjectURL'
import { useToast } from '../../../providers/ToastProvider/ToastProvider'
import './LogoDropzone.css'

const ACCEPTED_MIME = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

interface LogoDropzoneProps {
    value: Logo | undefined
    onChange: (logo: Logo | undefined) => void
}

function toLogo(file: File): Logo | undefined {
    if (!ACCEPTED_MIME.includes(file.type)) return undefined
    return {
        source: file,
        kind: file.type === 'image/svg+xml' ? 'svg' : 'raster',
    }
}

export function LogoDropzone({ value, onChange }: LogoDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const previewUrl = useObjectURL(value?.source)
    const { show } = useToast()

    const handleFiles = (files: FileList | null) => {
        const file = files?.[0]
        if (!file) return
        const logo = toLogo(file)
        if (logo) {
            onChange(logo)
        } else {
            show(`"${file.name}" no es un formato admitido (PNG, JPEG, WebP, SVG).`, 'error')
        }
    }

    return (
        <div className="control">
            <span className="control__label">Logo</span>

            <div
                className={`logo-dropzone__area${isDragging ? ' is-dragging' : ''}`}
                onClick={() => inputRef.current?.click()}
                onDragEnter={e => { e.preventDefault(); setIsDragging(true) }}
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => {
                    e.preventDefault()
                    setIsDragging(false)
                    handleFiles(e.dataTransfer.files)
                }}
                title="PNG, JPEG, WebP, SVG"
            >
                {previewUrl ? (
                    <>
                        <img className="logo-dropzone__preview" src={previewUrl} alt="logo" />
                        <button
                            type="button"
                            className="logo-dropzone__remove"
                            onClick={e => { e.stopPropagation(); onChange(undefined) }}
                            aria-label="Remove logo"
                        >
                            ×
                        </button>
                    </>
                ) : (
                    <span className="logo-dropzone__hint">
                        Drop image here or click to select
                    </span>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPTED_MIME.join(',')}
                    style={{ display: 'none' }}
                    onChange={e => handleFiles(e.target.files)}
                />
            </div>
        </div>
    )
}
