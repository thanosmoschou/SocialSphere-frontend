
import { SideBar } from "./side-bar";
import { Feed } from "./feed";
import { NavBar } from "./nav-bar";

export const Home = () => {
    return (
        <section className="bg-black h-screen flex p-5 gap-x-5 overflow-hidden">
            <NavBar/>
            <Feed/>
            <SideBar />
        </section>
    );
}