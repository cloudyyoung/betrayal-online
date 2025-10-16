import type { BetrayalGame } from "./logic/types";


export const Betrayal: typeof BetrayalGame = {
  name: "Betrayal at the House on the Hill (3rd Edition)",

  setup: (_, setupData) => {
    return { haunt: undefined, scenarioCard: setupData!.scenarioCard, players: setupData!.players }
  },

  phases: {
    prehaunt: {
      start: true,
      endIf: ({G}) => G.haunt !== undefined,
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