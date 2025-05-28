import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../api/user";

export const useUser = (userId: number) => {
    const { data: profileData, isLoading, error } = useQuery({
        queryKey: ["profile", userId],
        queryFn: () => fetchUserById(userId),
    });

    return {
        user: profileData,
        isLoading,
        error,
    };
}; 