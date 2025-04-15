import { AuthFormProps, InputProps } from "./auth";
import { Input } from "./form-input";
import { useState } from "react";
import { useLogin } from "../../features/use-login";
import { useRegister } from "../../features/use-register";
import { useNavigate } from "react-router-dom";

type FormProps = {
    inputs: InputProps[];
    info: AuthFormProps;
}

type FormData = {
    [key: string]: string;
}

export const Form = (props: FormProps) => {
    const [formData, setFormData] = useState<FormData>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const login = useLogin((data) => {
        console.log(data);
        navigate("/");
        console.log("login successful");
    }, (error) => {
        console.log(error);
    });

    const register = useRegister((data) => {
        console.log(data);
        navigate("/");
        console.log("register successful");
    }, (error) => {
        console.log(error);
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        if (props.info.formType === "sign-in") {
            login.mutate({ 
                username: formData.username, 
                password: formData.password 
            });
        } else if (props.info.formType === "sign-up") {
            register.mutate({ 
                username: formData.username, 
                password: formData.password, 
                email: formData.email 
            });
        }
    }

    return (
        <form className="space-y-6 w-[70%] xl:w-[50%]" onSubmit={handleSubmit}>
            {props.inputs.map((input) => (
                <Input 
                    {...input} 
                    key={input.name} 
                    onChange={handleChange}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
                {props.info.button}
            </button>

            <div className="text-center text-gray-400 text-sm">
                {props.info.linkText}
                <a
                    href={props.info.href}
                    className="text-white font-medium hover:underline"
                >
                    {props.info.link}
                </a>
            </div>
        </form>
    )
}