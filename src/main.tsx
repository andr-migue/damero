import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GeneratorPage } from './pages/GeneratorPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeneratorPage />
  </StrictMode>,
)
