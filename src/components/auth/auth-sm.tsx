import Logo from "../../assets/logo.png";
import { AuthFormProps } from "./auth";
import { Form } from "./form";

export const AuthFormSm = (props:AuthFormProps) => {

    return (
        <section
        className={`w-full flex flex-col flex-1 gap-y-10 items-center justify-center`}
     >
        <section
           className={`w-full text-4xl sm:text-5xl font-medium text-white flex items-center gap-x-2 p-10 justify-center`}
        >
           <img src={Logo} alt="Logo" className={`w-12`} />
           <h2>SocialSphere</h2>
        </section>
        <header className={`text-white text-center`}>
           <h1 className={`text-2xl xl:text-4xl font-medium`}>
              {props.header}
           </h1>
           <h3 className={`text-sm xl:text-lg`}>
              {props.subheader}
           </h3>
        </header>
        <Form inputs={props.inputs} info={props} />
     </section>
    )
}