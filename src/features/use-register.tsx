// src/features/auth/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';

export const useRegister = (onSuccess: (data: any) => void, onError: (error: Error) => void) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error),
  });
};
