import { useState } from 'react'
import { QRForm } from '../QRForm/QRForm'

interface Props {
    onSerialize: (data: string) => void
}

interface VcardState {
    firstName: string
    lastName: string
    phone: string
    email: string
    organization: string
    title: string
    url: string
    address: string
    notes: string
}

const DEFAULTS: VcardState = {
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

// Escape vCard special chars: \ ; , newline
function escape(v: string): string {
    return v
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;')
}

function build(v: VcardState): string {
    const fn = [v.firstName, v.lastName].filter(Boolean).join(' ').trim()
    const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0']
    if (fn) lines.push(`FN:${escape(fn)}`)
    if (v.lastName || v.firstName) {
        lines.push(`N:${escape(v.lastName)};${escape(v.firstName)};;;`)
    }
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

export function VcardForm({ onSerialize }: Props) {
    const [state, setState] = useState<VcardState>(DEFAULTS)
    const set = <K extends keyof VcardState>(key: K, value: VcardState[K]) =>
        setState(prev => ({ ...prev, [key]: value }))

    const submit = () => {
        if (!state.firstName && !state.lastName) return
        onSerialize(build(state))
    }

    return (
        <QRForm onSubmit={submit} disabled={!state.firstName && !state.lastName}>
            <div className="qr-form__row">
                <label className="control">
                    <span className="control__label">First name</span>
                    <input
                        className="control__input"
                        value={state.firstName}
                        onChange={e => set('firstName', e.target.value)}
                    />
                </label>
                <label className="control">
                    <span className="control__label">Last name</span>
                    <input
                        className="control__input"
                        value={state.lastName}
                        onChange={e => set('lastName', e.target.value)}
                    />
                </label>
            </div>
            <label className="control">
                <span className="control__label">Phone</span>
                <input
                    className="control__input"
                    type="tel"
                    value={state.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="+34 600 000 000"
                />
            </label>
            <label className="control">
                <span className="control__label">Email</span>
                <input
                    className="control__input"
                    type="email"
                    value={state.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="foo@bar.com"
                />
            </label>
            <div className="qr-form__row">
                <label className="control">
                    <span className="control__label">Organization</span>
                    <input
                        className="control__input"
                        value={state.organization}
                        onChange={e => set('organization', e.target.value)}
                    />
                </label>
                <label className="control">
                    <span className="control__label">Title</span>
                    <input
                        className="control__input"
                        value={state.title}
                        onChange={e => set('title', e.target.value)}
                    />
                </label>
            </div>
            <label className="control">
                <span className="control__label">Website</span>
                <input
                    className="control__input"
                    type="url"
                    value={state.url}
                    onChange={e => set('url', e.target.value)}
                    placeholder="https://…"
                />
            </label>
            <label className="control">
                <span className="control__label">Address</span>
                <input
                    className="control__input"
                    value={state.address}
                    onChange={e => set('address', e.target.value)}
                />
            </label>
            <label className="control">
                <span className="control__label">Notes</span>
                <textarea
                    className="control__input"
                    rows={2}
                    value={state.notes}
                    onChange={e => set('notes', e.target.value)}
                />
            </label>
        </QRForm>
    )
}
