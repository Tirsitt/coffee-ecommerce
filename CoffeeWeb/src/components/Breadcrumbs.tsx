import { Link } from "react-router-dom";

type Breadcrumb = {
  name: string;
  link?: string;
};

interface BreadcrumbsProps {
  paths: Breadcrumb[];
  className?: string;
}

const Breadcrumbs = ({ paths, className = "" }: BreadcrumbsProps) => (
  <nav aria-label="breadcrumb" className={className}>
    <ol className="breadcrumb">
      {paths.map((crumb, idx) => (
        <li
          key={idx}
          className={`breadcrumb-item${
            idx === paths.length - 1 ? " active" : ""
          }`}
          aria-current={idx === paths.length - 1 ? "page" : undefined}
        >
          {crumb.link && idx !== paths.length - 1 ? (
            <Link to={crumb.link} className="text-decoration-none">
              {crumb.name}
            </Link>
          ) : (
            <span>{crumb.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;