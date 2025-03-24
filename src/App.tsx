import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SignIn } from "./components/auth/sign-in";
import { SignUp } from "./components/auth/sign-up";
import { Home } from "./components/home/home";
import { Feed } from "./components/feed/feed";
import { MessageList } from "./components/messages/message-list";
import { NotFound } from "./components/home/not-found";
import { NavProvider } from "./store/nav-context";

function App() {
   return (
      // Route configuration
      <NavProvider>
         <Routes>
            <Route path="/sign-up" element={<SignUp />} />
         <Route path="/sign-in" element={<SignIn />} />
         <Route path="/" element={<Home />} >
            <Route path="/feed" element={<Feed />} />
            <Route path="/messages" element={<MessageList />} />
         </Route>
            <Route 
              path="*" 
              element={<NotFound />} 
            />
         </Routes>
      </NavProvider>
   );
}

export default App;
