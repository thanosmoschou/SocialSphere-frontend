import { Post } from '../../types/types';
import { backendUrl } from '../../lib/constants';
import { usePostTime } from '../../hooks/use-post-time';

interface PhotosProps {
   posts: Post[];
}

export const Photos = ({ posts }: PhotosProps) => {
   // Filter posts that have images
   const postsWithImages = posts.filter(post => post.photo);

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {postsWithImages.map((post) => (
               <div key={post.postId} className="group relative aspect-square rounded-lg overflow-hidden">
                  <img
                     src={`${backendUrl}/post/fetch-photo/${post.postId}`}
                     alt="Post photo"
                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                     <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between">
                           <span className="text-sm">{usePostTime(post.date)} ago</span>
                           <div className="flex items-center gap-2">
                              <span className="text-sm">❤️ {post.usersLiked.length}</span>
                              <span className="text-sm">💬 {post.comments.length}</span>
                           </div>
                        </div>
                     </div>
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
