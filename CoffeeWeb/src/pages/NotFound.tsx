import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <div className="display-1 text-muted mb-4">404</div>
      <h1 className="h2 mb-3">Oops.. Page not found</h1>
      <p className="h4 text-muted fw-normal mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-home me-2"></i>Return Home
        </Link>
        <Link to="/shop" className="btn btn-outline-primary">
          <i className="fas fa-store me-2"></i>Browse Shop
        </Link>
      </div>
    </div>
  );
}