import React, { useEffect, useState } from 'react';
import ProfilePicture from '../../assets/profile-picture.png';
import { Post } from '../feed/post';
import { About } from './about';
import { useNavContext } from '../../store/nav-context';
import { Dialog, DialogContent } from '@mui/material';
import { ProfileEditForm } from '../profile/profile-edit-form';
import { Post as PostType, User as UserType } from '../../types/types';
import { useUser } from '../../hooks/use-user';
import { useParams } from 'react-router-dom';
import { FriendsSection } from './friends-section';
import { Photos } from './photos';
import { Stats } from './stats';
import { followUser, unfollowUser } from '../../api/user';
import { useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '../../store/user-context';
import { useFollow } from '../../features/use-follow';

export const User = () => {
    const { userId } = useParams();
    const context = useNavContext();
    const [isOwnProfile, setIsOwnProfile] = useState(context.currentPage === "myprofile");
    const [activeTab, setActiveTab] = useState("posts");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { user, isLoading, error } = useUser(Number(userId));
    const { user: currentUser, refetchUser } = useUserContext();
    const queryClient = useQueryClient();
    const numericUserId = Number(userId);
    console.log("Current profile:", numericUserId);

    // Check if current user is following the profile with this numericUserId
    const isFollowing = Array.isArray(currentUser?.following) && 
        currentUser?.following.some((followedUser: any) => {
            if (typeof followedUser === 'number') {
                return followedUser === numericUserId;
            } else if (followedUser && typeof followedUser === 'object') {
                return followedUser.userId === numericUserId || followedUser.id === numericUserId;
            }
            return false;
        });
    console.log("Is following:", isFollowing);

    // Follow/unfollow mutations
    const { followMutation, unfollowMutation } = useFollow(currentUser!, user);
    
    // Refetch user data after successful follow/unfollow
    useEffect(() => {
        if (followMutation.isSuccess || unfollowMutation.isSuccess) {
            refetchUser();
            queryClient.invalidateQueries({ queryKey: ['profile', numericUserId] });
        }
    }, [followMutation.isSuccess, unfollowMutation.isSuccess, refetchUser, queryClient, numericUserId]);

    const handleFollowClick = () => {
        if (!userId) return;
        
        if (isFollowing) {
            unfollowMutation.mutate();
        } else {
            followMutation.mutate();
        }
    };

    useEffect(() => {
        setIsOwnProfile(context.currentPage === "myprofile");
    }, [context.currentPage]);

    if (!user) {
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
                        alt={user?.profileName}
                        className="w-32 h-32 rounded-full border-4 border-black"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 px-8 pb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{user?.profileName}</h1>
                        <p className="text-gray-400">@{user?.displayName}</p>
                        {user?.bio && <p className="mt-2 text-gray-300">{user.bio}</p>}
                        {user?.location && (
                            <div className="flex items-center gap-4 mt-2 text-gray-400">
                                <span>{user.location}</span>
                                <span>•</span>
                                <span>Joined {new Date(user.createdAt || "").toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
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
                    posts: user?.posts?.length || 0,
                    followers: Array.isArray(user?.followers) ? user.followers.length : 0,
                    following: Array.isArray(user?.following) ? user.following.length : 0
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
                            {user?.posts?.map((post: PostType, index: number) => (
                                <Post key={index} post={post} />
                            ))}
                            {(!user.posts || user.posts.length === 0) && (
                                <div className="text-center text-gray-400 p-8">
                                    No posts yet
                                </div>
                            )}
                        </>
                    )}
                    {activeTab === "about" && <About user={user} />}
                    {activeTab === "friends" && <FriendsSection user={user} />}
                    {activeTab === "photos" && <Photos user={user} />}
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
