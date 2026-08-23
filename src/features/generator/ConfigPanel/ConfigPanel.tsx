import { useCallback } from 'react'
import { useTheme } from '../../../app/providers/theme'
import { iconUrl } from '../../../lib/icons'
import { TypePicker } from '../../qrTypes/TypePicker'
import { useLogoWarning } from '../useLogoWarning'
import { Section } from './Section'
import { LogoSection } from './sections/LogoSection'
import { ColorsSection } from './sections/ColorsSection'
import { StyleSection } from './sections/StyleSection'
import { OutputSection } from './sections/OutputSection'
import type { Params, UpdateParam } from '../../../core/params'
import './ConfigPanel.css'

interface ConfigPanelProps {
    params: Params
    update: UpdateParam
}

export function ConfigPanel({ params, update }: ConfigPanelProps) {
    const { theme, toggleTheme } = useTheme()
    useLogoWarning(params)

    const setData = useCallback((data: string) => update('data', data), [update])
    const setLogo = useCallback((logo: Params['logo']) => update('logo', logo), [update])

    return (
        <section className="config-panel">
            <header className="config-panel__header">
                <h1 className="config-panel__title">Damero</h1>
                <button
                    type="button"
                    className="config-panel__theme"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    <img src={iconUrl(theme === 'light' ? 'moon' : 'sun')} alt="" />
                </button>
            </header>

            <div className="config-panel__body">
                <Section title="Content">
                    <TypePicker onSerialize={setData} onLogo={setLogo} />
                </Section>

                <LogoSection params={params} update={update} />
                <ColorsSection params={params} update={update} />
                <StyleSection params={params} update={update} />
                <OutputSection params={params} update={update} />
            </div>
        </section>
    )
}
