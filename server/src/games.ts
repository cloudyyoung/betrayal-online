import { type Server, Socket } from "socket.io";
import { Game, GameStatus, ListGames, CreateGame, JoinGame } from "@betrayal/shared";

export default (io: Server, socket: Socket) => {
    const listGames: ListGames = (_data, cb) => {
        const games = [
            { id: 'game-1', status: GameStatus.WAITING },
            { id: 'game-2', status: GameStatus.IN_PROGRESS }
        ];
        cb({ games });
    }

    const createGame: CreateGame = (data, cb) => {
        const newGame = {
            id: `game-${Math.floor(Math.random() * 1000)}`,
            players: 1,
            status: GameStatus.WAITING,
            ...data
        };
        cb({ game: newGame });
    }

    const joinGame: JoinGame = (data, cb) => {
        const { gameId } = data;
        const response = {
            gameId,
            status: GameStatus.WAITING
        };
        cb(response);
    }

    socket.on("list-games", listGames);
    socket.on("create-game", createGame);
    socket.on("join-game", joinGame);
}