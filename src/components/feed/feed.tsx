import { useQuery } from "@tanstack/react-query";
import { Post as PostType } from "../../types/types";
import { fetchFeed } from "../../api/post";
import { useUserContext } from "../../store/user-context";
import { Post } from "../feed/post";

export const Feed = () => {
   const { user } = useUserContext();
   const { data: page, isLoading, error } = useQuery({
      queryKey: ["posts"],
      queryFn: () => fetchFeed(user!.userId),
   });

   if (isLoading) {
      return (
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            <section>
               <h1 className="text-white text-2xl font-medium">My Feed</h1>
            </section>
            <div className="flex-1 flex items-center justify-center">
               <div className="flex flex-col items-center gap-4">
                  <div className="w-15 aspect-square border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-400 text-lg">Loading posts...</span>
               </div>
            </div>
         </section>
      );
   }

   if (error) {
      return (
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            <section>
               <h1 className="text-white text-2xl font-medium">My Feed</h1>
            </section>
            <div className="flex-1 flex items-center justify-center">
               <div className="flex flex-col items-center gap-2 text-red-400">
                  <span className="text-lg">Error loading posts</span>
               </div>
            </div>
         </section>
      );
   }

   return (
      <section className="h-full flex flex-col gap-y-5 overflow-scroll">
         <section>
            <h1 className="text-white text-2xl font-medium">My Feed</h1>
         </section>
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            {page.content?.length > 0 ? (
               page.content.map((post: PostType) => (
                  <Post key={post.postId} post={post} />
               ))
            ) : (
               <div className="flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                     <span className="text-lg">No posts yet</span>
                  </div>
               </div>
            )}
         </section>
      </section>
   );
};
