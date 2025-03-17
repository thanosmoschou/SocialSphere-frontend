import { Post } from "./post";

export const Feed = () => {
   return (
      <section className="flex flex-col h-full bg-secondaryBlack  rounded-2xl flex-1/3 gap-y-5 p-5">
         <header>
            <h1 className="text-white text-2xl font-medium">My Feed</h1>
         </header>
         <section className="flex flex-col gap-y-5 overflow-scroll">
           <Post/>
           <Post/>
           <Post/>
           <Post/>
           <Post/>
           <Post/>
           <Post/>
         </section>
      </section>
   );
};
