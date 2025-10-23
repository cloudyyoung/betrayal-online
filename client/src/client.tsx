import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Betrayal } from './game'
import { BetrayalBoard } from './board'

const serverUrl = `http://${window.location.hostname}:8000`

const BetrayalClient = Client({
    game: Betrayal,
    board: BetrayalBoard,
    debug: true,
    multiplayer: SocketIO({ server: serverUrl })
});

export default BetrayalClient;
