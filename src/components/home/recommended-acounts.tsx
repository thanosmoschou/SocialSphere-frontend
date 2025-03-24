import { recommendedAccounts } from "../../../data/data";
import ProfilePicture from "../../assets/profile-picture.png";

export type RecommendedAccount = {
   name: string;
   username: string;
};

export const RecommendedAccounts = () => {
   return (
      <section className="flex flex-1 flex-col items-center gap-y-5 bg-secondaryBlack rounded-2xl p-5 h-full overflow-scroll">
         <header className="w-full">
            <h1 className="text-white text-2xl font-medium">
               Recommended Accounts
            </h1>
         </header>
         <section className="flex flex-col gap-y-5 justify-between items-center w-full overflow-scroll">
            {recommendedAccounts.map(
               (account: RecommendedAccount, index: number) => {
                  return (
                     <section className="flex gap-x-2 justify-between items-center w-full" key={index}>
                        <section className="flex items-center gap-x-5">
                           <img
                              src={ProfilePicture}
                              alt="Profile Picture"
                              className="w-10 h-10 rounded-full"
                           />
                           <section className="flex flex-col items-start gap-y-1">
                              <h2 className="text-white text-xl font-medium">
                                 {account.name}
                              </h2>
                              <p className="text-gray-500 text-sm font-medium">
                                 {account.username}
                              </p>
                           </section>
                        </section>
                        <button className="bg-white text-black px-4 py-2 rounded-full">
                           Follow
                        </button>
                     </section>
                  );
               }
            )}
         </section>
      </section>
   );
};
