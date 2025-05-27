import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useSearch } from '../../hooks/use-search';
import { User, Post } from '../../types/types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const { data, isLoading, error } = useSearch(debouncedTerm);
    const navigate = useNavigate();

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleUserClick = (user: User) => {
        setSearchTerm('');
        setIsFocused(false);
        navigate(`/profile/${user.userId}`);
    };

    const handlePostClick = (post: Post) => {
        setSearchTerm('');
        setIsFocused(false);
        const creatorId = typeof post.creator === 'number' ? post.creator : post.creator.userId;
        navigate(`/profile/${creatorId}`);
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className={`relative flex items-center transition-all duration-300 ${
                isFocused ? 'scale-105' : 'scale-100'
            }`}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        // Small delay to allow click events to fire
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    placeholder="Search users or posts..."
                    className="w-full bg-secondaryBlack/80 backdrop-blur-sm text-white rounded-2xl py-3.5 px-5 pl-12 text-lg 
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                             transition-all duration-300 shadow-lg"
                />
                <SearchIcon className="absolute left-4 text-gray-400 transition-colors duration-300 group-hover:text-primary" />
            </div>

            {/* Search Results */}
            {searchTerm && isFocused && (
                <div className="absolute w-full mt-3 bg-secondaryBlack/95 backdrop-blur-md rounded-2xl shadow-xl 
                              border border-gray-700/50 max-h-[70vh] overflow-y-auto z-50
                              transition-all duration-300 transform origin-top
                              animate-in fade-in slide-in-from-top-2">
                    {isLoading ? (
                        <div className="p-6 text-gray-400 flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span>Searching...</span>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-red-400 flex items-center justify-center gap-2">
                            <span className="text-lg">⚠️</span>
                            <span>Error: {error.message}</span>
                        </div>
                    ) : data ? (
                        <div className="py-2">
                            {/* Users Section */}
                            {data.users && data.users.length > 0 && (
                                <>
                                    <div className="px-6 py-3 text-gray-400 text-sm font-medium border-b border-gray-700/50">
                                        Users
                                    </div>
                                    {data.users.map((user: User) => (
                                        <div
                                            key={user.userId}
                                            onClick={() => handleUserClick(user)}
                                            className="px-6 py-3 hover:bg-gray-800/50 cursor-pointer 
                                                     transition-all duration-200 text-white flex items-center gap-4
                                                     group"
                                        >
                                            <div className="relative">
                                                <AccountCircleIcon className="text-gray-400 w-10 h-10 transition-colors duration-200 group-hover:text-primary" />
                                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-secondaryBlack" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="font-medium group-hover:text-primary transition-colors duration-200">
                                                    {user.profileName}
                                                </div>
                                                {user.bio && (
                                                    <div className="text-sm text-gray-400 line-clamp-1 group-hover:text-gray-300 transition-colors duration-200">
                                                        {user.bio}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            {/* Posts Section */}
                            {data.posts && data.posts.length > 0 && (
                                <>
                                    <div className="px-6 py-3 text-gray-400 text-sm font-medium border-b border-gray-700/50">
                                        Posts
                                    </div>
                                    {data.posts.map((post: Post) => (
                                        <div
                                            key={post.postId}
                                            onClick={() => handlePostClick(post)}
                                            className="px-6 py-3 hover:bg-gray-800/50 cursor-pointer 
                                                     transition-all duration-200 text-white flex items-center gap-4
                                                     group"
                                        >
                                            <ArticleIcon className="text-gray-400 w-10 h-10 transition-colors duration-200 group-hover:text-primary" />
                                            <div className="flex flex-col gap-1">
                                                <div className="font-medium line-clamp-1 group-hover:text-primary transition-colors duration-200">
                                                    {post.content}
                                                </div>
                                                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                                                    {post.usersLiked.length} likes • {post.comments.length} comments
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            {/* No Results */}
                            {(!data.users || data.users.length === 0) && 
                             (!data.posts || data.posts.length === 0) && (
                                <div className="p-6 text-gray-400 flex items-center justify-center gap-2">
                                    <span className="text-lg">🔍</span>
                                    <span>No results found</span>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}