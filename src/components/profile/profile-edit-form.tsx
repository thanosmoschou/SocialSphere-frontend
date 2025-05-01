import { useState } from "react";
import { useUserContext } from "../../store/user-context";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdatePrimaryInfo } from "../../features/use-update-primary-info";

interface ProfileEditFormProps {
    onClose: () => void;
}

export const ProfileEditForm = ({ onClose }: ProfileEditFormProps) => {
    const { user, setUser } = useUserContext();
    const [profileName, setProfileName] = useState(user?.profileName || "");
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [location, setLocation] = useState(user?.location || "");
    const [skills, setSkills] = useState<string[]>(user?.skills || []);
    const [interests, setInterests] = useState<string[]>(user?.interests || []);
    const [github, setGithub] = useState(user?.userLinks[1]?.url || "");
    const [linkedin, setLinkedin] = useState(user?.userLinks[0]?.url || "");
    const [newSkill, setNewSkill] = useState("");
    const [newInterest, setNewInterest] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: updatePrimaryInfo } = useUpdatePrimaryInfo();

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleAddInterest = () => {
        if (newInterest.trim() && !interests.includes(newInterest.trim())) {
            setInterests([...interests, newInterest.trim()]);
            setNewInterest("");
        }
    };

    const handleRemoveInterest = (interestToRemove: string) => {
        setInterests(interests.filter(interest => interest !== interestToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!user?.userId) throw new Error("User ID is required");
            
            const updatedUser = {
                ...user,
                profileName,
                displayName,
                bio,
                location,
                skills,
                interests,
                userLinks: [
                    { url: github, name: "GitHub" },
                    { url: linkedin, name: "LinkedIn" }
                ]
            };
            updatePrimaryInfo(updatedUser);
            
            setUser(updatedUser);
            onClose();
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <CloseIcon />
                </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Basic Info Section */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm">Profile Name</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your profile name"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm">Display Name</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm">Bio</label>
                        <textarea
                            className="w-full h-40 p-3 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Tell us about yourself"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm">Location</label>
                        <input
                            type="text"
                            className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Where are you from?"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-4 pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Skills</h3>
                    <div className="flex gap-2 flex-wrap">
                        {skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 bg-blue-900 text-white rounded-full text-sm flex items-center gap-2"
                            >
                                {skill}
                                <button 
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="text-white hover:text-red-400"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <button
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Interests Section */}
                <div className="space-y-4 pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Interests</h3>
                    <div className="flex gap-2 flex-wrap">
                        {interests.map((interest, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 bg-purple-900 text-white rounded-full text-sm flex items-center gap-2"
                            >
                                {interest}
                                <button 
                                    onClick={() => handleRemoveInterest(interest)}
                                    className="text-white hover:text-red-400"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Add an interest"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                        />
                        <button
                            onClick={handleAddInterest}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4 pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">GitHub</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Your GitHub profile URL"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">LinkedIn</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Your LinkedIn profile URL"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                    <button
                        type="button"
                        className="px-6 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}; 