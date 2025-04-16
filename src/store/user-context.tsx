import React, { createContext, useContext, useState } from "react";

type User = {
    id:number;
    email:string;
    username:string;
    profileName:string;
    posts:[];
    role:string;
    followers:[];
    following:[];
}

type UserContextType = {
   user: User | null;
   setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
   user: null,
   setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);

   const setUserState = (user: User) => {
      console.log("User Context:",user);
      setUser(user);
   };

   return (
      <UserContext.Provider
         value={{ user, setUser: setUserState }}
      >
         {children}
      </UserContext.Provider>
   );
};

export const useUserContext = () => useContext(UserContext);
