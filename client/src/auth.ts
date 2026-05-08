export interface LocalAccount {
    id: string;
    name: string;
    email: string;
    token: string;
}

const AUTH_KEY = 'betrayal-account';

export const getStoredAccount = (): LocalAccount | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored) as LocalAccount;
    } catch {
        return null;
    }
};

export const storeAccount = (account: LocalAccount): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(account));
};

export const removeAccount = (): void => {
    localStorage.removeItem(AUTH_KEY);
};

export const getToken = (account: LocalAccount): string => account.token;
