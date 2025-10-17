import { BoardProps } from "boardgame.io/dist/types/packages/react"
import { CharacterSelection } from "./view/CharacterSelection"

export const Board = ({ ctx }: BoardProps) => {
  const currentPhase = ctx.phase;

  if (currentPhase === "characterSelection") {
    return <CharacterSelection />
  }

  return null
}
