import { Link } from 'react-router-dom';
import { useRoutes } from '../hooks/useRoutes';

const Navbar = () => {
  const { routes, currentPath } = useRoutes();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4 items-center">
            {routes.map(route => (
              <Link
                key={route.path}
                to={route.path}
                className={`px-3 py-2 rounded-md ${
                  currentPath === route.path
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-800 hover:text-gray-600'
                }`}
              >
                {route.path === '/' ? 'Home' : route.element}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 