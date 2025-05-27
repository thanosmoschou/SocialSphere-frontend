import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../api/user";
import { User } from "../types/types";

export const useFollow = (sender: User, receiver: User) => {
    
    const queryClient = useQueryClient();
    
    const followMutation = useMutation({
        mutationFn: () => followUser(sender, receiver),
        onSuccess: () => {
            console.log("Followed user");
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["profile", receiver.userId] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        }
    });

    const unfollowMutation = useMutation({
        mutationFn: () => unfollowUser(sender, receiver),
        onSuccess: () => {
            console.log("Unfollowed user");
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["profile", receiver.userId] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        }
    });
    
    return { followMutation, unfollowMutation };
}