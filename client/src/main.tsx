import 'reflect-metadata'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import BetrayalCover from './cover'
import MatchesList from './view/matches'
import Match from './view/match'
import NewMatch from './view/new-match'
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
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<BetrayalCover />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/matches" element={<MatchesList />} />
              {/* <Route path="/matches/new" element={<NewMatch />} /> */}
              {/* <Route path="/matches/:matchID" element={<Match />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
