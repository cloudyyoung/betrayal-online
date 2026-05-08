import React, { createContext, useContext, useState } from 'react';
import { type LocalAccount, getStoredAccount, storeAccount, removeAccount } from '../auth';

interface AuthContextValue {
    user: LocalAccount | null;
    login: (user: LocalAccount) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(undefined!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<LocalAccount | null>(getStoredAccount);

    const login = (user: LocalAccount) => {
        storeAccount(user);
        setUser(user);
    };

    const logout = () => {
        removeAccount();
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
