import { hashtags } from "../../../data/data";

export type Hashtag = {
   name: string;
   numOfPosts: number;
};

export const Hashtags = () => {
    return (
        <section className="flex flex-col items-center gap-y-4 bg-white rounded-2xl p-5">
                  {hashtags.map((hashtag: Hashtag, index: number) => {
                     return (
                        <section className="flex justify-between items-center w-full" key={index}>
                           <section className="flex flex-col items-start gap-y-1">
                              <h2
                                 key={index}
                                 className="text-black text-xl font-medium"
                              >
                                 #{hashtag.name}
                              </h2>
                              <p className="text-gray-500 text-sm font-medium">
                                 {hashtag.numOfPosts} posts
                              </p>
                           </section>
                           <button className="bg-black text-white px-4 py-2 rounded-full">
                              Browse
                           </button>
                        </section>
                     );
                  })}
               </section>
    )
}