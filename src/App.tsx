import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { Home } from "./pages/home"; // Η Home component που περιέχει το κύριο layout για συνδεδεμένους χρήστες
import { Feed } from "./components/feed/feed";
import { MessageList } from "./components/messages/message-list";
import { NotFound } from "./components/home/not-found";
import { NavProvider } from "./store/nav-context";
import { ProtectedRoute } from "./routes/protected-route";
import { UserProvider } from "./store/user-context";
import { Message } from "./components/messages/message";
import { Discover } from "./components/discover/discover";
import { Profile } from "./components/profile/profile";

function App() {
   return (
      <UserProvider>
         <NavProvider>
            <RedirectHandler />
            <Routes>
               <Route path="/sign-up" element={<SignUp />} />
               <Route path="/sign-in" element={<SignIn />} />

               <Route element={<ProtectedRoute />}>

                  <Route path="/" element={<Home />}>

                     <Route index element={<Feed />} />

                     <Route path="/feed" element={<Feed />} />
                     <Route path="/messages" element={<MessageList />} />
                     <Route path="/messages/:id" element={<Message />} />
                     <Route path="/discover" element={<Discover />} />
                     <Route path="/profile/:userId" element={<Profile />} />

                     <Route path="*" element={<NotFound />} />
                  </Route>
               </Route>

               {/* Γενική Διαδρομή 404 (Not Found):
            Αυτή η διαδρομή πρέπει να είναι η τελευταία, για να "πιάσει" 
            οποιαδήποτε διαδρομή δεν έχει ταιριάξει παραπάνω.
            Λειτουργεί για μη συνδεδεμένους χρήστες ή για οποιαδήποτε λάθος URL.
          */}
               <Route path="*" element={<NotFound />} />
            </Routes>
         </NavProvider>
      </UserProvider>
   );
}

export default App;

// Helper for redirects (Δεν αλλάζει)
function RedirectHandler() {
   const navigate = useNavigate();

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      if (redirect) {
         navigate(redirect, { replace: true });
      }
   }, []);

   return null;
}
