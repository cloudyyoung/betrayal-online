import 'reflect-metadata'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import TrpcProvider from './components/trpc-provider'

import BetrayalCover from './cover'
import GamesList from './view/games'
import Game from './view/game'
import NewGame from './view/new-game'
import { ProtectedRoute } from './components/protected-route'

import './index.css'

const auth0Config = {
  domain: 'cloudyyoung.auth0.com',
  clientId: 'bRRsWWsltUM6Czuus0TP6gH6vu88ebx8',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: `https://cloudyyoung.auth0.com/api/v2/`,
  },
  cacheLocation: 'localstorage' as const,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      cacheLocation={auth0Config.cacheLocation}
    >
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
    </Auth0Provider>
  </StrictMode>,
)
