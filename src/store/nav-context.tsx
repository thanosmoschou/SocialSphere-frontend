import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

   // Sync route with context(when the location (route) changes, the active page is updated)
   useEffect(() => {
      if (location.pathname === "/") {
         setActive("feed");
         navigate("/feed");
      } else if (location.pathname.includes("/profile")) {
         setActive("friends");
      } else {
         setActive(location.pathname.split("/")[1]);
      }
   }, [location]);

   const setActivePage = (page: string) => {
      setActive(page);
      navigate(page);
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
