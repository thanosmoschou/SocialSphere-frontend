import { Outlet } from "react-router-dom";
import { useNavContext } from "../../store/nav-context";

export const MainContent = () => {
   const context = useNavContext();
   return (
      <section className="flex flex-col h-full rounded-2xl flex-1/3 gap-y-5 px-5 pt-5">
         <header>
            <h1 className="text-white text-2xl font-medium">
               {context.currentPage === "feed" ? "My Feed" : "Messages"}
            </h1>
         </header>
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            <Outlet />
         </section>
      </section>
   );
};
