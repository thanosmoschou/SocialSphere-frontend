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
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing again
        if (error) setError(null);
    }

    const login = useLogin((data) => {
        console.log(data);
        navigate("/"); 
        console.log("login successful");
    }, (error) => {
        console.log(error);
        setError(error.message || "Login failed. Please try again.");
    });

    const register = useRegister((data) => {
        console.log(data);
        navigate("/");
        console.log("register successful");
    }, (error) => {
        console.log(error);
        setError(error.message || "Registration failed. Please try again.");
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setError(null); // Clear any previous errors

        if (props.info.formType === "sign-in") {
            login.mutate({ 
                username: formData.username, 
                password: formData.password 
            });
        } else if (props.info.formType === "sign-up") {
            register.mutate({ 
                displayName: formData.displayName,
                profileName: formData.profileName, 
                password: formData.password, 
                email: formData.email 
            });
        }
    }

    return (
        <form className="space-y-6 w-[70%] xl:w-[50%]" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm">
                    {error}
                </div>
            )}
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