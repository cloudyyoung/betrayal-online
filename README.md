# Betrayal at the House on the Hill - Online Edition

An unofficial, scripted online web version of Betrayal at the House on the Hill (3rd Edition), featuring multiplayer gameplay powered by boardgame.io and secure authentication with Auth0.

## Features

- 🎮 Full multiplayer support for 3-6 players
- 🔐 Secure authentication with Auth0
- 🍎 Sign in with Apple
- 🔍 Sign in with Google  
- 🪟 Sign in with Microsoft
- 🎲 Real-time gameplay synchronization
- 📱 Responsive design for desktop and mobile

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Auth0 account (free tier available)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd betrayal-at-the-house-on-the-hill
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Auth0**
   
   Follow the detailed setup guide in [AUTH0_SETUP.md](./AUTH0_SETUP.md) to:
   - Create an Auth0 application
   - Enable Google, Apple, and Microsoft social connections
   - Configure callback URLs and settings

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Auth0 credentials:
   ```env
   VITE_AUTH0_DOMAIN=your-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id
   ```

5. **Run the development servers**
   
   Terminal 1 - Frontend:
   ```bash
   npm run dev
   ```
   
   Terminal 2 - Backend:
   ```bash
   npm run serve
   ```

6. **Open the app**
   
   Visit `http://localhost:5173` in your browser

## Project Structure

```
src/
├── auth/                   # Authentication components
│   ├── auth0-config.ts    # Auth0 configuration
│   └── protected-route.tsx # Route protection wrapper
├── components/            # Reusable UI components
│   ├── button.tsx
│   ├── character-card.tsx
│   └── user-profile.tsx   # User profile dropdown
├── logic/                 # Game logic
│   ├── board.ts
│   ├── cards.ts
│   ├── character.ts
│   ├── haunt.ts
│   ├── player.ts
│   └── types.ts
├── view/                  # Page components
│   ├── character-selection.tsx
│   ├── join-match.tsx
│   ├── login.tsx          # Auth0 login page
│   ├── matches.tsx
│   └── new-game.tsx
├── board.tsx              # Game board component
├── client.tsx             # boardgame.io client setup
├── cover.tsx              # Landing page
├── game.ts                # Game definition
├── main.tsx               # App entry point
└── server.ts              # Game server
```

## Authentication Flow

1. User visits the app and is redirected to `/login`
2. User chooses a social login provider (Google, Apple, or Microsoft)
3. Auth0 handles the OAuth flow
4. Upon successful authentication, user is redirected back to the app
5. Protected routes are now accessible
6. User profile appears in the top-right corner

## Available Scripts

- `npm run dev` - Start Vite development server (frontend)
- `npm run build` - Build for production
- `npm run build:server` - Build the game server
- `npm run serve` - Build and run the game server
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Game Engine**: boardgame.io
- **Authentication**: Auth0
- **Server**: Koa
- **UI Components**: Headless UI
- **Testing**: Jest, React Testing Library

## Security Notes

- Never commit `.env` files to version control
- Auth0 credentials should be kept secret
- For production, use environment-specific Auth0 applications
- Update Auth0 callback URLs for production domains
- Consider implementing rate limiting on the server
- Review Auth0 security best practices before deploying

## Production Deployment

1. Set up Auth0 production application with production URLs
2. Configure environment variables in your hosting platform
3. Build the app: `npm run build`
4. Build the server: `npm run build:server`
5. Deploy both frontend and backend
6. Ensure the backend is accessible from the frontend

## Troubleshooting

### Authentication Issues

See [AUTH0_SETUP.md](./AUTH0_SETUP.md#troubleshooting) for common authentication problems and solutions.

### Game Connection Issues

- Verify both frontend and backend servers are running
- Check that the server URL in `src/client.tsx` matches your backend
- Ensure ports 5173 (frontend) and 8000 (backend) are available

## Disclaimer

This is an unofficial, fan-made version of Betrayal at the House on the Hill (3rd Edition), created for personal and educational use only. All rights belong to Avalon Hill and Hasbro, Inc. This project is not affiliated with or endorsed by either company. Please support the official release by purchasing the game through authorized retailers.

## License

This project is for educational purposes only.

## Contributing

This is a personal project, but suggestions and bug reports are welcome through issues.

