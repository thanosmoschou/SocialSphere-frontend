import { useEffect, useState } from 'react';
import ProfilePicture from '../../assets/profile-picture.png';
import { Post } from '../feed/post';
import { About } from './about';
import { useNavContext } from '../../store/nav-context';
import { FriendsSection } from './friends-section';
import { Photos } from './photos';
import { Stats } from './stats';
import { useUserContext } from '../../store/user-context';
import { Dialog, DialogContent } from '@mui/material';
import { ProfileEditForm } from './profile-edit-form';
import { useProfile } from '../../hooks/use-profile';
import { Post as PostType, UserProfile } from '../../types/types';

export const Profile = () => {
    const context = useNavContext();
    const [isOwnProfile, setIsOwnProfile] = useState(context.currentPage === "myprofile");
    const [activeTab, setActiveTab] = useState("posts");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { data: profile } = useProfile();
    const { user: userContext } = useUserContext();

    useEffect(() => {
        setIsOwnProfile(context.currentPage === "myprofile");
    }, [context.currentPage]);

    return (
        <div className="flex flex-col h-full bg-black rounded-lg">
            {/* Profile Header */}
            <div className="relative h-48 bg-gradient-to-r from-primary to-primary/50 rounded-t-lg">
                <div className="absolute -bottom-16 left-8">
                    <img 
                        src={ProfilePicture} 
                        alt={userContext?.profileName}
                        className="w-32 h-32 rounded-full border-4 border-black"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 px-8 pb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{userContext?.profileName}</h1>
                        <p className="text-gray-400">@{userContext?.displayName}</p>
                        {userContext?.bio && <p className="mt-2 text-gray-300">{userContext.bio}</p>}
                        {userContext?.location && (
                            <div className="flex items-center gap-4 mt-2 text-gray-400">
                                <span>{userContext.location}</span>
                                <span>•</span>
                                <span>Joined {new Date(userContext.createdAt || "").toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        )}
                    </div>
                    {isOwnProfile && (
                        <button 
                            className="px-6 py-2 border border-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Stats */}
                <Stats stats={{
                    posts: userContext?.posts?.length || 0,
                    followers: userContext?.followers?.length || 0,
                    following: userContext?.following?.length || 0
                }} />
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-800">
                <div className="flex">
                    <button 
                        className={`flex-1 py-4 text-center font-medium ${activeTab === "posts" ? "text-white border-b-2 border-primary" : "text-gray-400"}`} 
                        onClick={() => setActiveTab("posts")}
                    >
                        Posts
                    </button>
                    <button 
                        className={`flex-1 py-4 text-center font-medium ${activeTab === "about" ? "text-white border-b-2 border-primary" : "text-gray-400"}`} 
                        onClick={() => setActiveTab("about")}
                    >
                        About
                    </button>
                    <button 
                        className={`flex-1 py-4 text-center font-medium ${activeTab === "friends" ? "text-white border-b-2 border-primary" : "text-gray-400"}`} 
                        onClick={() => setActiveTab("friends")}
                    >
                        Friends
                    </button>
                    <button 
                        className={`flex-1 py-4 text-center font-medium ${activeTab === "photos" ? "text-white border-b-2 border-primary" : "text-gray-400"}`} 
                        onClick={() => setActiveTab("photos")}
                    >
                        Photos
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                    {activeTab === "posts" && (
                        <>
                            {userContext?.posts?.map((post: PostType, index: number) => (
                                <Post key={index} post={post} />
                            ))}
                        </>
                    )}
                    {activeTab === "about" && <About />}
                    {activeTab === "friends" && <FriendsSection />}
                    {activeTab === "photos" && <Photos />}
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Dialog 
                open={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    className: "bg-black border border-gray-800 rounded-2xl"
                }}
            >
                <DialogContent className="bg-black p-6">
                    <ProfileEditForm onClose={() => setIsEditModalOpen(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
};
