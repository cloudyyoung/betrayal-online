import { BoardProps } from "boardgame.io/dist/types/packages/react"
import { CharacterSelection } from "./view/CharacterSelection"

export const Board = (board: BoardProps) => {
  const currentPhase = board.ctx.phase;

  if (currentPhase === "characterSelection") {
    return <CharacterSelection board={board} />;
  }

  return null
}
