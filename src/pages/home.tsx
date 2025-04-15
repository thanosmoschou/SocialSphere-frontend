import { SideBar } from "../components/home/side-bar";
import { MainContent } from "../components/home/main-content";
import { NavBar } from "../components/home/nav-bar";

export const Home = () => {
   return (
      <section className="bg-black h-screen flex p-5 gap-x-5 overflow-hidden">
         <NavBar />
         <MainContent />
         <SideBar />
      </section>
   );
};
