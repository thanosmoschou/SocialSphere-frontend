import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../api/user";

export const useUsersById = (userIds: number[]) => {
   return useQuery({
      queryKey: ["users", userIds],
      queryFn: async () => {
         const users = await Promise.all(
            userIds.map((id) => fetchUserById(id))
         );
         return users;
      },
      enabled: userIds.length > 0,
      placeholderData: (previousData) => previousData, // When fetching new data, use the previous data for the placeholder
      staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
   });
}; 