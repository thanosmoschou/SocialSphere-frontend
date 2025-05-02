import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useSearch } from '../../hooks/use-search';
import { User } from '../../types/types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/user-context';

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const { data, isLoading, error } = useSearch(debouncedTerm);
    const navigate = useNavigate();
    const { user: currentUser } = useUserContext();

    console.log("Search Results:", data);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleUserClick = (user: User) => {
        if (user.userId === currentUser?.userId) {
            navigate('/myprofile');
        } else {
            setSearchTerm(''); // Clear search
            navigate(`/profile/${user.userId}`); // Navigate to user profile
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users, posts, or topics..."
                    className="w-full bg-secondaryBlack text-white rounded-xl py-3 px-5 pl-12 text-lg 
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500
                             transition-all duration-200"
                />
                <SearchIcon className="absolute left-4 text-gray-400" />
            </div>

            {/* Search Results */}
            {searchTerm && (
                <div className="absolute w-full mt-2 bg-secondaryBlack rounded-xl shadow-lg 
                              border border-gray-700 max-h-96 overflow-y-auto z-50">
                    {isLoading ? (
                        <div className="p-4 text-gray-400">Searching...</div>
                    ) : error ? (
                        <div className="p-4 text-red-400">Error: {error.message}</div>
                    ) : data && data.length > 0 ? (
                        <div className="py-2">
                            {data.map((user: User, index: number) => (
                                <div
                                    key={user.userId}
                                    onClick={() => handleUserClick(user)}
                                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer 
                                             transition-colors duration-150 text-white flex items-center gap-3"
                                >
                                    <AccountCircleIcon className="text-gray-400 w-10 h-10" />
                                    <div className="flex flex-col gap-1">
                                        <div className="font-medium">{user.displayName || user.profileName}</div>
                                        {user.bio && (
                                            <div className="text-sm text-gray-400 line-clamp-1">{user.displayName}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : searchTerm && (
                        <div className="p-4 text-gray-400">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
}