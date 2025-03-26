import ProfilePicture from '../../assets/profile-picture.png';
import { Link } from 'react-router-dom';

interface MessagePreview {
    recipientName: string;
    lastMessage: string;
    time: string;
    unread?: boolean;
}

const messagesList: MessagePreview[] = [
    {
        recipientName: "Andreas",
        lastMessage: "Ok nice to hear that!",
        time: "2:30 PM",
        unread: true
    },
    {
        recipientName: "Thanos",
        lastMessage: "I am fine, thanks for asking!",
        time: "11:45 AM"
    },
];

export const MessageList = () => {
    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
            <header className="p-6">
                <h1 className="text-2xl font-semibold text-gray-800">My messages</h1>
                <p className="text-gray-500 mt-1">Chat with your friends</p>
            </header>
            <div className="flex-1 overflow-y-auto">
                {messagesList.map((message, index) => (
                    <Link
                        to={`/messages/${message.recipientName}`}
                        key={index}
                        className="w-full p-6 flex items-center gap-x-4 hover:bg-gray-50 hover:cursor-pointer rounded-lg border-b border-gray-100 transition-colors"
                    >
                        <div className="relative">
                            <img 
                                src={ProfilePicture} 
                                alt={message.recipientName} 
                                className="w-12 h-12 rounded-full"
                            />
                            {message.unread && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                            )}
                        </div>
                        
                        <div className="flex-1 text-left">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {message.recipientName}
                                </h3>
                                <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className={`text-sm truncate ${message.unread ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                {message.lastMessage}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};