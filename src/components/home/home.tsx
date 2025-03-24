import { SideBar } from "./side-bar";
import { MainContent } from "./main-content";
import { NavBar } from "./nav-bar";

export const Home = () => {
   return (
      <section className="bg-black h-screen flex p-5 gap-x-5 overflow-hidden">
         <NavBar />
         <MainContent />
         <SideBar />
      </section>
   );
};
