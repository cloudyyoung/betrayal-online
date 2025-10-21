import 'reflect-metadata'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useSearchParams, Navigate } from 'react-router-dom'

import BetrayalCover from './cover'
import BetrayalClient from './client'
import NewGame from './view/new-game'
import MatchesList from './view/matches'
import JoinMatch from './view/join-match'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BetrayalCover />} />
          <Route path="/new" element={<NewGame />} />
          <Route path="/matches" element={<MatchesList />} />
          <Route path="/join/:matchID" element={<JoinMatch />} />
          <Route path="/play" element={<PlayWrapper />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)

function PlayWrapper() {
  const [params] = useSearchParams()
  const matchID = params.get('matchID')
  const playerID = params.get('playerID') ?? '0'
  const credentials = params.get('credentials') ?? undefined

  if (!matchID) return <Navigate to="/" replace />

  // In case BetrayalClient supports props later, we could pass these via context or props.
  // For now, it mounts the boardgame.io client configured with multiplayer SocketIO, which
  // will pick up the server and match when used.
  // Optionally we can store these in sessionStorage for later steps.
  try {
    sessionStorage.setItem('betrayal.matchID', matchID)
    sessionStorage.setItem('betrayal.playerID', playerID)
    if (credentials) sessionStorage.setItem('betrayal.credentials', credentials)
  } catch { }

  return <BetrayalClient />
}
