import ProfilePicture from '../../assets/profile-picture.png';
import { Link } from 'react-router-dom';
import { useNavContext } from '../../store/nav-context';
import { useFriends } from '../../hooks/use-friends';
import { useUserContext } from '../../store/user-context';
import { User } from '../../types/types';

export const Friends = () => {
    const context = useNavContext();
    const { user } = useUserContext();
    const { data, isLoading, error } = useFriends();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const filteredFriends = data?.filter((friend: User ) => friend.userId !== user?.userId);

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Friends</h1>
                <p className="text-gray-500 mt-1">Your social circle</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                {filteredFriends.map((friend: User, index: number) => (
                    <div 
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <img 
                                    src={ProfilePicture} 
                                    alt={friend.profileName}
                                    className="w-16 aspect-square rounded-full"
                                />
                                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                                    'online' === 'online' ? 'bg-green-500' : 'bg-gray-300'
                                }`} />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <h2 className="font-semibold text-gray-800">{friend.profileName}</h2>
                                <p className="text-sm text-gray-500">{friend.displayName}</p>
                                <p className={`text-sm mt-1 ${
                                    'online' === 'online' ? 'text-green-500' : 'text-gray-500'
                                }`}>
                                    2h ago
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    0 mutual friends
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2 2xl:flex-row flex-col">
                            <Link 
                                to={`/messages/${friend.userId}`} 
                                className="flex-1 flex justify-center horizontal-gradient-primary text-white py-2 px-4 rounded-lg hover:opacity-80 hover:cursor-pointer transition-all duration-300
                                
                                "
                            >
                                Message
                            </Link>
                            <Link 
                                to={`/profile/${friend.userId}`}
                                className="flex-1 flex justify-center border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors"
                                onClick={() => context.setCurrentPage("friends")}
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};