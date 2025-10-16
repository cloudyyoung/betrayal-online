import { Client } from 'boardgame.io/react';
import { Betrayal } from './Game';

const App = Client({ game: Betrayal, debug: true, numPlayers: 4,  });

export default App;