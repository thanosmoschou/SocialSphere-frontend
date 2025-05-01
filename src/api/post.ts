import { backendUrl } from "../lib/constants";
import { apiFetch } from "./auth";
import { useUserContext } from "../store/user-context";
import { CommentDTO } from "../types/types";

export type Post = {
   title: string;
   description: string | null;
   imageUrl: string | null;
   creatorId: number | null;
};

export const createPost = async (post: Post) => {
   console.log(post);
   await apiFetch(`${backendUrl}/post/create`, {
      method: "POST",
      body: JSON.stringify(post),
   });
};

export const likePost = async(postId: number, userId: number) => {
   await apiFetch(`${backendUrl}/post/${postId}/like?userId=${userId}`, {
      method: "POST",
   });
};

export const createComment = async (comment: CommentDTO) => {
   await apiFetch(`${backendUrl}/post/comment`, {
      method: "POST",
      body: JSON.stringify({
         content: comment.content,
         userId: comment.userId,
         postId: comment.postId
      }),
   });
};


