import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/auth-provider'
import TrpcProvider from './components/trpc-provider'

import BetrayalCover from './cover'
import GamesList from './view/games'
import Game from './view/game'
import NewGame from './view/new-game'
import { ProtectedRoute } from './components/protected-route'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TrpcProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<BetrayalCover />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/games" element={<GamesList />} />
                <Route path="/games/new" element={<NewGame />} />
                <Route path="/games/:gameId" element={<Game />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TrpcProvider>
    </AuthProvider>
  </StrictMode>,
)
