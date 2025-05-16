import { Post } from "../../types/types";
import { backendUrl } from "../../lib/constants";
import { usePostTime } from "../../hooks/use-post-time";

interface PhotosProps {
   posts: Post[];
}

export const Photos = ({ posts }: PhotosProps) => {
   // Filter posts that have images
   console.log(posts);
   const postsWithImages = posts.filter((post) => post.imageUrl);

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {postsWithImages.map((post) => (
               <div
                  key={post.postId}
                  className="rounded-lg overflow-hidden bg-gray-100 flex flex-col gap-y-8 p-5"
               >
                  <img
                     src={`${backendUrl}/post/fetch-photo/${post.postId}`}
                     alt="Post photo"
                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 shadow-md rounded-lg"
                  />

                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <span className="text-sm">
                           ❤️ {post.usersLiked.length}
                        </span>
                        <span className="text-sm">
                           💬 {post.comments.length}
                        </span>
                     </div>
                     <span className="text-sm">
                        {usePostTime(post.date)} ago
                     </span>
                  </div>
               </div>
            ))}
            {postsWithImages.length === 0 && (
               <div className="col-span-full text-center text-gray-500 py-8">
                  No photos to display
               </div>
            )}
         </div>
      </div>
   );
};
