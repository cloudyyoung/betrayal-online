import 'reflect-metadata'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import BetrayalCover from './cover'
import BetrayalClient from './client'
import NewGame from './view/new-game'
import MatchesList from './view/matches'
import JoinMatch from './view/join-match'
import { ProtectedRoute } from './auth/protected-route'
import { auth0Config } from './auth/auth0-config'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      cacheLocation={auth0Config.cacheLocation}
    >
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<BetrayalCover />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/games/new" element={<NewGame />} />
              <Route path="/games" element={<MatchesList />} />
              <Route path="/games/:matchID" element={<JoinMatch />} />
              <Route path="/games/:matchID/board" element={<BetrayalClient />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
