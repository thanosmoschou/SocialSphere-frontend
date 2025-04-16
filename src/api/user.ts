import { apiFetch } from "./auth";
import { backendUrl } from "../lib/constants";

export const fetchUser = (email: string) => {
  return apiFetch(`${backendUrl}/user/get-user?email=${encodeURIComponent(email)}`);
};
