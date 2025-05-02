import { backendUrl } from "../lib/constants";

export const searchUsers = async (search: string) => {
    const response = await fetch(`${backendUrl}/search/users/${search}`);
    const data = await response.json();
    return data;
};