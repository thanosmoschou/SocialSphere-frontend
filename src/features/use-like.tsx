import { useMutation } from "@tanstack/react-query";
import { likePost } from "../api/post";
import { useUserContext } from "../store/user-context";

export const useLike = (postId: number, userId: number) => {
    const { refetchUser } = useUserContext();
    
    const { mutate: like, isPending: isLikePending } = useMutation({
        mutationFn: () => likePost(postId, userId),
        onSuccess: async () => {
            await refetchUser();
        }
    });

    return { like, isLikePending };
}