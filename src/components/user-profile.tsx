import { useAuth0 } from '@auth0/auth0-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function UserProfile() {
    const { user, logout, isAuthenticated, isLoading } = useAuth0();

    if (isLoading || !isAuthenticated || !user) {
        return null;
    }

    return (
        <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <img
                    src={user.picture || '/default-avatar.png'}
                    alt={user.name || 'User'}
                    className="w-10 h-10 rounded-full border-2 border-yellow-700"
                />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <div className="py-1">
                    <MenuItem>
                        {({ focus }) => (
                            <button
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                className={`${focus ? 'bg-gray-100' : ''
                                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                            >
                                Sign out
                            </button>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}
