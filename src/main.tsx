import 'reflect-metadata'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import BetrayalCover from './cover'
import BetrayalClient from './client'
import MatchesList from './view/matches'
import Match from './view/match'
import NewMatch from './view/new-match'
import { ProtectedRoute } from './auth/protected-route'
import { auth0Config } from './auth/auth0-config'
import { Auth0ContextProvider } from './auth/auth0-context'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      cacheLocation={auth0Config.cacheLocation}
    >
      <Auth0ContextProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<BetrayalCover />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/matches" element={<MatchesList />} />
                <Route path="/matches/new" element={<NewMatch />} />
                <Route path="/matches/:matchID" element={<Match />} />
                <Route path="/matches/:matchID/board" element={<BetrayalClient />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Auth0ContextProvider>
    </Auth0Provider>
  </StrictMode>,
)
