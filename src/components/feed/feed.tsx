import { useQuery } from "@tanstack/react-query";
import { Post as PostType } from "../../types/types";
import { fetchAllPosts } from "../../api/post";
import { Post } from "../feed/post";
import { useEffect } from "react";
export const Feed = () => {
   const { data: posts, isLoading, error } = useQuery({
      queryKey: ["posts"],
      queryFn: () => fetchAllPosts(),
   });

   useEffect(() => {
      console.log(posts);
   }, [posts]);

   if (isLoading) {
      return (
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            <section>
               <h1 className="text-white text-2xl font-medium">My Feed</h1>
            </section>
            <div className="text-white text-center">Loading posts...</div>
         </section>
      );
   }

   if (error) {
      return (
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            <section>
               <h1 className="text-white text-2xl font-medium">My Feed</h1>
            </section>
            <div className="text-red-500 text-center">Error loading posts</div>
         </section>
      );
   }

   return (
      <section className="h-full flex flex-col gap-y-5 overflow-scroll">
         <section>
            <h1 className="text-white text-2xl font-medium">My Feed</h1>
         </section>
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            {posts?.length > 0 ? (
               posts.map((post: PostType) => (
                  <Post key={post.postId} post={post} />
               ))
            ) : (
               <div className="text-white text-center">No posts yet</div>
            )}
         </section>
      </section>
   );
};
