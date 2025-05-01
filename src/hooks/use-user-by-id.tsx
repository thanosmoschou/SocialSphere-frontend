import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../api/user";

export const useUserById = (userId: number) => {
   return useQuery({
      queryKey: ["user", userId],
      queryFn: () => fetchUserById(userId),
      enabled: !!userId,
      retry: false,
      });
};
