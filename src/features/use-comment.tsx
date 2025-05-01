import { useMutation } from "@tanstack/react-query";
import { createComment } from "../api/post";
import { useUserContext } from "../store/user-context";

export const useComment = (postId: number, userId: number) => {
    const { refetchUser } = useUserContext();
    
    const { mutate: comment, isPending: isCommentPending } = useMutation({
        mutationFn: (content: string) => createComment({ postId, userId, content }),
        onSuccess: async () => {
            await refetchUser();
        }
    });

    return { comment, isCommentPending };
}; 