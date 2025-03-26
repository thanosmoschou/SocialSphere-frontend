import ProfilePicture from '../../assets/profile-picture.png';
import { Link } from 'react-router-dom';
import { useNavContext } from '../../store/nav-context';

type Friend = {
    name: string;
    username: string;
    status: 'online' | 'offline';
    lastActive: string;
    mutualFriends: number;
}

const friends: Friend[] = [
    {
        name: "Andreas",
        username: "@andreas",
        status: "online",
        lastActive: "Active now",
        mutualFriends: 12
    },
    {
        name: "Thanos",
        username: "@thanos",
        status: "offline",
        lastActive: "Last seen 2h ago",
        mutualFriends: 8
    },
    {
        name: "Mike Johnson",
        username: "@mikej",
        status: "online",
        lastActive: "Active now",
        mutualFriends: 15
    },
    {
        name: "Sarah Wilson",
        username: "@sarahw",
        status: "offline",
        lastActive: "Last seen 1d ago",
        mutualFriends: 6
    }
];

export const Friends = () => {
    const context = useNavContext();
    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Friends</h1>
                <p className="text-gray-500 mt-1">Your social circle</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                {friends.map((friend: Friend, index: number) => (
                    <div 
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <img 
                                    src={ProfilePicture} 
                                    alt={friend.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                                    friend.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                                }`} />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-semibold text-gray-800">{friend.name}</h2>
                                <p className="text-sm text-gray-500">{friend.username}</p>
                                <p className={`text-sm mt-1 ${
                                    friend.status === 'online' ? 'text-green-500' : 'text-gray-500'
                                }`}>
                                    {friend.lastActive}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {friend.mutualFriends} mutual friends
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Link 
                                to={`/messages/${friend.name}`} 
                                className="flex-1 flex justify-center horizontal-gradient-primary text-white py-2 px-4 rounded-lg hover:opacity-80 hover:cursor-pointer transition-all duration-300"
                            >
                                Message
                            </Link>
                            <Link 
                                to={`/profile/${friend.name}`}
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