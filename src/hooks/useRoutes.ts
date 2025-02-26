import { useLocation, useNavigate } from 'react-router-dom';
import { routes, RouteKeys } from '../routes/routes';

export const useRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = routes.find(route => route.path === location.pathname);

  const navigateTo = (path: RouteKeys) => {
    navigate(path);
  };

  return {
    routes,
    currentRoute,
    navigateTo,
    currentPath: location.pathname
  };
}; 