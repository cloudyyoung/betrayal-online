export interface User {
    id: string;
    name: string;
    email: string;
}

const AUTH_KEY = 'betrayal-user';

export const getStoredUser = (): User | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored) as User;
    } catch {
        return null;
    }
};

export const storeUser = (user: User): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const removeUser = (): void => {
    localStorage.removeItem(AUTH_KEY);
};

export const encodeToken = (user: User): string => btoa(JSON.stringify(user));
