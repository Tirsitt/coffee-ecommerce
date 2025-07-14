import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

type LoginProps = {
  isAdmin?: boolean;
  redirectPath?: string;
};

export default function Login({ 
  isAdmin = false, 
  redirectPath = isAdmin ? "/admin/dashboard" : "/" 
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password, isAdmin);
      navigate(redirectPath); // Redirect after successful login
    } catch (err) {
      setError(
        isAdmin 
          ? "Admin login failed. Check credentials or contact support."
          : "Incorrect email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className={`card shadow ${isAdmin ? "border-danger" : ""}`}>
            <div className="card-body">
              <h3 className="text-center mb-4">
                {isAdmin ? (
                  <>
                    <i className="bi bi-shield-lock me-2"></i>
                    Admin Portal
                  </>
                ) : (
                  "Welcome Back"
                )}
              </h3>
              
              {isAdmin && (
                <div className="alert alert-warning small mb-4">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Restricted to authorized personnel only
                </div>
              )}

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete={isAdmin ? "off" : "email"}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isAdmin ? "off" : "current-password"}
                    minLength={isAdmin ? 12 : 8}
                  />
                  {isAdmin && (
                    <div className="form-text text-end small">
                      Minimum 12 characters
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`btn w-100 ${isAdmin ? "btn-danger" : "btn-primary"}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : isAdmin ? (
                    <i className="bi bi-shield-lock me-2"></i>
                  ) : null}
                  {isLoading ? "Verifying..." : "Login"}
                </button>
              </form>

              {!isAdmin && (
                <div className="text-center mt-3">
                  <span className="text-muted small">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </span>
                  <div className="mt-2">
                    <Link to="/forgot-password" className="small">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}