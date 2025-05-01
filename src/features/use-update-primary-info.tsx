import { useMutation } from "@tanstack/react-query";
import { updatePrimaryInfo } from "../api/user";
import { User } from "../types/types";


export const useUpdatePrimaryInfo = () => {
    return useMutation({
        mutationFn: (user: User) => updatePrimaryInfo(user), 
        onSuccess: () => {
            console.log("Primary info updated successfully");
        },
        onError: (error) => {
            console.error("Failed to update primary info:", error);
        },
    })
}