import type { ReactNode } from 'react'

interface SectionProps {
    title: string
    children: ReactNode
}

export function Section({ title, children }: SectionProps) {
    return (
        <section className="section">
            <h3 className="section__title">{title}</h3>
            <div className="section__body">{children}</div>
        </section>
    )
}
