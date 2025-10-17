import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Betrayal } from './game'
import { Board } from './board'

const BetrayalClient = Client({
    game: Betrayal,
    board: Board,
    debug: true,
    numPlayers: 4,
    multiplayer: SocketIO({ server: 'localhost:8000' })
});

export default BetrayalClient;
