import { backendUrl } from "../lib/constants";
import { apiFetch } from "./auth";

type Post = {
    title: string;
    content: string | null;
    image: File | null;
    creatorId: number | null;
}

export const createPost = async (post: Post) => {
   const response = await apiFetch(`${backendUrl}/post/create`, {
      method: "POST",
      body: JSON.stringify(post),
   });
};
