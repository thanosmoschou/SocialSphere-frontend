import { User } from "../../types/types";

type AboutProps = {
    user: User;
}

export const About = (props : AboutProps) => {
    console.log(props);
    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Location</span>
                        <span className="text-gray-800">{props.user?.location || "Not specified"}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 text-gray-500">Username</span>
                        <span className="text-gray-800">{props.user?.displayName || "Not specified"}</span>
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
                <p className="text-gray-700 leading-relaxed">{props.user?.bio || "No bio available"}</p>
            </div>

            {/* Skills */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {props.user?.skills && props.user.skills.length > 0 ? (
                        props.user.skills.map((skill, index) => (
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
                    {props.user?.interests && props.user.interests.length > 0 ? (
                        props.user.interests.map((interest, index) => (
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
                        <span className="text-gray-800">{props.user?.email || "Not specified"}</span>
                    </div>
                    {(props.user?.userLinks[1]! && props.user?.userLinks[1].url !== null) && (
                        <div className="flex items-center">
                            <span className="w-24 text-gray-500">GitHub</span>
                            <a href={props.user.userLinks[0].url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                {props.user.userLinks[0].url.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </div>
                    )}
                    {(props.user?.userLinks[1]! && props.user?.userLinks[1].url !== null) && (
                        <div className="flex items-center">
                            <span className="w-24 text-gray-500">LinkedIn</span>
                            <a href={props.user.userLinks[1].url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                {props.user.userLinks[1].url.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};