import { ActivePlayers } from 'boardgame.io/core';
import { Player } from "./logic/player";
import type { BetrayalGame } from "./logic/types";
import { getCharacterById } from './logic/character';


export const Betrayal: typeof BetrayalGame = {
  name: "betrayal-at-the-house-on-the-hill-3rd-edition",

  setup: (_, setupData) => {
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
        chooseCharacter: ({G, ctx, playerID}, characterId) => {
          console.log(G, ctx, playerID)
          G.players[playerID] = JSON.parse(JSON.stringify(new Player(playerID, characterId)));
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