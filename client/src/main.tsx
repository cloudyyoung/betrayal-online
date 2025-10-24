import 'reflect-metadata'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

import BetrayalCover from './cover'
import MatchesList from './view/matches'
import Match from './view/match'
import NewMatch from './view/new-match'
import { ProtectedRoute } from './contexts/protected-route'
import { AuthContextProvider } from './contexts/auth-context'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<BetrayalCover />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/matches" element={<MatchesList />} />
              <Route path="/matches/new" element={<NewMatch />} />
              <Route path="/matches/:matchID" element={<Match />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
