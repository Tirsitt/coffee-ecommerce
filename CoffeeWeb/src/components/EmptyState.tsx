import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  icon?: string;
};

export default function EmptyState({ title, description, icon = "bi-box" }: Props) {
  return (
    <div className="text-center py-5 my-5">
      <i className={`bi ${icon} display-1 text-muted mb-4`}></i>
      <h3 className="mb-3">{title}</h3>
      <p className="text-muted mb-4">{description}</p>
      <Link to="/" className="btn btn-primary">
        Browse All Products
      </Link>
    </div>
  );
}