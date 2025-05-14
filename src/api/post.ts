import { backendUrl } from "../lib/constants";
import { apiFetch } from "./auth";
import { CommentDTO, PostDTO } from "../types/types";

export const createPost = async (post: PostDTO) => {
   await apiFetch(`${backendUrl}/post/create-text-only`, {
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


