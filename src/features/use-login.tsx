import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api/auth";

export const useLogin = (onSuccess: (data: any) => void, onError: (error: Error) => void) => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            onSuccess(data);
        },
        onError: (error) => {
            onError(error);
        }
    })

}