import { Lobby } from 'boardgame.io/react';
import { Betrayal } from './game';
import { BetrayalBoard } from './board';


const BetrayalLobby = () => {
    return (
        <div>
            <h1>Lobby</h1>
            <Lobby
                gameServer={`https://${window.location.hostname}:8000`}
                lobbyServer={`https://${window.location.hostname}:8000`}
                gameComponents={[
                    { game: Betrayal, board: BetrayalBoard }
                ]}
            />
        </div>
    )
}

export default BetrayalLobby