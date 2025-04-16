import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";
import { isTokenValid, useAuth } from "./use-auth";

export const useUser = (email: string) => {
   
   const { accessToken } = useAuth();
   return useQuery({
      queryKey: ["me"],
      queryFn: () => fetchUser(email),
      enabled: !!accessToken && isTokenValid(accessToken),
      retry: false,
   });
};
