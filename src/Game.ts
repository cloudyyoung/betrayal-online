import { ActivePlayers } from 'boardgame.io/core';
import { instanceToPlain } from 'class-transformer';

import type { BetrayalGame } from "./logic/types";
import { Player } from './logic/player';


export const Betrayal: typeof BetrayalGame = {
  name: "betrayal-at-the-house-on-the-hill-3rd-edition",

  setup: (_, __) => {
    return { scenarioCard: undefined, players: {}, haunt: undefined };
  },

  minPlayers: 3,
  maxPlayers: 6,

  phases: {
    characterSelection: {
      start: true,
      next: 'scenarioSelection',
      turn: {
        activePlayers: ActivePlayers.ALL,
        minMoves: 1,
      },
      moves: {
        chooseCharacter: ({ G, playerID }, characterId) => {
          const player = new Player({ id: playerID, characterId });
          const plain = instanceToPlain(player)
          G.players[playerID] = plain
        },

      },
    },
    scenarioSelection: {
      next: 'prehaunt',
    },
    prehaunt: {
      next: 'hauntSetup',
      endIf: ({ G }) => G.haunt !== undefined,
      moves: {

      }
    },
    hauntSetup: {
      next: 'haunt',
    },
    haunt: {
      next: 'end',
    },
    end: {},
  },
};