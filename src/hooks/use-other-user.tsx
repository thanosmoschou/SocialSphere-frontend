import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './use-user';
import { useUserContext } from '../store/user-context';
import { useFollow } from '../features/use-follow';
import { User } from '../types/types';

const defaultUser: User = {
    userId: 0,
    email: '',
    profileName: '',
    displayName: '',
    bio: '',
    location: '',
    createdAt: '',
    role: 'USER',
    followers: [],
    following: [],
    posts: [],
    skills: [],
    interests: [],
    userLinks: []
};

export const useOtherUser = () => {
    const { userId } = useParams();
    const { user: currentUser, refetchUser } = useUserContext();
    const { user: otherUser, isLoading } = useUser(Number(userId));

    // Check if current user is following the profile
    const isFollowing = Array.isArray(currentUser?.following) && 
        currentUser?.following.some((followedUser: any) => {
            if (typeof followedUser === 'number') {
                return followedUser === Number(userId);
            } else if (followedUser && typeof followedUser === 'object') {
                return followedUser.userId === Number(userId) || followedUser.id === Number(userId);
            }
            return false;
        });

    // Always call useFollow, but handle the case where users are not available
    const { followMutation, unfollowMutation } = useFollow(
        currentUser || defaultUser,
        otherUser || defaultUser
    );
    
    // Refetch user data after successful follow/unfollow
    useEffect(() => {
        if (followMutation.isSuccess || unfollowMutation.isSuccess) {
            refetchUser();
        }
    }, [followMutation.isSuccess, unfollowMutation.isSuccess]);

    const handleFollowClick = () => {
        if (!userId || !currentUser || !otherUser) return;
        
        if (isFollowing) {
            unfollowMutation.mutate();
        } else {
            followMutation.mutate();
        }
    };

    return {
        otherUser,
        isLoading,
        isFollowing,
        handleFollowClick,
        followMutation,
        unfollowMutation
    };
}; 