import { Link } from "react-router-dom";
import ProfilePicture from "../../assets/profile-picture.png";

type FriendCardProps = {
   name: string;
   username: string;
   bio: string;
   status: string;
   skills: string[];
   skills_color: string;
};

export const FriendCard = ({
   name,
   username,
   bio,
   status,
   skills,
   skills_color,
}: FriendCardProps) => {
   return (
      <Link to={`/profile/${name}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
         <div className="relative">
            <img
               src={ProfilePicture}
               alt="Friend"
               className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className={`absolute bottom-2 right-2 w-3 h-3 ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
         </div>
         <div className="p-4">
            <div className="flex items-center justify-between">
               <h3 className="font-semibold text-gray-800">{name}</h3>
               <span className="text-sm text-gray-500">{username}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{bio}</p>
            <div className="flex gap-2 mt-3">
               {skills.map((skill) => (
                  <span
                     key={skill}
                     className={`px-2 py-1 ${skills_color} rounded-full text-xs`}
                  >
                     {skill}
                  </span>
               ))}
            </div>
         </div>
      </Link>
   );
};
