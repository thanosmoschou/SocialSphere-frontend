import { useUserContext } from "../../store/user-context";

export const About = () => {
    const { user } = useUserContext();

    console.log(user);

    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Location</span>
                        <span className="text-gray-800">{user?.location || "Not specified"}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Username</span>
                        <span className="text-gray-800">{user?.displayName || "Not specified"}</span>
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
                <p className="text-gray-700 leading-relaxed">{user?.bio || "No bio available"}</p>
            </div>

            {/* Skills */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {user?.skills && user.skills.length > 0 ? (
                        user.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-500">No skills added yet</p>
                    )}
                </div>
            </div>

            {/* Interests */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Interests</h2>
                <div className="flex flex-wrap gap-2">
                    {user?.interests && user.interests.length > 0 ? (
                        user.interests.map((interest, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                {interest}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-500">No interests added yet</p>
                    )}
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Email</span>
                        <span className="text-gray-800">{user?.email || "Not specified"}</span>
                    </div>
                    {(user?.userLinks[1]! && user?.userLinks[1].url !== null) && (
                        <div className="flex items-center">
                            <span className="w-24 text-gray-500">GitHub</span>
                            <a href={user.userLinks[0].url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                {user.userLinks[0].url.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </div>
                    )}
                    {(user?.userLinks[1]! && user?.userLinks[1].url !== null) && (
                        <div className="flex items-center">
                            <span className="w-24 text-gray-500">LinkedIn</span>
                            <a href={user.userLinks[1].url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                {user.userLinks[1].url.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};