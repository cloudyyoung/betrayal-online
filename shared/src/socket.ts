import { Account } from "./account";
import { Game } from "./game";

export interface ServerToClientEvents { }
export interface ClientToServerEvents extends ListGames, CreateGame, JoinGame { }
export interface InterServerEvents { }
export interface SocketData { account: Account }

export type ListGames = (data: any, callback: (data: { games: Array<Game> }) => void) => void;
export type CreateGame = (data: any, callback: (data: { game: Game }) => void) => void;
export type JoinGame = (data: { gameId: string }, callback: (data: any) => void) => void;
