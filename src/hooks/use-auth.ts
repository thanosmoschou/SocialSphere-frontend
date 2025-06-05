// This hook is responsible for checking if the user is authenticated
export const useAuth = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const isAuthenticated = !!accessToken && isTokenValid(accessToken) && !!refreshToken && isTokenValid(refreshToken);

  return { accessToken, refreshToken, isAuthenticated };
};

export function isTokenValid(token: string) {
  try {
    const [, payload] = token.split(".");
    const { exp } = JSON.parse(atob(payload));
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
