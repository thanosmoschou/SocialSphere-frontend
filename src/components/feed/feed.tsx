import { Post } from "./post";

export const Feed = () => {
   return (
      <section className="h-full flex flex-col gap-y-5 overflow-scroll">
         <section>
            <h1 className="text-white text-2xl font-medium">My Feed</h1>
         </section>
         <section className="h-full flex flex-col gap-y-5 overflow-scroll">
            {/* <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post /> */}
         </section>
      </section>
   );
};
