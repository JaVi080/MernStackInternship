
import React, { useState } from 'react';
import './AdminDashboard.css';


function AdminDashboard() {
  // State to track which section is currently displayed
  const [activeSection, setActiveSection] = useState('dashboard');

  // Dummy data 
  const dashboardStats = [
    { title: 'Total Orders', number: '1,234', icon: '📦' },
    { title: 'Total Revenue', number: '$45,680', icon: '💰' },
    { title: 'Total Customers', number: '542', icon: '👥' },
    { title: 'Total Products', number: '156', icon: '🛍️' },
  ];

  // Dummy data for rec orders
  const recentOrders = [
    { id: 'ORD001', customer: 'John Doe', amount: '$125.50', status: 'Delivered', date: '2024-02-15' },
    { id: 'ORD002', customer: 'Jane Smith', amount: '$89.99', status: 'Processing', date: '2024-02-16' },
    { id: 'ORD003', customer: 'Bob Wilson', amount: '$245.00', status: 'Pending', date: '2024-02-17' },
    { id: 'ORD004', customer: 'Alice Brown', amount: '$156.75', status: 'Delivered', date: '2024-02-18' },
    { id: 'ORD005', customer: 'Charlie Davis', amount: '$320.00', status: 'Processing', date: '2024-02-19' },
  ];

  // Dummy data for pro
  const products = [
    { id: 1, name: 'Glow Serum', price: '$29.99', stock: 145, emoji: '✨' },
    { id: 2, name: 'Face Cream', price: '$39.99', stock: 89, emoji: '🧴' },
    { id: 3, name: 'Lip Balm', price: '$15.99', stock: 256, emoji: '💄' },
    { id: 4, name: 'Face Wash', price: '$19.99', stock: 102, emoji: '🫧' },
    { id: 5, name: 'Moisturizer', price: '$34.99', stock: 67, emoji: '💧' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar Nav */}
      <aside className="admin-sidebar">
        <h2>🛡️ Admin Panel</h2>
        <ul className="admin-menu">
          <li>
            <a 
              href="#dashboard"
              className={activeSection === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveSection('dashboard')}
            >
              📊 Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#orders"
              className={activeSection === 'orders' ? 'active' : ''}
              onClick={() => setActiveSection('orders')}
            >
              📦 Orders
            </a>
          </li>
          <li>
            <a 
              href="#products"
              className={activeSection === 'products' ? 'active' : ''}
              onClick={() => setActiveSection('products')}
            >
              🛍️ Products
            </a>
          </li>
          <li>
            <a 
              href="#customers"
              className={activeSection === 'customers' ? 'active' : ''}
              onClick={() => setActiveSection('customers')}
            >
              👥 Customers
            </a>
          </li>
          <li>
            <a 
              href="#settings"
              className={activeSection === 'settings' ? 'active' : ''}
              onClick={() => setActiveSection('settings')}
            >
              ⚙️ Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        {/* Dashboard Sec */}
        {activeSection === 'dashboard' && (
          <div className="section-content">
            <h1>Dashboard</h1>
            <p className="section-subtitle">Welcome back to your admin panel</p>

            {/* Dashboard Stats Cards */}
            <div className="dashboard-grid">
           
              {dashboardStats.map((stat, index) => (
                <div key={index} className="dashboard-card">
                  <div className="card-icon">{stat.icon}</div>
                  <h3>{stat.title}</h3>
                  <div className="number">{stat.number}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders Section */}
            <div className="section-box">
              <h2>Recent Orders</h2>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Display recent orders */}
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td><strong>{order.id}</strong></td>
                        <td>{order.customer}</td>
                        <td>{order.amount}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeSection === 'orders' && (
          <div className="section-content">
            <h1>Orders Management</h1>
            <p className="section-subtitle">Manage all customer orders</p>

            <div className="section-box">
              <div className="section-header">
                <h2>All Orders</h2>
                <button className="btn-primary">+ New Order</button>
              </div>

              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td><strong>{order.id}</strong></td>
                        <td>{order.customer}</td>
                        <td>{order.amount}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.date}</td>
                        <td>
                          <button className="action-btn edit">Edit</button>
                          <button className="action-btn delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        {activeSection === 'products' && (
          <div className="section-content">
            <h1>Products Management</h1>
            <p className="section-subtitle">Manage your product catalog</p>

            <div className="section-box">
              <div className="section-header">
                <h2>All Products</h2>
                <button className="btn-primary">+ Add Product</button>
              </div>

              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Display products */}
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>
                          <span className="product-name">
                            {product.emoji} {product.name}
                          </span>
                        </td>
                        <td>{product.price}</td>
                        <td>
                          <span className={`stock-badge ${product.stock > 100 ? 'in-stock' : 'low-stock'}`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td>
                          <button className="action-btn edit">Edit</button>
                          <button className="action-btn delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Customers Section */}
        {activeSection === 'customers' && (
          <div className="section-content">
            <h1>Customers Management</h1>
            <p className="section-subtitle">View and manage customer information</p>

            <div className="section-box">
              <h2>Total Customers: 542</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <p className="stat-label">Active Customers</p>
                  <p className="stat-value">458</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">New This Month</p>
                  <p className="stat-value">84</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Returning Rate</p>
                  <p className="stat-value">72%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="section-content">
            <h1>Settings</h1>
            <p className="section-subtitle">Configure your store settings</p>

            <div className="section-box">
              <h2>General Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Store Name</label>
                  <input type="text" defaultValue="PureGlow Store" />
                </div>
                <div className="form-group">
                  <label>Store Email</label>
                  <input type="email" defaultValue="contact@pureglow.com" />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select>
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>GBP - British Pound</option>
                  </select>
                </div>
                <button className="btn-primary" style={{ marginTop: '20px' }}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
