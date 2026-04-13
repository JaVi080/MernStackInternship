import React from 'react';
import './Dashboard.css'; // Import our custom styles
import { FaUserFriends, FaHeart, FaChartLine, FaCalendarAlt } from 'react-icons/fa'; // Icons for the cards
import { Donations } from '../data/donations'; // Import real donation data for recent activity

// CONCEPT: Functional Component
// This is the Dashboard component, built using a functional component.
// It returns the JSX (pseudo-HTML) that React will render on the screen.
const Dashboard: React.FC = () => {
  // CONCEPT: Helper function inside component
  // Generates correct badge color class based on status string
  const getStatusBadge = (status: string) => {
    if (status === "Completed") return "badge bg-success rounded-pill";
    if (status === "Pending") return "badge bg-warning rounded-pill text-dark";
    if (status === "Failed") return "badge bg-danger rounded-pill";
    return "badge bg-secondary rounded-pill";
  };

  // Grab the first 4 latest donations to show in recent activity
  const recentDonations = Donations.slice(0, 4);

  return (
    <div className="dashboard-container container-fluid p-4">
      
      {/* ── Header Section ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="dashboard-title">Overview Dashboard</h2>
        <button className="btn btn-primary custom-btn">Generate Report</button>
      </div>

      {/* ── Stats Cards Section ── 
          CONCEPT: Bootstrap Grid System (Row and Cols)
          We use the grid system to make cards responsive. 
          'row' defines the grid, 'col-md-3' means it takes 3 columns (out of 12) on medium screens.
      */}
      <div className="row g-4 mb-4">
        
        {/* Card 1: Total Beneficiaries */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card stat-card shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="icon-wrapper bg-primary-light">
                <FaUserFriends className="stat-icon text-primary" />
              </div>
              <div className="ms-3">
                <p className="stat-label mb-0 text-muted">Total Beneficiaries</p>
                <h3 className="stat-value mb-0">1,250</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Total Donations */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card stat-card shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="icon-wrapper bg-success-light">
                <FaHeart className="stat-icon text-success" />
              </div>
              <div className="ms-3">
                <p className="stat-label mb-0 text-muted">Total Donations</p>
                <h3 className="stat-value mb-0">$45,000</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Active Campaigns */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card stat-card shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="icon-wrapper bg-info-light">
                <FaChartLine className="stat-icon text-info" />
              </div>
              <div className="ms-3">
                <p className="stat-label mb-0 text-muted">Active Campaigns</p>
                <h3 className="stat-value mb-0">12</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Upcoming Events */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card stat-card shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="icon-wrapper bg-warning-light">
                <FaCalendarAlt className="stat-icon text-warning" />
              </div>
              <div className="ms-3">
                <p className="stat-label mb-0 text-muted">Upcoming Events</p>
                <h3 className="stat-value mb-0">5</h3>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Main Content Section ── */}
      <div className="row g-4">
        {/* Recent Activity Table using Bootstrap Table classes */}
        {/* CONCEPT: Bootstrap table classes
            We make the table look clean automatically with "table" 
            and vertically align content with "align-middle". */}
        <div className="col-12 col-lg-8">
          <div className="card custom-card shadow-sm">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table activity-table align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Donor</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* CONCEPT: We use map to dynamically render rows based on our data file */}
                    {recentDonations.map((donation) => (
                      <tr key={donation._id}>
                        <td><strong>{donation.donorName}</strong></td>
                        <td className="text-success fw-bold">{donation.currency} {donation.amount}</td>
                        <td>{donation.createdAt}</td>
                        <td><span className={getStatusBadge(donation.status)}>{donation.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        {/* CONCEPT: We use flexbox implicitly through bootstrap classes (d-grid gap-3) 
            to space the buttons out perfectly without needing custom margins. */}
        <div className="col-12 col-lg-4">
          <div className="card custom-card shadow-sm h-100">
            <div className="card-header bg-white border-0 pt-4 pb-2">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              <div className="d-grid gap-3">
                {/* btn-outline-primary gives a colored border that fills on hover */}
                <button className="btn btn-outline-primary action-btn">Add New Beneficiary</button>
                <button className="btn btn-outline-success action-btn">Record Offline Donation</button>
                <button className="btn btn-outline-warning action-btn">Schedule Event</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
