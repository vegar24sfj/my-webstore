import { Link } from "react-router-dom";

type BreadcrumbProps = {
  paths: { name: string; path: string }[];
};

export function Breadcrumb({ paths }: BreadcrumbProps) {
  return (
    <div className="bg-gray-50 p-4 shadow-md">
      <nav aria-label="Breadcrumb">
        <ol className="list-reset flex text-gray-700">
          {paths.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <Link to={item.path} className="text-blue-500 hover:text-blue-700">
                {item.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
