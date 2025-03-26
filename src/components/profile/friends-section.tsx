import { friends } from "../../../data/data";
import ProfilePicture from "../../assets/profile-picture.png";
import { FriendCard } from "./friend-card";

export const FriendsSection = () => {
   return (
      <div className="space-y-6">
         {/* Search and Filter */}
         <div className="flex gap-4">
            <div className="flex-1">
               <input
                  type="text"
                  placeholder="Search friends..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option value="all">All Friends</option>
               <option value="online">Online</option>
               <option value="offline">Offline</option>
            </select>
         </div>

         {/* Friends Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend, index) => (
               <FriendCard key={index} {...friend} />
            ))}
         </div>

         {/* Pagination */}
         <div className="flex justify-center gap-2 mt-6">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
               Previous
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
               1
            </button>
            {/* <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button> */}
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
               Next
            </button>
         </div>
      </div>
   );
};
