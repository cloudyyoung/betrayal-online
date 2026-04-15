import { Outlet, useNavigate } from 'react-router-dom';
import { useTimeoutFn } from 'react-use';
import { useAuth0 } from '@auth0/auth0-react';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useTimeoutFn(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/');
        }
    }, 2000);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[url('/bg-light-big.jpg')] bg-repeat bg-cover bg-center flex items-center justify-center">
                <div className="text-yellow-900 text-2xl font-tomarik-brush">Loading...</div>
            </div>
        )
    }

    return <Outlet />
};
