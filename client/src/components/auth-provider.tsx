import React, { createContext, useContext, useState } from 'react';
import { type LocalAccount, getStoredUser, storeUser, removeUser } from '../auth';

interface AuthContextValue {
    user: LocalAccount | null;
    login: (user: LocalAccount) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(undefined!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<LocalAccount | null>(getStoredUser);

    const login = (user: LocalAccount) => {
        storeUser(user);
        setUser(user);
    };

    const logout = () => {
        removeUser();
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
