import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../store/user-context";
import { useEffect } from "react";
import { fetchUser } from "../api/user";
import { useAuth } from "./use-auth";
import { decodeJwt } from "../lib/decodeJWT";

export const useProfile = () => {
   const { setUser } = useUserContext();
   const { accessToken } = useAuth();

   const { data, isLoading, isError, isSuccess } = useQuery({
      queryKey: ["user", decodeJwt(accessToken!).sub],
      queryFn: () => fetchUser(decodeJwt(accessToken!).sub),
   });

   useEffect(() => {
      if (isSuccess && data) {
         // Split skills and interests into arrays
         console.log("Data:", data);
         let skills: string[] = [];
         let interests: string[] = [];
         if (data.skills && data.skills !== "") {
            skills = data.skills.split(',').map((skill: string) => skill.trim());
         }
         if (data.interests && data.interests !== "") {
            interests = data.interests.split(',').map((interest: string) => interest.trim());
         }

         // Create a new user object with skills and interests as arrays
         const userWithArrays = {
            ...data,
            skills: skills,
            interests: interests
         };

         console.log("Setting User:", userWithArrays);
         setUser(userWithArrays);
      }
   }, [isSuccess, data]);

   return {
      data,
      isLoading,
      isError,
   };
}; 