import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/post";
import { useUserContext } from "../store/user-context";

export const useComment = (postId: number, userId: number) => {
    const { refetchUser } = useUserContext();
    const queryClient = useQueryClient();
    
    const { mutate: comment, isPending: isCommentPending } = useMutation({
        mutationFn: (content: string) => createComment({ postId, userId, content }),
        onSuccess: async () => {
            await refetchUser();
            // Invalidate posts query to refresh the feed
            await queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    return { comment, isCommentPending };
}; 