import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
    const { isAuthenticated, isLoading, error } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            navigate('/');
        }
    }, [isAuthenticated, isLoading, error, navigate]);

    return (
        <div className="min-h-screen bg-[url('/bg-light-big.webp')] bg-repeat bg-cover bg-center flex items-center justify-center">
            <div className="text-yellow-900 text-2xl font-tomarik-brush">
                {isLoading ? 'Authenticating...' : error ? 'Authentication failed' : 'Redirecting...'}
            </div>
        </div>
    );
}
