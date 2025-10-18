import { BoardProps } from "boardgame.io/dist/types/packages/react"
import { CharacterSelection } from "./view/character-selection"

export const BetrayalBoard = (board: BoardProps) => {
  const currentPhase = board.ctx.phase;

  if (currentPhase === "characterSelection") {
    return <CharacterSelection board={board} />;
  }

  return null
}
