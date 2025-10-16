// Game.ts
import type { Game, Move } from "boardgame.io";

export interface MyGameState {
  cells: (string | null)[];
}

const move: Move<MyGameState> = ({ G, ctx }) => {};

export const MyGame: Game<MyGameState> = {
  // ...
};

export const TicTacToe: typeof MyGame = {
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell: ({ G, playerID }, id) => {
      G.cells[id] = playerID;
    },
  },
};