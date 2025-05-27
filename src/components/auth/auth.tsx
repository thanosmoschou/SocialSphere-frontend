import { Form } from "./form";

export type AuthFormProps = {
    formType:string;
    header:string;
    subheader:string;
    button:string;
    linkText:string;
    link:string;
    href:string;
    inputs:InputProps[];
}

export type InputProps = {
    label:string;
    name:string;
    type:string;
    placeholder:string;
    required:boolean;
}

export const AuthForm = (props:AuthFormProps) => {
   
   return (
      <section
         className={`flex flex-col flex-1 gap-y-10 items-center justify-center`}
      >
         <header className={`text-white text-center`}>
            <h1 className={`text-2xl xl:text-4xl font-medium`}>
               {props.header}
            </h1>
            <h3 className={`text-sm xl:text-lg`}>{props.subheader}</h3>
         </header>
         <Form inputs={props.inputs} info={props} />
      </section>
   );
};
