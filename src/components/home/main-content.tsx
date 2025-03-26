import { Outlet } from "react-router-dom";

export const MainContent = () => {
   return (
      <section className="flex flex-col h-full rounded-2xl flex-1/3 gap-y-5 px-5 pt-5">
         <Outlet />
      </section>
   );
};
