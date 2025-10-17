import 'reflect-metadata'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import BetrayalClient from './client.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BetrayalClient />
  </StrictMode>,
)
