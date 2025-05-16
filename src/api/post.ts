import { backendUrl } from "../lib/constants";
import { apiFetch } from "./auth";
import { CommentDTO, PostDTO } from "../types/types";

export const createPost = async (post: PostDTO) => {
   if (post.photo) {
      const formData = new FormData();
      formData.append('content', post.content);
      formData.append('photo', post.photo);
      formData.append('creatorId', post.creatorId?.toString() || '');
      await apiFetch(`${backendUrl}/post/create-include-photo`, {
         method: "POST",
         body: formData,
      });
   } else {
      await apiFetch(`${backendUrl}/post/create-text-only`, {
         method: "POST",
         body: JSON.stringify(post),
      });
   }
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

export const fetchPostImages = async (postId: number) => {
   const response = await apiFetch(`${backendUrl}/post/fetch-photo/${postId}`, {
      method: "GET",
   });
   return response.json();
};


