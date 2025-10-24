export interface Account {
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