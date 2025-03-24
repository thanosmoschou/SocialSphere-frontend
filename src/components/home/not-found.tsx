import { ArrowBack, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavContext } from "../../store/nav-context";
export const NotFound = () => {
   const context = useNavContext();

   const handleClick = () => {
      context.setCurrentPage("feed");
   }
   return (
      <div className="bg-white h-screen flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
         <div className="space-y-6 max-w-md">
            <div className="relative">
               <h1 className="text-9xl font-extrabold tracking-tighter text-primary">
                  404
               </h1>
            </div>

            <div className="space-y-2">
               <h2 className="text-3xl font-bold tracking-tight">
                  Page not found
               </h2>
               <p className="text-muted-foreground">
                  Sorry, we couldn't find the page you're looking for. It might
                  have been moved, deleted, or never existed.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
               <button className="bg-primary text-white px-4 py-2 rounded-md">
                  Back to home
                  <Link
                     to={"/"}
                     className="flex items-center gap-x-2 text-black"
                     onClick={handleClick}
                  >
                     <ArrowBack />
                     <p>Go Back</p>
                  </Link>
               </button>
            </div>
         </div>
      </div>
   );
};
