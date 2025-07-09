import { Link } from "react-router-dom";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: string;
  children?: React.ReactNode;
};

export default function EmptyState({
  title = "Nothing here",
  description = "We couldn't find what you're looking for",
  icon = "bi-box",
  children
}: EmptyStateProps) {
  return (
    <div className="text-center py-5 my-5">
      <i className={`bi ${icon} display-1 text-muted`}></i>
      <h3 className="my-3">{title}</h3>
      <p className="text-muted mb-4">{description}</p>
      {children || (
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      )}
    </div>
  );
}