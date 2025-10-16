// Game.ts
import type { Game } from "boardgame.io";

export interface BetrayalGameState {
  scenario?: number;
}

export const BetrayalGame: Game<BetrayalGameState> = {};

export const Betrayal: typeof BetrayalGame = {
  setup: () => ({ scenario: undefined }),

  phases: {
    prehaunt: {
      start: true,
      endIf: ({G}) => G.scenario !== undefined,
    },
    hauntSetup: {

    },
    haunt: {

    }
  },

  moves: {
    clickCell: ({ G, playerID }, id) => {
      console.log(`Player ${playerID} clicked on cell ${id}`);
    },
  },
};