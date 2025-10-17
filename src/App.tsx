import { Client } from 'boardgame.io/react';
import { Betrayal } from './Game';
import { Board } from './Board';

const App = Client({ game: Betrayal, board: Board, debug: true, numPlayers: 4, });

export default App;