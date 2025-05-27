import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/post";
import { useUserContext } from "../store/user-context";
import { useParams } from "react-router-dom";

export const useComment = (postId: number, userId: number) => {
    const { refetchUser } = useUserContext();
    const queryClient = useQueryClient();
    const { userId: profileUserId } = useParams();
    
    const { mutate: comment, isPending: isCommentPending } = useMutation({
        mutationFn: (content: string) => createComment({ postId, userId, content }),
        onSuccess: async () => {
            await refetchUser();
            // Invalidate posts query to refresh the feed
            await queryClient.invalidateQueries({ queryKey: ['posts'] });
            // If we're on a profile page, also invalidate the profile data
            if (profileUserId) {
                await queryClient.invalidateQueries({ queryKey: ['profile', Number(profileUserId)] });
            }
        }
    });

    return { comment, isCommentPending };
}; 