import 'reflect-metadata'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BetrayalCover from './cover'
import BetrayalClient from './client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BetrayalCover />} />
          <Route path="/play" element={<BetrayalClient />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
