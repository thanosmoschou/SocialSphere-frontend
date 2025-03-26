import React, { useEffect, useState } from 'react';
import ProfilePicture from '../../assets/profile-picture.png';
import { Post } from '../feed/post';
import { useParams } from 'react-router-dom';
import { About } from './about';
import { useNavContext } from '../../store/nav-context';
import { FriendsSection } from './friends-section';
import { Photos } from './photos';
import { Stats } from './stats';

export type UserProfile = {
    name: string;
    username: string;
    bio: string;
    location: string;
    joinedDate: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
    isOwnProfile: boolean;
}

export const userProfile: UserProfile = {
    name: "Dimitris Sparagis",
    username: "@dimsparagis",
    bio: "Software Developer | Tech Enthusiast | Coffee Lover",
    location: "Athens, Greece",
    joinedDate: "January 2024",
    stats: {
        posts: 42,
        followers: 1234,
        following: 567
    },
    isOwnProfile: true
};

export const Profile = () => {
    const { username } = useParams();
    const context = useNavContext();
    const [isOwnProfile, setIsOwnProfile] = useState(context.currentPage === "myprofile");
    const [activeTab, setActiveTab] = useState("posts");

    useEffect(() => {
        setIsOwnProfile(context.currentPage === "myprofile");
    }, [context.currentPage]);

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
            {/* Profile Header */}
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg">
                <div className="absolute -bottom-16 left-8">
                    <img 
                        src={ProfilePicture} 
                        alt={userProfile.name}
                        className="w-32 h-32 rounded-full border-4 border-white"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 px-8 pb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{isOwnProfile ? userProfile.name : username}</h1>
                        <p className="text-gray-500">{isOwnProfile ? userProfile.username : username}</p>
                        <p className="mt-2 text-gray-700">{userProfile.bio}</p>
                        <div className="flex items-center gap-4 mt-2 text-gray-500">
                            <span>{userProfile.location}</span>
                            <span>•</span>
                            <span>Joined {userProfile.joinedDate}</span>
                        </div>
                    </div>
                    {isOwnProfile ? (
                        <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                            Edit Profile
                        </button>
                    ) : (
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                            Follow
                        </button>
                    )}
                </div>

                {/* Stats */}
                <Stats stats={userProfile.stats} />
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
                <div className="flex">
                    <button className={`flex-1 py-4 text-center font-medium text-gray-800 border-b-2 ${activeTab === "posts" ? "border-blue-500" : "border-transparent"}`} onClick={() => setActiveTab("posts")}>
                        Posts
                    </button>
                    <button className={`flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-800 ${activeTab === "about" ? "border-b-2 border-blue-500" : "border-transparent"}`} onClick={() => setActiveTab("about")}>
                        About
                    </button>
                    <button className={`flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-800 ${activeTab === "friends" ? "border-b-2 border-blue-500" : "border-transparent"}`} onClick={() => setActiveTab("friends")}>
                        Friends
                    </button>
                    <button className={`flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-800 ${activeTab === "photos" ? "border-b-2 border-blue-500" : "border-transparent"}`} onClick={() => setActiveTab("photos")}>
                        Photos
                    </button>
                </div>
            </div>

            {/* Posts */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                    {activeTab === "posts" && (
                        <>
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </>
                    )}
                    {activeTab === "about" && (
                        <About />
                    )}
                    {activeTab === "friends" && (
                        <FriendsSection />
                    )}
                    {activeTab === "photos" && (
                        <Photos />
                    )}
                </div>
            </div>
        </div>
    );
};
