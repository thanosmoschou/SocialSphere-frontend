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
      // Περιβάλλουμε την εφαρμογή με τους απαραίτητους Providers
      <UserProvider>
         <NavProvider>
            {/* Ο RedirectHandler παραμένει για να χειρίζεται παραμέτρους ανακατεύθυνσης στο URL */}
            <RedirectHandler />
            <Routes>
               {/* Δημόσιες Διαδρομές: 
            Αυτές οι διαδρομές είναι προσβάσιμες χωρίς έλεγχο ταυτότητας.
            Είναι ανεξάρτητες και βρίσκονται εκτός οποιασδήποτε ProtectedRoute.
          */}
               <Route path="/sign-up" element={<SignUp />} />
               <Route path="/sign-in" element={<SignIn />} />

               {/* Προστατευμένες Διαδρομές: 
            Όλες οι διαδρομές που απαιτούν σύνδεση ομαδοποιούνται εδώ.
            Η ProtectedRoute λειτουργεί ως "πύλη" για το / (την αρχική σελίδα του συνδεδεμένου χρήστη)
            και όλες τις υπο-διαδρομές που είναι ένθετες στην Home component.
          */}
               <Route element={<ProtectedRoute />}>
                  {/* Η Home component είναι τώρα το κύριο layout για τις προστατευμένες διαδρομές.
              Το "path="/" " εδώ σημαίνει ότι η Home θα φορτώνεται για τη ριζική διαδρομή
              μόνο αν ο χρήστης είναι authenticated.
            */}
                  <Route path="/" element={<Home />}>
                     {/* Ένθετες διαδρομές εντός της Home component. 
                Αυτές είναι οι σελίδες που εμφανίζονται αφού ο χρήστης συνδεθεί.
                Η 'index' route εμφανίζεται όταν ο χρήστης βρίσκεται ακριβώς στη ριζική διαδρομή
                (π.χ., /SocialSphere-frontend/ ) αφού έχει συνδεθεί.
              */}
                     <Route index element={<Feed />} /> {/* Προεπιλεγμένο περιεχόμενο για τη ριζική διαδρομή "/" */}
                     <Route path="/feed" element={<Feed />} />
                     <Route path="/messages" element={<MessageList />} />
                     <Route path="/messages/:id" element={<Message />} />
                     <Route path="/discover" element={<Discover />} />
                     <Route path="/profile/:userId" element={<Profile />} />
                     {/* Προαιρετική διαδρομή 404 για το εσωτερικό των προστατευμένων διαδρομών.
                Αν ο χρήστης είναι συνδεδεμένος και πάει σε μια μη υπάρχουσα υπο-διαδρομή.
              */}
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

// Helper for redirects
function RedirectHandler() {
   const navigate = useNavigate();

   useEffect(() => {
      // Διαβάζουμε την αποθηκευμένη διαδρομή από το sessionStorage
      const redirectUrl = sessionStorage.getItem("redirectUrl");
      if (redirectUrl) {
         // Πλοήγηση στην αρχική διαδρομή
         navigate(redirectUrl, { replace: true });
         // Καθαρίζουμε το sessionStorage για να αποφύγουμε επαναλαμβανόμενες ανακατευθύνσεις
         sessionStorage.removeItem("redirectUrl");
      }
   }, [navigate]); // Προσθέτουμε το navigate ως εξάρτηση για το useEffect

   return null;
}
