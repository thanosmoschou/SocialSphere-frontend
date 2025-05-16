import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../api/post";
import { useUserContext } from "../store/user-context";

export const useLike = (postId: number, userId: number) => {
    const { refetchUser } = useUserContext();
    const queryClient = useQueryClient();
    
    const { mutate: like, isPending: isLikePending } = useMutation({
        mutationFn: () => likePost(postId, userId),
        onSuccess: async () => {
            await refetchUser();
            // Invalidate posts query to refresh the feed
            await queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    return { like, isLikePending };
}