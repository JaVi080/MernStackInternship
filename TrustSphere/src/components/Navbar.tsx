import { Link } from "react-router-dom";
import { MdMenu, MdNotifications, MdAccountCircle } from "react-icons/md";

// Passing the toggleSidebar function as a prop so we can open the sidebar on mobile
interface NavbarProps {
  toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg border-bottom px-3 bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        
        {/* Menu Button - Only visible on medium/small screens to toggle the Sidebar */}
        <button 
          className="btn btn-light d-md-none me-2 border-0 shadow-none d-flex align-items-center justify-content-center" 
          onClick={toggleSidebar}
        >
          <MdMenu size={24} />
        </button>
        
        {/* Optional Page Title or Branding in Navbar */}
        <div className="navbar-brand d-none d-md-block fs-5 fw-semibold text-secondary">
           Welcome Back
        </div>

        {/* Right side container: Notification & Profile */}
        <div className="ms-auto d-flex align-items-center gap-3">
          
          {/* Notification Icon wrapped in a button */}
          <button className="btn btn-light position-relative p-2 rounded-circle d-flex align-items-center justify-content-center border-0">
            <MdNotifications size={24} className="text-secondary" />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>

          {/* Profile Link taking the user to Settings or Profile page */}
          <Link to="/setting" className="text-decoration-none d-flex align-items-center gap-2 text-dark">
            {/* Adding the Account icon */}
            <MdAccountCircle size={32} className="text-primary" />
            {/* Displaying name only on screens above extra-small (xs) */}
            <span className="d-none d-sm-block fw-medium">Admin User</span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;