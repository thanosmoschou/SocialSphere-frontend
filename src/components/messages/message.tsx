import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { messages } from '../../../data/data';
import ProfilePicture from '../../assets/profile-picture.png';
import { Link, useParams } from 'react-router-dom';
type Message = {
    name: string;
    message: string;
    time: string;
}

export const Message = () => {
    const { id } = useParams();
    const message = messages.find((message) => message.recipient === id);

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
            {/* Messages Header */}
            <div className="p-4 flex items-center gap-x-2">
                <Link to="/messages" className="flex items-center gap-x-2">
                    <ArrowBackIosNewIcon />
                </Link>
                <h2 className="text-xl font-semibold text-gray-800">{message?.recipient}</h2>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {message?.conversation.map((message: Message, index: number) => (
                    <div 
                        key={index}
                        className={`flex items-center gap-x-3  ${
                            message.name === "Dimitris" ? "flex-row-reverse " : ""
                        }`}
                    >
                        <img src={ProfilePicture} alt="Profile" className={`rounded-lg w-[5rem] aspect-square`}/>
                        <div className="">
                            <div className={`rounded-lg p-3 ${
                                message.name === "Dimitris" 
                                    ? "bg-blue-500" 
                                    : "bg-gray-100"
                            }`}>
                                <p className={`text-sm ${
                                    message.name === "Dimitris" 
                                        ? "text-white" 
                                        : "text-gray-800"
                                }`}>
                                    {message.message}
                                </p>
                                <span className={`text-xs ${
                                    message.name === "Dimitris" 
                                        ? "text-blue-100" 
                                        : "text-gray-500"
                                }`}>
                                    {message.time}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};