import Logo from "../../assets/logo.png";
import { useScreenWidth } from "../../hooks/use-screenwidth";
import { Input } from "./form-input";

const inputs = [
  {
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Dimitris",
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
  },
];

const messages = {
  title: "Enter your personal information to proceed further",
  header: "Create your account",
  subheader: "Enter your credentials",
  button: "Sign Up",
  linkText: "Already have an account? ",
  link: "Sign In",
}

export const SignUp = () => {
  const width = useScreenWidth();

  console.log(width);

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
          <section
            className={`flex flex-col flex-1 gap-y-10 items-center justify-center`}
          >
            <header className={`text-white text-center`}>
              <h1 className={`text-2xl xl:text-4xl font-medium`}>
                {messages.header}
              </h1>
              <h3 className={`text-sm xl:text-lg`}>{messages.subheader}</h3>
            </header>
            <form className="space-y-6 w-[70%] xl:w-[50%]">
              {inputs.map((input) => (
                <Input key={input.name} {...input} />
              ))}
              <button
                type="submit"
                className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                {messages.button}
              </button>

              <div className="text-center text-gray-400 text-sm">
                {messages.linkText}
                <a
                  href="/login"
                  className="text-white font-medium hover:underline"
                >
                  {messages.link}
                </a>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <section className="h-screen flex flex-col items-center gap-y-5 p-5 vertical-gradient-primary">
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
                {messages.header}
              </h1>
              <h3 className={`text-sm xl:text-lg`}>{messages.subheader}</h3>
            </header>
            <form className="space-y-6 w-[70%] xl:w-[50%]">
              {inputs.map((input) => (
                <Input key={input.name} {...input} />
              ))}
              <button
                type="submit"
                className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                {messages.button}
              </button>

              <div className="text-center text-gray-400 text-sm">
                {messages.linkText}
                <a
                  href="/login"
                  className="text-white font-medium hover:underline"
                >
                  {messages.link}
                </a>
              </div>
            </form>
          </section>
        </section>
      )}
    </>
  );
};
