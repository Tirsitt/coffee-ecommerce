import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from '../../components/Admin/AdminNav';

export default function AdminLayout() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="d-flex vh-100">
      <AdminNav 
        isCollapsed={isNavCollapsed} 
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)} 
      />
      <div 
        className="flex-grow-1 p-4 overflow-auto"
        style={{
          marginLeft: isNavCollapsed ? '64px' : '220px',
          transition: 'margin-left 0.2s ease'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}