// Breadcrumb.tsx
import { Link, useLocation } from "react-router-dom";

export function Breadcrumb() {
  const location = useLocation();

  // Skjul breadcrumb på home page
  if (location.pathname === "/") return null;

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="px-4 py-2">
      <nav aria-label="Breadcrumb">
        <ol className="flex text-gray-700 space-x-1 sm:space-x-2">
          <li>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
          </li>
          {paths.map((path, index) => {
            const to = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;
            if (path === "cart") return null;

            return (
              <li key={to} className="flex items-center">
                <span className="mx-1 sm:mx-2">/</span>
                {isLast ? (
                  <span className="text-gray-500">{path}</span>
                ) : (
                  <Link to={to} className="text-blue-500 hover:text-blue-700">
                    {path}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
