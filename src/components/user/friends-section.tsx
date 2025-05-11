import { useState, useEffect } from "react";
import { User } from "../../types/types";
import { FriendCard } from "./friend-card";
import { apiFetch } from "../../api/auth";
import { backendUrl } from "../../lib/constants";
import { useQuery } from "@tanstack/react-query";

type TabOptions = "followers" | "following";

export const FriendsSection = ({ user }: { user: User }) => {
   const [activeTab, setActiveTab] = useState<TabOptions>("followers");
   const [searchQuery, setSearchQuery] = useState("");

   // Function to fetch follower user details
   const fetchUserDetails = async (userIds: any[]) => {
      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) return [];
      
      const userDetailPromises = userIds.map(userId => {
         // Handle if userId is already a User object
         if (typeof userId === 'object' && userId.userId) {
            return Promise.resolve(userId);
         }
         
         // Handle if userId is a number
         const id = typeof userId === 'number' ? userId : userId.id || userId.userId;
         return apiFetch(`${backendUrl}/user/${id}`);
      });
      
      return Promise.all(userDetailPromises);
   };

   // Queries for followers and following
   const { data: followersData = [], isLoading: followersLoading } = useQuery({
      queryKey: ["followers", user.userId],
      queryFn: () => fetchUserDetails(user.followers || []),
      enabled: Array.isArray(user.followers)
   });

   const { data: followingData = [], isLoading: followingLoading } = useQuery({
      queryKey: ["following", user.userId],
      queryFn: () => fetchUserDetails(user.following || []),
      enabled: Array.isArray(user.following)
   });

   // Filter users based on search query
   const filteredUsers = (activeTab === "followers" ? followersData : followingData)
      .filter((user: User) => {
         if (!searchQuery) return true;
         const query = searchQuery.toLowerCase();
         return (
            user.profileName?.toLowerCase().includes(query) ||
            user.displayName?.toLowerCase().includes(query) ||
            user.bio?.toLowerCase().includes(query)
         );
      });

   return (
      <div className="space-y-6">
         {/* Tabs */}
         <div className="flex border-b border-gray-700">
            <button 
               className={`py-3 px-6 font-medium ${activeTab === "followers" ? "text-primary border-b-2 border-primary text-white" : "text-gray-400"}`}
               onClick={() => setActiveTab("followers")}
            >
               Followers ({Array.isArray(user.followers) ? user.followers.length : 0})
            </button>
            <button 
               className={`py-3 px-6 font-medium ${activeTab === "following" ? "text-primary border-b-2 border-primary text-white" : "text-gray-400"}`}
               onClick={() => setActiveTab("following")}
            >
               Following ({Array.isArray(user.following) ? user.following.length : 0})
            </button>
         </div>
         
         {/* Search */}
         <div className="flex gap-4">
            <div className="flex-1">
               <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
               />
            </div>
         </div>

         {/* Loading state */}
         {(activeTab === "followers" && followersLoading) || (activeTab === "following" && followingLoading) ? (
            <div className="text-center py-10 text-gray-400">Loading users...</div>
         ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
               {searchQuery 
                  ? "No users match your search query" 
                  : activeTab === "followers" 
                     ? "No followers yet" 
                     : "Not following anyone yet"}
            </div>
         ) : (
            /* Users Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredUsers.map((userData: User) => (
                  <FriendCard key={userData.userId} user={userData} />
               ))}
            </div>
         )}
      </div>
   );
};
