import ProfilePicture from "../../assets/profile-picture.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Post as PostType } from "../../types/types";
import { useUserContext } from "../../store/user-context";
import { usePostTime } from "../../hooks/use-post-time";
import { useEffect, useState } from "react";
import { useLike } from "../../features/use-like";
import { CommentModal } from "../home/comment-modal";
import { useUsersById } from "../../hooks/use-users-by-id";
import { backendUrl } from "../../lib/constants";
import { useUserById } from "../../hooks/use-user-by-id";

export const Post = ({ post }: { post: PostType }) => {
   const { user } = useUserContext();
   const [isLiked, setIsLiked] = useState(post.usersLiked.includes(user!.userId));
   const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
   const { like } = useLike(post.postId, user!.userId);
   const postTimeAgo = usePostTime(post.date);
   const commentUserIds = post.comments.map((comment) => comment.userCommented);
   const { data: commentUsers } = useUsersById(commentUserIds);
   const postCreator = typeof post.creator === "number" ? post.creator : post.creator.userId;
   const { data: postUser } = useUserById(postCreator);

   useEffect(() => {
      if (post.usersLiked.includes(user!.userId)) {
         setIsLiked(true);
      }
   }, [post.usersLiked]);

   const handleLike = async () => {
      setIsLiked(!isLiked);
      like();
   };

   return (
      <section
         className={`flex flex-col justify-between gap-y-10 bg-white rounded-2xl p-5`}
      >
         <section className="flex justify-between items-center">
            <section className="flex items-center gap-x-5">
               <img
                  src={ProfilePicture}
                  alt="Profile Picture"
                  className="w-15 aspect-square rounded-full"
               />
               <section>
                  <h1 className="text-black text-xl font-medium">
                     {postUser?.profileName}
                  </h1>
                  <h3 className="text-gray-500 text-sm font-medium">
                     {postUser?.displayName}
                  </h3>
               </section>
            </section>
            <p>{postTimeAgo} ago</p>
         </section>
         <section className="flex flex-col gap-y-5">
            {/* Generate a random number of paragraphs */}
            <p>{post.content}</p>
            <section className="flex gap-x-5">
               {post.imageUrl && (
                  <img
                     src={`${backendUrl}/post/fetch-photo/${user?.userId}/${post.postId}`}
                     alt="Post image"
                  style={{
                     width: "30%",
                     objectFit: "cover",
                     borderRadius: "8px",
                     }}
                  />
               )}
            </section>
            <section className="flex items-center">
               <section
                  className={`w-[15%] flex items-center gap-x-2 ${
                     isLiked ? "text-red-500" : "text-gray-500"
                  } cursor-pointer`}
               >
                  <FavoriteIcon onClick={handleLike} />
                  <p>{post.usersLiked.length}</p>
               </section>
               <section
                  className="w-[85%] flex items-center gap-x-2 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => setIsCommentModalOpen(true)}
               >
                  <CommentIcon />
                  <p>{post.comments.length}</p>
               </section>
            </section>
            {post.comments.length > 0 && (
               <section className="flex flex-col gap-y-3 mt-4 border-t border-gray-200 pt-4">
                  <h3 className="text-gray-700 font-medium">Comments</h3>
                  {post.comments.map((comment, index) => (
                     <div key={index} className="flex items-start gap-x-3">
                        <img
                           src={ProfilePicture}
                           alt="Profile Picture"
                           className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1 flex flex-col gap-y-3 bg-gray-100 rounded-lg p-3">
                           <section className="flex justify-between items-start gap-x-2 ">
                              <section className="flex flex-col">
                                 <h2 className="text-lg text-gray-800 font-medium">
                                    {commentUsers?.[index]?.profileName ||
                                       "Loading..."}
                                 </h2>
                                 <p className="text-xs text-gray-500">
                                    {commentUsers?.[index]?.displayName ||
                                       "Loading..."}
                                 </p>
                              </section>
                              <span className="text-xs text-gray-500">
                                 {usePostTime(comment.date)} ago
                              </span>
                           </section>
                           <p className="text-xl text-gray-800">
                              {comment.content}
                           </p>
                        </div>
                     </div>
                  ))}
               </section>
            )}
         </section>
         <CommentModal
            open={isCommentModalOpen}
            onClose={() => setIsCommentModalOpen(false)}
            postId={post.postId}
         />
      </section>
   );
};
