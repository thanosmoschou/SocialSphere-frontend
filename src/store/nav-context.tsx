import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "./user-context";

type NavContextType = {
   currentPage: string;
   setCurrentPage: (page: string) => void;
};

export const NavContext = createContext<NavContextType>({
   currentPage: "feed",
   setCurrentPage: () => {},
});

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
   const [active, setActive] = useState("feed");
   const location = useLocation();
   const navigate = useNavigate();
   const { user } = useUserContext();

   // Sync route with context(when the location (route) changes, the active page is updated)
   useEffect(() => {
      if (location.pathname === "/") {
         setActive("feed");
         navigate("/feed");
      } else if (location.pathname.includes("/profile")) {
         if (user?.userId === Number(location.pathname.split("/")[2])) {
            setActive("myprofile");
         } else {
            setActive("friends");
         }
      } else {
         setActive(location.pathname.split("/")[1]);
      }
   }, [location, user]);

   const setActivePage = (page: string) => {
      if (page === "myprofile") {
         setActive("myprofile");
         navigate(`/profile/${user?.userId}`);
      } else {
         setActive(page);
         navigate(page);
      }
   };

   return (
      <NavContext.Provider
         value={{ currentPage: active, setCurrentPage: setActivePage }}
      >
         {children}
      </NavContext.Provider>
   );
};

export const useNavContext = () => useContext(NavContext);
