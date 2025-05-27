import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/auth";
import { backendUrl } from "../lib/constants";

interface SearchResults {
    users: any[];
    posts: any[];
    // hashtags: any[];
}

export const useSearch = (searchTerm: string) => {
    return useQuery({
        queryKey: ["search", searchTerm],
        queryFn: async () => {
            const [usersResponse, postsResponse] = await Promise.all([
                apiFetch(`${backendUrl}/search/users/${encodeURIComponent(searchTerm)}`),
                apiFetch(`${backendUrl}/search/posts-by-hashtag?hashtag=${encodeURIComponent(searchTerm)}`),
                // apiFetch(`${backendUrl}/search/hashtags/${encodeURIComponent(searchTerm)}`)
            ]);

            return {
                users: usersResponse,
                posts: postsResponse,
                // hashtags: hashtagsResponse
            } as SearchResults;
        },
        enabled: searchTerm.length > 0,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
