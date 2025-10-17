import 'reflect-metadata'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import BetrayalCover from './cover.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BetrayalCover />
  </StrictMode>,
)
