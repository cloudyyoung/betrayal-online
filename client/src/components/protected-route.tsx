import { Outlet, useNavigate } from 'react-router-dom';
import { useTimeoutFn } from 'react-use';
import { useAuth } from './auth-provider';

export const ProtectedRoute = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useTimeoutFn(() => {
        if (!user) navigate('/');
    }, 500);

    return <Outlet />;
};
