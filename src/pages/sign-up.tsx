import Logo from "../assets/logo.png";
import { useScreenWidth } from "../hooks/use-screenwidth";
import { AuthForm } from "../components/auth/auth";
import { AuthFormSm } from "../components/auth/auth-sm";

const inputs = [
   {
      label: "Profile Name",
      name: "profileName",
      type: "text",
      placeholder: "Dimitris",
      required: true,
      minLength: 1,
   },
   {
      label: "Display Name",
      name: "displayName",
      type: "text",
      placeholder: "dimsparagis",
      required: true,
   },
   {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "d@gmail.com",
      required: true,
   },
   {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
      minLength: 3,
   },
];

const messages = {
   formType: "sign-up",
   title: "Enter your personal information to proceed further",
   header: "Create your account",
   subheader: "Enter your credentials",
   button: "Sign Up",
   linkText: "Already have an account? ",
   link: "Sign In",
   href: "/SocialSphere-frontend/sign-in",
};

export const SignUp = () => {
   const width = useScreenWidth();

   return (
      <>
         {width && width > 768 ? (
            <div className={`h-screen bg-black flex p-5`}>
               <section
                  className={`vertical-gradient-primary flex flex-col gap-y-[2rem] flex-1 lg:flex-1/3 rounded-3xl justify-end p-10`}
               >
                  <section
                     className={`text-white text-4xl lg:text-5xl xl:text-6xl w-[50%]`}
                  >
                     <p>{messages.title}</p>
                  </section>
                  <section
                     className={`text-3xl font-medium text-white flex items-center gap-x-2 `}
                  >
                     <img src={Logo} alt="Logo" className={`w-12`} />
                     <h2>SocialSphere</h2>
                  </section>
               </section>
               {/* Form */}
               <AuthForm {...messages} inputs={inputs} />
            </div>
         ) : (
            <section className="h-screen flex flex-col items-center gap-y-5 p-5 vertical-gradient-primary">
               <AuthFormSm {...messages} inputs={inputs} />
            </section>
         )}
      </>
   );
};
