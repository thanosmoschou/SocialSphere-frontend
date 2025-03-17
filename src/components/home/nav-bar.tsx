import Logo from "../../assets/logo-gradient.png";
import Profile from "../../assets/profile-picture.png";

import FeedIcon from '@mui/icons-material/Feed';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  {
      icon: <FeedIcon className="text-white"/>,
      label: "Feed",
      path: "/feed"
  },
  {
      icon: <MessageIcon className="text-white"/>,
      label: "Messages",
      path: "/messages"
  },
  {
      icon: <GroupIcon className="text-white"/>,
      label: "Friends",
      path: "/friends"
  },
  {
      icon: <PersonIcon className="text-white"/>,
      label: "My Profile",
      path: "/profile"
  },
  {
      icon: <SettingsIcon className="text-white"/>,
      label: "Settings",
      path: "/settings"
  }
]

export const NavBar = () => {
   return (
      <section className="relative flex flex-col h-full justify-between flex-1">
         <section className="space-y-10">
            <header className="flex flex-col gap-y-5 p-10">
               <section className="flex items-center justify-center">
                  <img src={Logo} alt="Logo" className="w-20" />
                  <img src={Profile} alt="Profile" className="w-20 ml-[-1em]" />
               </section>
               <section className="flex flex-col items-center text-center">
                  <h1 className="text-white text-3xl font-medium">
                     Dimitris Sparagis
                  </h1>
                  <p className="text-secondaryGray text-lg">@dimsparagis</p>
               </section>
            </header>
            <section className="flex flex-col gap-y-5 w-full">
               {navItems.map((item) => (
                  <section className="flex items-center gap-x-5 w-full p-5">
                     {item.icon}
                     <p className="text-white text-xl font-medium">
                        {item.label}
                     </p>
                  </section>
               ))}
            </section>
         </section>
         <section className='pl-10'>
            <div
            className="w-full 2xl:w-[80%] blur-xl 2xl:blur-2xl aspect-square rounded-full horizontal-gradient-primary"
            />
         </section>
         <section className="flex flex-col gap-y-5 w-full">
            <section className="flex items-center gap-x-5">
               <p className="text-white text-2xl font-medium">@SocialSphere</p>
            </section>
         </section>
         
      </section>
   );
};
