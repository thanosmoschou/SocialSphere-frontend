import { SearchBar } from "./search-bar";
import { Hashtags } from "./hashtags";
import { Stats } from "./stats";
import { RecommendedAccounts } from "./recommended-acounts";


export const SideBar = () => {
   return (
      <section className="flex flex-col justify-between gap-y-5 h-full flex-1">
         <SearchBar/>
         <section className="flex flex-col gap-y-5 overflow-y-hidden">
            {/* <section className="horizontal-gradient-primary flex-1 flex flex-col gap-y-5 rounded-2xl p-3">
               <Hashtags/>
               <Stats/>
            </section>
            <RecommendedAccounts/> */}
         </section>
      </section>
   );
};
