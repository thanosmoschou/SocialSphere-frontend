// src/api/auth.ts
import { authUrl, backendUrl } from "../lib/constants";
import { useNavigate } from "react-router-dom";

export const loginUser = async (credentials: {
   username: string;
   password: string;
}) => {
   // Use apiFetch to login
   const res = await fetch(`${authUrl}/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
   });

   if (!res.ok) throw new Error("Login failed");

   const data = await res.json(); // { accessToken, refreshToken }
   localStorage.setItem("accessToken", data.accessToken);
   localStorage.setItem("refreshToken", data.refreshToken);
   return data;
};

export const registerUser = async (userData: {
   displayName: string;
   profileName: string;
   password: string;
   email: string;
}) => {
   const res = await fetch(`${authUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
   });

   if (!res.ok) throw new Error("Registration failed");

   const data = await res.json(); // { accessToken, refreshToken }
   localStorage.setItem("accessToken", data.accessToken);
   localStorage.setItem("refreshToken", data.refreshToken);
   return data;
};

// src/lib/tryRefreshToken.ts
export const tryRefreshToken = async (): Promise<string | null> => {
   const refreshToken = localStorage.getItem("refreshToken");
   if (!refreshToken) return null;
 
   try {
     const res = await fetch(`${authUrl}/refresh`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ refreshToken }),
     });
 
     if (!res.ok) return null;
 
     const data = await res.json(); // { accessToken: "..." }
     localStorage.setItem("accessToken", data.accessToken);
     return data.accessToken;
   } catch (err) {
     console.error("Refresh failed:", err);
     return null;
   }
 };
 

export const logout = () => {
   const navigate = useNavigate();
   localStorage.removeItem("accessToken");
   localStorage.removeItem("refreshToken");
   navigate("/sign-in");
};

export const apiFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(url === `${backendUrl}/post/create-include-photo` ? 
        '' : 
        { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    // Try to refresh the token
    const newToken = await tryRefreshToken();
    if (newToken) {
      // Retry the request with the new token
      return apiFetch(url, options);
    }
    // If refresh failed, clear tokens and redirect
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/sign-in";
    return;
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Request failed");
  }

  // If the response is a json, return the json
  if (res.headers.get("content-type")?.includes("application/json")) {
    const data = await res.json();
    return data;
  }
  
  return res;
};

