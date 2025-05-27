import { useState } from 'react';
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
import { Post as PostType } from '../../types/types';
import { useOtherUser } from '../../hooks/use-other-user';

export const Profile = () => {
    const context = useNavContext();
    const { user: currentUser } = useUserContext();
    const { otherUser, isLoading, isFollowing, handleFollowClick, followMutation, unfollowMutation } = useOtherUser();
    const [activeTab, setActiveTab] = useState("posts");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Determine if this is the logged-in user's profile
    const isOwnProfile = context.currentPage === "myprofile";
    const displayUser = isOwnProfile ? currentUser : otherUser;

    if (isLoading || !displayUser) {
        return <div className="flex justify-center items-center h-full">
            <div className="text-white">Loading profile...</div>
        </div>;
    }

    return (
        <div className="flex flex-col h-full bg-black rounded-lg">
            {/* Profile Header */}
            <div className="relative h-48 bg-gradient-to-r from-primary to-primary/50 rounded-t-lg">
                <div className="absolute -bottom-16 left-8">
                    <img 
                        src={ProfilePicture} 
                        alt={displayUser.profileName}
                        className="w-32 h-32 rounded-full border-4 border-black"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 px-8 pb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{displayUser.profileName}</h1>
                        <p className="text-gray-400">@{displayUser.displayName}</p>
                        {displayUser.bio && <p className="mt-2 text-gray-300">{displayUser.bio}</p>}
                        {displayUser.location && (
                            <div className="flex items-center gap-4 mt-2 text-gray-400">
                                <span>{displayUser.location}</span>
                                <span>•</span>
                                <span>Joined {new Date(displayUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        )}
                    </div>
                    {isOwnProfile ? (
                        <button 
                            className="px-6 py-2 border border-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button 
                            className={`px-6 py-2 rounded-full transition-colors ${
                                isFollowing
                                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                                    : 'bg-primary text-white hover:bg-primary/90'
                            }`}
                            onClick={handleFollowClick}
                            disabled={followMutation.isPending || unfollowMutation.isPending}
                        >
                            {followMutation.isPending || unfollowMutation.isPending 
                                ? 'Processing...' 
                                : isFollowing ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>

                {/* Stats */}
                <Stats stats={{
                    posts: displayUser.posts?.length || 0,
                    followers: Array.isArray(displayUser.followers) ? displayUser.followers.length : 0,
                    following: Array.isArray(displayUser.following) ? displayUser.following.length : 0
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
                            {displayUser.posts?.map((post: PostType, index: number) => (
                                <Post key={index} post={post} />
                            ))}
                            {(!displayUser.posts || displayUser.posts.length === 0) && (
                                <div className="text-center text-gray-400 p-8">
                                    No posts yet
                                </div>
                            )}
                        </>
                    )}
                    {activeTab === "about" && <About user={displayUser} />}
                    {activeTab === "friends" && <FriendsSection user={displayUser} />}
                    {activeTab === "photos" && <Photos posts={displayUser.posts || []} />}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isOwnProfile && (
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
            )}
        </div>
    );
};
