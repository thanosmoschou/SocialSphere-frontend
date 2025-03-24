import { stats } from "../../../data/data";
import BarChartIcon from '@mui/icons-material/BarChart';

export type Stat = {
   name: string;
   stat: number;
};

export const Stats = () => {
   return (
      <section className="flex flex-col items-center gap-y-5 bg-white rounded-2xl p-5">
         <header className="flex flex-col items-start gap-y-2 w-full">
            <section className="flex items-center gap-x-2">
               <h1 className="text-black text-2xl font-medium">Your Stats</h1>
               <BarChartIcon />
            </section>
            <h3 className="text-gray-500 text-sm font-medium">
               Based on your Profile
            </h3>
         </header>
         {stats.map((stat: Stat, index: number) => {
            return (
               <section className="flex justify-between items-center w-full" key={index}>
                  <section className="flex flex-col items-start gap-y-1">
                     <h2 key={index} className="text-black text-xl font-medium">
                        #{stat.name}
                     </h2>
                     <p className="text-gray-500 text-sm font-medium">
                        {stat.stat} posts
                     </p>
                  </section>
                  <button className="bg-black text-white px-4 py-2 rounded-full">
                     Browse
                  </button>
               </section>
            );
         })}
      </section>
   );
};
