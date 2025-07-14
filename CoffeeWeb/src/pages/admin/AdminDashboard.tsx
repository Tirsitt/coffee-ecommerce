import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { mockProducts } from '../../data/mockProducts';
import { mockOrders } from '../../data/mockOrders';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { title: "Total Products", value: 0, icon: "bi-box-seam", link: "/admin/products" },
    { title: "Pending Orders", value: 0, icon: "bi-cart", link: "/admin/orders" },
    { title: "Revenue (30d)", value: "$0", icon: "bi-currency-dollar", link: "/admin/orders" },
    { title: "Active Users", value: 0, icon: "bi-people", link: "/admin/users" }
  ]);

  // Fetch data on component mount
  useEffect(() => {
    // In a real app, you would fetch from API here
    const totalProducts = mockProducts.length;
    const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentRevenue = mockOrders
      .filter(order => new Date(order.date) > thirtyDaysAgo)
      .reduce((sum, order) => sum + order.total, 0);

    setStats([
      { ...stats[0], value: totalProducts },
      { ...stats[1], value: pendingOrders },
      { ...stats[2], value: `$${recentRevenue.toFixed(2)}` },
      { ...stats[3], value: mockOrders.length } // Using orders count as placeholder for users
    ]);
  }, []);

  const quickActions = [
    { title: "Add New Product", icon: "bi-plus-circle", link: "/admin/products/new" },
    { title: "View Orders", icon: "bi-list-check", link: "/admin/orders" },
    { title: "Generate Report", icon: "bi-file-earmark-bar-graph", link: "/admin/reports" }
  ];

  return (
    <div className="container-fluid py-4">
      {/* Dashboard Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard Overview</h2>
        <div className="text-muted">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 mb-3 mb-md-0">
            <Link to={stat.link} className="card h-100 text-decoration-none hover-shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">{stat.title}</h6>
                    <h3 className="mb-0">{stat.value}</h3>
                  </div>
                  <i className={`bi ${stat.icon} fs-3 text-primary`}></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card mb-4">
        <div className="card-header bg-white border-bottom-0">
          <h5 className="mb-0">Quick Actions</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {quickActions.map((action, index) => (
              <div key={index} className="col-md-4 mb-3 mb-md-0">
                <Link to={action.link} className="btn btn-outline-primary w-100 py-3">
                  <i className={`bi ${action.icon} me-2`}></i>
                  {action.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header bg-white border-bottom-0">
          <h5 className="mb-0">Recent Activity</h5>
        </div>
        <div className="card-body">
          <div className="list-group list-group-flush">
            {[
              { id: 1, action: "New order #1234 received", time: "10 mins ago" },
              { id: 2, action: "Product 'Espresso Blend' updated", time: "25 mins ago" },
              { id: 3, action: "New user registration", time: "1 hour ago" }
            ].map(activity => (
              <div key={activity.id} className="list-group-item border-0 px-0 py-3">
                <div className="d-flex justify-content-between">
                  <span>{activity.action}</span>
                  <small className="text-muted">{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}