export interface LocalAccount {
    id: string;
    name: string;
    email: string;
    token: string;
}

const AUTH_KEY = 'betrayal-account';

export const getStoredUser = (): LocalAccount | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored) as LocalAccount;
    } catch {
        return null;
    }
};

export const storeUser = (user: LocalAccount): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const removeUser = (): void => {
    localStorage.removeItem(AUTH_KEY);
};

export const encodeToken = (user: LocalAccount): string => user.token;
