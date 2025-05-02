import { SideBar } from "../components/home/side-bar";
import { MainContent } from "../components/home/main-content";
import { NavBar } from "../components/home/nav-bar";
import { useProfile } from "../hooks/use-profile";
import { useAuth } from "../hooks/use-auth";
import { decodeJwt } from "../lib/decodeJWT";
import { Navigate } from "react-router-dom";

export const Home = () => {
   // Get access token, decode it and get the user
   const { isAuthenticated } = useAuth();
   if (!isAuthenticated) {
      return <Navigate to="/sign-in" />;
   }
   const {
      data: profile,
      isLoading,
      isError,
   } = useProfile();

   // If the user is loading, show a loading message
   if (isLoading) return <p className="text-white">Loading profile...</p>;

   // If the user is not found or there is an error, show an error message
   if (isError || !profile) {
      return <Navigate to="/sign-in" />;
   }

   return (
      <section className="bg-black h-screen flex p-5 gap-x-5 overflow-hidden">
         <NavBar />
         <MainContent />
         <SideBar />
      </section>
   );
};
