import { SideBar } from "../components/home/side-bar";
import { MainContent } from "../components/home/main-content";
import { NavBar } from "../components/home/nav-bar";
import { useUser } from "../hooks/use-user";
import { useAuth } from "../hooks/use-auth";
import { decodeJwt } from "../lib/decodeJWT";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../store/user-context";
import { useEffect } from "react";
export const Home = () => {
   // Get access token, decode it and get the user
   const { isAuthenticated, accessToken } = useAuth();
   if (!isAuthenticated) {
      return <Navigate to="/sign-in" />;
   }
   const {
      data: user,
      isLoading,
      isError,
      isSuccess,
   } = useUser(decodeJwt(accessToken!).sub);

   console.log("user", user?.displayName);

   // Update the user context
   const { setUser } = useUserContext();

   useEffect(() => {
      if (isSuccess && user) {
        setUser(user);
      }
    }, [isSuccess, user]);

   // If the user is loading, show a loading message
   if (isLoading) return <p className="text-white">Loading profile...</p>;

   // If the user is not found or there is an error, show an error message
   if (isError || !user)
      return <p className="text-white">Error loading profile.</p>;

   return (
      <section className="bg-black h-screen flex p-5 gap-x-5 overflow-hidden">
         <NavBar />
         <MainContent />
         <SideBar />
      </section>
   );
};
