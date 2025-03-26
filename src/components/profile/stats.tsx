type Stats = {
    posts: number;
    followers: number;
    following: number;
}

export const Stats = ({ stats }: { stats: Stats }) => {
   return (
      <div className="flex gap-8 mt-6">
         <div>
            <span className="font-bold text-gray-800">
               {stats.posts}
            </span>
            <span className="text-gray-500 ml-1">Posts</span>
         </div>
         <div>
            <span className="font-bold text-gray-800">
               {stats.followers}
            </span>
            <span className="text-gray-500 ml-1">Followers</span>
         </div>
         <div>
            <span className="font-bold text-gray-800">
               {stats.following}
            </span>
            <span className="text-gray-500 ml-1">Following</span>
         </div>
      </div>
   );
};
