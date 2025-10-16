import { Client } from 'boardgame.io/react';
import { Betrayal } from './Game';

const App = Client({ game: Betrayal });

export default App;