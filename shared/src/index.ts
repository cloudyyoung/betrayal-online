export interface ServerToClientEvents { }
export interface ClientToServerEvents extends ListMatches, CreateMatch, JoinMatch { }
export interface InterServerEvents { }
export interface SocketData { account: IAccount }


export type Match = {
    id: string;
    players: number;
    status: MatchStatus;
}

export enum MatchStatus {
    WAITING = 'waiting',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
}

export type ListMatches = (data: any, callback: (data: { matches: Array<Match> }) => void) => void;
export type CreateMatch = (data: Partial<Match>, callback: (data: { match: Match }) => void) => void;
export type JoinMatch = (data: { matchId: string; playerName: string }, callback: (data: any) => void) => void;

export interface IAccount extends Document {
    given_name: string;
    family_name: string;
    name: string;
    nickname: string;
    picture: string;
    updated_at: Date;
    email: string;
    email_verified: boolean;
    sub: string;
}