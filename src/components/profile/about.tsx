import { userProfile } from "./profile";
import { useNavContext } from "../../store/nav-context";

export const About = () => {
    const context = useNavContext();
    const isOwnProfile = context.currentPage === "myprofile";

    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                    {isOwnProfile && (
                        <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                            <span>Edit</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Location</span>
                        <span className="text-gray-800">{userProfile.location}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Joined</span>
                        <span className="text-gray-800">{userProfile.joinedDate}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Username</span>
                        <span className="text-gray-800">{userProfile.username}</span>
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
                    {isOwnProfile && (
                        <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                            <span>Edit</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}
                </div>
                <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                    {isOwnProfile && (
                        <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                            <span>Edit</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TypeScript</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Node.js</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SQL</span>
                </div>
            </div>

            {/* Interests */}
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Interests</h2>
                    {isOwnProfile && (
                        <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                            <span>Edit</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Technology</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Programming</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Web Development</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">AI/ML</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Coffee</span>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
                    {isOwnProfile && (
                        <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
                            <span>Edit</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Email</span>
                        <span className="text-gray-800">dimsparagis@example.com</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">GitHub</span>
                        <a href="https://github.com/dimsparagis" className="text-blue-500 hover:underline">github.com/dimsparagis</a>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">LinkedIn</span>
                        <a href="https://linkedin.com/in/dimsparagis" className="text-blue-500 hover:underline">linkedin.com/in/dimsparagis</a>
                    </div>
                </div>
            </div>
        </div>
    );
};