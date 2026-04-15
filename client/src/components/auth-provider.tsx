import React, { createContext, useContext, useState } from 'react';
import { type User, getStoredUser, storeUser, removeUser } from '../auth';

interface AuthContextValue {
    user: User | null;
    login: (name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(undefined!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(getStoredUser);

    const login = (name: string) => {
        const existing = getStoredUser();
        const newUser: User = { id: existing?.id ?? crypto.randomUUID(), name };
        storeUser(newUser);
        setUser(newUser);
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
