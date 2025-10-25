import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSocketContext } from './socket';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0()
    const { connected } = useSocketContext()

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[url('/bg-light-big.webp')] bg-repeat bg-cover bg-center flex items-center justify-center">
                <div className="text-yellow-900 text-2xl font-tomarik-brush">Loading...</div>
            </div>
        )
    }

    if (!isAuthenticated || !connected) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
};
