import { useAuth } from "../context/AuthContext";

interface LogoutProps {
  collapsed?: boolean;
}

export default function Logout({ collapsed }: LogoutProps) {
  const { logout } = useAuth();

  return (
    <button 
      onClick={logout} 
      className={`btn btn-outline-danger ${collapsed ? 'px-2' : ''}`}
      title={collapsed ? 'Logout' : ''}
    >
      <i className="bi bi-box-arrow-right"></i>
      {!collapsed && <span className="ms-2">Logout</span>}
    </button>
  );
}