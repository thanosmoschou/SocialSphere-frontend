import { getFriends } from "../api/user";
import { useQuery } from "@tanstack/react-query";

export const useFriends = () => {
   const { data, isLoading, error } = useQuery({
      queryKey: ["friends"],
      queryFn: () => getFriends(),
   });

   return { data, isLoading, error };
};
