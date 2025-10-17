import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Betrayal } from './game'
import { BetrayalBoard } from './board'

const BetrayalClient = Client({
    game: Betrayal,
    board: BetrayalBoard,
    debug: true,
    numPlayers: 4,
    multiplayer: SocketIO({ server: 'localhost:8000' })
});

export default BetrayalClient;
