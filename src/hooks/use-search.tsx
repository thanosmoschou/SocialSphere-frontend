import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/auth";
import { backendUrl } from "../lib/constants";

export const useSearch = (searchTerm: string) => {
    return useQuery({
        queryKey: ["search", searchTerm],
        queryFn: () => apiFetch(`${backendUrl}/search/users/${encodeURIComponent(searchTerm)}`),
        enabled: searchTerm.length > 0,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
