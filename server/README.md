# betrayal-online server

Simple Express + Socket.IO server used for local development.

Quick start

Install dependencies and run in dev mode:

```bash
cd server
npm install
npm run dev
```

Health check: GET /health

Socket.io endpoint: connect to the server root (ws/https) and emit "ping" to get a small ack.
