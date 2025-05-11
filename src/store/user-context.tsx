import React, { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "../lib/decodeJWT";
import { User } from "../types/types";
import { fetchUser } from "../api/user";
import { useAuth } from "../hooks/use-auth";


type UserContextType = {
   user: User | null;
   setUser: (user: User) => void;
   refetchUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
   user: null,
   setUser: () => {},
   refetchUser: () => Promise.resolve(),
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
   const { accessToken } = useAuth();

   const setUserState = (user: User) => {
      // console.log("User Context:",user);
      setUser(user);
   };

   const refetchUser = async () => {
      const userData = await fetchUser(decodeJwt(accessToken!).sub);
      console.log("Refetching User:", userData);
      let skills: string[] = [];
      let interests: string[] = [];
      if (userData.skills && userData.skills !== "") {
         skills = userData.skills.split(',').map((skill: string) => skill.trim());
      }
      if (userData.interests && userData.interests !== "") {
         interests = userData.interests.split(',').map((interest: string) => interest.trim());
      }
      const userWithArrays = {
         ...userData,
         skills: skills,
         interests: interests
      };
      setUser(userWithArrays);
   }
   

   return (
      <UserContext.Provider
         value={{ user, setUser: setUserState, refetchUser }}
      >
         {children}
      </UserContext.Provider>
   );
};

export const useUserContext = () => useContext(UserContext);
