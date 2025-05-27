import { Link } from "react-router-dom";
import ProfilePicture from "../../assets/profile-picture.png";
import { User } from "../../types/types";
import { useUserContext } from "../../store/user-context";

type UserFriendCardProps = {
   user: User;
};

export const FriendCard = ({ user }: UserFriendCardProps) => {
   const { user: currentUser } = useUserContext();
   
   // Convert skills to array if it's a string or undefined
   const skillsArray: string[] = !user.skills ? [] :
      Array.isArray(user.skills) ? user.skills :
         typeof user.skills === 'string' ? (user.skills as string).split(',').map((s: string) => s.trim()) : [];
   
   // Determine if this card is for the logged in user
   const isCurrentUser = currentUser?.userId === user.userId;
   
   // Set the link destination based on whether it's the current user
   const linkPath = `/profile/${user.userId}`;

   return (
      <Link to={linkPath} className="bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
         <div className="relative">
            <img
               src={ProfilePicture}
               alt={user.profileName}
               className="w-full h-32 object-cover rounded-t-lg"
            />
            {isCurrentUser && (
               <div className="absolute top-2 right-2 bg-primary text-xs px-2 py-1 rounded-full">
                  You
               </div>
            )}
         </div>
         <div className="p-4">
            <div className="flex items-center justify-between">
               <h3 className="font-semibold">{user.profileName}</h3>
               <span className="text-sm text-gray-400">@{user.displayName}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{user.bio || "No bio available"}</p>
            {skillsArray.length > 0 && (
               <div className="flex flex-wrap gap-2 mt-3">
                  {skillsArray.slice(0, 3).map((skill: string, index: number) => (
                     <span
                        key={index}
                        className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs"
                     >
                        {skill}
                     </span>
                  ))}
                  {skillsArray.length > 3 && (
                     <span className="text-xs text-gray-400">+{skillsArray.length - 3} more</span>
                  )}
               </div>
            )}
         </div>
      </Link>
   );
}; 