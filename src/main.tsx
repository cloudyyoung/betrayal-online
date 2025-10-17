import 'reflect-metadata'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import BetrayalLobby from './lobby.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BetrayalLobby />
  </StrictMode>,
)
