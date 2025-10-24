import { type Server, Socket } from "socket.io";
import { GameStatus, ListGames, CreateGame, JoinGame } from "@betrayal/shared";
import { GameModel } from "./models";

export default (io: Server, socket: Socket) => {
    const listGames: ListGames = (_data, cb) => {
        const games = [
            { id: 'game-1', status: GameStatus.WAITING },
            { id: 'game-2', status: GameStatus.IN_PROGRESS }
        ];
        cb({ games });
    }

    const createGame: CreateGame = (data, cb) => {
        const game = new GameModel({
            password: data.password,
            status: GameStatus.WAITING,
            players: {},
            state: {}
        });
        const response: any = game.toObject();
        response.id = game._id.toString();
        response.isPasswordProtected = !!data.password;
        cb(response);
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