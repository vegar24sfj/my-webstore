import { Link, useLocation } from "react-router-dom";

export function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean); // Split and remove empty strings

  return (
    <div className="bg-gray-200 p-4">
      <nav aria-label="Breadcrumb">
        <ol className="flex justify-center text-gray-700 space-x-2">
          <li>
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
          </li>
          {paths.map((path, index) => {
            const to = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;

            // Skip the cart route in the breadcrumb
            if (path === "cart") return null;

            return (
              <li key={to} className="flex items-center">
                <span className="mx-2">/</span>
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
