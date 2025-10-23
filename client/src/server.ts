import { Server, Origins } from 'boardgame.io/server';
import { Betrayal } from './game';

const server = Server({
    games: [Betrayal],
    origins: [Origins.LOCALHOST],
});

server.run(8000);
