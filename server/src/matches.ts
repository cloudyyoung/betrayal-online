import { type Server, Socket } from "socket.io";
import { Match, MatchStatus, ListMatches, CreateMatch, JoinMatch  } from "./types";

export default (io: Server, socket: Socket) => {
    const listMatches: ListMatches = (_data, cb) => {
        const matches = [
            { id: 'match-1', players: 2, status: MatchStatus.WAITING },
            { id: 'match-2', players: 4, status: MatchStatus.IN_PROGRESS }
        ];
        cb({ matches });
    }

    const createMatch: CreateMatch = (data, cb) => {
        const newMatch = {
            id: `match-${Math.floor(Math.random() * 1000)}`,
            players: 1,
            status: MatchStatus.WAITING,
            ...data
        };
        cb({ match: newMatch });
    }

    const joinMatch: JoinMatch = (data, cb) => {
        const { matchId, playerName } = data;
        const response = {
            matchId,
            playerName,
            status: MatchStatus.WAITING
        };
        cb(response);
    }

    socket.on("list-matches", listMatches);
    socket.on("create-match", createMatch);
    socket.on("join-match", joinMatch);
}