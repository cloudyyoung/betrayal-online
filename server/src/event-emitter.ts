import { EventEmitter } from 'events';

export const gameEvents = new EventEmitter();

export type GameEventMap = {
    'list:updated': [];
    [key: `game:${string}:updated`]: [];
};
