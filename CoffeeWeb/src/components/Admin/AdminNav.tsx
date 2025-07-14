import { Link, useLocation } from 'react-router-dom';
import Logout from '../Logout';

interface AdminNavProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function AdminNav({ isCollapsed, onToggleCollapse }: AdminNavProps) {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', name: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/admin/products', name: 'Products', icon: 'bi-box-seam' },
    { path: '/admin/orders', name: 'Orders', icon: 'bi-list-check' }
  ];

  return (
    <div 
      className="d-flex flex-column bg-dark text-white position-fixed h-100"
      style={{
        width: isCollapsed ? '64px' : '220px',
        transition: 'width 0.2s ease',
        zIndex: 1000
      }}
    >
      {/* Modern Admin Header with Link */}
      <div className="p-3 border-bottom border-secondary bg-dark">
        <div className="d-flex align-items-center justify-content-between">
          {!isCollapsed ? (
            <Link 
              to="/admin" 
              className="text-decoration-none d-flex align-items-center"
            >
              {/* <i className="bi bi-shop fs-4 me-2 text-primary"></i> */}
              <span className="fs-6 fw-bold text-white">Coffee Admin</span>
            </Link>
          ) : (
            <Link 
              to="/admin" 
              className="text-decoration-none w-100 text-center"
            >
              {/* <i className="bi bi-shop fs-4 text-primary"></i> */}
            </Link>
          )}
          
          <button 
            className="btn btn-link text-white p-0"
            onClick={onToggleCollapse}
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`} />
          </button>
        </div>
      </div>

      {/* Navigation Items (unchanged) */}
      <nav className="flex-column p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link d-flex align-items-center py-2 px-3 mb-1 rounded ${
              location.pathname === item.path ? 'bg-primary' : 'text-white'
            }`}
            title={isCollapsed ? item.name : ''}
          >
            <i className={`bi ${item.icon}`} />
            {!isCollapsed && <span className="ms-2">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button pinned to bottom */}
      <div className="mt-auto p-3 border-top border-secondary">
        <div className={`d-flex ${isCollapsed ? 'justify-content-center' : ''}`}>
          <Logout collapsed={isCollapsed} />
        </div>
      </div>
      
    </div>
  );
}