import Login from '../../components/Login';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (currentUser?.role === "admin") {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            <br />
            System Administration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to continue
          </p>
        </div>
        <Login 
          isAdmin 
          redirectPath="/admin/dashboard"
          // customValidation={(values) => {
          //   // Add any admin-specific validation here if needed
          //   if (!values.email.includes('@admin')) { // Example domain check
          //     return { email: 'Admin email required' };
          //   }
          //   return null;
          // }}
        />
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>All access attempts are monitored and logged</p>
        </div>
      </div>
    </div>
  );
}