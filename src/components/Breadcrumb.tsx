import { Link, useLocation } from "react-router-dom";

type BreadcrumbProps = {
  paths: { name: string; path: string }[];
};

export function Breadcrumb({ paths }: BreadcrumbProps) {
  const location = useLocation();

  return (
    <div className="bg-gray-50 p-4 shadow-md">
      <nav aria-label="Breadcrumb">
        <ol className="flex justify-center text-gray-700 space-x-2">
          {paths.map((item, index) => {
            const isActive = location.pathname === item.path; // Check if the breadcrumb is for the current page

            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                <Link
                  to={item.path}
                  className={`${
                    isActive ? "text-gray-500" : "text-blue-500"
                  } hover:text-blue-700`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
